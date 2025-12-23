import { readData, updateData } from "./db";
import { sha256Hex } from "./auth";

// canonical evaluation categories (keys stored under users/<hash>/scores.evaluation)
export const EVAL_CATEGORIES = ["human", "animals", "history", "geo", "famous"];

// firebase/score.ts

export async function getRanking() {
  const users = await readData("users");
  if (!users) return [];

  return Object.values(users)
    .map(u => ({
      username: u.avatarName || "Unknown",
      score: Number(u.score || 0),
      avatar: u.avatarImage || "",
    }))
    .sort((a, b) => b.score - a.score);
}



/* ======================================================
   ADD SCORE (learning / evaluation)
====================================================== */
export async function addScore(email, type, points) {
  if (!email || typeof points !== "number") return;

  const emailHash = await sha256Hex(email.trim().toLowerCase());
  const userPath = `users/${emailHash}`;

  const user = await readData(userPath);
  if (!user) return;

  // init scores; evaluation can be either legacy number or new object
  const scores = user.scores || { learning: 0, evaluation: {} };

  const learning = Number(scores.learning || 0);

  // normalize evaluation to object form for internal ops
  let evaluationObj = {};
  if (typeof scores.evaluation === "number") {
    // legacy numeric evaluation -> keep under a legacy key so we don't lose data
    evaluationObj = { legacy: Number(scores.evaluation || 0) };
  } else {
    evaluationObj = { ...(scores.evaluation || {}) };
  }

  const newLearning = type === "learning" ? learning + points : learning;

  // support incremental add for legacy-style calls: add to a 'legacy' bucket
  if (type === "evaluation") {
    evaluationObj["legacy"] = (Number(evaluationObj["legacy"] || 0) + points);
  }

  const evalTotal = Object.values(evaluationObj).reduce(
    (s, v) => s + Number(v || 0),
    0
  );

  const totalScore = newLearning + evalTotal;

  await updateData(userPath, {
    scores: {
      learning: newLearning,
      evaluation: evaluationObj,
    },
    score: totalScore,
  });

  return totalScore;
}

/* ======================================================
   GET SCORES
====================================================== */
export async function getScores(email) {
  if (!email) return null;

  const emailHash = await sha256Hex(email.trim().toLowerCase());
  const user = await readData(`users/${emailHash}`);
  if (!user) return null;

  const learning = Number(user.scores?.learning || 0);

  // evaluation may be stored as number (legacy) or object (new)
  let evaluationObj = {};
  if (typeof user.scores?.evaluation === "number") {
    evaluationObj = { legacy: Number(user.scores.evaluation || 0) };
  } else {
    evaluationObj = { ...(user.scores?.evaluation || {}) };
  }

  const evalTotal = Object.values(evaluationObj).reduce(
    (s, v) => s + Number(v || 0),
    0
  );

  return {
    learning,
    evaluation: evaluationObj,
    total: Number(user.score || learning + evalTotal || 0),
  };
}

/* ======================================================
   RESET SCORES
====================================================== */
export async function resetScores(email) {
  if (!email) return;

  const emailHash = await sha256Hex(email.trim().toLowerCase());

  // reset learning + all known evaluation categories to zero
  const evaluationReset = {};
  EVAL_CATEGORIES.forEach(c => (evaluationReset[c] = 0));

  await updateData(`users/${emailHash}`, {
    scores: {
      learning: 0,
      evaluation: evaluationReset,
    },
    score: 0,
  });
}

// setEvaluationScore supports two forms:
// - setEvaluationScore(email, category, points): sets a specific category to points
// - setEvaluationScore(email, points): legacy form, stores a legacy bucket
export async function setEvaluationScore(email, categoryOrPoints, pointsMaybe) {
  if (!email) return;

  const emailHash = await sha256Hex(email.trim().toLowerCase());
  const userPath = `users/${emailHash}`;

  const user = await readData(userPath);
  if (!user) return;

  const learning = Number(user.scores?.learning || 0);

  // normalize existing evaluation
  let evaluationObj = {};
  if (typeof user.scores?.evaluation === "number") {
    evaluationObj = { legacy: Number(user.scores.evaluation || 0) };
  } else {
    evaluationObj = { ...(user.scores?.evaluation || {}) };
  }

  if (typeof categoryOrPoints === "string" && typeof pointsMaybe === "number") {
    // set specific category
    const categoryKey = String(categoryOrPoints).toLowerCase();
    evaluationObj[categoryKey] = Number(pointsMaybe || 0);
  } else if (typeof categoryOrPoints === "number") {
    // legacy: set numeric value under 'legacy'
    evaluationObj["legacy"] = Number(categoryOrPoints || 0);
  } else {
    // invalid call
    return;
  }

  const evalTotal = Object.values(evaluationObj).reduce(
    (s, v) => s + Number(v || 0),
    0
  );

  await updateData(userPath, {
    scores: {
      learning,
      evaluation: evaluationObj,
    },
    score: learning + evalTotal,
  });
}


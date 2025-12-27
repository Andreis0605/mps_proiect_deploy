"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { readData } from "@/firebase/db";
import { setEvaluationScore } from "@/firebase/score";
import { findUserByEmail } from "@/firebase/auth";

/* ================= IMAGES ================= */

import imgCorpulUman from "../assets/e1449857e7a72b406f9ecd4332dc9aa4f1019084.png";
import imgAnimale from "../assets/bc4cfa332870c9fd14e89639736128df0e30a6c2.png";
import imgIstorie from "../assets/6094a135621b829395e1e988a58f08b6012fa0ed.png";
import imgGeografie from "../assets/3b00b77cc8072feecdb47204b38ae4afa60a7299.png";
import imgOameniCelebri from "../assets/1f62929bb79beb77bde2e1fa4d0c9d5df1d0d890.png";

import imgQuizHero from "../assets/b2d3a352e6cc64ec4407d529eea48373cf06c993.png";
import imgAvatarUser from "../assets/0656f869c2c0c0886b5a5c8c2f5bf4c4403d7a08.png";

import imgQuestion2 from "../assets/1a45c617c76075e106654510fc3873a03369ad5a.png";
import imgQuestion3 from "../assets/0a92e5b3e507b23d52f4c14ac0310a33458c6228.png";
import imgQuestion4 from "../assets/cdef20ef9dff7bb88f54c51742eef14f4dc9a36c.png";
import imgQuestion5 from "../assets/30bc4dbfc87ecc5635ff705d2a3fc2f2dd5381c7.png";
import imgQuestion6 from "../assets/31954651ea689f6440dad0a1a1a831750efdef8b.png";
import imgQuestion7 from "../assets/f95aa4828590576116519bb5f31f3722a032c8fe.png";
import imgQuestion8 from "../assets/c2f020e91414679ba768c4f09e3aec224eb8858b.png";
import imgQuestion9 from "../assets/bc274a3818bb91c912667672cc0975802ba078bd.png";
import imgQuestion10 from "../assets/bfbde671194d23cd360e4d68d75bb9db4fb3f4df.png";

const questionImages = [
  imgQuestion2,
  imgQuestion3,
  imgQuestion4,
  imgQuestion5,
  imgQuestion6,
  imgQuestion7,
  imgQuestion8,
  imgQuestion9,
  imgQuestion10,
];

/* ================= TYPES ================= */

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  image: any;
  chapter?: { title: string; info: any } | null;
}

/* ================= MAPS ================= */

const topics = {
  "corpul-uman": { label: "Corpul Uman", image: imgCorpulUman, db: "Human" },
  "animale": { label: "Animale", image: imgAnimale, db: "Animals" },
  "istorie": { label: "Istorie", image: imgIstorie, db: "History" },
  "geografie": { label: "Geografie", image: imgGeografie, db: "Geo" },
  "oameni-celebri": { label: "Oameni celebri", image: imgOameniCelebri, db: "Famous" },
} as const;

/* ================= COMPONENT ================= */

export default function Evaluation() {
  const router = useRouter();

  // Guard: redirect to signin if not logged in
  if (typeof window !== 'undefined') {
    try {
      const s = localStorage.getItem('sessionUser');
      const u = s ? JSON.parse(s) : null;
      if (!u || !u.email) {
        router.push('/signin');
        return <div />;
      }
    } catch (err) {
      router.push('/signin');
      return <div />;
    }
  }

  const userEmail =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("sessionUser") || "{}")?.email
      : null;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentTopicKey, setCurrentTopicKey] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isGamified, setIsGamified] = useState<boolean | null>(null);
  const [revealAnswers, setRevealAnswers] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

  /* ================= LOGIC ================= */

  const handleAnswer = (id: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [id]: answer }));
  };

  const calculateScore = () =>
    questions.filter(q => answers[q.id] === q.correctAnswer).length;

  const submitTest = async () => {
    const final = calculateScore();
    setScore(final);
    // For gamified users, keep questions on screen and reveal correct/incorrect,
    // but also show the score panel beneath the quiz.
    if (isGamified === true) {
      setRevealAnswers(true);
      setShowScore(true);
    } else {
      setShowScore(true);
    }

    if (userEmail) {
      // persist per-category evaluation score (store points)
      if (currentTopicKey) {
        await setEvaluationScore(userEmail, currentTopicKey, final * 25);
      } else {
        // fallback to legacy behavior
        await setEvaluationScore(userEmail, final * 25);
      }
    }
  };

  const loadTopic = async (dbKey: string) => {
    setLoading(true);
    setAnswers({});
    setShowScore(false);
    setCurrentTopicKey(dbKey.toLowerCase());

    /* ================= NORMAL QUESTIONS (10) ================= */

    // Determine selected set for this topic (if available)
    let selectedSet: number | null = null;
    try {
      const s = typeof window !== 'undefined' ? localStorage.getItem('sessionUser') : null;
      const u = s ? JSON.parse(s) : null;
      if (u && u.selectedSets && typeof u.selectedSets[dbKey] !== 'undefined') {
        selectedSet = Number(u.selectedSets[dbKey]);
      } else if (u && u.email) {
        const usr = await findUserByEmail(u.email);
        if (usr && usr.selectedSets && typeof usr.selectedSets[dbKey] !== 'undefined') {
          selectedSet = Number(usr.selectedSets[dbKey]);
        }
      }
    } catch (err) { }

    const normalData = await readData(dbKey);

    const normalAll: any[] = [];

    // Handle DB shapes where chapters are grouped by numeric top-level keys (0..3)
    if (normalData && typeof normalData === 'object') {
      const topKeys = Object.keys(normalData);
      const numericTopKeys = topKeys.filter(k => /^\d+$/.test(k));
      let chaptersToIterate: any[] = [];

      if (numericTopKeys.length > 0) {
        if (selectedSet !== null && typeof normalData[String(selectedSet)] !== 'undefined') {
          const node = normalData[String(selectedSet)];
          if (node && typeof node === 'object' && node.quiz) {
            chaptersToIterate = [node];
          } else {
            chaptersToIterate = Object.values(node || {});
          }
        } else if (typeof normalData['0'] !== 'undefined') {
          const zero = normalData['0'];
          if (zero && typeof zero === 'object' && zero.quiz) {
            chaptersToIterate = [zero];
          } else {
            chaptersToIterate = Object.values(zero || {});
          }
        } else {
          chaptersToIterate = Object.values(normalData).flatMap((s: any) => Object.values(s || {}));
        }
      } else {
        chaptersToIterate = Object.values(normalData);
      }

      chaptersToIterate.forEach((chapter: any) => {
        if (chapter && chapter.quiz) {
          Object.values(chapter.quiz).forEach((q: any) => {
            normalAll.push({ ...q, __chapter: chapter });
          });
        }
      });
    }

    const selectedNormal = normalAll
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);

    const normalQs: Question[] = selectedNormal.map((q, i) => ({
      id: i + 1,
      question: q.question,
      options: Object.values(q.options) as string[],
      correctAnswer: q.correct_answer,
      image: questionImages[i % questionImages.length],
      chapter: q.__chapter ? { title: q.__chapter.title, info: q.__chapter.info } : null,
    }));

    /* 🔥 SALVĂ CAPITOLELE PENTRU APROFUNDARE */
    const uniqueChapters = Array.from(
      new Map(
        selectedNormal.map(q => [
          q.__chapter.title,
          { title: q.__chapter.title, info: q.__chapter.info },
        ])
      ).values()
    );

    localStorage.setItem(
      "lastEvaluationChapters",
      JSON.stringify(uniqueChapters)
    );

    /* ================= CONTROL QUESTIONS (5) ================= */

    const controlData = await readData(`Control_${dbKey}`);

    // If control items have a `set` property, only include those matching selectedSet
    let controlItems = Object.values(controlData ?? {});
    if (selectedSet !== null) {
      const hasSet = controlItems.some((c: any) => typeof c.set !== 'undefined');
      if (hasSet) {
        controlItems = controlItems.filter((c: any) => Number(c.set) === selectedSet);
      }
    }

    const controlQs: Question[] = controlItems
      .slice(0, 5)
      .map((q: any, i: number) => ({
        id: normalQs.length + i + 1,
        question: q.question,
        options: Object.values(q.options) as string[],
        correctAnswer: q.correct_answer,
        image: questionImages[(normalQs.length + i) % questionImages.length],
        chapter: null,
      }));

    /* ================= MERGE ================= */

    setQuestions([...normalQs, ...controlQs]);
    setLoading(false);
  };

  useEffect(() => {
    // detect gamification from local session first, otherwise fall back to backend
    try {
      const session = JSON.parse(localStorage.getItem("sessionUser") || "null");
      if (session && typeof session.gamification !== "undefined") {
        setIsGamified(Boolean(session.gamification));
        return;
      }
    } catch (e) {
      // ignore parse errors and fall back to backend
    }

    // read avatar from session so we can display it dynamically in the score panel
    const readAvatar = () => {
      try {
        const s = localStorage.getItem('sessionUser');
        if (!s) { setAvatarSrc(null); return; }
        const u = JSON.parse(s);
        if (u && u.avatarImage) {
          if (typeof u.avatarImage === 'string') setAvatarSrc(u.avatarImage);
          else setAvatarSrc(u.avatarImage.src || u.avatarImage || null);
        } else {
          setAvatarSrc(null);
        }
      } catch (err) {
        setAvatarSrc(null);
      }
    };

    readAvatar();
    const onChangeAvatar = () => readAvatar();
    window.addEventListener('storage', onChangeAvatar);
    window.addEventListener('sessionUserChanged', onChangeAvatar);

    // backend fallback: if session doesn't include gamification, ask backend
    (async () => {
      if (!userEmail) {
        setIsGamified(null);
      } else {
        try {
          const data = await findUserByEmail(userEmail);
          if (data && typeof data.gamification !== "undefined") {
            setIsGamified(Boolean(data.gamification));
          } else {
            setIsGamified(null);
          }
        } catch (e) {
          setIsGamified(null);
        }
      }
    })();

    // cleanup added listeners when this effect is torn down
    return () => {
      window.removeEventListener('storage', onChangeAvatar);
      window.removeEventListener('sessionUserChanged', onChangeAvatar);
    };
  }, []);

  const ConditionalImg = ({ src, alt, className }: { src: string; alt?: string; className?: string }) => {
    if (isGamified === false) return null;
    return <img src={src} alt={alt || ""} className={className} />;
  };

  /* ================= RENDER ================= */

  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative min-h-[600px] flex items-center justify-center bg-[#1a1f3a]">
        <ConditionalImg src={imgQuizHero.src} className="absolute inset-0 w-full h-full object-contain opacity-40" />
        <h1 className="relative z-10 text-white text-6xl font-bold">Evaluare</h1>
      </section>

      {/* SELECT TOPIC */}
      {!questions.length && !showScore && (
        <section className="py-16 bg-gray-50 text-center">
          <h2 className="text-4xl mb-10">Alege un subiect</h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {Object.values(topics).map(t => (
              <button
                key={t.db}
                onClick={() => loadTopic(t.db)}
                className="bg-white p-6 rounded-xl border-4"
              >
                <ConditionalImg src={t.image.src} className="w-20 h-20 mx-auto mb-3" />
                <p>{t.label}</p>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* QUIZ */}
      {questions.length > 0 && (!showScore || revealAnswers) && (
        <section className="py-16 bg-gray-100">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Per-question hint buttons (appear inside each question tile for gamified users) */}
            {questions.map(q => (
              <div key={q.id} className="bg-white p-6 rounded-xl">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold mb-4">
                    {q.id}. {q.question}
                  </h3>

                  {isGamified === true && (
                    <button
                      onClick={() => {
                        try {
                          const pick = q.chapter || (JSON.parse(localStorage.getItem('lastEvaluationChapters') || 'null') || [])[0] || null;
                          if (pick) localStorage.setItem('highlightChapter', JSON.stringify(pick));

                          try {
                            const dbLower = currentTopicKey;
                            const dbToLearning: Record<string, string> = {
                              human: 'human_body',
                              animals: 'animals',
                              history: 'history',
                              geo: 'geography',
                              famous: 'famous_people',
                            };
                            if (dbLower && dbToLearning[dbLower]) {
                              localStorage.setItem('highlightTopic', dbToLearning[dbLower]);
                            } else {
                              localStorage.removeItem('highlightTopic');
                            }
                          } catch (e) {}

                          try { window.open('/learning-experience', '_blank'); } catch { router.push('/learning-experience'); }
                        } catch (e) { try { window.open('/learning-experience', '_blank'); } catch { router.push('/learning-experience'); } }
                      }}
                      className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-md"
                      aria-label={`Vezi textul aferent întrebării ${q.id}`}
                    >
                      Nu esti sigur? Verifica textul.
                    </button>
                  )}
                </div>

                {q.options.map((opt, i) => {
                  const letter = String.fromCharCode(97 + i);
                  const selected = answers[q.id] === letter;
                  const correct = q.correctAnswer === letter;

                  // When answers are revealed, apply correctness classes for gamified users
                  const revealClass = revealAnswers
                    ? correct
                      ? 'bg-green-50 border border-green-400'
                      : selected
                        ? 'bg-red-50 border border-red-400'
                        : ''
                    : '';

                  return (
                    <label key={letter} className={`block mb-2 p-2 rounded ${revealClass}`}>
                      <input
                        type="radio"
                        checked={selected}
                        onChange={() => handleAnswer(q.id, letter)}
                        disabled={revealAnswers}
                      />{" "}
                      {opt}
                    </label>
                  );
                })}

                {/* Inline score banner for gamified users when answers are revealed */}
                {revealAnswers && isGamified === true && (
                  <div className="mt-4 p-3 bg-white border rounded text-left">
                    <strong>Răspunsuri</strong>: ai răspuns corect la {answers ? Object.keys(answers).filter(k => {
                      const id = Number(k);
                      return answers[id] === questions.find(qx => qx.id === id)?.correctAnswer;
                    }).length : 0} din {questions.length}
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={submitTest}
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg w-full"
            >
              Trimite testul
            </button>
          </div>
        </section>
      )}

      {/* SCORE */}
      {(showScore || revealAnswers) && (
        <section className="py-20 bg-gray-100 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Scor: {score}/{questions.length}
          </h2>

          <ConditionalImg src={avatarSrc || imgAvatarUser.src} className="w-20 h-20 mx-auto rounded-full" />

          <div className="flex flex-col gap-4 mt-6">
            {isGamified === true && (
              <button
                onClick={() => router.push("/scoreboard")}
                className="bg-black text-white px-6 py-3 rounded-lg"
              >
                Vezi clasamentul
              </button>
            )}

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdyqZFY-t7Op7g8u44BntcO4q4YjPmcOxIcokFiKZbNws9Ojw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-indigo-600 text-white 
px-10 py-5 text-lg md:text-xl 
rounded-xl font-bold 
hover:bg-indigo-700 transition 
shadow-lg hover:shadow-xl"

            >
              Spune-ne părerea ta 😊
            </a>
          </div>
        </section>
      )}
    </div>
  );
}

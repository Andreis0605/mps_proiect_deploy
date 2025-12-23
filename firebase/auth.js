import { writeData, readData, updateData } from './db';

/* ======================================================
   SHA-256 helper (browser + Node)
====================================================== */
export async function sha256Hex(value) {
  if (typeof window !== 'undefined' && window.crypto?.subtle) {
    const enc = new TextEncoder();
    const buf = await window.crypto.subtle.digest(
      'SHA-256',
      enc.encode(value)
    );
    return Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  // Node fallback
  // eslint-disable-next-line global-require
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(value).digest('hex');
}

/* ======================================================
   CREATE ACCOUNT
====================================================== */
export async function createAccount({
  email,
  password,
  age,
  personality,
  avatarName,
  avatarImage,
  consent
}) {
  const normalizedEmail = (email || '').trim().toLowerCase();
  const emailHash = await sha256Hex(normalizedEmail);
  const passwordHash = await sha256Hex(password || '');

  const gamification = await determineGamificationForPersonality(personality);

  const user = {
    emailHash,
    passwordHash,

    age: age || '',
    personality: personality || '',
    avatarName: avatarName || '',
    avatarImage: avatarImage || '',

    consent: !!consent,
    gamification,

    // ⭐ scorul este inițializat O SINGURĂ DATĂ
    scores: {
      learning: 0,
      evaluation: 0,
    },
    score: 0,

    createdAt: Date.now()
  };

  await writeData(`users/${emailHash}`, user);
  return user;
}

/* ======================================================
   GAMIFICATION ASSIGNMENT
====================================================== */
async function determineGamificationForPersonality(personality) {
  try {
    if (!personality) return true;

    const allUsers = await readData('users');
    if (!allUsers) return true;

    let gamified = 0;
    let nonGamified = 0;

    Object.values(allUsers).forEach(u => {
      if (u?.personality === personality) {
        u.gamification ? gamified++ : nonGamified++;
      }
    });

    if (gamified === nonGamified) return true;
    return gamified < nonGamified;
  } catch {
    return true;
  }
}

/* ======================================================
   FIND USER
====================================================== */
export async function findUserByEmail(email) {
  const normalizedEmail = (email || '').trim().toLowerCase();
  const emailHash = await sha256Hex(normalizedEmail);
  return await readData(`users/${emailHash}`);
}

/* ======================================================
   VERIFY LOGIN
====================================================== */
export async function verifyCredentials(email, password) {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const passwordHash = await sha256Hex(password || '');
  return passwordHash === user.passwordHash ? user : null;
}

/* ======================================================
   UPDATE PROFILE (⚠️ SCORE IS PROTECTED)
====================================================== */
export async function updateUserProfile(email, updates) {
  const normalizedEmail = (email || '').trim().toLowerCase();
  const emailHash = await sha256Hex(normalizedEmail);

  const current = (await readData(`users/${emailHash}`)) || {};
  const patch = {};

  Object.keys(updates || {}).forEach(key => {
    // ❌ scorul NU se modifică aici
    // ❌ scorurile NU se modifică aici
    if (key === 'score' || key === 'scores') return;


    if (typeof updates[key] === 'undefined') return;

    const changed =
      JSON.stringify(current[key]) !== JSON.stringify(updates[key]);

    if (changed) patch[key] = updates[key];
  });

  if (Object.keys(patch).length === 0) return true;

  await updateData(`users/${emailHash}`, patch);
  return true;
}

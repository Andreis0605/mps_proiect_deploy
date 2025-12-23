"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/* ================= IMAGES ================= */

import imgImage16 from "../assets/22d0a2e6160717ffeb8d3b68d34fd56b11d29d33.png";
import imgCorpulUman from "../assets/e1449857e7a72b406f9ecd4332dc9aa4f1019084.png";
import imgAnimale from "../assets/bc4cfa332870c9fd14e89639736128df0e30a6c2.png";
import imgIstorie from "../assets/6094a135621b829395e1e988a58f08b6012fa0ed.png";
import imgGeografie from "../assets/3b00b77cc8072feecdb47204b38ae4afa60a7299.png";
import imgOameniCelebri from "../assets/1f62929bb79beb77bde2e1fa4d0c9d5df1d0d890.png";
import imgImage18 from "../assets/100ce5beef5fd287bfc3e6abc4d862a7df3f45fc.png";
import imgImage19 from "../assets/0188989ebb2c828f812f3662fae302e4ff5c09c4.png";

import imgMedalGeneric1 from "../assets/d4bea05f3cf2d359e99ba07683cbc0f6100f09fe.png"
import imgMedalGeneric from '../assets/136d6b0970e181a3be936937e960d7c078867bf3.png';

import imgImage65 from "../assets/c972a19649ba01d33818a01747073464924143f0.png";
import imgImage87 from "../assets/78a17d2fef8057695290ae796eb4a32eae95782b.png";

/* ================= COMPONENTS ================= */

import SectionBar from "../components/SectionBar";
import DanceBreak from "../components/DanceBreak";

/* ================= FIREBASE ================= */

import { readData } from "../../firebase/db";
import { addScore } from "../../firebase/score";
import { findUserByEmail } from '../../firebase/auth';
import { recordLearningAttempt } from "../utils/scoring";

/* ================= TYPES ================= */

type DeepChapter = {
  title: string;
  info: string[];
};

/* ================= COMPONENT ================= */

export default function LearningExperience() {
  const router = useRouter();

  const userEmail =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("sessionUser") || "{}")?.email
      : null;

  const [currentTopicKey, setCurrentTopicKey] = useState<string | null>(null);
  const [currentTopicTitle, setCurrentTopicTitle] = useState("");
  const [topicContent, setTopicContent] = useState<any[] | null>(null);
  const [topicLoading, setTopicLoading] = useState(false);

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [statuses, setStatuses] = useState<
    Record<number, "unchecked" | "correct" | "incorrect">
  >({});
  const [hadWrongBefore, setHadWrongBefore] = useState<Record<number, boolean>>(
    {}
  );

  const [deepChapters, setDeepChapters] = useState<DeepChapter[]>([]);
  const [isGamified, setIsGamified] = useState<boolean | null>(null);

  /* ================= DATA LOAD ================= */

  async function loadDeepChaptersFromDB(dbKey: string) {
    try {
      const data = await readData(dbKey);
      if (!data) return [];

      const chapters: DeepChapter[] = [];

      Object.values(data).forEach((item: any) => {
        if (item?.title && item?.info) {
          chapters.push({
            title: item.title,
            info: Array.isArray(item.info)
              ? item.info
              : Object.values(item.info),
          });
        }
      });

      return chapters.slice(0, 10);
    } catch {
      return [];
    }
  }

  async function loadTopic(key: string, title: string) {
    setCurrentTopicKey(key);
    setCurrentTopicTitle(title);
    setTopicLoading(true);

    setAnswers({});
    setStatuses({});
    setHadWrongBefore({});

    const controlMap: Record<string, string> = {
      human_body: "Control_Human",
      animals: "Control_Animals",
      history: "Control_History",
      geography: "Control_Geo",
      famous_people: "Control_Famous",
    };

    const normalMap: Record<string, string> = {
      human_body: "Human",
      animals: "Animals",
      history: "History",
      geography: "Geo",
      famous_people: "Famous",
    };

    const controlData = await readData(controlMap[key]);
    const deepData = await loadDeepChaptersFromDB(normalMap[key]);

    setTopicContent(controlData ? Object.values(controlData).slice(0, 5) : null);
    setDeepChapters(deepData);
    setTopicLoading(false);
  }

  // determine gamification for current client user: read local session, else fetch
  // if gamification === false we will hide all images
  useState(() => {
    try {
      const s = typeof window !== 'undefined' ? localStorage.getItem('sessionUser') : null;
      const u = s ? JSON.parse(s) : null;
      if (u && typeof u.gamification !== 'undefined') {
        setIsGamified(Boolean(u.gamification));
      } else if (u && u.email) {
        // fetch user record
        findUserByEmail(u.email).then(user => {
          if (user && typeof user.gamification !== 'undefined') setIsGamified(Boolean(user.gamification));
        }).catch(() => {});
      } else {
        // unknown -> leave null (will show images)
      }
    } catch (err) {
      // ignore
    }
  });

  // helper to render images only for gamified users (hide when explicitly false)
  const ConditionalImg = ({ src, alt, className }: { src: any; alt?: string; className?: string }) => {
    if (isGamified === false) return null;
    return <img src={src} alt={alt || ''} className={className} />;
  };

  /* ================= NAV ================= */

  const scrollToTopics = () =>
    document
      .getElementById("topics-section")
      ?.scrollIntoView({ behavior: "smooth" });

  /* ================= RENDER ================= */

  return (
    <div className="w-full">

      {/* HERO */}
      <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
        <ConditionalImg src={imgImage16.src} className="absolute opacity-40 max-w-[600px]" />
        <div className="relative z-10 bg-black/40 px-10 py-12 rounded-2xl text-white text-center">
          <h1 className="text-6xl mb-4">Learning Experience</h1>
          <p className="text-xl">Învață. Explorează. Joacă-te.</p>
        </div>
      </section>

      {/* START */}
      <section className="py-20 bg-gray-50 text-center">
        <h2 className="text-4xl mb-6 font-bold">Hai să începem</h2>
  <ConditionalImg src={imgImage19.src} className="mx-auto mb-8 max-w-md" />
        <div className="flex justify-center gap-4">
          <button onClick={scrollToTopics} className="bg-black text-white px-8 py-3 rounded-lg">
            Start Learning
          </button>
          <button onClick={() => router.push("/evaluation")} className="bg-gray-200 px-8 py-3 rounded-lg">
            Take Quiz
          </button>
        </div>
      </section>

      {/* TOPICS */}
      <section id="topics-section" className="py-20">
        <h2 className="text-center text-5xl font-bold mb-10">Alege un subiect</h2>
        <div className="flex justify-center gap-6 flex-wrap">
            {[
            { key: "human_body", label: "Corpul Uman", img: imgCorpulUman },
            { key: "animals", label: "Animale", img: imgAnimale },
            { key: "history", label: "Istorie", img: imgIstorie },
            { key: "geography", label: "Geografie", img: imgGeografie },
            { key: "famous_people", label: "Oameni Celebri", img: imgOameniCelebri },
          ].map(t => (
            <div
              key={t.key}
              onClick={() => loadTopic(t.key, t.label)}
              className="cursor-pointer bg-white p-6 border-4 rounded-xl w-48 text-center hover:border-indigo-500"
            >
              <ConditionalImg src={t.img.src} className="w-24 mx-auto mb-3" />
              <p>{t.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTROL QUESTIONS */}
      {currentTopicKey && topicContent && (
        <section className="py-16 bg-gray-100">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8">{currentTopicTitle}</h2>

            {topicContent.map((item, idx) => {
              const status = statuses[idx];
              const selected = answers[idx];

              return (
                <div key={idx} className="bg-white rounded-xl p-6 mb-6 flex gap-8">
                  {/* LEFT */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>

                    {/* Render informational text (from DB) above the question when present */}
                    {item?.info && (
                      <div className="mb-4 text-left">
                        {(Array.isArray(item.info) ? item.info : Object.values(item.info)).map(
                          (inf: any, i: number) => (
                            <p key={i} className="mb-2 text-sm text-gray-700">
                              {inf}
                            </p>
                          )
                        )}
                      </div>
                    )}

                    <p className="mb-4">{item.question}</p>

                    <div className="space-y-2">
                      {item.options.map((opt: string) => {
                        const letter = opt.charAt(0);
                        return (
                          <label key={opt} className="flex gap-3 p-3 border rounded cursor-pointer">
                            <input
                              type="radio"
                              checked={selected === letter}
                              onChange={() =>
                                setAnswers(prev => ({ ...prev, [idx]: letter }))
                              }
                            />
                            {opt}
                          </label>
                        );
                      })}
                    </div>

                    <button
                      className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded"
                      onClick={async () => {
                        if (status === "correct") return;

                        const ok = selected === item.correct_answer;
                        setStatuses(p => ({ ...p, [idx]: ok ? "correct" : "incorrect" }));
                        recordLearningAttempt(idx + 1, ok);

                        if (ok && userEmail) {
                          await addScore(userEmail, "learning", hadWrongBefore[idx] ? 3 : 10);
                        }
                        if (!ok) {
                          setHadWrongBefore(p => ({ ...p, [idx]: true }));
                        }
                      }}
                    >
                      Verifică răspuns
                    </button>

                    {status === "incorrect" && (
                      <p className="mt-2 text-red-600">Greșit. Mai încearcă.</p>
                    )}
                  </div>

                  {/* RIGHT – MEDAL */}
                  {status === "correct" && (
                    <div className="flex items-center">
                      <ConditionalImg src={imgMedalGeneric.src} className="w-28 animate-bounce" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* APROFUNDARE */}
      {deepChapters.length > 0 && (
        <section className="py-20 bg-white">
          <h2 className="text-5xl font-bold text-center mb-12">Aprofundare</h2>

          {deepChapters.map((ch, idx) => (
            <div key={idx}>
              {idx === Math.floor(deepChapters.length / 2) && isGamified === true && (
                <div className="my-24">
                  <DanceBreak />
                </div>
              )}

              <div className="max-w-4xl mx-auto px-6 mb-12">
                <h3 className="text-3xl font-bold mb-4">{ch.title}</h3>
                {ch.info.map((p, i) => (
                  <p key={i} className="mb-3 text-lg">{p}</p>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      <SectionBar title="Ai terminat de citit sectiunea de aprofundare!" />

      <section className="py-12 bg-white flex justify-center">
        <ConditionalImg src={imgImage65.src} className="max-w-2xl w-full" />
      </section>

      {isGamified !== false && (
        <section className="py-20 text-center">
          <h2 className="text-5xl mb-6 font-bold">Felicitări! 🎉</h2>
          <button
            onClick={() => router.push("/scoreboard")}
            className="bg-black text-white px-10 py-4 rounded-lg"
          >
            Vezi progresul
          </button>
        </section>
      )}

      <section className="py-12 bg-white flex justify-center">
        <ConditionalImg src={imgImage87.src} className="max-w-4xl w-full" />
      </section>
    </div>
  );
}

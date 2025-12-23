"use client";

import Link from "next/link";
import Navigation from "../components/Navigation"; // ⬅️ ADD THIS LINE

// Local images
import imgHero from "../assets/3ae386e248255d10c6bf87e43b733b595828b638.png";
import imgTeam from "../assets/0383daad1b32ebe369c4ab9c83d5ca2f2eee7e37.png";
import imgStudy from "../assets/3b6a4c8fb04229609996ce4de9d7b452bb05327a.png";
import imgExpect from "../assets/690c4d4dc0129e38c88386cf17f76980334c1924.png";
import imgHelp from "../assets/1047d9a92aa68adbac6cea52a82f1c24b1615b65.png";

import imgAvatarGirl from "../assets/944822aea74a27f1e15c7fa0a757b482e8b4fa02.png";
import imgAvatarDelia from "../assets/d4b0b164572c37eabc86d3ba687d3105baf8534d.png";
import imgAvatarStan from "../assets/3c1ce50bb2e2e07bfc66f8a6faaf907b9d711a67.png";
import imgAvatarMario from "../assets/547e09925b1f2afbe078fefe61c090bde08b80b7.png";

import imgStats from "../assets/922670d89e4395341bf9c61a2c9f4f427c99fb8f.png";

import svgPaths from "../imports/svg-co2lk0a8br";

export default function Home() {
  return (
    <div className="w-full">

      {/* ⭐ Added Navigation Bar */}
      <Navigation />

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-indigo-500 to-purple-500 min-h-[600px] flex items-center justify-center overflow-hidden">
        <img 
          src={imgHero.src}
          alt="Gamification Platform"
          className="absolute inset-0 w-full max-w-[600px] opacity-40 object-contain m-auto"
        />

        <div className="relative z-10 text-center text-white px-8 max-w-4xl bg-black/40 py-12 rounded-2xl">
          <h1 className="mb-6 text-5xl font-bold">Studiul aportului gamificării asupra învățării</h1>
          <p className="mb-8 text-xl opacity-90">Cercetarea comportamentului în timpul învățării</p>

          <Link
            href="/learning-experience"
            className="inline-block bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg transition"
          >
            Go to Learning Experience
          </Link>
        </div>
      </section>

      {/* MAIN 4 SECTIONS */}
      <section className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-16">

        {/* Cine suntem? */}
        <div>
          <img src={imgTeam.src} className="w-48 mb-6" alt="Team" />
          <h2 className="text-3xl font-bold mb-4">Cine suntem?</h2>
          <p className="mb-4">
            Suntem o echipă de studenți la Automatică și Calculatoare la POLITEHNICA București.
          </p>
          <p>
            Explorăm modul în care gamificarea influențează experiența și comportamentul utilizatorilor în procesele de învățare.
          </p>
        </div>

        {/* Ce studiem? */}
        <div>
          <img src={imgStudy.src} className="w-48 mb-6" alt="Study" />
          <h2 className="text-3xl font-bold mb-4">Ce studiem?</h2>
          <p>
            Analizăm impactul elementelor ludice asupra performanței, implicării și motivației, transformând învățarea într-o experiență interactivă.
          </p>
        </div>

        {/* Ce așteptări avem? */}
        <div>
          <img src={imgExpect.src} className="w-64 mb-6" alt="Expectations" />
          <h2 className="text-3xl font-bold mb-4">Ce așteptări avem?</h2>
          <h3 className="text-xl font-semibold mb-3">Rezultate preconizate</h3>
          <p className="mb-4">
            Ne dorim să descoperim cât de mult pot transforma elementele de joc procesul de învățare.
          </p>
          <p>
            Așteptăm ca un nivel mai mare de gamificare să ducă la implicare crescută și o reținere mai bună a informației.
          </p>
        </div>

        {/* Cum ne poți ajuta tu? */}
        <div>
          <img src={imgHelp.src} className="w-64 mb-6" alt="Help Us" />
          <h2 className="text-3xl font-bold mb-4">Cum ne poți ajuta tu?</h2>

          <h3 className="text-xl font-semibold mb-3">
            Participă la studiul nostru
          </h3>

          <p className="mb-3">
            Vei primi un cont cu un nivel aleator de gamificare:
          </p>

          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>negamificat</li>
            <li>complet gamificat</li>
          </ul>

          <p className="mb-4">
            Parcurge „Learning Experience”, apoi testează-te în „Evaluation”.
          </p>

          <p className="mb-6">
            Poți adăuga rezultatul testului 16Personalities pentru o analiză mai completă.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/learning-experience"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg"
            >
              Go to Learning
            </Link>

            <a
              href="https://www.16personalities.com/"
              target="_blank"
              className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-3 rounded-lg"
            >
              Take 16 Personality Test
            </a>
          </div>
        </div>

      </section>

      {/* TEAM CONTACT */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-center text-3xl font-bold mb-12">
            Cum ne numim și cum ne puteți contacta?
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {[
              { img: imgAvatarGirl, name: "Aliu Maria-Denisa", email: "maria_denisa.aliu@stud.acs.upb.ro" },
              { img: imgAvatarDelia, name: "Manea Ștefania-Delia", email: "stefania.manea@stud.acs.upb.ro" },
              { img: imgAvatarStan, name: "Stan Andrei", email: "andrei.stan0605@stud.acs.upb.ro" },
              { img: imgAvatarMario, name: "Neagoe Mario-Alexandru", email: "mario.neagoe@stud.acs.upb.ro" },
            ].map(person => (
              <div key={person.email} className="text-center">
                <img src={person.img.src} className="w-32 h-32 mx-auto mb-4" />
                <h3 className="text-xl font-semibold">{person.name}</h3>
                <a
                  href={`mailto:${person.email}`}
                  className="text-indigo-500 hover:underline break-all"
                >
                  {person.email}
                </a>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* PLATFORM INFO */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

            {/* Availability */}
            <div className="flex gap-4">
              <div className="w-12 h-12">
                <svg fill="none" viewBox="0 0 24 24" className="w-full h-full">
                  <path d={svgPaths.p1d03af80} fill="#454545" />
                </svg>
              </div>
              <p>Platforma este disponibilă până pe 01.03.2026</p>
            </div>

            {/* Privacy */}
            <div className="flex gap-4">
              <div className="w-12 h-12">
                <svg fill="none" viewBox="0 0 24 29" className="w-full h-full">
                  <path d={svgPaths.p14860a00} fill="#454545" />
                </svg>
              </div>
              <p>Profilul și rezultatele sunt criptate și anonimizate</p>
            </div>

            {/* Results */}
            <div className="flex gap-4">
              <div className="w-12 h-12">
                <svg fill="none" viewBox="0 0 24 24" className="w-full h-full">
                  <path d={svgPaths.p3efda700} fill="#454545" />
                  <path d={svgPaths.pd0d2900} fill="#454545" />
                  <path d={svgPaths.p39f37100} fill="#454545" />
                  <path d={svgPaths.p12c20f00} fill="#454545" />
                </svg>
              </div>
              <p>
                Vei putea să vezi rezultatele studiului{" "}
                <a href="https://example.com" className="text-indigo-500 underline hover:text-indigo-700">
                  aici
                </a>
              </p>
            </div>

            {/* Profile */}
            <div className="flex gap-4">
              <div className="w-12 h-12">
                <svg fill="none" viewBox="0 0 24 24" className="w-full h-full">
                  <path d={svgPaths.p21e83200} fill="#454545" />
                </svg>
              </div>
              <p>
                Poți manageria sau șterge profilul{" "}
                <Link href="/profile" className="text-indigo-500 underline hover:text-indigo-700">
                  aici
                </Link>
              </p>
            </div>

          </div>

          {/* Stats Image */}
          <div className="flex justify-center">
            <img src={imgStats.src} className="max-w-2xl" alt="Statistics" />
          </div>

        </div>
      </section>

    </div>
  );
}

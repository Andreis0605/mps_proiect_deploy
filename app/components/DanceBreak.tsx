import Image from "next/image";
import imgImage63 from "../assets/ff414a1fdb3109c9e39e6ce6c894723816a836c3.png";
import imgImage57 from "../assets/c59910491ceb33b38d900a0da77002d76246614f.png";

export default function DanceBreak() {
  return (
    <div className="w-full bg-white py-20">
      <div className="w-full max-w-[1600px] mx-auto px-4">
        <div className="grid grid-cols-12 items-center gap-6 w-full">

          {/* Left illustration - occupies left columns, hidden on small screens */}
          <div className="col-span-12 md:col-span-3 hidden md:flex justify-center">
            <Image src={imgImage57} alt="Team Working" className="w-[420px] h-auto" />
          </div>

          {/* Center column: central box placed in center columns and centered */}
          <div className="col-span-12 md:col-span-6 flex justify-center">
            <div className="w-full max-w-4xl bg-purple-900/80 text-white text-center py-16 px-8 md:px-16 rounded-3xl shadow-2xl backdrop-blur-sm">
              <h2 className="text-5xl mb-4">Stop!</h2>
              <p className="text-xl">Mică pauză de dans ca să te reîncarci</p>
            </div>
          </div>

          {/* Right illustration - occupies right columns, hidden on small screens */}
          <div className="col-span-12 md:col-span-3 hidden md:flex justify-center">
            <Image src={imgImage63} alt="Dancing" className="w-[420px] h-auto" />
          </div>

        </div>
      </div>
    </div>
  );
}

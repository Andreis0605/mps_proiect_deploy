import Image from "next/image";
import imgImage63 from "../assets/ff414a1fdb3109c9e39e6ce6c894723816a836c3.png";
import imgImage57 from "../assets/c59910491ceb33b38d900a0da77002d76246614f.png";

export default function DanceBreak() {
  return (
    <div className="relative w-full bg-white py-20 overflow-hidden">
      <div className="relative flex items-center justify-between max-w-[1600px] mx-auto">

        <div className="flex-shrink-0">
          <Image src={imgImage57} alt="Team Working" className="w-[520px] h-auto" />
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 z-10 bg-purple-900/70 text-white text-center py-12 px-16 rounded-3xl shadow-2xl backdrop-blur-sm">
          <h2 className="text-5xl mb-4">Stop!</h2>
          <p className="text-xl">Mică pauză de dans ca să te reîncarci</p>
        </div>

        <div className="flex-shrink-0">
          <Image src={imgImage63} alt="Dancing" className="w-[520px] h-auto" />
        </div>

      </div>
    </div>
  );
}

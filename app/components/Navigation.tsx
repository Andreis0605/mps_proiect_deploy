"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from 'react';
import { findUserByEmail } from '../../firebase/auth';

// existing profile button will be rendered inside ItemsVariant

function ItemsVariant({ avatarSrc, isGamified }: { avatarSrc?: string | null, isGamified: boolean | null }) {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? "opacity-100 border-b-2 border-white pb-1" : "opacity-80 hover:opacity-100";

  return (
    <div className="flex items-center gap-6" data-name="Items/Variant6">

      <Link href="/home" className={`text-white transition-all ${isActive("/home")}`}>
        <p className="text-sm">Home</p>
      </Link>

      <Link
        href="/learning-experience"
        className={`text-white transition-all ${isActive("/learning-experience")}`}
      >
        <p className="text-sm">Learning Experience</p>
      </Link>

      <Link
        href="/evaluation"
        className={`text-white transition-all ${isActive("/evaluation")}`}
      >
        <p className="text-sm">Evaluation</p>
      </Link>
      {isGamified === true && (
        <Link
          href="/scoreboard"
          className={`text-white transition-all ${isActive("/scoreboard")}`}
        >
          <p className="text-sm">Scoreboard</p>
        </Link>
      )}

      <Link href="/profile" className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
        {avatarSrc ? (
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <img src={avatarSrc} alt="avatar" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div aria-hidden="true" className="w-6 h-6 rounded-full bg-gray-300" />
        )}
        <p className="text-sm">Profilul meu</p>
      </Link>
    </div>
  );
}

export default function Navigation() {
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [isGamified, setIsGamified] = useState<boolean | null>(null);

  useEffect(() => {
    const read = () => {
      try {
        const s = localStorage.getItem('sessionUser');
        if (!s) { setAvatarSrc(null); return; }
        const u = JSON.parse(s);
        setAvatarSrc(u && u.avatarImage ? u.avatarImage : null);
        // pick up the gamification flag if present in the client session copy
        if (u && typeof u.gamification !== 'undefined') {
          setIsGamified(Boolean(u.gamification));
        } else if (u && u.email) {
          // fetch the authoritative user record to learn gamification
          findUserByEmail(u.email).then(user => {
            if (user && typeof user.gamification !== 'undefined') setIsGamified(Boolean(user.gamification));
          }).catch(() => {
            // keep null on error
          });
        }
      } catch (err) {
        setAvatarSrc(null);
      }
    };

    read();
    const onChange = () => read();
    window.addEventListener('sessionUserChanged', onChange);
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener('sessionUserChanged', onChange);
      window.removeEventListener('storage', onChange);
    };
  }, []);

  return (
    <nav
      className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 text-white"
      data-name="Navigation"
    >
      <div className="flex items-center">
        <p className="text-sm">Studiul aportului gamificării asupra învățării</p>
      </div>
      <ItemsVariant avatarSrc={avatarSrc} isGamified={isGamified} />
    </nav>
  );
}

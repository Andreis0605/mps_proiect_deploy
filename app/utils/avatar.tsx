"use client";

import * as React from "react";

// Avatar images from figma:asset
import imgAvatar01 from "../assets/avatars/avatar_01.png";
import imgAvatar02 from "../assets/avatars/avatar_02.png";
import imgAvatar03 from "../assets/avatars/avatar_03.png";
import imgAvatar04 from "../assets/avatars/avatar_04.png";
import imgAvatar05 from "../assets/avatars/avatar_05.png";
import imgAvatar06 from "../assets/avatars/avatar_06.png";
import imgAvatar07 from "../assets/avatars/avatar_07.png";
import imgAvatar08 from "../assets/avatars/avatar_08.png";
import imgAvatar09 from "../assets/avatars/avatar_09.png";
import imgAvatar10 from "../assets/avatars/avatar_10.png";
import imgAvatar11 from "../assets/avatars/avatar_11.png";
import imgAvatar12 from "../assets/avatars/avatar_12.png";
import imgAvatar13 from "../assets/avatars/avatar_13.png";
import imgAvatar14 from "../assets/avatars/avatar_14.png";
import imgAvatar15 from "../assets/avatars/avatar_15.png";
import imgAvatar16 from "../assets/avatars/avatar_16.png";
import imgAvatar17 from "../assets/avatars/avatar_17.png";
import imgAvatar18 from "../assets/avatars/avatar_18.png";
import imgAvatar19 from "../assets/avatars/avatar_19.png";
import imgAvatar20 from "../assets/avatars/avatar_20.png";
import imgAvatar21 from "../assets/avatars/avatar_21.png";
import imgAvatar22 from "../assets/avatars/avatar_22.png";
import imgAvatar23 from "../assets/avatars/avatar_23.png";
import imgAvatar24 from "../assets/avatars/avatar_24.png";


// Avatar database
export const AVATARS = [
  { id: 1, image: imgAvatar01 },
  { id: 2, image: imgAvatar02 },
  { id: 3, image: imgAvatar03 },
  { id: 4, image: imgAvatar04 },
  { id: 5, image: imgAvatar05 },
  { id: 6, image: imgAvatar06 },
  { id: 7, image: imgAvatar07 },
  { id: 8, image: imgAvatar08 },
  { id: 9, image: imgAvatar09 },
  { id: 10, image: imgAvatar10 },
  { id: 11, image: imgAvatar11 },
  { id: 12, image: imgAvatar12 },
  { id: 13, image: imgAvatar13 },
  { id: 14, image: imgAvatar14 },
  { id: 15, image: imgAvatar15 },
  { id: 16, image: imgAvatar16 },
  { id: 17, image: imgAvatar17 },
  { id: 18, image: imgAvatar18 },
  { id: 19, image: imgAvatar19 },
  { id: 20, image: imgAvatar20 },
  { id: 21, image: imgAvatar21 },
  { id: 22, image: imgAvatar22 },
  { id: 23, image: imgAvatar23 },
  { id: 24, image: imgAvatar24 }
];

// Safe client-only getter
export function getUserAvatar() {
  if (typeof window === "undefined") {
    return AVATARS[0]; // SSR-safe fallback
  }

  const savedId = window.localStorage.getItem("userAvatar");
  const avatarId = savedId ? Number(savedId) : 1;

  return AVATARS.find((a) => a.id === avatarId) || AVATARS[0];
}

interface AvatarDisplayProps {
  avatarId?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  selected?: boolean;
  onClick?: () => void;
}

// Avatar component
export function AvatarDisplay({
  avatarId,
  size = "md",
  className = "",
  selected = false,
  onClick
}: AvatarDisplayProps) {
  const avatar = avatarId
    ? AVATARS.find((a) => a.id === avatarId) || AVATARS[0]
    : getUserAvatar();

  const sizes = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-20 h-20"
  };

  return (
    <div
      onClick={onClick}
      className={`${sizes[size]} rounded-full overflow-hidden transition-all cursor-pointer ${className} ${
        selected ? "ring-4 ring-purple-600 scale-110" : ""
      }`}
    >
      <img
        src={avatar.image.src}  // <-- FIXED
        alt={`Avatar ${avatar.id}`}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

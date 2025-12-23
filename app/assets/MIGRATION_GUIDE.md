# Next.js Migration Guide

## Current Setup (Figma Make)

The avatar system currently uses `figma:asset` imports that are specific to the Figma Make environment. All avatar images are referenced through `/utils/avatar-assets.ts`.

## Migration Steps for Next.js Production

### Step 1: Export Avatar Images from Figma

1. Open your Figma file containing the Frame1 component with 24 avatars
2. Select each avatar individually
3. Export Settings:
   - Format: PNG
   - Size: 2x (for retina displays)
   - Recommended resolution: 400x400px
4. Save files as: `avatar-01.png` through `avatar-24.png`
5. Use `/assets/ASSET_MAPPING.md` to match each Figma asset ID to the correct file name

### Step 2: Place Files in Next.js Project

```
your-nextjs-project/
└── public/
    └── assets/
        └── avatars/
            ├── avatar-01.png
            ├── avatar-02.png
            ├── ...
            └── avatar-24.png
```

### Step 3: Update `/utils/avatar-assets.ts`

Replace the entire file with:

```typescript
/**
 * Avatar Asset Mapping - Next.js Version
 */

export const AVATAR_IMAGES = [
  "/assets/avatars/avatar-01.png",  // Male with glasses, brown short hair
  "/assets/avatars/avatar-02.png",  // Male with blonde short hair
  "/assets/avatars/avatar-03.png",  // Male with dark turban and beard
  "/assets/avatars/avatar-04.png",  // Female with long dark hair
  "/assets/avatars/avatar-05.png",  // Male with blonde short hair and bowtie
  "/assets/avatars/avatar-06.png",  // Female with pink short hair and glasses
  "/assets/avatars/avatar-07.png",  // Male in suit with brown short hair
  "/assets/avatars/avatar-08.png",  // Female with brown medium hair
  "/assets/avatars/avatar-09.png",  // Male with dark short hair and glasses
  "/assets/avatars/avatar-10.png",  // Male with dark curly hair
  "/assets/avatars/avatar-11.png",  // Male with blonde short hair
  "/assets/avatars/avatar-12.png",  // Female with blonde medium hair
  "/assets/avatars/avatar-13.png",  // Female with black bob cut
  "/assets/avatars/avatar-14.png",  // Female with brown long hair
  "/assets/avatars/avatar-15.png",  // Male with brown spiky hair
  "/assets/avatars/avatar-16.png",  // Male with brown short hair and glasses
  "/assets/avatars/avatar-17.png",  // Male with red hair and beard
  "/assets/avatars/avatar-18.png",  // Female with red curly hair
  "/assets/avatars/avatar-19.png",  // Male with dark short hair and glasses
  "/assets/avatars/avatar-20.png",  // Female with black bob cut
  "/assets/avatars/avatar-21.png",  // Male with dark hair and beard
  "/assets/avatars/avatar-22.png",  // Female with brown hair in bun
  "/assets/avatars/avatar-23.png",  // Male, bald
  "/assets/avatars/avatar-24.png",  // Male with gray short hair
];

export function getAvatarImage(id: number): string {
  return AVATAR_IMAGES[id - 1] || AVATAR_IMAGES[0];
}
```

### Step 4: Update Avatar Display Component (Optional - for optimization)

In `/utils/avatar.ts`, optionally replace the `<img>` tag with Next.js `Image` component:

```typescript
import Image from 'next/image';

export function AvatarDisplay({ avatarId, size = "md", className = "", selected = false, onClick }: AvatarDisplayProps) {
  const avatar = avatarId ? AVATARS.find(a => a.id === avatarId) || AVATARS[0] : getUserAvatar();
  
  const pixelSizes = {
    sm: 40,
    md: 64,
    lg: 80
  };
  
  const tailwindSizes = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-20 h-20"
  };
  
  return (
    <div 
      onClick={onClick}
      className={`${tailwindSizes[size]} rounded-full overflow-hidden transition-all relative ${className} ${
        selected ? 'ring-4 ring-purple-600 scale-110' : ''
      }`}
    >
      <Image 
        src={avatar.image} 
        alt={`Avatar ${avatar.id}`}
        width={pixelSizes[size]}
        height={pixelSizes[size]}
        className="object-cover"
        priority={size === "lg"} // Priority load for large avatars
      />
    </div>
  );
}
```

### Step 5: Verify Everything Works

1. Run `npm run dev` or `yarn dev`
2. Navigate to the Profile page
3. Verify all 24 avatars display correctly
4. Test avatar selection and persistence
5. Check that the selected avatar appears in the navbar

## Files That Need No Changes

These files will work as-is after updating `avatar-assets.ts`:
- ✅ `/utils/avatar.ts` (unless you want to use Next.js Image optimization)
- ✅ `/pages/Profile.tsx`
- ✅ `/components/Navigation.tsx`
- ✅ All other pages and components

## Summary

**Only 1-2 files need modification:**
1. **Required:** `/utils/avatar-assets.ts` - Change imports to path strings
2. **Optional:** `/utils/avatar.ts` - Use Next.js `Image` component for optimization

Everything else continues to work without changes! 🎉

# Assets Directory

This folder contains static assets for the educational gamification website.

## Structure

```
/assets
├── avatars/          # User profile avatars (24 avatar images)
├── images/           # General images and illustrations
└── icons/            # Custom icons and SVG files
```

## Avatar Images

The `/assets/avatars/` folder should contain 24 avatar PNG files:

- `avatar-01.png` through `avatar-24.png`
- Recommended size: 200x200px or 400x400px for retina displays
- Format: PNG with transparent background preferred

### Exporting from Figma:
1. Open your Figma file containing the Frame1 component
2. Select all 24 avatar images
3. Right-click → Export → PNG (2x for better quality)
4. Name them sequentially: avatar-01.png, avatar-02.png, etc.
5. Place them in `/assets/avatars/` folder

## Migration to Next.js

When migrating this project to Next.js:

1. Move `/assets` folder to `/public/assets` in your Next.js project
2. Update all image paths from `figma:asset/...` to `/assets/avatars/avatar-XX.png`
3. Replace `<img>` tags with Next.js `<Image>` component
4. Update the `avatar.ts` utility file to use public paths instead of figma:asset imports

### Example Next.js Path:
```typescript
// Before (Figma Make)
import imgAvatar01 from "figma:asset/1272ba1c71b794ecb216fe6b8692da68114ba4ce.png";

// After (Next.js)
const imgAvatar01 = "/assets/avatars/avatar-01.png";
```

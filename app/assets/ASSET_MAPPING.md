# Asset ID to File Name Mapping

This document maps the current Figma asset IDs to their corresponding file names for migration.

## Avatar Images

When exporting from Figma, these asset IDs correspond to the following files:

| File Name | Figma Asset ID | Description |
|-----------|----------------|-------------|
| avatar-01.png | 1272ba1c71b794ecb216fe6b8692da68114ba4ce.png | Male with glasses, brown short hair |
| avatar-02.png | ea2a79a0c7c4aea79f33b2a8cb39c9f2c00c4e4e.png | Male with blonde short hair |
| avatar-03.png | 43553a979261352144e0bd8ea9c0622d5ea01e9b.png | Male with dark turban and beard |
| avatar-04.png | c7947a0d26ab4233ff9f6ea7177244651b94d4cf.png | Female with long dark hair |
| avatar-05.png | 6b5f0aeb9b0da56827284349ad547e071f03325a.png | Male with blonde short hair and bowtie |
| avatar-06.png | 9d5548f4261b0797c111f49fce71be3e379422d2.png | Female with pink short hair and glasses |
| avatar-07.png | e65582a8f034efff7205b5646407aa875c4bf7df.png | Male in suit with brown short hair |
| avatar-08.png | 8231d8bdd982d5f17ebf76e39c9482f74c7a9d74.png | Female with brown medium hair |
| avatar-09.png | f91d1dccced81944543a414a6c594c1120a527b9.png | Male with dark short hair and glasses |
| avatar-10.png | 1579c3106e2e5ab604a9bde998d8c605b070ee6d.png | Male with dark curly hair |
| avatar-11.png | 660db91c037dfcc9ec9b98a3ef629a7bc3b58e96.png | Male with blonde short hair |
| avatar-12.png | 86a0402ef9c4ddbfdb02b5645b9e00d36685735b.png | Female with blonde medium hair |
| avatar-13.png | 62000e36dcd9f5444533c4f8c6fa4dc4e31e7e43.png | Female with black bob cut |
| avatar-14.png | 4c062d485e36faec89c16fb89b4512f116797c16.png | Female with brown long hair |
| avatar-15.png | e32525b0707ca42758e4b76315fffff239797b7c.png | Male with brown spiky hair |
| avatar-16.png | a4142dea848c34b4bf53584b309809d0bf9aa655.png | Male with brown short hair and glasses |
| avatar-17.png | 8d265bb77a6cc787ff77f11ce6d29f3974b1ff32.png | Male with red hair and beard |
| avatar-18.png | a05f5f63f8387fd94774f160ebd1b7248d3a2fd6.png | Female with red curly hair |
| avatar-19.png | ebd917f838269fc5e829060589fcd99f75fc260b.png | Male with dark short hair and glasses |
| avatar-20.png | 263c4344ec71e9c3f79c0dc5148c4d937a1f42bf.png | Female with black bob cut |
| avatar-21.png | 7aee0c7868c072b2e3e174e16b23089dfc3e8a8d.png | Male with dark hair and beard |
| avatar-22.png | 853f5b31790ffb8e05d8d387196bfb1b0e98ae3f.png | Female with brown hair in bun |
| avatar-23.png | 088dbd4d4e33fb0b3c31905bdee4f5fdd19e773f.png | Male, bald |
| avatar-24.png | 7507b44d14724d7698a00484ca1abf7e62a524f9.png | Male with gray short hair |

## How to Use This Mapping

1. **Export from Figma**: Use the Frame1 component to identify and export each avatar
2. **Rename Files**: After export, rename them according to the "File Name" column
3. **Verify**: Use the description column to ensure correct mapping
4. **Place in folder**: Move all renamed files to `/assets/avatars/`

## Next.js Migration Code

After placing files in the assets folder, update `/utils/avatar.ts`:

```typescript
// Replace the import section with:
export const AVATARS = [
  { id: 1, image: "/assets/avatars/avatar-01.png", gender: "male", hair: "brown short", accessory: "glasses" },
  { id: 2, image: "/assets/avatars/avatar-02.png", gender: "male", hair: "blonde short", accessory: "none" },
  // ... etc for all 24
];
```

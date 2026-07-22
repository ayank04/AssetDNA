# AssetDNA Frontend Design System

This document outlines the principles, conventions, and structures for the AssetDNA frontend platform. We are building a premium, Vercel/Linear-inspired interface characterized by minimal aesthetics, strict spacing, soft shadows, glassmorphism, and rigorous attention to detail.

## 1. Design Philosophy
- **Zero Magic Numbers:** Never hardcode px widths, hex colors, or custom opacities directly into components. Always use tailwind variants and `cva`.
- **Minimal & Premium:** Whitespace is your friend. Avoid visual clutter. Use typography and spacing to create hierarchy, not just borders or backgrounds.
- **Micro-interactions:** Interactive elements (cards, buttons) should respond to hover, but interactions should be subtle and smooth, avoiding "bouncy" or overly exaggerated movements.

## 2. Token Systems (`globals.css` & `tailwind.config.ts`)
- **Semantic Colors:** Stick strictly to `--primary`, `--muted`, `--success`, `--destructive`, `--warning`, `--info`. Do not introduce raw HEX colors in components.
- **Glassmorphism:** Use the utility classes `.glass` or `.glass-heavy`. The blur radii are strictly controlled by `--glass-blur` and `--glass-heavy-blur`.
- **Elevation System:** Use `shadow-elevation-1` through `3`. Do not create random shadow definitions in components. Dark mode elevation casts darker, less transparent shadows.

## 3. Typography (`src/components/ui/Typography.tsx`)
Never write `<h1 className="text-4xl font-bold">`. Instead, import and use our predefined typographic primitives to ensure identical line-heights, tracking, and responsive scaling:
- `DisplayXL`, `DisplayLarge`
- `H1`, `H2`, `H3`
- `Title`, `Subtitle`
- `BodyLarge`, `Body`, `Small`, `Caption`

## 4. Surfaces & Layout (`src/components/common/surfaces` & `layout`)
- Use `<AppContainer>` and `<ContentContainer>` to maintain global max-widths and side paddings.
- Use `<Section>` to consistently divide vertical content blocks.
- Wrap cards in `<Surface>` or `<ElevatedSurface>`.

## 5. Animation Constants (`src/constants/design.ts`)
When writing Framer Motion variants, never use raw numbers like `duration: 0.3`. Instead use:
- `ANIMATION_SPEEDS.NORMAL`
- `EASINGS.EMPHASIZED_EASE`

## 6. Feedback States
- Loading: Always use `Skeleton` or predefined composite skeletons like `<CardSkeleton>` instead of standard spinners for content sections.
- Empty: Use `EmptyState` primitives (e.g., `<NoDocuments />`, `<NoResults />`).
- Error: Use `ErrorState` primitives (e.g., `<NetworkError />`, `<ServerError500 />`).

# Designer Radar - Project Guide

## Overview
Interactive radar/spider chart for assessing product designer & UX designer skills at startups leveraging AI tools and coding. Built with Next.js 16, Tailwind CSS v4, Visx, and Framer Motion.

## Tech Stack
- **Framework:** Next.js 16 (App Router, TypeScript, Turbopack)
- **Styling:** Tailwind CSS v4 (CSS-based config via `@theme inline` in globals.css)
- **Charts:** Visx (D3 primitives wrapped in React) - `@visx/scale`, `@visx/shape`, `@visx/group`
- **Animations:** Framer Motion v12 (`motion.*` components, `AnimatePresence`, spring transitions)
- **State:** nuqs for URL-synced state, React hooks for local state
- **Theme:** next-themes with `data-theme` attribute
- **Export:** html-to-image for PNG/SVG export

## Project Structure
```
src/
├── app/          # Next.js App Router (layout, page, providers, globals.css)
├── components/
│   ├── chart/    # RadarChart, RadarGrid, RadarAxes, RadarPolygon, RadarPoints, ChartContainer
│   ├── controls/ # SliderPanel, SkillSlider, PresetSelector, CompareMode
│   ├── export/   # ExportPanel
│   └── layout/   # Header, ThemeToggle
├── hooks/        # useRadarData (URL state), useProfiles (localStorage), useChartExport, useTilt
├── lib/          # chart-math.ts (polar coords), url-codec.ts (nuqs parser), constants.ts
├── data/         # skills.ts, categories.ts, presets.ts, defaults.ts
└── types/        # chart.ts (TypeScript interfaces)
```

## Key Patterns
- All components are `'use client'` since this is an interactive SPA
- Chart is SVG-based using polar coordinate math from `lib/chart-math.ts`
- 12 skill data points organized into 3 categories (Design Craft, Tech & AI, Startup Dynamics)
- Scores are 0-100 integers, synced to URL via compact encoding in `lib/url-codec.ts`
- Theme colors use CSS custom properties defined in `globals.css` (`--indigo`, `--cyan`, `--amber`)
- Framer Motion spring animations on `motion.path` for smooth polygon morphing

## Commands
- `npm run dev` - Start dev server (Turbopack)
- `npm run build` - Production build
- `npm run lint` - ESLint

## Conventions
- Use CSS custom properties (e.g., `var(--foreground)`) for theme-aware colors in SVG
- Tailwind classes reference theme vars via `@theme inline` mapping (e.g., `text-foreground`, `bg-background`)
- Category colors: Design Craft = indigo, Tech & AI = cyan, Startup Dynamics = amber
- All chart geometry uses `lib/chart-math.ts` functions
- Scores state flows: page.tsx -> useRadarData -> nuqs URL -> components

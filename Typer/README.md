# ⚡ SpeedTyper & Search (React Performance Benchmark)

A high-performance React + TypeScript application engineered to demonstrate **zero-lag rendering**, memory stability, and efficient computation handling with high-frequency state updates and a 4,000+ item in-memory dataset.

---

## 🎯 The Performance Problem
In standard React applications:
1. **High-Frequency Ticks:** Running a 1-second interval timer triggers frequent component-wide re-renders.
2. **Expensive Computations:** Heavy calculations (filtering an array of 4,000 objects) re-run on every unrelated tick, causing UI stutter and frame drops.
3. **Broken Referential Equality:** Callback functions recreate on every render, invalidating child memoization.

---

## 🛠️ Architectural Solutions

- **`useRef` for Lifecycle & Direct DOM Access:**
  - Manages automatic input focus without extra renders.
  - Safely stores and cleans up the active timer ID (`timerIdRef`), completely preventing memory leaks.
- **`useMemo` for In-Memory Data Caching:**
  - Isolates and caches the 4,000-word search filter.
  - Unrelated timer ticks **do not** re-trigger array filtering operations.
- **`useCallback` + `React.memo` for Pure Components:**
  - Locks function references (`handleReset`) across render passes.
  - Completely eliminates ghost re-renders in the `ActionButton` component.
- **DOM Rendering Optimization:**
  - Implements lightweight UI virtualization using `.slice(0, 20)` to maintain high FPS and low DOM node count.

---

## 🚀 Tech Stack
- **Framework:** React 18 / 19
- **Language:** TypeScript (Strict typing for Props, Ref, and Data structures)
- **Tooling:** Vite

---

## 💻 How to Run Locally
```bash
# 1. Clone repository
git clone https://github.com/rda602785-glitch/speed-search-engine.git

# 2. Install dependencies
npm install

# 3. Launch development server
npm run dev

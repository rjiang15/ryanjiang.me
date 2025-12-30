"use client"

import { useMemo, useState } from "react"
import styles from "./research.module.css"

type ResearchItem = {
  id: string
  title: string
  date: string // ISO YYYY-MM-DD
  frontText: string // few words centered on front
  blurb: string // italic paragraph
  bullets: string[]
  tags: string[]
  paperUrl: string
}

const RESEARCH: ResearchItem[] = [
  {
    id: "example-1",
    title: "MAV-EI: Multi-Verifier Selection for Embodied Control and Intelligence",
    date: "2025-12-04",
    frontText: "Compositional AI for dynamic simulated hardware",
    blurb: "Combining small verifiers has been demonstrated to work in static environments. We extend this to dynamic environments via the OpenAI Gymnasium's Lunar Lander module.",
    bullets: [
      "Proposed MAV-EI, a multi-verifier control framework that decouples fast action proposal from lightweight online verification",
      "Combined a Streaming Diffusion Policy with image- and state-based verifiers targeting distinct failure modes in real-time control",
      "Demonstrated on Gymnasium Lunar Lander that hybrid multi-verifier selection improves success rate, tightens reward variance, and reduces catastrophic failures"
    ],
    tags: ["Compositional AI", "Simulated Hardware"],
    paperUrl: "https://drive.google.com/file/d/1q3RlWP7T7r3omhER_ZMUTmcgnMyDhIlN/view?usp=sharing",
  },
  {
    id: "example-2",
    title: "Cognizant Confidence: Can Large Language Models Know When They're Right?",
    date: "2025-11-29",
    frontText: "Language models and predicted correctness from uncertainty",
    blurb: "The logits of an LLM are a representation of its confidence in an answer. We investigate whether these logics contain any implicit predictive power regarding an answer's hallucinatory status.",
    bullets: ["Utilized Meta's HalluLens dataset to generate balanced datasets of hallucinated and non-hallucinated responses", "Built 2 binary classification models (MLP and transformer) with predictive power based on the logits", "Demonstrated that logits can be used to predict hallucinations when the model interprets them accounting for temporal structure"],
    tags: ["Large Language Models", "Transformers", "Logit Analysis"],
    paperUrl: "https://drive.google.com/file/d/1n-VgI6L_N1QY6eltUCUWBKayEN_VkFa7/view?usp=sharing",
  },
  {
    id: "example-3",
    title: "Evaluation and Comparison of Graph Summarization Methods",
    date: "2025-05-01",
    frontText: "Graph summarization with big data",
    blurb: "As data networks grow exponentially, new techniques to maintain key metrics are needed while compressing down nodes and edges. However, different techniques are needed for different purposes.",
    bullets: ["Surveyed 3 methods (spectral sparsification, community collapse, spectral coarsening) across 5 metrics (spectral accuracy, community preservation, distance distortion, centrality retention, and compression)", "Theoretically demonstrated how each paradigm contains its own trade-off regime and demonstrated through experiments on web-Google, web-Stanford, web-BerkStan, and web-NotreDame datasets", "Determined community collapse excels at extreme compression with strong spectral and distance fidelity, sparsification is fastest and best preserves community structure, and spectral coarsening most accurately retains influential nodes via PageRank"],
    tags: ["Network Analysis", "Graph Compression"],
    paperUrl: "https://drive.google.com/file/d/19Bnz8VVOXpv4pt6dEPu8nq7mQTWKhnCO/view?usp=sharing",
  },
  {
    id: "example-4",
    title: "Predicting Presidential Elections with the S&P",
    date: "2024-12-01",
    frontText: "Predicting voting behavior from market data",
    blurb: "Financial markets are often treated as a proxy for economic confidence, but it’s unclear whether short-term market performance actually influences how people vote. We study whether S&P 500 returns in the three months before an election predict Democratic vote share at the state level, while accounting for persistent state-specific political leanings.",
    bullets: [
      "Aggregated 40 years of state-level presidential election results with 3-month pre-election S&P 500 returns",
      "Used baseline, random-intercept, and random-slope regressions to capture persistent state-level voting behavior",
      "Found state partisan baselines dominate predictive power, with market effects reversing depending on incumbent party"
    ],
    tags: ["Linear Regression", "Mixed-Effects Models", "Time-Series Analysis"],
    paperUrl: "https://drive.google.com/file/d/1Iy9Xbm4fUZORmaK6kfSpImVLJVV53h9n/view?usp=sharing",
  },
]

function formatDate(iso: string) {
  const [y, m] = iso.split("-")
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const mi = Math.max(1, Math.min(12, Number(m))) - 1
  return `${months[mi]} ${y}`
}

export default function ResearchPage() {
  const sorted = useMemo(() => {
    return [...RESEARCH].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  }, [])

  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [enterDir, setEnterDir] = useState<"left" | "right" | null>(null)

  const current = sorted[idx]

  const canLeft = idx > 0
  const canRight = idx < sorted.length - 1

  function goLeft() {
    if (!canLeft) return
    setEnterDir("left")
    setIdx((v) => v - 1)
    setFlipped(false)
  }

  function goRight() {
    if (!canRight) return
    setEnterDir("right")
    setIdx((v) => v + 1)
    setFlipped(false)
  }

  // Reset enter animation class after it runs
  function handleAnimEnd() {
    setEnterDir(null)
  }

  const enterClass =
    enterDir === "left" ? styles.enterFromLeft : enterDir === "right" ? styles.enterFromRight : ""

  return (
    <main className={styles.wrap}>
      {/* title removed to declutter UI */}

      {/* Show buttons only when possible */}
      {canLeft && (
        <button className={`${styles.navBtn} ${styles.leftBtn}`} onClick={goLeft} aria-label="Previous">
          ‹
        </button>
      )}
      {canRight && (
        <button className={`${styles.navBtn} ${styles.rightBtn}`} onClick={goRight} aria-label="Next">
          ›
        </button>
      )}

      <div className={styles.stage}>
        <div className={`${styles.enterWrap} ${enterClass}`} onAnimationEnd={handleAnimEnd}>
          <div className={styles.cardOuter}>
            <div
              className={`${styles.card} ${flipped ? styles.cardFlipped : ""}`}
              onClick={() => setFlipped((v) => !v)}
              role="button"
              tabIndex={0}
              aria-label="Flip card"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setFlipped((v) => !v)
                if (e.key === "ArrowLeft") goLeft()
                if (e.key === "ArrowRight") goRight()
              }}
            >
              {/* FRONT */}
              <div className={`${styles.face} ${styles.front}`}>
                <div className={styles.frontText}>{current.frontText}</div>
              </div>

              {/* BACK */}
              <div className={`${styles.face} ${styles.back}`}>
                <div className={styles.backTop}>
                  <h2 className={styles.backTitle}>{current.title}</h2>
                  <div className={styles.backDate}>{formatDate(current.date)}</div>
                </div>

                <p className={styles.backBlurb}>{current.blurb}</p>

                <ul className={styles.bullets}>
                  {current.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>

                <div className={styles.backBottomRow}>
                  <a className={styles.viewBtn} href={current.paperUrl} target="_blank" rel="noreferrer">
                    View the Paper
                  </a>

                  <div className={styles.tags} aria-label="Tags">
                    {current.tags.map((t) => (
                      <span key={t} className={styles.tag}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.hint}>Click the card to flip • Use ← / → to navigate</div>
    </main>
  )
}

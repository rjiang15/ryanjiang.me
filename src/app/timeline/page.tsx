"use client"

import { useEffect, useMemo, useState } from "react"
import styles from "./timeline.module.css"

type TimelineEvent = {
  id: string
  title: string
  date: string // ISO YYYY-MM-DD
  blurb: string
  body: string[] // paragraphs
  imageSrc?: string // e.g. "/img/timeline/foo.jpg"
}

const EVENTS: TimelineEvent[] = [
  {
    id: "harvard-junior-ecs",
    title: "Harvard Junior Year Extracurriculars",
    date: "2025-09-01",
    blurb: "Harvard Teaching Fellow (STAT 110),\nHarvard Ultimate Frisbee Team (Varsity Captain)",
    body: [
      "This year, I got to be a teaching fellow with my older brother, marking the first ever instance of a sibling duo teaching together in the course's history. We led weekly sections and office hours regarding course content, graded homeworks and exams, and helped manage logistics for 450+ students.",
      "My third year on Red Line was also my first year as Varsity Captain; I expanded stat tracking to create REALMS - an internal matchmaking tool and stat tracker (more can be found in the projects page). In addition, I led recruitment, bringing in 10 new players onto the team, most of whom had never heard of the sport. In these efforts, I expanded the social media presense of the team by creating highlight reels and team graphics."
    ],
    imageSrc: "/img/timeline/junior-ecs.JPG",
  },
  {
    id: "summer-2025",
    title: "Summer 2025",
    date: "2025-06-01",
    blurb: "New York City, New York.",
    body: [
      "I spent this summer working at Bloomberg LP as a Software Engineering Intern. I was on the Data Generation Team, which is responsible for creating volatility surfaces that are used to price options. My role on the team was to build a distributed cache from scratch using Redis. With help from my mentor, I prototyped and implemented a design that reduced delays by 80%. I also created internal documentation and dashboards for monitoring live traffic via Humio.",
      "Outside of work, I was a participant of HackNY, which is a summer fellowship program that links students with startup founders and alumni on how to create technology that can change the lives of individuals."
    ],
    imageSrc: "/img/timeline/summer-25.png",
  },
  {
    id: "harvard-sophomore-ecs",
    title: "Harvard Sophomore Year Extracurriculars",
    date: "2024-09-01",
    blurb: "Harvard Open Data Project (Education Director),\nHarvard Ultimate Frisbee Team (Player)",
    body: [
      "Becoming the Education Director for HODP, I rebuilt the entire curriculum around data science fundamentals. We focused on scraping, data privacy, cleaning, and introductory modeling. I also spearheaded an initiative for hosting office hours and reviewing article drafts before Demo Day.",
      "My second year on Red Line was a major stepping stone; I introduced stat tracking and set plays to the team, while also taking the role as the center O-line handler. I led the team in assists, completions, touches, and catches."
    ],
    imageSrc: "img/timeline/sophomore-ecs.png",
  },
  {
    id: "summer-2024",
    title: "Summer 2024",
    date: "2024-06-01",
    blurb: "San Francisco, California.",
    body: [
      "Worked as a Software Engineering Intern with Demi AI, a startup designed to build autonomous AI agents that would pipeline data science tasks. I worked on an MVP that enabled live user chat with options for text and imagery. I also added project history support with integration through PostGreSQL, and collaborated with the team to improve framework designs.",
      "I also worked as a contractor with the Political Action Committee, With Honor. They focus on electing veterans to public office who are committed to principled leadership and cross-partisan cooperation. I built a Streamlit dashboard that helped them earn 6-figure donations in their ad campaigns. More information can be found in the projects tab.",
    ],
    imageSrc: "/img/timeline/summer-24.png",
  },
  {
    id: "coca-cola",
    title: "Coca Cola Internship",
    date: "2024-01-29",
    blurb: "Semester-long Remote Data Science Internship.",
    body: [
      "Scraped and cleaned public/private data to analyze feature correlations and visualizations. Our task was to use machine learning to predict the top-line drivers of various product lines for FY24-FY26. Built a Streamlit dashboard to contain all visualizations and model results for easy stakeholder access. Presented to Coca-Cola's Senior Manager of Finance.",
    ],
    imageSrc: "/img/timeline/coca-cola.png",
  },
  {
    id: "harvard-freshman-ecs",
    title: "Harvard Freshman Year Extracurriculars",
    date: "2023-09-01",
    blurb: "Harvard Data Analytics Group (Member, Associate),\nHarvard Open Data Project (Member),\nHarvard Financial Analytics Club – Quant (Member),\nHarvard Ultimate Frisbee Team (Player)",
    body: [
      "The Harvard Data Analytics Group is a student-run organization focused on data science and analytics. We consult for real-world clients, providing data-driven solutions to complex problems.",
      "The Harvard Open Data Project is a student group focusing on the preservation of data transparency through journalism. During my time as a member, I completed the 12-week semester track on introductory data science and published an article on the salaries of public workers in the City of Cambridge by scraping public data, performing trend analysis, and proposing policy recommendations.",
      "The Harvard Financial Analytics Club hosts two lecture-based tracks regarding traditional and quantitative finance. I spent a semester in the Quant track learning about financial modeling, asset pricing, and algorithmic trading.",
      "Harvard Red Line is Harvard's Men's Ultimate Frisbee A-team. Red Line was a natural continuation of my frisbee journey after playing for years in middle school and high school"
    ],
    imageSrc: "/img/timeline/freshman-ecs.JPG",
  },
  {
    id: "hs-graduation",
    title: "Graduated Edina High School",
    date: "2023-06-09",
    blurb: "Committed to Harvard University (Class of 2027).",
    body: [
      "17 AP courses completed, all with scores of 5s. National AP Scholar.",
      "Ranked #1 in the country for Public Forum Debate (2022-2023). x6 National Champion, All-American, National Speech and Debate Premier Distinction.",
      "National Merit Scholar. Diploma with Honors, 4.3/4.0 GPA.",
      "Edina Varsity Ultimate Frisbee team player. Minnesota Sectional and State Champion (2022). 5th place at High School Nationals. Member of the Minnesota U-20 Youth Club Championship team (2022, 2023). 4th at nationals (2022, 2023)."
    ],
    imageSrc: "/img/timeline/hs-grad.jpg",
  },
]

function formatDate(iso: string) {
  const [y, m] = iso.split("-")
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const mi = Math.max(1, Math.min(12, Number(m))) - 1
  return `${months[mi]} ${y}`
}

export default function TimelinePage() {
  const sorted = useMemo(() => {
    // newest first
    return [...EVENTS].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  }, [])

  const [openId, setOpenId] = useState<string | null>(null)
  const selected = useMemo(() => sorted.find((e) => e.id === openId) ?? null, [sorted, openId])

  // ESC closes modal
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenId(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <main className={styles.wrap}>
      <div className={styles.titleRow}>
        <h1 className={styles.h1}>Timeline</h1>
      </div>

      <div className={styles.scroller}>
        <div className={styles.timeline}>
          {sorted.map((ev, i) => {
            const isLeft = i % 2 === 0

            return (
              <div
                key={ev.id}
                className={`${styles.itemRow} ${isLeft ? styles.rowLeft : styles.rowRight}`}
              >
                {/* Left column */}
                {isLeft ? (
                  <div className={`${styles.card} ${styles.leftCard}`}>
                    <div className={styles.cardTop}>
                      <h2 className={styles.cardTitle}>{ev.title}</h2>
                      <div className={styles.cardDate}>{formatDate(ev.date)}</div>
                    </div>
                    <p className={styles.cardBlurb}>{ev.blurb}</p>
                    <button className={styles.readMore} onClick={() => setOpenId(ev.id)}>
                      read more
                    </button>
                  </div>
                ) : (
                  <div />
                )}

                {/* Middle dot column (always exists on desktop) */}
                <div className={styles.dotCol}>
                  <div className={styles.dot} />
                </div>

                {/* Right column */}
                {!isLeft ? (
                  <div className={`${styles.card} ${styles.rightCard}`}>
                    <div className={styles.cardTop}>
                      <h2 className={styles.cardTitle}>{ev.title}</h2>
                      <div className={styles.cardDate}>{formatDate(ev.date)}</div>
                    </div>
                    <p className={styles.cardBlurb}>{ev.blurb}</p>
                    <button className={styles.readMore} onClick={() => setOpenId(ev.id)}>
                      read more
                    </button>
                  </div>
                ) : (
                  <div />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal overlay */}
      {selected && (
        <div
          className={styles.overlay}
          onMouseDown={(e) => {
            // clicking outside closes modal
            if (e.target === e.currentTarget) setOpenId(null)
          }}
        >
          <div className={styles.modal} role="dialog" aria-modal="true">
            <div className={styles.modalTop}>
              <h2 className={styles.modalTitle}>{selected.title}</h2>
              <div className={styles.modalDate}>{formatDate(selected.date)}</div>
            </div>

            <div className={styles.modalInner}>
              <div className={styles.mediaFrame}>
                {selected.imageSrc ? (
                  <img className={styles.mediaImg} src={selected.imageSrc} alt={selected.title} />
                ) : (
                  <div style={{ height: "100%", display: "grid", placeItems: "center", opacity: 0.7 }}>
                    placeholder for a picture
                  </div>
                )}
              </div>

              <div className={styles.modalText}>
                {selected.body.map((p, idx) => (
                  <p key={idx} style={{ margin: "0 0 14px" }}>
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div className={styles.modalBottom}>
              <button className={styles.returnBtn} onClick={() => setOpenId(null)}>
                Return
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

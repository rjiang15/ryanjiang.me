"use client"

import { useMemo, useState } from "react"
import styles from "./projects.module.css"

type Project = {
  id: string
  title: string
  date: string // ISO YYYY-MM-DD
  blurb: string
  tags: string[]
  details: string[]
}

const PROJECTS: Project[] = [
  {
    id: "a-small-issue",
    title: "A Small Issue",
    date: "2024-04-21",
    blurb: "Winner of HackDartmouth 2024.",
    tags: ["C#", "Unity", "Game Development"],
    details: [
      "A Small Issue is an open-world RPG game built for the retro-themed Dartmouth 2024 Spring Hackathon.",
      "My teammates and I built the game in the style of old Pokemon games, hand-drawing many of the sprites and scaffolding the storyboard to teach the player why AI Safety is an important issue.",
      "Try it here yourself: https://github.com/ericwang1409/A-Small-Issue",
    ],
  },
  {
    id: "with-honor",
    title: "Congressional Polarization Visualizer",
    date: "2024-08-01",
    blurb: "A graphing app documenting political polarization.",
    tags: ["Streamlit", "Plotly", "Documentation"],
    details: [
      "I was contracted by With Honor Action, a Political Action Committee dedicated to fighting for bipartisanship and veterans affairs.",
      "Polarization was measured via DWNominate's axes of political and economic ideology, tracking voting patterns over the past 70 years. These graphs were presented to clients to secure 6-figure donations.",
      "All code and documentation lives here: https://github.com/rjiang15/with-honor-graphing",
    ],
  },
  {
    id: "red-line-frisbee",
    title: "REALMS",
    date: "2025-09-01",
    blurb: "Team-based matchmaking and stat tracking app.",
    tags: ["Javascript", "Web Development", "Google App Script", "HTML/CSS", "Databases"],
    details: [
      "Red Elo Automated Ladder Matchmaking System (REALMS) is a custom-built app for the Harvard Ultimate Frisbee A-Team, Harvard Red Line.",
      "I built the entire fullstack application using Google App Script as the backend connected to Google Sheets as the durable storage spot. The frontend is built with Javascript and HTML/CSS.",
      "Features include team-based matchmaking customizable to team-size, where I remixed the traditional TrueSkill algorithm to work in a frisbee-based context. Stat tracking is also built in, with pin-protected accounts and a public facing leaderboard. An admin account is also included for easy management of players and matches.",
      "The code can be found at https://github.com/rjiang15/frisbee_matchmaking while the live app is at https://rjiang15.github.io/frisbee_matchmaking/.",
    ],
  },
  {
    id: "cs1060-odyssey",
    title: "COMPSCI 1060 - Odyssey",
    date: "2025-12-08",
    blurb: "A travel planning social media web-app.",
    tags: ["Typescript", "Javascript", "Databases"],
    details: [
      "Odyssey was the Harvard COMPSCI 1060 final project.",
      "Built with Node.js, a supabase database, and a React frontend, my teammates and I collaborated to build a modern take on travel journaling and sharing. The app lives as a cross between Instagram, Strava, and Beli. We deployed to Vercel and stayed organized using Linear.",
      "The code is available at https://github.com/cs1060f25/TRAV-Odyssey. The live app was taken down after the semester ended.",
    ],
  },
  {
    id: "cs1650-final",
    title: "COMPSCI 1650 - Column-Store Database",
    date: "2025-12-17",
    blurb: "A custom implementation from scratch using C.",
    tags: ["C", "Databases", "Experiments"],
    details: [
      "This was the final project for Harvard's COMPSCI 1650 course, Data Systems.",
      "The project consisted of 4 major milestones: basic query support, multithreading and batching, index structures, and joins. For each milestone, experiments were ran to benchmark performance and justify design decisions.",
      "The full code cannot be shared publicly due to course policies, but the final project experiment report can be found at https://drive.google.com/file/d/1UO-MnJfg41126m7u6ZHUjjFFCx5IVXiU/view?usp=sharing."
    ],
  },
  {
    id: "cs262-spotify-jam",
    title: "COMPSCI 2620 - Spotify Jam Recreation",
    date: "2025-05-03",
    blurb: "A faithful recreation of Spotify Jam.",
    tags: ["Python", "Distributed Systems", "Sockets", "GRPC"],
    details: [
      "This was the final project for Harvard's graduate course on distributed systems, COMPSCI 2620.",
      "The python-based app uses PyQT for the frontend and a GRPC-based backend. Any mp3 file can be uploaded and played in sync with other clients connected to the same session. The app functionality supports a general lobby, custom rooms, and host controls of play/pause, skip, and queue management.",
      "The full code, engineering notebook, and slides can all be found at https://github.com/ericgong2005/CS2620_Final_Project/tree/main."
    ],
  },
  {
    id: "cs262-chat-app",
    title: "COMPSCI 2620 - Custom Wire Protocol",
    date: "2025-03-25",
    blurb: "A chat application built with 3 different protocols.",
    tags: ["Python", "Distributed Systems", "Sockets", "GRPC"],
    details: [
      "This was the midterm project for Harvard's graduate course on distributed systems, COMPSCI 2620.",
      "The project consisted of building a chat application supporting multiple clients and chatrooms. I implemented 3 different versions of the server: one using raw TCP sockets, one using a JSON packaged wire, and one using GRPC. Storage was persistent and the application remains fault-tolerant to a degree with respect to server crashes.",
      "The full code, engineering notebook, and experiments can be found at https://github.com/rjiang15/262design3.",
    ],
  },
]

function formatDate(iso: string) {
  const [y, m] = iso.split("-")
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const mi = Math.max(1, Math.min(12, Number(m))) - 1
  return `${months[mi]} ${y}`
}

export default function ProjectsPage() {
  const sorted = useMemo(() => {
    return [...PROJECTS].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  }, [])

  // Start with no selection so you see the placeholder instruction
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selected = useMemo(
    () => sorted.find((p) => p.id === selectedId) ?? null,
    [sorted, selectedId]
  )

  return (
    <main className={styles.projects}>
      <aside className={styles.left} aria-label="Project list">
        <div className={styles.leftInner}>
          <div className={styles.titleRow}>
            <h1 className={styles.h1}>Projects</h1>
            <div className={styles.hint}>click a project →</div>
          </div>

          <div className={styles.list}>
            {sorted.map((p) => {
              const active = p.id === selectedId
              return (
                <button
                  key={p.id}
                  type="button"
                  className={`${styles.cardBtn} ${active ? styles.cardBtnActive : ""}`}
                  onClick={() => setSelectedId(p.id)}
                  aria-pressed={active}
                >
                  <div className={styles.cardTopRow}>
                    <h2 className={styles.cardTitle}>{p.title}</h2>
                    <div className={styles.cardDate}>{formatDate(p.date)}</div>
                  </div>
                  <p className={styles.cardBlurb}>{p.blurb}</p>
                </button>
              )
            })}
          </div>
        </div>
      </aside>

      <section className={styles.right} aria-label="Project details">
        {!selected ? (
          <div className={styles.placeholderBox}>
            <h2 className={styles.detailTitle} style={{ fontSize: 44, marginBottom: 10 }}>
              Select a project
            </h2>
            <p className={styles.detailBody} style={{ margin: 0 }}>
              Click one of the cards on the left to see the full description here.
            </p>
          </div>
        ) : (
          <>
            <h2 className={styles.detailTitle}>{selected.title}</h2>
            <p className={styles.detailMeta}>{formatDate(selected.date)}</p>

            <div className={styles.pills} aria-label="Tags">
              {selected.tags.map((t) => (
                <span key={t} className={styles.pill}>
                  {t}
                </span>
              ))}
            </div>

            <div className={styles.detailBody}>
              {selected.details.map((para, i) => (
                <p key={i} style={{ margin: "0 0 16px" }}>
                  {para}
                </p>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  )
}

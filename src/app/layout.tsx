import "./globals.css"
import type { Metadata } from "next"
import Link from "next/link"
import { Patrick_Hand } from "next/font/google"

const hand = Patrick_Hand({ subsets: ["latin"], weight: "400" })

export const metadata: Metadata = {
  title: "Ryan Jiang",
  description: "Personal site",
}

function Header() {
  return (
    <header className="headerShell">
      <nav className="navRow" aria-label="Primary">
        <Link className="navItem" href="/">
          home
        </Link>
        <Link className="navItem" href="/projects">
          projects
        </Link>
        <Link className="navItem" href="/research">
          research
        </Link>
        <Link className="navItem" href="/timeline">
          timeline
        </Link>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footerShell">
      <div className="footerLeft">Copyright (c) 2025</div>

      <div className="footerRight">
        <a
          className="footerBtn"
          href="https://github.com/rjiang15"
          target="_blank"
          rel="noreferrer"
        >
          Git
        </a>
        <a
          className="footerBtn"
          href="https://www.linkedin.com/in/ryanjiang15"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <a className="footerBtn" href="mailto:ryanjiang@college.harvard.edu">
          Email
        </a>
      </div>
    </footer>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={hand.className}>
        <div className="pageWrap">
          <div className="outerFrame">
            <Header />
            <div className="contentShell">{children}</div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}

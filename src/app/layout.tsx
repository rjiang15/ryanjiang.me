import "./globals.css"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
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
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <Image
            src="/img/icons/github.svg"
            alt="GitHub"
            width={28}
            height={28}
            className="footerIcon"
            unoptimized
          />
        </a>

        <a
          className="footerBtn"
          href="https://www.linkedin.com/in/ryanjiang15"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <Image
            src="/img/icons/linkedin.png"
            alt="LinkedIn"
            width={28}
            height={28}
            className="footerIcon"
            unoptimized
          />
        </a>

        <a
          className="footerBtn"
          href="mailto:ryanjiang@college.harvard.edu"
          aria-label="Email"
        >
          <Image
            src="/img/icons/email.png"
            alt="Email"
            width={28}
            height={28}
            className="footerIcon"
            unoptimized
          />
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

export default function Home() {
  return (
    <main className="hero">
      <section className="heroLeft" aria-label="Profile card panel">
        <div className="profileCard">
          <div className="avatarRing" aria-hidden="true">
            <div className="avatarInner" aria-hidden="true">
              <div className="avatarSilhouette" aria-hidden="true" />
            </div>
          </div>

          <div className="profileName">Ryan Jiang</div>
          <div className="profileUnderline" aria-hidden="true" />
          <div className="profileRole">Software Engineer</div>
        </div>
      </section>

      <section className="heroRight" aria-label="Intro text panel">
        <h1 className="heroTitle">Hi, I&apos;m Ryan!</h1>

        <div className="heroText">
          <p>
            I&apos;m studying CS & Stats @ Harvard, graduating Spring 2027. My primary interests lie in distributed systems and backend development. 
          </p>
          <p>Outside of academics, I love making YouTube videos about game theory, playing Ultimate Frisbee, and following esports.</p>
        </div>
      </section>
    </main>
  )
}

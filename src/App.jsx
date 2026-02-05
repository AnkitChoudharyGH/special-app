import { useState } from 'react'
import './App.css'
import p1 from './photos/photo1.jpeg'
import p2 from './photos/photo2.jpeg'
import p3 from './photos/photo3.jpeg'
import p4 from './photos/photo4.jpeg'
import p5 from './photos/photo5.jpeg'
import p6 from './photos/photo6.jpeg'
import p7 from './photos/photo7.jpeg'
import p8 from './photos/photo8.jpeg'

const weekPlan = [
  {
    title: 'Rose Day',
    date: 'Sat • Feb 7, 2026',
    emoji: '🌹',
    note: 'A blush bouquet at your door to start the week soft and sweet.',
  },
  {
    title: 'Propose Day',
    date: 'Sun • Feb 8, 2026',
    emoji: '💌',
    note: 'A handwritten note tucked into your favorite book—carefully chosen words.',
  },
  {
    title: 'Chocolate Day',
    date: 'Mon • Feb 9, 2026',
    emoji: '🍫',
    note: 'Artisan truffles + hot cocoa drop‑off for a cozy evening wind‑down.',
  },
  {
    title: 'Teddy Day',
    date: 'Tue • Feb 10, 2026',
    emoji: '🧸',
    note: 'A tiny plush that matches your mood—desk‑buddy approved.',
  },
  {
    title: 'Promise Day',
    date: 'Wed • Feb 11, 2026',
    emoji: '🤝',
    note: 'A promise card with three things you can cash in anytime.',
  },
  {
    title: 'Hug Day',
    date: 'Thu • Feb 12, 2026',
    emoji: '🫂',
    note: 'A meet‑up for warm chai, a long walk, and the best hugs.',
  },
  {
    title: 'Kiss Day',
    date: 'Fri • Feb 13, 2026',
    emoji: '💋',
    note: 'A slow evening playlist and a movie you pick—your call.',
  },
  {
    title: "Valentine's Day", 
    date: 'Sat • Feb 14, 2026',
    emoji: '💘',
    note: 'Sunset picnic, candle glow, and our song on repeat.',
  },
]

const heartParticles = [
  { left: 6, speed: 16, delay: 0 },
  { left: 18, speed: 14, delay: 2.5 },
  { left: 28, speed: 18, delay: 4 },
  { left: 38, speed: 13, delay: 1.2 },
  { left: 48, speed: 17, delay: 3.4 },
  { left: 58, speed: 15, delay: 0.8 },
  { left: 68, speed: 19, delay: 2.8 },
  { left: 78, speed: 16, delay: 1.6 },
  { left: 88, speed: 14, delay: 3.9 },
]

const petalBursts = Array.from({ length: 22 }).map((_, i) => ({
  left: Math.random() * 100,
  size: 14 + Math.random() * 16,
  delay: Math.random() * 0.6,
  duration: 2.8 + Math.random() * 1.4,
  rotate: -30 + Math.random() * 60,
}))

const collageSources = [p1,p2,p3,p4,p5,p6,p7,p8]

const buildCollageFrames = () =>
  collageSources.map((src, i) => ({
    src,
    top: 8 + Math.random() * 70,
    left: 6 + Math.random() * 70,
    size: 140 + Math.random() * 140,
    rotation: -12 + Math.random() * 24,
    delay: Math.random() * 1.4,
    duration: 8 + Math.random() * 6,
    blur: i % 5 === 0,
  }))

function App() {
  const [response, setResponse] = useState('')
  const [mode, setMode] = useState('invite')
  const [showRoses, setShowRoses] = useState(false)
  const [showCollage, setShowCollage] = useState(false)
  const [collageFrames, setCollageFrames] = useState(buildCollageFrames)

  const replyText =
    response === 'yes'
      ? 'Firstly I love you so much. I’ll bring the roses, a playlist tailored to you, and a promise to make every moment soft and special.'
      : response === 'maybe'
        ? 'I love the way you smile. I love adoring you so much. You are so perfect baby. I love you so much.'
        : ''

  return (
    <div className="canvas">
      <div className="glow glow-1" />
      <div className="glow glow-2" />
      <div className="glow glow-3" />

      <div className="floating-hearts">
        {heartParticles.map((particle, index) => (
          <span
            key={index}
            className="heart-particle"
            style={{
              left: `${particle.left}%`,
              animationDuration: `${particle.speed}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {showRoses && (
        <div className="rose-overlay" aria-hidden>
          {petalBursts.map((petal, idx) => (
            <span
              key={idx}
              className="petal"
              style={{
                left: `${petal.left}%`,
                width: `${petal.size}px`,
                height: `${petal.size * 1.3}px`,
                '--delay': `${petal.delay}s`,
                '--dur': `${petal.duration}s`,
                '--twist': `${petal.rotate}deg`,
              }}
            />
          ))}
        </div>
      )}

      {showCollage && (
        <div className="collage-overlay" aria-hidden>
          <button className="collage-close" onClick={() => setShowCollage(false)}>
            ✕
          </button>
          {collageFrames.map((frame, idx) => (
            <img
              key={idx}
              className={`collage-img ${frame.blur ? 'soft' : ''}`}
              src={frame.src}
              alt="Memory collage"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
              style={{
                top: `${frame.top}%`,
                left: `${frame.left}%`,
                width: `${frame.size}px`,
                animationDuration: `${frame.duration}s`,
                animationDelay: `${frame.delay}s`,
                transform: `translate(-50%, -50%) rotate(${frame.rotation}deg)`,
              }}
            />
          ))}
        </div>
      )}

      <main className="card">
        <div className="badge-row">
          <span className="pill">Valentine’s Week • Feb 7–14, 2026</span>
          <span className="pill pill-outline">For someone unforgettable</span>
        </div>

        {mode === 'invite' ? (
          <>
            <h1>Would you like to be my valentine?</h1>
            <p className="lede">
              Saturday, February 14, 2026 is circled on my calendar. I planned seven small moments to lead us there—because the build up should feel as magical as the day itself.
            </p>

            <div className="actions">
              <button
                className="btn primary"
                onClick={() => {
                  setResponse('yes')
                  setMode('profile')
                }}
              >
                Yes, let’s make it magic
              </button>
              <button
                className="btn ghost"
                onClick={() => {
                  setResponse('maybe')
                  setMode('invite')
                }}
              >
                Tell me more first
              </button>
            </div>

            {response && (
              <div className="response">
                <span className="sparkle">✶</span>
                <p>{replyText}</p>
              </div>
            )}

            <section className="details">
              <div className="detail-card">
                <h3>Valentine’s Day</h3>
                <p>Would you like go on a very nice, cozy, and vibey date with me ♡? </p>
              </div>
              <div className="detail-card">
                <h3>Random Fact</h3>
                <p>Beautiful you and decent me can defeat anyone outthere as one. WE LOOK SO NICE TOGETHER. We have such a nice connect that we have.</p>
              </div>
              <div className="detail-card">
                <h3>If you say “yes”</h3>
                <p>A Definite great memory, a mini bouquet, and a promise to make every day feel a little like February 14.</p>
              </div>
            </section>

            <div className="footer">
              <span className="dot" aria-hidden />
              <span>Would love to know your answer!!!</span>
            </div>
          </>
        ) : (
          <div className="profile-view">
            <div className="profile-header">
              <div className="avatar" aria-hidden>
                <span role="img" aria-label="heart">💖</span>
              </div>
              <div>
                <p className="eyebrow">Valentine confirmed</p>
                <h1>Yashaswi, the one I’ve been waiting to ask</h1>
                <p className="lede">Beautiful smile, Innocent soul, Beautiful voice, beautiful face, Cute little activities. So damnly fallen for you so bad.</p>
              </div>
            </div>

            <div className="profile-grid">
              <div className="profile-card highlight">
                <h3>Why you</h3>
                <p>You turn everything so special. I want to witness everything with you. might be clingy these things but yeahhhh I am not leaving anything back with me.</p>
              </div>
              <div className="profile-card">
                <h3>The plan</h3>
                <p>See I have made the planner also for you. And ik we wont be able to meet everyday in the week but I really will love everyday when we ll be meeting.</p>
              </div>
              <div className="profile-card">
                <h3>Love language</h3>
                <p>How about like another tipsy night on 14th. I mean maybe or maybe not. I WOULD LOVE TO IF WE DO.</p>
              </div>
            </div>

            <div className="actions spaced">
              <button className="btn ghost" onClick={() => setMode('invite')}>
                Back to invite
              </button>
              <button
                className="btn primary"
                onClick={() => {
                  setShowRoses(true)
                  setShowCollage(true)
                  setCollageFrames(buildCollageFrames())
                  setTimeout(() => setShowRoses(false), 4200)
                  setTimeout(() => setShowCollage(false), 12000)
                }}
              >
                Lock the date: Feb 14, 2026
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App

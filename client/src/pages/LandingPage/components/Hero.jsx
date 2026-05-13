import { useEffect, useRef, useState } from 'react'

import { SmartLink } from './shared'

export default function Hero({ hero }) {
  const videoRef = useRef(null)
  const { video, videoBadge, videoControls } = hero
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return undefined

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => {
      if (mq.matches) {
        el.pause()
        setPlaying(false)
      } else {
        el.play?.().catch(() => {})
        setPlaying(!el.paused)
      }
    }

    syncMotion()
    mq.addEventListener('change', syncMotion)
    return () => mq.removeEventListener('change', syncMotion)
  }, [])

  const toggleMute = () => {
    setMuted((m) => !m)
  }

  const togglePlay = () => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) {
      el.play?.().catch(() => {})
      setPlaying(true)
    } else {
      el.pause()
      setPlaying(false)
    }
  }

  return (
    <section className="svy__hero" aria-label={hero.sectionAria ?? 'Hero'}>
      <div className="svy__heroInner">
        <div className="svy__heroCopy">
          <span className="svy__kicker">{hero.kicker}</span>
          <h1 className="svy__heroTitle">
            {hero.title.before}
            <span className="svy__heroTitleHighlight">{hero.title.highlight}</span>
            {hero.title.after}
          </h1>
          <p className="svy__heroSubtitle">{hero.subtitle}</p>

          <div className="svy__heroButtons">
            <SmartLink className="svy__button svy__button--primary" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </SmartLink>
            <a className="svy__button svy__button--secondary" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>

        <div className="svy__heroMedia svy__heroMedia--video">
          <div className="svy__glow" aria-hidden="true" />
          {videoBadge ? (
            <p className="svy__heroVideoBadge">
              <span className="svy__heroVideoBadgeDot" aria-hidden="true" />
              {videoBadge}
            </p>
          ) : null}
          <div className="svy__heroVideoFrame">
            <video
              ref={videoRef}
              className="svy__heroVideo"
              poster={video.poster}
              playsInline
              autoPlay
              muted={muted}
              loop
              controls={false}
              preload="metadata"
              aria-label={video.ariaLabel}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            >
              <source src={video.src} type="video/mp4" />
            </video>
            <div className="svy__heroVideoChrome" aria-hidden="true" />
          </div>
          <div className="svy__heroVideoToolbar" role="group" aria-label={videoControls.toolbarAria}>
            <button
              type="button"
              className="svy__heroVideoBtn"
              onClick={togglePlay}
              aria-pressed={playing}
            >
              {playing ? videoControls.pause : videoControls.play}
            </button>
            <button
              type="button"
              className="svy__heroVideoBtn"
              onClick={toggleMute}
              aria-pressed={muted}
            >
              {muted ? videoControls.unmute : videoControls.mute}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}


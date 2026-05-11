import { SmartLink } from './shared'

export default function Hero({ hero }) {
  return (
    <section className="svy__hero" aria-label="Hero">
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

        <div className="svy__heroMedia">
          <div className="svy__glow" aria-hidden="true" />
          <div className="svy__heroImageFrame">
            <img
              className="svy__heroImage"
              src={hero.image.src}
              alt={hero.image.alt}
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  )
}


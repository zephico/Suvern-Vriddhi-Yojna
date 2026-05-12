import TopNav from '../LandingPage/components/TopNav'
import Footer from '../LandingPage/components/Footer'
import { MaterialIcon, SmartLink } from '../LandingPage/components/shared'
import { useContent } from '../../content/ContentProvider.jsx'

function formatMonthLabel(count) {
  return `${count} month${count === 1 ? '' : 's'}`
}

export default function PlanPage() {
  const { lang, content, toggleLanguage } = useContent()

  const topNav = {
    ...content.topNav,
    links: content.topNav.links.map((l) => ({ ...l, active: l.key === 'plans' })),
  }

  return (
    <div className="svy">
      <TopNav
        meta={content.meta}
        topNav={topNav}
        languageToggle={{
          ariaLabel: content.topNav.languageToggle.ariaLabel,
          label: content.topNav.languageToggle.labels[lang],
          onToggle: toggleLanguage,
        }}
      />

      <main className="svy__main">
        <section className="svy__bento" id="plans" aria-label="Plans">
          <header className="svy__sectionHeading">
            <p className="svy__kicker">{content.plans.page.kicker}</p>
            <h2 className="svy__h2">{content.plans.page.heading}</h2>
            <p className="svy__muted">{content.plans.page.subheading}</p>
          </header>

          <div className="svy__bentoGrid">
            {content.plans.items.map((plan) => {
              const totalMonths = plan.months + plan.bonusMonths
              return (
                <article key={plan.code} className="svy__card svy__card--tonal svy__planCard">
                  <div>
                    <div className="svy__cardTop">
                      <div className="svy__iconCircle" aria-hidden="true">
                        <MaterialIcon name={plan.icon} className="svy__iconOnCircle" />
                      </div>
                      <div>
                        <h3 className="svy__h3">{plan.name}</h3>
                        <p className="svy__muted" style={{ marginTop: 6 }}>
                          {plan.code} Plan • Pay {formatMonthLabel(plan.months)} EMI
                        </p>
                      </div>
                    </div>

                    <div className="svy__cardText" style={{ marginTop: 14 }}>
                      <p className="svy__muted" style={{ margin: 0 }}>
                        {plan.tagline}
                      </p>
                      <p className="svy__muted" style={{ marginTop: 10 }}>
                        On completion: you receive back {formatMonthLabel(plan.months)} EMI equivalent plus{' '}
                        {formatMonthLabel(plan.bonusMonths)} bonus.
                        <br />
                        Total benefit: <strong>{formatMonthLabel(totalMonths)}</strong> EMI equivalent.
                      </p>
                    </div>
                  </div>

                  <div className="svy__planActions">
                    <SmartLink className="svy__button svy__button--primary" href="/enquiry">
                      {content.plans.page.ctaPrefix}
                      {plan.name}
                    </SmartLink>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      </main>

      <Footer meta={content.meta} footer={content.footer} />
    </div>
  )
}


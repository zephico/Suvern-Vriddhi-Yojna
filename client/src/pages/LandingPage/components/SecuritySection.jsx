import { MaterialIcon } from './shared'

export default function SecuritySection({ security }) {
  return (
    <section className="svy__security" aria-label="Security and compliance">
      <div className="svy__securityInner">
        <div className="svy__securityLeft">
          <div className="svy__badge">
            <MaterialIcon name={security.headingBadge.icon} className="svy__badgeIcon" />
            <span className="svy__badgeText">{security.headingBadge.label}</span>
          </div>
          <h2 className="svy__h2 svy__h2--inverse">{security.heading}</h2>
          <p className="svy__inverseMuted">{security.description}</p>
          <ul className="svy__checks">
            {security.checks.map((c) => (
              <li key={c} className="svy__check">
                <MaterialIcon name="check_circle" className="svy__checkIcon" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="svy__securityRight" aria-label="Security stats">
          <div className="svy__stats">
            {security.stats.map((s) => (
              <div key={s.label} className="svy__stat">
                <p className="svy__statValue">{s.value}</p>
                <p className="svy__statLabel">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


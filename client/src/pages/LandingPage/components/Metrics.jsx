export default function Metrics({ metrics }) {
  return (
    <section className="svy__metrics" id={metrics.id} aria-label="Metrics">
      <div className="svy__metricsInner">
        {metrics.items.map((m, idx) => (
          <div
            key={m.label}
            className={['svy__metric', idx > 0 ? 'has-divider' : null].filter(Boolean).join(' ')}
          >
            <p className="svy__metricLabel">{m.label}</p>
            <p className="svy__metricValue">
              {m.value}
              {m.delta ? (
                <span
                  className={[
                    'svy__metricDelta',
                    m.delta.tone === 'up' ? 'is-up' : null,
                    m.delta.tone === 'down' ? 'is-down' : null
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {m.delta.text}
                </span>
              ) : null}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}


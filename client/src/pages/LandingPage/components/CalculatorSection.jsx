import { useMemo, useState } from 'react'
import { MaterialIcon } from './shared'

function formatINR(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

export default function CalculatorSection({ calculator, plans }) {
  const minAmount = calculator?.minAmount ?? 2000
  const [amount, setAmount] = useState(minAmount)

  const parsedAmount = Number.isFinite(Number(amount)) ? Number(amount) : 0
  const isValid = parsedAmount >= minAmount

  const rows = useMemo(() => {
    const safeAmount = isValid ? parsedAmount : minAmount
    return (plans ?? []).map((p) => {
      const paid = safeAmount * p.months
      const bonus = safeAmount * p.bonusMonths
      const total = paid + bonus
      return { ...p, paid, bonus, total }
    })
  }, [parsedAmount, isValid, minAmount, plans])

  return (
    <section className="svy__bento" id={calculator?.id ?? 'calculator'} aria-label="Calculator">
      <header className="svy__sectionHeading">
        <p className="svy__kicker">{calculator?.kicker}</p>
        <h2 className="svy__h2">{calculator?.heading}</h2>
        <p className="svy__muted">{calculator?.subheading}</p>
      </header>

      <div className="svy__calcGrid">
        <div className="svy__card svy__card--tonal svy__calcInputCard">
          <div className="svy__cardTop">
            <div className="svy__iconCircle" aria-hidden="true">
              <MaterialIcon name="calculate" className="svy__iconOnCircle" />
            </div>
            <h3 className="svy__h3">{calculator?.inputTitle}</h3>
          </div>

          <div className="svy__fieldStack" style={{ marginTop: 14 }}>
            <label className="svy__field">
              <span className="svy__label">{calculator?.inputLabel}</span>
              <input
                className="svy__input"
                type="number"
                min={minAmount}
                step={100}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`${minAmount}`}
                inputMode="numeric"
              />
            </label>

            {!isValid ? (
              <p className="svy__fieldError">{calculator?.invalidMin ?? `Minimum amount is ₹${minAmount}.`}</p>
            ) : (
              <p className="svy__muted svy__small" style={{ margin: 0 }}>
                You entered: <strong>{formatINR(parsedAmount)}</strong> per month
              </p>
            )}
          </div>
        </div>

        <div className="svy__card svy__card--tonal svy__calcResultsCard" aria-label="Calculated results">
          <h3 className="svy__h3">{calculator?.summaryTitle}</h3>
          <p className="svy__muted svy__small" style={{ marginTop: 8 }}>
            {calculator?.summaryFormula}
          </p>

          <div className="svy__calcRows">
            {rows.map((r) => (
              <div key={r.code} className="svy__calcRow">
                <div className="svy__calcRowLeft">
                  <MaterialIcon name={r.icon} className="svy__detailIcon" />
                  <div>
                    <div className="svy__calcPlanTitle">
                      <span style={{ fontWeight: 800 }}>{r.name}</span>
                      <span className="svy__calcPill">{r.code}</span>
                    </div>
                    <div className="svy__muted svy__small">
                      Paid: {formatINR(r.paid)} • Bonus: {formatINR(r.bonus)}
                    </div>
                  </div>
                </div>
                <div className="svy__calcTotal">{formatINR(r.total)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


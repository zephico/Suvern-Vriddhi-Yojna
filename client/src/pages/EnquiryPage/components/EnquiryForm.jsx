import { useState } from 'react'

export default function EnquiryForm({ enquiry }) {
  const [step, setStep] = useState('phone') // 'phone' | 'otp' | 'details'
  const [values, setValues] = useState(() => ({
    fullName: '',
    contactNumber: '',
    monthlyAmount: '',
    plan: '',
    otpVerification: '',
    consent: false
  }))
  const [touched, setTouched] = useState(() => ({}))

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }))
  }

  const touch = (name) => {
    setTouched((t) => ({ ...t, [name]: true }))
  }

  const getField = (name) => enquiry.fields.find((f) => f.name === name)

  const phoneDigitsRaw = (values.contactNumber || '').replace(/\D/g, '')
  const phoneDigits =
    phoneDigitsRaw.length === 12 && phoneDigitsRaw.startsWith('91')
      ? phoneDigitsRaw.slice(2)
      : phoneDigitsRaw
  const otpDigits = (values.otpVerification || '').replace(/\D/g, '')

  const phoneError = (() => {
    if (!values.contactNumber.trim()) return 'Contact number is required.'
    if (phoneDigits.length !== 10) return 'Enter a valid 10-digit mobile number.'
    if (!/^[6-9]\d{9}$/.test(phoneDigits))
      return 'Enter a valid Indian mobile number (starts with 6-9).'
    return null
  })()

  const otpError = (() => {
    if (!values.otpVerification.trim()) return 'OTP is required.'
    if (otpDigits.length !== 6) return 'OTP must be exactly 6 digits.'
    return null
  })()

  const errors = (() => {
    const e = {}

    if (step === 'phone') {
      if (phoneError) e.contactNumber = phoneError
      return e
    }

    if (step === 'otp') {
      if (phoneError) e.contactNumber = phoneError
      if (otpError) e.otpVerification = otpError
      return e
    }

    const name = values.fullName.trim()
    if (!name) e.fullName = 'Full name is required.'
    else if (name.length < 3) e.fullName = 'Full name must be at least 3 characters.'
    else if (!/^[A-Za-z][A-Za-z\s.'-]*$/.test(name))
      e.fullName = 'Full name can contain only letters and spaces.'

    if (values.monthlyAmount === '' || values.monthlyAmount === null) {
      e.monthlyAmount = 'Monthly amount is required.'
    } else {
      const amt = Number(values.monthlyAmount)
      if (!Number.isFinite(amt) || amt <= 0) e.monthlyAmount = 'Enter a valid monthly amount.'
      else if (!Number.isInteger(amt)) e.monthlyAmount = 'Monthly amount must be a whole number.'
    }

    if (!values.plan) e.plan = 'Please select a plan.'

    if (!values.consent) e.consent = 'You must agree to proceed.'

    return e
  })()

  const isValid = Object.keys(errors).length === 0

  const requestOtp = () => {
    touch('contactNumber')
    if (phoneError) return
    setStep('otp')
  }

  const verifyOtp = () => {
    touch('otpVerification')
    if (otpError) return
    setStep('details')
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (step !== 'details') return

    setTouched((t) => ({
      ...t,
      fullName: true,
      monthlyAmount: true,
      plan: true,
      consent: true
    }))

    if (!isValid) return

    // TODO: integrate API submission
  }

  return (
    <section className="svy__enquiry" id={enquiry.id} aria-label="Enquiry form">
      <div className="svy__enquiryInner">
        <div className="svy__sectionHeading">
          <h2 className="svy__h2">{enquiry.heading}</h2>
          <p className="svy__muted">{enquiry.subheading}</p>
        </div>

        <form className="svy__form" onSubmit={onSubmit} noValidate>
          {step === 'phone' ? (
            <div className="svy__formGrid svy__formGrid--single">
              <div className="svy__field">
                <label className="svy__label" htmlFor="contactNumber">
                  {getField('contactNumber')?.label ?? 'Contact Number'}
                </label>
                <div className="svy__inputRow">
                  <input
                    className="svy__input"
                    id="contactNumber"
                    name="contactNumber"
                    type={getField('contactNumber')?.type ?? 'tel'}
                    placeholder={getField('contactNumber')?.placeholder}
                    value={values.contactNumber}
                    onChange={(e) => setField('contactNumber', e.target.value)}
                    onBlur={() => touch('contactNumber')}
                    aria-invalid={touched.contactNumber && errors.contactNumber ? 'true' : 'false'}
                  />
                  <button className="svy__textButton" type="button" onClick={requestOtp}>
                    {getField('contactNumber')?.auxButton?.label ?? 'Verify OTP'}
                  </button>
                </div>
                {touched.contactNumber && errors.contactNumber ? (
                  <p className="svy__fieldError" role="alert">
                    {errors.contactNumber}
                  </p>
                ) : null}
              </div>
            </div>
          ) : step === 'otp' ? (
            <div className="svy__formGrid svy__formGrid--single">
              <div className="svy__field">
                <label className="svy__label" htmlFor="contactNumber">
                  {getField('contactNumber')?.label ?? 'Contact Number'}
                </label>
                <input
                  className="svy__input"
                  id="contactNumber"
                  name="contactNumber"
                  type={getField('contactNumber')?.type ?? 'tel'}
                  value={values.contactNumber}
                  readOnly
                />
              </div>

              <div className="svy__field">
                <label className="svy__label" htmlFor="otpVerification">
                  Enter OTP
                </label>
                <div className="svy__inputRow">
                  <input
                    className="svy__input"
                    id="otpVerification"
                    name="otpVerification"
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter 6 digit OTP"
                    value={values.otpVerification}
                    onChange={(e) => setField('otpVerification', e.target.value)}
                    onBlur={() => touch('otpVerification')}
                    aria-invalid={touched.otpVerification && errors.otpVerification ? 'true' : 'false'}
                  />
                  <button className="svy__textButton" type="button" onClick={verifyOtp}>
                    Verify
                  </button>
                </div>
                {touched.otpVerification && errors.otpVerification ? (
                  <p className="svy__fieldError" role="alert">
                    {errors.otpVerification}
                  </p>
                ) : null}

                <button
                  className="svy__textButton svy__textButton--link"
                  type="button"
                  onClick={() => {
                    setField('otpVerification', '')
                    setStep('phone')
                  }}
                >
                  Change number
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="svy__formGrid">
                <div className="svy__field">
                  <label className="svy__label" htmlFor="fullName">
                    {getField('fullName')?.label ?? 'Full Name'}
                  </label>
                  <input
                    className="svy__input"
                    id="fullName"
                    name="fullName"
                    type={getField('fullName')?.type ?? 'text'}
                    placeholder={getField('fullName')?.placeholder}
                    value={values.fullName}
                    onChange={(e) => setField('fullName', e.target.value)}
                    onBlur={() => touch('fullName')}
                    aria-invalid={touched.fullName && errors.fullName ? 'true' : 'false'}
                  />
                  {touched.fullName && errors.fullName ? (
                    <p className="svy__fieldError" role="alert">
                      {errors.fullName}
                    </p>
                  ) : null}
                </div>

                <div className="svy__field">
                  <label className="svy__label" htmlFor="monthlyAmount">
                    {getField('monthlyAmount')?.label ?? 'Monthly Installment Amount'}
                  </label>
                  <input
                    className="svy__input"
                    id="monthlyAmount"
                    name="monthlyAmount"
                    type={getField('monthlyAmount')?.type ?? 'number'}
                    placeholder={getField('monthlyAmount')?.placeholder}
                    value={values.monthlyAmount}
                    onChange={(e) => setField('monthlyAmount', e.target.value)}
                    onBlur={() => touch('monthlyAmount')}
                    aria-invalid={touched.monthlyAmount && errors.monthlyAmount ? 'true' : 'false'}
                  />
                  {touched.monthlyAmount && errors.monthlyAmount ? (
                    <p className="svy__fieldError" role="alert">
                      {errors.monthlyAmount}
                    </p>
                  ) : null}
                </div>

                <div className="svy__field">
                  <label className="svy__label" htmlFor="plan">
                    {getField('plan')?.label ?? 'Select Plan'}
                  </label>
                  <select
                    className="svy__input"
                    id="plan"
                    name="plan"
                    value={values.plan}
                    onChange={(e) => setField('plan', e.target.value)}
                    onBlur={() => touch('plan')}
                    aria-invalid={touched.plan && errors.plan ? 'true' : 'false'}
                  >
                    <option value="" disabled>
                      {getField('plan')?.options?.[0] ?? 'Select'}
                    </option>
                    {(getField('plan')?.options ?? []).map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {touched.plan && errors.plan ? (
                    <p className="svy__fieldError" role="alert">
                      {errors.plan}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="svy__consent">
                <input
                  className="svy__checkbox"
                  id={enquiry.consent.id}
                  type="checkbox"
                  checked={values.consent}
                  onChange={(e) => setField('consent', e.target.checked)}
                  onBlur={() => touch('consent')}
                  aria-invalid={touched.consent && errors.consent ? 'true' : 'false'}
                />
                <label className="svy__consentLabel" htmlFor={enquiry.consent.id}>
                  {enquiry.consent.label}
                </label>
              </div>
              {touched.consent && errors.consent ? (
                <p className="svy__fieldError" role="alert">
                  {errors.consent}
                </p>
              ) : null}

              <button className="svy__submit" type="submit" disabled={!isValid}>
                {enquiry.submit.label}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  )
}


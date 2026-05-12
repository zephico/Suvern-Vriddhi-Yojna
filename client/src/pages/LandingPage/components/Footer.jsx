export default function Footer({ meta, footer }) {
  return (
    <footer className="svy__footer" aria-label="Footer">
      <div className="svy__footerInner">
        <div className="svy__footerLeft">
          <div className="svy__footerBrand">{meta.brandFullName}</div>
          <p className="svy__muted svy__small">{footer.about}</p>
          {footer.poweredBy ? (
            <p className="svy__muted svy__small" style={{ marginTop: 8 }}>
              {footer.poweredBy}
            </p>
          ) : null}
        </div>
        <div className="svy__footerLinks" aria-label="Footer links">
          {footer.links.map((l) => (
            <a key={l.label} className="svy__footerLink" href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}


/**
 * Replaces {key} placeholders in a template string. Missing keys become empty string.
 * @param {string} template
 * @param {Record<string, string | number>} values
 */
export function interpolate(template, values) {
  if (template == null || template === '') return ''
  return String(template).replace(/\{(\w+)\}/g, (_, key) => {
    const v = values[key]
    return v !== undefined && v !== null ? String(v) : ''
  })
}

export function formatBDT(amount) {
  return `৳${amount.toLocaleString('bn-BD')}`
}

export function formatMaal(amount) {
  return `${amount.toLocaleString('bn-BD')} Maal`
}

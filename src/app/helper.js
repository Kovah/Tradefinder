export function formatNumber (number, numberFormat) {
  const formatted = new Intl.NumberFormat([numberFormat, 'en-US'], {
    maximumSignificantDigits: 2
  }).format(number);

  return formatted.toString();
}

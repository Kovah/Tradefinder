export function formatNumber (number) {
  const formatted = new Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 2
  }).format(number);

  return formatted.toString();
}

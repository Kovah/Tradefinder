export function formatNumber (number, numberFormat) {
  const formatted = new Intl.NumberFormat([numberFormat.locale, 'en-US'], {
    minimumFractionDigits: numberFormat.decimals,
    maximumFractionDigits: numberFormat.decimals
  }).format(number);

  return formatted.toString();
}

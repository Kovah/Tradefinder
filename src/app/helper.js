import { useSelector } from 'react-redux';
import { getOptions } from '../features/options/OptionsSlice';

export function formatNumber (number) {
  const options = useSelector(getOptions);

  const formatted = new Intl.NumberFormat([options.numberFormat, 'en-US'], {
    maximumSignificantDigits: 2
  }).format(number);

  return formatted.toString();
}

const VALID_TABS = ['ABOUT', 'TRADING', 'LOCATIONS', 'ITEMS', 'OPTIONS'];
const VALID_MINIMUM_PROFIT_TYPES = ['percent', 'value', 'valueTotal'];

function isObject (value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isString (value) {
  return typeof value === 'string' && value.length > 0;
}

function isNumericValue (value) {
  if (typeof value === 'number') {
    return Number.isFinite(value);
  }

  if (typeof value === 'string') {
    return value === '' || Number.isFinite(Number(value));
  }

  return false;
}

function isLocationItem (item) {
  return isObject(item)
    && isString(item.ident)
    && isNumericValue(item.sellAmount)
    && isNumericValue(item.sellValue)
    && isNumericValue(item.buyAmount)
    && isNumericValue(item.buyValue);
}

function isLocation (location) {
  return isObject(location)
    && isString(location.ident)
    && isString(location.name)
    && typeof location.itemsVisible === 'boolean'
    && Array.isArray(location.items)
    && location.items.every(isLocationItem);
}

function isItem (item) {
  return isObject(item) && isString(item.ident) && isString(item.name);
}

function areSelectedLocationsValid (selected, pool) {
  const poolIds = new Set(pool.map(location => location.ident));
  return selected.every(ident => poolIds.has(ident));
}

function isOptions (options) {
  return isObject(options)
    && VALID_TABS.includes(options.savedTab)
    && isObject(options.numberFormat)
    && isString(options.numberFormat.locale)
    && isNumericValue(options.numberFormat.decimals)
    && Number(options.numberFormat.decimals) >= 0
    && Number(options.numberFormat.decimals) <= 10
    && isObject(options.minimumProfit)
    && VALID_MINIMUM_PROFIT_TYPES.includes(options.minimumProfit.type)
    && isNumericValue(options.minimumProfit.amount)
    && Number(options.minimumProfit.amount) >= 0;
}

export function validateState (state) {
  if (!isObject(state)) {
    return { valid: false, message: 'Imported data must be a JSON object.' };
  }

  if (!Number.isFinite(Number(state.appVersion))) {
    return { valid: false, message: 'Imported data is missing a valid app version.' };
  }

  if (!Array.isArray(state.items) || !state.items.every(isItem)) {
    return { valid: false, message: 'Imported data has invalid items.' };
  }

  if (!isObject(state.locations)
    || !Array.isArray(state.locations.selected)
    || !state.locations.selected.every(isString)
    || !Array.isArray(state.locations.pool)
    || !state.locations.pool.every(isLocation)
    || !areSelectedLocationsValid(state.locations.selected, state.locations.pool)) {
    return { valid: false, message: 'Imported data has invalid locations.' };
  }

  if (!isOptions(state.options)) {
    return { valid: false, message: 'Imported data has invalid options.' };
  }

  return { valid: true, message: '' };
}

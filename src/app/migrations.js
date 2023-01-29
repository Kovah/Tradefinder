export function applyMigrations (data) {
  const dataAppVersion = parseInt(data.appVersion);
  if (dataAppVersion < 1601821226) {
    return undefined;
  }

  if (dataAppVersion < 1602446860) {
    console.info(`Migrating app data from version ${dataAppVersion} to 1602446860`);
    data = apply1602446860(data);
  }
  if (dataAppVersion < 1674997450) {
    console.info(`Migrating app data from version ${dataAppVersion} to 1674997450`);
    data = apply1674997450(data);
  }

  return data;
}

function apply1602446860 (data) {
  data.locations.pool.forEach(location => location.itemsVisible = true);
  data.options.numberFormat = 'en-US';
  return data;
}
function apply1674997450 (data) {
  data.options.numberFormat = {
    locale: data.options.numberFormat,
    decimals: 2,
  };
  return data;
}

export function applyMigrations (data) {
  const dataAppVersion = parseInt(data.appVersion);
  if (dataAppVersion < 1601821226) {
    return undefined;
  }

  if (dataAppVersion < 1602446860) {
    console.info(`Migrating app data from version ${dataAppVersion} to 1602446860`); //@DEBUG
    data = apply1602446860(data);
  }

  return data;
}

function apply1602446860 (data) {
  data.locations.pool.forEach(location => location.itemsVisible = true);
  data.options.numberFormat = 'en-US';
  return data;
}

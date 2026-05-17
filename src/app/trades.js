function toNumber (value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function getMinimumProfit (options = {}) {
  return options.minimumProfit || {
    type: 'percent',
    amount: 0,
  };
}

function passesMinimumProfit (trade, minimumProfit) {
  const amount = toNumber(minimumProfit.amount);

  if (amount <= 0) {
    return true;
  }

  if (minimumProfit.type === 'percent') {
    return trade.profitPercentage >= amount;
  }

  if (minimumProfit.type === 'valueTotal') {
    return trade.profitTotal >= amount;
  }

  return trade.profit >= amount;
}

export function calculateTrades ({ items = [], locations = [], options = {} }) {
  const itemNames = new Map(items.map(item => [item.ident, item.name]));
  const minimumProfit = getMinimumProfit(options);
  const possibleTrades = [];

  locations.forEach(location => {
    if (!Array.isArray(location.items) || location.items.length === 0) {
      return;
    }

    location.items.forEach(item => {
      const sellAmount = toNumber(item.sellAmount);
      const sellValue = toNumber(item.sellValue);
      const itemName = itemNames.get(item.ident);

      if (!itemName || sellAmount <= 0 || sellValue <= 0) {
        return;
      }

      locations.forEach(newLocation => {
        if (newLocation.ident === location.ident || !Array.isArray(newLocation.items) || newLocation.items.length === 0) {
          return;
        }

        const possibleItem = newLocation.items.find(newItem => newItem.ident === item.ident);
        if (!possibleItem) {
          return;
        }

        const buyAmount = toNumber(possibleItem.buyAmount);
        const buyValue = toNumber(possibleItem.buyValue);

        if (buyAmount <= 0 || buyValue <= 0 || sellValue >= buyValue) {
          return;
        }

        const itemAmount = Math.min(sellAmount, buyAmount);
        const profit = buyValue - sellValue;
        const profitTotal = profit * itemAmount;
        const profitPercentage = profit / sellValue * 100;
        const trade = {
          from: location.name,
          to: newLocation.name,
          item: itemName,
          amount: itemAmount,
          buyFor: sellValue,
          sellFor: buyValue,
          profit,
          profitTotal,
          profitPercentage,
        };

        if (passesMinimumProfit(trade, minimumProfit)) {
          possibleTrades.push(trade);
        }
      });
    });
  });

  return possibleTrades.sort((a, b) => b.profitTotal - a.profitTotal);
}

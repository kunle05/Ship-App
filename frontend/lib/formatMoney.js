export default function formatMoney(currency, amount = 0) {
    const options = {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    };

    const locale = currency === 'NGN' ? 'en-NG' :'en-US';
  
    // check if its a clean dollar amount
    if (amount % 100 === 0) {
      options.minimumFractionDigits = 0;
    }
  
    const formatter = Intl.NumberFormat(locale, options);
  
    return formatter.format(amount / 100);
}
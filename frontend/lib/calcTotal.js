import { standardNGNRate, standardUSDRate } from "../config";

export default function calcTotal(items, currency) {
    let rate = standardUSDRate;
    let locale = 'en-US';
    
    if(currency === 'NGN') {
        rate = standardNGNRate;
        locale = 'en-NG';
    };

    const weight = items.reduce((total, item) => {
        return total + parseInt(item.weight)
    }, 0);

    const amount = weight * rate;

    const options = {
        style: 'currency',
        currency,
        minimumFractionDigits: 2
    };
    
    if (amount % 100 === 0) options.minimumFractionDigits = 0;
    const formatter = new Intl.NumberFormat(locale, options);

    return formatter.format(amount / 100);
}
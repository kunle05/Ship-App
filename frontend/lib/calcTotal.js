import { standardNGNRate, standardUSDRate } from "../config";

export default function calcTotal(arr, city) {
    let code = 'USD';
    let rate = standardUSDRate;
    let locale = 'en-US';

    const weight = arr.reduce((total, num) => {
        return total + num.weight
    }, 0);

    if(city.includes('NG')) {
        code = 'NGN';
        rate = standardNGNRate;
        locale = 'en-NG';
    };

    const amount = weight * rate;

    const options = {
        style: 'currency',
        currency: code,
        minimumFractionDigits: 2
    };
    
    if (amount % 100 === 0) options.minimumFractionDigits = 0;
    const formatter = new Intl.NumberFormat(locale, options);

    return formatter.format(amount / 100);
}
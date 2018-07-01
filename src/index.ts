import PaymentDescription from './PaymentDescription';
import {keyMap} from './Keys';

export default function spayd(paymentDescription: PaymentDescription): string {
	const keys = [];

	keys.push('SPD*1.0');

	for (const key in paymentDescription) {
		keys.push(new keyMap[key](paymentDescription[key]));
	}

	return keys.join('*').toUpperCase();
}

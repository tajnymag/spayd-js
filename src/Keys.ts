import {isValidIBAN, isValidBIC} from 'ibantools';
import format from 'date-fns/format';
import isValid from 'date-fns/isValid';

abstract class Key {
	protected name: string;
	protected structure: RegExp | null;
	protected value: string;

	constructor(name: string, value: string, structure?: RegExp) {
		this.name = name;
		this.value = value;
		this.structure = structure;

		if (this.structure && !this.isValid()) {
			throw 'The ' + this.name + ' key is in wrong format!'
		}
	}

	public isValid(): boolean {
		return this.structure.test(this.value);
	}

	public toString(): string {
		return this.name + ':' + this.value;
	}
}

export class Acc extends Key {
	constructor(value: string) {
		super('acc', value);

		if (!this.isValid()) {
			throw 'The ' + this.name + ' key is in wrong format!'
		}
	}

	isValid(): boolean {
		const parts = this.value.split('+');

		if (parts.length === 1) {
			return isValidIBAN(this.value);
		} else {
			return isValidIBAN(parts[0]) && isValidBIC(parts[1]);
		}
	}
}

export class AltAcc extends Key {
	constructor(value: string[]) {
		super('alt-acc', value.join(','));

		if (!this.isValid()) {
			throw 'The ' + this.name + ' key is in wrong format!'
		}
	}

	isValid(): boolean {
		const accs = this.value.split(',');

		return accs.every((value) => {
			return new Acc(value).isValid();
		})
	}
}

export class Am extends Key {
	constructor(value: string) {
		super('am', value, /^(?!0$)(?!0.00)[0-9]*(\.[0-9][0-9])?$/);
	}
}

export class Cc extends Key {
	constructor(value: string) {
		super('cc', value, /^AED|AFN|ALL|AMD|ANG|AOA|ARS|AUD|AWG|AZN|BAM|BBD|BDT|BGN|BHD|BIF|BMD|BND|BOB|BRL|BSD|BTN|BWP|BYR|BZD|CAD|CDF|CHF|CLP|CNY|COP|CRC|CUC|CUP|CVE|CZK|DJF|DKK|DOP|DZD|EGP|ERN|ETB|EUR|FJD|FKP|GBP|GEL|GGP|GHS|GIP|GMD|GNF|GTQ|GYD|HKD|HNL|HRK|HTG|HUF|IDR|ILS|IMP|INR|IQD|IRR|ISK|JEP|JMD|JOD|JPY|KES|KGS|KHR|KMF|KPW|KRW|KWD|KYD|KZT|LAK|LBP|LKR|LRD|LSL|LYD|MAD|MDL|MGA|MKD|MMK|MNT|MOP|MRO|MUR|MVR|MWK|MXN|MYR|MZN|NAD|NGN|NIO|NOK|NPR|NZD|OMR|PAB|PEN|PGK|PHP|PKR|PLN|PYG|QAR|RON|RSD|RUB|RWF|SAR|SBD|SCR|SDG|SEK|SGD|SHP|SLL|SOS|SPL|SRD|STD|SVC|SYP|SZL|THB|TJS|TMT|TND|TOP|TRY|TTD|TVD|TWD|TZS|UAH|UGX|USD|UYU|UZS|VEF|VND|VUV|WST|XAF|XCD|XDR|XOF|XPF|YER|ZAR|ZMW|ZWD$/);
	}
}

export class Rf extends Key {
	constructor(value: string) {
		super('rf', value, /^[0-9]{1,16}$/);
	}
}

export class Rn extends Key {
	constructor(value: string) {
		super('rn', value, /^[^*]{1,35}$/);
	}
}

export class Dt extends Key {
	private originalDate: Date;

	constructor(value: Date) {
		super('dt', format(value, 'yyyyMMdd'));
		this.originalDate = value;

		if (!this.isValid()) {
			throw 'The ' + this.name + ' key is in wrong format!'
		}
	}

	isValid(): boolean {
		return isValid(this.originalDate);
	}
}

export class Pt extends Key {
	constructor(value: string) {
		super('pt', value, /^[^*]{1,3}$/);
	}
}

export class Msg extends Key {
	constructor(value: string) {
		super('msg', value, /^[^*]{1,60}$/);
	}
}

export class Crc32 extends Key {
	constructor(value: string) {
		super('crc32', value, /^[A-F0-9]{8,8}$/);
	}
}

export class Xper extends Key {
	constructor(value: string) {
		super('x-per', value, /^(30|[12]?[0-9])$/);
	}
}

export class Xvs extends Key {
	constructor(value: string) {
		super('x-vs', value, /^[0-9]{0,10}$/);
	}
}

export class Xss extends Key {
	constructor(value: string) {
		super('x-ss', value, /^[1-9][0-9]{0,9}$/);
	}
}

export class Xks extends Key {
	constructor(value: string) {
		super('x-ks', value, /^[1-9][0-9]{0,9}$/);
	}
}

export class Xid extends Key {
	constructor(value: string) {
		super('x-id', value, /^[^*]{1,20}$/)
	}
}

export const keyMap = {
	acc: Acc,
	altAcc: AltAcc,
	am: Am,
	cc: Cc,
	rf: Rf,
	rn: Rn,
	dt: Dt,
	pt: Pt,
	msg: Msg,
	crc32: Crc32,
	xper: Xper,
	xvs: Xvs,
	xss: Xss,
	xks: Xks,
	xid: Xid
};

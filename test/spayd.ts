import spayd from '../src/';

describe('spayd()', () => {
	it('calculates correctly an official example on qr-platba.cz/pro-vyvojare/specifikace-formatu/', () => {
		expect(spayd({
			acc: 'CZ2806000000000168540115',
			am: '450.00',
			cc: 'CZK',
			msg: 'PLATBA ZA ZBOZI',
			xvs: '1234567890'
		})).toBe('SPD*1.0*ACC:CZ2806000000000168540115*AM:450.00*CC:CZK*MSG:PLATBA ZA ZBOZI*X-VS:1234567890');
	});

	it('is able to use all documented descriptors', () => {
		expect(spayd({
			acc: 'CZ5855000000001265098001+RZBCCZPP',
			altAcc: [ 'CZ5855000000001265098001+RZBCCZPP', 'CZ5855000000001265098001' ],
			am: '480.55',
			cc: 'CZK',
			rf: 1234567890123456,
			rn: 'PETR DVORAK',
			dt: new Date(2018, 3, 20),
			pt: 'P2P',
			msg: 'Payment for some stuff',
			crc32: 'B51BE0B4',
			xper: '7',
			xvs: '1234567890',
			xks: '1234567890',
			xid: '1234567890'
		})).toBe('SPD*1.0*ACC:CZ5855000000001265098001+RZBCCZPP*ALT-ACC:CZ5855000000001265098001+RZBCCZPP,CZ5855000000001265098001*AM:480.55*CC:CZK*CRC32:B51BE0B4*DT:20180420*MSG:PAYMENT FOR SOME STUFF*PT:P2P*RF:1234567890123456*RN:PETR DVORAK*X-ID:1234567890*X-KS:1234567890*X-PER:7*X-VS:1234567890');
	});

	it('allows xvs starting with a zero', () => {
		expect(spayd({
			acc: 'CZ2806000000000168540115',
			am: '450.00',
			cc: 'CZK',
			xvs: '0123456789'
		})).toBe('SPD*1.0*ACC:CZ2806000000000168540115*AM:450.00*CC:CZK*X-VS:0123456789');
	});

	it('throws an exception when the amount is separated by comma', () => {
		expect(() => spayd({
			acc: 'CZ2806000000000168540115',
			am: '450,00',
			cc: 'CZK',
			msg: 'PLATBA ZA ZBOZI',
			xvs: '1234567890'
		})).toThrow();
	});

	it('throws an exception when given an uknown key in the payment config', () => {
		expect(() => spayd({
			acc: 'CZ2806000000000168540115',
			am: '450.00',
			cc: 'CZK',
			msg: 'PLATBA ZA ZBOZI',
			xvs: '1234567890',
			// @ts-ignore
			unknownKey: 'xxxxxxx'
		})).toThrow();
	});

	it('Zero amount with decimal', () => {
		expect(() => spayd({
			acc: 'CZ2806000000000168540115',
			am: '0.00',
			cc: 'CZK'
		})).toThrow();
	});

	it('Zero amount without decimal', () => {
		expect(() => spayd({
			acc: 'CZ2806000000000168540115',
			am: '0',
			cc: 'CZK'
		})).toThrow();
	});

	it('Amount less then one', () => {
		expect(spayd({
			acc: 'CZ2806000000000168540115',
			am: '0.01',
			cc: 'CZK'
		})).toBe('SPD*1.0*ACC:CZ2806000000000168540115*AM:0.01*CC:CZK');
	});
});

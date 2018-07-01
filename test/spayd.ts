import spayd from '../src/';

test('Simple example from official docs', () => {
	expect(spayd({
		acc: 'CZ2806000000000168540115',
		am: '450.00',
		cc: 'CZK',
		msg: 'PLATBA ZA ZBOZI',
		xvs: '1234567890'
	})).toBe('SPD*1.0*ACC:CZ2806000000000168540115*AM:450.00*CC:CZK*MSG:PLATBA ZA ZBOZI*X-VS:1234567890');
});

test('Should throw exception because of wrong format', () => {
	expect(() => spayd({
		acc: 'CZ2806000000000168540115',
		am: '450,00',
		cc: 'CZK',
		msg: 'PLATBA ZA ZBOZI',
		xvs: '1234567890'
	})).toThrow();
});

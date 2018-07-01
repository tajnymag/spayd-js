export default interface PaymentDescription {
	acc: string,
	altAcc?: string[],
	am: string,
	cc?: string,
	rf?: number,
	rn?: string,
	dt?: Date,
	pt?: string,
	msg?: string,
	crc32?: string,
	xper?: string,
	xvs?: string,
	xss?: string,
	xks?: string,
	xid?: string
}

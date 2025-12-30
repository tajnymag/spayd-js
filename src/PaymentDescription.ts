export default interface PaymentDescription {
	acc: string,
	altAcc?: string[],
	am: string,
	cc?: string | undefined,
	rf?: number | undefined,
	rn?: string | undefined,
	dt?: Date | undefined,
	pt?: string | undefined,
	msg?: string | undefined,
	crc32?: string | undefined,
	xper?: string | undefined,
	xvs?: string | undefined,
	xss?: string | undefined,
	xks?: string | undefined,
	xid?: string | undefined
}

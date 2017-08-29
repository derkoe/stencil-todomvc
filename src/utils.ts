export function uuid(): string {
	let id = '';

	for (let i = 0; i < 32; i++) {
		// tslint:disable-next-line:no-bitwise
		const random = Math.random() * 16 | 0;
		if (i === 8 || i === 12 || i === 16 || i === 20) {
			id += '-';
		}
		// tslint:disable-next-line:no-bitwise
		id += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
			.toString(16);
	}

	return id;
}

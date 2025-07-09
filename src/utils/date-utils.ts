export function formatDateToYYYYMMDD(date: Date): string {
	return date.toISOString().substring(0, 10);
}

export function formatDateToDDMMYYYY(date: Date): string {
	return [
		date.getDate().toString().padStart(2, '0'),
		(date.getMonth() + 1).toString().padStart(2, '0'),
		date.getFullYear()
	].join('.');
}

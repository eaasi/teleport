export default function isValidAlert(value): boolean {
	return ['success', 'info', 'warning', 'error'].indexOf(value) !== -1;
}
export default function isValidAlert(value): boolean {
	return ['success', 'info', 'warning', 'error', 'neutral'].indexOf(value) !== -1;
}
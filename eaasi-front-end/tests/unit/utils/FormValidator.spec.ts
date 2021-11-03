import validator from '@/utils/form-validator';

describe('form-validator', () => {
	it('should return null on valid email given email validationString', () => {
		const result = validator.validate('email', 'foo@bar.com', 'foo\'s email');
		expect(result).toBeNull();
	});

	it('should return error message on invalid email given email validationString', () => {
		const result = validator.validate('email', 'quux', 'foo\'s email');
		expect(result).toBe('Please enter a valid email address');
	});

	it('should return null on valid min length given number satisfying that condition', () => {
		const result = validator.validate('min:5', '12345', 'some number');
		expect(result).toBeNull();
	});

	it('should return error message on invalid min length given number not satisfying that condition', () => {
		const result = validator.validate('min:5', '1234', 'some number');
		expect(result).toBe('some number must be at least 5 characters');
	});

	it('should return null on valid min length given number satisfying that condition', () => {
		const result = validator.validate('minlength:5', '12345', 'some number');
		expect(result).toBeNull();
	});

	it('should return error message on invalid min length given number not satisfying that condition', () => {
		const result = validator.validate('minlength:5', '1234', 'some number');
		expect(result).toBe('some number must be at least 5 characters');
	});

	it('should return null on valid max length given number satisfying that condition', () => {
		const result = validator.validate('max:5', '12345', 'some number');
		expect(result).toBeNull();
	});

	it('should return error message on invalid max length given number not satisfying that condition', () => {
		const result = validator.validate('max:5', '123456', 'some number');
		expect(result).toBe('some number can not exceed 5 characters');
	});

	it('should return null on valid max length given number satisfying that condition', () => {
		const result = validator.validate('maxlength:5', '12345', 'some number');
		expect(result).toBeNull();
	});

	it('should return error message on invalid max length given number not satisfying that condition', () => {
		const result = validator.validate('maxlength:5', '12345678', 'some number');
		expect(result).toBe('some number can not exceed 5 characters');
	});
});
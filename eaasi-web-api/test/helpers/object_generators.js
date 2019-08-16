import faker from 'faker';

/**
 * Generates a fake "role" name for testing
 * @returns {string}
 */
export function generateFakeRoleName() {
	return faker.name.jobTitle()
}

/**
 * Generates a fake user name for testing
 * @returns {string}
 */
export function generateFakeUsername() {
	let random_binary = faker.random.number(1);

	// Build the first part of the username
	let first_part_choices = [faker.name.prefix(random_binary).split(".").join(""), faker.name.firstName(random_binary)]
	let first_part_choice = first_part_choices[Math.floor(Math.random()*first_part_choices.length)];

	// Build the second part of the username
	let second_part_choices = [faker.hacker.verb(), faker.hacker.noun(), faker.hacker.adjective(), faker.hacker.abbreviation()]
	let second_part_choice = second_part_choices[Math.floor(Math.random()*second_part_choices.length)];

	return first_part_choice + "_" + second_part_choice;
}

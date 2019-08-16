/**
 * Data specification for a Tag component
 */
export interface ITag {
	/**
	 * FontAwesome Icon string
	 */
	icon: string

	/**
	 * Property name
	 */
	key: string | number

	/**
	 * Value name
	 */
	value: string | number | Date
}

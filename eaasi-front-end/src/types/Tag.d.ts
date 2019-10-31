/**
 * Data specification for a Tag component
 */
export interface ITag {
	/**
	 * FontAwesome Icon string
	 */
	icon: string

	/**
	 * Tag Color
	 */
	color: string

	/**
	 * Tag display value
	 */
	text: string | number | Date
}

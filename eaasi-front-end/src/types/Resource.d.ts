/**
 * Data specification for a Resource component
 */
import {ITag} from './Tag.d';

export interface IResource {
	/**
	 * A unique identifier for the Resource object
	 */
	id: number | string

	/**
	 * The title of a Resource object
	 */
	title: string

	/**
	 * A group of Tags
	 */
	tagGroup: Array<ITag>

	/**
	 * Contains key-value pairs of data represented
	 * as an Object. Appears in the right pane of
	 * a SelectableCard
	 */
	content: object

	/**
	 * Contains key-value pairs of data represented as
	 * an Object. Appears after a thematic break following
	 * content in a SelectableCard
	 */
	subContent: object
}


### Example Usage

The `BaseFormField` class is extended by form sub classes to provide base field functionality.
It provides a common set of Props, Methods, Data, and Watchers.

Class-based Vue Components are used throughout this project.

The BaseFormField can be extended as in the following example:

```sh
@Component({
	name: 'MyFormField',
	components: {
		FormFieldWrapper
	}
})
class MyFormField extends BaseFormField {
}
```

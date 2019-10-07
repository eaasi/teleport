### Example Usage

This is an upload form wrapped button for uploading files from the client file-system.
The component will emit a change event with a list of any files that are selected by the user.

```js
let state = {
	files: []
};

function addFiles(newFiles) {
	state.files = [ ...state.files, ...newFiles ];
}

<div id="fub-wrapper">
	<file-upload-button
		button-label="Click to browse"
		icon="plus"
		@change="addFiles"
	/>
	<br/>
	<div>
		<strong>Files Added:</strong>
		<br/><br/>
		<div v-for="f in state.files">{{ f.name }}</div>
	</div>
</div>
```
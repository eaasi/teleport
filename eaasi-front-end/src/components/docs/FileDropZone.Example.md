### Example Usage

This is a dropzone for uploading files from the client file-system. The component will emit
a change event with a list of any files that are dropped into it. Drag and drop a file from your
filesystem into the dropzone to test.

```js

let state = {
	files: []
};

function addFiles(newFiles) {
	state.files = [ ...state.files, ...newFiles ];
}

<div id="dfu-wrapper">
	<file-dropzone
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
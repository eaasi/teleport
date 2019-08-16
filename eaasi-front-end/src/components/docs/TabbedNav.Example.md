### Example Usage


```js
let tabs = [
	{label: "First"},
	{label: "Second"},
	{label: "Third"}
];

let selected = "First"

function updateSelected(newValue) {
	selected = newValue;
};

<div id="example-tabbed-nav-wrapper">
    <tabbed-nav 
        :tabs="tabs" 
        v-model="selected" 
        v-on:input="updateSelected"/>
</div>
```

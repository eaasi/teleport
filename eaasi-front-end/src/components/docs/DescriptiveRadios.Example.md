### Example Usage

```js
let opts = [
	{value: 1, label: 'Breakfast', description: 'Bacon and Eggs'},
	{value: 2, label: 'Lunch', description: 'Soup and Salad'},
];

let meal = 1;

<div id="descriptiveRadios">
    <descriptive-radios :options="opts" v-model="meal" />
</div>
```

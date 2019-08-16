### Example Usage

```js

let selected = 'opt_1'

<div id="select-list-wrapper">
    <select-list v-model="selected">
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
    </select-list>

    <div id="select-list-value" style="font-size: 2.2rem; color: #aaa; padding: 12px;">
            Selected: {{ selected }}
    </div>
</div>
```

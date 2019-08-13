### Example Usage

```js
const selected = 'North'
const options = ['North', 'South', 'East', 'West']
<div>
    <radio-buttons
        name="radio-options"
        v-model="selected"
        :values="options"
        label="Meeting Room"
    />
</div>
<div style="font-size: 2.2rem; color: #aaa; padding: 12px;">
    Selected: {{ selected }}
</div>
```

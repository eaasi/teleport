### Example Usage

Basic UI Chip example:

```js
<ui-chip>Default</ui-chip>
```

Basic UI Chip example with click listener:

```js
let filters = 0

<ui-chip close v-on:close="filters += 1">
    Some Filter Attribute
</ui-chip>

<div style="margin:12px;">
Close clicked {{ filters }} times!
</div>

```

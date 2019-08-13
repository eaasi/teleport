### Example Usage

Basic UI Button example:

```js
let counter = 0

<ui-button v-on:click="counter += 1">Click Here!</ui-button>

<div style="padding-top: 12px; font-size: 1.2em; color=#eee">
    {{ counter }}
</div>
```

UI Button with `secondary` prop example:

```js
let counter = 0
<ui-button secondary v-on:click="counter += 1">Click Here!</ui-button>
<div style="padding-top: 12px; font-size: 1.2em; color=#eee">
    {{ counter }}
</div>
```


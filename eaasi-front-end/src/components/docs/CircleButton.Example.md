### Example Usage

Basic UI Button example:

```js
let counter = 0

<circle-button
    icon="check"
    class="ml-sm"
    v-on:click="counter += 1"
/>
<div style="padding-top: 12px; font-size: 1.2em; color=#eee">
    {{ counter }}
</div>
```

UI Button with `color-preset` prop example:

```js
let counter = 0
<circle-button
    color-preset="light-blue"
    icon="check"
    class="ml-sm"
    v-on:click="counter += 1"
/>
<div style="padding-top: 12px; font-size: 1.2em; color=#eee">
    {{ counter }}
</div>
```

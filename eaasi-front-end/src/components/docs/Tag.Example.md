### Example Usage

Tags can be colored using the `color` prop.  Valid values are `yellow`, `blue`, `green`, and `red`.
If no value for `color` is provided, the tag will render with a white background.

```js
<div>
    <div style="padding: 10px 0;">
        <tag text="GOOD DAY" />
        <tag color="yellow" text="SAVED" />
        <tag color="blue" text="NEW" />
        <tag color="red" text="BETA" />
        <tag color="green" text="SUCCESS" />
    </div>
</div>
```

Icons can be added to Tags by passing the name of a FontAwesome icon via the `icon` prop.
```js
<div>
    <div style="padding: 10px 0;">
        <tag icon="fa-star" text="Star" />
        <tag icon="fa-chess" color="yellow" text="Chess" />
        <tag icon="fa-feather" color="blue" text="Feather" />
        <tag icon="fa-moon" color="red" text="Moon" />
        <tag icon="fa-om" color="green" text="Om" />
    </div>
</div>
```

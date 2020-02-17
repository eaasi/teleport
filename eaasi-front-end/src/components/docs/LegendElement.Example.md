### Example Usage

This component receives data via `ILegend`-conforming objects, which simply contain `text` and `color` properties.
The `color` property must correspond to a CSS class on the `LegendElement` component.

```js
	let legend = { color: 'yellow', 'text': 'An Edited Field' };

    <div>
        <div style="padding: 10px 0;">
            <legend-element :legend="legend" />
        </div>
    </div>
```

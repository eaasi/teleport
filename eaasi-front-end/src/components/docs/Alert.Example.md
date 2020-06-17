### Example Usage

The Alert component has a default slot to wrap alert text.  For example, it is used as a container for
content in an <a href='#alert'>Alert</a> component.

Provide a `type` of `info`, `success`, `warning`, or `error` to change the Alert style

```js
<div style="margin: 16px;">
    <alert type="info">
        This is an Info Alert
    </alert>
</div>
<hr />
<div style="margin: 16px;">
    <alert type="success">
        This is Success Alert
    </alert>
</div>
<hr />
<div style="margin: 16px;">
    <alert type="warning">
        This is Warning Alert
    </alert>
</div>
<hr />
<div style="margin: 16px;">
    <alert type="error">
        This is an Error Alert
    </alert>
</div>
```

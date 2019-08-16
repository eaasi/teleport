### Example Usage

The Alert Card has a default slot to wrap alert text.

Provide a `type` of `info`, `success`, `warning`, or `error` to change the Alert Card style

```js

<div style="display: flex; flex-direction: row;">
    <alert-card type="info">
        This is some useful information.
    </alert-card>
    <alert-card type="success">
        This is a success message.
    </alert-card>
    <alert-card type="warning">
        This is a warning.
    </alert-card>
    <alert-card type="error">
        This is an error message.
    </alert-card>
</div>
```

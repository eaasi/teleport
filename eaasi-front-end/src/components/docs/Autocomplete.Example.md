### Example Usage

The `anchor` prop can be used to return autocomplete suggestions for specific keys in underlying
JSON data used to populate the autocomplete suggestions. The following example makes a call to 
https://jsonplaceholder.typicode.com/comments to get an array of objects containing
`postId`, '`id`, `name`, `email`, and `body` properties. Try searching for ".com"
in the Autocomplete input.

```js
let autoInput = ''
let checked = false
let text = ''
<div>
    <eaasi-form ref="_form">
        <div style="padding: 10px 0;">
            <autocomplete
                anchor="email"
                url="https://jsonplaceholder.typicode.com/comments"
                v-model="autoInput"
                label="Search Email Addresses"
                rules="required"
            />
        </div>
    </eaasi-form>
</div>
```

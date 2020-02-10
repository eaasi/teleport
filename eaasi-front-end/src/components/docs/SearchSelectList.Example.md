### Example Usage

```js

let value = ''

let softwareList = [
    {
        id: 1,
        city: 'Paris'
    },
    {
        id: 2,
        city: 'New York'
    },
    {
        id: 3,
        city: 'Barcelona'
    }
];

<div id="search-select-list-wrapper">
    <search-select-list
        v-model="value"
        label="Search Software"
        option-label="city"
        anchor="id"
        placeholder="Please select a cit"
        :data="softwareList"
    />

    <div id="search-select-list-value" style="font-size: 2.2rem; color: #aaa; padding: 12px;">
            Selected: {{ value }}
    </div>
</div>
```

### Example Usage


```js
let isVisible = false 

<ui-button @click="isVisible = true">Show Modal</ui-button>

<modal :show="isVisible" @close="isVisible=false">
    <template v-slot:header>
        <div style="font-size: 2em; padding-top:12px;">
        Modal Header
        </div>
    </template>
    <div style="padding:12px;">
        <div style="padding-bottom:8px;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
            officia deserunt mollit anim id est laborum
        </div>
    </div>
</modal>
```

### Example Usage

The `closeDelay` prop can be used to set the delay before the menu closes when the 
mouse leaves the area covered by the component.

```js
<div style="margin:6px; padding:24px; background-color:#0086C2; color:white;">
    <hover-menu class="hover-menu-example">
        <div slot="trigger">Hover here to show content</div>
        <div slot="menu" style="padding-top:24px;">This is the menu content, hover-out to hide</div>
    </hover-menu>
</div>

<div style="margin:6px; padding:24px; background-color:#0086C2; color:white;">
    <hover-menu :closeDelay="3000">
        <div slot="trigger">I'll close 3 seconds after you leave</div>
        <div slot="menu" style="padding-top:24px;">Wait for it...</div>
    </hover-menu>
</div>
```

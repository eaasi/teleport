### Example Usage

Big Button takes an optional `block` prop to change its display style.

```js
<div style="padding: 3px;">
    <big-button label="My block prop is true!" :block="true"
    />
</div>

<div style="padding: 3px;">
    <big-button label="My block prop is false!" :block="false" />
</div>

```
Big Button can be sized using the `size` prop, which takes a value of `sm`, `small`, `lg`, or `large`

```js
<div style="padding: 3px;">
    <big-button label="Example Big Button" size="sm" 
    />
</div>
<div style="padding: 3px;">
    <big-button label="Example Big Button" size="lg" 
    />
</div>
```

Big Button with `label` prop:

```js
<big-button label="Confirm" 
/>
```

Big Button with `sublabel` prop:

```js
<big-button label="Confirm" sublabel="Sublabel Information Here" 
/>
```

Big Button with `icon` prop:

```js
<big-button label="Submit" icon="ice-cream"
/>
```

Big Button with `info` prop:

```js
<big-button label="Submit" info="Your information will be submitted." 
/>
```

Big Button with `label`, `sublabel`, `icon`, and `info` props:

```js
<big-button 
    label="Label" 
    sublabel="Sub-Label" 
    icon="tree" 
    info="Info" 
    />
```

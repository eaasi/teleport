### Example Usage

Use the slots provided by the form component to wrap form elements in custom form components.

See example usage for a custom input component:

```js
<template>
	<form-field-wrapper v-bind="wrapperProps" class="eaasi-text-input">
        <div>
            <input
                v-bind="$attrs"
                v-on="inputListeners"
                :value="value"
                :id="id"
            />
            <span class="eaasi-field-icon">
                <i :class="`fas fa-${icon}`"></i>
            </span>
        </div>
	</form-field-wrapper>
</template>
```

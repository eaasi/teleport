<template>
	<form-field-wrapper class="eaasi-select" v-bind="wrapperProps" :readonly="readonly">
		<div class="eaasi-input-wrapper">
			<div :class="['eaasi-input flex-row relative select-list', fieldStatus, {readonly}, {empty: !value}]">
				<select
					v-bind="$attrs"
					v-on="inputListeners"
					:value="value"
					:id="id"
				>
					<slot></slot>
				</select>
				<span class="eaasi-field-icon">
					<span class="fas fa-chevron-down"></span>
				</span>
			</div>
		</div>
	</form-field-wrapper>
</template>

<script lang="ts">
import {Component, Watch} from 'vue-property-decorator';
import BaseFormField from './BaseFormField.vue';
import FormFieldWrapper from './FormFieldWrapper.vue';

/**
 * A select list form input
 * @example ../../docs/SelectList.Example.md
 */
@Component({
	name: 'SelectList',
	components: {
		FormFieldWrapper
	}
})
export default class SelectList extends BaseFormField { }

</script>


<style lang="scss">
.select-list {
	.eaasi-field-icon {
		pointer-events: none;
		position: absolute;
		right: 0.6rem;
	}

	&.empty {
		select {
			color: $grey;

			option {
				color: initial;
			}
		}
	}
}
</style>
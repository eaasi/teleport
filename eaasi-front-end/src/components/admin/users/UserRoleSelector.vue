<template>
	<div :class="['eaasi-user-role-selector', { checked }]" @click="$emit('input', role.id)">
		<div class="eur-info">
			<h3>{{ role.roleName }}</h3>
			<p>{{ role.roleDescription }}</p>
		</div>
		<div class="eur-footer">
			<div :class="['eur-checkbox', { checked }]"></div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { IEaasiRole } from 'eaasi-admin';

@Component({
	name: 'UserRoleSelector',
})
export default class UserRoleSelector extends Vue {

	/* Props
	============================================*/

	/**
	 * A user role
	 */
	@Prop({type: Object as () => IEaasiRole, required: true})
	readonly role: IEaasiRole

	/**
	 * The ID of the selected user role
	 */
	@Prop({type: Number, required: true})
	readonly value: number;

	/* Computed
	============================================*/

	get checked() {
		return this.role.id === this.value;
	}

}

</script>

<style lang="scss">
.eaasi-user-role-selector {
	background-color: $light-grey;
	border: solid 2px black;
	box-sizing: border-box;
	color: black;
	cursor: pointer;
	overflow: hidden;
	text-align: center;
	transition: background-color 0.3s;

	&.checked {
		background-color: $medium-grey;

		.eur-footer {
			background-color: $dark-light-grey;
		}
	}

	p {
		color: $dark-light-grey;
	}

	.eur-info {
		padding: 1.5rem;
	}

	.eur-icon {
		font-size: 2.5rem;
		margin-bottom: 6px;
	}

	.eur-footer {
		background-color: $medium-grey;
		padding: 1rem;
		transition: background-color 0.3s;
	}

	.eur-checkbox {
		border: solid 2px $black;
		border-radius: 50%;
		display: inline-block;
		height: 1.6rem;
		padding: 2px;
		width: 1.6rem;

		&.checked {
			background-color: $black;
			box-shadow: inset 0px 0px 2px 2px #FFFFFF;
		}
	}
}
</style>
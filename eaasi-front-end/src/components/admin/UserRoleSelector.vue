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
import { IEaasiRole } from 'eaasi-auth';

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
	background-color: #FFFFFF;
	border: solid 2px $light-blue;
	border-radius: 10px;
	box-sizing: border-box;
	color: $dark-blue;
	cursor: pointer;
	overflow: hidden;
	text-align: center;
	transition: background-color 0.3s;

	&.checked {
		background-color: lighten($light-blue, 80%);

		.eur-footer {
			background-color: lighten($light-blue, 50%);
		}
	}

	p {
		color: $dark-neutral;
	}

	.eur-info {
		padding: 1.5rem;
	}

	.eur-icon {
		font-size: 2.5rem;
		margin-bottom: 6px;
	}

	.eur-footer {
		background-color: lighten($light-blue, 90%);
		border-top: solid 2px $light-blue;
		padding: 1rem;
		transition: background-color 0.3s;
	}

	.eur-checkbox {
		border: solid 2px $light-blue;
		border-radius: 50%;
		display: inline-block;
		height: 1.6rem;
		padding: 2px;
		width: 1.6rem;

		&.checked {
			background-color: $light-blue;
			box-shadow: inset 0px 0px 2px 2px #FFFFFF;
		}
	}
}
</style>
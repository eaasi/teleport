<template>
	<div>
		<!-- This should link to the identity SP -->
		<a :href="loginUrl">
			<ui-button>Login</ui-button>
		</a>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
    name: 'SingleSignOnLoginBox'
})
export default class SingleSignOnLoginBox extends Vue {

    /* Props
    ============================================*/
    @Prop({ type: String, required: true })
    readonly loginUrl: string;

}
</script>

<style lang='scss' scoped>
	div {
		padding: 5rem 3rem 2rem 3rem;
		text-align: center;
	}
</style>
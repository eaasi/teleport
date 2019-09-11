import Vue from 'vue';
import config from '@/config';

declare module 'vue/types/vue' {
	interface Vue {
		$colors: any;
		$constants: any;
	}
}

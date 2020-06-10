import { ITemplateParams } from '@/models/admin/OperatingSystems';

const NATIVE_CONFIG_FLAG = '-smp';
const MEMORY_CONFIG_FLAG = '-m';

export function populateNativeConfig(template_params: ITemplateParams): string {
	let confStr = '';
	if (template_params.vga) {
		confStr += ' -vga ' + template_params.vga;
	}
	if (template_params.cpu) {
		confStr += populateNativeConfigForCpu(template_params.cpu);
	}
	if (template_params.net) {
		confStr += ' -net nic,model=' + template_params.net;
	}
	if (template_params.audio) {
		confStr += ' -soundhw ' + template_params.audio;
	}
	if (template_params.memory) {
		confStr += ' -m ' + template_params.memory;
	}
	if (template_params.pointer === 'usb') {
		confStr += ' -usb -usbdevice tablet';
	}
	if (template_params.kvm_enabled) {
		confStr += ' -enable-kvm';
	}
	if (confStr.startsWith(' ')) {
		confStr = confStr.substring(1);
	}
	return confStr;
}

export function populateNativeConfigForCpu(cpu: string): string {
	return ` ${NATIVE_CONFIG_FLAG} ${cpu}`;
}

export function updateNativeConfigForCpu(nativeConfig: string, cpu: string | number): string {
	const cpuNumber = Number(cpu);
	let nativeConfigElements = nativeConfig.split(' ');
	let cpuNumberIndex: number;
	let filteredNativeConfig = nativeConfigElements.map((el, index) => {
		if (el === NATIVE_CONFIG_FLAG) {
			cpuNumberIndex = index+1;
		} else if (cpuNumberIndex === index) {
			return cpuNumber;
		}
		return el;
	});
	return filteredNativeConfig.join(' ');
}

export function updateNativeConfigForMemory(nativeConfig: string, memory: string | number): string {
	const memoryNumber = Number(memory);
	let nativeConfigElements = nativeConfig.split(' ');
	let memoryNumberIndex: number;
	let filteredNativeConfig = nativeConfigElements.map((el, index) => {
		if (el === MEMORY_CONFIG_FLAG) {
			memoryNumberIndex = index+1;
		} else if (memoryNumberIndex === index) {
			return memoryNumber;
		}
		return el;
	});
	return filteredNativeConfig.join(' ');
}
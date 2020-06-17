const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

import { ApplicationLog, Bookmark, EaasiRole, EaasiTask, EaasiUser, Emulator, EmulationProject, EmulationProjectResource, UserImportedContent, UserImportedEnvironment, UserImportedSoftware } from '@/data_access/models/app';
import { AudioDevice, AudioDeviceHasDriverSoftware, AudioDeviceHasEquivalent } from '@/data_access/models/audio-device';
import { ChipSet, ColorDepth, Developer, EventType, FrequencyUnit, Language, MediaType } from '@/data_access/models/base';
import { ComputingEnvironment, CpuArchitecture } from '@/data_access/models/computing';
import { ConfiguredAudioDevice, ConfiguredDisk, ConfiguredDiskHasPartition, ConfiguredGpuDevice, ConfiguredGpuDeviceHasDisplayDevice, ConfiguredKeyboardDevice, ConfiguredMachine, ConfiguredNetwork, ConfiguredNetworkDevice, ConfiguredNetworkHasConfiguredMachine, ConfiguredNetworkMachineExpectedNetworkService, ConfiguredOS, ConfiguredOSHasUserInformation, ConfiguredOSLanguage, ConfiguredPointerDevice, ConfiguredSoftware, ConfiguredSoftwareUsesFormatImplementation, ConfiguredStorageDevice } from '@/data_access/models/configured';
import { ContentEnvironment, ContentObject, ContentObjectHasObjectFile } from '@/data_access/models/content';
import { DisplayDevice, DisplayDeviceHasColorDepth, DisplayDeviceHasDisplayInterface, DisplayDeviceHasDisplayResolution, DisplayDeviceHasDriverSoftware, DisplayInterface, DisplayResolution } from '@/data_access/models/display';
import { File, FileExtension, FileFormat, FileFormatHasFileExtension, FileFormatHasMimeType, FileOperation, FileOperationHasFileExtension, FileOperationNearestFileFormat, FileSystem, FormatImplementation, FormatOperation, MimeType, ObjectFileOperation, OperationType, ReadWriteStatus } from '@/data_access/models/file';
import { Country, Region } from '@/data_access/models/geo';
import { GpuDevice, GpuDeviceHasDisplayInterface, GpuDeviceHasDriverSoftware, GpuDeviceHasEquivalent, GpuDeviceHasMachineInterface } from '@/data_access/models/gpu';
import { KeyboardDevice, KeyboardDeviceHasDriverSoftware, KeyboardDeviceHasLanguage, KeyboardDeviceHasMachineInterface, KeyboardLayout } from '@/data_access/models/keyboard';
import { MachineInterface, MachineRecommendation, MachineType } from '@/data_access/models/machine';
import { NetworkDevice, NetworkDeviceHasDriverSoftware, NetworkDeviceHasMachineInterface, NetworkEnvironment, NetworkService } from '@/data_access/models/network';
import { OsVersion, OsVersionColorDepthSettings, OsVersionDisplayResolutionSettings, OsVersionHasAlternateID, OsVersionHasProgrammingLanguage, OsVersionHasSoftwareLicense, OsVersionHasTimeZoneSettings, OsVersionIncludesSoftwareVersion, OsVersionIsCompatibleWithConfiguredMachine, OsVersionKeyboardLanguageSettings, OsVersionKeyboardLayoutSettings, OsVersionLanguageSettings, OsVersionRegionSettings } from '@/data_access/models/os';
import { PointerDevice, PointerDeviceHasDriverSoftware, PointerDeviceHasMachineInterface, PointerDeviceType } from '@/data_access/models/pointer';
import { ProcessorDevice, ProcessorDeviceHasDriverSoftware, ProcessorDeviceHasMachineInterface } from '@/data_access/models/processor';
import { SoftwareEnvironment, SoftwareEnvironmentHasDiskImage, SoftwareEnvironmentHasPartConfiguredSoftware, SoftwareFamilyVersionHasSoftwareProduct, SoftwareFamilyVersionHasSoftwareVersion, SoftwareLicense, SoftwareObject, SoftwareObjectHasAlternateID, SoftwareObjectHasObjectFile, SoftwareObjectIsManifestationOfSoftwareVersion, SoftwareProduct, SoftwareProductHasAlternateName, SoftwareType, SoftwareVersion, SoftwareVersionHasAlternateID, SoftwareVersionHasAlternateName, SoftwareVersionHasDeveloper, SoftwareVersionHasFileOperation, SoftwareVersionHasFormatImplementation, SoftwareVersionHasLanguageSettings, SoftwareVersionHasProgrammingLanguage, SoftwareVersionHasSoftwareLicense, SoftwareVersionHasSystemRequirements, SoftwareVersionIsCompatibleWithComputingEnvironment } from '@/data_access/models/software';
import { SoftwareProductHasSoftwareType } from '@/data_access/models/software/SoftwareProductHasSoftwareType';
import { StorageDevice, StorageDeviceHasDriverSoftware, StorageDeviceHasMachineInterface, StorageDeviceType } from '@/data_access/models/storage';
import { SystemRequirements, SystemRequirementsRequiresAudioDevice, SystemRequirementsRequiresGpuDevice, SystemRequirementsRequiresKeyboardDevice, SystemRequirementsRequiresNetworkDevice, SystemRequirementsRequiresOsVersion, SystemRequirementsRequiresPointerDeviceType, SystemRequirementsRequiresProcessor, SystemRequirementsRequiresSoftwareVersion, SystemRequirementsRequiresStorageDeviceType } from '@/data_access/models/system';
import { Timezone, TimezoneLabel } from '@/data_access/models/timezone';
import { Sequelize } from 'sequelize-typescript';
import { EaasiUserHash } from './app/EaasiUserHash';

export const sequelize = new Sequelize({
	host: config.host,
	database: config.database,
	username: config.username,
	password: config.password,
	dialect: config.dialect,
	models: [
		// App
		ApplicationLog,
		Bookmark,
		EaasiTask,
		EaasiRole,
		EaasiUser,
		EaasiUserHash,
		EmulationProject,
		EmulationProjectResource,
		Emulator,
		UserImportedSoftware,
		UserImportedEnvironment,
		UserImportedContent,

		// Audio Device
		AudioDevice,
		AudioDeviceHasDriverSoftware,
		AudioDeviceHasEquivalent,

		// Base
		ChipSet,
		ColorDepth,
		Developer,
		EventType,
		FrequencyUnit,
		Language,
		MediaType,

		// Computing
		ComputingEnvironment,
		CpuArchitecture,

		// Configured
		ConfiguredAudioDevice,
		ConfiguredDisk,
		ConfiguredDiskHasPartition,
		ConfiguredGpuDevice,
		ConfiguredGpuDeviceHasDisplayDevice,
		ConfiguredKeyboardDevice,
		ConfiguredMachine,
		ConfiguredNetwork,
		ConfiguredNetworkDevice,
		ConfiguredNetworkHasConfiguredMachine,
		ConfiguredNetworkMachineExpectedNetworkService,
		ConfiguredNetworkHasConfiguredMachine,
		ConfiguredOS,
		ConfiguredOSHasUserInformation,
		ConfiguredOSLanguage,
		ConfiguredPointerDevice,
		ConfiguredSoftware,
		ConfiguredSoftwareUsesFormatImplementation,
		ConfiguredStorageDevice,

		// Content
		ContentEnvironment,
		ContentObject,
		ContentObjectHasObjectFile,

		// Display
		DisplayDevice,
		DisplayDeviceHasColorDepth,
		DisplayDeviceHasDisplayInterface,
		DisplayDeviceHasDisplayResolution,
		DisplayDeviceHasDriverSoftware,
		DisplayInterface,
		DisplayResolution,

		// File
		File,
		FileExtension,
		FileFormat,
		FileFormatHasFileExtension,
		FileFormatHasMimeType,
		FileOperation,
		FileOperationHasFileExtension,
		FileOperationNearestFileFormat,
		FileSystem,
		FormatImplementation,
		FormatOperation,
		MimeType,
		ObjectFileOperation,
		OperationType,
		ReadWriteStatus,

		// Geo
		Country,
		Region,

		// GPU
		GpuDevice,
		GpuDeviceHasDisplayInterface,
		GpuDeviceHasDriverSoftware,
		GpuDeviceHasEquivalent,
		GpuDeviceHasMachineInterface,

		// Keyboard
		KeyboardDevice,
		KeyboardDeviceHasDriverSoftware,
		KeyboardDeviceHasLanguage,
		KeyboardDeviceHasMachineInterface,
		KeyboardLayout,

		// Machine
		MachineInterface,
		MachineRecommendation,
		MachineType,

		// Network
		NetworkDevice,
		NetworkDeviceHasDriverSoftware,
		NetworkDeviceHasMachineInterface,
		NetworkEnvironment,
		NetworkService,

		// OS
		OsVersion,
		OsVersionColorDepthSettings,
		OsVersionDisplayResolutionSettings,
		OsVersionHasAlternateID,
		OsVersionHasProgrammingLanguage,
		OsVersionHasSoftwareLicense,
		OsVersionHasTimeZoneSettings,
		OsVersionIncludesSoftwareVersion,
		OsVersionIsCompatibleWithConfiguredMachine,
		OsVersionKeyboardLanguageSettings,
		OsVersionKeyboardLayoutSettings,
		OsVersionLanguageSettings,
		OsVersionRegionSettings,

		// Pointer
		PointerDevice,
		PointerDeviceHasDriverSoftware,
		PointerDeviceHasMachineInterface,
		PointerDeviceType,

		// Processor
		ProcessorDevice,
		ProcessorDeviceHasDriverSoftware,
		ProcessorDeviceHasMachineInterface,

		// Software
		SoftwareEnvironment,
		SoftwareEnvironmentHasDiskImage,
		SoftwareEnvironmentHasPartConfiguredSoftware,
		SoftwareFamilyVersionHasSoftwareProduct,
		SoftwareFamilyVersionHasSoftwareVersion,
		SoftwareLicense,
		SoftwareObject,
		SoftwareObjectHasAlternateID,
		SoftwareObjectHasObjectFile,
		SoftwareObjectIsManifestationOfSoftwareVersion,
		SoftwareProduct,
		SoftwareProductHasAlternateName,
		SoftwareProductHasSoftwareType,
		SoftwareProductHasAlternateName,
		SoftwareProductHasSoftwareType,
		SoftwareType,
		SoftwareVersion,
		SoftwareVersionHasAlternateID,
		SoftwareVersionHasAlternateName,
		SoftwareVersionHasDeveloper,
		SoftwareVersionHasFileOperation,
		SoftwareVersionHasFormatImplementation,
		SoftwareVersionHasLanguageSettings,
		SoftwareVersionHasProgrammingLanguage,
		SoftwareVersionHasSoftwareLicense,
		SoftwareVersionHasSystemRequirements,
		SoftwareVersionIsCompatibleWithComputingEnvironment,

		// Storage
		StorageDevice,
		StorageDeviceHasDriverSoftware,
		StorageDeviceHasMachineInterface,
		StorageDeviceType,

		// System
		SystemRequirements,
		SystemRequirementsRequiresAudioDevice,
		SystemRequirementsRequiresGpuDevice,
		SystemRequirementsRequiresKeyboardDevice,
		SystemRequirementsRequiresNetworkDevice,
		SystemRequirementsRequiresOsVersion,
		SystemRequirementsRequiresPointerDeviceType,
		SystemRequirementsRequiresProcessor,
		SystemRequirementsRequiresSoftwareVersion,
		SystemRequirementsRequiresSoftwareVersion,
		SystemRequirementsRequiresStorageDeviceType,

		// Timezone
		Timezone,
		TimezoneLabel
	]
});

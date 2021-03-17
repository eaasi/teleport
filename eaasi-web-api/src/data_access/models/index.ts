const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

import { ApplicationLog, Bookmark, EaasiRole, EaasiTask, EmulationProject, EmulationProjectResource, Emulator, EmulationProjectTaskSuccessor, UserImportedContent, UserImportedEnvironment, UserImportedImage, UserImportedSoftware } from '@/data_access/models/app';
import { Sequelize } from 'sequelize-typescript';
import { TempEnvironment } from './app/TempEnvironment';

export const sequelize = new Sequelize({
	host: config.host,
	database: config.database,
	username: config.username,
	password: config.password,
	dialect: config.dialect,
	logging: false,
	models: [
		// App
		ApplicationLog,
		Bookmark,
		EaasiRole,
		EaasiTask,
		//EaasiUser,
		//EaasiUserHash,
		EmulationProject,
		EmulationProjectResource,
		EmulationProjectTaskSuccessor,
		Emulator,
		TempEnvironment,
		UserImportedContent,
		UserImportedEnvironment,
		UserImportedImage,
		UserImportedSoftware,

		// -- LEGACY MODELS --:
		// Audio Device
		// AudioDevice,
		// AudioDeviceHasDriverSoftware,
		// AudioDeviceHasEquivalent,

		// // Base
		// ChipSet,
		// ColorDepth,
		// Developer,
		// EventType,
		// FrequencyUnit,
		// Language,
		// MediaType,

		// // Computing
		// ComputingEnvironment,
		// CpuArchitecture,

		// // Configured
		// ConfiguredAudioDevice,
		// ConfiguredDisk,
		// ConfiguredDiskHasPartition,
		// ConfiguredGpuDevice,
		// ConfiguredGpuDeviceHasDisplayDevice,
		// ConfiguredKeyboardDevice,
		// ConfiguredMachine,
		// ConfiguredNetwork,
		// ConfiguredNetworkDevice,
		// ConfiguredNetworkHasConfiguredMachine,
		// ConfiguredNetworkMachineExpectedNetworkService,
		// ConfiguredNetworkHasConfiguredMachine,
		// ConfiguredOS,
		// ConfiguredOSHasUserInformation,
		// ConfiguredOSLanguage,
		// ConfiguredPointerDevice,
		// ConfiguredSoftware,
		// ConfiguredSoftwareUsesFormatImplementation,
		// ConfiguredStorageDevice,

		// // Content
		// ContentEnvironment,
		// ContentObject,
		// ContentObjectHasObjectFile,

		// // Display
		// DisplayDevice,
		// DisplayDeviceHasColorDepth,
		// DisplayDeviceHasDisplayInterface,
		// DisplayDeviceHasDisplayResolution,
		// DisplayDeviceHasDriverSoftware,
		// DisplayInterface,
		// DisplayResolution,

		// // File
		// File,
		// FileExtension,
		// FileFormat,
		// FileFormatHasFileExtension,
		// FileFormatHasMimeType,
		// FileOperation,
		// FileOperationHasFileExtension,
		// FileOperationNearestFileFormat,
		// FileSystem,
		// FormatImplementation,
		// FormatOperation,
		// MimeType,
		// ObjectFileOperation,
		// OperationType,
		// ReadWriteStatus,

		// // Geo
		// Country,
		// Region,

		// // GPU
		// GpuDevice,
		// GpuDeviceHasDisplayInterface,
		// GpuDeviceHasDriverSoftware,
		// GpuDeviceHasEquivalent,
		// GpuDeviceHasMachineInterface,

		// // Keyboard
		// KeyboardDevice,
		// KeyboardDeviceHasDriverSoftware,
		// KeyboardDeviceHasLanguage,
		// KeyboardDeviceHasMachineInterface,
		// KeyboardLayout,

		// // Machine
		// MachineInterface,
		// MachineRecommendation,
		// MachineType,

		// // Network
		// NetworkDevice,
		// NetworkDeviceHasDriverSoftware,
		// NetworkDeviceHasMachineInterface,
		// NetworkEnvironment,
		// NetworkService,

		// // OS
		// OsVersion,
		// OsVersionColorDepthSettings,
		// OsVersionDisplayResolutionSettings,
		// OsVersionHasAlternateID,
		// OsVersionHasProgrammingLanguage,
		// OsVersionHasSoftwareLicense,
		// OsVersionHasTimeZoneSettings,
		// OsVersionIncludesSoftwareVersion,
		// OsVersionIsCompatibleWithConfiguredMachine,
		// OsVersionKeyboardLanguageSettings,
		// OsVersionKeyboardLayoutSettings,
		// OsVersionLanguageSettings,
		// OsVersionRegionSettings,

		// // Pointer
		// PointerDevice,
		// PointerDeviceHasDriverSoftware,
		// PointerDeviceHasMachineInterface,
		// PointerDeviceType,

		// // Processor
		// ProcessorDevice,
		// ProcessorDeviceHasDriverSoftware,
		// ProcessorDeviceHasMachineInterface,

		// // Software
		// SoftwareEnvironment,
		// SoftwareEnvironmentHasDiskImage,
		// SoftwareEnvironmentHasPartConfiguredSoftware,
		// SoftwareFamilyVersionHasSoftwareProduct,
		// SoftwareFamilyVersionHasSoftwareVersion,
		// SoftwareLicense,
		// SoftwareObject,
		// SoftwareObjectHasAlternateID,
		// SoftwareObjectHasObjectFile,
		// SoftwareObjectIsManifestationOfSoftwareVersion,
		// SoftwareProduct,
		// SoftwareProductHasAlternateName,
		// SoftwareProductHasSoftwareType,
		// SoftwareProductHasAlternateName,
		// SoftwareProductHasSoftwareType,
		// SoftwareType,
		// SoftwareVersion,
		// SoftwareVersionHasAlternateID,
		// SoftwareVersionHasAlternateName,
		// SoftwareVersionHasDeveloper,
		// SoftwareVersionHasFileOperation,
		// SoftwareVersionHasFormatImplementation,
		// SoftwareVersionHasLanguageSettings,
		// SoftwareVersionHasProgrammingLanguage,
		// SoftwareVersionHasSoftwareLicense,
		// SoftwareVersionHasSystemRequirements,
		// SoftwareVersionIsCompatibleWithComputingEnvironment,

		// // Storage
		// StorageDevice,
		// StorageDeviceHasDriverSoftware,
		// StorageDeviceHasMachineInterface,
		// StorageDeviceType,

		// // System
		// SystemRequirements,
		// SystemRequirementsRequiresAudioDevice,
		// SystemRequirementsRequiresGpuDevice,
		// SystemRequirementsRequiresKeyboardDevice,
		// SystemRequirementsRequiresNetworkDevice,
		// SystemRequirementsRequiresOsVersion,
		// SystemRequirementsRequiresPointerDeviceType,
		// SystemRequirementsRequiresProcessor,
		// SystemRequirementsRequiresSoftwareVersion,
		// SystemRequirementsRequiresSoftwareVersion,
		// SystemRequirementsRequiresStorageDeviceType,

		// // Timezone
		// Timezone,
		// TimezoneLabel
	]
});

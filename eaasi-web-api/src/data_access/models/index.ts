const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

import Bookmark from '@/data_access/models/app/Bookmark';
import EaasiRole from '@/data_access/models/app/EaasiRole';
import EaasiUser from '@/data_access/models/app/EaasiUser';
import Emulator from '@/data_access/models/app/Emulator';
import AudioDevice from '@/data_access/models/audio-device/AudioDevice';
import AudioDeviceHasDriverSoftware from '@/data_access/models/audio-device/AudioDeviceHasDriverSoftware';
import AudioDeviceHasEquivalent from '@/data_access/models/audio-device/AudioDeviceHasEquivalent';
import AudioDeviceHasMachineInterface from '@/data_access/models/audio-device/AudioDeviceHasMachineInterface';
import ChipSet from '@/data_access/models/base/ChipSet';
import ColorDepth from '@/data_access/models/base/ColorDepth';
import Developer from '@/data_access/models/base/Developer';
import EventType from '@/data_access/models/base/EventType';
import FrequencyUnit from '@/data_access/models/base/FrequencyUnit';
import Language from '@/data_access/models/base/Language';
import MediaType from '@/data_access/models/base/MediaType';
import ProgrammingLanguage from '@/data_access/models/base/ProgrammingLanguage';
import RecommendationLevel from '@/data_access/models/base/RecommendationLevel';
import UnitOfInformation from '@/data_access/models/base/UnitOfInformation';
import UserInformation from '@/data_access/models/base/UserInformation';
import ComputingEnvironment from '@/data_access/models/computing/ComputingEnvironment';
import CpuArchitecture from '@/data_access/models/computing/CpuArchitecture';
import ConfiguredAudioDevice from '@/data_access/models/configured/ConfiguredAudioDevice';
import ConfiguredDisk from '@/data_access/models/configured/ConfiguredDisk';
import ConfiguredDiskHasPartition from '@/data_access/models/configured/ConfiguredDiskHasPartition';
import ConfiguredGpuDevice from '@/data_access/models/configured/ConfiguredGpuDevice';
import ConfiguredGpuDeviceHasDisplayDevice from '@/data_access/models/configured/ConfiguredGpuDeviceHasDisplayDevice';
import ConfiguredKeyboardDevice from '@/data_access/models/configured/ConfiguredKeyboardDevice';
import ConfiguredMachine from '@/data_access/models/configured/ConfiguredMachine';
import ConfiguredNetwork from '@/data_access/models/configured/ConfiguredNetwork';
import ConfiguredNetworkDevice from '@/data_access/models/configured/ConfiguredNetworkDevice';
import ConfiguredNetworkEmulatesNetworkService
	from '@/data_access/models/configured/ConfiguredNetworkEmulatesNetworkService';
import ConfiguredNetworkHasConfiguredMachine
	from '@/data_access/models/configured/ConfiguredNetworkHasConfiguredMachine';
import ConfiguredNetworkMachineExpectedNetworkService
	from '@/data_access/models/configured/ConfiguredNetworkMachineExpectedNetworkService';
import ConfiguredOS from '@/data_access/models/configured/ConfiguredOS';
import ConfiguredOSHasUserInformation from '@/data_access/models/configured/ConfiguredOSHasUserInformation';
import ConfiguredOSLanguage from '@/data_access/models/configured/ConfiguredOSLanguage';
import ConfiguredPointerDevice from '@/data_access/models/configured/ConfiguredPointerDevice';
import ConfiguredSoftware from '@/data_access/models/configured/ConfiguredSoftware';
import ConfiguredSoftwareHasUserInformation from '@/data_access/models/configured/ConfiguredSoftwareHasUserInformation';
import ConfiguredSoftwareUsesFormatImplementation
	from '@/data_access/models/configured/ConfiguredSoftwareUsesFormatImplementation';
import ConfiguredStorageDevice from '@/data_access/models/configured/ConfiguredStorageDevice';
import ContentEnvironment from '@/data_access/models/content/ContentEnvironment';
import ContentObject from '@/data_access/models/content/ContentObject';
import ContentObjectHasObjectFile from '@/data_access/models/content/ContentObjectHasObjectFile';
import DisplayDevice from '@/data_access/models/display/DisplayDevice';
import DisplayDeviceHasColorDepth from '@/data_access/models/display/DisplayDeviceHasColorDepth';
import DisplayDeviceHasDisplayInterface from '@/data_access/models/display/DisplayDeviceHasDisplayInterface';
import DisplayDeviceHasDisplayResolution from '@/data_access/models/display/DisplayDeviceHasDisplayResolution';
import DisplayDeviceHasDriverSoftware from '@/data_access/models/display/DisplayDeviceHasDriverSoftware';
import DisplayInterface from '@/data_access/models/display/DisplayInterface';
import DisplayResolution from '@/data_access/models/display/DisplayResolution';
import File from '@/data_access/models/file/File';
import FileExtension from '@/data_access/models/file/FileExtension';
import FileFormat from '@/data_access/models/file/FileFormat';
import FileFormatHasFileExtension from '@/data_access/models/file/FileFormatHasFileExtension';
import FileFormatHasMimeType from '@/data_access/models/file/FileFormatHasMimeType';
import FileOperation from '@/data_access/models/file/FileOperation';
import FileOperationHasFileExtension from '@/data_access/models/file/FileOperationHasFileExtension';
import FileOperationNearestFileFormat from '@/data_access/models/file/FileOperationNearestFileFormat';
import FileSystem from '@/data_access/models/file/FileSystem';
import FormatImplementation from '@/data_access/models/file/FormatImplementation';
import FormatOperation from '@/data_access/models/file/FormatOperation';
import MimeType from '@/data_access/models/file/MimeType';
import ObjectFileOperation from '@/data_access/models/file/ObjectFileOperation';
import OperationType from '@/data_access/models/file/OperationType';
import ReadWriteStatus from '@/data_access/models/file/ReadWriteStatus';
import Country from '@/data_access/models/geo/Country';
import Region from '@/data_access/models/geo/Region';
import GpuDevice from '@/data_access/models/gpu/GpuDevice';
import GpuDeviceHasDisplayInterface from '@/data_access/models/gpu/GpuDeviceHasDisplayInterface';
import GpuDeviceHasDriverSoftware from '@/data_access/models/gpu/GpuDeviceHasDriverSoftware';
import GpuDeviceHasEquivalent from '@/data_access/models/gpu/GpuDeviceHasEquivalent';
import GpuDeviceHasMachineInterface from '@/data_access/models/gpu/GpuDeviceHasMachineInterface';
import KeyboardDevice from '@/data_access/models/keyboard/KeyboardDevice';
import KeyboardDeviceHasDriverSoftware from '@/data_access/models/keyboard/KeyboardDeviceHasDriverSoftware';
import KeyboardDeviceHasLanguage from '@/data_access/models/keyboard/KeyboardDeviceHasLanguage';
import KeyboardDeviceHasMachineInterface from '@/data_access/models/keyboard/KeyboardDeviceHasMachineInterface';
import KeyboardLayout from '@/data_access/models/keyboard/KeyboardLayout';
import MachineInterface from '@/data_access/models/machine/MachineInterface';
import MachineRecommendation from '@/data_access/models/machine/MachineRecommendation';
import MachineType from '@/data_access/models/machine/MachineType';
import NetworkDevice from '@/data_access/models/network/NetworkDevice';
import NetworkDeviceHasDriverSoftware from '@/data_access/models/network/NetworkDeviceHasDriverSoftware';
import NetworkDeviceHasMachineInterface from '@/data_access/models/network/NetworkDeviceHasMachineInterface';
import NetworkEnvironment from '@/data_access/models/network/NetworkEnvironment';
import NetworkService from '@/data_access/models/network/NetworkService';
import OsVersion from '@/data_access/models/os/OsVersion';
import OsVersionColorDepthSettings from '@/data_access/models/os/OsVersionColorDepthSettings';
import OsVersionDisplayResolutionSettings from '@/data_access/models/os/OsVersionDisplayResolutionSettings';
import OsVersionHasAlternateID from '@/data_access/models/os/OsVersionHasAlternateID';
import OsVersionHasProgrammingLanguage from '@/data_access/models/os/OsVersionHasProgrammingLanguage';
import OsVersionHasSoftwareLicense from '@/data_access/models/os/OsVersionHasSoftwareLicense';
import OsVersionHasTimeZoneSettings from '@/data_access/models/os/OsVersionHasTimeZoneSettings';
import OsVersionIncludesSoftwareVersion from '@/data_access/models/os/OsVersionIncludesSoftwareVersion';
import OsVersionIsCompatibleWithConfiguredMachine
	from '@/data_access/models/os/OsVersionIsCompatibleWithConfiguredMachine';
import OsVersionKeyboardLanguageSettings from '@/data_access/models/os/OsVersionKeyboardLanguageSettings';
import OsVersionLanguageSettings from '@/data_access/models/os/OsVersionLanguageSettings';
import OsVersionRegionSettings from '@/data_access/models/os/OsVersionRegionSettings';
import PointerDevice from '@/data_access/models/pointer/PointerDevice';
import PointerDeviceHasDriverSoftware from '@/data_access/models/pointer/PointerDeviceHasDriverSoftware';
import PointerDeviceHasMachineInterface from '@/data_access/models/pointer/PointerDeviceHasMachineInterface';
import PointerDeviceType from '@/data_access/models/pointer/PointerDeviceType';
import ProcessorDevice from '@/data_access/models/processor/ProcessorDevice';
import ProcessorDeviceHasDriverSoftware from '@/data_access/models/processor/ProcessorDeviceHasDriverSoftware';
import ProcessorDeviceHasMachineInterface from '@/data_access/models/processor/ProcessorDeviceHasMachineInterface';
import SoftwareEnvironment from '@/data_access/models/software/SoftwareEnvironment';
import SoftwareEnvironmentHasDiskImage from '@/data_access/models/software/SoftwareEnvironmentHasDiskImage';
import SoftwareEnvironmentHasPartConfiguredSoftware
	from '@/data_access/models/software/SoftwareEnvironmentHasPartConfiguredSoftware';
import SoftwareFamilyVersionHasSoftwareProduct
	from '@/data_access/models/software/SoftwareFamilyVersionHasSoftwareProduct';
import SoftwareFamilyVersionHasSoftwareVersion
	from '@/data_access/models/software/SoftwareFamilyVersionHasSoftwareVersion';
import SoftwareLicense from '@/data_access/models/software/SoftwareLicense';
import SoftwareObject from '@/data_access/models/software/SoftwareObject';
import SoftwareObjectHasAlternateID from '@/data_access/models/software/SoftwareObjectHasAlternateID';
import SoftwareObjectHasObjectFile from '@/data_access/models/software/SoftwareObjectHasObjectFile';
import SoftwareObjectIsManifestationOfSoftwareVersion
	from '@/data_access/models/software/SoftwareObjectIsManifestationOfSoftwareVersion';
import SoftwareProduct from '@/data_access/models/software/SoftwareProduct';
import SoftwareProductHasAlternateName from '@/data_access/models/software/SoftwareProductHasAlternateName';
import SoftwareProductHasSoftwareType from '@/data_access/models/software/SoftwareProductHasSoftwareType';
import SoftwareType from '@/data_access/models/software/SoftwareType';
import SoftwareVersion from '@/data_access/models/software/softwareVersion';
import SoftwareVersionHasAlternateID from '@/data_access/models/software/SoftwareVersionHasAlternateID';
import SoftwareVersionHasAlternateName from '@/data_access/models/software/SoftwareVersionHasAlternateName';
import SoftwareVersionHasDeveloper from '@/data_access/models/software/SoftwareVersionHasDeveloper';
import SoftwareVersionHasFileOperation from '@/data_access/models/software/SoftwareVersionHasFileOperation';
import SoftwareVersionHasFormatImplementation
	from '@/data_access/models/software/SoftwareVersionHasFormatImplementation';
import SoftwareVersionHasLanguageSettings from '@/data_access/models/software/SoftwareVersionHasLanguageSettings';
import SoftwareVersionHasProgrammingLanguage from '@/data_access/models/software/SoftwareVersionHasProgrammingLanguage';
import SoftwareVersionHasSoftwareLicense from '@/data_access/models/software/SoftwareVersionHasSoftwareLicense';
import SoftwareVersionHasSystemRequirements from '@/data_access/models/software/SoftwareVersionHasSystemRequirements';
import SoftwareVersionIncludesSoftwareVersion
	from '@/data_access/models/software/SoftwareVersionIncludesSoftwareVersion';
import SoftwareVersionIsCompatibleWithComputingEnvironment
	from '@/data_access/models/software/SoftwareVersionIsCompatibleWithComputingEnvironment';
import StorageDevice from '@/data_access/models/storage/StorageDevice';
import StorageDeviceHasDriverSoftware from '@/data_access/models/storage/StorageDeviceHasDriverSoftware';
import StorageDeviceHasMachineInterface from '@/data_access/models/storage/StorageDeviceHasMachineInterface';
import StorageDeviceType from '@/data_access/models/storage/StorageDeviceType';
import SystemRequirements from '@/data_access/models/system/SystemRequirements';
import SystemRequirementsRequiresAudioDevice from '@/data_access/models/system/SystemRequirementsRequiresAudioDevice';
import SystemRequirementsRequiresGpuDevice from '@/data_access/models/system/SystemRequirementsRequiresGpuDevice';
import SystemRequirementsRequiresKeyboardDevice
	from '@/data_access/models/system/SystemRequirementsRequiresKeyboardDevice';
import SystemRequirementsRequiresNetworkDevice
	from '@/data_access/models/system/SystemRequirementsRequiresNetworkDevice';
import SystemRequirementsRequiresOsVersion from '@/data_access/models/system/SystemRequirementsRequiresOsVersion';
import SystemRequirementsRequiresPointerDeviceType
	from '@/data_access/models/system/SystemRequirementsRequiresPointerDeviceType';
import SystemRequirementsRequiresProcessor from '@/data_access/models/system/SystemRequirementsRequiresProcessor';
import SystemRequirementsRequiresSoftwareVersion
	from '@/data_access/models/system/SystemRequirementsRequiresSoftwareVersion';
import SystemRequirementsRequiresStorageDeviceType
	from '@/data_access/models/system/SystemRequirementsRequiresStorageDeviceType';
import Timezone from '@/data_access/models/timezone/Timezone';
import TimezoneLabel from '@/data_access/models/timezone/TimezoneLabel';
import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
	database: config.database,
	username: config.username,
	password: config.password,
	dialect: config.dialect,
	models: [
		AudioDevice,
		AudioDeviceHasDriverSoftware,
		AudioDeviceHasEquivalent,
		AudioDeviceHasMachineInterface,
		Bookmark,
		ChipSet,
		ColorDepth,
		ComputingEnvironment,
		ConfiguredAudioDevice,
		ConfiguredDisk,
		ConfiguredDiskHasPartition,
		ConfiguredGpuDevice,
		ConfiguredGpuDeviceHasDisplayDevice,
		ConfiguredKeyboardDevice,
		ConfiguredMachine,
		ConfiguredNetwork,
		ConfiguredNetworkDevice,
		ConfiguredNetworkEmulatesNetworkService,
		ConfiguredNetworkHasConfiguredMachine,
		ConfiguredNetworkMachineExpectedNetworkService,
		ConfiguredOS,
		ConfiguredOSHasUserInformation,
		ConfiguredOSLanguage,
		ConfiguredPointerDevice,
		ConfiguredSoftware,
		ConfiguredSoftwareHasUserInformation,
		ConfiguredSoftwareUsesFormatImplementation,
		ConfiguredStorageDevice,
		ContentEnvironment,
		ContentObject,
		ContentObjectHasObjectFile,
		Country,
		CpuArchitecture,
		Developer,
		DisplayDevice,
		DisplayDeviceHasColorDepth,
		DisplayDeviceHasDisplayInterface,
		DisplayDeviceHasDisplayResolution,
		DisplayDeviceHasDriverSoftware,
		DisplayInterface,
		DisplayResolution,
		EaasiRole,
		EaasiUser,
		Emulator,
		EventType,
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
		FrequencyUnit,
		GpuDevice,
		GpuDeviceHasDisplayInterface,
		GpuDeviceHasDriverSoftware,
		GpuDeviceHasEquivalent,
		GpuDeviceHasMachineInterface,
		KeyboardDevice,
		KeyboardDeviceHasDriverSoftware,
		KeyboardDeviceHasMachineInterface,
		KeyboardDeviceHasLanguage,
		KeyboardLayout,
		Language,
		MachineInterface,
		MachineRecommendation,
		MachineType,
		MediaType,
		MimeType,
		NetworkDevice,
		NetworkDeviceHasDriverSoftware,
		NetworkDeviceHasMachineInterface,
		NetworkEnvironment,
		NetworkService,
		ObjectFileOperation,
		OperationType,
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
		OsVersionLanguageSettings,
		OsVersionRegionSettings,
		PointerDevice,
		PointerDeviceHasDriverSoftware,
		PointerDeviceHasMachineInterface,
		PointerDeviceType,
		ProcessorDevice,
		ProcessorDeviceHasDriverSoftware,
		ProcessorDeviceHasMachineInterface,
		ProgrammingLanguage,
		ReadWriteStatus,
		RecommendationLevel,
		Region,
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
		SoftwareVersionIncludesSoftwareVersion,
		SoftwareVersionIsCompatibleWithComputingEnvironment,
		SoftwareVersionHasLanguageSettings,
		StorageDevice,
		StorageDeviceHasDriverSoftware,
		StorageDeviceHasMachineInterface,
		StorageDeviceType,
		SystemRequirements,
		SystemRequirementsRequiresAudioDevice,
		SystemRequirementsRequiresGpuDevice,
		SystemRequirementsRequiresKeyboardDevice,
		SystemRequirementsRequiresNetworkDevice,
		SystemRequirementsRequiresOsVersion,
		SystemRequirementsRequiresPointerDeviceType,
		SystemRequirementsRequiresProcessor,
		SystemRequirementsRequiresSoftwareVersion,
		SystemRequirementsRequiresStorageDeviceType,
		Timezone,
		TimezoneLabel,
		UnitOfInformation,
		UserInformation,
	]
});

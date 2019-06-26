// tslint:disable
import * as path from 'path';
import * as sequelize from 'sequelize';
import * as def from './db';

export interface ITables {
  computingEnvironment_has_event:def.computingEnvironment_has_eventModel;
  audioDevice_has_driverSoftware:def.audioDevice_has_driverSoftwareModel;
  audioDevice_has_machineInterface:def.audioDevice_has_machineInterfaceModel;
  configuredAudioDevice:def.configuredAudioDeviceModel;
  colorDepth:def.colorDepthModel;
  configuredKeyboardDevice:def.configuredKeyboardDeviceModel;
  configuredGpuDevice_has_displayDevice:def.configuredGpuDevice_has_displayDeviceModel;
  configuredGpuDevice:def.configuredGpuDeviceModel;
  configuredMachine:def.configuredMachineModel;
  configuredMachine_has_event:def.configuredMachine_has_eventModel;
  configuredNetwork_has_configuredMachine:def.configuredNetwork_has_configuredMachineModel;
  configuredNetworkDevice:def.configuredNetworkDeviceModel;
  configuredNetworkMachine_expectedNetworkService:def.configuredNetworkMachine_expectedNetworkServiceModel;
  configuredNetwork_hasEvent:def.configuredNetwork_hasEventModel;
  configuredNetwork:def.configuredNetworkModel;
  configuredNetwork_emulatesNetworkService:def.configuredNetwork_emulatesNetworkServiceModel;
  configuredOS_has_formatOperation:def.configuredOS_has_formatOperationModel;
  configuredOS:def.configuredOSModel;
  configuredOS_has_event:def.configuredOS_has_eventModel;
  configuredNetworkMachine_providesNetworkService:def.configuredNetworkMachine_providesNetworkServiceModel;
  configuredPointerDevice:def.configuredPointerDeviceModel;
  configuredOS_has_userInformation:def.configuredOS_has_userInformationModel;
  configuredSoftware:def.configuredSoftwareModel;
  configuredOS_language:def.configuredOS_languageModel;
  alternateName:def.alternateNameModel;
  computingEnvironment:def.computingEnvironmentModel;
  audioDevice:def.audioDeviceModel;
  audioDevice_hasEquivalent:def.audioDevice_hasEquivalentModel;
  configuredStorageDevice:def.configuredStorageDeviceModel;
  cpuArchitecture:def.cpuArchitectureModel;
  configuredSoftware_uses_formatImplementation:def.configuredSoftware_uses_formatImplementationModel;
  configuredSoftware_has_event:def.configuredSoftware_has_eventModel;
  configuredSoftware_has_userInformation:def.configuredSoftware_has_userInformationModel;
  digitalObject_has_objectFile:def.digitalObject_has_objectFileModel;
  digitalObject_has_event:def.digitalObject_has_eventModel;
  digitalObject_isCompatibleWith_computingEnvironment:def.digitalObject_isCompatibleWith_computingEnvironmentModel;
  displayDevice:def.displayDeviceModel;
  developer:def.developerModel;
  digitalObjectFile_has_objectFileOperation:def.digitalObjectFile_has_objectFileOperationModel;
  digitalObject:def.digitalObjectModel;
  displayDevice_has_displayInterface:def.displayDevice_has_displayInterfaceModel;
  digitalObject_has_alternativeID:def.digitalObject_has_alternativeIDModel;
  displayDevice_has_displayResolution:def.displayDevice_has_displayResolutionModel;
  displayResolution:def.displayResolutionModel;
  fileFormat:def.fileFormatModel;
  displayDevice_has_driverSoftware:def.displayDevice_has_driverSoftwareModel;
  fileExtension:def.fileExtensionModel;
  fileSystem:def.fileSystemModel;
  formatImplementation:def.formatImplementationModel;
  gpuDevice_hasEquivalent:def.gpuDevice_hasEquivalentModel;
  gpuDevice_has_displayInterface:def.gpuDevice_has_displayInterfaceModel;
  file:def.fileModel;
  displayDevice_has_colorDepth:def.displayDevice_has_colorDepthModel;
  gpuDevice_has_driverSoftware:def.gpuDevice_has_driverSoftwareModel;
  gpuDevice_has_machineInterface:def.gpuDevice_has_machineInterfaceModel;
  formatOperation:def.formatOperationModel;
  fileFormat_has_fileExtension:def.fileFormat_has_fileExtensionModel;
  gpuDevice:def.gpuDeviceModel;
  keyboardDevice_has_language:def.keyboardDevice_has_languageModel;
  keyboardDevice_has_driverSoftware:def.keyboardDevice_has_driverSoftwareModel;
  keyboardDevice_has_machineInterfaceID:def.keyboardDevice_has_machineInterfaceIDModel;
  keyboardDevice:def.keyboardDeviceModel;
  machineType:def.machineTypeModel;
  mountFormat:def.mountFormatModel;
  networkService:def.networkServiceModel;
  networkDevice_has_driverSoftware:def.networkDevice_has_driverSoftwareModel;
  objectEnvironment:def.objectEnvironmentModel;
  keyboardLayout:def.keyboardLayoutModel;
  networkDevice_has_machineInterface:def.networkDevice_has_machineInterfaceModel;
  networkDevice:def.networkDeviceModel;
  osVersion_languageSettings:def.osVersion_languageSettingsModel;
  osVersion_displayResolutionSettings:def.osVersion_displayResolutionSettingsModel;
  objectEnvironment_has_event:def.objectEnvironment_has_eventModel;
  osVersion:def.osVersionModel;
  osVersion_has_developer:def.osVersion_has_developerModel;
  osVersion_includes_softwareVersion:def.osVersion_includes_softwareVersionModel;
  osVersion_has_programmingLanguage:def.osVersion_has_programmingLanguageModel;
  programmingLanguage:def.programmingLanguageModel;
  osVersion_keyboardLayoutSettings:def.osVersion_keyboardLayoutSettingsModel;
  osVersion_isCompatibleWith_configuredMachine:def.osVersion_isCompatibleWith_configuredMachineModel;
  osVersion_keyboardLanguageSettings:def.osVersion_keyboardLanguageSettingsModel;
  osVersion_regionSettings:def.osVersion_regionSettingsModel;
  osVersion_keyboardSetting:def.osVersion_keyboardSettingModel;
  readWriteStatus:def.readWriteStatusModel;
  osVersion_has_alternateID:def.osVersion_has_alternateIDModel;
  osVersion_timeZoneSettings:def.osVersion_timeZoneSettingsModel;
  osVersion_colorDepthSettings:def.osVersion_colorDepthSettingsModel;
  pointerDeviceType:def.pointerDeviceTypeModel;
  objectFileOperation:def.objectFileOperationModel;
  pointerDevice_has_driverSoftware:def.pointerDevice_has_driverSoftwareModel;
  pointerDevice_has_machineInterface:def.pointerDevice_has_machineInterfaceModel;
  osVersion_has_softwareLicense:def.osVersion_has_softwareLicenseModel;
  pointerDevice:def.pointerDeviceModel;
  softwareEnvironment_has_event:def.softwareEnvironment_has_eventModel;
  softwareProduct:def.softwareProductModel;
  softwareObject_isManifestationOf_osVersion:def.softwareObject_isManifestationOf_osVersionModel;
  softwareFamily_hasPart_softwareProduct:def.softwareFamily_hasPart_softwareProductModel;
  softwareObject_has_event:def.softwareObject_has_eventModel;
  softwareObject_has_alternateID:def.softwareObject_has_alternateIDModel;
  softwareObject:def.softwareObjectModel;
  region:def.regionModel;
  softwareVersion_has_alternateID:def.softwareVersion_has_alternateIDModel;
  softwareObject_has_objectFile:def.softwareObject_has_objectFileModel;
  softwareProduct_has_softwareType:def.softwareProduct_has_softwareTypeModel;
  softwareEnvironment_has_diskImage:def.softwareEnvironment_has_diskImageModel;
  softwareObject_isManifestationOf_softwareVersion:def.softwareObject_isManifestationOf_softwareVersionModel;
  softwareVersion_has_developer:def.softwareVersion_has_developerModel;
  softwareObjectFile_has_objectFileOperation:def.softwareObjectFile_has_objectFileOperationModel;
  softwareType:def.softwareTypeModel;
  softwareFamilyVersion_hasPart_softwareVersion:def.softwareFamilyVersion_hasPart_softwareVersionModel;
  softwareVersion_has_formatImplementation:def.softwareVersion_has_formatImplementationModel;
  softwareLicense:def.softwareLicenseModel;
  softwareVersion_has_programmingLanguage:def.softwareVersion_has_programmingLanguageModel;
  softwareEnvironment:def.softwareEnvironmentModel;
  softwareVersion_has_softwareLicense:def.softwareVersion_has_softwareLicenseModel;
  softwareProduct_has_alternateName:def.softwareProduct_has_alternateNameModel;
  softwareVersion_languageSettings:def.softwareVersion_languageSettingsModel;
  softwareVersion:def.softwareVersionModel;
  storageDevice_has_driverSoftware:def.storageDevice_has_driverSoftwareModel;
  systemRequirements_includes_osVersion:def.systemRequirements_includes_osVersionModel;
  timezone:def.timezoneModel;
  systemRequirements_includes_storageDeviceType:def.systemRequirements_includes_storageDeviceTypeModel;
  storageDevice_has_machineInterface:def.storageDevice_has_machineInterfaceModel;
  systemRequirements_includes_pointerDeviceType:def.systemRequirements_includes_pointerDeviceTypeModel;
  systemRequirements_includes_softwareVersion:def.systemRequirements_includes_softwareVersionModel;
  systemRequirements_includes_cpuArchitecture:def.systemRequirements_includes_cpuArchitectureModel;
  systemRequirements_includes_gpuDevice:def.systemRequirements_includes_gpuDeviceModel;
  systemRequirements_includes_machineType:def.systemRequirements_includes_machineTypeModel;
  userInformation:def.userInformationModel;
  systemRequirements:def.systemRequirementsModel;
  systemRequirements_includes_audioDevice:def.systemRequirements_includes_audioDeviceModel;
  timezone_has_timezoneName:def.timezone_has_timezoneNameModel;
  timezoneName:def.timezoneNameModel;
  softwareVersion_isCompatibleWith_computingEnvironment:def.softwareVersion_isCompatibleWith_computingEnvironmentModel;
  storageDeviceType:def.storageDeviceTypeModel;
  formatImplementation_includes_fileFormat:def.formatImplementation_includes_fileFormatModel;
  storageDevice:def.storageDeviceModel;
  softwareEnvironment_hasPart_configuredSoftware:def.softwareEnvironment_hasPart_configuredSoftwareModel;
}

export const getModels = function(seq:sequelize.Sequelize):ITables {
  const tables:ITables = {
    computingEnvironment_has_event: seq.import(path.join(__dirname, './computingEnvironment_has_event')),
    audioDevice_has_driverSoftware: seq.import(path.join(__dirname, './audioDevice_has_driverSoftware')),
    audioDevice_has_machineInterface: seq.import(path.join(__dirname, './audioDevice_has_machineInterface')),
    configuredAudioDevice: seq.import(path.join(__dirname, './configuredAudioDevice')),
    colorDepth: seq.import(path.join(__dirname, './colorDepth')),
    configuredKeyboardDevice: seq.import(path.join(__dirname, './configuredKeyboardDevice')),
    configuredGpuDevice_has_displayDevice: seq.import(path.join(__dirname, './configuredGpuDevice_has_displayDevice')),
    configuredGpuDevice: seq.import(path.join(__dirname, './configuredGpuDevice')),
    configuredMachine: seq.import(path.join(__dirname, './configuredMachine')),
    configuredMachine_has_event: seq.import(path.join(__dirname, './configuredMachine_has_event')),
    configuredNetwork_has_configuredMachine: seq.import(path.join(__dirname, './configuredNetwork_has_configuredMachine')),
    configuredNetworkDevice: seq.import(path.join(__dirname, './configuredNetworkDevice')),
    configuredNetworkMachine_expectedNetworkService: seq.import(path.join(__dirname, './configuredNetworkMachine_expectedNetworkService')),
    configuredNetwork_hasEvent: seq.import(path.join(__dirname, './configuredNetwork_hasEvent')),
    configuredNetwork: seq.import(path.join(__dirname, './configuredNetwork')),
    configuredNetwork_emulatesNetworkService: seq.import(path.join(__dirname, './configuredNetwork_emulatesNetworkService')),
    configuredOS_has_formatOperation: seq.import(path.join(__dirname, './configuredOS_has_formatOperation')),
    configuredOS: seq.import(path.join(__dirname, './configuredOS')),
    configuredOS_has_event: seq.import(path.join(__dirname, './configuredOS_has_event')),
    configuredNetworkMachine_providesNetworkService: seq.import(path.join(__dirname, './configuredNetworkMachine_providesNetworkService')),
    configuredPointerDevice: seq.import(path.join(__dirname, './configuredPointerDevice')),
    configuredOS_has_userInformation: seq.import(path.join(__dirname, './configuredOS_has_userInformation')),
    configuredSoftware: seq.import(path.join(__dirname, './configuredSoftware')),
    configuredOS_language: seq.import(path.join(__dirname, './configuredOS_language')),
    alternateName: seq.import(path.join(__dirname, './alternateName')),
    computingEnvironment: seq.import(path.join(__dirname, './computingEnvironment')),
    audioDevice: seq.import(path.join(__dirname, './audioDevice')),
    audioDevice_hasEquivalent: seq.import(path.join(__dirname, './audioDevice_hasEquivalent')),
    configuredStorageDevice: seq.import(path.join(__dirname, './configuredStorageDevice')),
    cpuArchitecture: seq.import(path.join(__dirname, './cpuArchitecture')),
    configuredSoftware_uses_formatImplementation: seq.import(path.join(__dirname, './configuredSoftware_uses_formatImplementation')),
    configuredSoftware_has_event: seq.import(path.join(__dirname, './configuredSoftware_has_event')),
    configuredSoftware_has_userInformation: seq.import(path.join(__dirname, './configuredSoftware_has_userInformation')),
    digitalObject_has_objectFile: seq.import(path.join(__dirname, './digitalObject_has_objectFile')),
    digitalObject_has_event: seq.import(path.join(__dirname, './digitalObject_has_event')),
    digitalObject_isCompatibleWith_computingEnvironment: seq.import(path.join(__dirname, './digitalObject_isCompatibleWith_computingEnvironment')),
    displayDevice: seq.import(path.join(__dirname, './displayDevice')),
    developer: seq.import(path.join(__dirname, './developer')),
    digitalObjectFile_has_objectFileOperation: seq.import(path.join(__dirname, './digitalObjectFile_has_objectFileOperation')),
    digitalObject: seq.import(path.join(__dirname, './digitalObject')),
    displayDevice_has_displayInterface: seq.import(path.join(__dirname, './displayDevice_has_displayInterface')),
    digitalObject_has_alternativeID: seq.import(path.join(__dirname, './digitalObject_has_alternativeID')),
    displayDevice_has_displayResolution: seq.import(path.join(__dirname, './displayDevice_has_displayResolution')),
    displayResolution: seq.import(path.join(__dirname, './displayResolution')),
    fileFormat: seq.import(path.join(__dirname, './fileFormat')),
    displayDevice_has_driverSoftware: seq.import(path.join(__dirname, './displayDevice_has_driverSoftware')),
    fileExtension: seq.import(path.join(__dirname, './fileExtension')),
    fileSystem: seq.import(path.join(__dirname, './fileSystem')),
    formatImplementation: seq.import(path.join(__dirname, './formatImplementation')),
    gpuDevice_hasEquivalent: seq.import(path.join(__dirname, './gpuDevice_hasEquivalent')),
    gpuDevice_has_displayInterface: seq.import(path.join(__dirname, './gpuDevice_has_displayInterface')),
    file: seq.import(path.join(__dirname, './file')),
    displayDevice_has_colorDepth: seq.import(path.join(__dirname, './displayDevice_has_colorDepth')),
    gpuDevice_has_driverSoftware: seq.import(path.join(__dirname, './gpuDevice_has_driverSoftware')),
    gpuDevice_has_machineInterface: seq.import(path.join(__dirname, './gpuDevice_has_machineInterface')),
    formatOperation: seq.import(path.join(__dirname, './formatOperation')),
    fileFormat_has_fileExtension: seq.import(path.join(__dirname, './fileFormat_has_fileExtension')),
    gpuDevice: seq.import(path.join(__dirname, './gpuDevice')),
    keyboardDevice_has_language: seq.import(path.join(__dirname, './keyboardDevice_has_language')),
    keyboardDevice_has_driverSoftware: seq.import(path.join(__dirname, './keyboardDevice_has_driverSoftware')),
    keyboardDevice_has_machineInterfaceID: seq.import(path.join(__dirname, './keyboardDevice_has_machineInterfaceID')),
    keyboardDevice: seq.import(path.join(__dirname, './keyboardDevice')),
    machineType: seq.import(path.join(__dirname, './machineType')),
    mountFormat: seq.import(path.join(__dirname, './mountFormat')),
    networkService: seq.import(path.join(__dirname, './networkService')),
    networkDevice_has_driverSoftware: seq.import(path.join(__dirname, './networkDevice_has_driverSoftware')),
    objectEnvironment: seq.import(path.join(__dirname, './objectEnvironment')),
    keyboardLayout: seq.import(path.join(__dirname, './keyboardLayout')),
    networkDevice_has_machineInterface: seq.import(path.join(__dirname, './networkDevice_has_machineInterface')),
    networkDevice: seq.import(path.join(__dirname, './networkDevice')),
    osVersion_languageSettings: seq.import(path.join(__dirname, './osVersion_languageSettings')),
    osVersion_displayResolutionSettings: seq.import(path.join(__dirname, './osVersion_displayResolutionSettings')),
    objectEnvironment_has_event: seq.import(path.join(__dirname, './objectEnvironment_has_event')),
    osVersion: seq.import(path.join(__dirname, './osVersion')),
    osVersion_has_developer: seq.import(path.join(__dirname, './osVersion_has_developer')),
    osVersion_includes_softwareVersion: seq.import(path.join(__dirname, './osVersion_includes_softwareVersion')),
    osVersion_has_programmingLanguage: seq.import(path.join(__dirname, './osVersion_has_programmingLanguage')),
    programmingLanguage: seq.import(path.join(__dirname, './programmingLanguage')),
    osVersion_keyboardLayoutSettings: seq.import(path.join(__dirname, './osVersion_keyboardLayoutSettings')),
    osVersion_isCompatibleWith_configuredMachine: seq.import(path.join(__dirname, './osVersion_isCompatibleWith_configuredMachine')),
    osVersion_keyboardLanguageSettings: seq.import(path.join(__dirname, './osVersion_keyboardLanguageSettings')),
    osVersion_regionSettings: seq.import(path.join(__dirname, './osVersion_regionSettings')),
    osVersion_keyboardSetting: seq.import(path.join(__dirname, './osVersion_keyboardSetting')),
    readWriteStatus: seq.import(path.join(__dirname, './readWriteStatus')),
    osVersion_has_alternateID: seq.import(path.join(__dirname, './osVersion_has_alternateID')),
    osVersion_timeZoneSettings: seq.import(path.join(__dirname, './osVersion_timeZoneSettings')),
    osVersion_colorDepthSettings: seq.import(path.join(__dirname, './osVersion_colorDepthSettings')),
    pointerDeviceType: seq.import(path.join(__dirname, './pointerDeviceType')),
    objectFileOperation: seq.import(path.join(__dirname, './objectFileOperation')),
    pointerDevice_has_driverSoftware: seq.import(path.join(__dirname, './pointerDevice_has_driverSoftware')),
    pointerDevice_has_machineInterface: seq.import(path.join(__dirname, './pointerDevice_has_machineInterface')),
    osVersion_has_softwareLicense: seq.import(path.join(__dirname, './osVersion_has_softwareLicense')),
    pointerDevice: seq.import(path.join(__dirname, './pointerDevice')),
    softwareEnvironment_has_event: seq.import(path.join(__dirname, './softwareEnvironment_has_event')),
    softwareProduct: seq.import(path.join(__dirname, './softwareProduct')),
    softwareObject_isManifestationOf_osVersion: seq.import(path.join(__dirname, './softwareObject_isManifestationOf_osVersion')),
    softwareFamily_hasPart_softwareProduct: seq.import(path.join(__dirname, './softwareFamily_hasPart_softwareProduct')),
    softwareObject_has_event: seq.import(path.join(__dirname, './softwareObject_has_event')),
    softwareObject_has_alternateID: seq.import(path.join(__dirname, './softwareObject_has_alternateID')),
    softwareObject: seq.import(path.join(__dirname, './softwareObject')),
    region: seq.import(path.join(__dirname, './region')),
    softwareVersion_has_alternateID: seq.import(path.join(__dirname, './softwareVersion_has_alternateID')),
    softwareObject_has_objectFile: seq.import(path.join(__dirname, './softwareObject_has_objectFile')),
    softwareProduct_has_softwareType: seq.import(path.join(__dirname, './softwareProduct_has_softwareType')),
    softwareEnvironment_has_diskImage: seq.import(path.join(__dirname, './softwareEnvironment_has_diskImage')),
    softwareObject_isManifestationOf_softwareVersion: seq.import(path.join(__dirname, './softwareObject_isManifestationOf_softwareVersion')),
    softwareVersion_has_developer: seq.import(path.join(__dirname, './softwareVersion_has_developer')),
    softwareObjectFile_has_objectFileOperation: seq.import(path.join(__dirname, './softwareObjectFile_has_objectFileOperation')),
    softwareType: seq.import(path.join(__dirname, './softwareType')),
    softwareFamilyVersion_hasPart_softwareVersion: seq.import(path.join(__dirname, './softwareFamilyVersion_hasPart_softwareVersion')),
    softwareVersion_has_formatImplementation: seq.import(path.join(__dirname, './softwareVersion_has_formatImplementation')),
    softwareLicense: seq.import(path.join(__dirname, './softwareLicense')),
    softwareVersion_has_programmingLanguage: seq.import(path.join(__dirname, './softwareVersion_has_programmingLanguage')),
    softwareEnvironment: seq.import(path.join(__dirname, './softwareEnvironment')),
    softwareVersion_has_softwareLicense: seq.import(path.join(__dirname, './softwareVersion_has_softwareLicense')),
    softwareProduct_has_alternateName: seq.import(path.join(__dirname, './softwareProduct_has_alternateName')),
    softwareVersion_languageSettings: seq.import(path.join(__dirname, './softwareVersion_languageSettings')),
    softwareVersion: seq.import(path.join(__dirname, './softwareVersion')),
    storageDevice_has_driverSoftware: seq.import(path.join(__dirname, './storageDevice_has_driverSoftware')),
    systemRequirements_includes_osVersion: seq.import(path.join(__dirname, './systemRequirements_includes_osVersion')),
    timezone: seq.import(path.join(__dirname, './timezone')),
    systemRequirements_includes_storageDeviceType: seq.import(path.join(__dirname, './systemRequirements_includes_storageDeviceType')),
    storageDevice_has_machineInterface: seq.import(path.join(__dirname, './storageDevice_has_machineInterface')),
    systemRequirements_includes_pointerDeviceType: seq.import(path.join(__dirname, './systemRequirements_includes_pointerDeviceType')),
    systemRequirements_includes_softwareVersion: seq.import(path.join(__dirname, './systemRequirements_includes_softwareVersion')),
    systemRequirements_includes_cpuArchitecture: seq.import(path.join(__dirname, './systemRequirements_includes_cpuArchitecture')),
    systemRequirements_includes_gpuDevice: seq.import(path.join(__dirname, './systemRequirements_includes_gpuDevice')),
    systemRequirements_includes_machineType: seq.import(path.join(__dirname, './systemRequirements_includes_machineType')),
    userInformation: seq.import(path.join(__dirname, './userInformation')),
    systemRequirements: seq.import(path.join(__dirname, './systemRequirements')),
    systemRequirements_includes_audioDevice: seq.import(path.join(__dirname, './systemRequirements_includes_audioDevice')),
    timezone_has_timezoneName: seq.import(path.join(__dirname, './timezone_has_timezoneName')),
    timezoneName: seq.import(path.join(__dirname, './timezoneName')),
    softwareVersion_isCompatibleWith_computingEnvironment: seq.import(path.join(__dirname, './softwareVersion_isCompatibleWith_computingEnvironment')),
    storageDeviceType: seq.import(path.join(__dirname, './storageDeviceType')),
    formatImplementation_includes_fileFormat: seq.import(path.join(__dirname, './formatImplementation_includes_fileFormat')),
    storageDevice: seq.import(path.join(__dirname, './storageDevice')),
    softwareEnvironment_hasPart_configuredSoftware: seq.import(path.join(__dirname, './softwareEnvironment_hasPart_configuredSoftware')),
  };
  return tables;
};

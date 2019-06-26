// tslint:disable
import * as path from 'path';
import * as sequelize from 'sequelize';
import * as def from './db';

export interface ITables {
  audioDevice_has_driverSoftware:def.audioDevice_has_driverSoftwareModel;
  audioDevice_has_machineInterface:def.audioDevice_has_machineInterfaceModel;
  configuredAudioDevice:def.configuredAudioDeviceModel;
  configuredMachine:def.configuredMachineModel;
  configuredGpuDevice:def.configuredGpuDeviceModel;
  colorDepth:def.colorDepthModel;
  computingEnvironment_has_event:def.computingEnvironment_has_eventModel;
  configuredKeyboardDevice:def.configuredKeyboardDeviceModel;
  configuredGpuDevice_has_displayDevice:def.configuredGpuDevice_has_displayDeviceModel;
  configuredMachine_has_event:def.configuredMachine_has_eventModel;
  configuredNetwork_has_configuredMachine:def.configuredNetwork_has_configuredMachineModel;
  configuredNetwork_hasEvent:def.configuredNetwork_hasEventModel;
  configuredNetworkDevice:def.configuredNetworkDeviceModel;
  configuredNetworkMachine_expectedNetworkService:def.configuredNetworkMachine_expectedNetworkServiceModel;
  configuredNetwork_emulatesNetworkService:def.configuredNetwork_emulatesNetworkServiceModel;
  configuredNetwork:def.configuredNetworkModel;
  configuredOS_has_formatOperation:def.configuredOS_has_formatOperationModel;
  configuredOS_has_event:def.configuredOS_has_eventModel;
  configuredOS:def.configuredOSModel;
  configuredOS_has_userInformation:def.configuredOS_has_userInformationModel;
  configuredNetworkMachine_providesNetworkService:def.configuredNetworkMachine_providesNetworkServiceModel;
  configuredPointerDevice:def.configuredPointerDeviceModel;
  alternateName:def.alternateNameModel;
  configuredOS_language:def.configuredOS_languageModel;
  configuredSoftware:def.configuredSoftwareModel;
  computingEnvironment:def.computingEnvironmentModel;
  audioDevice:def.audioDeviceModel;
  audioDevice_hasEquivalent:def.audioDevice_hasEquivalentModel;
  cpuArchitecture:def.cpuArchitectureModel;
  configuredStorageDevice:def.configuredStorageDeviceModel;
  configuredSoftware_uses_formatImplementation:def.configuredSoftware_uses_formatImplementationModel;
  configuredSoftware_has_event:def.configuredSoftware_has_eventModel;
  configuredSoftware_has_userInformation:def.configuredSoftware_has_userInformationModel;
  digitalObject_has_event:def.digitalObject_has_eventModel;
  digitalObject_has_objectFile:def.digitalObject_has_objectFileModel;
  digitalObject_isCompatibleWith_computingEnvironment:def.digitalObject_isCompatibleWith_computingEnvironmentModel;
  displayDevice:def.displayDeviceModel;
  developer:def.developerModel;
  digitalObjectFile_has_objectFileOperation:def.digitalObjectFile_has_objectFileOperationModel;
  digitalObject:def.digitalObjectModel;
  digitalObject_has_alternativeID:def.digitalObject_has_alternativeIDModel;
  displayDevice_has_displayInterface:def.displayDevice_has_displayInterfaceModel;
  displayDevice_has_displayResolution:def.displayDevice_has_displayResolutionModel;
  displayResolution:def.displayResolutionModel;
  displayDevice_has_driverSoftware:def.displayDevice_has_driverSoftwareModel;
  fileFormat:def.fileFormatModel;
  fileExtension:def.fileExtensionModel;
  fileSystem:def.fileSystemModel;
  gpuDevice_hasEquivalent:def.gpuDevice_hasEquivalentModel;
  gpuDevice_has_displayInterface:def.gpuDevice_has_displayInterfaceModel;
  formatImplementation:def.formatImplementationModel;
  file:def.fileModel;
  gpuDevice_has_driverSoftware:def.gpuDevice_has_driverSoftwareModel;
  displayDevice_has_colorDepth:def.displayDevice_has_colorDepthModel;
  formatOperation:def.formatOperationModel;
  gpuDevice_has_machineInterface:def.gpuDevice_has_machineInterfaceModel;
  fileFormat_has_fileExtension:def.fileFormat_has_fileExtensionModel;
  keyboardDevice_has_driverSoftware:def.keyboardDevice_has_driverSoftwareModel;
  gpuDevice:def.gpuDeviceModel;
  keyboardDevice_has_language:def.keyboardDevice_has_languageModel;
  keyboardDevice_has_machineInterfaceID:def.keyboardDevice_has_machineInterfaceIDModel;
  keyboardDevice:def.keyboardDeviceModel;
  machineType:def.machineTypeModel;
  networkDevice_has_driverSoftware:def.networkDevice_has_driverSoftwareModel;
  mountFormat:def.mountFormatModel;
  networkService:def.networkServiceModel;
  networkDevice_has_machineInterface:def.networkDevice_has_machineInterfaceModel;
  objectEnvironment:def.objectEnvironmentModel;
  keyboardLayout:def.keyboardLayoutModel;
  networkDevice:def.networkDeviceModel;
  osVersion_languageSettings:def.osVersion_languageSettingsModel;
  objectEnvironment_has_event:def.objectEnvironment_has_eventModel;
  osVersion_displayResolutionSettings:def.osVersion_displayResolutionSettingsModel;
  osVersion_has_developer:def.osVersion_has_developerModel;
  osVersion:def.osVersionModel;
  osVersion_includes_softwareVersion:def.osVersion_includes_softwareVersionModel;
  programmingLanguage:def.programmingLanguageModel;
  osVersion_has_programmingLanguage:def.osVersion_has_programmingLanguageModel;
  osVersion_keyboardLayoutSettings:def.osVersion_keyboardLayoutSettingsModel;
  osVersion_isCompatibleWith_configuredMachine:def.osVersion_isCompatibleWith_configuredMachineModel;
  osVersion_keyboardLanguageSettings:def.osVersion_keyboardLanguageSettingsModel;
  readWriteStatus:def.readWriteStatusModel;
  osVersion_regionSettings:def.osVersion_regionSettingsModel;
  osVersion_keyboardSetting:def.osVersion_keyboardSettingModel;
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
  softwareObject_has_event:def.softwareObject_has_eventModel;
  softwareFamily_hasPart_softwareProduct:def.softwareFamily_hasPart_softwareProductModel;
  softwareObject_has_alternateID:def.softwareObject_has_alternateIDModel;
  softwareObject:def.softwareObjectModel;
  region:def.regionModel;
  softwareObject_has_objectFile:def.softwareObject_has_objectFileModel;
  softwareVersion_has_alternateID:def.softwareVersion_has_alternateIDModel;
  softwareProduct_has_softwareType:def.softwareProduct_has_softwareTypeModel;
  softwareObject_isManifestationOf_softwareVersion:def.softwareObject_isManifestationOf_softwareVersionModel;
  softwareEnvironment_has_diskImage:def.softwareEnvironment_has_diskImageModel;
  softwareVersion_has_developer:def.softwareVersion_has_developerModel;
  softwareType:def.softwareTypeModel;
  softwareObjectFile_has_objectFileOperation:def.softwareObjectFile_has_objectFileOperationModel;
  softwareFamilyVersion_hasPart_softwareVersion:def.softwareFamilyVersion_hasPart_softwareVersionModel;
  softwareVersion_has_formatImplementation:def.softwareVersion_has_formatImplementationModel;
  softwareLicense:def.softwareLicenseModel;
  softwareVersion_has_programmingLanguage:def.softwareVersion_has_programmingLanguageModel;
  softwareEnvironment:def.softwareEnvironmentModel;
  softwareVersion_has_softwareLicense:def.softwareVersion_has_softwareLicenseModel;
  softwareProduct_has_alternateName:def.softwareProduct_has_alternateNameModel;
  softwareVersion:def.softwareVersionModel;
  softwareVersion_languageSettings:def.softwareVersion_languageSettingsModel;
  storageDevice_has_driverSoftware:def.storageDevice_has_driverSoftwareModel;
  systemRequirements_includes_osVersion:def.systemRequirements_includes_osVersionModel;
  timezone:def.timezoneModel;
  systemRequirements_includes_storageDeviceType:def.systemRequirements_includes_storageDeviceTypeModel;
  storageDevice_has_machineInterface:def.storageDevice_has_machineInterfaceModel;
  systemRequirements_includes_pointerDeviceType:def.systemRequirements_includes_pointerDeviceTypeModel;
  systemRequirements_includes_softwareVersion:def.systemRequirements_includes_softwareVersionModel;
  systemRequirements_includes_cpuArchitecture:def.systemRequirements_includes_cpuArchitectureModel;
  systemRequirements_includes_machineType:def.systemRequirements_includes_machineTypeModel;
  systemRequirements_includes_gpuDevice:def.systemRequirements_includes_gpuDeviceModel;
  userInformation:def.userInformationModel;
  systemRequirements:def.systemRequirementsModel;
  systemRequirements_includes_audioDevice:def.systemRequirements_includes_audioDeviceModel;
  timezone_has_timezoneName:def.timezone_has_timezoneNameModel;
  timezoneName:def.timezoneNameModel;
  softwareVersion_isCompatibleWith_computingEnvironment:def.softwareVersion_isCompatibleWith_computingEnvironmentModel;
  storageDeviceType:def.storageDeviceTypeModel;
  storageDevice:def.storageDeviceModel;
  softwareEnvironment_hasPart_configuredSoftware:def.softwareEnvironment_hasPart_configuredSoftwareModel;
  formatImplementation_includes_fileFormat:def.formatImplementation_includes_fileFormatModel;
}

export const getModels = function(seq:sequelize.Sequelize):ITables {
  const tables:ITables = {
    audioDevice_has_driverSoftware: seq.import(path.join(__dirname, './audioDevice_has_driverSoftware')),
    audioDevice_has_machineInterface: seq.import(path.join(__dirname, './audioDevice_has_machineInterface')),
    configuredAudioDevice: seq.import(path.join(__dirname, './configuredAudioDevice')),
    configuredMachine: seq.import(path.join(__dirname, './configuredMachine')),
    configuredGpuDevice: seq.import(path.join(__dirname, './configuredGpuDevice')),
    colorDepth: seq.import(path.join(__dirname, './colorDepth')),
    computingEnvironment_has_event: seq.import(path.join(__dirname, './computingEnvironment_has_event')),
    configuredKeyboardDevice: seq.import(path.join(__dirname, './configuredKeyboardDevice')),
    configuredGpuDevice_has_displayDevice: seq.import(path.join(__dirname, './configuredGpuDevice_has_displayDevice')),
    configuredMachine_has_event: seq.import(path.join(__dirname, './configuredMachine_has_event')),
    configuredNetwork_has_configuredMachine: seq.import(path.join(__dirname, './configuredNetwork_has_configuredMachine')),
    configuredNetwork_hasEvent: seq.import(path.join(__dirname, './configuredNetwork_hasEvent')),
    configuredNetworkDevice: seq.import(path.join(__dirname, './configuredNetworkDevice')),
    configuredNetworkMachine_expectedNetworkService: seq.import(path.join(__dirname, './configuredNetworkMachine_expectedNetworkService')),
    configuredNetwork_emulatesNetworkService: seq.import(path.join(__dirname, './configuredNetwork_emulatesNetworkService')),
    configuredNetwork: seq.import(path.join(__dirname, './configuredNetwork')),
    configuredOS_has_formatOperation: seq.import(path.join(__dirname, './configuredOS_has_formatOperation')),
    configuredOS_has_event: seq.import(path.join(__dirname, './configuredOS_has_event')),
    configuredOS: seq.import(path.join(__dirname, './configuredOS')),
    configuredOS_has_userInformation: seq.import(path.join(__dirname, './configuredOS_has_userInformation')),
    configuredNetworkMachine_providesNetworkService: seq.import(path.join(__dirname, './configuredNetworkMachine_providesNetworkService')),
    configuredPointerDevice: seq.import(path.join(__dirname, './configuredPointerDevice')),
    alternateName: seq.import(path.join(__dirname, './alternateName')),
    configuredOS_language: seq.import(path.join(__dirname, './configuredOS_language')),
    configuredSoftware: seq.import(path.join(__dirname, './configuredSoftware')),
    computingEnvironment: seq.import(path.join(__dirname, './computingEnvironment')),
    audioDevice: seq.import(path.join(__dirname, './audioDevice')),
    audioDevice_hasEquivalent: seq.import(path.join(__dirname, './audioDevice_hasEquivalent')),
    cpuArchitecture: seq.import(path.join(__dirname, './cpuArchitecture')),
    configuredStorageDevice: seq.import(path.join(__dirname, './configuredStorageDevice')),
    configuredSoftware_uses_formatImplementation: seq.import(path.join(__dirname, './configuredSoftware_uses_formatImplementation')),
    configuredSoftware_has_event: seq.import(path.join(__dirname, './configuredSoftware_has_event')),
    configuredSoftware_has_userInformation: seq.import(path.join(__dirname, './configuredSoftware_has_userInformation')),
    digitalObject_has_event: seq.import(path.join(__dirname, './digitalObject_has_event')),
    digitalObject_has_objectFile: seq.import(path.join(__dirname, './digitalObject_has_objectFile')),
    digitalObject_isCompatibleWith_computingEnvironment: seq.import(path.join(__dirname, './digitalObject_isCompatibleWith_computingEnvironment')),
    displayDevice: seq.import(path.join(__dirname, './displayDevice')),
    developer: seq.import(path.join(__dirname, './developer')),
    digitalObjectFile_has_objectFileOperation: seq.import(path.join(__dirname, './digitalObjectFile_has_objectFileOperation')),
    digitalObject: seq.import(path.join(__dirname, './digitalObject')),
    digitalObject_has_alternativeID: seq.import(path.join(__dirname, './digitalObject_has_alternativeID')),
    displayDevice_has_displayInterface: seq.import(path.join(__dirname, './displayDevice_has_displayInterface')),
    displayDevice_has_displayResolution: seq.import(path.join(__dirname, './displayDevice_has_displayResolution')),
    displayResolution: seq.import(path.join(__dirname, './displayResolution')),
    displayDevice_has_driverSoftware: seq.import(path.join(__dirname, './displayDevice_has_driverSoftware')),
    fileFormat: seq.import(path.join(__dirname, './fileFormat')),
    fileExtension: seq.import(path.join(__dirname, './fileExtension')),
    fileSystem: seq.import(path.join(__dirname, './fileSystem')),
    gpuDevice_hasEquivalent: seq.import(path.join(__dirname, './gpuDevice_hasEquivalent')),
    gpuDevice_has_displayInterface: seq.import(path.join(__dirname, './gpuDevice_has_displayInterface')),
    formatImplementation: seq.import(path.join(__dirname, './formatImplementation')),
    file: seq.import(path.join(__dirname, './file')),
    gpuDevice_has_driverSoftware: seq.import(path.join(__dirname, './gpuDevice_has_driverSoftware')),
    displayDevice_has_colorDepth: seq.import(path.join(__dirname, './displayDevice_has_colorDepth')),
    formatOperation: seq.import(path.join(__dirname, './formatOperation')),
    gpuDevice_has_machineInterface: seq.import(path.join(__dirname, './gpuDevice_has_machineInterface')),
    fileFormat_has_fileExtension: seq.import(path.join(__dirname, './fileFormat_has_fileExtension')),
    keyboardDevice_has_driverSoftware: seq.import(path.join(__dirname, './keyboardDevice_has_driverSoftware')),
    gpuDevice: seq.import(path.join(__dirname, './gpuDevice')),
    keyboardDevice_has_language: seq.import(path.join(__dirname, './keyboardDevice_has_language')),
    keyboardDevice_has_machineInterfaceID: seq.import(path.join(__dirname, './keyboardDevice_has_machineInterfaceID')),
    keyboardDevice: seq.import(path.join(__dirname, './keyboardDevice')),
    machineType: seq.import(path.join(__dirname, './machineType')),
    networkDevice_has_driverSoftware: seq.import(path.join(__dirname, './networkDevice_has_driverSoftware')),
    mountFormat: seq.import(path.join(__dirname, './mountFormat')),
    networkService: seq.import(path.join(__dirname, './networkService')),
    networkDevice_has_machineInterface: seq.import(path.join(__dirname, './networkDevice_has_machineInterface')),
    objectEnvironment: seq.import(path.join(__dirname, './objectEnvironment')),
    keyboardLayout: seq.import(path.join(__dirname, './keyboardLayout')),
    networkDevice: seq.import(path.join(__dirname, './networkDevice')),
    osVersion_languageSettings: seq.import(path.join(__dirname, './osVersion_languageSettings')),
    objectEnvironment_has_event: seq.import(path.join(__dirname, './objectEnvironment_has_event')),
    osVersion_displayResolutionSettings: seq.import(path.join(__dirname, './osVersion_displayResolutionSettings')),
    osVersion_has_developer: seq.import(path.join(__dirname, './osVersion_has_developer')),
    osVersion: seq.import(path.join(__dirname, './osVersion')),
    osVersion_includes_softwareVersion: seq.import(path.join(__dirname, './osVersion_includes_softwareVersion')),
    programmingLanguage: seq.import(path.join(__dirname, './programmingLanguage')),
    osVersion_has_programmingLanguage: seq.import(path.join(__dirname, './osVersion_has_programmingLanguage')),
    osVersion_keyboardLayoutSettings: seq.import(path.join(__dirname, './osVersion_keyboardLayoutSettings')),
    osVersion_isCompatibleWith_configuredMachine: seq.import(path.join(__dirname, './osVersion_isCompatibleWith_configuredMachine')),
    osVersion_keyboardLanguageSettings: seq.import(path.join(__dirname, './osVersion_keyboardLanguageSettings')),
    readWriteStatus: seq.import(path.join(__dirname, './readWriteStatus')),
    osVersion_regionSettings: seq.import(path.join(__dirname, './osVersion_regionSettings')),
    osVersion_keyboardSetting: seq.import(path.join(__dirname, './osVersion_keyboardSetting')),
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
    softwareObject_has_event: seq.import(path.join(__dirname, './softwareObject_has_event')),
    softwareFamily_hasPart_softwareProduct: seq.import(path.join(__dirname, './softwareFamily_hasPart_softwareProduct')),
    softwareObject_has_alternateID: seq.import(path.join(__dirname, './softwareObject_has_alternateID')),
    softwareObject: seq.import(path.join(__dirname, './softwareObject')),
    region: seq.import(path.join(__dirname, './region')),
    softwareObject_has_objectFile: seq.import(path.join(__dirname, './softwareObject_has_objectFile')),
    softwareVersion_has_alternateID: seq.import(path.join(__dirname, './softwareVersion_has_alternateID')),
    softwareProduct_has_softwareType: seq.import(path.join(__dirname, './softwareProduct_has_softwareType')),
    softwareObject_isManifestationOf_softwareVersion: seq.import(path.join(__dirname, './softwareObject_isManifestationOf_softwareVersion')),
    softwareEnvironment_has_diskImage: seq.import(path.join(__dirname, './softwareEnvironment_has_diskImage')),
    softwareVersion_has_developer: seq.import(path.join(__dirname, './softwareVersion_has_developer')),
    softwareType: seq.import(path.join(__dirname, './softwareType')),
    softwareObjectFile_has_objectFileOperation: seq.import(path.join(__dirname, './softwareObjectFile_has_objectFileOperation')),
    softwareFamilyVersion_hasPart_softwareVersion: seq.import(path.join(__dirname, './softwareFamilyVersion_hasPart_softwareVersion')),
    softwareVersion_has_formatImplementation: seq.import(path.join(__dirname, './softwareVersion_has_formatImplementation')),
    softwareLicense: seq.import(path.join(__dirname, './softwareLicense')),
    softwareVersion_has_programmingLanguage: seq.import(path.join(__dirname, './softwareVersion_has_programmingLanguage')),
    softwareEnvironment: seq.import(path.join(__dirname, './softwareEnvironment')),
    softwareVersion_has_softwareLicense: seq.import(path.join(__dirname, './softwareVersion_has_softwareLicense')),
    softwareProduct_has_alternateName: seq.import(path.join(__dirname, './softwareProduct_has_alternateName')),
    softwareVersion: seq.import(path.join(__dirname, './softwareVersion')),
    softwareVersion_languageSettings: seq.import(path.join(__dirname, './softwareVersion_languageSettings')),
    storageDevice_has_driverSoftware: seq.import(path.join(__dirname, './storageDevice_has_driverSoftware')),
    systemRequirements_includes_osVersion: seq.import(path.join(__dirname, './systemRequirements_includes_osVersion')),
    timezone: seq.import(path.join(__dirname, './timezone')),
    systemRequirements_includes_storageDeviceType: seq.import(path.join(__dirname, './systemRequirements_includes_storageDeviceType')),
    storageDevice_has_machineInterface: seq.import(path.join(__dirname, './storageDevice_has_machineInterface')),
    systemRequirements_includes_pointerDeviceType: seq.import(path.join(__dirname, './systemRequirements_includes_pointerDeviceType')),
    systemRequirements_includes_softwareVersion: seq.import(path.join(__dirname, './systemRequirements_includes_softwareVersion')),
    systemRequirements_includes_cpuArchitecture: seq.import(path.join(__dirname, './systemRequirements_includes_cpuArchitecture')),
    systemRequirements_includes_machineType: seq.import(path.join(__dirname, './systemRequirements_includes_machineType')),
    systemRequirements_includes_gpuDevice: seq.import(path.join(__dirname, './systemRequirements_includes_gpuDevice')),
    userInformation: seq.import(path.join(__dirname, './userInformation')),
    systemRequirements: seq.import(path.join(__dirname, './systemRequirements')),
    systemRequirements_includes_audioDevice: seq.import(path.join(__dirname, './systemRequirements_includes_audioDevice')),
    timezone_has_timezoneName: seq.import(path.join(__dirname, './timezone_has_timezoneName')),
    timezoneName: seq.import(path.join(__dirname, './timezoneName')),
    softwareVersion_isCompatibleWith_computingEnvironment: seq.import(path.join(__dirname, './softwareVersion_isCompatibleWith_computingEnvironment')),
    storageDeviceType: seq.import(path.join(__dirname, './storageDeviceType')),
    storageDevice: seq.import(path.join(__dirname, './storageDevice')),
    softwareEnvironment_hasPart_configuredSoftware: seq.import(path.join(__dirname, './softwareEnvironment_hasPart_configuredSoftware')),
    formatImplementation_includes_fileFormat: seq.import(path.join(__dirname, './formatImplementation_includes_fileFormat')),
  };
  return tables;
};

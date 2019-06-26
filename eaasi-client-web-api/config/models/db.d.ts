// tslint:disable
import * as Sequelize from 'sequelize';


// table: audioDevice_has_driverSoftware
export interface audioDevice_has_driverSoftwareAttribute {
  audioDevice_audioDeviceID:number;
  audioDevice_driverSoftwareID:number;
}
export interface audioDevice_has_driverSoftwareInstance extends Sequelize.Instance<audioDevice_has_driverSoftwareAttribute>, audioDevice_has_driverSoftwareAttribute { }
export interface audioDevice_has_driverSoftwareModel extends Sequelize.Model<audioDevice_has_driverSoftwareInstance, audioDevice_has_driverSoftwareAttribute> { }

// table: configuredAudioDevice
export interface configuredAudioDeviceAttribute {
  configuredMachine_machineID?:number;
  configuredAudioDevice_audioDeviceID?:number;
  configuredAudioDevice_irq:string;
  configuredAudioDevice_usesMachineInterface?:number;
}
export interface configuredAudioDeviceInstance extends Sequelize.Instance<configuredAudioDeviceAttribute>, configuredAudioDeviceAttribute { }
export interface configuredAudioDeviceModel extends Sequelize.Model<configuredAudioDeviceInstance, configuredAudioDeviceAttribute> { }

// table: computingEnvironment_has_event
export interface computingEnvironment_has_eventAttribute {
  computingEnvironment_computingEnvironmentID:number;
  event_eventID:number;
}
export interface computingEnvironment_has_eventInstance extends Sequelize.Instance<computingEnvironment_has_eventAttribute>, computingEnvironment_has_eventAttribute { }
export interface computingEnvironment_has_eventModel extends Sequelize.Model<computingEnvironment_has_eventInstance, computingEnvironment_has_eventAttribute> { }

// table: colorDepth
export interface colorDepthAttribute {
  colorDepthID:number;
  colorDepthName:string;
  bitDepth?:number;
}
export interface colorDepthInstance extends Sequelize.Instance<colorDepthAttribute>, colorDepthAttribute { }
export interface colorDepthModel extends Sequelize.Model<colorDepthInstance, colorDepthAttribute> { }

// table: configuredMachine
export interface configuredMachineAttribute {
  configuredMachineID:number;
  configuredMachineName:string;
  configuredMachineDescription:string;
  configuredMachineDateTime:Date;
  configuredMachineType?:number;
  configuredMachineRamBytes:string;
  configuredMachineArchitecture?:string;
  configuredMachineCpuCores?:string;
  configuredMachine_emulatorSoftwareID?:number;
}
export interface configuredMachineInstance extends Sequelize.Instance<configuredMachineAttribute>, configuredMachineAttribute { }
export interface configuredMachineModel extends Sequelize.Model<configuredMachineInstance, configuredMachineAttribute> { }

// table: configuredGpuDevice_has_displayDevice
export interface configuredGpuDevice_has_displayDeviceAttribute {
  configuredMachine_machineID:number;
  configuredGpuDevice_gpuDeviceID:number;
  configuredGpuDevice_displayDeviceID:number;
  displayDevice_usesDisplayInterface:number;
}
export interface configuredGpuDevice_has_displayDeviceInstance extends Sequelize.Instance<configuredGpuDevice_has_displayDeviceAttribute>, configuredGpuDevice_has_displayDeviceAttribute { }
export interface configuredGpuDevice_has_displayDeviceModel extends Sequelize.Model<configuredGpuDevice_has_displayDeviceInstance, configuredGpuDevice_has_displayDeviceAttribute> { }

// table: configuredGpuDevice
export interface configuredGpuDeviceAttribute {
  configuredMachine_machineID?:number;
  configuredGpuDevice_gpuDeviceID:number;
  configuredGpuDevice_memoryBytes?:number;
  configuredGpuDevice_irq?:string;
  configuredGpuDevice_usesMachineInterface?:number;
}
export interface configuredGpuDeviceInstance extends Sequelize.Instance<configuredGpuDeviceAttribute>, configuredGpuDeviceAttribute { }
export interface configuredGpuDeviceModel extends Sequelize.Model<configuredGpuDeviceInstance, configuredGpuDeviceAttribute> { }

// table: audioDevice_has_machineInterface
export interface audioDevice_has_machineInterfaceAttribute {
  audioDevice_audioDeviceID:number;
  audioDevice_machineInterfaceID:number;
}
export interface audioDevice_has_machineInterfaceInstance extends Sequelize.Instance<audioDevice_has_machineInterfaceAttribute>, audioDevice_has_machineInterfaceAttribute { }
export interface audioDevice_has_machineInterfaceModel extends Sequelize.Model<audioDevice_has_machineInterfaceInstance, audioDevice_has_machineInterfaceAttribute> { }

// table: configuredMachine_has_event
export interface configuredMachine_has_eventAttribute {
  configuredMachine_machineID:number;
  event_eventID?:number;
}
export interface configuredMachine_has_eventInstance extends Sequelize.Instance<configuredMachine_has_eventAttribute>, configuredMachine_has_eventAttribute { }
export interface configuredMachine_has_eventModel extends Sequelize.Model<configuredMachine_has_eventInstance, configuredMachine_has_eventAttribute> { }

// table: configuredNetworkDevice
export interface configuredNetworkDeviceAttribute {
  configuredMachine_machineID:number;
  configuredNetworkDevice_networkDeviceID:number;
  configuredNetworkDevice_macAddress?:number;
  configuredNetworkDevice_usesMachineInterface?:number;
}
export interface configuredNetworkDeviceInstance extends Sequelize.Instance<configuredNetworkDeviceAttribute>, configuredNetworkDeviceAttribute { }
export interface configuredNetworkDeviceModel extends Sequelize.Model<configuredNetworkDeviceInstance, configuredNetworkDeviceAttribute> { }

// table: configuredNetworkMachine_expectedNetworkService
export interface configuredNetworkMachine_expectedNetworkServiceAttribute {
  configuredNetworkMachine_configuredNetworkID?:number;
  configuredNetworkMachine_configuredMachineID?:number;
  configuredNetworkMachine_expectedNetworkServiceID?:number;
  servicePortExpected?:string;
}
export interface configuredNetworkMachine_expectedNetworkServiceInstance extends Sequelize.Instance<configuredNetworkMachine_expectedNetworkServiceAttribute>, configuredNetworkMachine_expectedNetworkServiceAttribute { }
export interface configuredNetworkMachine_expectedNetworkServiceModel extends Sequelize.Model<configuredNetworkMachine_expectedNetworkServiceInstance, configuredNetworkMachine_expectedNetworkServiceAttribute> { }

// table: configuredNetwork_has_configuredMachine
export interface configuredNetwork_has_configuredMachineAttribute {
  configuredNetwork_configuredNetworkID:number;
  configuredNetwork_machineID:number;
  bootOrder:number;
  staticIpAddress?:string;
}
export interface configuredNetwork_has_configuredMachineInstance extends Sequelize.Instance<configuredNetwork_has_configuredMachineAttribute>, configuredNetwork_has_configuredMachineAttribute { }
export interface configuredNetwork_has_configuredMachineModel extends Sequelize.Model<configuredNetwork_has_configuredMachineInstance, configuredNetwork_has_configuredMachineAttribute> { }

// table: configuredNetwork_hasEvent
export interface configuredNetwork_hasEventAttribute {
  configuredNetwork_configuredNetworkID:number;
  event_eventID?:number;
}
export interface configuredNetwork_hasEventInstance extends Sequelize.Instance<configuredNetwork_hasEventAttribute>, configuredNetwork_hasEventAttribute { }
export interface configuredNetwork_hasEventModel extends Sequelize.Model<configuredNetwork_hasEventInstance, configuredNetwork_hasEventAttribute> { }

// table: configuredKeyboardDevice
export interface configuredKeyboardDeviceAttribute {
  configuredMachine_machineID:number;
  configuredKeyboardDevice_keyboardDeviceID:number;
  configuredKeyboardDevice_usesMachineInterface?:number;
}
export interface configuredKeyboardDeviceInstance extends Sequelize.Instance<configuredKeyboardDeviceAttribute>, configuredKeyboardDeviceAttribute { }
export interface configuredKeyboardDeviceModel extends Sequelize.Model<configuredKeyboardDeviceInstance, configuredKeyboardDeviceAttribute> { }

// table: configuredNetwork
export interface configuredNetworkAttribute {
  configuredNetworkID:number;
  configuredNetworkName?:string;
  configuredNetworkDescription?:string;
}
export interface configuredNetworkInstance extends Sequelize.Instance<configuredNetworkAttribute>, configuredNetworkAttribute { }
export interface configuredNetworkModel extends Sequelize.Model<configuredNetworkInstance, configuredNetworkAttribute> { }

// table: configuredNetwork_emulatesNetworkService
export interface configuredNetwork_emulatesNetworkServiceAttribute {
  configuredNetwork_configuredNetworkID:number;
  configuredNetwork_networkServiceID?:number;
  servicePortExposed?:string;
}
export interface configuredNetwork_emulatesNetworkServiceInstance extends Sequelize.Instance<configuredNetwork_emulatesNetworkServiceAttribute>, configuredNetwork_emulatesNetworkServiceAttribute { }
export interface configuredNetwork_emulatesNetworkServiceModel extends Sequelize.Model<configuredNetwork_emulatesNetworkServiceInstance, configuredNetwork_emulatesNetworkServiceAttribute> { }

// table: configuredOS_has_formatOperation
export interface configuredOS_has_formatOperationAttribute {
  configuredOS_configuredOperatingSystemID?:number;
  formatOperation_opensFileFormat?:string;
  formatOperation_usesConfiguredSoftware?:number;
}
export interface configuredOS_has_formatOperationInstance extends Sequelize.Instance<configuredOS_has_formatOperationAttribute>, configuredOS_has_formatOperationAttribute { }
export interface configuredOS_has_formatOperationModel extends Sequelize.Model<configuredOS_has_formatOperationInstance, configuredOS_has_formatOperationAttribute> { }

// table: configuredOS
export interface configuredOSAttribute {
  configuredOperatingSystemID:number;
  configuredDisplayResolution?:number;
  configuredColorDepth?:number;
  configuredRegion?:string;
  configuredTimezone?:string;
  configuredDateTime?:Date;
  hasSource_softwareObjectID?:number;
  manifestationOf_osVersion?:number;
}
export interface configuredOSInstance extends Sequelize.Instance<configuredOSAttribute>, configuredOSAttribute { }
export interface configuredOSModel extends Sequelize.Model<configuredOSInstance, configuredOSAttribute> { }

// table: configuredNetworkMachine_providesNetworkService
export interface configuredNetworkMachine_providesNetworkServiceAttribute {
  configuredNetworkMachine_configuredNetworkID:number;
  configuredNetworkMachine_configuredMachineID?:number;
  configuredNetworkMachine_providesNetworkServiceID?:number;
  servicePortExposed?:string;
}
export interface configuredNetworkMachine_providesNetworkServiceInstance extends Sequelize.Instance<configuredNetworkMachine_providesNetworkServiceAttribute>, configuredNetworkMachine_providesNetworkServiceAttribute { }
export interface configuredNetworkMachine_providesNetworkServiceModel extends Sequelize.Model<configuredNetworkMachine_providesNetworkServiceInstance, configuredNetworkMachine_providesNetworkServiceAttribute> { }

// table: configuredOS_has_event
export interface configuredOS_has_eventAttribute {
  configuredOS_configuredOperatingSystemID?:number;
  event_eventID?:number;
}
export interface configuredOS_has_eventInstance extends Sequelize.Instance<configuredOS_has_eventAttribute>, configuredOS_has_eventAttribute { }
export interface configuredOS_has_eventModel extends Sequelize.Model<configuredOS_has_eventInstance, configuredOS_has_eventAttribute> { }

// table: configuredOS_has_userInformation
export interface configuredOS_has_userInformationAttribute {
  configuredOS_configuredOperatingSystemID?:number;
  userInformation_userInformationID?:number;
}
export interface configuredOS_has_userInformationInstance extends Sequelize.Instance<configuredOS_has_userInformationAttribute>, configuredOS_has_userInformationAttribute { }
export interface configuredOS_has_userInformationModel extends Sequelize.Model<configuredOS_has_userInformationInstance, configuredOS_has_userInformationAttribute> { }

// table: configuredPointerDevice
export interface configuredPointerDeviceAttribute {
  configuredMachine_machineID:number;
  configuredPointerDevice_pointerDeviceID:number;
  configuredPointerDevice_usesMachineInterface:number;
}
export interface configuredPointerDeviceInstance extends Sequelize.Instance<configuredPointerDeviceAttribute>, configuredPointerDeviceAttribute { }
export interface configuredPointerDeviceModel extends Sequelize.Model<configuredPointerDeviceInstance, configuredPointerDeviceAttribute> { }

// table: alternateName
export interface alternateNameAttribute {
  alternateNameID:number;
  alternateName:string;
}
export interface alternateNameInstance extends Sequelize.Instance<alternateNameAttribute>, alternateNameAttribute { }
export interface alternateNameModel extends Sequelize.Model<alternateNameInstance, alternateNameAttribute> { }

// table: configuredOS_language
export interface configuredOS_languageAttribute {
  configuredOS_configuredOperatingSystemID?:number;
  configuredOs_languageQID?:string;
  configuredOS_primaryLanguage?:boolean;
}
export interface configuredOS_languageInstance extends Sequelize.Instance<configuredOS_languageAttribute>, configuredOS_languageAttribute { }
export interface configuredOS_languageModel extends Sequelize.Model<configuredOS_languageInstance, configuredOS_languageAttribute> { }

// table: configuredSoftware
export interface configuredSoftwareAttribute {
  configuredSoftwareVersionID:number;
  executableLocation?:string;
  executableSyntax?:string;
  saveLocation?:string;
  configuredLanguage?:number;
  hasSource_softwareObjectID:number;
  hasSource_digitalObjectID?:number;
  manifestaionOf_softwareVersion?:number;
}
export interface configuredSoftwareInstance extends Sequelize.Instance<configuredSoftwareAttribute>, configuredSoftwareAttribute { }
export interface configuredSoftwareModel extends Sequelize.Model<configuredSoftwareInstance, configuredSoftwareAttribute> { }

// table: computingEnvironment
export interface computingEnvironmentAttribute {
  computingEnvironmentID:number;
  computingEnvironment_hasSourceOrg?:number;
  computingEnvironment_inNetwork?:boolean;
  computingEnvironment_configuredNetworkID?:number;
  computingEnvironment_softwareEnvironmentID?:number;
}
export interface computingEnvironmentInstance extends Sequelize.Instance<computingEnvironmentAttribute>, computingEnvironmentAttribute { }
export interface computingEnvironmentModel extends Sequelize.Model<computingEnvironmentInstance, computingEnvironmentAttribute> { }

// table: audioDevice
export interface audioDeviceAttribute {
  audioDeviceID:number;
  audioDeviceQID?:string;
  audioDeviceName:number;
}
export interface audioDeviceInstance extends Sequelize.Instance<audioDeviceAttribute>, audioDeviceAttribute { }
export interface audioDeviceModel extends Sequelize.Model<audioDeviceInstance, audioDeviceAttribute> { }

// table: audioDevice_hasEquivalent
export interface audioDevice_hasEquivalentAttribute {
  audioDevice_audioDeviceID:number;
  audioDevice_equivalentAudioDevice:number;
}
export interface audioDevice_hasEquivalentInstance extends Sequelize.Instance<audioDevice_hasEquivalentAttribute>, audioDevice_hasEquivalentAttribute { }
export interface audioDevice_hasEquivalentModel extends Sequelize.Model<audioDevice_hasEquivalentInstance, audioDevice_hasEquivalentAttribute> { }

// table: configuredStorageDevice
export interface configuredStorageDeviceAttribute {
  configuredMachine_machineID:number;
  configureStorageDevice_storageDeviceID:number;
  configuredStorageDevice_usesMachineInterface?:number;
  configuredStorageDevice_idBootOrder:number;
}
export interface configuredStorageDeviceInstance extends Sequelize.Instance<configuredStorageDeviceAttribute>, configuredStorageDeviceAttribute { }
export interface configuredStorageDeviceModel extends Sequelize.Model<configuredStorageDeviceInstance, configuredStorageDeviceAttribute> { }

// table: configuredSoftware_uses_formatImplementation
export interface configuredSoftware_uses_formatImplementationAttribute {
  configuredSoftware_configuredSoftwareManifestationID?:number;
  configuredSoftware_formatImplementation?:number;
  configuredFormatOperation?:number;
}
export interface configuredSoftware_uses_formatImplementationInstance extends Sequelize.Instance<configuredSoftware_uses_formatImplementationAttribute>, configuredSoftware_uses_formatImplementationAttribute { }
export interface configuredSoftware_uses_formatImplementationModel extends Sequelize.Model<configuredSoftware_uses_formatImplementationInstance, configuredSoftware_uses_formatImplementationAttribute> { }

// table: cpuArchitecture
export interface cpuArchitectureAttribute {
  cpuArchitectureQID:string;
  cpuArchitectureName:string;
}
export interface cpuArchitectureInstance extends Sequelize.Instance<cpuArchitectureAttribute>, cpuArchitectureAttribute { }
export interface cpuArchitectureModel extends Sequelize.Model<cpuArchitectureInstance, cpuArchitectureAttribute> { }

// table: configuredSoftware_has_event
export interface configuredSoftware_has_eventAttribute {
  configuredSoftware_configuredSoftwareManifestationID?:number;
  event_eventID?:number;
}
export interface configuredSoftware_has_eventInstance extends Sequelize.Instance<configuredSoftware_has_eventAttribute>, configuredSoftware_has_eventAttribute { }
export interface configuredSoftware_has_eventModel extends Sequelize.Model<configuredSoftware_has_eventInstance, configuredSoftware_has_eventAttribute> { }

// table: configuredSoftware_has_userInformation
export interface configuredSoftware_has_userInformationAttribute {
  configuredSoftware_configuredSoftwareManifestationID?:number;
  userInformation_userInformationID?:number;
}
export interface configuredSoftware_has_userInformationInstance extends Sequelize.Instance<configuredSoftware_has_userInformationAttribute>, configuredSoftware_has_userInformationAttribute { }
export interface configuredSoftware_has_userInformationModel extends Sequelize.Model<configuredSoftware_has_userInformationInstance, configuredSoftware_has_userInformationAttribute> { }

// table: digitalObject_isCompatibleWith_computingEnvironment
export interface digitalObject_isCompatibleWith_computingEnvironmentAttribute {
  digitalObject_digitalObjectID:number;
  compatibleComputingEnvironmentID:number;
}
export interface digitalObject_isCompatibleWith_computingEnvironmentInstance extends Sequelize.Instance<digitalObject_isCompatibleWith_computingEnvironmentAttribute>, digitalObject_isCompatibleWith_computingEnvironmentAttribute { }
export interface digitalObject_isCompatibleWith_computingEnvironmentModel extends Sequelize.Model<digitalObject_isCompatibleWith_computingEnvironmentInstance, digitalObject_isCompatibleWith_computingEnvironmentAttribute> { }

// table: digitalObject_has_objectFile
export interface digitalObject_has_objectFileAttribute {
  digitalObject_digitalObjectID:number;
  digitalObjectFileID:number;
  digitalObjectFileLabel?:string;
  digitalObjectFile_usesMountFormat?:string;
}
export interface digitalObject_has_objectFileInstance extends Sequelize.Instance<digitalObject_has_objectFileAttribute>, digitalObject_has_objectFileAttribute { }
export interface digitalObject_has_objectFileModel extends Sequelize.Model<digitalObject_has_objectFileInstance, digitalObject_has_objectFileAttribute> { }

// table: digitalObject_has_event
export interface digitalObject_has_eventAttribute {
  digitalObject_digialObjectID?:number;
  event_eventID?:number;
}
export interface digitalObject_has_eventInstance extends Sequelize.Instance<digitalObject_has_eventAttribute>, digitalObject_has_eventAttribute { }
export interface digitalObject_has_eventModel extends Sequelize.Model<digitalObject_has_eventInstance, digitalObject_has_eventAttribute> { }

// table: displayDevice
export interface displayDeviceAttribute {
  displayDeviceID:number;
  displayDeviceQID?:string;
  displayDeviceName?:string;
}
export interface displayDeviceInstance extends Sequelize.Instance<displayDeviceAttribute>, displayDeviceAttribute { }
export interface displayDeviceModel extends Sequelize.Model<displayDeviceInstance, displayDeviceAttribute> { }

// table: developer
export interface developerAttribute {
  developerQID:string;
  developerName:string;
}
export interface developerInstance extends Sequelize.Instance<developerAttribute>, developerAttribute { }
export interface developerModel extends Sequelize.Model<developerInstance, developerAttribute> { }

// table: digitalObject_has_alternativeID
export interface digitalObject_has_alternativeIDAttribute {
  digitalObject_digitalObjectID:number;
  alternativeID_alternativeID?:string;
}
export interface digitalObject_has_alternativeIDInstance extends Sequelize.Instance<digitalObject_has_alternativeIDAttribute>, digitalObject_has_alternativeIDAttribute { }
export interface digitalObject_has_alternativeIDModel extends Sequelize.Model<digitalObject_has_alternativeIDInstance, digitalObject_has_alternativeIDAttribute> { }

// table: digitalObjectFile_has_objectFileOperation
export interface digitalObjectFile_has_objectFileOperationAttribute {
  digitalObjectFile_digitalObjectID?:number;
  digitalObjectFile_fileID?:number;
  digitalObjectFile_operationID?:number;
  digitalObjectFile_operationOrder?:number;
}
export interface digitalObjectFile_has_objectFileOperationInstance extends Sequelize.Instance<digitalObjectFile_has_objectFileOperationAttribute>, digitalObjectFile_has_objectFileOperationAttribute { }
export interface digitalObjectFile_has_objectFileOperationModel extends Sequelize.Model<digitalObjectFile_has_objectFileOperationInstance, digitalObjectFile_has_objectFileOperationAttribute> { }

// table: digitalObject
export interface digitalObjectAttribute {
  digitalObjectID:number;
  digitalObjectName?:string;
  digitalObjectDescription?:string;
  digitalObjectProductKey?:string;
  digitalObjectHelpText?:string;
  digitalObjectSystemRequirements?:number;
}
export interface digitalObjectInstance extends Sequelize.Instance<digitalObjectAttribute>, digitalObjectAttribute { }
export interface digitalObjectModel extends Sequelize.Model<digitalObjectInstance, digitalObjectAttribute> { }

// table: displayDevice_has_displayInterface
export interface displayDevice_has_displayInterfaceAttribute {
  displayDevice_displayDeviceID:number;
  displayInterface_displayInterfaceID?:number;
}
export interface displayDevice_has_displayInterfaceInstance extends Sequelize.Instance<displayDevice_has_displayInterfaceAttribute>, displayDevice_has_displayInterfaceAttribute { }
export interface displayDevice_has_displayInterfaceModel extends Sequelize.Model<displayDevice_has_displayInterfaceInstance, displayDevice_has_displayInterfaceAttribute> { }

// table: displayDevice_has_displayResolution
export interface displayDevice_has_displayResolutionAttribute {
  displayDevice_displayDeviceID:number;
  availableDisplayResolution:number;
}
export interface displayDevice_has_displayResolutionInstance extends Sequelize.Instance<displayDevice_has_displayResolutionAttribute>, displayDevice_has_displayResolutionAttribute { }
export interface displayDevice_has_displayResolutionModel extends Sequelize.Model<displayDevice_has_displayResolutionInstance, displayDevice_has_displayResolutionAttribute> { }

// table: displayResolution
export interface displayResolutionAttribute {
  displayResolutionID:number;
  displayResolutionName:string;
}
export interface displayResolutionInstance extends Sequelize.Instance<displayResolutionAttribute>, displayResolutionAttribute { }
export interface displayResolutionModel extends Sequelize.Model<displayResolutionInstance, displayResolutionAttribute> { }

// table: displayDevice_has_driverSoftware
export interface displayDevice_has_driverSoftwareAttribute {
  displayDevice_displayDeviceID:number;
  displayDevice_driverSoftwareID:number;
}
export interface displayDevice_has_driverSoftwareInstance extends Sequelize.Instance<displayDevice_has_driverSoftwareAttribute>, displayDevice_has_driverSoftwareAttribute { }
export interface displayDevice_has_driverSoftwareModel extends Sequelize.Model<displayDevice_has_driverSoftwareInstance, displayDevice_has_driverSoftwareAttribute> { }

// table: fileFormat
export interface fileFormatAttribute {
  fileFormatQID:string;
  fileFormatName?:string;
  pronomID?:string;
}
export interface fileFormatInstance extends Sequelize.Instance<fileFormatAttribute>, fileFormatAttribute { }
export interface fileFormatModel extends Sequelize.Model<fileFormatInstance, fileFormatAttribute> { }

// table: fileExtension
export interface fileExtensionAttribute {
  fileExtensionID:number;
  extension:string;
}
export interface fileExtensionInstance extends Sequelize.Instance<fileExtensionAttribute>, fileExtensionAttribute { }
export interface fileExtensionModel extends Sequelize.Model<fileExtensionInstance, fileExtensionAttribute> { }

// table: fileSystem
export interface fileSystemAttribute {
  fileSystemQID:string;
  fileSystemName:number;
}
export interface fileSystemInstance extends Sequelize.Instance<fileSystemAttribute>, fileSystemAttribute { }
export interface fileSystemModel extends Sequelize.Model<fileSystemInstance, fileSystemAttribute> { }

// table: formatImplementation
export interface formatImplementationAttribute {
  formatImplementationID:number;
  formatImplementationName:string;
  implementationExtension?:number;
}
export interface formatImplementationInstance extends Sequelize.Instance<formatImplementationAttribute>, formatImplementationAttribute { }
export interface formatImplementationModel extends Sequelize.Model<formatImplementationInstance, formatImplementationAttribute> { }

// table: gpuDevice_hasEquivalent
export interface gpuDevice_hasEquivalentAttribute {
  gpuDevice_gpuDeviceID:number;
  gpuDevice_equivalentGpuDevice:number;
}
export interface gpuDevice_hasEquivalentInstance extends Sequelize.Instance<gpuDevice_hasEquivalentAttribute>, gpuDevice_hasEquivalentAttribute { }
export interface gpuDevice_hasEquivalentModel extends Sequelize.Model<gpuDevice_hasEquivalentInstance, gpuDevice_hasEquivalentAttribute> { }

// table: gpuDevice_has_displayInterface
export interface gpuDevice_has_displayInterfaceAttribute {
  gpuDevice_gpuDeviceID:number;
  displayInterface_displayInterfaceID:number;
}
export interface gpuDevice_has_displayInterfaceInstance extends Sequelize.Instance<gpuDevice_has_displayInterfaceAttribute>, gpuDevice_has_displayInterfaceAttribute { }
export interface gpuDevice_has_displayInterfaceModel extends Sequelize.Model<gpuDevice_has_displayInterfaceInstance, gpuDevice_has_displayInterfaceAttribute> { }

// table: file
export interface fileAttribute {
  fileID:number;
  fileLocation?:string;
  fileName?:string;
  fileChecksum?:string;
  fileFormat?:string;
  fileSize?:string;
}
export interface fileInstance extends Sequelize.Instance<fileAttribute>, fileAttribute { }
export interface fileModel extends Sequelize.Model<fileInstance, fileAttribute> { }

// table: displayDevice_has_colorDepth
export interface displayDevice_has_colorDepthAttribute {
  displayDevice_displayDeviceID:number;
  colorDepth_colorDepthID?:number;
}
export interface displayDevice_has_colorDepthInstance extends Sequelize.Instance<displayDevice_has_colorDepthAttribute>, displayDevice_has_colorDepthAttribute { }
export interface displayDevice_has_colorDepthModel extends Sequelize.Model<displayDevice_has_colorDepthInstance, displayDevice_has_colorDepthAttribute> { }

// table: gpuDevice_has_machineInterface
export interface gpuDevice_has_machineInterfaceAttribute {
  gpuDevice_gpuDeviceID:number;
  gpuDevice_machineInterfaceID:number;
}
export interface gpuDevice_has_machineInterfaceInstance extends Sequelize.Instance<gpuDevice_has_machineInterfaceAttribute>, gpuDevice_has_machineInterfaceAttribute { }
export interface gpuDevice_has_machineInterfaceModel extends Sequelize.Model<gpuDevice_has_machineInterfaceInstance, gpuDevice_has_machineInterfaceAttribute> { }

// table: gpuDevice_has_driverSoftware
export interface gpuDevice_has_driverSoftwareAttribute {
  gpuDevice_gpuDeviceID:number;
  gpuDevice_driverSoftwareID:number;
}
export interface gpuDevice_has_driverSoftwareInstance extends Sequelize.Instance<gpuDevice_has_driverSoftwareAttribute>, gpuDevice_has_driverSoftwareAttribute { }
export interface gpuDevice_has_driverSoftwareModel extends Sequelize.Model<gpuDevice_has_driverSoftwareInstance, gpuDevice_has_driverSoftwareAttribute> { }

// table: formatOperation
export interface formatOperationAttribute {
  operationID:number;
  operationName:string;
}
export interface formatOperationInstance extends Sequelize.Instance<formatOperationAttribute>, formatOperationAttribute { }
export interface formatOperationModel extends Sequelize.Model<formatOperationInstance, formatOperationAttribute> { }

// table: fileFormat_has_fileExtension
export interface fileFormat_has_fileExtensionAttribute {
  fileFormat_fileFormatQID:string;
  fileExtension_fileExtensionID:number;
}
export interface fileFormat_has_fileExtensionInstance extends Sequelize.Instance<fileFormat_has_fileExtensionAttribute>, fileFormat_has_fileExtensionAttribute { }
export interface fileFormat_has_fileExtensionModel extends Sequelize.Model<fileFormat_has_fileExtensionInstance, fileFormat_has_fileExtensionAttribute> { }

// table: gpuDevice
export interface gpuDeviceAttribute {
  gpuDeviceID:number;
  gpuDeviceQID?:string;
  gpuDeviceName:string;
}
export interface gpuDeviceInstance extends Sequelize.Instance<gpuDeviceAttribute>, gpuDeviceAttribute { }
export interface gpuDeviceModel extends Sequelize.Model<gpuDeviceInstance, gpuDeviceAttribute> { }

// table: keyboardDevice_has_driverSoftware
export interface keyboardDevice_has_driverSoftwareAttribute {
  keyboardDevice_keyboardDeviceID?:number;
  keyboardDevice_driverSoftware:number;
}
export interface keyboardDevice_has_driverSoftwareInstance extends Sequelize.Instance<keyboardDevice_has_driverSoftwareAttribute>, keyboardDevice_has_driverSoftwareAttribute { }
export interface keyboardDevice_has_driverSoftwareModel extends Sequelize.Model<keyboardDevice_has_driverSoftwareInstance, keyboardDevice_has_driverSoftwareAttribute> { }

// table: keyboardDevice_has_language
export interface keyboardDevice_has_languageAttribute {
  keyboardDevice_keyboardDeviceID:number;
  keyboardDevice_languageQID:string;
}
export interface keyboardDevice_has_languageInstance extends Sequelize.Instance<keyboardDevice_has_languageAttribute>, keyboardDevice_has_languageAttribute { }
export interface keyboardDevice_has_languageModel extends Sequelize.Model<keyboardDevice_has_languageInstance, keyboardDevice_has_languageAttribute> { }

// table: keyboardDevice_has_machineInterfaceID
export interface keyboardDevice_has_machineInterfaceIDAttribute {
  keyboardDevice_keyboardDeviceID:number;
  keyboardDevice_machineInterfaceID:number;
}
export interface keyboardDevice_has_machineInterfaceIDInstance extends Sequelize.Instance<keyboardDevice_has_machineInterfaceIDAttribute>, keyboardDevice_has_machineInterfaceIDAttribute { }
export interface keyboardDevice_has_machineInterfaceIDModel extends Sequelize.Model<keyboardDevice_has_machineInterfaceIDInstance, keyboardDevice_has_machineInterfaceIDAttribute> { }

// table: machineType
export interface machineTypeAttribute {
  machineTypeID:number;
  machineTypeName:string;
}
export interface machineTypeInstance extends Sequelize.Instance<machineTypeAttribute>, machineTypeAttribute { }
export interface machineTypeModel extends Sequelize.Model<machineTypeInstance, machineTypeAttribute> { }

// table: keyboardDevice
export interface keyboardDeviceAttribute {
  keyboardDeviceID:number;
  keyboardDeviceQID?:string;
  keyboardDeviceName:string;
  keyboardDevice_keyboardLayout?:string;
}
export interface keyboardDeviceInstance extends Sequelize.Instance<keyboardDeviceAttribute>, keyboardDeviceAttribute { }
export interface keyboardDeviceModel extends Sequelize.Model<keyboardDeviceInstance, keyboardDeviceAttribute> { }

// table: mountFormat
export interface mountFormatAttribute {
  mountFormatQID:string;
  mountFormatName:string;
}
export interface mountFormatInstance extends Sequelize.Instance<mountFormatAttribute>, mountFormatAttribute { }
export interface mountFormatModel extends Sequelize.Model<mountFormatInstance, mountFormatAttribute> { }

// table: networkDevice_has_driverSoftware
export interface networkDevice_has_driverSoftwareAttribute {
  networkDevice_networkDeviceID?:number;
  driverSoftware_driverSoftware?:number;
}
export interface networkDevice_has_driverSoftwareInstance extends Sequelize.Instance<networkDevice_has_driverSoftwareAttribute>, networkDevice_has_driverSoftwareAttribute { }
export interface networkDevice_has_driverSoftwareModel extends Sequelize.Model<networkDevice_has_driverSoftwareInstance, networkDevice_has_driverSoftwareAttribute> { }

// table: networkService
export interface networkServiceAttribute {
  networkServiceID:number;
  networkServiceName:string;
  networkServiceQID?:string;
  defaultPort?:string;
  defaultPortRange?:string;
}
export interface networkServiceInstance extends Sequelize.Instance<networkServiceAttribute>, networkServiceAttribute { }
export interface networkServiceModel extends Sequelize.Model<networkServiceInstance, networkServiceAttribute> { }

// table: objectEnvironment
export interface objectEnvironmentAttribute {
  objectEnvironment_objectEnvironment_computingEnvironmentID:number;
  objectEnvironment_objectEnvironment_digitalObjectID?:number;
  objectEnvironment_concurrentInstances?:number;
  objectEnvironmentName?:string;
  objectEnvironmentDescription?:string;
  objectEnvironmentHelpText?:string;
}
export interface objectEnvironmentInstance extends Sequelize.Instance<objectEnvironmentAttribute>, objectEnvironmentAttribute { }
export interface objectEnvironmentModel extends Sequelize.Model<objectEnvironmentInstance, objectEnvironmentAttribute> { }

// table: keyboardLayout
export interface keyboardLayoutAttribute {
  keyboardLayoutQID:string;
  keyboardLayoutName:string;
}
export interface keyboardLayoutInstance extends Sequelize.Instance<keyboardLayoutAttribute>, keyboardLayoutAttribute { }
export interface keyboardLayoutModel extends Sequelize.Model<keyboardLayoutInstance, keyboardLayoutAttribute> { }

// table: networkDevice
export interface networkDeviceAttribute {
  networkDeviceID:number;
  networkDeviceQID?:string;
  networkDeviceName:string;
}
export interface networkDeviceInstance extends Sequelize.Instance<networkDeviceAttribute>, networkDeviceAttribute { }
export interface networkDeviceModel extends Sequelize.Model<networkDeviceInstance, networkDeviceAttribute> { }

// table: osVersion_languageSettings
export interface osVersion_languageSettingsAttribute {
  osVersion_osVersionID:number;
  osVersion_languageQID?:number;
  osVersion_DefaultLanguage?:boolean;
}
export interface osVersion_languageSettingsInstance extends Sequelize.Instance<osVersion_languageSettingsAttribute>, osVersion_languageSettingsAttribute { }
export interface osVersion_languageSettingsModel extends Sequelize.Model<osVersion_languageSettingsInstance, osVersion_languageSettingsAttribute> { }

// table: networkDevice_has_machineInterface
export interface networkDevice_has_machineInterfaceAttribute {
  networkDevice_networkDeviceID:number;
  networkDevice_machineInterfaceID?:number;
}
export interface networkDevice_has_machineInterfaceInstance extends Sequelize.Instance<networkDevice_has_machineInterfaceAttribute>, networkDevice_has_machineInterfaceAttribute { }
export interface networkDevice_has_machineInterfaceModel extends Sequelize.Model<networkDevice_has_machineInterfaceInstance, networkDevice_has_machineInterfaceAttribute> { }

// table: objectEnvironment_has_event
export interface objectEnvironment_has_eventAttribute {
  objectEnvironment_objectEnvironment_computingEnvironmentID?:number;
  objectEnvironment_objectEnvironment_digitalObjectID?:number;
  event_eventID?:number;
}
export interface objectEnvironment_has_eventInstance extends Sequelize.Instance<objectEnvironment_has_eventAttribute>, objectEnvironment_has_eventAttribute { }
export interface objectEnvironment_has_eventModel extends Sequelize.Model<objectEnvironment_has_eventInstance, objectEnvironment_has_eventAttribute> { }

// table: osVersion_displayResolutionSettings
export interface osVersion_displayResolutionSettingsAttribute {
  osVersion_osVersionID:number;
  osVersion_displayResolutionID:number;
}
export interface osVersion_displayResolutionSettingsInstance extends Sequelize.Instance<osVersion_displayResolutionSettingsAttribute>, osVersion_displayResolutionSettingsAttribute { }
export interface osVersion_displayResolutionSettingsModel extends Sequelize.Model<osVersion_displayResolutionSettingsInstance, osVersion_displayResolutionSettingsAttribute> { }

// table: osVersion_includes_softwareVersion
export interface osVersion_includes_softwareVersionAttribute {
  osVersion_osVersionID:number;
  osVersion_softwareVersionID:number;
}
export interface osVersion_includes_softwareVersionInstance extends Sequelize.Instance<osVersion_includes_softwareVersionAttribute>, osVersion_includes_softwareVersionAttribute { }
export interface osVersion_includes_softwareVersionModel extends Sequelize.Model<osVersion_includes_softwareVersionInstance, osVersion_includes_softwareVersionAttribute> { }

// table: osVersion_has_developer
export interface osVersion_has_developerAttribute {
  osVersion_osVersionID:number;
  osVersion_developerQID:string;
}
export interface osVersion_has_developerInstance extends Sequelize.Instance<osVersion_has_developerAttribute>, osVersion_has_developerAttribute { }
export interface osVersion_has_developerModel extends Sequelize.Model<osVersion_has_developerInstance, osVersion_has_developerAttribute> { }

// table: osVersion
export interface osVersionAttribute {
  osVersionID:number;
  osVersionQID?:number;
  osVersionName?:string;
  osVersionDescription?:string;
  osVersionNumber?:string;
  osVersionPublicationDate?:Date;
  osVersionSystemRequirements:number;
  isVersionOf_osProduct?:number;
}
export interface osVersionInstance extends Sequelize.Instance<osVersionAttribute>, osVersionAttribute { }
export interface osVersionModel extends Sequelize.Model<osVersionInstance, osVersionAttribute> { }

// table: osVersion_has_programmingLanguage
export interface osVersion_has_programmingLanguageAttribute {
  osVersion_osVersionID:number;
  osVersion_programmingLanguageQID:string;
}
export interface osVersion_has_programmingLanguageInstance extends Sequelize.Instance<osVersion_has_programmingLanguageAttribute>, osVersion_has_programmingLanguageAttribute { }
export interface osVersion_has_programmingLanguageModel extends Sequelize.Model<osVersion_has_programmingLanguageInstance, osVersion_has_programmingLanguageAttribute> { }

// table: programmingLanguage
export interface programmingLanguageAttribute {
  programmingLanguageQID:string;
  programmingLanguageName:string;
}
export interface programmingLanguageInstance extends Sequelize.Instance<programmingLanguageAttribute>, programmingLanguageAttribute { }
export interface programmingLanguageModel extends Sequelize.Model<programmingLanguageInstance, programmingLanguageAttribute> { }

// table: osVersion_isCompatibleWith_configuredMachine
export interface osVersion_isCompatibleWith_configuredMachineAttribute {
  osVersion_osVersionID:number;
  compatibleMachineID?:number;
}
export interface osVersion_isCompatibleWith_configuredMachineInstance extends Sequelize.Instance<osVersion_isCompatibleWith_configuredMachineAttribute>, osVersion_isCompatibleWith_configuredMachineAttribute { }
export interface osVersion_isCompatibleWith_configuredMachineModel extends Sequelize.Model<osVersion_isCompatibleWith_configuredMachineInstance, osVersion_isCompatibleWith_configuredMachineAttribute> { }

// table: osVersion_keyboardLayoutSettings
export interface osVersion_keyboardLayoutSettingsAttribute {
  osVersion_osVersionID:number;
  osVersion_keyboardLayoutQID:string;
  osVersion_keyboardLayoutName?:string;
}
export interface osVersion_keyboardLayoutSettingsInstance extends Sequelize.Instance<osVersion_keyboardLayoutSettingsAttribute>, osVersion_keyboardLayoutSettingsAttribute { }
export interface osVersion_keyboardLayoutSettingsModel extends Sequelize.Model<osVersion_keyboardLayoutSettingsInstance, osVersion_keyboardLayoutSettingsAttribute> { }

// table: osVersion_keyboardLanguageSettings
export interface osVersion_keyboardLanguageSettingsAttribute {
  osVersion_osVersionID:number;
  osVersion_keyboardLanguageQID:string;
}
export interface osVersion_keyboardLanguageSettingsInstance extends Sequelize.Instance<osVersion_keyboardLanguageSettingsAttribute>, osVersion_keyboardLanguageSettingsAttribute { }
export interface osVersion_keyboardLanguageSettingsModel extends Sequelize.Model<osVersion_keyboardLanguageSettingsInstance, osVersion_keyboardLanguageSettingsAttribute> { }

// table: osVersion_keyboardSetting
export interface osVersion_keyboardSettingAttribute {
  osVersion_osVersionID:number;
  osVersion_keyboardSettingLanguage:string;
  osVersion_keyboardSettingLayout?:string;
  osVersion_keyboardSettingName?:string;
}
export interface osVersion_keyboardSettingInstance extends Sequelize.Instance<osVersion_keyboardSettingAttribute>, osVersion_keyboardSettingAttribute { }
export interface osVersion_keyboardSettingModel extends Sequelize.Model<osVersion_keyboardSettingInstance, osVersion_keyboardSettingAttribute> { }

// table: osVersion_has_alternateID
export interface osVersion_has_alternateIDAttribute {
  osVersion_osVersionID?:number;
  osVersion_alternativeID:string;
}
export interface osVersion_has_alternateIDInstance extends Sequelize.Instance<osVersion_has_alternateIDAttribute>, osVersion_has_alternateIDAttribute { }
export interface osVersion_has_alternateIDModel extends Sequelize.Model<osVersion_has_alternateIDInstance, osVersion_has_alternateIDAttribute> { }

// table: readWriteStatus
export interface readWriteStatusAttribute {
  readWriteStatusID:number;
  readWriteStatusName:string;
}
export interface readWriteStatusInstance extends Sequelize.Instance<readWriteStatusAttribute>, readWriteStatusAttribute { }
export interface readWriteStatusModel extends Sequelize.Model<readWriteStatusInstance, readWriteStatusAttribute> { }

// table: osVersion_regionSettings
export interface osVersion_regionSettingsAttribute {
  osVersion_osVersionID?:number;
  osVersion_regionQID?:string;
  osVersion_defaultRegion?:boolean;
}
export interface osVersion_regionSettingsInstance extends Sequelize.Instance<osVersion_regionSettingsAttribute>, osVersion_regionSettingsAttribute { }
export interface osVersion_regionSettingsModel extends Sequelize.Model<osVersion_regionSettingsInstance, osVersion_regionSettingsAttribute> { }

// table: osVersion_timeZoneSettings
export interface osVersion_timeZoneSettingsAttribute {
  osVersion_osVersionID?:number;
  osVersion_timezoneQID?:string;
  osVersion_timezoneName?:string;
}
export interface osVersion_timeZoneSettingsInstance extends Sequelize.Instance<osVersion_timeZoneSettingsAttribute>, osVersion_timeZoneSettingsAttribute { }
export interface osVersion_timeZoneSettingsModel extends Sequelize.Model<osVersion_timeZoneSettingsInstance, osVersion_timeZoneSettingsAttribute> { }

// table: osVersion_colorDepthSettings
export interface osVersion_colorDepthSettingsAttribute {
  osVersion_osVersionID:number;
  osVersion_colorDepthID:number;
}
export interface osVersion_colorDepthSettingsInstance extends Sequelize.Instance<osVersion_colorDepthSettingsAttribute>, osVersion_colorDepthSettingsAttribute { }
export interface osVersion_colorDepthSettingsModel extends Sequelize.Model<osVersion_colorDepthSettingsInstance, osVersion_colorDepthSettingsAttribute> { }

// table: objectFileOperation
export interface objectFileOperationAttribute {
  operationID:number;
  operationName:string;
}
export interface objectFileOperationInstance extends Sequelize.Instance<objectFileOperationAttribute>, objectFileOperationAttribute { }
export interface objectFileOperationModel extends Sequelize.Model<objectFileOperationInstance, objectFileOperationAttribute> { }

// table: pointerDevice_has_driverSoftware
export interface pointerDevice_has_driverSoftwareAttribute {
  pointerDevice_pointerDeviceID:number;
  pointerDevice_driverSoftwareID:number;
}
export interface pointerDevice_has_driverSoftwareInstance extends Sequelize.Instance<pointerDevice_has_driverSoftwareAttribute>, pointerDevice_has_driverSoftwareAttribute { }
export interface pointerDevice_has_driverSoftwareModel extends Sequelize.Model<pointerDevice_has_driverSoftwareInstance, pointerDevice_has_driverSoftwareAttribute> { }

// table: pointerDeviceType
export interface pointerDeviceTypeAttribute {
  pointerDeviceTypeID:number;
  pointerDeviceTypeName:string;
  pointerDeviceTypeQID?:string;
}
export interface pointerDeviceTypeInstance extends Sequelize.Instance<pointerDeviceTypeAttribute>, pointerDeviceTypeAttribute { }
export interface pointerDeviceTypeModel extends Sequelize.Model<pointerDeviceTypeInstance, pointerDeviceTypeAttribute> { }

// table: pointerDevice_has_machineInterface
export interface pointerDevice_has_machineInterfaceAttribute {
  pointerDevice_pointerDeviceID:number;
  pointerDevice_machineInterfaceID:number;
}
export interface pointerDevice_has_machineInterfaceInstance extends Sequelize.Instance<pointerDevice_has_machineInterfaceAttribute>, pointerDevice_has_machineInterfaceAttribute { }
export interface pointerDevice_has_machineInterfaceModel extends Sequelize.Model<pointerDevice_has_machineInterfaceInstance, pointerDevice_has_machineInterfaceAttribute> { }

// table: osVersion_has_softwareLicense
export interface osVersion_has_softwareLicenseAttribute {
  osVersion_osVersionID:number;
  osVersion_softwareLicenseQID:string;
}
export interface osVersion_has_softwareLicenseInstance extends Sequelize.Instance<osVersion_has_softwareLicenseAttribute>, osVersion_has_softwareLicenseAttribute { }
export interface osVersion_has_softwareLicenseModel extends Sequelize.Model<osVersion_has_softwareLicenseInstance, osVersion_has_softwareLicenseAttribute> { }

// table: pointerDevice
export interface pointerDeviceAttribute {
  pointerDeviceID:number;
  pointerDeviceQID?:string;
  pointerDeviceName:string;
  pointerDeviceType:number;
}
export interface pointerDeviceInstance extends Sequelize.Instance<pointerDeviceAttribute>, pointerDeviceAttribute { }
export interface pointerDeviceModel extends Sequelize.Model<pointerDeviceInstance, pointerDeviceAttribute> { }

// table: softwareProduct
export interface softwareProductAttribute {
  softwareProductID:number;
  softwareProductQID:string;
  softwareProductDescription?:string;
  softwareProductName:string;
}
export interface softwareProductInstance extends Sequelize.Instance<softwareProductAttribute>, softwareProductAttribute { }
export interface softwareProductModel extends Sequelize.Model<softwareProductInstance, softwareProductAttribute> { }

// table: softwareObject_has_event
export interface softwareObject_has_eventAttribute {
  softwareObject_softwareObjectID?:number;
  event_eventID?:number;
}
export interface softwareObject_has_eventInstance extends Sequelize.Instance<softwareObject_has_eventAttribute>, softwareObject_has_eventAttribute { }
export interface softwareObject_has_eventModel extends Sequelize.Model<softwareObject_has_eventInstance, softwareObject_has_eventAttribute> { }

// table: softwareEnvironment_has_event
export interface softwareEnvironment_has_eventAttribute {
  softwareEnvironment_softwareEnvironmentID:number;
  event_eventID:number;
}
export interface softwareEnvironment_has_eventInstance extends Sequelize.Instance<softwareEnvironment_has_eventAttribute>, softwareEnvironment_has_eventAttribute { }
export interface softwareEnvironment_has_eventModel extends Sequelize.Model<softwareEnvironment_has_eventInstance, softwareEnvironment_has_eventAttribute> { }

// table: softwareObject_isManifestationOf_osVersion
export interface softwareObject_isManifestationOf_osVersionAttribute {
  softwareObject_softwareObjectID?:number;
  softwareObject_osVersionID?:number;
}
export interface softwareObject_isManifestationOf_osVersionInstance extends Sequelize.Instance<softwareObject_isManifestationOf_osVersionAttribute>, softwareObject_isManifestationOf_osVersionAttribute { }
export interface softwareObject_isManifestationOf_osVersionModel extends Sequelize.Model<softwareObject_isManifestationOf_osVersionInstance, softwareObject_isManifestationOf_osVersionAttribute> { }

// table: softwareFamily_hasPart_softwareProduct
export interface softwareFamily_hasPart_softwareProductAttribute {
  softwarefamilyid:number;
  haspart_softwareproduct:number;
}
export interface softwareFamily_hasPart_softwareProductInstance extends Sequelize.Instance<softwareFamily_hasPart_softwareProductAttribute>, softwareFamily_hasPart_softwareProductAttribute { }
export interface softwareFamily_hasPart_softwareProductModel extends Sequelize.Model<softwareFamily_hasPart_softwareProductInstance, softwareFamily_hasPart_softwareProductAttribute> { }

// table: softwareObject
export interface softwareObjectAttribute {
  softwareObjectID:number;
  softwareObject_inNetwork:boolean;
  softwareObject_hasSourceOrg?:number;
  softwareObjectProductKey?:string;
  softwareObjectHelpText?:string;
}
export interface softwareObjectInstance extends Sequelize.Instance<softwareObjectAttribute>, softwareObjectAttribute { }
export interface softwareObjectModel extends Sequelize.Model<softwareObjectInstance, softwareObjectAttribute> { }

// table: softwareObject_has_objectFile
export interface softwareObject_has_objectFileAttribute {
  softwareObject_softwareObjectID:number;
  softwareObjectFileID:number;
  softwareObjectFileLabel?:string;
  softwareObjectFile_usesMountFormat?:string;
}
export interface softwareObject_has_objectFileInstance extends Sequelize.Instance<softwareObject_has_objectFileAttribute>, softwareObject_has_objectFileAttribute { }
export interface softwareObject_has_objectFileModel extends Sequelize.Model<softwareObject_has_objectFileInstance, softwareObject_has_objectFileAttribute> { }

// table: softwareVersion_has_alternateID
export interface softwareVersion_has_alternateIDAttribute {
  softwareVersion_softwareVersionID:number;
  softwareVersion_alternateID:string;
}
export interface softwareVersion_has_alternateIDInstance extends Sequelize.Instance<softwareVersion_has_alternateIDAttribute>, softwareVersion_has_alternateIDAttribute { }
export interface softwareVersion_has_alternateIDModel extends Sequelize.Model<softwareVersion_has_alternateIDInstance, softwareVersion_has_alternateIDAttribute> { }

// table: region
export interface regionAttribute {
  regionQID:string;
  regionName:string;
  iso31661_numericCode?:number;
}
export interface regionInstance extends Sequelize.Instance<regionAttribute>, regionAttribute { }
export interface regionModel extends Sequelize.Model<regionInstance, regionAttribute> { }

// table: softwareObject_has_alternateID
export interface softwareObject_has_alternateIDAttribute {
  softwareObject_softwareObjectID?:number;
  softwareObject_alternateID?:string;
}
export interface softwareObject_has_alternateIDInstance extends Sequelize.Instance<softwareObject_has_alternateIDAttribute>, softwareObject_has_alternateIDAttribute { }
export interface softwareObject_has_alternateIDModel extends Sequelize.Model<softwareObject_has_alternateIDInstance, softwareObject_has_alternateIDAttribute> { }

// table: softwareProduct_has_softwareType
export interface softwareProduct_has_softwareTypeAttribute {
  softwareProduct_softwareProductID:number;
  softwareProduct_softwareTypeQID:string;
}
export interface softwareProduct_has_softwareTypeInstance extends Sequelize.Instance<softwareProduct_has_softwareTypeAttribute>, softwareProduct_has_softwareTypeAttribute { }
export interface softwareProduct_has_softwareTypeModel extends Sequelize.Model<softwareProduct_has_softwareTypeInstance, softwareProduct_has_softwareTypeAttribute> { }

// table: softwareObject_isManifestationOf_softwareVersion
export interface softwareObject_isManifestationOf_softwareVersionAttribute {
  softwareObject_softwareObjectID:number;
  softwareObject_softwareVersionID:number;
}
export interface softwareObject_isManifestationOf_softwareVersionInstance extends Sequelize.Instance<softwareObject_isManifestationOf_softwareVersionAttribute>, softwareObject_isManifestationOf_softwareVersionAttribute { }
export interface softwareObject_isManifestationOf_softwareVersionModel extends Sequelize.Model<softwareObject_isManifestationOf_softwareVersionInstance, softwareObject_isManifestationOf_softwareVersionAttribute> { }

// table: softwareVersion_has_developer
export interface softwareVersion_has_developerAttribute {
  softwareVersion_softwareVersionID?:number;
  softwareVersion_softwareDeveloperQID?:string;
}
export interface softwareVersion_has_developerInstance extends Sequelize.Instance<softwareVersion_has_developerAttribute>, softwareVersion_has_developerAttribute { }
export interface softwareVersion_has_developerModel extends Sequelize.Model<softwareVersion_has_developerInstance, softwareVersion_has_developerAttribute> { }

// table: softwareEnvironment_has_diskImage
export interface softwareEnvironment_has_diskImageAttribute {
  softwareEnvironment_softwareEnvironmentID:number;
  diskImageID?:string;
  mountPoint?:string;
  fileSystem?:string;
  storageCapacityBytes?:number;
  storageUsedBytes?:number;
  storageRemainingBytes?:number;
}
export interface softwareEnvironment_has_diskImageInstance extends Sequelize.Instance<softwareEnvironment_has_diskImageAttribute>, softwareEnvironment_has_diskImageAttribute { }
export interface softwareEnvironment_has_diskImageModel extends Sequelize.Model<softwareEnvironment_has_diskImageInstance, softwareEnvironment_has_diskImageAttribute> { }

// table: softwareObjectFile_has_objectFileOperation
export interface softwareObjectFile_has_objectFileOperationAttribute {
  softwareObjectFile_softwareObjectID?:number;
  softwareObjectFile_fileID?:number;
  softwareObjectFile_operationID?:number;
  softwareObjectFile_operationOrder?:number;
}
export interface softwareObjectFile_has_objectFileOperationInstance extends Sequelize.Instance<softwareObjectFile_has_objectFileOperationAttribute>, softwareObjectFile_has_objectFileOperationAttribute { }
export interface softwareObjectFile_has_objectFileOperationModel extends Sequelize.Model<softwareObjectFile_has_objectFileOperationInstance, softwareObjectFile_has_objectFileOperationAttribute> { }

// table: softwareType
export interface softwareTypeAttribute {
  softwareTypeQID:string;
  softwaretypename:string;
}
export interface softwareTypeInstance extends Sequelize.Instance<softwareTypeAttribute>, softwareTypeAttribute { }
export interface softwareTypeModel extends Sequelize.Model<softwareTypeInstance, softwareTypeAttribute> { }

// table: softwareFamilyVersion_hasPart_softwareVersion
export interface softwareFamilyVersion_hasPart_softwareVersionAttribute {
  softwareFamilyVersionID:number;
  hasPart_softwareVersion:number;
}
export interface softwareFamilyVersion_hasPart_softwareVersionInstance extends Sequelize.Instance<softwareFamilyVersion_hasPart_softwareVersionAttribute>, softwareFamilyVersion_hasPart_softwareVersionAttribute { }
export interface softwareFamilyVersion_hasPart_softwareVersionModel extends Sequelize.Model<softwareFamilyVersion_hasPart_softwareVersionInstance, softwareFamilyVersion_hasPart_softwareVersionAttribute> { }

// table: softwareVersion_has_formatImplementation
export interface softwareVersion_has_formatImplementationAttribute {
  softwareVersion_softwareVersionID:number;
  softwareVersion_formatImplementationID:number;
  softwareVersion_implementationOperation?:number;
  defaultImplementation?:boolean;
}
export interface softwareVersion_has_formatImplementationInstance extends Sequelize.Instance<softwareVersion_has_formatImplementationAttribute>, softwareVersion_has_formatImplementationAttribute { }
export interface softwareVersion_has_formatImplementationModel extends Sequelize.Model<softwareVersion_has_formatImplementationInstance, softwareVersion_has_formatImplementationAttribute> { }

// table: softwareEnvironment
export interface softwareEnvironmentAttribute {
  softwareEnvironmentID:number;
  softwareEnvironmentName?:string;
  softwareEnvironmentDescription?:string;
  softwareEnvironmentHelpText?:string;
  derivedFrom_softwareEnvironment?:number;
  softwareEnvironment_hasPart_configuredOS?:number;
}
export interface softwareEnvironmentInstance extends Sequelize.Instance<softwareEnvironmentAttribute>, softwareEnvironmentAttribute { }
export interface softwareEnvironmentModel extends Sequelize.Model<softwareEnvironmentInstance, softwareEnvironmentAttribute> { }

// table: softwareLicense
export interface softwareLicenseAttribute {
  softwareLicenseQID:string;
  softwareLicenseName:string;
}
export interface softwareLicenseInstance extends Sequelize.Instance<softwareLicenseAttribute>, softwareLicenseAttribute { }
export interface softwareLicenseModel extends Sequelize.Model<softwareLicenseInstance, softwareLicenseAttribute> { }

// table: softwareVersion_has_programmingLanguage
export interface softwareVersion_has_programmingLanguageAttribute {
  softwareVersion_softwareVersionID:number;
  softwareVersion_programmingLanguageQID?:string;
}
export interface softwareVersion_has_programmingLanguageInstance extends Sequelize.Instance<softwareVersion_has_programmingLanguageAttribute>, softwareVersion_has_programmingLanguageAttribute { }
export interface softwareVersion_has_programmingLanguageModel extends Sequelize.Model<softwareVersion_has_programmingLanguageInstance, softwareVersion_has_programmingLanguageAttribute> { }

// table: softwareVersion_has_softwareLicense
export interface softwareVersion_has_softwareLicenseAttribute {
  softwareVersion_softwareVersionID:number;
  softwareVersion_softwareLicenseQID?:string;
}
export interface softwareVersion_has_softwareLicenseInstance extends Sequelize.Instance<softwareVersion_has_softwareLicenseAttribute>, softwareVersion_has_softwareLicenseAttribute { }
export interface softwareVersion_has_softwareLicenseModel extends Sequelize.Model<softwareVersion_has_softwareLicenseInstance, softwareVersion_has_softwareLicenseAttribute> { }

// table: softwareProduct_has_alternateName
export interface softwareProduct_has_alternateNameAttribute {
  softwareProduct_softwareProductID:number;
  softwareProduct_alternateNameID:number;
}
export interface softwareProduct_has_alternateNameInstance extends Sequelize.Instance<softwareProduct_has_alternateNameAttribute>, softwareProduct_has_alternateNameAttribute { }
export interface softwareProduct_has_alternateNameModel extends Sequelize.Model<softwareProduct_has_alternateNameInstance, softwareProduct_has_alternateNameAttribute> { }

// table: softwareVersion_languageSettings
export interface softwareVersion_languageSettingsAttribute {
  softwareVersion_softwareVersionID?:number;
  softwareVersion_languageQID?:string;
  softwareVersion_defaultLanguage:boolean;
}
export interface softwareVersion_languageSettingsInstance extends Sequelize.Instance<softwareVersion_languageSettingsAttribute>, softwareVersion_languageSettingsAttribute { }
export interface softwareVersion_languageSettingsModel extends Sequelize.Model<softwareVersion_languageSettingsInstance, softwareVersion_languageSettingsAttribute> { }

// table: softwareVersion
export interface softwareVersionAttribute {
  softwareVersionID:number;
  softwareVersionQID?:string;
  softwareVersionName:string;
  softwareVersionDescription:string;
  softwareVersionNumber?:string;
  softwareVersionPublicationDate?:Date;
  softwareVersionSystemRequirements:number;
  isVersionOf_softwareProduct?:number;
}
export interface softwareVersionInstance extends Sequelize.Instance<softwareVersionAttribute>, softwareVersionAttribute { }
export interface softwareVersionModel extends Sequelize.Model<softwareVersionInstance, softwareVersionAttribute> { }

// table: storageDevice_has_driverSoftware
export interface storageDevice_has_driverSoftwareAttribute {
  storageDevice_storageDeviceID:number;
  storageDevice_driverSoftwareID:number;
}
export interface storageDevice_has_driverSoftwareInstance extends Sequelize.Instance<storageDevice_has_driverSoftwareAttribute>, storageDevice_has_driverSoftwareAttribute { }
export interface storageDevice_has_driverSoftwareModel extends Sequelize.Model<storageDevice_has_driverSoftwareInstance, storageDevice_has_driverSoftwareAttribute> { }

// table: systemRequirements_includes_osVersion
export interface systemRequirements_includes_osVersionAttribute {
  systemRequirements_systemRequirementsID:number;
  systemRequirements_osVersionID?:number;
}
export interface systemRequirements_includes_osVersionInstance extends Sequelize.Instance<systemRequirements_includes_osVersionAttribute>, systemRequirements_includes_osVersionAttribute { }
export interface systemRequirements_includes_osVersionModel extends Sequelize.Model<systemRequirements_includes_osVersionInstance, systemRequirements_includes_osVersionAttribute> { }

// table: timezone
export interface timezoneAttribute {
  timezoneQID:string;
  utcOffset?:string;
}
export interface timezoneInstance extends Sequelize.Instance<timezoneAttribute>, timezoneAttribute { }
export interface timezoneModel extends Sequelize.Model<timezoneInstance, timezoneAttribute> { }

// table: systemRequirements_includes_storageDeviceType
export interface systemRequirements_includes_storageDeviceTypeAttribute {
  systemRequirements_systemRequirementsID?:number;
  systemRequirements_storageDeviceTypeID?:number;
}
export interface systemRequirements_includes_storageDeviceTypeInstance extends Sequelize.Instance<systemRequirements_includes_storageDeviceTypeAttribute>, systemRequirements_includes_storageDeviceTypeAttribute { }
export interface systemRequirements_includes_storageDeviceTypeModel extends Sequelize.Model<systemRequirements_includes_storageDeviceTypeInstance, systemRequirements_includes_storageDeviceTypeAttribute> { }

// table: storageDevice_has_machineInterface
export interface storageDevice_has_machineInterfaceAttribute {
  storageDevice_storageDeviceID:number;
  storageDevice_machineInterfaceID:number;
}
export interface storageDevice_has_machineInterfaceInstance extends Sequelize.Instance<storageDevice_has_machineInterfaceAttribute>, storageDevice_has_machineInterfaceAttribute { }
export interface storageDevice_has_machineInterfaceModel extends Sequelize.Model<storageDevice_has_machineInterfaceInstance, storageDevice_has_machineInterfaceAttribute> { }

// table: systemRequirements_includes_softwareVersion
export interface systemRequirements_includes_softwareVersionAttribute {
  systemRequirements_systemRequirementsID:number;
  systemRequirements_softwareVersionID:number;
}
export interface systemRequirements_includes_softwareVersionInstance extends Sequelize.Instance<systemRequirements_includes_softwareVersionAttribute>, systemRequirements_includes_softwareVersionAttribute { }
export interface systemRequirements_includes_softwareVersionModel extends Sequelize.Model<systemRequirements_includes_softwareVersionInstance, systemRequirements_includes_softwareVersionAttribute> { }

// table: systemRequirements_includes_pointerDeviceType
export interface systemRequirements_includes_pointerDeviceTypeAttribute {
  systemRequirements_systemRequirementsID:number;
  systemRequirements_pointerDeviceTypeID?:number;
}
export interface systemRequirements_includes_pointerDeviceTypeInstance extends Sequelize.Instance<systemRequirements_includes_pointerDeviceTypeAttribute>, systemRequirements_includes_pointerDeviceTypeAttribute { }
export interface systemRequirements_includes_pointerDeviceTypeModel extends Sequelize.Model<systemRequirements_includes_pointerDeviceTypeInstance, systemRequirements_includes_pointerDeviceTypeAttribute> { }

// table: systemRequirements_includes_cpuArchitecture
export interface systemRequirements_includes_cpuArchitectureAttribute {
  systemRequirements_systemRequirementsID:number;
  systemRequirements_cpuArchitecture?:string;
}
export interface systemRequirements_includes_cpuArchitectureInstance extends Sequelize.Instance<systemRequirements_includes_cpuArchitectureAttribute>, systemRequirements_includes_cpuArchitectureAttribute { }
export interface systemRequirements_includes_cpuArchitectureModel extends Sequelize.Model<systemRequirements_includes_cpuArchitectureInstance, systemRequirements_includes_cpuArchitectureAttribute> { }

// table: systemRequirements_includes_machineType
export interface systemRequirements_includes_machineTypeAttribute {
  systemRequirements_systemRequirementsID:number;
  systemRequirements_machineTypeID?:number;
}
export interface systemRequirements_includes_machineTypeInstance extends Sequelize.Instance<systemRequirements_includes_machineTypeAttribute>, systemRequirements_includes_machineTypeAttribute { }
export interface systemRequirements_includes_machineTypeModel extends Sequelize.Model<systemRequirements_includes_machineTypeInstance, systemRequirements_includes_machineTypeAttribute> { }

// table: systemRequirements_includes_gpuDevice
export interface systemRequirements_includes_gpuDeviceAttribute {
  systemRequirements_systemRequirementsID:number;
  systemRequirements_gpuDeviceID?:number;
  systemRequirements_minimumGpuRAM?:string;
}
export interface systemRequirements_includes_gpuDeviceInstance extends Sequelize.Instance<systemRequirements_includes_gpuDeviceAttribute>, systemRequirements_includes_gpuDeviceAttribute { }
export interface systemRequirements_includes_gpuDeviceModel extends Sequelize.Model<systemRequirements_includes_gpuDeviceInstance, systemRequirements_includes_gpuDeviceAttribute> { }

// table: userInformation
export interface userInformationAttribute {
  userInformationID:number;
  username?:string;
  password?:string;
  organization?:string;
  admin?:boolean;
}
export interface userInformationInstance extends Sequelize.Instance<userInformationAttribute>, userInformationAttribute { }
export interface userInformationModel extends Sequelize.Model<userInformationInstance, userInformationAttribute> { }

// table: systemRequirements_includes_audioDevice
export interface systemRequirements_includes_audioDeviceAttribute {
  systemRequirements_systemRequirementsID:number;
  systemRequirements_audioDeviceID:number;
}
export interface systemRequirements_includes_audioDeviceInstance extends Sequelize.Instance<systemRequirements_includes_audioDeviceAttribute>, systemRequirements_includes_audioDeviceAttribute { }
export interface systemRequirements_includes_audioDeviceModel extends Sequelize.Model<systemRequirements_includes_audioDeviceInstance, systemRequirements_includes_audioDeviceAttribute> { }

// table: systemRequirements
export interface systemRequirementsAttribute {
  systemRequirementsID:number;
  requirementsSummary?:string;
  minimumRAM?:number;
  minimumDiskSpace?:number;
  minimumColorDepth?:number;
  minimumDisplayResolution?:number;
  internetAccessRequired?:boolean;
  minimumMbps?:number;
}
export interface systemRequirementsInstance extends Sequelize.Instance<systemRequirementsAttribute>, systemRequirementsAttribute { }
export interface systemRequirementsModel extends Sequelize.Model<systemRequirementsInstance, systemRequirementsAttribute> { }

// table: timezone_has_timezoneName
export interface timezone_has_timezoneNameAttribute {
  timezone_timezoneQID:string;
  timezoneName_timezoneNameID:number;
}
export interface timezone_has_timezoneNameInstance extends Sequelize.Instance<timezone_has_timezoneNameAttribute>, timezone_has_timezoneNameAttribute { }
export interface timezone_has_timezoneNameModel extends Sequelize.Model<timezone_has_timezoneNameInstance, timezone_has_timezoneNameAttribute> { }

// table: timezoneName
export interface timezoneNameAttribute {
  timezoneNameID:number;
  timeZoneName?:string;
}
export interface timezoneNameInstance extends Sequelize.Instance<timezoneNameAttribute>, timezoneNameAttribute { }
export interface timezoneNameModel extends Sequelize.Model<timezoneNameInstance, timezoneNameAttribute> { }

// table: softwareVersion_isCompatibleWith_computingEnvironment
export interface softwareVersion_isCompatibleWith_computingEnvironmentAttribute {
  sofwareVersion_softwareVersionID?:number;
  compatibleComputingEnvironmentID?:number;
}
export interface softwareVersion_isCompatibleWith_computingEnvironmentInstance extends Sequelize.Instance<softwareVersion_isCompatibleWith_computingEnvironmentAttribute>, softwareVersion_isCompatibleWith_computingEnvironmentAttribute { }
export interface softwareVersion_isCompatibleWith_computingEnvironmentModel extends Sequelize.Model<softwareVersion_isCompatibleWith_computingEnvironmentInstance, softwareVersion_isCompatibleWith_computingEnvironmentAttribute> { }

// table: storageDeviceType
export interface storageDeviceTypeAttribute {
  storageDeviceTypeID:number;
  storageDeviceTypeQID?:string;
  storageDeviceTypeName:string;
}
export interface storageDeviceTypeInstance extends Sequelize.Instance<storageDeviceTypeAttribute>, storageDeviceTypeAttribute { }
export interface storageDeviceTypeModel extends Sequelize.Model<storageDeviceTypeInstance, storageDeviceTypeAttribute> { }

// table: storageDevice
export interface storageDeviceAttribute {
  storageDeviceID:number;
  storageDeviceQID?:string;
  storageDeviceName:string;
  storageDeviceType?:number;
  storageVolumeBytes?:number;
  storageDevice_readWriteStatusID:number;
}
export interface storageDeviceInstance extends Sequelize.Instance<storageDeviceAttribute>, storageDeviceAttribute { }
export interface storageDeviceModel extends Sequelize.Model<storageDeviceInstance, storageDeviceAttribute> { }

// table: formatImplementation_includes_fileFormat
export interface formatImplementation_includes_fileFormatAttribute {
  formatImplementation_formatImplementationID:number;
  fileFormat_fileFormatQID:string;
}
export interface formatImplementation_includes_fileFormatInstance extends Sequelize.Instance<formatImplementation_includes_fileFormatAttribute>, formatImplementation_includes_fileFormatAttribute { }
export interface formatImplementation_includes_fileFormatModel extends Sequelize.Model<formatImplementation_includes_fileFormatInstance, formatImplementation_includes_fileFormatAttribute> { }

// table: softwareEnvironment_hasPart_configuredSoftware
export interface softwareEnvironment_hasPart_configuredSoftwareAttribute {
  softwareEnvironment_softwareEnvironmentID:number;
  hasConfiguredSoftware:number;
}
export interface softwareEnvironment_hasPart_configuredSoftwareInstance extends Sequelize.Instance<softwareEnvironment_hasPart_configuredSoftwareAttribute>, softwareEnvironment_hasPart_configuredSoftwareAttribute { }
export interface softwareEnvironment_hasPart_configuredSoftwareModel extends Sequelize.Model<softwareEnvironment_hasPart_configuredSoftwareInstance, softwareEnvironment_hasPart_configuredSoftwareAttribute> { }

'use strict';
import * as DataTypes from "sequelize";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all(
            [

                queryInterface.createTable('alternateName', {
					alternateNameID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						primaryKey: true,
						autoIncrement: true
					},
					alternateName: {
						type: DataTypes.STRING,
						allowNull: false
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('audioDevice', {
					audioDeviceID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						primaryKey: true,
						autoIncrement: true
					},
					audioDeviceQID: {
						type: DataTypes.STRING,
						allowNull: true
					},
					audioDeviceName: {
						type: DataTypes.INTEGER,
						allowNull: false
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('audioDevice_has_driverSoftware', {
					storageDevice_storageDeviceID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'storageDevice',
							key: 'storageDeviceID'
						}
					},
					storageDevice_driverSoftwareID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'softwareVersion',
							key: 'softwareVersionID'
						}
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('audioDevice_has_machineInterface', {
					audioDevice_audioDeviceID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'audioDevice',
							key: 'audioDeviceID'
						}
					},
					audioDevice_machineInterfaceID: {
						type: DataTypes.INTEGER,
						allowNull: false
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

				queryInterface.createTable('audioDevice_has_equivalent', {
					audioDevice_audioDeviceID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'audioDevice',
							key: 'audioDeviceID'
						}
					},
					audioDevice_equivalentAudioDevice: {
						type: DataTypes.INTEGER,
						allowNull: false
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				}),

                queryInterface.createTable('colorDepth', {
					colorDepthID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						primaryKey: true,
						autoIncrement: true
					},
					colorDepthName: {
						type: DataTypes.STRING,
						allowNull: false
					},
					bitDepth: {
						type: DataTypes.INTEGER,
						allowNull: true
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('computingEnvironment', {
					computingEnvironmentID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						primaryKey: true,
						autoIncrement: true
					},
					computingEnvironment_hasSourceOrg: {
						type: DataTypes.INTEGER,
						allowNull: true
					},
					computingEnvironment_inNetwork: {
						type: DataTypes.BOOLEAN,
						allowNull: true
					},
					computingEnvironment_configuredNetworkID: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'configuredNetwork',
							key: 'configuredNetworkID'
						}
					},
					computingEnvironment_softwareEnvironmentID: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'softwareEnvironment',
							key: 'softwareEnvironmentID'
						}
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('computingEnvironment_has_event', {
					computingEnvironment_computingEnvironmentID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'computingEnvironment',
							key: 'computingEnvironmentID'
						}
					},
					event_eventID: {
						type: DataTypes.INTEGER,
						allowNull: false
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('configuredAudioDevice', {
					configuredMachine_machineID: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'configuredMachine',
							key: 'configuredMachineID'
						}
					},
					configuredAudioDevice_audioDeviceID: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'audioDevice',
							key: 'audioDeviceID'
						}
					},
					configuredAudioDevice_irq: {
						type: DataTypes.STRING,
						allowNull: false
					},
					configuredAudioDevice_usesMachineInterface: {
						type: DataTypes.INTEGER,
						allowNull: true
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('configuredGpuDevice', {
					configuredMachine_machineID: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'configuredMachine',
							key: 'configuredMachineID'
						}
					},
					configuredGpuDevice_gpuDeviceID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'gpuDevice',
							key: 'gpuDeviceID'
						}
					},
					configuredGpuDevice_memoryBytes: {
						type: DataTypes.INTEGER,
						allowNull: true
					},
					configuredGpuDevice_irq: {
						type: DataTypes.STRING,
						allowNull: true
					},
					configuredGpuDevice_usesMachineInterface: {
						type: DataTypes.INTEGER,
						allowNull: true
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('configuredGpuDevice_has_displayDevice', {
					configuredMachine_machineID: {
						type: DataTypes.INTEGER,
						allowNull: false
					},
					configuredGpuDevice_gpuDeviceID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'configuredGpuDevice',
							key: 'configuredGpuDevice_gpuDeviceID'
						}
					},
					configuredGpuDevice_displayDeviceID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'displayDevice',
							key: 'displayDeviceID'
						}
					},
					displayDevice_usesDisplayInterface: {
						type: DataTypes.INTEGER,
						allowNull: false
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('configuredKeyboardDevice', {
					configuredMachine_machineID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'configuredMachine',
							key: 'configuredMachineID'
						}
					},
					configuredKeyboardDevice_keyboardDeviceID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'keyboardDevice',
							key: 'keyboardDeviceID'
						}
					},
					configuredKeyboardDevice_usesMachineInterface: {
						type: DataTypes.INTEGER,
						allowNull: true
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('configuredMachine', {
					configuredMachineID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						primaryKey: true,
						autoIncrement: true
					},
					configuredMachineName: {
						type: DataTypes.STRING,
						allowNull: false
					},
					configuredMachineDescription: {
						type: DataTypes.STRING,
						allowNull: false
					},
					configuredMachineDateTime: {
						type: DataTypes.DATE,
						allowNull: false
					},
					configuredMachineType: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'machineType',
							key: 'machineTypeID'
						}
					},
					configuredMachineRamBytes: {
						type: DataTypes.STRING,
						allowNull: false
					},
					configuredMachineArchitecture: {
						type: DataTypes.STRING,
						allowNull: true,
						references: {
							model: 'cpuArchitecture',
							key: 'cpuArchitectureQID'
						}
					},
					configuredMachineCpuCores: {
						type: DataTypes.STRING,
						allowNull: true
					},
					configuredMachine_emulatorSoftwareID: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'softwareVersion',
							key: 'softwareVersionID'
						}
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('configuredMachine_has_event', {
					configuredMachine_machineID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'configuredMachine',
							key: 'configuredMachineID'
						}
					},
					event_eventID: {
						type: DataTypes.INTEGER,
						allowNull: true
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('configuredNetwork', {
					configuredNetworkID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						primaryKey: true,
						autoIncrement: true
					},
					configuredNetworkName: {
						type: DataTypes.STRING,
						allowNull: true
					},
					configuredNetworkDescription: {
						type: DataTypes.STRING,
						allowNull: true
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('configuredNetwork_emulatesNetworkService', {
					configuredNetwork_configuredNetworkID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'configuredNetwork',
							key: 'configuredNetworkID'
						}
					},
					configuredNetwork_networkServiceID: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'networkService',
							key: 'networkServiceID'
						}
					},
					servicePortExposed: {
						type: DataTypes.STRING,
						allowNull: true
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('configuredNetwork_has_configuredMachine', {
					configuredNetwork_configuredNetworkID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'configuredNetwork',
							key: 'configuredNetworkID'
						}
					},
					configuredNetwork_machineID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'configuredMachine',
							key: 'configuredMachineID'
						}
					},
					bootOrder: {
						type: DataTypes.INTEGER,
						allowNull: false
					},
					staticIpAddress: {
						type: DataTypes.STRING,
						allowNull: true
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('configuredNetwork_has_event', {
					configuredNetwork_configuredNetworkID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'configuredNetwork',
							key: 'configuredNetworkID'
						}
					},
					event_eventID: {
						type: DataTypes.INTEGER,
						allowNull: true
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('configuredNetworkDevice', {
					configuredMachine_machineID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'configuredMachine',
							key: 'configuredMachineID'
						}
					},
					configuredNetworkDevice_networkDeviceID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'networkDevice',
							key: 'networkDeviceID'
						}
					},
					configuredNetworkDevice_macAddress: {
						type: DataTypes.INTEGER,
						allowNull: true
					},
					configuredNetworkDevice_usesMachineInterface: {
						type: DataTypes.INTEGER,
						allowNull: true
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('configuredNetworkMachine_expectedNetworkService', {
					configuredNetworkMachine_configuredNetworkID: {
						type: DataTypes.INTEGER,
						allowNull: true
					},
					configuredNetworkMachine_configuredMachineID: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'configuredNetwork_has_configuredMachine',
							key: 'configuredNetwork_machineID'
						}
					},
					configuredNetworkMachine_expectedNetworkServiceID: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'networkService',
							key: 'networkServiceID'
						}
					},
					servicePortExpected: {
						type: DataTypes.STRING,
						allowNull: true
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('configuredNetworkMachine_providesNetworkService', {
					configuredNetworkMachine_configuredNetworkID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'configuredNetwork_has_configuredMachine',
							key: 'configuredNetwork_configuredNetworkID'
						}
					},
					configuredNetworkMachine_configuredMachineID: {
						type: DataTypes.INTEGER,
						allowNull: true
					},
					configuredNetworkMachine_providesNetworkServiceID: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'networkService',
							key: 'networkServiceID'
						}
					},
					servicePortExposed: {
						type: DataTypes.STRING,
						allowNull: true
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('configuredOS', {
					configuredOperatingSystemID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						primaryKey: true,
						autoIncrement: true
					},
					configuredDisplayResolution: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'displayResolution',
							key: 'displayResolutionID'
						}
					},
					configuredColorDepth: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'colorDepth',
							key: 'colorDepthID'
						}
					},
					configuredRegion: {
						type: DataTypes.STRING,
						allowNull: true,
						references: {
							model: 'region',
							key: 'regionQID'
						}
					},
					configuredTimezone: {
						type: DataTypes.STRING,
						allowNull: true,
						references: {
							model: 'timezone',
							key: 'timezoneQID'
						}
					},
					configuredDateTime: {
						type: DataTypes.DATE,
						allowNull: true
					},
					hasSource_softwareObjectID: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'softwareObject',
							key: 'softwareObjectID'
						}
					},
					manifestationOf_osVersion: {
						type: DataTypes.INTEGER,
						allowNull: true
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('configuredOS_has_event', {
					configuredOS_configuredOperatingSystemID: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'configuredOS',
							key: 'configuredOperatingSystemID'
						}
					},
					event_eventID: {
						type: DataTypes.INTEGER,
						allowNull: true
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('configuredOS_has_formatOperation', {
					configuredOS_configuredOperatingSystemID: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'configuredOS',
							key: 'configuredOperatingSystemID'
						}
					},
					formatOperation_opensFileFormat: {
						type: DataTypes.STRING,
						allowNull: true,
						references: {
							model: 'fileFormat',
							key: 'fileFormatQID'
						}
					},
					formatOperation_usesConfiguredSoftware: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'configuredSoftware',
							key: 'configuredSoftwareVersionID'
						}
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('configuredOS_has_userInformation', {
					configuredOS_configuredOperatingSystemID: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'configuredOS',
							key: 'configuredOperatingSystemID'
						}
					},
					userInformation_userInformationID: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'userInformation',
							key: 'userInformationID'
						}
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('configuredOS_language', {
					configuredOS_configuredOperatingSystemID: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'configuredOS',
							key: 'configuredOperatingSystemID'
						}
					},
					configuredOs_languageQID: {
						type: DataTypes.STRING,
						allowNull: true
					},
					configuredOS_primaryLanguage: {
						type: DataTypes.BOOLEAN,
						allowNull: true
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('configuredPointerDevice', {
					configuredMachine_machineID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'configuredMachine',
							key: 'configuredMachineID'
						}
					},
					configuredPointerDevice_pointerDeviceID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'pointerDevice',
							key: 'pointerDeviceID'
						}
					},
					configuredPointerDevice_usesMachineInterface: {
						type: DataTypes.INTEGER,
						allowNull: false
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('configuredSoftware', {
					configuredSoftwareVersionID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						defaultValue: 'nextval(configured_software_id_seq::regclass)',
						primaryKey: true,
						references: {
							model: 'softwareVersion',
							key: 'softwareVersionID'
						}
					},
					executableLocation: {
						type: DataTypes.STRING,
						allowNull: true
					},
					executableSyntax: {
						type: DataTypes.STRING,
						allowNull: true
					},
					saveLocation: {
						type: DataTypes.STRING,
						allowNull: true
					},
					configuredLanguage: {
						type: DataTypes.INTEGER,
						allowNull: true
					},
					hasSource_softwareObjectID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'softwareObject',
							key: 'softwareObjectID'
						}
					},
					hasSource_digitalObjectID: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'digitalObject',
							key: 'digitalObjectID'
						}
					},
					manifestationOf_softwareVersion: {
						type: DataTypes.INTEGER,
						allowNull: true
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('configuredSoftware_has_event', {
					configuredSoftware_configuredSoftwareManifestationID: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'configuredSoftware',
							key: 'configuredSoftwareVersionID'
						}
					},
					event_eventID: {
						type: DataTypes.INTEGER,
						allowNull: true
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('configuredSoftware_has_userInformation', {
					configuredSoftware_configuredSoftwareManifestationID: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'configuredSoftware',
							key: 'configuredSoftwareVersionID'
						}
					},
					userInformation_userInformationID: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'userInformation',
							key: 'userInformationID'
						}
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('configuredSoftware_uses_formatImplementation', {
					configuredSoftware_configuredSoftwareManifestationID: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'configuredSoftware',
							key: 'configuredSoftwareVersionID'
						}
					},
					configuredSoftware_formatImplementation: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'formatImplementation',
							key: 'formatImplementationID'
						}
					},
					configuredFormatOperation: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'formatOperation',
							key: 'operationID'
						}
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('configuredStorageDevice', {
					configuredMachine_machineID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'configuredMachine',
							key: 'configuredMachineID'
						}
					},
					configureStorageDevice_storageDeviceID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'storageDevice',
							key: 'storageDeviceID'
						}
					},
					configuredStorageDevice_usesMachineInterface: {
						type: DataTypes.INTEGER,
						allowNull: true
					},
					configuredStorageDevice_idBootOrder: {
						type: DataTypes.INTEGER,
						allowNull: false
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('cpuArchitecture', {
					cpuArchitectureQID: {
						type: DataTypes.STRING,
						allowNull: false,
						primaryKey: true
					},
					cpuArchitectureName: {
						type: DataTypes.STRING,
						allowNull: false
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('developer', {
					developerQID: {
						type: DataTypes.STRING,
						allowNull: false,
						primaryKey: true
					},
					developerName: {
						type: DataTypes.STRING,
						allowNull: false
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('digitalObject', {
					digitalObjectID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						primaryKey: true,
						autoIncrement: true
					},
					digitalObjectName: {
						type: DataTypes.STRING,
						allowNull: true
					},
					digitalObjectDescription: {
						type: DataTypes.STRING,
						allowNull: true
					},
					digitalObjectProductKey: {
						type: DataTypes.STRING,
						allowNull: true
					},
					digitalObjectHelpText: {
						type: DataTypes.TEXT,
						allowNull: true
					},
					digitalObjectSystemRequirements: {
						type: DataTypes.INTEGER,
						allowNull: true
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('digitalObject_has_alternativeID', {
					digitalObject_digitalObjectID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'digitalObject',
							key: 'digitalObjectID'
						}
					},
					alternativeID_alternativeID: {
						type: DataTypes.STRING,
						allowNull: true
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('digitalObject_has_event', {
					digitalObject_digialObjectID: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'digitalObject',
							key: 'digitalObjectID'
						}
					},
					event_eventID: {
						type: DataTypes.INTEGER,
						allowNull: true
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('digitalObject_has_objectFile', {
					digitalObject_digitalObjectID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'digitalObject',
							key: 'digitalObjectID'
						}
					},
					digitalObjectFileID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'file',
							key: 'fileID'
						}
					},
					digitalObjectFileLabel: {
						type: DataTypes.STRING,
						allowNull: true
					},
					digitalObjectFile_usesMountFormat: {
						type: DataTypes.STRING,
						allowNull: true,
						references: {
							model: 'mountFormat',
							key: 'mountFormatQID'
						}
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('digitalObject_isCompatibleWith_computingEnvironment', {
					digitalObject_digitalObjectID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'digitalObject',
							key: 'digitalObjectID'
						}
					},
					compatibleComputingEnvironmentID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'computingEnvironment',
							key: 'computingEnvironmentID'
						}
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('digitalObjectFile_has_objectFileOperation', {
					digitalObjectFile_digitalObjectID: {
						type: DataTypes.INTEGER,
						allowNull: true
					},
					digitalObjectFile_fileID: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'digitalObject_has_objectFile',
							key: 'digitalObjectFileID'
						}
					},
					digitalObjectFile_operationID: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'objectFileOperation',
							key: 'operationID'
						}
					},
					digitalObjectFile_operationOrder: {
						type: DataTypes.INTEGER,
						allowNull: true
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

                queryInterface.createTable('displayDevice', {
					displayDeviceID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						primaryKey: true,
						autoIncrement: true
					},
					displayDeviceQID: {
						type: DataTypes.STRING,
						allowNull: true
					},
					displayDeviceName: {
						type: DataTypes.STRING,
						allowNull: true
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
                }),

				queryInterface.createTable('displayDevice_has_colorDepth', {
					displayDevice_displayDeviceID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'displayDevice',
							key: 'displayDeviceID'
						}
					},
					colorDepth_colorDepthID: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'colorDepth',
							key: 'colorDepthID'
						}
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				}),

				queryInterface.createTable('displayDevice_has_displayInterface', {
					displayDevice_displayDeviceID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'displayDevice',
							key: 'displayDeviceID'
						}
					},
					displayInterface_displayInterfaceID: {
						type: DataTypes.INTEGER,
						allowNull: true
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				}),

				queryInterface.createTable('displayDevice_has_displayResolution', {
					displayDevice_displayDeviceID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'displayDevice',
							key: 'displayDeviceID'
						}
					},
					availableDisplayResolution: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'displayResolution',
							key: 'displayResolutionID'
						}
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				}),

				queryInterface.createTable('displayDevice_has_driverSoftware', {
					displayDevice_displayDeviceID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'displayDevice',
							key: 'displayDeviceID'
						}
					},
					displayDevice_driverSoftwareID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'softwareVersion',
							key: 'softwareVersionID'
						}
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				}),

				queryInterface.createTable('displayResolution', {
					displayResolutionID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						primaryKey: true,
						autoIncrement: true
					},
					displayResolutionName: {
						type: DataTypes.STRING,
						allowNull: false
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				}),

				queryInterface.createTable('file', {
					fileID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						primaryKey: true,
						autoIncrement: true
					},
					fileLocation: {
						type: DataTypes.STRING,
						allowNull: true
					},
					fileName: {
						type: DataTypes.STRING,
						allowNull: true
					},
					fileChecksum: {
						type: DataTypes.STRING,
						allowNull: true
					},
					fileFormat: {
						type: DataTypes.STRING,
						allowNull: true,
						references: {
							model: 'fileFormat',
							key: 'fileFormatQID'
						}
					},
					fileSize: {
						type: DataTypes.STRING,
						allowNull: true
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				}),

				queryInterface.createTable('fileExtension', {
					fileExtensionID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						primaryKey: true,
						autoIncrement: true
					},
					extension: {
						type: DataTypes.STRING,
						allowNull: false
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				}),

				queryInterface.createTable('fileFormat', {
					fileFormatQID: {
						type: DataTypes.STRING,
						allowNull: false,
						primaryKey: true
					},
					fileFormatName: {
						type: DataTypes.STRING,
						allowNull: true
					},
					pronomID: {
						type: DataTypes.STRING,
						allowNull: true
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				}),

				queryInterface.createTable('fileFormat_has_fileExtension', {
					fileFormat_fileFormatQID: {
						type: DataTypes.STRING,
						allowNull: false,
						references: {
							model: 'fileFormat',
							key: 'fileFormatQID'
						}
					},
					fileExtension_fileExtensionID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'fileExtension',
							key: 'fileExtensionID'
						}
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				}),

				queryInterface.createTable('fileSystem', {
					fileSystemQID: {
						type: DataTypes.STRING,
						allowNull: false,
						primaryKey: true
					},
					fileSystemName: {
						type: DataTypes.INTEGER,
						allowNull: false
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				}),

				queryInterface.createTable('formatImplementation', {
					formatImplementationID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						primaryKey: true,
						autoIncrement: true
					},
					formatImplementationName: {
						type: DataTypes.STRING,
						allowNull: false
					},
					implementationExtension: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'fileExtension',
							key: 'fileExtensionID'
						}
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				}),

				queryInterface.createTable('formatImplementation_includes_fileFormat', {
					formatImplementation_formatImplementationID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'formatImplementation',
							key: 'formatImplementationID'
						}
					},
					fileFormat_fileFormatQID: {
						type: DataTypes.STRING,
						allowNull: false,
						references: {
							model: 'fileFormat',
							key: 'fileFormatQID'
						}
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				}),

				queryInterface.createTable('formatOperation', {
					operationID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						primaryKey: true,
						autoIncrement: true
					},
					operationName: {
						type: DataTypes.STRING,
						allowNull: false
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				}),

				queryInterface.createTable('gpuDevice', {
					gpuDeviceID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						primaryKey: true,
						autoIncrement: true
					},
					gpuDeviceQID: {
						type: DataTypes.STRING,
						allowNull: true
					},
					gpuDeviceName: {
						type: DataTypes.STRING,
						allowNull: false
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				}),

				queryInterface.createTable('gpuDevice_has_displayInterface', {
					gpuDevice_gpuDeviceID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'gpuDevice',
							key: 'gpuDeviceID'
						}
					},
					displayInterface_displayInterfaceID: {
						type: DataTypes.INTEGER,
						allowNull: false
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				}),

				queryInterface.createTable('gpuDevice_has_driverSoftware', {
					gpuDevice_gpuDeviceID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'gpuDevice',
							key: 'gpuDeviceID'
						}
					},
					gpuDevice_driverSoftwareID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'softwareVersion',
							key: 'softwareVersionID'
						}
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				}),

				queryInterface.createTable('gpuDevice_has_machineInterface', {
					gpuDevice_gpuDeviceID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'gpuDevice',
							key: 'gpuDeviceID'
						}
					},
					gpuDevice_machineInterfaceID: {
						type: DataTypes.INTEGER,
						allowNull: false
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				}),

				queryInterface.createTable('gpuDevice_has_Equivalent', {
					gpuDevice_gpuDeviceID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'gpuDevice',
							key: 'gpuDeviceID'
						}
					},
					gpuDevice_equivalentGpuDevice: {
						type: DataTypes.INTEGER,
						allowNull: false
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				}),

				queryInterface.createTable('keyboardDevice', {
					keyboardDeviceID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						primaryKey: true,
						autoIncrement: true
					},
					keyboardDeviceQID: {
						type: DataTypes.STRING,
						allowNull: true
					},
					keyboardDeviceName: {
						type: DataTypes.STRING,
						allowNull: false
					},
					keyboardDevice_keyboardLayout: {
						type: DataTypes.STRING,
						allowNull: true,
						references: {
							model: 'keyboardLayout',
							key: 'keyboardLayoutQID'
						}
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				}),

				queryInterface.createTable('keyboardDevice_has_driverSoftware', {
					keyboardDevice_keyboardDeviceID: {
						type: DataTypes.INTEGER,
						allowNull: true,
						references: {
							model: 'keyboardDevice',
							key: 'keyboardDeviceID'
						}
					},
					keyboardDevice_driverSoftware: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'softwareVersion',
							key: 'softwareVersionID'
						}
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				}),

				queryInterface.createTable('keyboardDevice_has_language', {
					keyboardDevice_keyboardDeviceID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'keyboardDevice',
							key: 'keyboardDeviceID'
						}
					},
					keyboardDevice_languageQID: {
						type: DataTypes.STRING,
						allowNull: false
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				}),

				queryInterface.createTable('keyboardDevice_has_machineInterfaceID', {
					keyboardDevice_keyboardDeviceID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						references: {
							model: 'keyboardDevice',
							key: 'keyboardDeviceID'
						}
					},
					keyboardDevice_machineInterfaceID: {
						type: DataTypes.INTEGER,
						allowNull: false
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				}),

				queryInterface.createTable('keyboardLayout', {
					keyboardLayoutQID: {
						type: DataTypes.STRING,
						allowNull: false,
						primaryKey: true
					},
					keyboardLayoutName: {
						type: DataTypes.STRING,
						allowNull: false
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				}),

				queryInterface.createTable('machineType', {
					machineTypeID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						primaryKey: true,
						autoIncrement: true
					},
					machineTypeName: {
						type: DataTypes.STRING,
						allowNull: false
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				}),

				queryInterface.createTable('mountFormat', {
					mountFormatQID: {
						type: DataTypes.STRING,
						allowNull: false,
						primaryKey: true
					},
					mountFormatName: {
						type: DataTypes.STRING,
						allowNull: false
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				}),

				queryInterface.createTable('networkDevice', {
					networkDeviceID: {
						type: DataTypes.INTEGER,
						allowNull: false,
						primaryKey: true,
						autoIncrement: true
					},
					networkDeviceQID: {
						type: DataTypes.STRING,
						allowNull: true
					},
					networkDeviceName: {
						type: DataTypes.STRING,
						allowNull: false
					},
					createdAt: {
						type: DataTypes.DATE,
						allowNull: false
					},
					updatedAt: {
						type: DataTypes.DATE,
						allowNull: false
					}
				}),

				queryInterface.createTable('networkDevice_has_driverSoftware', {
				}),

				queryInterface.createTable('networkDevice_has_machineInterface', {
				}),

				queryInterface.createTable('networkService', {
				}),

				queryInterface.createTable('objectEnvironment', {
				}),

				queryInterface.createTable('objectEnvironment_has_event', {
				}),

				queryInterface.createTable('objectFileOperation', {
				}),

				queryInterface.createTable('osVersion', {
				}),

				queryInterface.createTable('osVersion_colorDepthSettings', {
				}),

				queryInterface.createTable('osVersion_displayResolutionSettings', {
				}),

				queryInterface.createTable('osVersion_has_alternateID', {
				}),

				queryInterface.createTable('osVersion_has_developer', {
				}),

				queryInterface.createTable('osVersion_has_programmingLanguage', {
				}),

				queryInterface.createTable('osVersion_has_softwareLicense', {
				}),

				queryInterface.createTable('osVersion_includes_softwareVersion', {
				}),

				queryInterface.createTable('osVersion_isCompatibleWith_configuredMachine', {
				}),

				queryInterface.createTable('osVersion_keyboardLanguageSettings', {
				}),

				queryInterface.createTable('osVersion_keyboardLayoutSettings', {
				}),

				queryInterface.createTable('osVersion_keyboardSettings', {
				}),

				queryInterface.createTable('osVersion_languageSettings', {
				}),

				queryInterface.createTable('osVersion_regionSettings', {
				}),

				queryInterface.createTable('osVersion_timezoneSettings', {
				}),

				queryInterface.createTable('pointerDevice', {
				}),

				queryInterface.createTable('pointerDevice_has_driverSoftware', {
				}),

				queryInterface.createTable('pointerDevice_has_machineInterface', {
				}),

				queryInterface.createTable('pointerDeviceType', {
				}),

				queryInterface.createTable('programmingLanguage', {
				}),

				queryInterface.createTable('readWriteStatus', {
				}),

				queryInterface.createTable('region', {
				}),

				queryInterface.createTable('softwareEnvironment', {
				}),

				queryInterface.createTable('softwareEnvironment_has_diskImage', {
				}),

				queryInterface.createTable('softwareEnvironment_hasPart_configuredSoftware', {
				}),

				queryInterface.createTable('softwareFamily_hasPart_softwareProduct', {
				}),

				queryInterface.createTable('softwareFamilyVersion_hasPart_softwareVersion', {
				}),

				queryInterface.createTable('softwareLicense', {
				}),

				queryInterface.createTable('softwareObject', {
				}),

				queryInterface.createTable('softwareObject_has_alternateID', {
				}),

				queryInterface.createTable('softwareObject_has_event', {
				}),

				queryInterface.createTable('softwareObject_has_objectFile', {
				}),

				queryInterface.createTable('softwareObject_isManifestationOf_osVersion', {
				}),

				queryInterface.createTable('softwareObject_isManifestationOf_softwareVersion', {
				}),

				queryInterface.createTable('softwareObjectFile_has_objectFileOperation', {
				}),

				queryInterface.createTable('softwareProduct', {
				}),

				queryInterface.createTable('softwareProduct_has_alternateName', {
				}),

				queryInterface.createTable('softwareProduct_has_softwareType', {
				}),

				queryInterface.createTable('softwareType', {
				}),

				queryInterface.createTable('softwareVersion', {
				}),

				queryInterface.createTable('softwareVersion_has_alternateID', {
				}),

				queryInterface.createTable('softwareVersion_has_developer', {
				}),

				queryInterface.createTable('softwareVersion_has_formatImplementation', {
				}),

				queryInterface.createTable('softwareVersion_has_programmingLanguage', {
				}),

				queryInterface.createTable('softwareVersion_has_softwareLicense', {
				}),

				queryInterface.createTable('softwareVersion_isCompatibleWith_computingEnvironment', {
				}),

				queryInterface.createTable('softwareVersion_languageSettings', {
				}),

				queryInterface.createTable('storageDevice', {
				}),

				queryInterface.createTable('storageDevice_has_driverSoftware', {
				}),

				queryInterface.createTable('storageDevice_has_machineInterface', {
				}),

				queryInterface.createTable('storageDeviceType', {
				}),

				queryInterface.createTable('systemRequirements', {
				}),

				queryInterface.createTable('systemRequirements_includes_audioDevice', {
				}),

				queryInterface.createTable('systemRequirements_includes_cpuArchitecture', {
				}),

				queryInterface.createTable('systemRequirements_includes_gpuDevice', {
				}),

				queryInterface.createTable('systemRequirements_includes_machineType', {
				}),

				queryInterface.createTable('systemRequirements_includes_osVersion', {
				}),

				queryInterface.createTable('systemRequirements_includes_pointerDeviceType', {
				}),

				queryInterface.createTable('systemRequirements_includes_softwareVersion', {
				}),

				queryInterface.createTable('systemRequirements_includes_storageDeviceType', {
				}),

				queryInterface.createTable('timezone', {
				}),

				queryInterface.createTable('timezone_has_timezoneName', {
				}),

				queryInterface.createTable('timezoneName', {
				}),

				queryInterface.createTable('userInformation', {
				}),

				queryInterface.createTable('user', {
				}),
            ]
        )
    },
    down: (queryInterface, Sequelize) => {
        return Promise.all(
            [
                queryInterface.dropTable('OtherUsers'),
                queryInterface.dropTable('AndOtherUsers'),
            ])
    }
};
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
					return sequelize.define('audioDevice_has_equivalent', {
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
					}, {
						tableName: 'audioDevice_hasEquivalent'
					})
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
				}, {
					tableName: 'colorDepth'
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
				}, {
					tableName: 'computingEnvironment'
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
				}, {
					tableName: 'computingEnvironment_has_event'
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
				}, {
					tableName: 'configuredAudioDevice'
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
				}, {
					tableName: 'configuredGpuDevice'
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
				}, {
					tableName: 'configuredGpuDevice_has_displayDevice'
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
				}, {
					tableName: 'configuredKeyboardDevice'
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
				}, {
					tableName: 'configuredMachine'
                }),

                queryInterface.createTable('configuredMachine_has_event', {

                }),

                queryInterface.createTable('configuredNetwork', {
                }),
                queryInterface.createTable('configuredNetwork_emulatedNetworkService', {
                }),
                queryInterface.createTable('configuredNetwork_has_configuredMachine', {
                }),
                queryInterface.createTable('configuredNetwork_has_event', {
                }),
                queryInterface.createTable('configuredNetworkDevice', {
                }),
                queryInterface.createTable('configuredNetworkMachine_expectedNetworkService', {
                }),
                queryInterface.createTable('configuredNetworkMachine_providesNetworkService', {
                }),

                queryInterface.createTable('configuredOS', {
                }),
                queryInterface.createTable('configuredOS_has_event', {
                }),
                queryInterface.createTable('configuredOS_has_formatOperation', {
                }),
                queryInterface.createTable('configuredOS_has_userInformation', {
                }),
                queryInterface.createTable('configuredOS_language', {
                }),

                queryInterface.createTable('configuredPointerDevice', {
                }),

                queryInterface.createTable('configuredSoftware', {
                }),
                queryInterface.createTable('configuredSoftware_has_event', {
                }),
                queryInterface.createTable('configuredSoftware_has_userInformation', {
                }),
                queryInterface.createTable('configuredSoftware_uses_formatImplementation', {
                }),

                queryInterface.createTable('configuredStorageDevice', {
                }),

                queryInterface.createTable('cpuArchitecture', {
                }),

                queryInterface.createTable('developer', {
                }),

                queryInterface.createTable('digitalObject', {
                }),

                queryInterface.createTable('digitalObject_has_alternativeID', {
                }),
                queryInterface.createTable('digitalObject_has_event', {
                }),
                queryInterface.createTable('digitalObject_has_objectFile', {
                }),
                queryInterface.createTable('digitalObject_isCompatibleWith_computingEnvironment', {
                }),
                queryInterface.createTable('digitalObjectFile_has_objectFileOperation', {
                }),

                queryInterface.createTable('displayDevice', {
                }),
				queryInterface.createTable('displayDevice_has_colorDepth', {
				}),
				queryInterface.createTable('displayDevice_has_displayInterface', {
				}),
				queryInterface.createTable('displayDevice_has_displayResolution', {
				}),
				queryInterface.createTable('displayDevice_has_driverSoftware', {
				}),

				queryInterface.createTable('displayResolution', {
				}),

				queryInterface.createTable('file', {
				}),

				queryInterface.createTable('fileExtension', {
				}),
				queryInterface.createTable('fileFormat', {
				}),
				queryInterface.createTable('fileFormat_has_fileExtension', {
				}),
				queryInterface.createTable('fileSystem', {
				}),
				queryInterface.createTable('formatImplementation', {
				}),
				queryInterface.createTable('formatImplementation_includes_fileFormat', {
				}),
				queryInterface.createTable('formatOperation', {
				}),

				queryInterface.createTable('gpuDevice', {
				}),
				queryInterface.createTable('gpuDevice_has_displayInterface', {
				}),
				queryInterface.createTable('gpuDevice_has_driverSoftware', {
				}),
				queryInterface.createTable('gpuDevice_has_machineInterface', {
				}),

				queryInterface.createTable('keyboardDevice', {
				}),
				queryInterface.createTable('keyboardDevice_has_driverSoftware', {
				}),
				queryInterface.createTable('keyboardDevice_has_language', {
				}),
				queryInterface.createTable('keyboardDevice_has_machineInterfaceID', {
				}),
				queryInterface.createTable('keyboardLayout', {
				}),
				queryInterface.createTable('machineType', {
				}),
				queryInterface.createTable('mountFormat', {
				}),
				queryInterface.createTable('networkDevice', {
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
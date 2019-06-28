'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all(
            [
                queryInterface.createTable('alternateName', {
                }),
                queryInterface.createTable('audioDevice', {
                }),
                queryInterface.createTable('audioDevice_has_driverSoftware', {
                }),
                queryInterface.createTable('audioDevice_has_machineInterface', {
                }),
                queryInterface.createTable('audioDevice_has_equivalent', {
                }),
                queryInterface.createTable('colorDepth', {
                }),
                queryInterface.createTable('computingEnvironment', {
                }),
                queryInterface.createTable('computingEnvironment_has_event', {
                }),
                queryInterface.createTable('configuredAudioDevice', {
                }),
                queryInterface.createTable('configuredGpuDevice', {
                }),
                queryInterface.createTable('configuredGpuDevice_has_displayDevice', {
                }),
                queryInterface.createTable('configuredKeyboardDevice', {
                }),
                queryInterface.createTable('configuredMachine', {
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
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
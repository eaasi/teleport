'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "networkService", deps: []
 * createTable "alternateName", deps: []
 * createTable "audioDevice_hasEquivalent", deps: []
 * createTable "audioDevice_has_driverSoftware", deps: []
 * createTable "audioDevice_has_machineInterface", deps: []
 * createTable "colorDepth", deps: []
 * createTable "computingEnvironment", deps: []
 * createTable "computingEnvironment_has_event", deps: []
 * createTable "configuredAudioDevice", deps: []
 * createTable "configuredGpuDevice", deps: []
 * createTable "configuredGpuDevice_has_displayDevice", deps: []
 * createTable "configuredKeyboardDevice", deps: []
 * createTable "configuredMachine", deps: []
 * createTable "configuredMachine_has_event", deps: []
 * createTable "configuredNetwork", deps: []
 * createTable "configuredNetworkDevice", deps: []
 * createTable "configuredNetworkMachine_expectedNetworkService", deps: []
 * createTable "configuredNetworkMachine_providesNetworkService", deps: []
 * createTable "configuredNetwork_emulatesNetworkService", deps: []
 * createTable "configuredNetwork_hasEvent", deps: []
 * createTable "configuredNetwork_has_configuredMachine", deps: []
 * createTable "configuredOS", deps: []
 * createTable "configuredOS_has_event", deps: []
 * createTable "configuredOS_has_formatOperation", deps: []
 * createTable "configuredOS_has_userInformation", deps: []
 * createTable "configuredOS_language", deps: []
 * createTable "configuredPointerDevice", deps: []
 * createTable "configuredSoftware", deps: []
 * createTable "configuredSoftware_has_event", deps: []
 * createTable "configuredSoftware_has_userInformation", deps: []
 * createTable "configuredSoftware_uses_formatImplementation", deps: []
 * createTable "configuredStorageDevice", deps: []
 * createTable "cpuArchitecture", deps: []
 * createTable "developer", deps: []
 * createTable "digitalObject", deps: []
 * createTable "digitalObjectFile_has_objectFileOperation", deps: []
 * createTable "digitalObject_has_alternativeID", deps: []
 * createTable "digitalObject_has_event", deps: []
 * createTable "digitalObject_has_objectFile", deps: []
 * createTable "digitalObject_isCompatibleWith_computingEnvironment", deps: []
 * createTable "displayDevice", deps: []
 * createTable "displayDevice_has_colorDepth", deps: []
 * createTable "displayDevice_has_displayInterface", deps: []
 * createTable "displayDevice_has_displayResolution", deps: []
 * createTable "displayDevice_has_driverSoftware", deps: []
 * createTable "displayResolution", deps: []
 * createTable "file", deps: []
 * createTable "fileExtension", deps: []
 * createTable "fileFormat", deps: []
 * createTable "fileFormat_has_fileExtension", deps: []
 * createTable "fileSystem", deps: []
 * createTable "formatImplementation", deps: []
 * createTable "formatImplementation_includes_fileFormat", deps: []
 * createTable "formatOperation", deps: []
 * createTable "gpuDevice", deps: []
 * createTable "gpuDevice_hasEquivalent", deps: []
 * createTable "gpuDevice_has_displayInterface", deps: []
 * createTable "gpuDevice_has_driverSoftware", deps: []
 * createTable "gpuDevice_has_machineInterface", deps: []
 * createTable "keyboardDevice", deps: []
 * createTable "keyboardDevice_has_driverSoftware", deps: []
 * createTable "keyboardDevice_has_language", deps: []
 * createTable "keyboardDevice_has_machineInterfaceID", deps: []
 * createTable "keyboardLayout", deps: []
 * createTable "machineType", deps: []
 * createTable "mountFormat", deps: []
 * createTable "networkDevice", deps: []
 * createTable "networkDevice_has_driverSoftware", deps: []
 * createTable "networkDevice_has_machineInterface", deps: []
 * createTable "audioDevice", deps: []
 * createTable "objectEnvironment", deps: []
 * createTable "objectEnvironment_has_event", deps: []
 * createTable "objectFileOperation", deps: []
 * createTable "osVersion", deps: []
 * createTable "osVersion_colorDepthSettings", deps: []
 * createTable "osVersion_displayResolutionSettings", deps: []
 * createTable "osVersion_has_alternateID", deps: []
 * createTable "osVersion_has_developer", deps: []
 * createTable "osVersion_has_programmingLanguage", deps: []
 * createTable "osVersion_has_softwareLicense", deps: []
 * createTable "osVersion_includes_softwareVersion", deps: []
 * createTable "osVersion_isCompatibleWith_configuredMachine", deps: []
 * createTable "osVersion_keyboardLanguageSettings", deps: []
 * createTable "osVersion_keyboardLayoutSettings", deps: []
 * createTable "osVersion_keyboardSetting", deps: []
 * createTable "osVersion_languageSettings", deps: []
 * createTable "osVersion_regionSettings", deps: []
 * createTable "osVersion_timeZoneSettings", deps: []
 * createTable "pointerDevice", deps: []
 * createTable "pointerDeviceType", deps: []
 * createTable "pointerDevice_has_driverSoftware", deps: []
 * createTable "pointerDevice_has_machineInterface", deps: []
 * createTable "programmingLanguage", deps: []
 * createTable "readWriteStatus", deps: []
 * createTable "region", deps: []
 * createTable "softwareEnvironment", deps: []
 * createTable "softwareEnvironment_hasPart_configuredSoftware", deps: []
 * createTable "softwareEnvironment_has_diskImage", deps: []
 * createTable "softwareEnvironment_has_event", deps: []
 * createTable "softwareFamilyVersion_hasPart_softwareVersion", deps: []
 * createTable "softwareFamily_hasPart_softwareProduct", deps: []
 * createTable "softwareLicense", deps: []
 * createTable "softwareObject", deps: []
 * createTable "softwareObjectFile_has_objectFileOperation", deps: []
 * createTable "softwareObject_has_alternateID", deps: []
 * createTable "softwareObject_has_event", deps: []
 * createTable "softwareObject_has_objectFile", deps: []
 * createTable "softwareObject_isManifestationOf_osVersion", deps: []
 * createTable "softwareObject_isManifestationOf_softwareVersion", deps: []
 * createTable "softwareProduct", deps: []
 * createTable "softwareProduct_has_alternateName", deps: []
 * createTable "softwareProduct_has_softwareType", deps: []
 * createTable "softwareType", deps: []
 * createTable "softwareVersion", deps: []
 * createTable "softwareVersion_has_alternateID", deps: []
 * createTable "softwareVersion_has_developer", deps: []
 * createTable "softwareVersion_has_formatImplementation", deps: []
 * createTable "softwareVersion_has_programmingLanguage", deps: []
 * createTable "softwareVersion_has_softwareLicense", deps: []
 * createTable "softwareVersion_isCompatibleWith_computingEnvironment", deps: []
 * createTable "softwareVersion_languageSettings", deps: []
 * createTable "storageDevice", deps: []
 * createTable "storageDeviceType", deps: []
 * createTable "storageDevice_has_driverSoftware", deps: []
 * createTable "storageDevice_has_machineInterface", deps: []
 * createTable "systemRequirements", deps: []
 * createTable "systemRequirements_includes_audioDevice", deps: []
 * createTable "systemRequirements_includes_cpuArchitecture", deps: []
 * createTable "systemRequirements_includes_gpuDevice", deps: []
 * createTable "systemRequirements_includes_machineType", deps: []
 * createTable "systemRequirements_includes_osVersion", deps: []
 * createTable "systemRequirements_includes_pointerDeviceType", deps: []
 * createTable "systemRequirements_includes_softwareVersion", deps: []
 * createTable "systemRequirements_includes_storageDeviceType", deps: []
 * createTable "timezone", deps: []
 * createTable "timezoneName", deps: []
 * createTable "timezone_has_timezoneName", deps: []
 * createTable "userInformation", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "initial-migration",
    "created": "2019-06-26T16:39:10.440Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "networkService",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "alternateName",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "audioDevice_hasEquivalent",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "audioDevice_has_driverSoftware",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "audioDevice_has_machineInterface",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "colorDepth",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "computingEnvironment",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "computingEnvironment_has_event",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "configuredAudioDevice",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "configuredGpuDevice",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "configuredGpuDevice_has_displayDevice",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "configuredKeyboardDevice",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "configuredMachine",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "configuredMachine_has_event",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "configuredNetwork",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "configuredNetworkDevice",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "configuredNetworkMachine_expectedNetworkService",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "configuredNetworkMachine_providesNetworkService",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "configuredNetwork_emulatesNetworkService",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "configuredNetwork_hasEvent",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "configuredNetwork_has_configuredMachine",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "configuredOS",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "configuredOS_has_event",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "configuredOS_has_formatOperation",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "configuredOS_has_userInformation",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "configuredOS_language",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "configuredPointerDevice",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "configuredSoftware",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "configuredSoftware_has_event",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "configuredSoftware_has_userInformation",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "configuredSoftware_uses_formatImplementation",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "configuredStorageDevice",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "cpuArchitecture",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "developer",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "digitalObject",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "digitalObjectFile_has_objectFileOperation",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "digitalObject_has_alternativeID",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "digitalObject_has_event",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "digitalObject_has_objectFile",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "digitalObject_isCompatibleWith_computingEnvironment",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "displayDevice",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "displayDevice_has_colorDepth",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "displayDevice_has_displayInterface",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "displayDevice_has_displayResolution",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "displayDevice_has_driverSoftware",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "displayResolution",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "file",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "fileExtension",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "fileFormat",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "fileFormat_has_fileExtension",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "fileSystem",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "formatImplementation",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "formatImplementation_includes_fileFormat",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "formatOperation",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "gpuDevice",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "gpuDevice_hasEquivalent",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "gpuDevice_has_displayInterface",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "gpuDevice_has_driverSoftware",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "gpuDevice_has_machineInterface",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "keyboardDevice",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "keyboardDevice_has_driverSoftware",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "keyboardDevice_has_language",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "keyboardDevice_has_machineInterfaceID",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "keyboardLayout",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "machineType",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "mountFormat",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "networkDevice",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "networkDevice_has_driverSoftware",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "networkDevice_has_machineInterface",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "audioDevice",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "objectEnvironment",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "objectEnvironment_has_event",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "objectFileOperation",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "osVersion",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "osVersion_colorDepthSettings",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "osVersion_displayResolutionSettings",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "osVersion_has_alternateID",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "osVersion_has_developer",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "osVersion_has_programmingLanguage",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "osVersion_has_softwareLicense",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "osVersion_includes_softwareVersion",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "osVersion_isCompatibleWith_configuredMachine",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "osVersion_keyboardLanguageSettings",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "osVersion_keyboardLayoutSettings",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "osVersion_keyboardSetting",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "osVersion_languageSettings",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "osVersion_regionSettings",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "osVersion_timeZoneSettings",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "pointerDevice",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "pointerDeviceType",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "pointerDevice_has_driverSoftware",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "pointerDevice_has_machineInterface",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "programmingLanguage",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "readWriteStatus",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "region",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "softwareEnvironment",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "softwareEnvironment_hasPart_configuredSoftware",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "softwareEnvironment_has_diskImage",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "softwareEnvironment_has_event",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "softwareFamilyVersion_hasPart_softwareVersion",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "softwareFamily_hasPart_softwareProduct",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "softwareLicense",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "softwareObject",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "softwareObjectFile_has_objectFileOperation",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "softwareObject_has_alternateID",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "softwareObject_has_event",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "softwareObject_has_objectFile",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "softwareObject_isManifestationOf_osVersion",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "softwareObject_isManifestationOf_softwareVersion",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "softwareProduct",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "softwareProduct_has_alternateName",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "softwareProduct_has_softwareType",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "softwareType",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "softwareVersion",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "softwareVersion_has_alternateID",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "softwareVersion_has_developer",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "softwareVersion_has_formatImplementation",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "softwareVersion_has_programmingLanguage",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "softwareVersion_has_softwareLicense",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "softwareVersion_isCompatibleWith_computingEnvironment",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "softwareVersion_languageSettings",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "storageDevice",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "storageDeviceType",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "storageDevice_has_driverSoftware",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "storageDevice_has_machineInterface",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "systemRequirements",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "systemRequirements_includes_audioDevice",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "systemRequirements_includes_cpuArchitecture",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "systemRequirements_includes_gpuDevice",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "systemRequirements_includes_machineType",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "systemRequirements_includes_osVersion",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "systemRequirements_includes_pointerDeviceType",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "systemRequirements_includes_softwareVersion",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "systemRequirements_includes_storageDeviceType",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "timezone",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "timezoneName",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "timezone_has_timezoneName",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "userInformation",
            {

            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};

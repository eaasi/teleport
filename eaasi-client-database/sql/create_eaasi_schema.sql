--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3
-- Dumped by pg_dump version 11.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS eaasi_dev;
--
-- Name: eaasi_dev; Type: DATABASE; Schema: -; Owner: eaasi_dev
--

CREATE DATABASE eaasi_dev WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C' LC_CTYPE = 'C';


ALTER DATABASE eaasi_dev OWNER TO eaasi_dev;

\connect eaasi_dev

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: alternateName; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."alternateName" (
    "alternateNameID" integer NOT NULL,
    "alternateName" character varying(255) NOT NULL
);


ALTER TABLE public."alternateName" OWNER TO eaasi_dev;

--
-- Name: alternateName_alternatenameid_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public."alternateName_alternatenameid_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."alternateName_alternatenameid_seq" OWNER TO eaasi_dev;

--
-- Name: alternateName_alternatenameid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public."alternateName_alternatenameid_seq" OWNED BY public."alternateName"."alternateNameID";


--
-- Name: audioDevice; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."audioDevice" (
    "audioDeviceID" integer NOT NULL,
    "audioDeviceQID" character varying(255),
    "audioDeviceName" integer NOT NULL
);


ALTER TABLE public."audioDevice" OWNER TO eaasi_dev;

--
-- Name: audioDevice_audioDeviceID_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public."audioDevice_audioDeviceID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."audioDevice_audioDeviceID_seq" OWNER TO eaasi_dev;

--
-- Name: audioDevice_audioDeviceID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public."audioDevice_audioDeviceID_seq" OWNED BY public."audioDevice"."audioDeviceID";


--
-- Name: audioDevice_hasEquivalent; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."audioDevice_hasEquivalent" (
    "audioDevice_audioDeviceID" integer NOT NULL,
    "audioDevice_equivalentAudioDevice" integer NOT NULL
);


ALTER TABLE public."audioDevice_hasEquivalent" OWNER TO eaasi_dev;

--
-- Name: audioDevice_has_driverSoftware; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."audioDevice_has_driverSoftware" (
    "audioDevice_audioDeviceID" integer NOT NULL,
    "audioDevice_driverSoftwareID" integer NOT NULL
);


ALTER TABLE public."audioDevice_has_driverSoftware" OWNER TO eaasi_dev;

--
-- Name: audioDevice_has_machineInterface; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."audioDevice_has_machineInterface" (
    "audioDevice_audioDeviceID" integer NOT NULL,
    "audioDevice_machineInterfaceID" integer NOT NULL
);


ALTER TABLE public."audioDevice_has_machineInterface" OWNER TO eaasi_dev;

--
-- Name: colorDepth; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."colorDepth" (
    "colorDepthID" integer NOT NULL,
    "colorDepthName" character varying(255) NOT NULL,
    "bitDepth" integer
);


ALTER TABLE public."colorDepth" OWNER TO eaasi_dev;

--
-- Name: color_depth_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public.color_depth_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.color_depth_settings_id_seq OWNER TO eaasi_dev;

--
-- Name: color_depth_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public.color_depth_settings_id_seq OWNED BY public."colorDepth"."colorDepthID";


--
-- Name: computingEnvironment; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."computingEnvironment" (
    "computingEnvironmentID" integer NOT NULL,
    "computingEnvironment_hasSourceOrg" integer,
    "computingEnvironment_inNetwork" boolean,
    "computingEnvironment_configuredNetworkID" integer,
    "computingEnvironment_softwareEnvironmentID" integer
);


ALTER TABLE public."computingEnvironment" OWNER TO eaasi_dev;

--
-- Name: computingEnvironment_has_event; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."computingEnvironment_has_event" (
    "computingEnvironment_computingEnvironmentID" integer NOT NULL,
    "event_eventID" integer NOT NULL
);


ALTER TABLE public."computingEnvironment_has_event" OWNER TO eaasi_dev;

--
-- Name: computing_environment_id_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public.computing_environment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.computing_environment_id_seq OWNER TO eaasi_dev;

--
-- Name: computing_environment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public.computing_environment_id_seq OWNED BY public."computingEnvironment"."computingEnvironmentID";


--
-- Name: configuredAudioDevice; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."configuredAudioDevice" (
    "configuredMachine_machineID" integer,
    "configuredAudioDevice_audioDeviceID" integer,
    "configuredAudioDevice_irq" character varying(255) NOT NULL,
    "configuredAudioDevice_usesMachineInterface" integer
);


ALTER TABLE public."configuredAudioDevice" OWNER TO eaasi_dev;

--
-- Name: configuredGpuDevice; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."configuredGpuDevice" (
    "configuredMachine_machineID" integer,
    "configuredGpuDevice_gpuDeviceID" integer NOT NULL,
    "configuredGpuDevice_memoryBytes" integer,
    "configuredGpuDevice_irq" character varying(255),
    "configuredGpuDevice_usesMachineInterface" integer
);


ALTER TABLE public."configuredGpuDevice" OWNER TO eaasi_dev;

--
-- Name: configuredGpuDevice_has_displayDevice; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."configuredGpuDevice_has_displayDevice" (
    "configuredMachine_machineID" integer NOT NULL,
    "configuredGpuDevice_gpuDeviceID" integer NOT NULL,
    "configuredGpuDevice_displayDeviceID" integer NOT NULL,
    "displayDevice_usesDisplayInterface" integer NOT NULL
);


ALTER TABLE public."configuredGpuDevice_has_displayDevice" OWNER TO eaasi_dev;

--
-- Name: configuredKeyboardDevice; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."configuredKeyboardDevice" (
    "configuredMachine_machineID" integer NOT NULL,
    "configuredKeyboardDevice_keyboardDeviceID" integer NOT NULL,
    "configuredKeyboardDevice_usesMachineInterface" integer
);


ALTER TABLE public."configuredKeyboardDevice" OWNER TO eaasi_dev;

--
-- Name: configuredMachine; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."configuredMachine" (
    "configuredMachineID" integer NOT NULL,
    "configuredMachineName" character varying(255) NOT NULL,
    "configuredMachineDescription" character varying(255) NOT NULL,
    "configuredMachineDateTime" timestamp without time zone NOT NULL,
    "configuredMachineType" integer,
    "configuredMachineRamBytes" character varying(255) NOT NULL,
    "configuredMachineArchitecture" character varying(255),
    "configuredMachineCpuCores" character varying(255),
    "configuredMachine_emulatorSoftwareID" integer
);


ALTER TABLE public."configuredMachine" OWNER TO eaasi_dev;

--
-- Name: configuredMachine_configuredMachineID_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public."configuredMachine_configuredMachineID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."configuredMachine_configuredMachineID_seq" OWNER TO eaasi_dev;

--
-- Name: configuredMachine_configuredMachineID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public."configuredMachine_configuredMachineID_seq" OWNED BY public."configuredMachine"."configuredMachineID";


--
-- Name: configuredMachine_has_event; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."configuredMachine_has_event" (
    "configuredMachine_machineID" integer NOT NULL,
    "event_eventID" integer
);


ALTER TABLE public."configuredMachine_has_event" OWNER TO eaasi_dev;

--
-- Name: configuredNetwork; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."configuredNetwork" (
    "configuredNetworkID" integer NOT NULL,
    "configuredNetworkName" character varying(255),
    "configuredNetworkDescription" character varying(255)
);


ALTER TABLE public."configuredNetwork" OWNER TO eaasi_dev;

--
-- Name: configuredNetworkDevice; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."configuredNetworkDevice" (
    "configuredMachine_machineID" integer NOT NULL,
    "configuredNetworkDevice_networkDeviceID" integer NOT NULL,
    "configuredNetworkDevice_macAddress" integer,
    "configuredNetworkDevice_usesMachineInterface" integer
);


ALTER TABLE public."configuredNetworkDevice" OWNER TO eaasi_dev;

--
-- Name: configuredNetworkMachine_expectedNetworkService; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."configuredNetworkMachine_expectedNetworkService" (
    "configuredNetworkMachine_configuredNetworkID" integer,
    "configuredNetworkMachine_configuredMachineID" integer,
    "configuredNetworkMachine_expectedNetworkServiceID" integer,
    "servicePortExpected" character varying(255)
);


ALTER TABLE public."configuredNetworkMachine_expectedNetworkService" OWNER TO eaasi_dev;

--
-- Name: configuredNetworkMachine_providesNetworkService; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."configuredNetworkMachine_providesNetworkService" (
    "configuredNetworkMachine_configuredNetworkID" integer NOT NULL,
    "configuredNetworkMachine_configuredMachineID" integer,
    "configuredNetworkMachine_providesNetworkServiceID" integer,
    "servicePortExposed" character varying(255)
);


ALTER TABLE public."configuredNetworkMachine_providesNetworkService" OWNER TO eaasi_dev;

--
-- Name: configuredNetwork_emulatesNetworkService; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."configuredNetwork_emulatesNetworkService" (
    "configuredNetwork_configuredNetworkID" integer NOT NULL,
    "configuredNetwork_networkServiceID" integer,
    "servicePortExposed" character varying(255)
);


ALTER TABLE public."configuredNetwork_emulatesNetworkService" OWNER TO eaasi_dev;

--
-- Name: configuredNetwork_hasEvent; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."configuredNetwork_hasEvent" (
    "configuredNetwork_configuredNetworkID" integer NOT NULL,
    "event_eventID" integer
);


ALTER TABLE public."configuredNetwork_hasEvent" OWNER TO eaasi_dev;

--
-- Name: configuredNetwork_has_configuredMachine; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."configuredNetwork_has_configuredMachine" (
    "configuredNetwork_configuredNetworkID" integer NOT NULL,
    "configuredNetwork_machineID" integer NOT NULL,
    "bootOrder" integer NOT NULL,
    "staticIpAddress" character varying(255)
);


ALTER TABLE public."configuredNetwork_has_configuredMachine" OWNER TO eaasi_dev;

--
-- Name: configuredOS; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."configuredOS" (
    "configuredOperatingSystemID" integer NOT NULL,
    "configuredDisplayResolution" integer,
    "configuredColorDepth" integer,
    "configuredRegion" character varying(255),
    "configuredTimezone" character varying(255),
    "configuredDateTime" timestamp without time zone,
    "hasSource_softwareObjectID" integer,
    "manifestationOf_osVersion" integer
);


ALTER TABLE public."configuredOS" OWNER TO eaasi_dev;

--
-- Name: configuredOS_has_event; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."configuredOS_has_event" (
    "configuredOS_configuredOperatingSystemID" integer,
    "event_eventID" integer
);


ALTER TABLE public."configuredOS_has_event" OWNER TO eaasi_dev;

--
-- Name: configuredOS_has_formatOperation; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."configuredOS_has_formatOperation" (
    "configuredOS_configuredOperatingSystemID" integer,
    "formatOperation_opensFileFormat" character varying(255),
    "formatOperation_usesConfiguredSoftware" integer
);


ALTER TABLE public."configuredOS_has_formatOperation" OWNER TO eaasi_dev;

--
-- Name: configuredOS_has_userInformation; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."configuredOS_has_userInformation" (
    "configuredOS_configuredOperatingSystemID" integer,
    "userInformation_userInformationID" integer
);


ALTER TABLE public."configuredOS_has_userInformation" OWNER TO eaasi_dev;

--
-- Name: configuredOS_language; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."configuredOS_language" (
    "configuredOS_configuredOperatingSystemID" integer,
    "configuredOs_languageQID" character varying(255),
    "configuredOS_primaryLanguage" boolean
);


ALTER TABLE public."configuredOS_language" OWNER TO eaasi_dev;

--
-- Name: configuredPointerDevice; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."configuredPointerDevice" (
    "configuredMachine_machineID" integer NOT NULL,
    "configuredPointerDevice_pointerDeviceID" integer NOT NULL,
    "configuredPointerDevice_usesMachineInterface" integer NOT NULL
);


ALTER TABLE public."configuredPointerDevice" OWNER TO eaasi_dev;

--
-- Name: configuredSoftware; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."configuredSoftware" (
    "configuredSoftwareVersionID" integer NOT NULL,
    "executableLocation" character varying(255),
    "executableSyntax" character varying(255),
    "saveLocation" character varying(255),
    "configuredLanguage" integer,
    "hasSource_softwareObjectID" integer NOT NULL,
    "hasSource_digitalObjectID" integer,
    "manifestaionOf_softwareVersion" integer
);


ALTER TABLE public."configuredSoftware" OWNER TO eaasi_dev;

--
-- Name: configuredSoftware_has_event; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."configuredSoftware_has_event" (
    "configuredSoftware_configuredSoftwareManifestationID" integer,
    "event_eventID" integer
);


ALTER TABLE public."configuredSoftware_has_event" OWNER TO eaasi_dev;

--
-- Name: configuredSoftware_has_userInformation; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."configuredSoftware_has_userInformation" (
    "configuredSoftware_configuredSoftwareManifestationID" integer,
    "userInformation_userInformationID" integer
);


ALTER TABLE public."configuredSoftware_has_userInformation" OWNER TO eaasi_dev;

--
-- Name: configuredSoftware_uses_formatImplementation; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."configuredSoftware_uses_formatImplementation" (
    "configuredSoftware_configuredSoftwareManifestationID" integer,
    "configuredSoftware_formatImplementation" integer,
    "configuredFormatOperation" integer
);


ALTER TABLE public."configuredSoftware_uses_formatImplementation" OWNER TO eaasi_dev;

--
-- Name: configuredStorageDevice; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."configuredStorageDevice" (
    "configuredMachine_machineID" integer NOT NULL,
    "configureStorageDevice_storageDeviceID" integer NOT NULL,
    "configuredStorageDevice_usesMachineInterface" integer,
    "configuredStorageDevice_idBootOrder" integer NOT NULL
);


ALTER TABLE public."configuredStorageDevice" OWNER TO eaasi_dev;

--
-- Name: configured_network_id_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public.configured_network_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.configured_network_id_seq OWNER TO eaasi_dev;

--
-- Name: configured_network_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public.configured_network_id_seq OWNED BY public."configuredNetwork"."configuredNetworkID";


--
-- Name: configured_os_id_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public.configured_os_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.configured_os_id_seq OWNER TO eaasi_dev;

--
-- Name: configured_os_id_seq1; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public.configured_os_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.configured_os_id_seq1 OWNER TO eaasi_dev;

--
-- Name: configured_os_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public.configured_os_id_seq1 OWNED BY public."configuredOS"."configuredOperatingSystemID";


--
-- Name: configured_software_id_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public.configured_software_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.configured_software_id_seq OWNER TO eaasi_dev;

--
-- Name: configured_software_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public.configured_software_id_seq OWNED BY public."configuredSoftware"."configuredSoftwareVersionID";


--
-- Name: cpuArchitecture; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."cpuArchitecture" (
    "cpuArchitectureQID" character varying(255) NOT NULL,
    "cpuArchitectureName" character varying(255) NOT NULL
);


ALTER TABLE public."cpuArchitecture" OWNER TO eaasi_dev;

--
-- Name: developer; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public.developer (
    "developerQID" character varying(255) NOT NULL,
    "developerName" character varying(255) NOT NULL
);


ALTER TABLE public.developer OWNER TO eaasi_dev;

--
-- Name: digitalObject; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."digitalObject" (
    "digitalObjectID" integer NOT NULL,
    "digitalObjectName" character varying(255),
    "digitalObjectDescription" character varying(45),
    "digitalObjectProductKey" character varying(255),
    "digitalObjectHelpText" text,
    "digitalObjectSystemRequirements" integer
);


ALTER TABLE public."digitalObject" OWNER TO eaasi_dev;

--
-- Name: digitalObjectFile_has_objectFileOperation; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."digitalObjectFile_has_objectFileOperation" (
    "digitalObjectFile_digitalObjectID" integer,
    "digitalObjectFile_fileID" integer,
    "digitalObjectFile_operationID" integer,
    "digitalObjectFile_operationOrder" integer
);


ALTER TABLE public."digitalObjectFile_has_objectFileOperation" OWNER TO eaasi_dev;

--
-- Name: digitalObject_has_alternativeID; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."digitalObject_has_alternativeID" (
    "digitalObject_digitalObjectID" integer NOT NULL,
    "alternativeID_alternativeID" character varying(255)
);


ALTER TABLE public."digitalObject_has_alternativeID" OWNER TO eaasi_dev;

--
-- Name: digitalObject_has_event; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."digitalObject_has_event" (
    "digitalObject_digialObjectID" integer,
    "event_eventID" integer
);


ALTER TABLE public."digitalObject_has_event" OWNER TO eaasi_dev;

--
-- Name: digitalObject_has_objectFile; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."digitalObject_has_objectFile" (
    "digitalObject_digitalObjectID" integer NOT NULL,
    "digitalObjectFileID" integer NOT NULL,
    "digitalObjectFileLabel" character varying(255),
    "digitalObjectFile_usesMountFormat" character varying(255)
);


ALTER TABLE public."digitalObject_has_objectFile" OWNER TO eaasi_dev;

--
-- Name: digitalObject_isCompatibleWith_computingEnvironment; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."digitalObject_isCompatibleWith_computingEnvironment" (
    "digitalObject_digitalObjectID" integer NOT NULL,
    "compatibleComputingEnvironmentID" integer NOT NULL
);


ALTER TABLE public."digitalObject_isCompatibleWith_computingEnvironment" OWNER TO eaasi_dev;

--
-- Name: digital_object_id_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public.digital_object_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.digital_object_id_seq OWNER TO eaasi_dev;

--
-- Name: digital_object_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public.digital_object_id_seq OWNED BY public."digitalObject"."digitalObjectID";


--
-- Name: displayDevice; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."displayDevice" (
    "displayDeviceID" integer NOT NULL,
    "displayDeviceQID" character varying(255),
    "displayDeviceName" character varying(255)
);


ALTER TABLE public."displayDevice" OWNER TO eaasi_dev;

--
-- Name: displayDevice_displayDeviceID_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public."displayDevice_displayDeviceID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."displayDevice_displayDeviceID_seq" OWNER TO eaasi_dev;

--
-- Name: displayDevice_displayDeviceID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public."displayDevice_displayDeviceID_seq" OWNED BY public."displayDevice"."displayDeviceID";


--
-- Name: displayDevice_has_colorDepth; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."displayDevice_has_colorDepth" (
    "displayDevice_displayDeviceID" integer NOT NULL,
    "colorDepth_colorDepthID" integer
);


ALTER TABLE public."displayDevice_has_colorDepth" OWNER TO eaasi_dev;

--
-- Name: displayDevice_has_displayInterface; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."displayDevice_has_displayInterface" (
    "displayDevice_displayDeviceID" integer NOT NULL,
    "displayInterface_displayInterfaceID" integer
);


ALTER TABLE public."displayDevice_has_displayInterface" OWNER TO eaasi_dev;

--
-- Name: displayDevice_has_displayResolution; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."displayDevice_has_displayResolution" (
    "displayDevice_displayDeviceID" integer NOT NULL,
    "availableDisplayResolution" integer NOT NULL
);


ALTER TABLE public."displayDevice_has_displayResolution" OWNER TO eaasi_dev;

--
-- Name: displayDevice_has_driverSoftware; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."displayDevice_has_driverSoftware" (
    "displayDevice_displayDeviceID" integer NOT NULL,
    "displayDevice_driverSoftwareID" integer NOT NULL
);


ALTER TABLE public."displayDevice_has_driverSoftware" OWNER TO eaasi_dev;

--
-- Name: displayResolution; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."displayResolution" (
    "displayResolutionID" integer NOT NULL,
    "displayResolutionName" character varying(255) NOT NULL
);


ALTER TABLE public."displayResolution" OWNER TO eaasi_dev;

--
-- Name: display_resolution_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public.display_resolution_settings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.display_resolution_settings_id_seq OWNER TO eaasi_dev;

--
-- Name: display_resolution_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public.display_resolution_settings_id_seq OWNED BY public."displayResolution"."displayResolutionID";


--
-- Name: file; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public.file (
    "fileID" integer NOT NULL,
    "fileLocation" character varying(255),
    "fileName" character varying(255),
    "fileChecksum" character varying(255),
    "fileFormat" character varying(255),
    "fileSize" character varying(255)
);


ALTER TABLE public.file OWNER TO eaasi_dev;

--
-- Name: fileExtension; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."fileExtension" (
    "fileExtensionID" integer NOT NULL,
    extension character varying(255) NOT NULL
);


ALTER TABLE public."fileExtension" OWNER TO eaasi_dev;

--
-- Name: fileExtension_fileExtensionID_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public."fileExtension_fileExtensionID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."fileExtension_fileExtensionID_seq" OWNER TO eaasi_dev;

--
-- Name: fileExtension_fileExtensionID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public."fileExtension_fileExtensionID_seq" OWNED BY public."fileExtension"."fileExtensionID";


--
-- Name: fileFormat; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."fileFormat" (
    "fileFormatQID" character varying(255) NOT NULL,
    "fileFormatName" character varying(255),
    "pronomID" character varying(255)
);


ALTER TABLE public."fileFormat" OWNER TO eaasi_dev;

--
-- Name: fileFormat_has_fileExtension; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."fileFormat_has_fileExtension" (
    "fileFormat_fileFormatQID" character varying(255) NOT NULL,
    "fileExtension_fileExtensionID" integer NOT NULL
);


ALTER TABLE public."fileFormat_has_fileExtension" OWNER TO eaasi_dev;

--
-- Name: fileSystem; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."fileSystem" (
    "fileSystemQID" character varying(255) NOT NULL,
    "fileSystemName" integer NOT NULL
);


ALTER TABLE public."fileSystem" OWNER TO eaasi_dev;

--
-- Name: formatImplementation; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."formatImplementation" (
    "formatImplementationID" integer NOT NULL,
    "formatImplementationName" character varying(255) NOT NULL,
    "implementationExtension" integer
);


ALTER TABLE public."formatImplementation" OWNER TO eaasi_dev;

--
-- Name: file_format_operation_id_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public.file_format_operation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.file_format_operation_id_seq OWNER TO eaasi_dev;

--
-- Name: file_format_operation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public.file_format_operation_id_seq OWNED BY public."formatImplementation"."formatImplementationID";


--
-- Name: file_id_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public.file_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.file_id_seq OWNER TO eaasi_dev;

--
-- Name: file_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public.file_id_seq OWNED BY public.file."fileID";


--
-- Name: formatImplementation_includes_fileFormat; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."formatImplementation_includes_fileFormat" (
    "formatImplementation_formatImplementationID" integer NOT NULL,
    "fileFormat_fileFormatQID" character varying(255) NOT NULL
);


ALTER TABLE public."formatImplementation_includes_fileFormat" OWNER TO eaasi_dev;

--
-- Name: formatOperation; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."formatOperation" (
    "operationID" integer NOT NULL,
    "operationName" character varying(255) NOT NULL
);


ALTER TABLE public."formatOperation" OWNER TO eaasi_dev;

--
-- Name: formatOperation_operationID_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public."formatOperation_operationID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."formatOperation_operationID_seq" OWNER TO eaasi_dev;

--
-- Name: formatOperation_operationID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public."formatOperation_operationID_seq" OWNED BY public."formatOperation"."operationID";


--
-- Name: gpuDevice; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."gpuDevice" (
    "gpuDeviceID" integer NOT NULL,
    "gpuDeviceQID" character varying(255),
    "gpuDeviceName" character varying(255) NOT NULL
);


ALTER TABLE public."gpuDevice" OWNER TO eaasi_dev;

--
-- Name: gpuDevice_gpuDeviceID_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public."gpuDevice_gpuDeviceID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."gpuDevice_gpuDeviceID_seq" OWNER TO eaasi_dev;

--
-- Name: gpuDevice_gpuDeviceID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public."gpuDevice_gpuDeviceID_seq" OWNED BY public."gpuDevice"."gpuDeviceID";


--
-- Name: gpuDevice_hasEquivalent; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."gpuDevice_hasEquivalent" (
    "gpuDevice_gpuDeviceID" integer NOT NULL,
    "gpuDevice_equivalentGpuDevice" integer NOT NULL
);


ALTER TABLE public."gpuDevice_hasEquivalent" OWNER TO eaasi_dev;

--
-- Name: gpuDevice_has_displayInterface; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."gpuDevice_has_displayInterface" (
    "gpuDevice_gpuDeviceID" integer NOT NULL,
    "displayInterface_displayInterfaceID" integer NOT NULL
);


ALTER TABLE public."gpuDevice_has_displayInterface" OWNER TO eaasi_dev;

--
-- Name: gpuDevice_has_driverSoftware; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."gpuDevice_has_driverSoftware" (
    "gpuDevice_gpuDeviceID" integer NOT NULL,
    "gpuDevice_driverSoftwareID" integer NOT NULL
);


ALTER TABLE public."gpuDevice_has_driverSoftware" OWNER TO eaasi_dev;

--
-- Name: gpuDevice_has_machineInterface; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."gpuDevice_has_machineInterface" (
    "gpuDevice_gpuDeviceID" integer NOT NULL,
    "gpuDevice_machineInterfaceID" integer NOT NULL
);


ALTER TABLE public."gpuDevice_has_machineInterface" OWNER TO eaasi_dev;

--
-- Name: keyboardDevice; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."keyboardDevice" (
    "keyboardDeviceID" integer NOT NULL,
    "keyboardDeviceQID" character varying(255),
    "keyboardDeviceName" character varying(255) NOT NULL,
    "keyboardDevice_keyboardLayout" character varying(255)
);


ALTER TABLE public."keyboardDevice" OWNER TO eaasi_dev;

--
-- Name: keyboardDevice_has_driverSoftware; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."keyboardDevice_has_driverSoftware" (
    "keyboardDevice_keyboardDeviceID" integer,
    "keyboardDevice_driverSoftware" integer NOT NULL
);


ALTER TABLE public."keyboardDevice_has_driverSoftware" OWNER TO eaasi_dev;

--
-- Name: keyboardDevice_has_language; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."keyboardDevice_has_language" (
    "keyboardDevice_keyboardDeviceID" integer NOT NULL,
    "keyboardDevice_languageQID" character varying(255) NOT NULL
);


ALTER TABLE public."keyboardDevice_has_language" OWNER TO eaasi_dev;

--
-- Name: keyboardDevice_has_machineInterfaceID; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."keyboardDevice_has_machineInterfaceID" (
    "keyboardDevice_keyboardDeviceID" integer NOT NULL,
    "keyboardDevice_machineInterfaceID" integer NOT NULL
);


ALTER TABLE public."keyboardDevice_has_machineInterfaceID" OWNER TO eaasi_dev;

--
-- Name: keyboardDevice_keyboardDeviceID_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public."keyboardDevice_keyboardDeviceID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."keyboardDevice_keyboardDeviceID_seq" OWNER TO eaasi_dev;

--
-- Name: keyboardDevice_keyboardDeviceID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public."keyboardDevice_keyboardDeviceID_seq" OWNED BY public."keyboardDevice"."keyboardDeviceID";


--
-- Name: keyboardLayout; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."keyboardLayout" (
    "keyboardLayoutQID" character varying(255) NOT NULL,
    "keyboardLayoutName" character varying(255) NOT NULL
);


ALTER TABLE public."keyboardLayout" OWNER TO eaasi_dev;

--
-- Name: machineType; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."machineType" (
    "machineTypeID" integer NOT NULL,
    "machineTypeName" character varying(255) NOT NULL
);


ALTER TABLE public."machineType" OWNER TO eaasi_dev;

--
-- Name: machineType_machineTypeID_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public."machineType_machineTypeID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."machineType_machineTypeID_seq" OWNER TO eaasi_dev;

--
-- Name: machineType_machineTypeID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public."machineType_machineTypeID_seq" OWNED BY public."machineType"."machineTypeID";


--
-- Name: mountFormat; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."mountFormat" (
    "mountFormatQID" character varying(255) NOT NULL,
    "mountFormatName" character varying(255) NOT NULL
);


ALTER TABLE public."mountFormat" OWNER TO eaasi_dev;

--
-- Name: networkDevice; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."networkDevice" (
    "networkDeviceID" integer NOT NULL,
    "networkDeviceQID" character varying(255),
    "networkDeviceName" character varying(255) NOT NULL
);


ALTER TABLE public."networkDevice" OWNER TO eaasi_dev;

--
-- Name: networkDevice_has_driverSoftware; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."networkDevice_has_driverSoftware" (
    "networkDevice_networkDeviceID" integer,
    "driverSoftware_driverSoftware" integer
);


ALTER TABLE public."networkDevice_has_driverSoftware" OWNER TO eaasi_dev;

--
-- Name: networkDevice_has_machineInterface; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."networkDevice_has_machineInterface" (
    "networkDevice_networkDeviceID" integer NOT NULL,
    "networkDevice_machineInterfaceID" integer
);


ALTER TABLE public."networkDevice_has_machineInterface" OWNER TO eaasi_dev;

--
-- Name: networkDevice_networkDeviceID_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public."networkDevice_networkDeviceID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."networkDevice_networkDeviceID_seq" OWNER TO eaasi_dev;

--
-- Name: networkDevice_networkDeviceID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public."networkDevice_networkDeviceID_seq" OWNED BY public."networkDevice"."networkDeviceID";


--
-- Name: networkService; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."networkService" (
    "networkServiceID" integer NOT NULL,
    "networkServiceName" character varying(255) NOT NULL,
    "networkServiceQID" character varying(255),
    "defaultPort" character varying(255),
    "defaultPortRange" character varying(255)
);


ALTER TABLE public."networkService" OWNER TO eaasi_dev;

--
-- Name: networkService_networkServiceID_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public."networkService_networkServiceID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."networkService_networkServiceID_seq" OWNER TO eaasi_dev;

--
-- Name: networkService_networkServiceID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public."networkService_networkServiceID_seq" OWNED BY public."networkService"."networkServiceID";


--
-- Name: objectEnvironment; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."objectEnvironment" (
    "objectEnvironment_objectEnvironment_computingEnvironmentID" integer NOT NULL,
    "objectEnvironment_objectEnvironment_digitalObjectID" integer,
    "objectEnvironment_concurrentInstances" integer,
    "objectEnvironmentName" character varying(255),
    "objectEnvironmentDescription" character varying(255),
    "objectEnvironmentHelpText" text
);


ALTER TABLE public."objectEnvironment" OWNER TO eaasi_dev;

--
-- Name: objectEnvironment_has_event; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."objectEnvironment_has_event" (
    "objectEnvironment_objectEnvironment_computingEnvironmentID" integer,
    "objectEnvironment_objectEnvironment_digitalObjectID" integer,
    "event_eventID" integer
);


ALTER TABLE public."objectEnvironment_has_event" OWNER TO eaasi_dev;

--
-- Name: objectFileOperation; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."objectFileOperation" (
    "operationID" integer NOT NULL,
    "operationName" character varying(255) NOT NULL
);


ALTER TABLE public."objectFileOperation" OWNER TO eaasi_dev;

--
-- Name: osVersion; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."osVersion" (
    "osVersionID" integer NOT NULL,
    "osVersionQID" integer,
    "osVersionName" character varying(255),
    "osVersionDescription" character varying(255),
    "osVersionNumber" character varying(255),
    "osVersionPublicationDate" timestamp without time zone,
    "osVersionSystemRequirements" integer NOT NULL,
    "isVersionOf_osProduct" integer
);


ALTER TABLE public."osVersion" OWNER TO eaasi_dev;

--
-- Name: osVersion_colorDepthSettings; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."osVersion_colorDepthSettings" (
    "osVersion_osVersionID" integer NOT NULL,
    "osVersion_colorDepthID" integer NOT NULL
);


ALTER TABLE public."osVersion_colorDepthSettings" OWNER TO eaasi_dev;

--
-- Name: osVersion_displayResolutionSettings; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."osVersion_displayResolutionSettings" (
    "osVersion_osVersionID" integer NOT NULL,
    "osVersion_displayResolutionID" integer NOT NULL
);


ALTER TABLE public."osVersion_displayResolutionSettings" OWNER TO eaasi_dev;

--
-- Name: osVersion_has_alternateID; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."osVersion_has_alternateID" (
    "osVersion_osVersionID" integer,
    "osVersion_alternativeID" character varying(255) NOT NULL
);


ALTER TABLE public."osVersion_has_alternateID" OWNER TO eaasi_dev;

--
-- Name: osVersion_has_developer; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."osVersion_has_developer" (
    "osVersion_osVersionID" integer NOT NULL,
    "osVersion_developerQID" character varying(255) NOT NULL
);


ALTER TABLE public."osVersion_has_developer" OWNER TO eaasi_dev;

--
-- Name: osVersion_has_programmingLanguage; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."osVersion_has_programmingLanguage" (
    "osVersion_osVersionID" integer NOT NULL,
    "osVersion_programmingLanguageQID" character varying(255) NOT NULL
);


ALTER TABLE public."osVersion_has_programmingLanguage" OWNER TO eaasi_dev;

--
-- Name: osVersion_has_softwareLicense; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."osVersion_has_softwareLicense" (
    "osVersion_osVersionID" integer NOT NULL,
    "osVersion_softwareLicenseQID" character varying(255) NOT NULL
);


ALTER TABLE public."osVersion_has_softwareLicense" OWNER TO eaasi_dev;

--
-- Name: osVersion_includes_softwareVersion; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."osVersion_includes_softwareVersion" (
    "osVersion_osVersionID" integer NOT NULL,
    "osVersion_softwareVersionID" integer NOT NULL
);


ALTER TABLE public."osVersion_includes_softwareVersion" OWNER TO eaasi_dev;

--
-- Name: osVersion_isCompatibleWith_configuredMachine; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."osVersion_isCompatibleWith_configuredMachine" (
    "osVersion_osVersionID" integer NOT NULL,
    "compatibleMachineID" integer
);


ALTER TABLE public."osVersion_isCompatibleWith_configuredMachine" OWNER TO eaasi_dev;

--
-- Name: osVersion_keyboardLanguageSettings; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."osVersion_keyboardLanguageSettings" (
    "osVersion_osVersionID" integer NOT NULL,
    "osVersion_keyboardLanguageQID" character varying(255) NOT NULL
);


ALTER TABLE public."osVersion_keyboardLanguageSettings" OWNER TO eaasi_dev;

--
-- Name: osVersion_keyboardLayoutSettings; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."osVersion_keyboardLayoutSettings" (
    "osVersion_osVersionID" integer NOT NULL,
    "osVersion_keyboardLayoutQID" character varying(255) NOT NULL,
    "osVersion_keyboardLayoutName" character varying(255)
);


ALTER TABLE public."osVersion_keyboardLayoutSettings" OWNER TO eaasi_dev;

--
-- Name: osVersion_keyboardSetting; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."osVersion_keyboardSetting" (
    "osVersion_osVersionID" integer NOT NULL,
    "osVersion_keyboardSettingLanguage" character varying(255) NOT NULL,
    "osVersion_keyboardSettingLayout" character varying(255),
    "osVersion_keyboardSettingName" character varying(255)
);


ALTER TABLE public."osVersion_keyboardSetting" OWNER TO eaasi_dev;

--
-- Name: osVersion_languageSettings; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."osVersion_languageSettings" (
    "osVersion_osVersionID" integer NOT NULL,
    "osVersion_languageQID" integer,
    "osVersion_DefaultLanguage" boolean
);


ALTER TABLE public."osVersion_languageSettings" OWNER TO eaasi_dev;

--
-- Name: osVersion_regionSettings; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."osVersion_regionSettings" (
    "osVersion_osVersionID" integer,
    "osVersion_regionQID" character varying(255),
    "osVersion_defaultRegion" boolean
);


ALTER TABLE public."osVersion_regionSettings" OWNER TO eaasi_dev;

--
-- Name: osVersion_timeZoneSettings; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."osVersion_timeZoneSettings" (
    "osVersion_osVersionID" integer,
    "osVersion_timezoneQID" character varying(255),
    "osVersion_timezoneName" character varying(255)
);


ALTER TABLE public."osVersion_timeZoneSettings" OWNER TO eaasi_dev;

--
-- Name: os_version_id_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public.os_version_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.os_version_id_seq OWNER TO eaasi_dev;

--
-- Name: os_version_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public.os_version_id_seq OWNED BY public."osVersion"."osVersionID";


--
-- Name: os_version_language_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public.os_version_language_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.os_version_language_settings_id_seq OWNER TO eaasi_dev;

--
-- Name: os_version_language_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public.os_version_language_settings_id_seq OWNED BY public."osVersion_languageSettings"."osVersion_osVersionID";


--
-- Name: pointerDevice; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."pointerDevice" (
    "pointerDeviceID" integer NOT NULL,
    "pointerDeviceQID" character varying(255),
    "pointerDeviceName" character varying(255) NOT NULL,
    "pointerDeviceType" integer NOT NULL
);


ALTER TABLE public."pointerDevice" OWNER TO eaasi_dev;

--
-- Name: pointerDeviceType; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."pointerDeviceType" (
    "pointerDeviceTypeID" integer NOT NULL,
    "pointerDeviceTypeName" character varying(255) NOT NULL,
    "pointerDeviceTypeQID" character varying(255)
);


ALTER TABLE public."pointerDeviceType" OWNER TO eaasi_dev;

--
-- Name: pointerDeviceType_pointerDeviceTypeID_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public."pointerDeviceType_pointerDeviceTypeID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."pointerDeviceType_pointerDeviceTypeID_seq" OWNER TO eaasi_dev;

--
-- Name: pointerDeviceType_pointerDeviceTypeID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public."pointerDeviceType_pointerDeviceTypeID_seq" OWNED BY public."pointerDeviceType"."pointerDeviceTypeID";


--
-- Name: pointerDevice_has_driverSoftware; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."pointerDevice_has_driverSoftware" (
    "pointerDevice_pointerDeviceID" integer NOT NULL,
    "pointerDevice_driverSoftwareID" integer NOT NULL
);


ALTER TABLE public."pointerDevice_has_driverSoftware" OWNER TO eaasi_dev;

--
-- Name: pointerDevice_has_machineInterface; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."pointerDevice_has_machineInterface" (
    "pointerDevice_pointerDeviceID" integer NOT NULL,
    "pointerDevice_machineInterfaceID" integer NOT NULL
);


ALTER TABLE public."pointerDevice_has_machineInterface" OWNER TO eaasi_dev;

--
-- Name: programmingLanguage; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."programmingLanguage" (
    "programmingLanguageQID" character varying(255) NOT NULL,
    "programmingLanguageName" character varying(255) NOT NULL
);


ALTER TABLE public."programmingLanguage" OWNER TO eaasi_dev;

--
-- Name: readWriteStatus; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."readWriteStatus" (
    "readWriteStatusID" integer NOT NULL,
    "readWriteStatusName" character varying(255) NOT NULL
);


ALTER TABLE public."readWriteStatus" OWNER TO eaasi_dev;

--
-- Name: readwritestatus_readwritestatusid_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public.readwritestatus_readwritestatusid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.readwritestatus_readwritestatusid_seq OWNER TO eaasi_dev;

--
-- Name: readwritestatus_readwritestatusid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public.readwritestatus_readwritestatusid_seq OWNED BY public."readWriteStatus"."readWriteStatusID";


--
-- Name: region; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public.region (
    "regionQID" character varying(255) NOT NULL,
    "regionName" character varying(255) NOT NULL,
    "iso31661_numericCode" integer
);


ALTER TABLE public.region OWNER TO eaasi_dev;

--
-- Name: softwareEnvironment; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."softwareEnvironment" (
    "softwareEnvironmentID" integer NOT NULL,
    "softwareEnvironmentName" character varying(255),
    "softwareEnvironmentDescription" character varying(255),
    "softwareEnvironmentHelpText" text,
    "derivedFrom_softwareEnvironment" integer,
    "softwareEnvironment_hasPart_configuredOS" integer
);


ALTER TABLE public."softwareEnvironment" OWNER TO eaasi_dev;

--
-- Name: softwareEnvironment_hasPart_configuredSoftware; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."softwareEnvironment_hasPart_configuredSoftware" (
    "softwareEnvironment_softwareEnvironmentID" integer NOT NULL,
    "hasConfiguredSoftware" integer NOT NULL
);


ALTER TABLE public."softwareEnvironment_hasPart_configuredSoftware" OWNER TO eaasi_dev;

--
-- Name: softwareEnvironment_has_diskImage; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."softwareEnvironment_has_diskImage" (
    "softwareEnvironment_softwareEnvironmentID" integer NOT NULL,
    "diskImageID" character varying(255),
    "mountPoint" character varying(255),
    "fileSystem" character varying(255),
    "storageCapacityBytes" integer,
    "storageUsedBytes" integer,
    "storageRemainingBytes" integer
);


ALTER TABLE public."softwareEnvironment_has_diskImage" OWNER TO eaasi_dev;

--
-- Name: softwareEnvironment_has_event; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."softwareEnvironment_has_event" (
    "softwareEnvironment_softwareEnvironmentID" integer NOT NULL,
    "event_eventID" integer NOT NULL
);


ALTER TABLE public."softwareEnvironment_has_event" OWNER TO eaasi_dev;

--
-- Name: softwareFamilyVersion_hasPart_softwareVersion; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."softwareFamilyVersion_hasPart_softwareVersion" (
    "softwareFamilyVersionID" integer NOT NULL,
    "hasPart_softwareVersion" integer NOT NULL
);


ALTER TABLE public."softwareFamilyVersion_hasPart_softwareVersion" OWNER TO eaasi_dev;

--
-- Name: softwareFamily_hasPart_softwareProduct; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."softwareFamily_hasPart_softwareProduct" (
    softwarefamilyid integer NOT NULL,
    haspart_softwareproduct integer NOT NULL
);


ALTER TABLE public."softwareFamily_hasPart_softwareProduct" OWNER TO eaasi_dev;

--
-- Name: softwareLicense; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."softwareLicense" (
    "softwareLicenseQID" character varying(255) NOT NULL,
    "softwareLicenseName" character varying(255) NOT NULL
);


ALTER TABLE public."softwareLicense" OWNER TO eaasi_dev;

--
-- Name: softwareObject; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."softwareObject" (
    "softwareObjectID" integer NOT NULL,
    "softwareObject_inNetwork" boolean DEFAULT false NOT NULL,
    "softwareObject_hasSourceOrg" integer,
    "softwareObjectProductKey" character varying(255),
    "softwareObjectHelpText" text
);


ALTER TABLE public."softwareObject" OWNER TO eaasi_dev;

--
-- Name: softwareObjectFile_has_objectFileOperation; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."softwareObjectFile_has_objectFileOperation" (
    "softwareObjectFile_softwareObjectID" integer,
    "softwareObjectFile_fileID" integer,
    "softwareObjectFile_operationID" integer,
    "softwareObjectFile_operationOrder" integer
);


ALTER TABLE public."softwareObjectFile_has_objectFileOperation" OWNER TO eaasi_dev;

--
-- Name: softwareObject_has_alternateID; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."softwareObject_has_alternateID" (
    "softwareObject_softwareObjectID" integer,
    "softwareObject_alternateID" character varying(255)
);


ALTER TABLE public."softwareObject_has_alternateID" OWNER TO eaasi_dev;

--
-- Name: softwareObject_has_event; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."softwareObject_has_event" (
    "softwareObject_softwareObjectID" integer,
    "event_eventID" integer
);


ALTER TABLE public."softwareObject_has_event" OWNER TO eaasi_dev;

--
-- Name: softwareObject_has_objectFile; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."softwareObject_has_objectFile" (
    "softwareObject_softwareObjectID" integer NOT NULL,
    "softwareObjectFileID" integer NOT NULL,
    "softwareObjectFileLabel" character varying(255),
    "softwareObjectFile_usesMountFormat" character varying(255)
);


ALTER TABLE public."softwareObject_has_objectFile" OWNER TO eaasi_dev;

--
-- Name: softwareObject_isManifestationOf_osVersion; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."softwareObject_isManifestationOf_osVersion" (
    "softwareObject_softwareObjectID" integer,
    "softwareObject_osVersionID" integer
);


ALTER TABLE public."softwareObject_isManifestationOf_osVersion" OWNER TO eaasi_dev;

--
-- Name: softwareObject_isManifestationOf_softwareVersion; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."softwareObject_isManifestationOf_softwareVersion" (
    "softwareObject_softwareObjectID" integer NOT NULL,
    "softwareObject_softwareVersionID" integer NOT NULL
);


ALTER TABLE public."softwareObject_isManifestationOf_softwareVersion" OWNER TO eaasi_dev;

--
-- Name: softwareObject_softwareObjectID_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public."softwareObject_softwareObjectID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."softwareObject_softwareObjectID_seq" OWNER TO eaasi_dev;

--
-- Name: softwareObject_softwareObjectID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public."softwareObject_softwareObjectID_seq" OWNED BY public."softwareObject"."softwareObjectID";


--
-- Name: softwareProduct; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."softwareProduct" (
    "softwareProductID" integer NOT NULL,
    "softwareProductQID" character varying(45) NOT NULL,
    "softwareProductDescription" character varying(255),
    "softwareProductName" character varying(255) NOT NULL
);


ALTER TABLE public."softwareProduct" OWNER TO eaasi_dev;

--
-- Name: softwareProduct_has_alternateName; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."softwareProduct_has_alternateName" (
    "softwareProduct_softwareProductID" integer NOT NULL,
    "softwareProduct_alternateNameID" integer NOT NULL
);


ALTER TABLE public."softwareProduct_has_alternateName" OWNER TO eaasi_dev;

--
-- Name: softwareProduct_has_softwareType; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."softwareProduct_has_softwareType" (
    "softwareProduct_softwareProductID" integer NOT NULL,
    "softwareProduct_softwareTypeQID" character varying(255) NOT NULL
);


ALTER TABLE public."softwareProduct_has_softwareType" OWNER TO eaasi_dev;

--
-- Name: softwareType; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."softwareType" (
    "softwareTypeQID" character varying(255) NOT NULL,
    softwaretypename character varying(255) NOT NULL
);


ALTER TABLE public."softwareType" OWNER TO eaasi_dev;

--
-- Name: softwareVersion; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."softwareVersion" (
    "softwareVersionID" integer NOT NULL,
    "softwareVersionQID" character varying(255),
    "softwareVersionName" character varying(255) NOT NULL,
    "softwareVersionDescription" character varying(255) NOT NULL,
    "softwareVersionNumber" character varying(255),
    "softwareVersionPublicationDate" timestamp without time zone,
    "softwareVersionSystemRequirements" integer NOT NULL,
    "isVersionOf_softwareProduct" integer
);


ALTER TABLE public."softwareVersion" OWNER TO eaasi_dev;

--
-- Name: softwareVersion_has_alternateID; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."softwareVersion_has_alternateID" (
    "softwareVersion_softwareVersionID" integer NOT NULL,
    "softwareVersion_alternateID" character varying(255) NOT NULL
);


ALTER TABLE public."softwareVersion_has_alternateID" OWNER TO eaasi_dev;

--
-- Name: softwareVersion_has_developer; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."softwareVersion_has_developer" (
    "softwareVersion_softwareVersionID" integer,
    "softwareVersion_softwareDeveloperQID" character varying(255)
);


ALTER TABLE public."softwareVersion_has_developer" OWNER TO eaasi_dev;

--
-- Name: softwareVersion_has_formatImplementation; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."softwareVersion_has_formatImplementation" (
    "softwareVersion_softwareVersionID" integer NOT NULL,
    "softwareVersion_formatImplementationID" integer NOT NULL,
    "softwareVersion_implementationOperation" integer,
    "defaultImplementation" boolean
);


ALTER TABLE public."softwareVersion_has_formatImplementation" OWNER TO eaasi_dev;

--
-- Name: softwareVersion_has_programmingLanguage; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."softwareVersion_has_programmingLanguage" (
    "softwareVersion_softwareVersionID" integer NOT NULL,
    "softwareVersion_programmingLanguageQID" character varying(255)
);


ALTER TABLE public."softwareVersion_has_programmingLanguage" OWNER TO eaasi_dev;

--
-- Name: softwareVersion_has_softwareLicense; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."softwareVersion_has_softwareLicense" (
    "softwareVersion_softwareVersionID" integer NOT NULL,
    "softwareVersion_softwareLicenseQID" character varying(255)
);


ALTER TABLE public."softwareVersion_has_softwareLicense" OWNER TO eaasi_dev;

--
-- Name: softwareVersion_isCompatibleWith_computingEnvironment; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."softwareVersion_isCompatibleWith_computingEnvironment" (
    "sofwareVersion_softwareVersionID" integer,
    "compatibleComputingEnvironmentID" integer
);


ALTER TABLE public."softwareVersion_isCompatibleWith_computingEnvironment" OWNER TO eaasi_dev;

--
-- Name: softwareVersion_languageSettings; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."softwareVersion_languageSettings" (
    "softwareVersion_softwareVersionID" integer,
    "softwareVersion_languageQID" character varying(45),
    "softwareVersion_defaultLanguage" boolean NOT NULL
);


ALTER TABLE public."softwareVersion_languageSettings" OWNER TO eaasi_dev;

--
-- Name: software_environment_id_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public.software_environment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.software_environment_id_seq OWNER TO eaasi_dev;

--
-- Name: software_environment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public.software_environment_id_seq OWNED BY public."softwareEnvironment"."softwareEnvironmentID";


--
-- Name: software_product_id_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public.software_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.software_product_id_seq OWNER TO eaasi_dev;

--
-- Name: software_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public.software_product_id_seq OWNED BY public."softwareProduct"."softwareProductID";


--
-- Name: software_version_id_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public.software_version_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.software_version_id_seq OWNER TO eaasi_dev;

--
-- Name: software_version_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public.software_version_id_seq OWNED BY public."softwareVersion"."softwareVersionID";


--
-- Name: storageDevice; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."storageDevice" (
    "storageDeviceID" integer NOT NULL,
    "storageDeviceQID" character varying(255),
    "storageDeviceName" character varying(255) NOT NULL,
    "storageDeviceType" integer,
    "storageVolumeBytes" integer,
    "storageDevice_readWriteStatusID" integer NOT NULL
);


ALTER TABLE public."storageDevice" OWNER TO eaasi_dev;

--
-- Name: storageDeviceType; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."storageDeviceType" (
    "storageDeviceTypeID" integer NOT NULL,
    "storageDeviceTypeQID" character varying(255),
    "storageDeviceTypeName" character varying(45) NOT NULL
);


ALTER TABLE public."storageDeviceType" OWNER TO eaasi_dev;

--
-- Name: storageDeviceType_storageDeviceTypeID_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public."storageDeviceType_storageDeviceTypeID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."storageDeviceType_storageDeviceTypeID_seq" OWNER TO eaasi_dev;

--
-- Name: storageDeviceType_storageDeviceTypeID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public."storageDeviceType_storageDeviceTypeID_seq" OWNED BY public."storageDeviceType"."storageDeviceTypeID";


--
-- Name: storageDevice_has_driverSoftware; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."storageDevice_has_driverSoftware" (
    "storageDevice_storageDeviceID" integer NOT NULL,
    "storageDevice_driverSoftwareID" integer NOT NULL
);


ALTER TABLE public."storageDevice_has_driverSoftware" OWNER TO eaasi_dev;

--
-- Name: storageDevice_has_machineInterface; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."storageDevice_has_machineInterface" (
    "storageDevice_storageDeviceID" integer NOT NULL,
    "storageDevice_machineInterfaceID" integer NOT NULL
);


ALTER TABLE public."storageDevice_has_machineInterface" OWNER TO eaasi_dev;

--
-- Name: storageDevice_storageDeviceID_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public."storageDevice_storageDeviceID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."storageDevice_storageDeviceID_seq" OWNER TO eaasi_dev;

--
-- Name: storageDevice_storageDeviceID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public."storageDevice_storageDeviceID_seq" OWNED BY public."storageDevice"."storageDeviceID";


--
-- Name: systemRequirements; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."systemRequirements" (
    "systemRequirementsID" integer NOT NULL,
    "requirementsSummary" text,
    "minimumRAM" integer,
    "minimumDiskSpace" integer,
    "minimumColorDepth" integer,
    "minimumDisplayResolution" integer,
    "internetAccessRequired" boolean,
    "minimumMbps" integer
);


ALTER TABLE public."systemRequirements" OWNER TO eaasi_dev;

--
-- Name: systemRequirements_includes_audioDevice; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."systemRequirements_includes_audioDevice" (
    "systemRequirements_systemRequirementsID" integer NOT NULL,
    "systemRequirements_audioDeviceID" integer NOT NULL
);


ALTER TABLE public."systemRequirements_includes_audioDevice" OWNER TO eaasi_dev;

--
-- Name: systemRequirements_includes_cpuArchitecture; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."systemRequirements_includes_cpuArchitecture" (
    "systemRequirements_systemRequirementsID" integer NOT NULL,
    "systemRequirements_cpuArchitecture" character varying(255)
);


ALTER TABLE public."systemRequirements_includes_cpuArchitecture" OWNER TO eaasi_dev;

--
-- Name: systemRequirements_includes_gpuDevice; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."systemRequirements_includes_gpuDevice" (
    "systemRequirements_systemRequirementsID" integer NOT NULL,
    "systemRequirements_gpuDeviceID" integer,
    "systemRequirements_minimumGpuRAM" character varying(255)
);


ALTER TABLE public."systemRequirements_includes_gpuDevice" OWNER TO eaasi_dev;

--
-- Name: systemRequirements_includes_machineType; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."systemRequirements_includes_machineType" (
    "systemRequirements_systemRequirementsID" integer NOT NULL,
    "systemRequirements_machineTypeID" integer
);


ALTER TABLE public."systemRequirements_includes_machineType" OWNER TO eaasi_dev;

--
-- Name: systemRequirements_includes_osVersion; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."systemRequirements_includes_osVersion" (
    "systemRequirements_systemRequirementsID" integer NOT NULL,
    "systemRequirements_osVersionID" integer
);


ALTER TABLE public."systemRequirements_includes_osVersion" OWNER TO eaasi_dev;

--
-- Name: systemRequirements_includes_pointerDeviceType; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."systemRequirements_includes_pointerDeviceType" (
    "systemRequirements_systemRequirementsID" integer NOT NULL,
    "systemRequirements_pointerDeviceTypeID" integer
);


ALTER TABLE public."systemRequirements_includes_pointerDeviceType" OWNER TO eaasi_dev;

--
-- Name: systemRequirements_includes_softwareVersion; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."systemRequirements_includes_softwareVersion" (
    "systemRequirements_systemRequirementsID" integer NOT NULL,
    "systemRequirements_softwareVersionID" integer NOT NULL
);


ALTER TABLE public."systemRequirements_includes_softwareVersion" OWNER TO eaasi_dev;

--
-- Name: systemRequirements_includes_storageDeviceType; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."systemRequirements_includes_storageDeviceType" (
    "systemRequirements_systemRequirementsID" integer,
    "systemRequirements_storageDeviceTypeID" integer
);


ALTER TABLE public."systemRequirements_includes_storageDeviceType" OWNER TO eaasi_dev;

--
-- Name: systemRequirements_systemRequirementsID_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public."systemRequirements_systemRequirementsID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."systemRequirements_systemRequirementsID_seq" OWNER TO eaasi_dev;

--
-- Name: systemRequirements_systemRequirementsID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public."systemRequirements_systemRequirementsID_seq" OWNED BY public."systemRequirements"."systemRequirementsID";


--
-- Name: timezone; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public.timezone (
    "timezoneQID" character varying(255) NOT NULL,
    "utcOffset" character varying(255)
);


ALTER TABLE public.timezone OWNER TO eaasi_dev;

--
-- Name: timezoneName; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."timezoneName" (
    "timezoneNameID" integer NOT NULL,
    "timeZoneName" character varying(255)
);


ALTER TABLE public."timezoneName" OWNER TO eaasi_dev;

--
-- Name: timezone_has_timezoneName; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."timezone_has_timezoneName" (
    "timezone_timezoneQID" character varying(255) NOT NULL,
    "timezoneName_timezoneNameID" integer NOT NULL
);


ALTER TABLE public."timezone_has_timezoneName" OWNER TO eaasi_dev;

--
-- Name: userInformation; Type: TABLE; Schema: public; Owner: eaasi_dev
--

CREATE TABLE public."userInformation" (
    "userInformationID" integer NOT NULL,
    username character varying(255),
    password character varying(255),
    organization character varying(255),
    admin boolean
);


ALTER TABLE public."userInformation" OWNER TO eaasi_dev;

--
-- Name: userInformation_userInformationID_seq; Type: SEQUENCE; Schema: public; Owner: eaasi_dev
--

CREATE SEQUENCE public."userInformation_userInformationID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."userInformation_userInformationID_seq" OWNER TO eaasi_dev;

--
-- Name: userInformation_userInformationID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: eaasi_dev
--

ALTER SEQUENCE public."userInformation_userInformationID_seq" OWNED BY public."userInformation"."userInformationID";


--
-- Name: alternateName alternateNameID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."alternateName" ALTER COLUMN "alternateNameID" SET DEFAULT nextval('public."alternateName_alternatenameid_seq"'::regclass);


--
-- Name: audioDevice audioDeviceID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."audioDevice" ALTER COLUMN "audioDeviceID" SET DEFAULT nextval('public."audioDevice_audioDeviceID_seq"'::regclass);


--
-- Name: colorDepth colorDepthID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."colorDepth" ALTER COLUMN "colorDepthID" SET DEFAULT nextval('public.color_depth_settings_id_seq'::regclass);


--
-- Name: computingEnvironment computingEnvironmentID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."computingEnvironment" ALTER COLUMN "computingEnvironmentID" SET DEFAULT nextval('public.computing_environment_id_seq'::regclass);


--
-- Name: configuredMachine configuredMachineID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredMachine" ALTER COLUMN "configuredMachineID" SET DEFAULT nextval('public."configuredMachine_configuredMachineID_seq"'::regclass);


--
-- Name: configuredNetwork configuredNetworkID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredNetwork" ALTER COLUMN "configuredNetworkID" SET DEFAULT nextval('public.configured_network_id_seq'::regclass);


--
-- Name: configuredOS configuredOperatingSystemID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredOS" ALTER COLUMN "configuredOperatingSystemID" SET DEFAULT nextval('public.configured_os_id_seq1'::regclass);


--
-- Name: configuredSoftware configuredSoftwareVersionID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredSoftware" ALTER COLUMN "configuredSoftwareVersionID" SET DEFAULT nextval('public.configured_software_id_seq'::regclass);


--
-- Name: digitalObject digitalObjectID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."digitalObject" ALTER COLUMN "digitalObjectID" SET DEFAULT nextval('public.digital_object_id_seq'::regclass);


--
-- Name: displayDevice displayDeviceID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."displayDevice" ALTER COLUMN "displayDeviceID" SET DEFAULT nextval('public."displayDevice_displayDeviceID_seq"'::regclass);


--
-- Name: displayResolution displayResolutionID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."displayResolution" ALTER COLUMN "displayResolutionID" SET DEFAULT nextval('public.display_resolution_settings_id_seq'::regclass);


--
-- Name: file fileID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public.file ALTER COLUMN "fileID" SET DEFAULT nextval('public.file_id_seq'::regclass);


--
-- Name: fileExtension fileExtensionID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."fileExtension" ALTER COLUMN "fileExtensionID" SET DEFAULT nextval('public."fileExtension_fileExtensionID_seq"'::regclass);


--
-- Name: formatImplementation formatImplementationID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."formatImplementation" ALTER COLUMN "formatImplementationID" SET DEFAULT nextval('public.file_format_operation_id_seq'::regclass);


--
-- Name: formatOperation operationID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."formatOperation" ALTER COLUMN "operationID" SET DEFAULT nextval('public."formatOperation_operationID_seq"'::regclass);


--
-- Name: gpuDevice gpuDeviceID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."gpuDevice" ALTER COLUMN "gpuDeviceID" SET DEFAULT nextval('public."gpuDevice_gpuDeviceID_seq"'::regclass);


--
-- Name: keyboardDevice keyboardDeviceID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."keyboardDevice" ALTER COLUMN "keyboardDeviceID" SET DEFAULT nextval('public."keyboardDevice_keyboardDeviceID_seq"'::regclass);


--
-- Name: machineType machineTypeID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."machineType" ALTER COLUMN "machineTypeID" SET DEFAULT nextval('public."machineType_machineTypeID_seq"'::regclass);


--
-- Name: networkDevice networkDeviceID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."networkDevice" ALTER COLUMN "networkDeviceID" SET DEFAULT nextval('public."networkDevice_networkDeviceID_seq"'::regclass);


--
-- Name: networkService networkServiceID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."networkService" ALTER COLUMN "networkServiceID" SET DEFAULT nextval('public."networkService_networkServiceID_seq"'::regclass);


--
-- Name: osVersion osVersionID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion" ALTER COLUMN "osVersionID" SET DEFAULT nextval('public.os_version_id_seq'::regclass);


--
-- Name: osVersion_languageSettings osVersion_osVersionID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion_languageSettings" ALTER COLUMN "osVersion_osVersionID" SET DEFAULT nextval('public.os_version_language_settings_id_seq'::regclass);


--
-- Name: pointerDeviceType pointerDeviceTypeID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."pointerDeviceType" ALTER COLUMN "pointerDeviceTypeID" SET DEFAULT nextval('public."pointerDeviceType_pointerDeviceTypeID_seq"'::regclass);


--
-- Name: readWriteStatus readWriteStatusID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."readWriteStatus" ALTER COLUMN "readWriteStatusID" SET DEFAULT nextval('public.readwritestatus_readwritestatusid_seq'::regclass);


--
-- Name: softwareEnvironment softwareEnvironmentID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareEnvironment" ALTER COLUMN "softwareEnvironmentID" SET DEFAULT nextval('public.software_environment_id_seq'::regclass);


--
-- Name: softwareObject softwareObjectID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareObject" ALTER COLUMN "softwareObjectID" SET DEFAULT nextval('public."softwareObject_softwareObjectID_seq"'::regclass);


--
-- Name: softwareProduct softwareProductID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareProduct" ALTER COLUMN "softwareProductID" SET DEFAULT nextval('public.software_product_id_seq'::regclass);


--
-- Name: softwareVersion softwareVersionID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareVersion" ALTER COLUMN "softwareVersionID" SET DEFAULT nextval('public.software_version_id_seq'::regclass);


--
-- Name: storageDevice storageDeviceID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."storageDevice" ALTER COLUMN "storageDeviceID" SET DEFAULT nextval('public."storageDevice_storageDeviceID_seq"'::regclass);


--
-- Name: storageDeviceType storageDeviceTypeID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."storageDeviceType" ALTER COLUMN "storageDeviceTypeID" SET DEFAULT nextval('public."storageDeviceType_storageDeviceTypeID_seq"'::regclass);


--
-- Name: systemRequirements systemRequirementsID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."systemRequirements" ALTER COLUMN "systemRequirementsID" SET DEFAULT nextval('public."systemRequirements_systemRequirementsID_seq"'::regclass);


--
-- Name: userInformation userInformationID; Type: DEFAULT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."userInformation" ALTER COLUMN "userInformationID" SET DEFAULT nextval('public."userInformation_userInformationID_seq"'::regclass);


--
-- Data for Name: alternateName; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."alternateName" ("alternateNameID", "alternateName") FROM stdin;
\.


--
-- Data for Name: audioDevice; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."audioDevice" ("audioDeviceID", "audioDeviceQID", "audioDeviceName") FROM stdin;
\.


--
-- Data for Name: audioDevice_hasEquivalent; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."audioDevice_hasEquivalent" ("audioDevice_audioDeviceID", "audioDevice_equivalentAudioDevice") FROM stdin;
\.


--
-- Data for Name: audioDevice_has_driverSoftware; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."audioDevice_has_driverSoftware" ("audioDevice_audioDeviceID", "audioDevice_driverSoftwareID") FROM stdin;
\.


--
-- Data for Name: audioDevice_has_machineInterface; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."audioDevice_has_machineInterface" ("audioDevice_audioDeviceID", "audioDevice_machineInterfaceID") FROM stdin;
\.


--
-- Data for Name: colorDepth; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."colorDepth" ("colorDepthID", "colorDepthName", "bitDepth") FROM stdin;
\.


--
-- Data for Name: computingEnvironment; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."computingEnvironment" ("computingEnvironmentID", "computingEnvironment_hasSourceOrg", "computingEnvironment_inNetwork", "computingEnvironment_configuredNetworkID", "computingEnvironment_softwareEnvironmentID") FROM stdin;
\.


--
-- Data for Name: computingEnvironment_has_event; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."computingEnvironment_has_event" ("computingEnvironment_computingEnvironmentID", "event_eventID") FROM stdin;
\.


--
-- Data for Name: configuredAudioDevice; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."configuredAudioDevice" ("configuredMachine_machineID", "configuredAudioDevice_audioDeviceID", "configuredAudioDevice_irq", "configuredAudioDevice_usesMachineInterface") FROM stdin;
\.


--
-- Data for Name: configuredGpuDevice; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."configuredGpuDevice" ("configuredMachine_machineID", "configuredGpuDevice_gpuDeviceID", "configuredGpuDevice_memoryBytes", "configuredGpuDevice_irq", "configuredGpuDevice_usesMachineInterface") FROM stdin;
\.


--
-- Data for Name: configuredGpuDevice_has_displayDevice; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."configuredGpuDevice_has_displayDevice" ("configuredMachine_machineID", "configuredGpuDevice_gpuDeviceID", "configuredGpuDevice_displayDeviceID", "displayDevice_usesDisplayInterface") FROM stdin;
\.


--
-- Data for Name: configuredKeyboardDevice; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."configuredKeyboardDevice" ("configuredMachine_machineID", "configuredKeyboardDevice_keyboardDeviceID", "configuredKeyboardDevice_usesMachineInterface") FROM stdin;
\.


--
-- Data for Name: configuredMachine; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."configuredMachine" ("configuredMachineID", "configuredMachineName", "configuredMachineDescription", "configuredMachineDateTime", "configuredMachineType", "configuredMachineRamBytes", "configuredMachineArchitecture", "configuredMachineCpuCores", "configuredMachine_emulatorSoftwareID") FROM stdin;
\.


--
-- Data for Name: configuredMachine_has_event; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."configuredMachine_has_event" ("configuredMachine_machineID", "event_eventID") FROM stdin;
\.


--
-- Data for Name: configuredNetwork; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."configuredNetwork" ("configuredNetworkID", "configuredNetworkName", "configuredNetworkDescription") FROM stdin;
\.


--
-- Data for Name: configuredNetworkDevice; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."configuredNetworkDevice" ("configuredMachine_machineID", "configuredNetworkDevice_networkDeviceID", "configuredNetworkDevice_macAddress", "configuredNetworkDevice_usesMachineInterface") FROM stdin;
\.


--
-- Data for Name: configuredNetworkMachine_expectedNetworkService; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."configuredNetworkMachine_expectedNetworkService" ("configuredNetworkMachine_configuredNetworkID", "configuredNetworkMachine_configuredMachineID", "configuredNetworkMachine_expectedNetworkServiceID", "servicePortExpected") FROM stdin;
\.


--
-- Data for Name: configuredNetworkMachine_providesNetworkService; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."configuredNetworkMachine_providesNetworkService" ("configuredNetworkMachine_configuredNetworkID", "configuredNetworkMachine_configuredMachineID", "configuredNetworkMachine_providesNetworkServiceID", "servicePortExposed") FROM stdin;
\.


--
-- Data for Name: configuredNetwork_emulatesNetworkService; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."configuredNetwork_emulatesNetworkService" ("configuredNetwork_configuredNetworkID", "configuredNetwork_networkServiceID", "servicePortExposed") FROM stdin;
\.


--
-- Data for Name: configuredNetwork_hasEvent; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."configuredNetwork_hasEvent" ("configuredNetwork_configuredNetworkID", "event_eventID") FROM stdin;
\.


--
-- Data for Name: configuredNetwork_has_configuredMachine; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."configuredNetwork_has_configuredMachine" ("configuredNetwork_configuredNetworkID", "configuredNetwork_machineID", "bootOrder", "staticIpAddress") FROM stdin;
\.


--
-- Data for Name: configuredOS; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."configuredOS" ("configuredOperatingSystemID", "configuredDisplayResolution", "configuredColorDepth", "configuredRegion", "configuredTimezone", "configuredDateTime", "hasSource_softwareObjectID", "manifestationOf_osVersion") FROM stdin;
\.


--
-- Data for Name: configuredOS_has_event; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."configuredOS_has_event" ("configuredOS_configuredOperatingSystemID", "event_eventID") FROM stdin;
\.


--
-- Data for Name: configuredOS_has_formatOperation; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."configuredOS_has_formatOperation" ("configuredOS_configuredOperatingSystemID", "formatOperation_opensFileFormat", "formatOperation_usesConfiguredSoftware") FROM stdin;
\.


--
-- Data for Name: configuredOS_has_userInformation; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."configuredOS_has_userInformation" ("configuredOS_configuredOperatingSystemID", "userInformation_userInformationID") FROM stdin;
\.


--
-- Data for Name: configuredOS_language; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."configuredOS_language" ("configuredOS_configuredOperatingSystemID", "configuredOs_languageQID", "configuredOS_primaryLanguage") FROM stdin;
\.


--
-- Data for Name: configuredPointerDevice; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."configuredPointerDevice" ("configuredMachine_machineID", "configuredPointerDevice_pointerDeviceID", "configuredPointerDevice_usesMachineInterface") FROM stdin;
\.


--
-- Data for Name: configuredSoftware; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."configuredSoftware" ("configuredSoftwareVersionID", "executableLocation", "executableSyntax", "saveLocation", "configuredLanguage", "hasSource_softwareObjectID", "hasSource_digitalObjectID", "manifestaionOf_softwareVersion") FROM stdin;
\.


--
-- Data for Name: configuredSoftware_has_event; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."configuredSoftware_has_event" ("configuredSoftware_configuredSoftwareManifestationID", "event_eventID") FROM stdin;
\.


--
-- Data for Name: configuredSoftware_has_userInformation; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."configuredSoftware_has_userInformation" ("configuredSoftware_configuredSoftwareManifestationID", "userInformation_userInformationID") FROM stdin;
\.


--
-- Data for Name: configuredSoftware_uses_formatImplementation; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."configuredSoftware_uses_formatImplementation" ("configuredSoftware_configuredSoftwareManifestationID", "configuredSoftware_formatImplementation", "configuredFormatOperation") FROM stdin;
\.


--
-- Data for Name: configuredStorageDevice; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."configuredStorageDevice" ("configuredMachine_machineID", "configureStorageDevice_storageDeviceID", "configuredStorageDevice_usesMachineInterface", "configuredStorageDevice_idBootOrder") FROM stdin;
\.


--
-- Data for Name: cpuArchitecture; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."cpuArchitecture" ("cpuArchitectureQID", "cpuArchitectureName") FROM stdin;
\.


--
-- Data for Name: developer; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public.developer ("developerQID", "developerName") FROM stdin;
\.


--
-- Data for Name: digitalObject; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."digitalObject" ("digitalObjectID", "digitalObjectName", "digitalObjectDescription", "digitalObjectProductKey", "digitalObjectHelpText", "digitalObjectSystemRequirements") FROM stdin;
\.


--
-- Data for Name: digitalObjectFile_has_objectFileOperation; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."digitalObjectFile_has_objectFileOperation" ("digitalObjectFile_digitalObjectID", "digitalObjectFile_fileID", "digitalObjectFile_operationID", "digitalObjectFile_operationOrder") FROM stdin;
\.


--
-- Data for Name: digitalObject_has_alternativeID; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."digitalObject_has_alternativeID" ("digitalObject_digitalObjectID", "alternativeID_alternativeID") FROM stdin;
\.


--
-- Data for Name: digitalObject_has_event; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."digitalObject_has_event" ("digitalObject_digialObjectID", "event_eventID") FROM stdin;
\.


--
-- Data for Name: digitalObject_has_objectFile; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."digitalObject_has_objectFile" ("digitalObject_digitalObjectID", "digitalObjectFileID", "digitalObjectFileLabel", "digitalObjectFile_usesMountFormat") FROM stdin;
\.


--
-- Data for Name: digitalObject_isCompatibleWith_computingEnvironment; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."digitalObject_isCompatibleWith_computingEnvironment" ("digitalObject_digitalObjectID", "compatibleComputingEnvironmentID") FROM stdin;
\.


--
-- Data for Name: displayDevice; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."displayDevice" ("displayDeviceID", "displayDeviceQID", "displayDeviceName") FROM stdin;
\.


--
-- Data for Name: displayDevice_has_colorDepth; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."displayDevice_has_colorDepth" ("displayDevice_displayDeviceID", "colorDepth_colorDepthID") FROM stdin;
\.


--
-- Data for Name: displayDevice_has_displayInterface; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."displayDevice_has_displayInterface" ("displayDevice_displayDeviceID", "displayInterface_displayInterfaceID") FROM stdin;
\.


--
-- Data for Name: displayDevice_has_displayResolution; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."displayDevice_has_displayResolution" ("displayDevice_displayDeviceID", "availableDisplayResolution") FROM stdin;
\.


--
-- Data for Name: displayDevice_has_driverSoftware; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."displayDevice_has_driverSoftware" ("displayDevice_displayDeviceID", "displayDevice_driverSoftwareID") FROM stdin;
\.


--
-- Data for Name: displayResolution; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."displayResolution" ("displayResolutionID", "displayResolutionName") FROM stdin;
\.


--
-- Data for Name: file; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public.file ("fileID", "fileLocation", "fileName", "fileChecksum", "fileFormat", "fileSize") FROM stdin;
\.


--
-- Data for Name: fileExtension; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."fileExtension" ("fileExtensionID", extension) FROM stdin;
\.


--
-- Data for Name: fileFormat; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."fileFormat" ("fileFormatQID", "fileFormatName", "pronomID") FROM stdin;
\.


--
-- Data for Name: fileFormat_has_fileExtension; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."fileFormat_has_fileExtension" ("fileFormat_fileFormatQID", "fileExtension_fileExtensionID") FROM stdin;
\.


--
-- Data for Name: fileSystem; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."fileSystem" ("fileSystemQID", "fileSystemName") FROM stdin;
\.


--
-- Data for Name: formatImplementation; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."formatImplementation" ("formatImplementationID", "formatImplementationName", "implementationExtension") FROM stdin;
\.


--
-- Data for Name: formatImplementation_includes_fileFormat; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."formatImplementation_includes_fileFormat" ("formatImplementation_formatImplementationID", "fileFormat_fileFormatQID") FROM stdin;
\.


--
-- Data for Name: formatOperation; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."formatOperation" ("operationID", "operationName") FROM stdin;
\.


--
-- Data for Name: gpuDevice; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."gpuDevice" ("gpuDeviceID", "gpuDeviceQID", "gpuDeviceName") FROM stdin;
\.


--
-- Data for Name: gpuDevice_hasEquivalent; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."gpuDevice_hasEquivalent" ("gpuDevice_gpuDeviceID", "gpuDevice_equivalentGpuDevice") FROM stdin;
\.


--
-- Data for Name: gpuDevice_has_displayInterface; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."gpuDevice_has_displayInterface" ("gpuDevice_gpuDeviceID", "displayInterface_displayInterfaceID") FROM stdin;
\.


--
-- Data for Name: gpuDevice_has_driverSoftware; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."gpuDevice_has_driverSoftware" ("gpuDevice_gpuDeviceID", "gpuDevice_driverSoftwareID") FROM stdin;
\.


--
-- Data for Name: gpuDevice_has_machineInterface; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."gpuDevice_has_machineInterface" ("gpuDevice_gpuDeviceID", "gpuDevice_machineInterfaceID") FROM stdin;
\.


--
-- Data for Name: keyboardDevice; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."keyboardDevice" ("keyboardDeviceID", "keyboardDeviceQID", "keyboardDeviceName", "keyboardDevice_keyboardLayout") FROM stdin;
\.


--
-- Data for Name: keyboardDevice_has_driverSoftware; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."keyboardDevice_has_driverSoftware" ("keyboardDevice_keyboardDeviceID", "keyboardDevice_driverSoftware") FROM stdin;
\.


--
-- Data for Name: keyboardDevice_has_language; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."keyboardDevice_has_language" ("keyboardDevice_keyboardDeviceID", "keyboardDevice_languageQID") FROM stdin;
\.


--
-- Data for Name: keyboardDevice_has_machineInterfaceID; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."keyboardDevice_has_machineInterfaceID" ("keyboardDevice_keyboardDeviceID", "keyboardDevice_machineInterfaceID") FROM stdin;
\.


--
-- Data for Name: keyboardLayout; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."keyboardLayout" ("keyboardLayoutQID", "keyboardLayoutName") FROM stdin;
\.


--
-- Data for Name: machineType; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."machineType" ("machineTypeID", "machineTypeName") FROM stdin;
\.


--
-- Data for Name: mountFormat; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."mountFormat" ("mountFormatQID", "mountFormatName") FROM stdin;
\.


--
-- Data for Name: networkDevice; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."networkDevice" ("networkDeviceID", "networkDeviceQID", "networkDeviceName") FROM stdin;
\.


--
-- Data for Name: networkDevice_has_driverSoftware; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."networkDevice_has_driverSoftware" ("networkDevice_networkDeviceID", "driverSoftware_driverSoftware") FROM stdin;
\.


--
-- Data for Name: networkDevice_has_machineInterface; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."networkDevice_has_machineInterface" ("networkDevice_networkDeviceID", "networkDevice_machineInterfaceID") FROM stdin;
\.


--
-- Data for Name: networkService; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."networkService" ("networkServiceID", "networkServiceName", "networkServiceQID", "defaultPort", "defaultPortRange") FROM stdin;
\.


--
-- Data for Name: objectEnvironment; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."objectEnvironment" ("objectEnvironment_objectEnvironment_computingEnvironmentID", "objectEnvironment_objectEnvironment_digitalObjectID", "objectEnvironment_concurrentInstances", "objectEnvironmentName", "objectEnvironmentDescription", "objectEnvironmentHelpText") FROM stdin;
\.


--
-- Data for Name: objectEnvironment_has_event; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."objectEnvironment_has_event" ("objectEnvironment_objectEnvironment_computingEnvironmentID", "objectEnvironment_objectEnvironment_digitalObjectID", "event_eventID") FROM stdin;
\.


--
-- Data for Name: objectFileOperation; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."objectFileOperation" ("operationID", "operationName") FROM stdin;
\.


--
-- Data for Name: osVersion; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."osVersion" ("osVersionID", "osVersionQID", "osVersionName", "osVersionDescription", "osVersionNumber", "osVersionPublicationDate", "osVersionSystemRequirements", "isVersionOf_osProduct") FROM stdin;
\.


--
-- Data for Name: osVersion_colorDepthSettings; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."osVersion_colorDepthSettings" ("osVersion_osVersionID", "osVersion_colorDepthID") FROM stdin;
\.


--
-- Data for Name: osVersion_displayResolutionSettings; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."osVersion_displayResolutionSettings" ("osVersion_osVersionID", "osVersion_displayResolutionID") FROM stdin;
\.


--
-- Data for Name: osVersion_has_alternateID; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."osVersion_has_alternateID" ("osVersion_osVersionID", "osVersion_alternativeID") FROM stdin;
\.


--
-- Data for Name: osVersion_has_developer; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."osVersion_has_developer" ("osVersion_osVersionID", "osVersion_developerQID") FROM stdin;
\.


--
-- Data for Name: osVersion_has_programmingLanguage; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."osVersion_has_programmingLanguage" ("osVersion_osVersionID", "osVersion_programmingLanguageQID") FROM stdin;
\.


--
-- Data for Name: osVersion_has_softwareLicense; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."osVersion_has_softwareLicense" ("osVersion_osVersionID", "osVersion_softwareLicenseQID") FROM stdin;
\.


--
-- Data for Name: osVersion_includes_softwareVersion; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."osVersion_includes_softwareVersion" ("osVersion_osVersionID", "osVersion_softwareVersionID") FROM stdin;
\.


--
-- Data for Name: osVersion_isCompatibleWith_configuredMachine; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."osVersion_isCompatibleWith_configuredMachine" ("osVersion_osVersionID", "compatibleMachineID") FROM stdin;
\.


--
-- Data for Name: osVersion_keyboardLanguageSettings; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."osVersion_keyboardLanguageSettings" ("osVersion_osVersionID", "osVersion_keyboardLanguageQID") FROM stdin;
\.


--
-- Data for Name: osVersion_keyboardLayoutSettings; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."osVersion_keyboardLayoutSettings" ("osVersion_osVersionID", "osVersion_keyboardLayoutQID", "osVersion_keyboardLayoutName") FROM stdin;
\.


--
-- Data for Name: osVersion_keyboardSetting; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."osVersion_keyboardSetting" ("osVersion_osVersionID", "osVersion_keyboardSettingLanguage", "osVersion_keyboardSettingLayout", "osVersion_keyboardSettingName") FROM stdin;
\.


--
-- Data for Name: osVersion_languageSettings; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."osVersion_languageSettings" ("osVersion_osVersionID", "osVersion_languageQID", "osVersion_DefaultLanguage") FROM stdin;
\.


--
-- Data for Name: osVersion_regionSettings; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."osVersion_regionSettings" ("osVersion_osVersionID", "osVersion_regionQID", "osVersion_defaultRegion") FROM stdin;
\.


--
-- Data for Name: osVersion_timeZoneSettings; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."osVersion_timeZoneSettings" ("osVersion_osVersionID", "osVersion_timezoneQID", "osVersion_timezoneName") FROM stdin;
\.


--
-- Data for Name: pointerDevice; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."pointerDevice" ("pointerDeviceID", "pointerDeviceQID", "pointerDeviceName", "pointerDeviceType") FROM stdin;
\.


--
-- Data for Name: pointerDeviceType; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."pointerDeviceType" ("pointerDeviceTypeID", "pointerDeviceTypeName", "pointerDeviceTypeQID") FROM stdin;
\.


--
-- Data for Name: pointerDevice_has_driverSoftware; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."pointerDevice_has_driverSoftware" ("pointerDevice_pointerDeviceID", "pointerDevice_driverSoftwareID") FROM stdin;
\.


--
-- Data for Name: pointerDevice_has_machineInterface; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."pointerDevice_has_machineInterface" ("pointerDevice_pointerDeviceID", "pointerDevice_machineInterfaceID") FROM stdin;
\.


--
-- Data for Name: programmingLanguage; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."programmingLanguage" ("programmingLanguageQID", "programmingLanguageName") FROM stdin;
\.


--
-- Data for Name: readWriteStatus; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."readWriteStatus" ("readWriteStatusID", "readWriteStatusName") FROM stdin;
\.


--
-- Data for Name: region; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public.region ("regionQID", "regionName", "iso31661_numericCode") FROM stdin;
\.


--
-- Data for Name: softwareEnvironment; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."softwareEnvironment" ("softwareEnvironmentID", "softwareEnvironmentName", "softwareEnvironmentDescription", "softwareEnvironmentHelpText", "derivedFrom_softwareEnvironment", "softwareEnvironment_hasPart_configuredOS") FROM stdin;
\.


--
-- Data for Name: softwareEnvironment_hasPart_configuredSoftware; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."softwareEnvironment_hasPart_configuredSoftware" ("softwareEnvironment_softwareEnvironmentID", "hasConfiguredSoftware") FROM stdin;
\.


--
-- Data for Name: softwareEnvironment_has_diskImage; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."softwareEnvironment_has_diskImage" ("softwareEnvironment_softwareEnvironmentID", "diskImageID", "mountPoint", "fileSystem", "storageCapacityBytes", "storageUsedBytes", "storageRemainingBytes") FROM stdin;
\.


--
-- Data for Name: softwareEnvironment_has_event; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."softwareEnvironment_has_event" ("softwareEnvironment_softwareEnvironmentID", "event_eventID") FROM stdin;
\.


--
-- Data for Name: softwareFamilyVersion_hasPart_softwareVersion; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."softwareFamilyVersion_hasPart_softwareVersion" ("softwareFamilyVersionID", "hasPart_softwareVersion") FROM stdin;
\.


--
-- Data for Name: softwareFamily_hasPart_softwareProduct; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."softwareFamily_hasPart_softwareProduct" (softwarefamilyid, haspart_softwareproduct) FROM stdin;
\.


--
-- Data for Name: softwareLicense; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."softwareLicense" ("softwareLicenseQID", "softwareLicenseName") FROM stdin;
\.


--
-- Data for Name: softwareObject; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."softwareObject" ("softwareObjectID", "softwareObject_inNetwork", "softwareObject_hasSourceOrg", "softwareObjectProductKey", "softwareObjectHelpText") FROM stdin;
\.


--
-- Data for Name: softwareObjectFile_has_objectFileOperation; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."softwareObjectFile_has_objectFileOperation" ("softwareObjectFile_softwareObjectID", "softwareObjectFile_fileID", "softwareObjectFile_operationID", "softwareObjectFile_operationOrder") FROM stdin;
\.


--
-- Data for Name: softwareObject_has_alternateID; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."softwareObject_has_alternateID" ("softwareObject_softwareObjectID", "softwareObject_alternateID") FROM stdin;
\.


--
-- Data for Name: softwareObject_has_event; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."softwareObject_has_event" ("softwareObject_softwareObjectID", "event_eventID") FROM stdin;
\.


--
-- Data for Name: softwareObject_has_objectFile; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."softwareObject_has_objectFile" ("softwareObject_softwareObjectID", "softwareObjectFileID", "softwareObjectFileLabel", "softwareObjectFile_usesMountFormat") FROM stdin;
\.


--
-- Data for Name: softwareObject_isManifestationOf_osVersion; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."softwareObject_isManifestationOf_osVersion" ("softwareObject_softwareObjectID", "softwareObject_osVersionID") FROM stdin;
\.


--
-- Data for Name: softwareObject_isManifestationOf_softwareVersion; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."softwareObject_isManifestationOf_softwareVersion" ("softwareObject_softwareObjectID", "softwareObject_softwareVersionID") FROM stdin;
\.


--
-- Data for Name: softwareProduct; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."softwareProduct" ("softwareProductID", "softwareProductQID", "softwareProductDescription", "softwareProductName") FROM stdin;
\.


--
-- Data for Name: softwareProduct_has_alternateName; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."softwareProduct_has_alternateName" ("softwareProduct_softwareProductID", "softwareProduct_alternateNameID") FROM stdin;
\.


--
-- Data for Name: softwareProduct_has_softwareType; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."softwareProduct_has_softwareType" ("softwareProduct_softwareProductID", "softwareProduct_softwareTypeQID") FROM stdin;
\.


--
-- Data for Name: softwareType; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."softwareType" ("softwareTypeQID", softwaretypename) FROM stdin;
\.


--
-- Data for Name: softwareVersion; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."softwareVersion" ("softwareVersionID", "softwareVersionQID", "softwareVersionName", "softwareVersionDescription", "softwareVersionNumber", "softwareVersionPublicationDate", "softwareVersionSystemRequirements", "isVersionOf_softwareProduct") FROM stdin;
\.


--
-- Data for Name: softwareVersion_has_alternateID; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."softwareVersion_has_alternateID" ("softwareVersion_softwareVersionID", "softwareVersion_alternateID") FROM stdin;
\.


--
-- Data for Name: softwareVersion_has_developer; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."softwareVersion_has_developer" ("softwareVersion_softwareVersionID", "softwareVersion_softwareDeveloperQID") FROM stdin;
\.


--
-- Data for Name: softwareVersion_has_formatImplementation; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."softwareVersion_has_formatImplementation" ("softwareVersion_softwareVersionID", "softwareVersion_formatImplementationID", "softwareVersion_implementationOperation", "defaultImplementation") FROM stdin;
\.


--
-- Data for Name: softwareVersion_has_programmingLanguage; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."softwareVersion_has_programmingLanguage" ("softwareVersion_softwareVersionID", "softwareVersion_programmingLanguageQID") FROM stdin;
\.


--
-- Data for Name: softwareVersion_has_softwareLicense; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."softwareVersion_has_softwareLicense" ("softwareVersion_softwareVersionID", "softwareVersion_softwareLicenseQID") FROM stdin;
\.


--
-- Data for Name: softwareVersion_isCompatibleWith_computingEnvironment; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."softwareVersion_isCompatibleWith_computingEnvironment" ("sofwareVersion_softwareVersionID", "compatibleComputingEnvironmentID") FROM stdin;
\.


--
-- Data for Name: softwareVersion_languageSettings; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."softwareVersion_languageSettings" ("softwareVersion_softwareVersionID", "softwareVersion_languageQID", "softwareVersion_defaultLanguage") FROM stdin;
\.


--
-- Data for Name: storageDevice; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."storageDevice" ("storageDeviceID", "storageDeviceQID", "storageDeviceName", "storageDeviceType", "storageVolumeBytes", "storageDevice_readWriteStatusID") FROM stdin;
\.


--
-- Data for Name: storageDeviceType; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."storageDeviceType" ("storageDeviceTypeID", "storageDeviceTypeQID", "storageDeviceTypeName") FROM stdin;
\.


--
-- Data for Name: storageDevice_has_driverSoftware; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."storageDevice_has_driverSoftware" ("storageDevice_storageDeviceID", "storageDevice_driverSoftwareID") FROM stdin;
\.


--
-- Data for Name: storageDevice_has_machineInterface; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."storageDevice_has_machineInterface" ("storageDevice_storageDeviceID", "storageDevice_machineInterfaceID") FROM stdin;
\.


--
-- Data for Name: systemRequirements; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."systemRequirements" ("systemRequirementsID", "requirementsSummary", "minimumRAM", "minimumDiskSpace", "minimumColorDepth", "minimumDisplayResolution", "internetAccessRequired", "minimumMbps") FROM stdin;
\.


--
-- Data for Name: systemRequirements_includes_audioDevice; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."systemRequirements_includes_audioDevice" ("systemRequirements_systemRequirementsID", "systemRequirements_audioDeviceID") FROM stdin;
\.


--
-- Data for Name: systemRequirements_includes_cpuArchitecture; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."systemRequirements_includes_cpuArchitecture" ("systemRequirements_systemRequirementsID", "systemRequirements_cpuArchitecture") FROM stdin;
\.


--
-- Data for Name: systemRequirements_includes_gpuDevice; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."systemRequirements_includes_gpuDevice" ("systemRequirements_systemRequirementsID", "systemRequirements_gpuDeviceID", "systemRequirements_minimumGpuRAM") FROM stdin;
\.


--
-- Data for Name: systemRequirements_includes_machineType; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."systemRequirements_includes_machineType" ("systemRequirements_systemRequirementsID", "systemRequirements_machineTypeID") FROM stdin;
\.


--
-- Data for Name: systemRequirements_includes_osVersion; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."systemRequirements_includes_osVersion" ("systemRequirements_systemRequirementsID", "systemRequirements_osVersionID") FROM stdin;
\.


--
-- Data for Name: systemRequirements_includes_pointerDeviceType; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."systemRequirements_includes_pointerDeviceType" ("systemRequirements_systemRequirementsID", "systemRequirements_pointerDeviceTypeID") FROM stdin;
\.


--
-- Data for Name: systemRequirements_includes_softwareVersion; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."systemRequirements_includes_softwareVersion" ("systemRequirements_systemRequirementsID", "systemRequirements_softwareVersionID") FROM stdin;
\.


--
-- Data for Name: systemRequirements_includes_storageDeviceType; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."systemRequirements_includes_storageDeviceType" ("systemRequirements_systemRequirementsID", "systemRequirements_storageDeviceTypeID") FROM stdin;
\.


--
-- Data for Name: timezone; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public.timezone ("timezoneQID", "utcOffset") FROM stdin;
\.


--
-- Data for Name: timezoneName; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."timezoneName" ("timezoneNameID", "timeZoneName") FROM stdin;
\.


--
-- Data for Name: timezone_has_timezoneName; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."timezone_has_timezoneName" ("timezone_timezoneQID", "timezoneName_timezoneNameID") FROM stdin;
\.


--
-- Data for Name: userInformation; Type: TABLE DATA; Schema: public; Owner: eaasi_dev
--

COPY public."userInformation" ("userInformationID", username, password, organization, admin) FROM stdin;
\.


--
-- Name: alternateName_alternatenameid_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public."alternateName_alternatenameid_seq"', 1, false);


--
-- Name: audioDevice_audioDeviceID_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public."audioDevice_audioDeviceID_seq"', 1, false);


--
-- Name: color_depth_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public.color_depth_settings_id_seq', 1, false);


--
-- Name: computing_environment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public.computing_environment_id_seq', 1, false);


--
-- Name: configuredMachine_configuredMachineID_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public."configuredMachine_configuredMachineID_seq"', 1, false);


--
-- Name: configured_network_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public.configured_network_id_seq', 1, false);


--
-- Name: configured_os_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public.configured_os_id_seq', 1, false);


--
-- Name: configured_os_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public.configured_os_id_seq1', 1, false);


--
-- Name: configured_software_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public.configured_software_id_seq', 1, false);


--
-- Name: digital_object_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public.digital_object_id_seq', 1, false);


--
-- Name: displayDevice_displayDeviceID_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public."displayDevice_displayDeviceID_seq"', 1, false);


--
-- Name: display_resolution_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public.display_resolution_settings_id_seq', 1, false);


--
-- Name: fileExtension_fileExtensionID_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public."fileExtension_fileExtensionID_seq"', 1, false);


--
-- Name: file_format_operation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public.file_format_operation_id_seq', 1, false);


--
-- Name: file_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public.file_id_seq', 1, false);


--
-- Name: formatOperation_operationID_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public."formatOperation_operationID_seq"', 1, false);


--
-- Name: gpuDevice_gpuDeviceID_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public."gpuDevice_gpuDeviceID_seq"', 1, false);


--
-- Name: keyboardDevice_keyboardDeviceID_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public."keyboardDevice_keyboardDeviceID_seq"', 1, false);


--
-- Name: machineType_machineTypeID_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public."machineType_machineTypeID_seq"', 1, false);


--
-- Name: networkDevice_networkDeviceID_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public."networkDevice_networkDeviceID_seq"', 1, false);


--
-- Name: networkService_networkServiceID_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public."networkService_networkServiceID_seq"', 1, false);


--
-- Name: os_version_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public.os_version_id_seq', 1, false);


--
-- Name: os_version_language_settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public.os_version_language_settings_id_seq', 1, false);


--
-- Name: pointerDeviceType_pointerDeviceTypeID_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public."pointerDeviceType_pointerDeviceTypeID_seq"', 1, false);


--
-- Name: readwritestatus_readwritestatusid_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public.readwritestatus_readwritestatusid_seq', 1, false);


--
-- Name: softwareObject_softwareObjectID_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public."softwareObject_softwareObjectID_seq"', 1, false);


--
-- Name: software_environment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public.software_environment_id_seq', 1, false);


--
-- Name: software_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public.software_product_id_seq', 1, false);


--
-- Name: software_version_id_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public.software_version_id_seq', 1, false);


--
-- Name: storageDeviceType_storageDeviceTypeID_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public."storageDeviceType_storageDeviceTypeID_seq"', 1, false);


--
-- Name: storageDevice_storageDeviceID_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public."storageDevice_storageDeviceID_seq"', 1, false);


--
-- Name: systemRequirements_systemRequirementsID_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public."systemRequirements_systemRequirementsID_seq"', 1, false);


--
-- Name: userInformation_userInformationID_seq; Type: SEQUENCE SET; Schema: public; Owner: eaasi_dev
--

SELECT pg_catalog.setval('public."userInformation_userInformationID_seq"', 1, false);


--
-- Name: audioDevice "audioDevice"_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."audioDevice"
    ADD CONSTRAINT """audioDevice""_pk" PRIMARY KEY ("audioDeviceID");


--
-- Name: cpuArchitecture "cpuArchitecture"_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."cpuArchitecture"
    ADD CONSTRAINT """cpuArchitecture""_pk" PRIMARY KEY ("cpuArchitectureQID");


--
-- Name: displayDevice "displayDevice"_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."displayDevice"
    ADD CONSTRAINT """displayDevice""_pk" PRIMARY KEY ("displayDeviceID");


--
-- Name: fileFormat "fileFormat"_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."fileFormat"
    ADD CONSTRAINT """fileFormat""_pk" PRIMARY KEY ("fileFormatQID");


--
-- Name: fileSystem "fileSystem"_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."fileSystem"
    ADD CONSTRAINT """fileSystem""_pk" PRIMARY KEY ("fileSystemQID");


--
-- Name: gpuDevice "gpuDevice"_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."gpuDevice"
    ADD CONSTRAINT """gpuDevice""_pk" PRIMARY KEY ("gpuDeviceID");


--
-- Name: keyboardDevice "keyboardDevice"_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."keyboardDevice"
    ADD CONSTRAINT """keyboardDevice""_pk" PRIMARY KEY ("keyboardDeviceID");


--
-- Name: keyboardLayout "keyboardLayout"_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."keyboardLayout"
    ADD CONSTRAINT """keyboardLayout""_pk" PRIMARY KEY ("keyboardLayoutQID");


--
-- Name: networkDevice "networkDevice"_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."networkDevice"
    ADD CONSTRAINT """networkDevice""_pk" PRIMARY KEY ("networkDeviceID");


--
-- Name: networkService "networkService"_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."networkService"
    ADD CONSTRAINT """networkService""_pk" PRIMARY KEY ("networkServiceID");


--
-- Name: objectFileOperation "objectFileOperation"_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."objectFileOperation"
    ADD CONSTRAINT """objectFileOperation""_pk" PRIMARY KEY ("operationID");


--
-- Name: pointerDeviceType "pointerDeviceType"_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."pointerDeviceType"
    ADD CONSTRAINT """pointerDeviceType""_pk" PRIMARY KEY ("pointerDeviceTypeID");


--
-- Name: programmingLanguage "programmingLanguage"_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."programmingLanguage"
    ADD CONSTRAINT """programmingLanguage""_pk" PRIMARY KEY ("programmingLanguageQID");


--
-- Name: softwareObject "softwareObject"_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareObject"
    ADD CONSTRAINT """softwareObject""_pk" PRIMARY KEY ("softwareObjectID");


--
-- Name: storageDevice "storageDevice"_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."storageDevice"
    ADD CONSTRAINT """storageDevice""_pk" PRIMARY KEY ("storageDeviceID");


--
-- Name: storageDeviceType "storageDeviceType"_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."storageDeviceType"
    ADD CONSTRAINT """storageDeviceType""_pk" PRIMARY KEY ("storageDeviceTypeID");


--
-- Name: systemRequirements "systemRequirements"_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."systemRequirements"
    ADD CONSTRAINT """systemRequirements""_pk" PRIMARY KEY ("systemRequirementsID");


--
-- Name: userInformation "userInformation"_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."userInformation"
    ADD CONSTRAINT """userInformation""_pk" PRIMARY KEY ("userInformationID");


--
-- Name: alternateName alternatename_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."alternateName"
    ADD CONSTRAINT alternatename_pk PRIMARY KEY ("alternateNameID");


--
-- Name: colorDepth color_depth_settings_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."colorDepth"
    ADD CONSTRAINT color_depth_settings_pk PRIMARY KEY ("colorDepthID");


--
-- Name: computingEnvironment computing_environment_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."computingEnvironment"
    ADD CONSTRAINT computing_environment_pk PRIMARY KEY ("computingEnvironmentID");


--
-- Name: configuredNetwork configured_network_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredNetwork"
    ADD CONSTRAINT configured_network_pk PRIMARY KEY ("configuredNetworkID");


--
-- Name: configuredOS configured_os_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredOS"
    ADD CONSTRAINT configured_os_pk PRIMARY KEY ("configuredOperatingSystemID");


--
-- Name: configuredSoftware configured_software_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredSoftware"
    ADD CONSTRAINT configured_software_pk PRIMARY KEY ("configuredSoftwareVersionID");


--
-- Name: configuredMachine configuredmachine_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredMachine"
    ADD CONSTRAINT configuredmachine_pk PRIMARY KEY ("configuredMachineID");


--
-- Name: developer developer_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public.developer
    ADD CONSTRAINT developer_pk PRIMARY KEY ("developerQID");


--
-- Name: digitalObject digital_object_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."digitalObject"
    ADD CONSTRAINT digital_object_pk PRIMARY KEY ("digitalObjectID");


--
-- Name: displayResolution display_resolution_settings_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."displayResolution"
    ADD CONSTRAINT display_resolution_settings_pk PRIMARY KEY ("displayResolutionID");


--
-- Name: formatImplementation file_format_operation_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."formatImplementation"
    ADD CONSTRAINT file_format_operation_pk PRIMARY KEY ("formatImplementationID");


--
-- Name: file file_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public.file
    ADD CONSTRAINT file_pk PRIMARY KEY ("fileID");


--
-- Name: fileExtension fileextension_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."fileExtension"
    ADD CONSTRAINT fileextension_pk PRIMARY KEY ("fileExtensionID");


--
-- Name: formatOperation formatoperation_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."formatOperation"
    ADD CONSTRAINT formatoperation_pk PRIMARY KEY ("operationID");


--
-- Name: machineType machinetype_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."machineType"
    ADD CONSTRAINT machinetype_pk PRIMARY KEY ("machineTypeID");


--
-- Name: mountFormat mountformat_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."mountFormat"
    ADD CONSTRAINT mountformat_pk PRIMARY KEY ("mountFormatQID");


--
-- Name: osVersion_languageSettings os_version_language_settings_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion_languageSettings"
    ADD CONSTRAINT os_version_language_settings_pk PRIMARY KEY ("osVersion_osVersionID");


--
-- Name: osVersion os_version_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion"
    ADD CONSTRAINT os_version_pk PRIMARY KEY ("osVersionID");


--
-- Name: readWriteStatus readwritestatus_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."readWriteStatus"
    ADD CONSTRAINT readwritestatus_pk PRIMARY KEY ("readWriteStatusID");


--
-- Name: region region_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public.region
    ADD CONSTRAINT region_pk PRIMARY KEY ("regionQID");


--
-- Name: softwareEnvironment software_environment_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareEnvironment"
    ADD CONSTRAINT software_environment_pk PRIMARY KEY ("softwareEnvironmentID");


--
-- Name: softwareProduct software_product_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareProduct"
    ADD CONSTRAINT software_product_pk PRIMARY KEY ("softwareProductID");


--
-- Name: softwareVersion software_version_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareVersion"
    ADD CONSTRAINT software_version_pk PRIMARY KEY ("softwareVersionID");


--
-- Name: softwareProduct_has_alternateName softwareproduct_has_alternatename_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareProduct_has_alternateName"
    ADD CONSTRAINT softwareproduct_has_alternatename_pk PRIMARY KEY ("softwareProduct_softwareProductID", "softwareProduct_alternateNameID");


--
-- Name: softwareType softwaretype_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareType"
    ADD CONSTRAINT softwaretype_pk PRIMARY KEY ("softwareTypeQID");


--
-- Name: timezone timezone_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public.timezone
    ADD CONSTRAINT timezone_pk PRIMARY KEY ("timezoneQID");


--
-- Name: timezoneName timezonename_pk; Type: CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."timezoneName"
    ADD CONSTRAINT timezonename_pk PRIMARY KEY ("timezoneNameID");


--
-- Name: "audioDevice"_"audioDeviceID"_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX """audioDevice""_""audioDeviceID""_uindex" ON public."audioDevice" USING btree ("audioDeviceID");


--
-- Name: "cpuArchitecture"_"cpuArchitectureQID"_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX """cpuArchitecture""_""cpuArchitectureQID""_uindex" ON public."cpuArchitecture" USING btree ("cpuArchitectureQID");


--
-- Name: "displayDevice"_"displayDeviceID"_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX """displayDevice""_""displayDeviceID""_uindex" ON public."displayDevice" USING btree ("displayDeviceID");


--
-- Name: "fileFormat"_"fileFormatQID"_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX """fileFormat""_""fileFormatQID""_uindex" ON public."fileFormat" USING btree ("fileFormatQID");


--
-- Name: "fileSystem"_"fileSystemQID"_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX """fileSystem""_""fileSystemQID""_uindex" ON public."fileSystem" USING btree ("fileSystemQID");


--
-- Name: "gpuDevice"_"gpuDeviceID"_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX """gpuDevice""_""gpuDeviceID""_uindex" ON public."gpuDevice" USING btree ("gpuDeviceID");


--
-- Name: "keyboardDevice"_"keyboardDeviceID"_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX """keyboardDevice""_""keyboardDeviceID""_uindex" ON public."keyboardDevice" USING btree ("keyboardDeviceID");


--
-- Name: "keyboardLayout"_"keyboardLayoutQID"_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX """keyboardLayout""_""keyboardLayoutQID""_uindex" ON public."keyboardLayout" USING btree ("keyboardLayoutQID");


--
-- Name: "networkDevice"_"networkDeviceID"_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX """networkDevice""_""networkDeviceID""_uindex" ON public."networkDevice" USING btree ("networkDeviceID");


--
-- Name: "networkService"_"networkServiceID"_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX """networkService""_""networkServiceID""_uindex" ON public."networkService" USING btree ("networkServiceID");


--
-- Name: "objectFileOperation"_"operationID"_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX """objectFileOperation""_""operationID""_uindex" ON public."objectFileOperation" USING btree ("operationID");


--
-- Name: "pointerDeviceType"_"pointerDeviceTypeID"_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX """pointerDeviceType""_""pointerDeviceTypeID""_uindex" ON public."pointerDeviceType" USING btree ("pointerDeviceTypeID");


--
-- Name: "programmingLanguage"_"programmingLanguageQID"_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX """programmingLanguage""_""programmingLanguageQID""_uindex" ON public."programmingLanguage" USING btree ("programmingLanguageQID");


--
-- Name: "softwareObject"_"softwareObjectID"_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX """softwareObject""_""softwareObjectID""_uindex" ON public."softwareObject" USING btree ("softwareObjectID");


--
-- Name: "storageDevice"_"storageDeviceID"_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX """storageDevice""_""storageDeviceID""_uindex" ON public."storageDevice" USING btree ("storageDeviceID");


--
-- Name: "storageDeviceType"_"storageDeviceTypeID"_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX """storageDeviceType""_""storageDeviceTypeID""_uindex" ON public."storageDeviceType" USING btree ("storageDeviceTypeID");


--
-- Name: "systemRequirements"_"systemRequirementsID"_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX """systemRequirements""_""systemRequirementsID""_uindex" ON public."systemRequirements" USING btree ("systemRequirementsID");


--
-- Name: "userInformation"_"userInformationID"_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX """userInformation""_""userInformationID""_uindex" ON public."userInformation" USING btree ("userInformationID");


--
-- Name: alternatename_alternatename_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX alternatename_alternatename_uindex ON public."alternateName" USING btree ("alternateName");


--
-- Name: alternatename_alternatenameid_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX alternatename_alternatenameid_uindex ON public."alternateName" USING btree ("alternateNameID");


--
-- Name: color_depth_settings_id_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX color_depth_settings_id_uindex ON public."colorDepth" USING btree ("colorDepthID");


--
-- Name: computing_environment_id_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX computing_environment_id_uindex ON public."computingEnvironment" USING btree ("computingEnvironmentID");


--
-- Name: configuredMachine_"configuredMachineID"_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX "configuredMachine_""configuredMachineID""_uindex" ON public."configuredMachine" USING btree ("configuredMachineID");


--
-- Name: configured_network_id_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX configured_network_id_uindex ON public."configuredNetwork" USING btree ("configuredNetworkID");


--
-- Name: configured_os_id_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX configured_os_id_uindex ON public."configuredOS" USING btree ("configuredOperatingSystemID");


--
-- Name: configured_software_id_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX configured_software_id_uindex ON public."configuredSoftware" USING btree ("configuredSoftwareVersionID");


--
-- Name: configuredgpudevice_configuredgpudevice_gpudeviceid_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX configuredgpudevice_configuredgpudevice_gpudeviceid_uindex ON public."configuredGpuDevice" USING btree ("configuredGpuDevice_gpuDeviceID");


--
-- Name: configurednetwork_has_configuredmachine_configurednetwork_confi; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX configurednetwork_has_configuredmachine_configurednetwork_confi ON public."configuredNetwork_has_configuredMachine" USING btree ("configuredNetwork_configuredNetworkID");


--
-- Name: configurednetwork_has_configuredmachine_configurednetwork_machi; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX configurednetwork_has_configuredmachine_configurednetwork_machi ON public."configuredNetwork_has_configuredMachine" USING btree ("configuredNetwork_machineID");


--
-- Name: developer_"developerQID"_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX "developer_""developerQID""_uindex" ON public.developer USING btree ("developerQID");


--
-- Name: digital_object_id_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX digital_object_id_uindex ON public."digitalObject" USING btree ("digitalObjectID");


--
-- Name: digitalobject_has_objectfile_digitalobjectfileid_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX digitalobject_has_objectfile_digitalobjectfileid_uindex ON public."digitalObject_has_objectFile" USING btree ("digitalObjectFileID");


--
-- Name: display_resolution_settings_id_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX display_resolution_settings_id_uindex ON public."displayResolution" USING btree ("displayResolutionID");


--
-- Name: fileExtension_"fileExtensionID"_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX "fileExtension_""fileExtensionID""_uindex" ON public."fileExtension" USING btree ("fileExtensionID");


--
-- Name: file_format_operation_id_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX file_format_operation_id_uindex ON public."formatImplementation" USING btree ("formatImplementationID");


--
-- Name: file_id_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX file_id_uindex ON public.file USING btree ("fileID");


--
-- Name: formatOperation_"operationID"_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX "formatOperation_""operationID""_uindex" ON public."formatOperation" USING btree ("operationID");


--
-- Name: machineType_"machineTypeID"_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX "machineType_""machineTypeID""_uindex" ON public."machineType" USING btree ("machineTypeID");


--
-- Name: mountformat_mountformatqid_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX mountformat_mountformatqid_uindex ON public."mountFormat" USING btree ("mountFormatQID");


--
-- Name: objectenvironment_objectenvironment_objectenvironment_computing; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX objectenvironment_objectenvironment_objectenvironment_computing ON public."objectEnvironment" USING btree ("objectEnvironment_objectEnvironment_computingEnvironmentID");


--
-- Name: os_version_id_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX os_version_id_uindex ON public."osVersion" USING btree ("osVersionID");


--
-- Name: os_version_language_settings_id_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX os_version_language_settings_id_uindex ON public."osVersion_languageSettings" USING btree ("osVersion_osVersionID");


--
-- Name: pointerdevice_pointerdeviceid_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX pointerdevice_pointerdeviceid_uindex ON public."pointerDevice" USING btree ("pointerDeviceID");


--
-- Name: readwritestatus_readwritestatusid_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX readwritestatus_readwritestatusid_uindex ON public."readWriteStatus" USING btree ("readWriteStatusID");


--
-- Name: region_regionqid_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX region_regionqid_uindex ON public.region USING btree ("regionQID");


--
-- Name: software_environment_id_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX software_environment_id_uindex ON public."softwareEnvironment" USING btree ("softwareEnvironmentID");


--
-- Name: software_product_id_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX software_product_id_uindex ON public."softwareProduct" USING btree ("softwareProductID");


--
-- Name: software_version_id_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX software_version_id_uindex ON public."softwareVersion" USING btree ("softwareVersionID");


--
-- Name: softwareenvironment_has_diskimage_softwareenvironment_softwaree; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX softwareenvironment_has_diskimage_softwareenvironment_softwaree ON public."softwareEnvironment_has_diskImage" USING btree ("softwareEnvironment_softwareEnvironmentID");


--
-- Name: softwarelicense_softwarelicenseqid_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX softwarelicense_softwarelicenseqid_uindex ON public."softwareLicense" USING btree ("softwareLicenseQID");


--
-- Name: softwareobject_hasobjectfile_softwareobject_softwareobjectid_ui; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX softwareobject_hasobjectfile_softwareobject_softwareobjectid_ui ON public."softwareObject_has_objectFile" USING btree ("softwareObject_softwareObjectID");


--
-- Name: softwareobject_hasobjectfile_softwareobjectfileid_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX softwareobject_hasobjectfile_softwareobjectfileid_uindex ON public."softwareObject_has_objectFile" USING btree ("softwareObjectFileID");


--
-- Name: softwaretype_softwaretypeqid_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX softwaretype_softwaretypeqid_uindex ON public."softwareType" USING btree ("softwareTypeQID");


--
-- Name: timezone_timezoneqid_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX timezone_timezoneqid_uindex ON public.timezone USING btree ("timezoneQID");


--
-- Name: timezonename_timezonenameid_uindex; Type: INDEX; Schema: public; Owner: eaasi_dev
--

CREATE UNIQUE INDEX timezonename_timezonenameid_uindex ON public."timezoneName" USING btree ("timezoneNameID");


--
-- Name: audioDevice_hasEquivalent "audioDevice_hasEquivalent"_audioDevice_2_audioDeviceID_fk_2; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."audioDevice_hasEquivalent"
    ADD CONSTRAINT """audioDevice_hasEquivalent""_audioDevice_2_audioDeviceID_fk_2" FOREIGN KEY ("audioDevice_audioDeviceID") REFERENCES public."audioDevice"("audioDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: audioDevice_hasEquivalent "audioDevice_hasEquivalent"_audioDevice_audioDeviceID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."audioDevice_hasEquivalent"
    ADD CONSTRAINT """audioDevice_hasEquivalent""_audioDevice_audioDeviceID_fk" FOREIGN KEY ("audioDevice_audioDeviceID") REFERENCES public."audioDevice"("audioDeviceID");


--
-- Name: audioDevice_has_driverSoftware "audioDevice_has_driverSoftware"_audioDevice_audioDeviceID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."audioDevice_has_driverSoftware"
    ADD CONSTRAINT """audioDevice_has_driverSoftware""_audioDevice_audioDeviceID_fk" FOREIGN KEY ("audioDevice_audioDeviceID") REFERENCES public."audioDevice"("audioDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: audioDevice_has_driverSoftware "audioDevice_has_driverSoftware"_softwareVersion_softwareVersio; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."audioDevice_has_driverSoftware"
    ADD CONSTRAINT """audioDevice_has_driverSoftware""_softwareVersion_softwareVersio" FOREIGN KEY ("audioDevice_driverSoftwareID") REFERENCES public."softwareVersion"("softwareVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: audioDevice_has_machineInterface "audioDevice_has_machineInterface"_audioDevice_audioDeviceID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."audioDevice_has_machineInterface"
    ADD CONSTRAINT """audioDevice_has_machineInterface""_audioDevice_audioDeviceID_fk" FOREIGN KEY ("audioDevice_audioDeviceID") REFERENCES public."audioDevice"("audioDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredAudioDevice "configuredAudioDevice"_audioDevice_audioDeviceID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredAudioDevice"
    ADD CONSTRAINT """configuredAudioDevice""_audioDevice_audioDeviceID_fk" FOREIGN KEY ("configuredAudioDevice_audioDeviceID") REFERENCES public."audioDevice"("audioDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredAudioDevice "configuredAudioDevice"_configuredMachine_configuredMachineID_f; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredAudioDevice"
    ADD CONSTRAINT """configuredAudioDevice""_configuredMachine_configuredMachineID_f" FOREIGN KEY ("configuredMachine_machineID") REFERENCES public."configuredMachine"("configuredMachineID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredGpuDevice "configuredGpuDevice"_configuredMachine_configuredMachineID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredGpuDevice"
    ADD CONSTRAINT """configuredGpuDevice""_configuredMachine_configuredMachineID_fk" FOREIGN KEY ("configuredMachine_machineID") REFERENCES public."configuredMachine"("configuredMachineID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredGpuDevice "configuredGpuDevice"_gpuDevice_gpuDeviceID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredGpuDevice"
    ADD CONSTRAINT """configuredGpuDevice""_gpuDevice_gpuDeviceID_fk" FOREIGN KEY ("configuredGpuDevice_gpuDeviceID") REFERENCES public."gpuDevice"("gpuDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredKeyboardDevice "configuredKeyboardDevice"_configuredMachine_configuredMachineI; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredKeyboardDevice"
    ADD CONSTRAINT """configuredKeyboardDevice""_configuredMachine_configuredMachineI" FOREIGN KEY ("configuredMachine_machineID") REFERENCES public."configuredMachine"("configuredMachineID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredKeyboardDevice "configuredKeyboardDevice"_keyboardDevice_keyboardDeviceID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredKeyboardDevice"
    ADD CONSTRAINT """configuredKeyboardDevice""_keyboardDevice_keyboardDeviceID_fk" FOREIGN KEY ("configuredKeyboardDevice_keyboardDeviceID") REFERENCES public."keyboardDevice"("keyboardDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredMachine_has_event "configuredMachine_has_event"_configuredMachine_configuredMachi; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredMachine_has_event"
    ADD CONSTRAINT """configuredMachine_has_event""_configuredMachine_configuredMachi" FOREIGN KEY ("configuredMachine_machineID") REFERENCES public."configuredMachine"("configuredMachineID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredNetworkDevice "configuredNetworkDevice"_configuredMachine_configuredMachineID; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredNetworkDevice"
    ADD CONSTRAINT """configuredNetworkDevice""_configuredMachine_configuredMachineID" FOREIGN KEY ("configuredMachine_machineID") REFERENCES public."configuredMachine"("configuredMachineID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredNetworkDevice "configuredNetworkDevice"_networkDevice_networkDeviceID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredNetworkDevice"
    ADD CONSTRAINT """configuredNetworkDevice""_networkDevice_networkDeviceID_fk" FOREIGN KEY ("configuredNetworkDevice_networkDeviceID") REFERENCES public."networkDevice"("networkDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredNetworkMachine_expectedNetworkService "configuredNetworkMachine_expectedNetworkService"_networkServic; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredNetworkMachine_expectedNetworkService"
    ADD CONSTRAINT """configuredNetworkMachine_expectedNetworkService""_networkServic" FOREIGN KEY ("configuredNetworkMachine_expectedNetworkServiceID") REFERENCES public."networkService"("networkServiceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredNetwork_emulatesNetworkService "configuredNetwork_emulatesNetworkService"_configuredNetwork_co; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredNetwork_emulatesNetworkService"
    ADD CONSTRAINT """configuredNetwork_emulatesNetworkService""_configuredNetwork_co" FOREIGN KEY ("configuredNetwork_configuredNetworkID") REFERENCES public."configuredNetwork"("configuredNetworkID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredNetwork_emulatesNetworkService "configuredNetwork_emulatesNetworkService"_networkService_netwo; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredNetwork_emulatesNetworkService"
    ADD CONSTRAINT """configuredNetwork_emulatesNetworkService""_networkService_netwo" FOREIGN KEY ("configuredNetwork_networkServiceID") REFERENCES public."networkService"("networkServiceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredNetwork_hasEvent "configuredNetwork_hasEvent"_configuredNetwork_configuredNetwor; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredNetwork_hasEvent"
    ADD CONSTRAINT """configuredNetwork_hasEvent""_configuredNetwork_configuredNetwor" FOREIGN KEY ("configuredNetwork_configuredNetworkID") REFERENCES public."configuredNetwork"("configuredNetworkID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredOS_has_event "configuredOS_has_event"_configured_os_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredOS_has_event"
    ADD CONSTRAINT """configuredOS_has_event""_configured_os_id_fk" FOREIGN KEY ("configuredOS_configuredOperatingSystemID") REFERENCES public."configuredOS"("configuredOperatingSystemID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredPointerDevice "configuredPointerDevice"_configuredMachine_configuredMachineID; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredPointerDevice"
    ADD CONSTRAINT """configuredPointerDevice""_configuredMachine_configuredMachineID" FOREIGN KEY ("configuredMachine_machineID") REFERENCES public."configuredMachine"("configuredMachineID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredPointerDevice "configuredPointerDevice"_pointerDevice_pointerDeviceID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredPointerDevice"
    ADD CONSTRAINT """configuredPointerDevice""_pointerDevice_pointerDeviceID_fk" FOREIGN KEY ("configuredPointerDevice_pointerDeviceID") REFERENCES public."pointerDevice"("pointerDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredSoftware_has_event "configuredSoftware_has_event"_configuredSoftware_configuredSof; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredSoftware_has_event"
    ADD CONSTRAINT """configuredSoftware_has_event""_configuredSoftware_configuredSof" FOREIGN KEY ("configuredSoftware_configuredSoftwareManifestationID") REFERENCES public."configuredSoftware"("configuredSoftwareVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredStorageDevice "configuredStorageDevice"_configuredMachine_configuredMachineID; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredStorageDevice"
    ADD CONSTRAINT """configuredStorageDevice""_configuredMachine_configuredMachineID" FOREIGN KEY ("configuredMachine_machineID") REFERENCES public."configuredMachine"("configuredMachineID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredStorageDevice "configuredStorageDevice"_storageDevice_storageDeviceID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredStorageDevice"
    ADD CONSTRAINT """configuredStorageDevice""_storageDevice_storageDeviceID_fk" FOREIGN KEY ("configureStorageDevice_storageDeviceID") REFERENCES public."storageDevice"("storageDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: digitalObject_has_alternativeID "digitalObject_has_alternativeID"_digitallObject_digitalObjectI; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."digitalObject_has_alternativeID"
    ADD CONSTRAINT """digitalObject_has_alternativeID""_digitallObject_digitalObjectI" FOREIGN KEY ("digitalObject_digitalObjectID") REFERENCES public."digitalObject"("digitalObjectID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: digitalObject_has_event "digitalObject_has_event"_digitallObject_digitalObjectID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."digitalObject_has_event"
    ADD CONSTRAINT """digitalObject_has_event""_digitallObject_digitalObjectID_fk" FOREIGN KEY ("digitalObject_digialObjectID") REFERENCES public."digitalObject"("digitalObjectID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: digitalObject_isCompatibleWith_computingEnvironment "digitalObject_isCompatibleWith_computingEnvironment"_computing; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."digitalObject_isCompatibleWith_computingEnvironment"
    ADD CONSTRAINT """digitalObject_isCompatibleWith_computingEnvironment""_computing" FOREIGN KEY ("compatibleComputingEnvironmentID") REFERENCES public."computingEnvironment"("computingEnvironmentID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: digitalObject_isCompatibleWith_computingEnvironment "digitalObject_isCompatibleWith_computingEnvironment"_digitallO; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."digitalObject_isCompatibleWith_computingEnvironment"
    ADD CONSTRAINT """digitalObject_isCompatibleWith_computingEnvironment""_digitallO" FOREIGN KEY ("digitalObject_digitalObjectID") REFERENCES public."digitalObject"("digitalObjectID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: displayDevice_has_colorDepth "displayDevice_has_colorDepth"_colorDepth_colorDepthID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."displayDevice_has_colorDepth"
    ADD CONSTRAINT """displayDevice_has_colorDepth""_colorDepth_colorDepthID_fk" FOREIGN KEY ("colorDepth_colorDepthID") REFERENCES public."colorDepth"("colorDepthID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: displayDevice_has_displayInterface "displayDevice_has_displayInterface"_displayDevice_displayDevic; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."displayDevice_has_displayInterface"
    ADD CONSTRAINT """displayDevice_has_displayInterface""_displayDevice_displayDevic" FOREIGN KEY ("displayDevice_displayDeviceID") REFERENCES public."displayDevice"("displayDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: displayDevice_has_displayResolution "displayDevice_has_displayResolution"_displayDevice_displayDevi; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."displayDevice_has_displayResolution"
    ADD CONSTRAINT """displayDevice_has_displayResolution""_displayDevice_displayDevi" FOREIGN KEY ("displayDevice_displayDeviceID") REFERENCES public."displayDevice"("displayDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: displayDevice_has_displayResolution "displayDevice_has_displayResolution"_displayResolution_display; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."displayDevice_has_displayResolution"
    ADD CONSTRAINT """displayDevice_has_displayResolution""_displayResolution_display" FOREIGN KEY ("availableDisplayResolution") REFERENCES public."displayResolution"("displayResolutionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: displayDevice_has_driverSoftware "displayDevice_has_driverSoftware"_displayDevice_displayDeviceI; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."displayDevice_has_driverSoftware"
    ADD CONSTRAINT """displayDevice_has_driverSoftware""_displayDevice_displayDeviceI" FOREIGN KEY ("displayDevice_displayDeviceID") REFERENCES public."displayDevice"("displayDeviceID");


--
-- Name: displayDevice_has_driverSoftware "displayDevice_has_driverSoftware"_softwareVersion_softwareVers; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."displayDevice_has_driverSoftware"
    ADD CONSTRAINT """displayDevice_has_driverSoftware""_softwareVersion_softwareVers" FOREIGN KEY ("displayDevice_driverSoftwareID") REFERENCES public."softwareVersion"("softwareVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: formatImplementation_includes_fileFormat "formatImplementation_includes_fileFormat"_fileFormat_fileForma; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."formatImplementation_includes_fileFormat"
    ADD CONSTRAINT """formatImplementation_includes_fileFormat""_fileFormat_fileForma" FOREIGN KEY ("fileFormat_fileFormatQID") REFERENCES public."fileFormat"("fileFormatQID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: formatImplementation_includes_fileFormat "formatImplementation_includes_fileFormat"_formatImplementation; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."formatImplementation_includes_fileFormat"
    ADD CONSTRAINT """formatImplementation_includes_fileFormat""_formatImplementation" FOREIGN KEY ("formatImplementation_formatImplementationID") REFERENCES public."formatImplementation"("formatImplementationID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: gpuDevice_hasEquivalent "gpuDevice_hasEquivalent"_gpuDevice_gpuDeviceID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."gpuDevice_hasEquivalent"
    ADD CONSTRAINT """gpuDevice_hasEquivalent""_gpuDevice_gpuDeviceID_fk" FOREIGN KEY ("gpuDevice_gpuDeviceID") REFERENCES public."gpuDevice"("gpuDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: gpuDevice_has_displayInterface "gpuDevice_has_displayInterface"_gpuDevice_gpuDeviceID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."gpuDevice_has_displayInterface"
    ADD CONSTRAINT """gpuDevice_has_displayInterface""_gpuDevice_gpuDeviceID_fk" FOREIGN KEY ("gpuDevice_gpuDeviceID") REFERENCES public."gpuDevice"("gpuDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: gpuDevice_has_driverSoftware "gpuDevice_has_driverSoftware"_gpuDevice_gpuDeviceID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."gpuDevice_has_driverSoftware"
    ADD CONSTRAINT """gpuDevice_has_driverSoftware""_gpuDevice_gpuDeviceID_fk" FOREIGN KEY ("gpuDevice_gpuDeviceID") REFERENCES public."gpuDevice"("gpuDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: gpuDevice_has_driverSoftware "gpuDevice_has_driverSoftware"_softwareVersion_softwareVersionI; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."gpuDevice_has_driverSoftware"
    ADD CONSTRAINT """gpuDevice_has_driverSoftware""_softwareVersion_softwareVersionI" FOREIGN KEY ("gpuDevice_driverSoftwareID") REFERENCES public."softwareVersion"("softwareVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: gpuDevice_has_machineInterface "gpuDevice_has_machineInterface"_gpuDevice_gpuDeviceID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."gpuDevice_has_machineInterface"
    ADD CONSTRAINT """gpuDevice_has_machineInterface""_gpuDevice_gpuDeviceID_fk" FOREIGN KEY ("gpuDevice_gpuDeviceID") REFERENCES public."gpuDevice"("gpuDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: keyboardDevice_has_driverSoftware "keyboardDevice_has_driverSoftware"_keyboardDevice_keyboardDevi; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."keyboardDevice_has_driverSoftware"
    ADD CONSTRAINT """keyboardDevice_has_driverSoftware""_keyboardDevice_keyboardDevi" FOREIGN KEY ("keyboardDevice_keyboardDeviceID") REFERENCES public."keyboardDevice"("keyboardDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: keyboardDevice_has_driverSoftware "keyboardDevice_has_driverSoftware"_softwareVersion_softwareVer; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."keyboardDevice_has_driverSoftware"
    ADD CONSTRAINT """keyboardDevice_has_driverSoftware""_softwareVersion_softwareVer" FOREIGN KEY ("keyboardDevice_driverSoftware") REFERENCES public."softwareVersion"("softwareVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: keyboardDevice_has_language "keyboardDevice_has_language"_keyboardDevice_keyboardDeviceID_f; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."keyboardDevice_has_language"
    ADD CONSTRAINT """keyboardDevice_has_language""_keyboardDevice_keyboardDeviceID_f" FOREIGN KEY ("keyboardDevice_keyboardDeviceID") REFERENCES public."keyboardDevice"("keyboardDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: keyboardDevice_has_machineInterfaceID "keyboardDevice_has_machineInterfaceID"_keyboardDevice_keyboard; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."keyboardDevice_has_machineInterfaceID"
    ADD CONSTRAINT """keyboardDevice_has_machineInterfaceID""_keyboardDevice_keyboard" FOREIGN KEY ("keyboardDevice_keyboardDeviceID") REFERENCES public."keyboardDevice"("keyboardDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: networkDevice_has_machineInterface "networkDevice_has_machineInterface"_networkDevice_networkDevic; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."networkDevice_has_machineInterface"
    ADD CONSTRAINT """networkDevice_has_machineInterface""_networkDevice_networkDevic" FOREIGN KEY ("networkDevice_networkDeviceID") REFERENCES public."networkDevice"("networkDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: osVersion_colorDepthSettings "osVersion_colorDepthSettings"_colorDepth_colorDepthID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion_colorDepthSettings"
    ADD CONSTRAINT """osVersion_colorDepthSettings""_colorDepth_colorDepthID_fk" FOREIGN KEY ("osVersion_colorDepthID") REFERENCES public."colorDepth"("colorDepthID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: osVersion_colorDepthSettings "osVersion_colorDepthSettings"_osVersion_osVersionID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion_colorDepthSettings"
    ADD CONSTRAINT """osVersion_colorDepthSettings""_osVersion_osVersionID_fk" FOREIGN KEY ("osVersion_osVersionID") REFERENCES public."osVersion"("osVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: osVersion_displayResolutionSettings "osVersion_displayResolutionSettings"_displayResolution_display; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion_displayResolutionSettings"
    ADD CONSTRAINT """osVersion_displayResolutionSettings""_displayResolution_display" FOREIGN KEY ("osVersion_displayResolutionID") REFERENCES public."displayResolution"("displayResolutionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: osVersion_displayResolutionSettings "osVersion_displayResolutionSettings"_osVersion_osVersionID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion_displayResolutionSettings"
    ADD CONSTRAINT """osVersion_displayResolutionSettings""_osVersion_osVersionID_fk" FOREIGN KEY ("osVersion_osVersionID") REFERENCES public."osVersion"("osVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: osVersion_has_developer "osVersion_has_developer"_developer_developerQID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion_has_developer"
    ADD CONSTRAINT """osVersion_has_developer""_developer_developerQID_fk" FOREIGN KEY ("osVersion_developerQID") REFERENCES public.developer("developerQID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: osVersion_has_developer "osVersion_has_developer"_osVersion_osVersionID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion_has_developer"
    ADD CONSTRAINT """osVersion_has_developer""_osVersion_osVersionID_fk" FOREIGN KEY ("osVersion_osVersionID") REFERENCES public."osVersion"("osVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: osVersion_has_programmingLanguage "osVersion_has_programmingLanguage"_osVersion_osVersionID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion_has_programmingLanguage"
    ADD CONSTRAINT """osVersion_has_programmingLanguage""_osVersion_osVersionID_fk" FOREIGN KEY ("osVersion_osVersionID") REFERENCES public."osVersion"("osVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: osVersion_has_programmingLanguage "osVersion_has_programmingLanguage"_programmingLanguage_program; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion_has_programmingLanguage"
    ADD CONSTRAINT """osVersion_has_programmingLanguage""_programmingLanguage_program" FOREIGN KEY ("osVersion_programmingLanguageQID") REFERENCES public."programmingLanguage"("programmingLanguageQID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: osVersion_has_softwareLicense "osVersion_has_softwareLicense"_osVersion_osVersionID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion_has_softwareLicense"
    ADD CONSTRAINT """osVersion_has_softwareLicense""_osVersion_osVersionID_fk" FOREIGN KEY ("osVersion_osVersionID") REFERENCES public."osVersion"("osVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: osVersion_keyboardLayoutSettings "osVersion_keyboardLayoutSettings"_keyboardLayout_keyboardLayou; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion_keyboardLayoutSettings"
    ADD CONSTRAINT """osVersion_keyboardLayoutSettings""_keyboardLayout_keyboardLayou" FOREIGN KEY ("osVersion_keyboardLayoutQID") REFERENCES public."keyboardLayout"("keyboardLayoutQID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: osVersion_keyboardLayoutSettings "osVersion_keyboardLayoutSettings"_osVersion_osVersionID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion_keyboardLayoutSettings"
    ADD CONSTRAINT """osVersion_keyboardLayoutSettings""_osVersion_osVersionID_fk" FOREIGN KEY ("osVersion_osVersionID") REFERENCES public."osVersion"("osVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: osVersion_regionSettings "osVersion_regionSettings"_osVersion_osVersionID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion_regionSettings"
    ADD CONSTRAINT """osVersion_regionSettings""_osVersion_osVersionID_fk" FOREIGN KEY ("osVersion_osVersionID") REFERENCES public."osVersion"("osVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: osVersion_timeZoneSettings "osVersion_timeZoneSettings"_osVersion_osVersionID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion_timeZoneSettings"
    ADD CONSTRAINT """osVersion_timeZoneSettings""_osVersion_osVersionID_fk" FOREIGN KEY ("osVersion_osVersionID") REFERENCES public."osVersion"("osVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: osVersion_timeZoneSettings "osVersion_timeZoneSettings"_timezone_timezoneqid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion_timeZoneSettings"
    ADD CONSTRAINT """osVersion_timeZoneSettings""_timezone_timezoneqid_fk" FOREIGN KEY ("osVersion_timezoneQID") REFERENCES public.timezone("timezoneQID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: pointerDevice "pointerDevice"_pointerDeviceType_pointerDeviceTypeID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."pointerDevice"
    ADD CONSTRAINT """pointerDevice""_pointerDeviceType_pointerDeviceTypeID_fk" FOREIGN KEY ("pointerDeviceType") REFERENCES public."pointerDeviceType"("pointerDeviceTypeID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: pointerDevice_has_driverSoftware "pointerDevice_has_driverSoftware"_pointerDevice_pointerDeviceI; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."pointerDevice_has_driverSoftware"
    ADD CONSTRAINT """pointerDevice_has_driverSoftware""_pointerDevice_pointerDeviceI" FOREIGN KEY ("pointerDevice_pointerDeviceID") REFERENCES public."pointerDevice"("pointerDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: pointerDevice_has_driverSoftware "pointerDevice_has_driverSoftware"_softwareVersion_softwareVers; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."pointerDevice_has_driverSoftware"
    ADD CONSTRAINT """pointerDevice_has_driverSoftware""_softwareVersion_softwareVers" FOREIGN KEY ("pointerDevice_driverSoftwareID") REFERENCES public."softwareVersion"("softwareVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: pointerDevice_has_machineInterface "pointerDevice_has_machineInterface"_pointerDevice_pointerDevic; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."pointerDevice_has_machineInterface"
    ADD CONSTRAINT """pointerDevice_has_machineInterface""_pointerDevice_pointerDevic" FOREIGN KEY ("pointerDevice_pointerDeviceID") REFERENCES public."pointerDevice"("pointerDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareEnvironment_hasPart_configuredSoftware "softwareEnvironment_hasPart_configuredSoftware"_softwareEnviro; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareEnvironment_hasPart_configuredSoftware"
    ADD CONSTRAINT """softwareEnvironment_hasPart_configuredSoftware""_softwareEnviro" FOREIGN KEY ("softwareEnvironment_softwareEnvironmentID") REFERENCES public."softwareEnvironment"("softwareEnvironmentID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareEnvironment_has_event "softwareEnvironment_has_event"_softwareEnvironment_softwareEnv; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareEnvironment_has_event"
    ADD CONSTRAINT """softwareEnvironment_has_event""_softwareEnvironment_softwareEnv" FOREIGN KEY ("softwareEnvironment_softwareEnvironmentID") REFERENCES public."softwareEnvironment"("softwareEnvironmentID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareObject_isManifestationOf_osVersion "softwareObject_isManifestationOf_osVersion"_osVersion_osVersio; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareObject_isManifestationOf_osVersion"
    ADD CONSTRAINT """softwareObject_isManifestationOf_osVersion""_osVersion_osVersio" FOREIGN KEY ("softwareObject_osVersionID") REFERENCES public."osVersion"("osVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareObject_isManifestationOf_osVersion "softwareObject_isManifestationOf_osVersion"_softwareObject_sof; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareObject_isManifestationOf_osVersion"
    ADD CONSTRAINT """softwareObject_isManifestationOf_osVersion""_softwareObject_sof" FOREIGN KEY ("softwareObject_softwareObjectID") REFERENCES public."softwareObject"("softwareObjectID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareVersion_has_alternateID "softwareVersion_has_alternateID"_softwareVersion_softwareVersi; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareVersion_has_alternateID"
    ADD CONSTRAINT """softwareVersion_has_alternateID""_softwareVersion_softwareVersi" FOREIGN KEY ("softwareVersion_softwareVersionID") REFERENCES public."softwareVersion"("softwareVersionID");


--
-- Name: softwareVersion_has_developer "softwareVersion_has_developer"_developer_developerQID_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareVersion_has_developer"
    ADD CONSTRAINT """softwareVersion_has_developer""_developer_developerQID_fk" FOREIGN KEY ("softwareVersion_softwareDeveloperQID") REFERENCES public.developer("developerQID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareVersion_has_developer "softwareVersion_has_developer"_softwareVersion_softwareVersion; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareVersion_has_developer"
    ADD CONSTRAINT """softwareVersion_has_developer""_softwareVersion_softwareVersion" FOREIGN KEY ("softwareVersion_softwareVersionID") REFERENCES public."softwareVersion"("softwareVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareVersion_has_formatImplementation "softwareVersion_has_formatImplementation"_formatOperation_oper; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareVersion_has_formatImplementation"
    ADD CONSTRAINT """softwareVersion_has_formatImplementation""_formatOperation_oper" FOREIGN KEY ("softwareVersion_implementationOperation") REFERENCES public."formatOperation"("operationID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareVersion_has_programmingLanguage "softwareVersion_has_programmingLanguage"_softwareVersion_softw; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareVersion_has_programmingLanguage"
    ADD CONSTRAINT """softwareVersion_has_programmingLanguage""_softwareVersion_softw" FOREIGN KEY ("softwareVersion_softwareVersionID") REFERENCES public."softwareVersion"("softwareVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareVersion_has_softwareLicense "softwareVersion_has_softwareLicense"_softwareLicense_softwareL; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareVersion_has_softwareLicense"
    ADD CONSTRAINT """softwareVersion_has_softwareLicense""_softwareLicense_softwareL" FOREIGN KEY ("softwareVersion_softwareLicenseQID") REFERENCES public."softwareLicense"("softwareLicenseQID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareVersion_has_softwareLicense "softwareVersion_has_softwareLicense"_softwareVersion_softwareV; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareVersion_has_softwareLicense"
    ADD CONSTRAINT """softwareVersion_has_softwareLicense""_softwareVersion_softwareV" FOREIGN KEY ("softwareVersion_softwareVersionID") REFERENCES public."softwareVersion"("softwareVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareVersion_isCompatibleWith_computingEnvironment "softwareVersion_isCompatibleWith_computingEnvironment"_computi; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareVersion_isCompatibleWith_computingEnvironment"
    ADD CONSTRAINT """softwareVersion_isCompatibleWith_computingEnvironment""_computi" FOREIGN KEY ("compatibleComputingEnvironmentID") REFERENCES public."computingEnvironment"("computingEnvironmentID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareVersion_isCompatibleWith_computingEnvironment "softwareVersion_isCompatibleWith_computingEnvironment"_softwar; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareVersion_isCompatibleWith_computingEnvironment"
    ADD CONSTRAINT """softwareVersion_isCompatibleWith_computingEnvironment""_softwar" FOREIGN KEY ("sofwareVersion_softwareVersionID") REFERENCES public."softwareVersion"("softwareVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareVersion_languageSettings "softwareVersion_languageSettings"_softwareVersion_softwareVers; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareVersion_languageSettings"
    ADD CONSTRAINT """softwareVersion_languageSettings""_softwareVersion_softwareVers" FOREIGN KEY ("softwareVersion_softwareVersionID") REFERENCES public."softwareVersion"("softwareVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: storageDevice_has_driverSoftware "storageDevice_has_driverSoftware"_softwareVersion_softwareVers; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."storageDevice_has_driverSoftware"
    ADD CONSTRAINT """storageDevice_has_driverSoftware""_softwareVersion_softwareVers" FOREIGN KEY ("storageDevice_driverSoftwareID") REFERENCES public."softwareVersion"("softwareVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: storageDevice_has_driverSoftware "storageDevice_has_driverSoftware"_storageDevice_storageDeviceI; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."storageDevice_has_driverSoftware"
    ADD CONSTRAINT """storageDevice_has_driverSoftware""_storageDevice_storageDeviceI" FOREIGN KEY ("storageDevice_storageDeviceID") REFERENCES public."storageDevice"("storageDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: storageDevice_has_machineInterface "storageDevice_has_machineInterface"_storageDevice_storageDevic; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."storageDevice_has_machineInterface"
    ADD CONSTRAINT """storageDevice_has_machineInterface""_storageDevice_storageDevic" FOREIGN KEY ("storageDevice_storageDeviceID") REFERENCES public."storageDevice"("storageDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: systemRequirements_includes_pointerDeviceType "systemRequirements_include_pointerDeviceType"_pointerDevice_po; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."systemRequirements_includes_pointerDeviceType"
    ADD CONSTRAINT """systemRequirements_include_pointerDeviceType""_pointerDevice_po" FOREIGN KEY ("systemRequirements_pointerDeviceTypeID") REFERENCES public."pointerDevice"("pointerDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: systemRequirements_includes_pointerDeviceType "systemRequirements_include_pointerDeviceType"_systemRequiremen; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."systemRequirements_includes_pointerDeviceType"
    ADD CONSTRAINT """systemRequirements_include_pointerDeviceType""_systemRequiremen" FOREIGN KEY ("systemRequirements_systemRequirementsID") REFERENCES public."systemRequirements"("systemRequirementsID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: systemRequirements_includes_softwareVersion "systemRequirements_include_softwareVersion"_softwareVersion_so; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."systemRequirements_includes_softwareVersion"
    ADD CONSTRAINT """systemRequirements_include_softwareVersion""_softwareVersion_so" FOREIGN KEY ("systemRequirements_softwareVersionID") REFERENCES public."softwareVersion"("softwareVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: systemRequirements_includes_softwareVersion "systemRequirements_include_softwareVersion"_systemRequirements; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."systemRequirements_includes_softwareVersion"
    ADD CONSTRAINT """systemRequirements_include_softwareVersion""_systemRequirements" FOREIGN KEY ("systemRequirements_systemRequirementsID") REFERENCES public."systemRequirements"("systemRequirementsID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: systemRequirements_includes_audioDevice "systemRequirements_includes_audioDevice"_audioDevice_audioDevi; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."systemRequirements_includes_audioDevice"
    ADD CONSTRAINT """systemRequirements_includes_audioDevice""_audioDevice_audioDevi" FOREIGN KEY ("systemRequirements_audioDeviceID") REFERENCES public."audioDevice"("audioDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: systemRequirements_includes_audioDevice "systemRequirements_includes_audioDevice"_systemRequirements_sy; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."systemRequirements_includes_audioDevice"
    ADD CONSTRAINT """systemRequirements_includes_audioDevice""_systemRequirements_sy" FOREIGN KEY ("systemRequirements_systemRequirementsID") REFERENCES public."systemRequirements"("systemRequirementsID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: systemRequirements_includes_cpuArchitecture "systemRequirements_includes_cpuArchitecture"_cpuArchitecture_c; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."systemRequirements_includes_cpuArchitecture"
    ADD CONSTRAINT """systemRequirements_includes_cpuArchitecture""_cpuArchitecture_c" FOREIGN KEY ("systemRequirements_cpuArchitecture") REFERENCES public."cpuArchitecture"("cpuArchitectureQID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: systemRequirements_includes_cpuArchitecture "systemRequirements_includes_cpuArchitecture"_systemRequirement; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."systemRequirements_includes_cpuArchitecture"
    ADD CONSTRAINT """systemRequirements_includes_cpuArchitecture""_systemRequirement" FOREIGN KEY ("systemRequirements_systemRequirementsID") REFERENCES public."systemRequirements"("systemRequirementsID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: systemRequirements_includes_gpuDevice "systemRequirements_includes_gpuDevice"_gpuDevice_gpuDeviceID_f; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."systemRequirements_includes_gpuDevice"
    ADD CONSTRAINT """systemRequirements_includes_gpuDevice""_gpuDevice_gpuDeviceID_f" FOREIGN KEY ("systemRequirements_gpuDeviceID") REFERENCES public."gpuDevice"("gpuDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: systemRequirements_includes_machineType "systemRequirements_includes_machineType"_machineType_machineTy; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."systemRequirements_includes_machineType"
    ADD CONSTRAINT """systemRequirements_includes_machineType""_machineType_machineTy" FOREIGN KEY ("systemRequirements_machineTypeID") REFERENCES public."machineType"("machineTypeID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: systemRequirements_includes_machineType "systemRequirements_includes_machineType"_systemRequirements_sy; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."systemRequirements_includes_machineType"
    ADD CONSTRAINT """systemRequirements_includes_machineType""_systemRequirements_sy" FOREIGN KEY ("systemRequirements_systemRequirementsID") REFERENCES public."systemRequirements"("systemRequirementsID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: systemRequirements_includes_osVersion "systemRequirements_includes_osVersion"_osVersion_osVersionID_f; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."systemRequirements_includes_osVersion"
    ADD CONSTRAINT """systemRequirements_includes_osVersion""_osVersion_osVersionID_f" FOREIGN KEY ("systemRequirements_osVersionID") REFERENCES public."osVersion"("osVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: systemRequirements_includes_osVersion "systemRequirements_includes_osVersion"_systemRequirements_syst; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."systemRequirements_includes_osVersion"
    ADD CONSTRAINT """systemRequirements_includes_osVersion""_systemRequirements_syst" FOREIGN KEY ("systemRequirements_systemRequirementsID") REFERENCES public."systemRequirements"("systemRequirementsID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: computingEnvironment computingenvironment_configurednetwork_configurednetworkid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."computingEnvironment"
    ADD CONSTRAINT computingenvironment_configurednetwork_configurednetworkid_fk FOREIGN KEY ("computingEnvironment_configuredNetworkID") REFERENCES public."configuredNetwork"("configuredNetworkID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: computingEnvironment_has_event computingenvironment_has_event_computingenvironment_computingen; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."computingEnvironment_has_event"
    ADD CONSTRAINT computingenvironment_has_event_computingenvironment_computingen FOREIGN KEY ("computingEnvironment_computingEnvironmentID") REFERENCES public."computingEnvironment"("computingEnvironmentID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: computingEnvironment computingenvironment_softwareenvironment_softwareenvironmentid_; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."computingEnvironment"
    ADD CONSTRAINT computingenvironment_softwareenvironment_softwareenvironmentid_ FOREIGN KEY ("computingEnvironment_softwareEnvironmentID") REFERENCES public."softwareEnvironment"("softwareEnvironmentID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredGpuDevice_has_displayDevice configuredGpuDevice_has_displayDevice"___fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredGpuDevice_has_displayDevice"
    ADD CONSTRAINT "configuredGpuDevice_has_displayDevice""___fk" FOREIGN KEY ("configuredGpuDevice_displayDeviceID") REFERENCES public."displayDevice"("displayDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredGpuDevice_has_displayDevice configuredgpudevice_has_displaydevice_configuredgpudevice_confi; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredGpuDevice_has_displayDevice"
    ADD CONSTRAINT configuredgpudevice_has_displaydevice_configuredgpudevice_confi FOREIGN KEY ("configuredGpuDevice_gpuDeviceID") REFERENCES public."configuredGpuDevice"("configuredGpuDevice_gpuDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredMachine configuredmachine_cpuarchitecture_cpuarchitectureqid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredMachine"
    ADD CONSTRAINT configuredmachine_cpuarchitecture_cpuarchitectureqid_fk FOREIGN KEY ("configuredMachineArchitecture") REFERENCES public."cpuArchitecture"("cpuArchitectureQID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredMachine configuredmachine_machinetype_machinetypeid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredMachine"
    ADD CONSTRAINT configuredmachine_machinetype_machinetypeid_fk FOREIGN KEY ("configuredMachineType") REFERENCES public."machineType"("machineTypeID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredMachine configuredmachine_softwareversion_softwareversionid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredMachine"
    ADD CONSTRAINT configuredmachine_softwareversion_softwareversionid_fk FOREIGN KEY ("configuredMachine_emulatorSoftwareID") REFERENCES public."softwareVersion"("softwareVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredNetwork_has_configuredMachine configurednetwork_has_configuredmachine_configuredmachine_confi; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredNetwork_has_configuredMachine"
    ADD CONSTRAINT configurednetwork_has_configuredmachine_configuredmachine_confi FOREIGN KEY ("configuredNetwork_machineID") REFERENCES public."configuredMachine"("configuredMachineID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredNetwork_has_configuredMachine configurednetwork_has_configuredmachine_configurednetwork_confi; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredNetwork_has_configuredMachine"
    ADD CONSTRAINT configurednetwork_has_configuredmachine_configurednetwork_confi FOREIGN KEY ("configuredNetwork_configuredNetworkID") REFERENCES public."configuredNetwork"("configuredNetworkID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredNetworkMachine_expectedNetworkService configurednetworkmachine_expectednetworkservice_configurednetwo; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredNetworkMachine_expectedNetworkService"
    ADD CONSTRAINT configurednetworkmachine_expectednetworkservice_configurednetwo FOREIGN KEY ("configuredNetworkMachine_configuredMachineID") REFERENCES public."configuredNetwork_has_configuredMachine"("configuredNetwork_machineID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredNetworkMachine_providesNetworkService configurednetworkmachine_providesnetworkservice_configurednetwo; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredNetworkMachine_providesNetworkService"
    ADD CONSTRAINT configurednetworkmachine_providesnetworkservice_configurednetwo FOREIGN KEY ("configuredNetworkMachine_configuredNetworkID") REFERENCES public."configuredNetwork_has_configuredMachine"("configuredNetwork_configuredNetworkID");


--
-- Name: configuredNetworkMachine_providesNetworkService configurednetworkmachine_providesnetworkservice_networkservice_; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredNetworkMachine_providesNetworkService"
    ADD CONSTRAINT configurednetworkmachine_providesnetworkservice_networkservice_ FOREIGN KEY ("configuredNetworkMachine_providesNetworkServiceID") REFERENCES public."networkService"("networkServiceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredOS configuredos_colordepth_colordepthid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredOS"
    ADD CONSTRAINT configuredos_colordepth_colordepthid_fk FOREIGN KEY ("configuredColorDepth") REFERENCES public."colorDepth"("colorDepthID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredOS configuredos_displayresolution_displayresolutionid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredOS"
    ADD CONSTRAINT configuredos_displayresolution_displayresolutionid_fk FOREIGN KEY ("configuredDisplayResolution") REFERENCES public."displayResolution"("displayResolutionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredOS_has_formatOperation configuredos_has_formatoperation_configuredos_configuredoperati; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredOS_has_formatOperation"
    ADD CONSTRAINT configuredos_has_formatoperation_configuredos_configuredoperati FOREIGN KEY ("configuredOS_configuredOperatingSystemID") REFERENCES public."configuredOS"("configuredOperatingSystemID");


--
-- Name: configuredOS_has_formatOperation configuredos_has_formatoperation_configuredsoftware_configureds; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredOS_has_formatOperation"
    ADD CONSTRAINT configuredos_has_formatoperation_configuredsoftware_configureds FOREIGN KEY ("formatOperation_usesConfiguredSoftware") REFERENCES public."configuredSoftware"("configuredSoftwareVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredOS_has_formatOperation configuredos_has_formatoperation_fileformat_fileformatqid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredOS_has_formatOperation"
    ADD CONSTRAINT configuredos_has_formatoperation_fileformat_fileformatqid_fk FOREIGN KEY ("formatOperation_opensFileFormat") REFERENCES public."fileFormat"("fileFormatQID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredOS_has_userInformation configuredos_has_userinformation_configuredos_configuredoperati; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredOS_has_userInformation"
    ADD CONSTRAINT configuredos_has_userinformation_configuredos_configuredoperati FOREIGN KEY ("configuredOS_configuredOperatingSystemID") REFERENCES public."configuredOS"("configuredOperatingSystemID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredOS_has_userInformation configuredos_has_userinformation_userinformation_userinformatio; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredOS_has_userInformation"
    ADD CONSTRAINT configuredos_has_userinformation_userinformation_userinformatio FOREIGN KEY ("userInformation_userInformationID") REFERENCES public."userInformation"("userInformationID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredOS_language configuredos_language_configured_os_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredOS_language"
    ADD CONSTRAINT configuredos_language_configured_os_id_fk FOREIGN KEY ("configuredOS_configuredOperatingSystemID") REFERENCES public."configuredOS"("configuredOperatingSystemID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredOS configuredos_region_regionqid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredOS"
    ADD CONSTRAINT configuredos_region_regionqid_fk FOREIGN KEY ("configuredRegion") REFERENCES public.region("regionQID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredOS configuredos_softwareobject_softwareobjectid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredOS"
    ADD CONSTRAINT configuredos_softwareobject_softwareobjectid_fk FOREIGN KEY ("hasSource_softwareObjectID") REFERENCES public."softwareObject"("softwareObjectID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredOS configuredos_timezone_timezoneqid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredOS"
    ADD CONSTRAINT configuredos_timezone_timezoneqid_fk FOREIGN KEY ("configuredTimezone") REFERENCES public.timezone("timezoneQID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredSoftware configuredsoftware_digitalobject_digitalobjectid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredSoftware"
    ADD CONSTRAINT configuredsoftware_digitalobject_digitalobjectid_fk FOREIGN KEY ("hasSource_digitalObjectID") REFERENCES public."digitalObject"("digitalObjectID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredSoftware_has_userInformation configuredsoftware_has_userinformation_configuredsoftware_confi; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredSoftware_has_userInformation"
    ADD CONSTRAINT configuredsoftware_has_userinformation_configuredsoftware_confi FOREIGN KEY ("configuredSoftware_configuredSoftwareManifestationID") REFERENCES public."configuredSoftware"("configuredSoftwareVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredSoftware_has_userInformation configuredsoftware_has_userinformation_userinformation_userinfo; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredSoftware_has_userInformation"
    ADD CONSTRAINT configuredsoftware_has_userinformation_userinformation_userinfo FOREIGN KEY ("userInformation_userInformationID") REFERENCES public."userInformation"("userInformationID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredSoftware configuredsoftware_softwareobject_softwareobjectid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredSoftware"
    ADD CONSTRAINT configuredsoftware_softwareobject_softwareobjectid_fk FOREIGN KEY ("hasSource_softwareObjectID") REFERENCES public."softwareObject"("softwareObjectID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredSoftware configuredsoftware_softwareversion_softwareversionid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredSoftware"
    ADD CONSTRAINT configuredsoftware_softwareversion_softwareversionid_fk FOREIGN KEY ("configuredSoftwareVersionID") REFERENCES public."softwareVersion"("softwareVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredSoftware_uses_formatImplementation configuredsoftware_uses_formatimplementation_configuredsoftware; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredSoftware_uses_formatImplementation"
    ADD CONSTRAINT configuredsoftware_uses_formatimplementation_configuredsoftware FOREIGN KEY ("configuredSoftware_configuredSoftwareManifestationID") REFERENCES public."configuredSoftware"("configuredSoftwareVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredSoftware_uses_formatImplementation configuredsoftware_uses_formatimplementation_formatimplementati; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredSoftware_uses_formatImplementation"
    ADD CONSTRAINT configuredsoftware_uses_formatimplementation_formatimplementati FOREIGN KEY ("configuredSoftware_formatImplementation") REFERENCES public."formatImplementation"("formatImplementationID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: configuredSoftware_uses_formatImplementation configuredsoftware_uses_formatimplementation_formatoperation_op; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."configuredSoftware_uses_formatImplementation"
    ADD CONSTRAINT configuredsoftware_uses_formatimplementation_formatoperation_op FOREIGN KEY ("configuredFormatOperation") REFERENCES public."formatOperation"("operationID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: digitalObject_has_objectFile digitalobject_has_objectfile_digitalobject_digitalobjectid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."digitalObject_has_objectFile"
    ADD CONSTRAINT digitalobject_has_objectfile_digitalobject_digitalobjectid_fk FOREIGN KEY ("digitalObject_digitalObjectID") REFERENCES public."digitalObject"("digitalObjectID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: digitalObject_has_objectFile digitalobject_has_objectfile_file_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."digitalObject_has_objectFile"
    ADD CONSTRAINT digitalobject_has_objectfile_file_id_fk FOREIGN KEY ("digitalObjectFileID") REFERENCES public.file("fileID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: digitalObject_has_objectFile digitalobject_has_objectfile_mountformat_mountformatqid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."digitalObject_has_objectFile"
    ADD CONSTRAINT digitalobject_has_objectfile_mountformat_mountformatqid_fk FOREIGN KEY ("digitalObjectFile_usesMountFormat") REFERENCES public."mountFormat"("mountFormatQID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: digitalObjectFile_has_objectFileOperation digitalobjectfile_has_objectfileoperation_digitalobject_has_obj; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."digitalObjectFile_has_objectFileOperation"
    ADD CONSTRAINT digitalobjectfile_has_objectfileoperation_digitalobject_has_obj FOREIGN KEY ("digitalObjectFile_fileID") REFERENCES public."digitalObject_has_objectFile"("digitalObjectFileID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: digitalObjectFile_has_objectFileOperation digitalobjectfile_has_objectfileoperation_objectfileoperation_o; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."digitalObjectFile_has_objectFileOperation"
    ADD CONSTRAINT digitalobjectfile_has_objectfileoperation_objectfileoperation_o FOREIGN KEY ("digitalObjectFile_operationID") REFERENCES public."objectFileOperation"("operationID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: displayDevice_has_colorDepth displaydevice_has_colordepth_displaydevice_displaydeviceid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."displayDevice_has_colorDepth"
    ADD CONSTRAINT displaydevice_has_colordepth_displaydevice_displaydeviceid_fk FOREIGN KEY ("displayDevice_displayDeviceID") REFERENCES public."displayDevice"("displayDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: file file_fileformat_fileformatqid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public.file
    ADD CONSTRAINT file_fileformat_fileformatqid_fk FOREIGN KEY ("fileFormat") REFERENCES public."fileFormat"("fileFormatQID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: fileFormat_has_fileExtension fileformat_has_fileextension_fileextension_fileextensionid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."fileFormat_has_fileExtension"
    ADD CONSTRAINT fileformat_has_fileextension_fileextension_fileextensionid_fk FOREIGN KEY ("fileExtension_fileExtensionID") REFERENCES public."fileExtension"("fileExtensionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: fileFormat_has_fileExtension fileformat_has_fileextension_fileformat_fileformatqid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."fileFormat_has_fileExtension"
    ADD CONSTRAINT fileformat_has_fileextension_fileformat_fileformatqid_fk FOREIGN KEY ("fileFormat_fileFormatQID") REFERENCES public."fileFormat"("fileFormatQID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: formatImplementation formatimplementation_fileextension_fileextensionid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."formatImplementation"
    ADD CONSTRAINT formatimplementation_fileextension_fileextensionid_fk FOREIGN KEY ("implementationExtension") REFERENCES public."fileExtension"("fileExtensionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: gpuDevice_hasEquivalent gpudevice_hasequivalent_gpudevice_2__fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."gpuDevice_hasEquivalent"
    ADD CONSTRAINT gpudevice_hasequivalent_gpudevice_2__fk FOREIGN KEY ("gpuDevice_gpuDeviceID") REFERENCES public."gpuDevice"("gpuDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: keyboardDevice keyboarddevice_keyboardlayout_keyboardlayoutqid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."keyboardDevice"
    ADD CONSTRAINT keyboarddevice_keyboardlayout_keyboardlayoutqid_fk FOREIGN KEY ("keyboardDevice_keyboardLayout") REFERENCES public."keyboardLayout"("keyboardLayoutQID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: networkDevice_has_driverSoftware networkdevice_has_driversoftware_networkdevice_networkdeviceid_; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."networkDevice_has_driverSoftware"
    ADD CONSTRAINT networkdevice_has_driversoftware_networkdevice_networkdeviceid_ FOREIGN KEY ("networkDevice_networkDeviceID") REFERENCES public."networkDevice"("networkDeviceID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: networkDevice_has_driverSoftware networkdevice_has_driversoftware_softwareversion_softwareversio; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."networkDevice_has_driverSoftware"
    ADD CONSTRAINT networkdevice_has_driversoftware_softwareversion_softwareversio FOREIGN KEY ("driverSoftware_driverSoftware") REFERENCES public."softwareVersion"("softwareVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: objectEnvironment objectenvironment_computingenvironment_computingenvironmentid_f; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."objectEnvironment"
    ADD CONSTRAINT objectenvironment_computingenvironment_computingenvironmentid_f FOREIGN KEY ("objectEnvironment_objectEnvironment_computingEnvironmentID") REFERENCES public."computingEnvironment"("computingEnvironmentID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: objectEnvironment objectenvironment_digitalobject_digitalobjectid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."objectEnvironment"
    ADD CONSTRAINT objectenvironment_digitalobject_digitalobjectid_fk FOREIGN KEY ("objectEnvironment_objectEnvironment_digitalObjectID") REFERENCES public."digitalObject"("digitalObjectID");


--
-- Name: objectEnvironment_has_event objectenvironment_has_event_objectenvironment_objectenvironment; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."objectEnvironment_has_event"
    ADD CONSTRAINT objectenvironment_has_event_objectenvironment_objectenvironment FOREIGN KEY ("objectEnvironment_objectEnvironment_computingEnvironmentID") REFERENCES public."objectEnvironment"("objectEnvironment_objectEnvironment_computingEnvironmentID");


--
-- Name: osVersion_languageSettings os_version_language_setting_os_version_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion_languageSettings"
    ADD CONSTRAINT os_version_language_setting_os_version_id_fk FOREIGN KEY ("osVersion_osVersionID") REFERENCES public."osVersion"("osVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: osVersion_has_alternateID osversion_has_alternateid_osversion_osversionid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion_has_alternateID"
    ADD CONSTRAINT osversion_has_alternateid_osversion_osversionid_fk FOREIGN KEY ("osVersion_osVersionID") REFERENCES public."osVersion"("osVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: osVersion_has_softwareLicense osversion_has_softwarelicense_softwarelicense_softwarelicenseqi; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion_has_softwareLicense"
    ADD CONSTRAINT osversion_has_softwarelicense_softwarelicense_softwarelicenseqi FOREIGN KEY ("osVersion_softwareLicenseQID") REFERENCES public."softwareLicense"("softwareLicenseQID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: osVersion_includes_softwareVersion osversion_includes_softwareversion_osversion_osversionid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion_includes_softwareVersion"
    ADD CONSTRAINT osversion_includes_softwareversion_osversion_osversionid_fk FOREIGN KEY ("osVersion_osVersionID") REFERENCES public."osVersion"("osVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: osVersion_includes_softwareVersion osversion_includes_softwareversion_softwareversion_softwarevers; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion_includes_softwareVersion"
    ADD CONSTRAINT osversion_includes_softwareversion_softwareversion_softwarevers FOREIGN KEY ("osVersion_softwareVersionID") REFERENCES public."softwareVersion"("softwareVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: osVersion_isCompatibleWith_configuredMachine osversion_iscompatiblewith_configuredmachine_configured_machine; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion_isCompatibleWith_configuredMachine"
    ADD CONSTRAINT osversion_iscompatiblewith_configuredmachine_configured_machine FOREIGN KEY ("compatibleMachineID") REFERENCES public."configuredMachine"("configuredMachineID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: osVersion_isCompatibleWith_configuredMachine osversion_iscompatiblewith_configuredmachine_osversion_osversio; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion_isCompatibleWith_configuredMachine"
    ADD CONSTRAINT osversion_iscompatiblewith_configuredmachine_osversion_osversio FOREIGN KEY ("osVersion_osVersionID") REFERENCES public."osVersion"("osVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: osVersion_keyboardLanguageSettings osversion_keyboardlanguagesettings_osversion_osversionid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion_keyboardLanguageSettings"
    ADD CONSTRAINT osversion_keyboardlanguagesettings_osversion_osversionid_fk FOREIGN KEY ("osVersion_osVersionID") REFERENCES public."osVersion"("osVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: osVersion_keyboardSetting osversion_keyboardsetting_keyboardlayout_keyboardlayoutqid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion_keyboardSetting"
    ADD CONSTRAINT osversion_keyboardsetting_keyboardlayout_keyboardlayoutqid_fk FOREIGN KEY ("osVersion_keyboardSettingLayout") REFERENCES public."keyboardLayout"("keyboardLayoutQID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: osVersion_keyboardSetting osversion_keyboardsetting_osversion_osversionid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion_keyboardSetting"
    ADD CONSTRAINT osversion_keyboardsetting_osversion_osversionid_fk FOREIGN KEY ("osVersion_osVersionID") REFERENCES public."osVersion"("osVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: osVersion_regionSettings osversion_regionsettings_region_regionqid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."osVersion_regionSettings"
    ADD CONSTRAINT osversion_regionsettings_region_regionqid_fk FOREIGN KEY ("osVersion_regionQID") REFERENCES public.region("regionQID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareProduct_has_alternateName software_product_alternate_name_software_product_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareProduct_has_alternateName"
    ADD CONSTRAINT software_product_alternate_name_software_product_id_fk FOREIGN KEY ("softwareProduct_softwareProductID") REFERENCES public."softwareProduct"("softwareProductID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareVersion software_version_software_product_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareVersion"
    ADD CONSTRAINT software_version_software_product_id_fk FOREIGN KEY ("softwareVersionSystemRequirements") REFERENCES public."softwareProduct"("softwareProductID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareEnvironment softwareenvironment_configuredos_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareEnvironment"
    ADD CONSTRAINT softwareenvironment_configuredos_id_fk FOREIGN KEY ("softwareEnvironment_hasPart_configuredOS") REFERENCES public."configuredOS"("configuredOperatingSystemID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareEnvironment_has_diskImage softwareenvironment_has_diskimage_filesystem_filesystemqid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareEnvironment_has_diskImage"
    ADD CONSTRAINT softwareenvironment_has_diskimage_filesystem_filesystemqid_fk FOREIGN KEY ("fileSystem") REFERENCES public."fileSystem"("fileSystemQID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareEnvironment_has_diskImage softwareenvironment_has_diskimage_softwareenvironment_softwaree; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareEnvironment_has_diskImage"
    ADD CONSTRAINT softwareenvironment_has_diskimage_softwareenvironment_softwaree FOREIGN KEY ("softwareEnvironment_softwareEnvironmentID") REFERENCES public."softwareEnvironment"("softwareEnvironmentID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareEnvironment_hasPart_configuredSoftware softwareenvironment_haspart_configuredsoftware_configuredsoftwa; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareEnvironment_hasPart_configuredSoftware"
    ADD CONSTRAINT softwareenvironment_haspart_configuredsoftware_configuredsoftwa FOREIGN KEY ("hasConfiguredSoftware") REFERENCES public."configuredSoftware"("configuredSoftwareVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareEnvironment softwareenvironment_softwareenvironment_softwareenvironmentid_f; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareEnvironment"
    ADD CONSTRAINT softwareenvironment_softwareenvironment_softwareenvironmentid_f FOREIGN KEY ("derivedFrom_softwareEnvironment") REFERENCES public."softwareEnvironment"("softwareEnvironmentID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareFamily_hasPart_softwareProduct softwarefamily_haspart_softwareproduct_2___fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareFamily_hasPart_softwareProduct"
    ADD CONSTRAINT softwarefamily_haspart_softwareproduct_2___fk FOREIGN KEY (haspart_softwareproduct) REFERENCES public."softwareProduct"("softwareProductID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareFamily_hasPart_softwareProduct softwarefamily_haspart_softwareproduct_softwareproduct_software; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareFamily_hasPart_softwareProduct"
    ADD CONSTRAINT softwarefamily_haspart_softwareproduct_softwareproduct_software FOREIGN KEY (softwarefamilyid) REFERENCES public."softwareProduct"("softwareProductID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareObject_has_alternateID softwareobject_has_alternateid_softwareobject_softwareobjectid_; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareObject_has_alternateID"
    ADD CONSTRAINT softwareobject_has_alternateid_softwareobject_softwareobjectid_ FOREIGN KEY ("softwareObject_softwareObjectID") REFERENCES public."softwareObject"("softwareObjectID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareObject_has_event softwareobject_has_event_softwareobject_softwareobjectid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareObject_has_event"
    ADD CONSTRAINT softwareobject_has_event_softwareobject_softwareobjectid_fk FOREIGN KEY ("softwareObject_softwareObjectID") REFERENCES public."softwareObject"("softwareObjectID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareObject_has_objectFile softwareobject_hasobjectfile_file_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareObject_has_objectFile"
    ADD CONSTRAINT softwareobject_hasobjectfile_file_id_fk FOREIGN KEY ("softwareObjectFileID") REFERENCES public.file("fileID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareObject_has_objectFile softwareobject_hasobjectfile_mountformat_mountformatqid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareObject_has_objectFile"
    ADD CONSTRAINT softwareobject_hasobjectfile_mountformat_mountformatqid_fk FOREIGN KEY ("softwareObjectFile_usesMountFormat") REFERENCES public."mountFormat"("mountFormatQID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareObject_has_objectFile softwareobject_hasobjectfile_softwareobject_softwareobjectid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareObject_has_objectFile"
    ADD CONSTRAINT softwareobject_hasobjectfile_softwareobject_softwareobjectid_fk FOREIGN KEY ("softwareObject_softwareObjectID") REFERENCES public."softwareObject"("softwareObjectID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareObject_isManifestationOf_softwareVersion softwareobject_ismanifestationof_softwareversion_softwareobject; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareObject_isManifestationOf_softwareVersion"
    ADD CONSTRAINT softwareobject_ismanifestationof_softwareversion_softwareobject FOREIGN KEY ("softwareObject_softwareObjectID") REFERENCES public."softwareObject"("softwareObjectID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareObject_isManifestationOf_softwareVersion softwareobject_ismanifestationof_softwareversion_softwareversio; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareObject_isManifestationOf_softwareVersion"
    ADD CONSTRAINT softwareobject_ismanifestationof_softwareversion_softwareversio FOREIGN KEY ("softwareObject_softwareVersionID") REFERENCES public."softwareVersion"("softwareVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareObjectFile_has_objectFileOperation softwareobjectfile_has_objectfileoperation_softwareobject_hasob; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareObjectFile_has_objectFileOperation"
    ADD CONSTRAINT softwareobjectfile_has_objectfileoperation_softwareobject_hasob FOREIGN KEY ("softwareObjectFile_softwareObjectID") REFERENCES public."softwareObject_has_objectFile"("softwareObjectFileID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareProduct_has_alternateName softwareproduct_has_alternatename_alternatename_alternatenameid; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareProduct_has_alternateName"
    ADD CONSTRAINT softwareproduct_has_alternatename_alternatename_alternatenameid FOREIGN KEY ("softwareProduct_alternateNameID") REFERENCES public."alternateName"("alternateNameID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareProduct_has_softwareType softwareproduct_has_softwaretype_softwareproduct_softwareproduc; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareProduct_has_softwareType"
    ADD CONSTRAINT softwareproduct_has_softwaretype_softwareproduct_softwareproduc FOREIGN KEY ("softwareProduct_softwareProductID") REFERENCES public."softwareProduct"("softwareProductID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareProduct_has_softwareType softwareproduct_has_softwaretype_softwaretype_softwaretypeqid_f; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareProduct_has_softwareType"
    ADD CONSTRAINT softwareproduct_has_softwaretype_softwaretype_softwaretypeqid_f FOREIGN KEY ("softwareProduct_softwareTypeQID") REFERENCES public."softwareType"("softwareTypeQID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareVersion_has_formatImplementation softwareversion_has_formatimplementation_formatimplementation_f; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareVersion_has_formatImplementation"
    ADD CONSTRAINT softwareversion_has_formatimplementation_formatimplementation_f FOREIGN KEY ("softwareVersion_formatImplementationID") REFERENCES public."formatImplementation"("formatImplementationID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareVersion_has_formatImplementation softwareversion_has_formatimplementation_softwareversion_softwa; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareVersion_has_formatImplementation"
    ADD CONSTRAINT softwareversion_has_formatimplementation_softwareversion_softwa FOREIGN KEY ("softwareVersion_softwareVersionID") REFERENCES public."softwareVersion"("softwareVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareVersion_has_programmingLanguage softwareversion_has_programminglanguage_programminglanguage_pro; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareVersion_has_programmingLanguage"
    ADD CONSTRAINT softwareversion_has_programminglanguage_programminglanguage_pro FOREIGN KEY ("softwareVersion_programmingLanguageQID") REFERENCES public."programmingLanguage"("programmingLanguageQID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareFamilyVersion_hasPart_softwareVersion softwareversion_haspart_softwarefamilyversion_2___fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareFamilyVersion_hasPart_softwareVersion"
    ADD CONSTRAINT softwareversion_haspart_softwarefamilyversion_2___fk FOREIGN KEY ("hasPart_softwareVersion") REFERENCES public."softwareVersion"("softwareVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: softwareFamilyVersion_hasPart_softwareVersion softwareversion_haspart_softwarefamilyversion_softwareversion_s; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."softwareFamilyVersion_hasPart_softwareVersion"
    ADD CONSTRAINT softwareversion_haspart_softwarefamilyversion_softwareversion_s FOREIGN KEY ("softwareFamilyVersionID") REFERENCES public."softwareVersion"("softwareVersionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: storageDevice storagedevice_readwritestatus_readwritestatusid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."storageDevice"
    ADD CONSTRAINT storagedevice_readwritestatus_readwritestatusid_fk FOREIGN KEY ("storageDevice_readWriteStatusID") REFERENCES public."readWriteStatus"("readWriteStatusID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: storageDevice storagedevice_storagedevicetype_storagedevicetypeid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."storageDevice"
    ADD CONSTRAINT storagedevice_storagedevicetype_storagedevicetypeid_fk FOREIGN KEY ("storageDeviceType") REFERENCES public."storageDeviceType"("storageDeviceTypeID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: systemRequirements systemrequirements_colordepth_colordepthid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."systemRequirements"
    ADD CONSTRAINT systemrequirements_colordepth_colordepthid_fk FOREIGN KEY ("minimumColorDepth") REFERENCES public."colorDepth"("colorDepthID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: systemRequirements systemrequirements_displayresolution_displayresolutionid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."systemRequirements"
    ADD CONSTRAINT systemrequirements_displayresolution_displayresolutionid_fk FOREIGN KEY ("minimumDisplayResolution") REFERENCES public."displayResolution"("displayResolutionID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: systemRequirements_includes_storageDeviceType systemrequirements_includes_storagedevicetype_storagedevicetype; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."systemRequirements_includes_storageDeviceType"
    ADD CONSTRAINT systemrequirements_includes_storagedevicetype_storagedevicetype FOREIGN KEY ("systemRequirements_storageDeviceTypeID") REFERENCES public."storageDeviceType"("storageDeviceTypeID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: systemRequirements_includes_storageDeviceType systemrequirements_includes_storagedevicetype_systemrequirement; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."systemRequirements_includes_storageDeviceType"
    ADD CONSTRAINT systemrequirements_includes_storagedevicetype_systemrequirement FOREIGN KEY ("systemRequirements_systemRequirementsID") REFERENCES public."systemRequirements"("systemRequirementsID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: timezone_has_timezoneName timezone_has_timezonename_timezone_timezoneqid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."timezone_has_timezoneName"
    ADD CONSTRAINT timezone_has_timezonename_timezone_timezoneqid_fk FOREIGN KEY ("timezone_timezoneQID") REFERENCES public.timezone("timezoneQID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: timezone_has_timezoneName timezone_has_timezonename_timezonename_timezonenameid_fk; Type: FK CONSTRAINT; Schema: public; Owner: eaasi_dev
--

ALTER TABLE ONLY public."timezone_has_timezoneName"
    ADD CONSTRAINT timezone_has_timezonename_timezonename_timezonenameid_fk FOREIGN KEY ("timezoneName_timezoneNameID") REFERENCES public."timezoneName"("timezoneNameID") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


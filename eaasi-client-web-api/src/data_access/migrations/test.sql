CREATE TABLE IF NOT EXISTS "configuredNetworkMachine_expectedNetworkService"
(
"configuredNetworkMachine_configuredNetworkID" INTEGER,
"servicePortExpected" VARCHAR(255),
"configuredNetworkMachine_expectedNetworkServiceID" INTEGER REFERENCES "networkService" ("networkServiceID"),
"configuredNetworkMachine_configuredMachineID" INTEGER REFERENCES "configuredNetwork_has_configuredMachine" ("configuredNetwork_machineID"));

CREATE TABLE IF NOT EXISTS "configuredNetworkMachine_expectedNetworkService"
(
    "configuredNetworkMachine_expectedNetworkServiceID" integer
    "servicePortExpected"                               varchar(255)

    "configuredNetworkMachine_configuredNetworkID"      integer,
    "configuredNetworkMachine_configuredMachineID"      integer

        constraint configurednetworkmachine_expectednetworkservice_configurednetwo
            references "configuredNetwork_has_configuredMachine" ("configuredNetwork_machineID")
            on update cascade on delete cascade,

        constraint """configuredNetworkMachine_expectedNetworkService""_networkServic"
            references "networkService"
            on update cascade on delete cascade,
);
# Project Variables
PROJECT_NAME ?= eaasi_web
ORG_NAME ?= eaasi
REPO_NAME ?= eaasi_client_dev

# Filenames
DEV_COMPOSE_FILE := ./docker-compose.yml

# Docker Compose Project Names
RELEASE_PROJECT := $(PROJECT_NAME)$(BUILD_ID)
DEV_PROJECT := $(RELEASE_PROJECT)_dev

.PHONY: test build clean run

test:
	echo "running test stage"

build:
	echo "running build stage"

echo:
	echo "running release stage"

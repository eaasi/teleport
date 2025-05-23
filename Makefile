# Project Variables
PROJECT_NAME ?= eaasi_web
ORG_NAME ?= eaasi
REPO_NAME ?= eaasi_client_dev

# Filenames
DEV_COMPOSE_FILE := ./docker-compose.yml

# Docker Compose Project Names
RELEASE_PROJECT := $(PROJECT_NAME)$(BUILD_ID)
DEV_PROJECT := $(RELEASE_PROJECT)_dev

.PHONY: test clean-build-run build-run build clean run clean sonar

clean-build-run:
	echo "running clean-build-run stage"
	sudo docker-compose down -v
	sudo docker-compose build
	sudo docker-compose up

build-run:
	echo "running build-run stage"
	sudo docker-compose down
	sudo docker-compose build
	sudo docker-compose up

test:
	echo "running test stage"

build:
	sudo docker-compose build --no-cache

sonar:
	cd eaasi-web-api && npm run test:unit:coverage \
	&& cd ../eaasi-front-end \
	&& npm run test:unit \
	&& cd .. \
	&& sonar-scanner -Dsonar.projectBaseDir=./eaasi-front-end \
	&& sonar-scanner -Dsonar.projectBaseDir=./eaasi-web-api

echo:
	echo "running release stage"

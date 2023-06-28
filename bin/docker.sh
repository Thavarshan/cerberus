#!/bin/sh
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create ignite ||

# Build prod using new BuildKit engine
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml build &&

# Start prod in detached mode
docker-compose -f docker-compose.yml up -d

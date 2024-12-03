.PHONY: start stop restart prune

start:
	DOCKER_BUILDKIT=1 docker-compose up --build -d --remove-orphans

stop:
	docker-compose down

restart:
	docker-compose down
	DOCKER_BUILDKIT=1 docker-compose build
	docker-compose up -d

build-deployment:
	DOCKER_BUILDKIT=1 docker compose -f ./production/docker-compose.production.builder.yml up --build

test-deployment:
	DOCKER_BUILDKIT=1 docker compose -f ./production/docker-compose.production.yml up --build

push-deployment:
	DOCKER_BUILDKIT=1 docker compose -f ./production/docker-compose.production.builder.yml build
	docker push asheshadri2005/wrapped:backend
	docker push asheshadri2005/wrapped:frontend
	docker push asheshadri2005/wrapped:nginx

prune:
	docker system prune

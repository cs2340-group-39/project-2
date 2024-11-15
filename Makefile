.PHONY: start stop restart prune

start:
	docker-compose up --build -d --remove-orphans

stop:
	docker-compose down

restart:
	docker-compose down
	docker-compose build
	docker-compose up -d

prune:
	docker system prune

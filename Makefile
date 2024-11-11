.PHONY: start stop restart cleanup

start:
	docker-compose up --build -d

stop:
	docker-compose down

restart:
	docker-compose down
	docker-compose build
	docker-compose up -d

cleanup:
	docker system prune
.PHONY: start stop restart cleanup

start:
	docker-compose up --build -d

stop:
	docker-compose down -v

restart:
	docker-compose down -v
	docker-compose build
	docker-compose up -d

cleanup:
	docker system prune
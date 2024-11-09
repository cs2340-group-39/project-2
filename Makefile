.PHONY: setup reset

setup:
	docker-compose up

teardown:
	docker-compose down

reset:
	docker-compose down
	docker-compose build
	docker-compose up

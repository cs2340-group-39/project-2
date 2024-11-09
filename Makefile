.PHONY: setup teardown reset cleanup

setup:
	docker-compose up

teardown:
	docker-compose down

reset:
	docker-compose down
	docker-compose build
	docker-compose up

cleanup:
	docker system prune
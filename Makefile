.PHONY: start stop restart cleanup django-createsuperuser django-makemigrations django-migrate deploy-latest

start:
	docker-compose up --build -d --remove-orphans

stop:
	docker-compose down

restart:
	docker-compose down
	docker-compose build
	docker-compose up -d

cleanup:
	docker system prune

django-createsuperuser:
	docker-compose run backend python /usr/src/app/manage.py createsuperuser

django-makemigrations:
	docker-compose run backend python /usr/src/app/manage.py makemigrations

django-migrate:
	docker-compose run backend python /usr/src/app/manage.py migrate

deploy-latest:
	echo "Not Implemented"
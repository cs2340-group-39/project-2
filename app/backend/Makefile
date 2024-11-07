.PHONY: all run-development-host run-server

all: run-development-host run-server

run-development-host:
	ssh -R backend-project-2-cs2340-group-39:80:localhost:8000 serveo.net

run-server:
	python3 manage.py runserver

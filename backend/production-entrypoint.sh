#!/bin/bash
set -e

echo "DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO postgres; GRANT ALL ON SCHEMA public TO public;" | python3 manage.py dbshell
python3 ./manage.py migrate
exec gunicorn --bind 0.0.0.0:8000 project.wsgi

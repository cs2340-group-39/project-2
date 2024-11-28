FROM python:3.12.7-slim

ENV PYTHONUNBUFFERED=1
WORKDIR /usr/src/app

RUN apt-get update
RUN apt-get install -y postgresql-client

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

EXPOSE 8000

CMD [ "python3", "manage.py", "runserver", "0.0.0.0:8000" ]

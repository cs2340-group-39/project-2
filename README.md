To run this project, make sure you have Docker Desktop installed. If you are using Linux, make sure you have `docker-compose` installed as well.
For simplicity, commands required to run the project are in the Makefile.
If you do not have GNU make installed on your computer, you can simply run the commands under each section of the Makefile.
To start the project, you can simply run `make start`. Docker will create 5 images and they will be visible from the Docker Desktop App.
Under the "Containers" section in Docker Desktop, there should be a running container called `wrapped`. Once you click on `wrapped`, Docker Desktop will show you all the containers running under this alias.

- `wrapped_frontend` is running React Native
- `wrapped_backend` is running Django
- `wrapped_database` is running the Postgres database used by Django
- `wrapped_nginx` is running the Nginx reverse proxy

  For each of these containers, there is a section called "Logs" where you can see the logs that the container is outputting. For `wrapped_frontend`, you can find the QR Code for Expo Go under this section. For `wrapped_backend`, you can see Django Logs here. There is another section called "Exec" where you can run commands for the respective container. To run one off commands in the docker container, you can follow this template: `docker-compose run <Container Name ('backend' or 'frontend')> <Command (For Example: 'python /usr/src/app/manage.py migrate')>`

  Once all the containers are running, you can find the app in your browser by simply typing `http://localhost/`. No port is required. `http://localhost/` will be forwarding `wrapped_frontend`, while `http://localhost/app/` will be forwarding `wrapped_backend`. Django Admin can be found on `http://localhost/admin/`. The `azure` branch of this repository has been deployed using Azure App Services, and can be publicly accessed at `wrapped.azurewebsites.net`. Please note that only the frontend is publicly accessible at this URL. You cannot access the admin panel here. (TODO: enable this functionality?)

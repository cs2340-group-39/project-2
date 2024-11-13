To run this project, make sure you have Docker Desktop installed. If you are using Linux, make sure you have `docker-compose` installed as well.
For simplicity, commands required to run the project are in the Makefile.
If you do not have GNU make installed on your computer, you can simply run the commands under each section of the Makefile.
To start the project, you can simply run `make start`. Docker will create 5 images and they will be visible from the Docker Desktop App.
Under the "Containers" section in Docker Desktop, there should be a running container called `wrapped`. Once you click on `wrapped`, Docker Desktop will show you all the containers running under this alias.

- `wrapped_frontend` is running React Native
- `wrapped_backend` is running Django
- `wrapped_database` is running the Postgres database used by Django
- `wrapped_nginx` is running the Nginx reverse proxy

  For each of these containers, there is a section called "Logs" where you can see the logs that the container is outputting. For `wrapped_frontend`, you can find the QR Code for Expo Go under this section. For `wrapped_backend`, you can see Django Logs here. There is another section called "Exec" where you can run commands for the respective container. For example, run Django migration commands here (Maybe?).
  If you want to code in a consistent development environment, you can use VSCode's "Remote Development" extension and attach to the respective container you want to work in. To do this:

- Find the button that has a symbol that looks like "><" in the bottom left corner of your VSCode window
- Select "Attach to Running Container" from the dropdown menu
- Click on the container you want to work in
- Navigate to the folder that contains the source code by typing in the search bar `/usr/src/app`

  Docker is configured to save your changes within the container to your local machine as well (Hopefully, Please make sure it is doing this)
  Once all the containers are running, you can find the app in your browser by simply typing `http://app.localhost`. No port is required. `http://localhost/` will be forwarding `wrapped_frontend`, while `http://localhost/app/` will be forwarding `wrapped_backend`.

Note that this app is still not hosted, and there is no public URL yet. I am working on this at the moment.

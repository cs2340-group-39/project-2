Welcome to CSGroup 39's Project 2: The Spotify Wrap project!

To get started, follow the instructions below to run the project:

1. Make sure you have Docker installed and Docker Desktop (recommended)
2. Open a terminal in the project2 folder, then run the command: "docker build -t cs2340-project-2-image ./"
3. If you are on Windows, run "./run.bat", and if you are on Mac or Linux, run "./run.sh"

Once your Docker container is set up, install the "Remote Development" extension on VSCode. Once this extension is installed, a button that contains a symbol similar to "><" should appear in the bottom left corner of your window. Click this button, and in the dropdown select "Attach to Running Container", and select `cs2340-project-2`. Once your VSCode instance is attached to the Docker container, navigate to the `app` directory within VSCode.

(Tentative)
Once you are in the `app` directory, you can run `make setup` to build the project. Once the command finishes, run `make run` to run the project.

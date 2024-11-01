@echo OFF
docker run --rm -it --network=host --name="cs2340-project-2" -v "%CD%\app":/app -w="/app" cs2340-project-2-image
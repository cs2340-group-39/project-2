@echo OFF
docker run --rm -it --cpus 4 --cap-add=SYS_PTRACE --security-opt seccomp=unconfined --name="cs2340-project-2" -v "%CD%\app":/app -w="/app" cs2340project2image
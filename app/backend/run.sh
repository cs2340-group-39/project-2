#!/bin/bash

temp_file=$(mktemp)
ssh -p 443 -R0:localhost:8000 a.pinggy.io -T >"$temp_file" 2>&1 &

ssh_pid=$!

while true; do
  if grep -q "http://" "$temp_file"; then
    export BACKEND_HOST="$(grep "http://" "$temp_file" | cut -d'/' -f3)"
    echo "=== BACKEND_HOST: $BACKEND_HOST ==="
    break
  fi
  sleep 1
done

rm "$temp_file"

echo "=== Starting Django Server ==="
python3 manage.py runserver || kill $ssh_pid

kill $ssh_pid

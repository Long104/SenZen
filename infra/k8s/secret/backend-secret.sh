#!/bin/bash
kubectl create secret generic backend-secret \
  --from-literal=GOOGLE_CLIENT_ID=<password> \
  --from-literal=GOOGLE_CLIENT_SECRET=<password> \
  --from-literal=GITHUB_CLIENT_ID=<password> \
  --from-literal=GITHUB_CLIENT_SECRET=<password> \
  --from-literal=jwtSecretKey=<password> \
  --from-literal=DB_HOST=postgres-service \
  --from-literal=DB_USER=myuser \
  --from-literal=DB_PASSWORD=mypassword \
  --from-literal=DB_NAME=mydatabase \
  --from-literal=DB_PORT=5432 \
  --from-literal=FRONTEND_URL=http://localhost:3000 \
  -n default

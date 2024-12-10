#!/bin/bash
kubectl create secret generic fe-secret --from-literal=BASE_URL=http://localhost:30001


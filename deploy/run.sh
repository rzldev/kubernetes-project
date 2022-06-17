docker build \
-t rzldevdoc/multi-client:latest -t rzldevdoc/multi-client:$CLIENT_VERSION \
-f ./client/Dockerfile ./client
docker build \
-t rzldevdoc/multi-api:latest -t rzldevdoc/multi-api:$API_VERSION \
-f ./server/Dockerfile ./server
docker build \
-t rzldevdoc/multi-worker:latest -t rzldevdoc/multi-worker:$WORKER_VERSION \
-f ./worker/Dockerfile ./worker

docker push rzldevdoc/multi-client:latest
docker push rzldevdoc/multi-api:latest
docker push rzldevdoc/multi-worker:latest

docker push rzldevdoc/multi-client:$CLIENT_VERSION
docker push rzldevdoc/multi-api:$API_VERSION
docker push rzldevdoc/multi-worker:$WORKER_VERSION

kubectl apply -f k8s/
kubectl set image deployment/client-deployment client=rzldevdoc/multi-client:latest
kubectl set image deployment/server-deployment server=rzldevdoc/multi-api:latest
kubectl set image deployment/worker-deployment worker=rzldevdoc/multi-worker:latest
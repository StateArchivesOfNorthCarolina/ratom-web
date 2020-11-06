default: build-deploy

build-deploy:
	docker build --pull -t govsanc/ratom-web .

push:
	cd deployment && ./ci_deployment.sh

.PHONY: default build-deploy push

help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install:
	docker-compose build
	docker-compose run --rm --no-deps heroes-react bash -ci 'yarn install --no-progress'

start:
	docker-compose up -d

stop:
	docker-compose down

psql:
	docker-compose exec postgres psql postgres -h localhost -U postgres

migration:
	docker-compose exec heroes-react bash -ci 'yarn dev:migrate'

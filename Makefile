export UID=$(shell id -u)
export GID=$(shell id -g)

NODE_ENV ?= development
NB_MIGRATIONS ?= 1

help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## setup all project dependencies
	docker-compose build
	docker-compose run --rm --no-deps heroes-react bash -ci "cd /app/front && yarn"

start: ## start all docker containers
	docker-compose up -d

stop: ## stop all docker containers
	docker-compose down

refresh-docker: ## refresh all containers
	$(MAKE) stop
	docker-compose build
	$(MAKE) start

logs: ## display logs all containers
	docker-compose logs -f

psql: ## connect to database
	docker-compose exec postgres sh -c "psql postgres -h localhost -U heroes"

graphql: ## connect to hasura graphql
	docker-compose exec graphql-engine sh

migration-init: ## init directory migrations
	docker-compose exec graphql-engine sh -ci "cd heroes-migrations && /bin/hasura-cli init --directory migrations"

migration-apply: ## apply migration
	docker-compose exec graphql-engine sh -ci "cd heroes-migrations/migrations && /bin/hasura-cli migrate apply"

migration-new: ## make migration-new MIGRATION_TITLE=whatever-title
	docker-compose exec graphql-engine sh -ci "cd heroes-migrations/migrations && /bin/hasura-cli migrate create ${MIGRATION_TITLE}"

migration-down: ## make migration-down NB_MIGRATIONS=whatever-number
	docker-compose exec graphql-engine sh -ci "cd heroes-migrations/migrations && /bin/hasura-cli migrate apply --down ${NB_MIGRATIONS}"

metadata-export: ## export metadata graphql (before: need to track tables with hasura console)
	docker-compose exec graphql-engine sh -ci "cd heroes-migrations/migrations && /bin/hasura-cli metadata export"

metadata-apply: ## apply metadata graphql
	docker-compose exec graphql-engine sh -ci "cd heroes-migrations/migrations && /bin/hasura-cli metadata apply"

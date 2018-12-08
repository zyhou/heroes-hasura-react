export UID=$(shell id -u)
export GID=$(shell id -g)

NODE_ENV ?= development

help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## setup all project dependencies
	docker-compose build
	docker-compose run --rm --no-deps heroes-react bash -ci "cd /app && yarn"

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

migration: ## apply migration
	docker-compose exec heroes-react bash -ci './node_modules/.bin/knex migrate:latest'

migration-new: ## make migration-new MIGRATION_TITLE=whatever-title
	docker-compose exec heroes-react bash -ci './node_modules/.bin/knex migrate:make ${MIGRATION_TITLE}'

migration-down: ## undo last migration
	docker-compose exec heroes-react bash -ci './node_modules/.bin/knex migrate:rollback'

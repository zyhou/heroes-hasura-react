install:
	docker-compose build
	docker-compose run --rm --no-deps node bash -ci 'yarn install'

start:
	docker-compose up -d

stop:
	docker-compose down

psql:
	psql postgres -h localhost -U postgres

migration:
	yarn dev:migrate

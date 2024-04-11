dev:
	docker-compose --env-file .env.dev down && docker-compose --env-file .env.dev up -d --build
	docker exec mongo bash ./docker-entrypoint-initdb.d/init.sh

prod:
	echo "soon"
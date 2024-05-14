dev:
	docker-compose --env-file .env.dev down && docker-compose --env-file .env.dev up -d --build
	docker exec mongo bash ./docker-entrypoint-initdb.d/init.sh
	cd front && npm i && npm run dev

prod:
	echo "soon"
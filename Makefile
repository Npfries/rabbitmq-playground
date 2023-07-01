start:
	docker compose -f docker-compose.yml -f docker-compose.start.yml up -d --build
	docker rmi $$(docker images -f "dangling=true" -q)

dev:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
	docker rmi $$(docker images -f "dangling=true" -q)

stop:
	docker compose -f docker-compose.yml -f docker-compose.start.yml -f docker-compose.dev.yml down -v
	docker rmi $$(docker images -f "dangling=true" -q)
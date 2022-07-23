NAME = ft_transcendance

all: reload

up: reload
stop:
	@ docker-compose -f docker-compose.yml down

clean:
	@ docker-compose -f docker-compose.yml down --volumes --rmi all

prune: clean
	@ docker system prune -f

reload:
	@ docker-compose up --build -V

.PHONY: linux stop clean prune reload all

create_backup:
	@ docker exec container-postgres bash -c 'pg_dump "postgresql://$${POSTGRES_USERNAME}:$${POSTGRES_PASSWORD}@$${POSTGRES_HOST}:$${POSTGRES_PORT}/$${POSTGRES_DB}" > /opt/db_backup/backup.sql'

import_backup:
	@ docker exec container-postgres bash -c 'psql "postgresql://$${POSTGRES_USERNAME}:$${POSTGRES_PASSWORD}@$${POSTGRES_HOST}:$${POSTGRES_PORT}/$${POSTGRES_DB}" < /opt/db_backup/backup.sql'

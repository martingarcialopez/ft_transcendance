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

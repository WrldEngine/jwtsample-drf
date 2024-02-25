# Sample of rest api with JWT auth

## Deployment

1. Setup [poetry](https://pypi.org/project/poetry/) and install requirements (`poetry install`)
2. Rename `.env.dist` to `.env` and configure it
3. Run database migrations with `python3 manage.py migrate` command
4. Before running the server(`python3 manage.py runserver`), make sure you are in a virtual environment by running the command `poetry shell`.

## Development
**Make migration script:**

    python3 manage.py makemigrations

**Run migrations:**

    python3 manage.py migrate

## Used technologies

- [Django Rest Framework](https://www.django-rest-framework.org/)
- [PostgreSQL](https://www.postgresql.org/) (database)
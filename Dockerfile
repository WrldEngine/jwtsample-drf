FROM python:3.10-slim

WORKDIR /app

ENV PYTHONUNBUFFERED 1

COPY poetry.lock pyproject.toml /app

RUN pip3 install poetry

RUN poetry install

COPY . .

EXPOSE 8000

ENTRYPOINT ["/app/entrypoint.sh"]
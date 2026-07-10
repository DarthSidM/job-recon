## to generate entire db models

`sqlacodegen "db_url" > models.py`

or if you only want a specific table's model

`sqlacodegen "db_url" --table table_name > models.py`

## structure
app/
1. core contains important functions such as db connection and celery starter
2. models contains db models
3. routes contains controllers as well as routes
4. schemas contain data transfer objects (dto) using pydantic
5. workers contains celery workers

# Worker for job sync
celery -A app.core.celery_app worker -Q jobs --loglevel=info

# Worker for resume parsing
celery -A app.core.celery_app worker -Q resume --loglevel=info

# Beat scheduler
celery -A app.core.celery_app beat --loglevel=info
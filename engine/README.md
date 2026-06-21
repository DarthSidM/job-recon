## to generate entire db models

`sqlacodegen "db_url" > models.py`

## structure
app/
1. core contains important functions such as db connection and celery starter
2. models contains db models
3. routes contains controllers as well as routes
4. schemas contain data transfer objects (dto) using pydantic
5. workers contains celery workers


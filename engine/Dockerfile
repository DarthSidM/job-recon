FROM python:3.12-slim

WORKDIR /app

ENV PYTHONPATH=/app

COPY . .
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD [ "python", "app/main.py" ]
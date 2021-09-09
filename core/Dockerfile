FROM python:3.9-slim-buster
WORKDIR /app

RUN apt-get update ##[edited]
RUN apt-get install ffmpeg libsm6 libxext6 libpq-dev -y

COPY requirements.txt requirements.txt
RUN ["pip", "install", "-r", "requirements.txt"]

COPY . .
CMD ["python", "-m", "flask", "run", "--host=0.0.0.0", "--port=80"]
EXPOSE 80

FROM python:3.8-alpine

LABEL maintainer = "yeshan <yeshan1329441308@gmail.com>"

EXPOSE 5000

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE 1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED 1

# Install pip requirements
ADD requirements.txt .
RUN python -m pip install -r requirements.txt

WORKDIR /app
ADD . /app

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]  # production web server
# CMD ["flask", "run", "--host", "0.0.0.0", "--port", "5000"]
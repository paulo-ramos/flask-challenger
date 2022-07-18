FROM python:3.9.13-bullseye

RUN apt-get update && apt-get upgrade

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN /usr/local/bin/python -m pip install --upgrade pip

RUN pip install --upgrade --no-cache -e .['dev']

ENV PYTHONUNBUFFERED 1

CMD [ "python", "./todo/app.py" ]

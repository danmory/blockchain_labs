# Week 1

## Requirements

1. Docker
2. Python 3.10
3. Curl

## Exercise 1

1. Run Postgres

    `` $ docker run --name mypostgres -p 5432:5432 -e POSTGRES_PASSWORD=123456 -d postgres ``

2. Create and connect to Database

3. Run SQL commands from *ex1.sql*

## Exercise 2

1. Run

    `` $ python ex2.py ``

## Exercise 3

1. Install requirements

    `` $ pip install -r requirements.txt ``

2. Run blockchain server

    `` $ uvicorn ex3:app --reload ``

3. Run script to interact with blockchain:

    `` $ source ex3.sh ``

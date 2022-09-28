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

### Answers to questions

1. Result of <http://127.0.0.1:8000/chain>

    ```json
        {
            "length":2,
            "chain":[
                {
                    "index":0,
                    "transactions":[],
                    "timestamp":1664382584.06821,
                    "previous_hash":"0",
                    "nonce":0,
                    "hash":"091250064eae604dbb3819cb1d8c9e7d50f6feaac6c60aae6ac7b4471742ab53"
                },
                {
                    "index":1,
                    "transactions":[
                        {
                            "from":"Alice",
                            "to":"Bob",
                            "amount":3.5
                        },
                        {
                            "from":"Bob",
                            "to":"Sami",
                            "amount":2.1
                        },
                        {
                            "from":"Sami",
                            "to":"Alice",
                            "amount":2.0
                        }
                    ],
                    "timestamp":1664382587.2919095,
                    "previous_hash":"091250064eae604dbb3819cb1d8c9e7d50f6feaac6c60aae6ac7b4471742ab53",
                    "nonce":454,
                    "hash":"00bb8107cb1fb1c7f5f008a739fd08e6cb48d3e863ea3b461c814290bc92f6f0"
                }
            ]
        }
     ```

2. Modifications:
   1. Send transaction endpoint
   2. Mine endpoint

   Assumptions:
   1. Users are valid
   2. No hackers -> no need for cryptography

3. Mainly, cryptography part is missed

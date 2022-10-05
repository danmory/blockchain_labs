# Week 2

## Exercise 1

### Requirements

1. Flask

### How to run

1. Install requirements

    `` $ pip install -r requirements.txt ``

2. Run application

    `` $ flask --app ex1.py run ``

3. Access <localhost:5000/{header}/{difficulty_bits}>

### How to increase speed

1. Decrease difficulty
2. Parallelize search of nonce

## Exercise 2

To run the program:

    `` $ python ex2.py > ex2.out ``

1. Account 5 was added.

    ```plain
        Important Note!

        Account 5 started it`s activity after there were already Block with Index 4!

        Therefore this account is not validator for blocks [0, 4].
    ```

2. The PoS algorithm always picks the validator with the biggest weight.

3. The resulting Chain:

    ```python
        [
            {
                "Index": 0,
                "Timestamp": "2022-10-05 20:32:03.934746",
                "BPM": 0,
                "PrevHash": "0000000000000000",
                "Validator": "eltneg, 50, 0",
                "Hash": "1a369c1b8a9a321bbbdfa6821a799796df6d823b00dd5879132568ba25bef19d",
            },
            {
                "Index": 1,
                "Timestamp": "2022-10-05 20:32:03.934894",
                "BPM": 53,
                "PrevHash": "1a369c1b8a9a321bbbdfa6821a799796df6d823b00dd5879132568ba25bef19d",
                "Validator": "account2, 55, 0",
                "Hash": "7f09573fe8f2fe3bd555570d897cfae6aa68cdf6c4c41330503a8fcd38c456be",
            },
            {
                "Index": 2,
                "Timestamp": "2022-10-05 20:32:03.935100",
                "BPM": 53,
                "PrevHash": "7f09573fe8f2fe3bd555570d897cfae6aa68cdf6c4c41330503a8fcd38c456be",
                "Validator": "account2, 55, 0",
                "Hash": "9af0e2c557e962d518481cb6568a4ce07b779f97293b4d8554f9419e4d974742",
            },
            {
                "Index": 3,
                "Timestamp": "2022-10-05 20:32:03.935315",
                "BPM": 53,
                "PrevHash": "9af0e2c557e962d518481cb6568a4ce07b779f97293b4d8554f9419e4d974742",
                "Validator": "account2, 55, 0",
                "Hash": "e46f0a67f17ea6bda8f78ae62b8635a39163506f6ae511dd59e3ed872852c728",
            },
            {
                "Index": 4,
                "Timestamp": "2022-10-05 20:32:03.935519",
                "BPM": 53,
                "PrevHash": "e46f0a67f17ea6bda8f78ae62b8635a39163506f6ae511dd59e3ed872852c728",
                "Validator": "account2, 55, 0",
                "Hash": "a18a088ae709924d5cae275b6137abc94d4d04057d400a9e5e6575552c701f1a",
            },
            {
                "Index": 5,
                "Timestamp": "2022-10-05 20:32:03.935772",
                "BPM": 53,
                "PrevHash": "a18a088ae709924d5cae275b6137abc94d4d04057d400a9e5e6575552c701f1a",
                "Validator": "account5, 100, 0",
                "Hash": "57247ca5004528c561d1adde9c8ae819ccd0ba8c0d505c461dd5e81f5765c590",
            },
            {
                "Index": 6,
                "Timestamp": "2022-10-05 20:32:03.936237",
                "BPM": 53,
                "PrevHash": "57247ca5004528c561d1adde9c8ae819ccd0ba8c0d505c461dd5e81f5765c590",
                "Validator": "account5, 100, 0",
                "Hash": "d01b56ba5da0d042dc4eba70813370b72cdec20d5b9b0ce999c76da0cc311c09",
            },
            {
                "Index": 7,
                "Timestamp": "2022-10-05 20:32:03.936695",
                "BPM": 53,
                "PrevHash": "d01b56ba5da0d042dc4eba70813370b72cdec20d5b9b0ce999c76da0cc311c09",
                "Validator": "account5, 100, 0",
                "Hash": "a329af55bdc876bfa43ac60f5900af4a8cce914e21ec92c6b6d10ba6523f21c5",
            },
            {
                "Index": 8,
                "Timestamp": "2022-10-05 20:32:03.937022",
                "BPM": 53,
                "PrevHash": "a329af55bdc876bfa43ac60f5900af4a8cce914e21ec92c6b6d10ba6523f21c5",
                "Validator": "account5, 100, 0",
                "Hash": "69883d039f6186317ffb579d3c0ecb5dba0035a911feeb867365206ae88bc5cf",
            },
            {
                "Index": 9,
                "Timestamp": "2022-10-05 20:32:03.937344",
                "BPM": 53,
                "PrevHash": "69883d039f6186317ffb579d3c0ecb5dba0035a911feeb867365206ae88bc5cf",
                "Validator": "account5, 100, 0",
                "Hash": "08fc22d504d8db49fafa7bea44b050c3e8abfe8ee92cda52f1a6b298a48c824a",
            },
            {
                "Index": 10,
                "Timestamp": "2022-10-05 20:32:03.937719",
                "BPM": 53,
                "PrevHash": "08fc22d504d8db49fafa7bea44b050c3e8abfe8ee92cda52f1a6b298a48c824a",
                "Validator": "account5, 100, 0",
                "Hash": "fff406f5318136376c84161d95b08fbad76b55c2110444e5272998b21b2e1c04",
            },
        ]
    ```

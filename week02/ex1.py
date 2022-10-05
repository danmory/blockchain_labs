import hashlib
import time
from flask import Flask

max_nonce = 2 ** 32 # 4 billion

app = Flask(__name__)

@app.route('/<header>/<int:difficulty_bits>')
def proof_of_work(header, difficulty_bits):

	target = 2 ** (256-difficulty_bits)
	for nonce in range(max_nonce):
		hash_result = hashlib.sha256(f'{header}{nonce}'.encode()).hexdigest()

		if int(hash_result, 16) < target:
			print("Success with nonce %d" % nonce)
			print("Hash is %s" % hash_result)
			return (hash_result, nonce)

	print("Failed after %d (max_nonce) tries" % nonce)
	return hash_result, nonce

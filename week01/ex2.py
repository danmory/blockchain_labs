import math
from typing import List, Tuple, Union


def rsa_fun(p: int, q: int) -> Tuple[int, int, int]:
    n = p * q           # Modulus for both the public and private keys
    phi = (p-1)*(q-1)   # Euler totient function
    e = 0               # Part of the public key
    for i in range(2, phi):
        if math.gcd(i, phi) == 1:
            e = i
            break
    d = pow(e, -1, phi)  # Private key exponent
    return n, e, d


def encrypt(plain: Union[str, int], e: int, n: int) -> List[int]:
    # List of integers after encryption
    enc = [(ord(char) ** e) % n for char in str(plain)]
    return enc


def decrypt(cipher: List[int], d: int, n: int) -> str:
    # List of separate symbols of plain
    plain = [chr((char ** d) % n) for char in cipher]
    plain = "".join(plain)                                 # Plain text
    return plain


def main():
    # Example:
    message = 1234124124
    n, e, d = rsa_fun(53, 59)
    enc = encrypt(message, e, n)
    print(enc)
    dec = decrypt(enc, d, n)
    print(dec)


if __name__ == "__main__":
    main()

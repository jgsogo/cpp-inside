import re
import random

prime_pattern = re.compile(r'^.?$|^(..+?)\1+$')

def is_prime(n):
    as_str = "1"*n
    return not prime_pattern.match(as_str)

def randoms(n, seed=None):
    random.seed(a=seed)
    for _ in xrange(n):
        yield random.random()

def main():
    #n = 105943
    #b = is_prime(n)
    #print("{}: {}".format(n, b))
    for it in randoms(n=10, seed=10):
        print(it)

if __name__ == '__main__':
    main()
    a = bool((0.1 + 0.2) == 0.3)
    print("{0:.25f}".format(0.1 + 0.2))
    print("{0:.25f}".format(0.3))
    print(a)
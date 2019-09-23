
import sys
import os
import argparse


me = os.path.abspath(os.path.dirname(__file__))
sys.path.append(os.path.join(me, '..', '..', 'bindings', 'python'))

from crnd import CRND


def draw_histogram(rolls, title):
    nstars = 300
    nclasses = 20

    p = [0] * (nclasses + 1)

    min_value = min(rolls)
    max_value = max(rolls)
    step = (max_value-min_value)/float(nclasses)

    for elem in rolls:
        p[int((elem-min_value)/step)] += 1

    sys.stdout.write("{}\n".format(title))
    for i in range(nclasses):
        stars = p[i]*nstars/len(rolls)
        sys.stdout.write("{:2.6f}: {}\n".format(min_value + i*step + step/2.0, "*"*int(stars)))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Generate some random series')
    parser.add_argument('--crnd', dest='crnd', help='Path to library')

    args = parser.parse_args()

    crnd = CRND(args.crnd)
    # crnd.help(sys.stdout)

    r = crnd.lognormal(12345, 100000, 3, 0.2)
    draw_histogram(r, "lognormal(3, 0.2)")


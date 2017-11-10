import numpy as np
import pylab
import math
class RK4(object):

    def __init__(self, *functions):

        """
        Initialize a RK4 solver.
        :param functions: The functions to solve.
        """

        self.f = functions
        self.t = 0


    def solve(self, y, h, n,t0):

        """
        Solve the system ODEs.
        :param y: A list of starting values.
        :param h: Step size.
        :param n: Endpoint.
        """
        self.t = t0
        t = []
        res = []
        for i in y:
            res.append([])

        while self.t <= n and h != 0:
            t.append(self.t)
            y = self._solve(y, self.t, h)
            for c, i in enumerate(y):
                res[c].append(i)

            self.t += h

#             if self.t + h > n:
#                 h = n - self.t

        return t, res[0]


    def _solve(self, y, t, h):

        functions = self.f

        k1 = []
        for f in functions:
            k1.append(h * f(t, *y))

        k2 = []
        for f in functions:
            k2.append(h * f(t + .5*h, *[y[i] + .5*h*k1[i] for i in xrange(0, len(y))]))

        k3 = []
        for f in functions:
            k3.append(h * f(t + .5*h, *[y[i] + .5*h*k2[i] for i in xrange(0, len(y))]))

        k4 = []
        for f in functions:
            k4.append(h * f(t + h, *[y[i] + h*k3[i] for i in xrange(0, len(y))]))

        return [y[i] + (k1[i] + 2*k2[i] + 2*k3[i] + k4[i]) / 6.0 for i in xrange(0, len(y))]


ydot = lambda t, y: -(y**2)*t

lv = RK4(ydot)
a, b = lv.solve([y0], h, tf,t0)
length = len(a)
for i in range(0,length):
    print a[i],
    print " ",
    print b[i]
pylab.plot(a,b)
pylab.show()
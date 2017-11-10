import math
import pylab

def Euler(f, xa, xb, ya, h):
    x_list = []
    y_list = []
    n = int((xb - xa) / h)
    x = xa
    y = ya
    for i in range(int(n)):
        y += h * f(x, y)
        x += h
        x_list.append(x)
        y_list.append(y)
    return x_list,y_list
a,b = Euler(lambda t, y: eval(func), t0, tf, y0, h)
length = len(a)
for i in range(0,length):
    print a[i],
    print " ",
    print b[i]
pylab.plot(a,b)
pylab.show()
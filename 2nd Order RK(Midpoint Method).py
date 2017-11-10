import numpy as np
import pylab
def midpoint_method( f, a, b, h, IV ):
    x_list = []
    y_list = []
    N = int((b-a)/h)                  
    t = np.arange( a, b+h, h )          
    w = np.zeros((N+1,))                
    t[0], w[0] = IV                     
    for i in range(1,N+1):              
        x_list.append(i)
        w[i] = w[i-1] + h * f( t[i-1] + h/2.0, w[i-1] + h * f( t[i-1], w[i-1] ) / 2.0 )
        y_list.append(w[i])
    return x_list,y_list

a,b = midpoint_method(lambda t, y: eval(func),t0,tf,h,[t0,y0])
length = len(a)
for i in range(0,length):
    print a[i],
    print " ",
    print b[i]
pylab.plot(a,b)
pylab.show()
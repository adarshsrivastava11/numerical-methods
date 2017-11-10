from math import *
def trapezoid(function, interval, numtraps):
    lox, hix = interval
    h = float(hix-lox)/numtraps
    sum = 0.5*(function(lox)+function(hix))
    for i in range(1, numtraps):
        sum = sum + function(lox + i*h)
    return h*sum

def difftrap(function, interval, numtraps):
    # Perform part of the trapezoidal rule to integrate a function.
    # Assume that we had called difftrap with all lower powers-of-2
    # starting with 1.  Calling difftrap only returns the summation
    # of the new ordinates.  It does _not_ multiply by the width
    # of the trapezoids.  This must be performed by the caller.
    #     'function' is the function to evaluate.
    #     'interval' is a sequence with lower and upper limits
    #                of integration.
    #     'numtraps' is the number of trapezoids to use (must be a
    #                power-of-2).
    if numtraps<=0:
        print "numtraps must be > 0 in difftrap()."
        return
    elif numtraps==1:
        return 0.5*(function(interval[0])+function(interval[1]))
    else:
        numtosum = numtraps/2
        h = float(interval[1]-interval[0])/numtosum
        lox = interval[0] + 0.5 * h;
        sum = 0.0
        for i in range(0, numtosum):
            sum = sum + function(lox + i*h)
        return sum

def romberg_diff(b, c, k):
    # Compute the differences for the Romberg quadrature corrections.
    # See Forman Acton's "Real Computing Made Real," p 143.
    tmp = 4.0**k
    return (tmp * c - b)/(tmp - 1.0)

def printresmat(function, interval, resmat,err):
    # Print the Romberg result matrix.
    i = j = 0
    print 'Romberg integration of', `function`,
    print 'from', interval
    print ''
    print '%6s %9s %9s' % ('Steps', 'StepSize', 'Results')
    for i in range(len(resmat)):
        print '%6d %9f' % (2**i, (interval[1]-interval[0])/(i+1.0)),
        for j in range(i+1):
            print '%9f' % (resmat[i][j]),
        print ''
    print ''
    print 'I = ',resmat[i][j]
    print 'Number of Interval = ', 2**(len(resmat)-1)
    print 'Approximate relative error = ',(err*10),
    print

def romberg(function, interval, accuracy, show=0):
    """Returns the integral of |function| (a function of one variable)
    over |interval| (a sequence of length two containing the lower and
    upper limit of the integration interval), calculated using
    Romberg integration up to the specified |accuracy|. If |show| is 1,
    the triangular array of the intermediate results will be printed."""
    err = 0
    i = n = 1
    intrange = interval[1] - interval[0]
    ordsum = difftrap(function, interval, n)
    result = intrange * ordsum
    resmat = [[result]]
    lastresult = result + accuracy * 2.0
    while (abs(result - lastresult) > accuracy):
        n = n * 2
        ordsum = ordsum + difftrap(function, interval, n)
        resmat.append([])
        resmat[i].append(intrange * ordsum / n)
        for k in range(i):
            resmat[i].append(romberg_diff(resmat[i-1][k],
                                          resmat[i][k], k+1))
        result = resmat[i][i]
        lastresult = resmat[i-1][i-1]
        err = ((result-lastresult))
        i = i + 1
    if show: printresmat(function, interval, resmat,err)
    return result

func = raw_input()
a = float(raw_input())
b = float(raw_input())
accuracy = float(raw_input())
r = romberg(lambda x: eval(func) , (a, b),accuracy, show=1)
def rgb_to_hsl(r, g, b):
    r /= 255
    g /= 255
    b /= 255

    maximo = max(r, g, b)
    minimo = min(r, g, b)

    h = (maximo+minimo)/2
    s = (maximo+minimo)/2
    l = (maximo+minimo)/2

    if maximo == minimo:
        h = 0
        s = 0
    else:
        d = maximo - minimo
        if l > 0.5:
            s = d/(2-maximo-minimo)
        else:
            s = d / (maximo+minimo)

        # switch
        if maximo == r:
            h = (g - b) / d
            if g < b:
                h += 6

        if maximo == g:
            h = (b - r) / d + 2

        if maximo == b:
            h = (r - g) / d + 4

        h /= 6

    return [h, s, l]

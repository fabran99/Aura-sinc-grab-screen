from functions import rgb_to_hsl
import time
from PIL import ImageGrab, Image
import math
import pandas as pd
import threading
from Naked.toolshed.shell import execute_js, muterun_js, run_js

basewidth = 300
last_h = 100


def init_js():
    success = execute_js('change_color.js')


def start_init_js_thread(event):
    global init_thread
    init_thread = threading.Thread(target=init_js)
    init_thread.daemon = False
    init_thread.start()


start_init_js_thread(None)


# darle los colores
while True:

    f = open("color.txt", "w")
    img = ImageGrab.grab()
    wpercent = (basewidth / float(img.size[0]))
    hsize = int((float(img.size[1]) * float(wpercent)))
    img = img.resize((basewidth, hsize), Image.ANTIALIAS)

    # convierto a dataframe
    df = pd.DataFrame(columns=['r', 'g', 'b'], data=list(img.getdata()))
    # filtro los grises
    df = df[df.max(axis=1)-30 > df.min(axis=1)]

    # si no esta todo en blanco o todo en negro
    if df.shape[0] > 200:
        # promedio
        totales = (df.sum(axis=0)/df.size).round()

        r, g, b = totales

        h, s, l = rgb_to_hsl(r, g, b)

        if math.isnan(h):
            h = last_h

        if h > 1:
            h = 0.9
        h = round(h*360)
        last_h = h
        f.write(str(h))

    time.sleep(0.1)

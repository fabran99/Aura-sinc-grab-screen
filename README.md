# Aura-sinc-grab-screen
Grab the dominant color from the screen and put it in the rgb light from your aura sync motherboard

### Instalation
npm install

pip install -r requirements.txt

python screen_colors.py

# Customize the function

It uses the bindings from https://github.com/DanielRamosAcosta/aura-sdk
You will probably need to change the change_color.js file, to adapt the controller bindings to the hardware you have.

In the function new_color just uncomment or comment the controllers you need.

## How it works
I make a screenshot with python and resize it to make the process faster.
Pandas grabs the most common rgb colour from the screen, ignoring greys, and save, then converts the rgb values to hsl, in order
to get the hue of the color, finally I save the color to color.txt in an infinite loop.

change_color.js grabs the color from the txt and change the rgb color to match the hue, making the animation between the last color and the new one.


## Make it executable
You can make it an executable with Pyinstaller.

pyinstaller screen_colors.py

### Put color.txt, package.json and change_color.json in dist/screen_colors

cd dist/screen_colors

npm install

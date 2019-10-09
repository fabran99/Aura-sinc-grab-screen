# Aura-sinc-grab-screen
Grab the dominant color from the screen and put it in the rgb light from your aura sync motherboard

It uses the bindings from https://github.com/DanielRamosAcosta/aura-sdk
You will probably need to change the change_color.js file, to adapt the controller bindings to the hardware you have.

In the function new_color just uncomment or comment the controllers you need.

## How it works
With python I make a screenshot and resize the image to make the process faster.
Pandas grabs the most common rgb colour from the screen, ignoring greys, and save, and then converts the rgb values to hsl, in order
to get the hue of the color, then save the color to color txt. This is an infinite while.

change_color grabs the color from the txt and change the rgb color to match the hue, making the animation gradient between the last color and the new one.


## Make it executable
You can make it an executable with Pyinstaller.

pyinstaller screen_colors.py

then put color.txt, package.json and change_color.json in dist/screen_colors

cd dist/screen_colors

npm install

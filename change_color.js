const { AuraSDK } = require("aura-sdk");
const fs = require("fs");

const auraSDK = new AuraSDK();
// controllers
const mbcontroller = auraSDK.createMbController();
// const gpucontroller = auraSDK.createGPUController();
// const dramcontroller = auraSDK.createDramController();

const new_color = color => {
  try {
    mbcontroller.setAllColorNow(color);
    // gpucontroller.setAllColorNow(color);
    // dramcontroller.setAllColorNow(color);
  } catch {
    return null;
  }
};

//  ultimo color
var last_color = 100;

const main = () => {
  // leo el color del txt
  var contents = fs.readFileSync("./color.txt", "utf8");

  // si por algun motivo el txt esta vacio, tomo el ultimo color
  if (contents == "") {
    contents = last_color;
  }

  // inicializo los colores como enteros
  last_color = parseInt(last_color);
  contents = parseInt(contents);

  // si la hay diferencia entre los colores la calculo
  if (last_color != contents) {
    var diferencia = contents - last_color;

    // si el absoluto de la diferencia es de mas de 180 es que la forma
    // mas cercana de llegar al punto es yendo hacia atras
    if (Math.abs(diferencia) >= 180) {
      if (diferencia > 0) {
        diferencia = (360 - Math.abs(diferencia)) * -1;
      } else {
        diferencia = 360 - Math.abs(diferencia);
      }
    }

    // si hay menos de 10 de diferencia en el hue tengo que hacer una transicion
    // por los colores que hay en el medio
    if (Math.abs(diferencia) > 10) {
      // los steps son la cantidad de pasos que voy a hacer desde el color
      // actual hasta llegar al color recibido en el txt
      var steps = Math.round(Math.abs(diferencia) / 3 + 3);
      // el salto es la cantidad que hay que incrementar para llegar con la
      // cantidad justa de pasos
      var salto = Math.round(diferencia / steps);

      // inicio la variable que contendra el hue siguiente en la transicion
      var color_salto;

      // decido si tengo que ir hacia atras o hacia adelante
      if (last_color + salto >= 360) {
        color_salto = salto - (360 - last_color);
      } else if (last_color + salto < 360) {
        color_salto = 360 - (salto - last_color);
      }
      // inicio el contador para llegar hasta el total de steps
      var contador = 1;

      // funcion que realiza la transicion entre un color y otro
      const transicion = () => {
        try {
          //  cambio el color por el siguiente
          new_color(`hsl(${color_salto},100%,50%)`);
        } catch {
          // si no puedo por algun motivo, entonces vuelvo a iniciar la funcion
          // principal
          setTimeout(() => {
            main();
          }, 50);
          return null;
        }
        // segun el lugar actual resto o sumo la cantidad del salto
        if (color_salto + salto > 360) {
          color_salto = salto - (360 - color_salto);
        } else if (color_salto + salto < 360) {
          color_salto = 360 - (salto - color_salto);
        }
        color_salto += salto;
        // aumento el contador
        contador++;

        // si el contador aun no cumple todos los pasos vuelvo a ejecutar la funcion
        if (contador <= steps) {
          setTimeout(() => {
            transicion();
          }, 20);
        } else {
          // si ya completé todos los pasos, entonces  agrego el color que me llegó
          // en el txt y vuelvo a ejecutar la función principal, guardando el color
          // actual en la variable last_color
          try {
            new_color(`hsl(${contents},100%,50%)`);
          } catch {
            setTimeout(() => {
              main();
            }, 50);
            return null;
          }
          last_color = contents;
          setTimeout(() => {
            main();
          }, 50);
          return null;
        }
      };

      // inicio la funcion para hacer la transicion
      transicion();
    } else {
      // si la diferencia es minima entonces directamente cambio el color
      // guardando el color actual en last_color
      try {
        new_color(`hsl(${contents},100%,50%)`);
      } catch {
        setTimeout(() => {
          main();
        }, 50);
        return null;
      }
      last_color = contents;

      // vuelvo a ejecutar al funcion principal
      setTimeout(() => {
        main();
      }, 50);
    }
  } else {
    // si el color sigue siendo el mismo, vuelvo a ejecutar la funcion sin cambiar nada
    setTimeout(() => {
      main();
    }, 50);
  }
};

main();

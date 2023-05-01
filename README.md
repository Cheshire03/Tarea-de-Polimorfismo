# Tarea-de-Polimorfismo

## Explicación

link al juego:  https://cheshire03.github.io/Tarea-de-Polimorfismo/

Para mi juego decidí hacer un shooter, basado en un juego llamado diep.io. 

El "Héroe", como es llamado en el código, es un circulo azul con un "cañón" que sigue a tu mouse y gira con él, y se mueve con WASD ó con las flechas. Basado en mis aprendizajes con el libro The Nature Of Code, decidí que el movimiento en vez de aumentar la posición del "Héroe", aumentaría la velocidad, y ésta tendría in tope. Como el "Héroe" continuaba moviendose después de no mantener ninguna tecla, implementé que su velocidad bajé hasta llegar a 0 si ninguna tecla estaba siendo presionada, causando un efecto de desliz parecido a Mario Bros.

Las "Balas" las hice una clase aparte, y se crea una en el arreglo "balas" cada vez que presionas el click derecho. Las balas salen del final del cañón. Una vez que salen de la pantalla, elimino las balas del arreglo para que no afecten. Las balas se disparan cuando el mouse está presionado, en un intervalo de aprox. 3 por segundo.

Creé una clase "Enemigo", de la cual se ramifican mis tres tipos de enemigos: "Rainbow", el cual es grande y lento, pero tiene mucha vida; "Spike", el cual es de mediano tamaño y tiene picos alrededor de su cuerpo, tiene menos vida pero se mueve más rápido; y "Speedy", el cual es el más rápido, pero pequeño y con la vida más corta. Cada uno tiene una vida, la cual va disminuyendo con cada bala, y valen ciertos puntos los cual cuando mueren se van aunentando al "Score", en la esquina superior izquierda de la pantalla.

Hice un temporizador para que los enemigos salieran cada cierto intervalo de los bordes de la pantalla, estos se agregan a un arreglo. Antes de que salgan aparece una linea roja que indica de dónde saldrán. Cuando eliminas un "Enemigo", este se elimina del arreglo.

El juego termina una  vez que uno de los "Enemigo"s te toque. Los enemigos se van volviendo más rápidos conforme el tiempo vaya pasando.

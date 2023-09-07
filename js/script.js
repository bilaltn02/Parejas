//Todas las variables para acceder a los elementos de la pagina
let imagenes_animales = ["cabra.jpg", "cerdo.jpg", "conejo.png", "conejo2.jpg", "cordero.png", "elefante.jpg", "erizo.jpg", "gato.png", "jirafa.png", "leon.png", "mono.jpg", "oso.jpg", "osoblanco.png", "osopanda.png", "pato.png", "perro.png", "pollo.png", "pradera.jpg", "tigre.jpg", "vaca.png", "tucan.jpg", "loro.jpg", "cigueña.jpg", "foca.jpg", "koala.jpg", "cebra.jpg", "canguro.jpg", "pinguino.jpg", "zorro.jpg", "potro.jpg", "tortuga.jpg", "lobo.jpg"];

let imagenes_cartas = ["atras1.jpg", "atras2.jpg", "atras3.jpg", "atras4.jpg", "atras5.jpg", "atras6.jpg", "atras7.jpg", "atras8.jpg"];

let header_title = document.getElementById("header_title");
let configurador = document.getElementById("configurador");
let juego = document.getElementById("juego");
let tiempo = document.getElementById("tiempo");
let ayuda = document.getElementById("ayuda");
let botones = document.getElementById("botones");
let finjuego = document.getElementById("finjuego");

let configuracion_tama = document.getElementById("configuracion_tama");
let configuracion_cartas = document.getElementById("configuracion_cartas");
let configuracion_juego = document.getElementById("configuracion_juego");
let configuracion_ayuda = document.getElementById("configuracion_ayuda");

let config_card_body = document.getElementById("config_card_body");
let visor_imagenes_juego = document.getElementById("visor_imagenes_juego");
let visor_marcador = document.getElementById("visor_marcador");
let visor_tama = document.getElementById("visor_tama");
let visor_tiempo = document.getElementById("visor_tiempo");
let visor_ayuda = document.getElementById("visor_ayuda");

let btn_comprobar = document.getElementById("btn_comprobar");
let btn_validar = document.getElementById("btn_validar");
let btn_nueva_partida = document.getElementById("btn_nueva_partida");

let imagenes = document.getElementsByTagName("img");

//Variables para recoger los datos de configuracion del juego
let cnum = "";
let cimg = "";
let ctime = "";
let chelp = "";

const crearVisorImagenes = () => {
    let visor_imagenes_carta = document.createElement("div");
    visor_imagenes_carta.classList.add("visor_imagenes_carta");
    visor_imagenes_carta.setAttribute("id", "visor_imagenes_carta");
    config_card_body.appendChild(visor_imagenes_carta);
    return visor_imagenes_carta;
}
//Esta la he creado yo
let visor_imagenes_carta = crearVisorImagenes();
//Hasta aqui

//Carga las diferentes imagenes del reverso de las cartas
const crearImagenesSelect = () => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < imagenes_cartas.length; i++) {
        const div = document.createElement("DIV");
        div.classList.add("config-card__card");
        const img = document.createElement("IMG");
        img.setAttribute("src", `./assets/images/cartas/${imagenes_cartas[i]}`);
        img.classList.add("config-card__img")
        div.appendChild(img);
        fragment.appendChild(div);
    }
    visor_imagenes_carta.appendChild(fragment);
}
//Checkea que input se ha seleccionado y devuelve su valor
const checkSelect = (form) => {
    let variable = "";
    for (let i = 0; i < form.children.length; i++) {
        if (form.children[i].classList.contains("seleccionado")) {
            variable = form.children[i].textContent;
        }
    } if (variable === "") {
        form.parentElement.classList.add("error")
    }
    return variable;
}
//Checkea que fotk se ha seleccionado y devuelve su valor
const checkFoto = (form) => {
    let variable = "";
    for (let i = 0; i < form.children.length; i++) {
        let contenedor = form.children[i];
        if (contenedor.children[0].classList.contains("carta-seleccionada")) {
            variable = contenedor.children[0].getAttribute("src");
        }
    } if (variable === "") {
        form.parentElement.classList.add("error")
    }

    return variable;
}

//Marca con verde el valor seleccionado
//Procede de manera diferente en funcion de si el evento se dispara sobre un input o una imagen
function selectOpcion(opcion) {
    opcion.addEventListener("mousedown", (event) => {
        let padre = event.target.parentElement;
        if (event.target.nodeName === "INPUT") {
            //Elimina el verde de las otras opciones para que solo posea el color la opcion seleccionada
            for (let i = 0; i < padre.children.length; i++) {
                if (padre.children[i].classList.contains("seleccionado")) {
                    padre.children[i].classList.remove("seleccionado");
                }
            }
            let sibling = event.target.nextElementSibling;
            sibling.classList.add("seleccionado");
            padre.parentElement.classList.remove("error");
        } else if (event.target.nodeName === "IMG") {
            let contenedor = padre.parentElement;
            for (let i = 0; i < contenedor.children.length; i++) {
                let imagen = contenedor.children[i].children[0];
                if (imagen.classList.contains("carta-seleccionada")) {
                    imagen.classList.remove("carta-seleccionada");
                }
            }
            event.target.classList.add("carta-seleccionada");
            contenedor.parentElement.classList.remove("error");
        }
    });
}

//Diferentes funciones a la hora de comprobar las parejas
/*En funcion de valor de ayuda seleccionado (almacenado en la variable chelp) se ejecuta una u otra
Todas las funciones devuelven true si hay alguna carta repetida o false si no la hay
Hace un recorrido por los nodos del visor de imagenes del juego
En cada nodo compara la imagen con todas las siguientes*/

//Si hay repetido pone el boton en rojo
const comprobarImagenesMedio = () => {
    let ok = false;
    for (let i = 0; i < visor_imagenes_juego.children.length; i++) {
        let divcheck = visor_imagenes_juego.children[i];
        for (let j = i + 1; j < visor_imagenes_juego.children.length; j++) {
            let otherdiv = visor_imagenes_juego.children[j];
            if (divcheck.children[0].getAttribute("src") === otherdiv.children[0].getAttribute("src")) {

                btn_comprobar.classList.add("rojo");
                ok = true;
            }
        }
    }
    return ok;
}
//Si hay repetido marca las cartas repetidas
const comprobarImagenesAlto = () => {
    let ok = false;
    for (let i = 0; i < visor_imagenes_juego.children.length; i++) {
        let divcheck = visor_imagenes_juego.children[i];
        for (let j = i + 1; j < visor_imagenes_juego.children.length; j++) {
            let otherdiv = visor_imagenes_juego.children[j];
            if (divcheck.children[0].getAttribute("src") === otherdiv.children[0].getAttribute("src")) {
                divcheck.classList.add("error");
                otherdiv.classList.add("error");
                btn_comprobar.classList.add("rojo");
                ok = true;
            }
        }
    }
    return ok;
}
//No da nada de ayuda
const comprobarImagenesHardcore = () => {
    let ok = false;
    for (let i = 0; i < visor_imagenes_juego.children.length; i++) {
        let divcheck = visor_imagenes_juego.children[i];
        for (let j = i + 1; j < visor_imagenes_juego.children.length; j++) {
            let otherdiv = visor_imagenes_juego.children[j];
            if (divcheck.children[0].getAttribute("src") === otherdiv.children[0].getAttribute("src")) {
                ok = true;
            }
        }
    }
    return ok;
}

//Funcion que reinicia la pagina
const reset = () => {
    location.reload(true);
}

//Oculta los campos del juego al cargar la pagina
window.addEventListener("DOMContentLoaded", () => {
    juego.style.display = "none";
    finjuego.style.display = "none";
    btn_comprobar.style.display = "none";
    btn_nueva_partida.style.display = "none";
    crearImagenesSelect();
})

//Se ejecuta la funcion que muestra las opciones elegidas para cada campo
selectOpcion(configuracion_tama);
selectOpcion(tiempo);
selectOpcion(config_card_body);
selectOpcion(ayuda);

//Se almacenan en variables los valores de la configuracion
btn_validar.addEventListener("mousedown", () => {
    cnum = checkSelect(visor_tama);
    cimg = checkFoto(visor_imagenes_carta);
    ctime = checkSelect(visor_tiempo);
    chelp = checkSelect(visor_ayuda);
    //SE COMPRUEBA QUE TODOS LOS CAMPOS ESTEN RELLENOS
    if (cnum !== "" && cimg !== "" && ctime !== "" && chelp !== "") {
        //Se ocultan los campos de configuracion y se muestran los del juego
        //Deberia ir en una funcion
        configurador.style.display = "none";
        btn_validar.style.display = "none";
        juego.style.display = "block";
        btn_comprobar.style.display = "block"

        //Se generan las cartas en el visor del juego
        //Deberia ir en una funcion
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < parseInt(cnum); i++) {
            let carta = document.createElement("img");
            carta.setAttribute("src", cimg);
            carta.classList.add("config-card__img")
            let cont_carta = document.createElement("div");
            cont_carta.classList.add("config-card__card")
            cont_carta.appendChild(carta);
            fragment.appendChild(cont_carta);
        }
        visor_imagenes_juego.appendChild(fragment);
    }
})

//Cada vez que se hace click en una carta se genera una imagen random de un animal
//Todo lo de dentro debe ir en una funcion
visor_imagenes_juego.addEventListener("mousedown", (event) => {
    //Se elimina el borde rojo de la imagen si lo tiene de antes
    if (event.target.nodeName === "IMG") {
        if (event.target.parentElement.classList.contains("error")) {
            event.target.parentElement.classList.remove("error")
        }
        //Se elimina el rojo del boton
        btn_comprobar.classList.remove("rojo");
        //Se pone la imagen
        let random = Math.floor(Math.random() * imagenes_animales.length);
        event.target.setAttribute("src", `./assets/images/animales/${imagenes_animales[random]}`)
    }
})

btn_comprobar.addEventListener("mousedown", () => {
    //Se crea variable para recoger el valor de las funciones que comprueban que no hayan repetidos
    let ok;
    if (chelp === " Medio") {
        ok = comprobarImagenesMedio();
    } else if (chelp === " Alto") {
        ok = comprobarImagenesAlto();
    } else {
        ok = comprobarImagenesHardcore();
    }
    //Si se ha devuelto false significa que no hay repetido
    if (ok === false) {
        //Por tanto se muestra el fin del juego
        btn_comprobar.style.display = "none";
        juego.style.display = "none";
        finjuego.style.display = "block";
        btn_nueva_partida.style.display = "block";
    }

    console.log(chelp)
})

//Se resetea la pagina
btn_nueva_partida.addEventListener("mousedown", () => {
    reset();
})

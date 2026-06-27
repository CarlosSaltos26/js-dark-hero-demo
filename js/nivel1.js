window.addEventListener('load', iniciarAPP, false);

if(document.readyState === 'complete'){
   console.log('veamos');
   }

var canvas;
var ctx;
var friccion = 0.9;
var gravedad = 0.3;
var vida = 3;
var activo = true;
var actAudio = false;


/////audio
var disparo;
disparo = document.getElementById('sonidoDisparo');

disparo.addEventListener('canplaythrough',function(){
    actAudio = true;
});

//variable para saber NImg a usar
var nImg = 15;

var img_plataforma = new Image();
var img_tubos = new Image();
var img_cadenas = new Image();
var img_personaje = new Image();
var img_plat = new Image();
var img_arma1 = new Image();
var img_arma2 = new Image();
var img_bala = new Image();
var img_puas = new Image();
var img_gameOver =  new Image();
var img_logoItsco =  new Image();
var img_palVida =  new Image();
var img_Vidas =  new Image();
var img_Enemigo =  new Image();
var img_Winner =  new Image();

//1.- hacer jugador se dibuje en el medio
//2.- mov teclas
//3.- ejecutar el movimiento
//4.- friccion

///////////////////ARRAYS PARA OBJETOS DINAMICOS///////

var vectorBalas = [];
var vectorPuas = [];
var vectorExplode = [];
var pisoDinamico = [];

//////////////////PROTOTIPOS////////////////////

///BALA ARMAS
//pos armas en el canvas

var Bala = function(x, y, vel) {
  this.x = x;
  this.y = y;
  this.width = 8;
  this.height = 8;
  this.velocidad = vel;
  this.activo = true;
}

Bala.prototype.dibujar = function() {
  //ctx.fillStyle = "red";
  ctx.fillRect(this.x, this.y, this.width, this.height);
  ctx.drawImage(img_bala, 0, 0, 8, 8, this.x, this.y, this.width, this.height);

  this.x += this.velocidad;

}

/////////////////PUAS///////////////////////

//Puas hacia la parte superior
var PuasA = function(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.width = w;
  this.height = h;
  this.radio = 15;
  this.angulo = 0;
  this.movY = y;
  this.desp = 1;
}

//Puas hacia la parte inferior
var PuasB = function(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.width = w;
  this.height = h;
  this.radio = 15;
  this.angulo = 0;
  this.movY = y;
  this.desp = 1;
}

PuasA.prototype.dibujar = function() {

  this.y = this.movY + Math.sin(this.angulo) * this.radio;

  ctx.drawImage(img_puas, 0, 0, 72, 13, this.x, this.y, this.width, this.height);
  //ctx.drawImage(img_puas, 0, 0, 72, 13, 403, 260, 72, 20);

  this.angulo -= 0.01;

}

PuasB.prototype.dibujar = function() {

  this.y = this.movY + Math.sin(this.angulo) * this.radio;

  ctx.drawImage(img_puas, 0, 0, 72, 13, this.x, this.y, this.width, this.height);
  //ctx.drawImage(img_puas, 0, 0, 72, 13, 403, 260, 72, 20);

  this.angulo += 0.01;
  //ctx.drawImage(img_puas, 577, 260, 72, 20);


}

//////////////PROTOTIPO EXPLOSION////////////////

var Explosion = function(x, y, angulo, inc) {
  this.x = x;
  this.y = y;
  this.posX = x;
  this.posY = y;
  this.width = 7;
  this.height = 7;
  this.angulo = angulo;
  this.radio = 0;
  this.transparencia = 1;
  this.activo = true;
  this.incremento = inc;
}

Explosion.prototype.dibujar = function() {

  //aqui hago el cuadrado a ver si vale esa huevada
  ctx.save();
  ctx.globalAlpha = this.transparencia;
  ctx.fillStyle = "black";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.strokeRect(this.x, this.y, this.width, this.height);
  ctx.fillRect(this.x, this.y, this.width, this.height);

  this.x = this.posX + Math.cos(this.angulo) * this.radio;
  this.y = this.posY + Math.sin(this.angulo) * this.radio;

  this.radio += this.incremento;
  this.transparencia -= 0.01;

  if(this.transparencia <= 0.1){
    this.activo = false;
  }

  ctx.restore();

}

//////////////////PROTOTIPOS////////////////////

//JSON Javascript Object Notation

var player = {
  x: 591,
  y: 606,
  width: 30,
  height: 30,
  color: "#ECA400",
  velocidad: 4,
  velX: 0,
  velY: 0,
  saltando: false,
  aterrizando: false,
  activo: true,
  px: 0,
  py: 0,
  estado: 1
}

////////////codigo plataformas///////

function dibujarPiso(){
  ctx.fillRect(piso[7].x,piso[7].y,piso[7].width,piso[7].height);
}

var piso = [

  {
    //aqui baje el eje en Y
    //izquierda arriba
    x: 207,
    y: 160,
    width: 140,
    height: 22
  },

  {
    //arriba centro
    x: 474,
    y: 100,
    width: 276,
    height: 37
  },

  {
    //aqui baje el eje en Y
    //arriba derecha
    x: 855,
    y: 160,
    width: 140,
    height: 22
  },

  {

    x: 0,
    y: 352,
    width: 275,
    height: 37
  },

  {
    x: 925,
    y: 352,
    width: 275,
    height: 37
  },

  {
    x: 1065,
    y: 246,
    width: 135,
    height: 20
  },

  {
    x: 0,
    y: 246,
    width: 135,
    height: 20
  },

  {

    x: 405,
    y: 457,
    width: 415,
    height: 37
  },

  {
    x: 0,
    y: 665,
    width: 415,
    height: 20
  },

  {
    x: 820,
    y: 665,
    width: 380,
    height: 20
  },

  {
    x: 986,
    y: 528,
    width: 110,
    height: 40
  },

  {
    x: 0,
    y: 488,
    width: 137,
    height: 40
  },

  {
    x: 150,
    y: 570,
    width: 105,
    height: 40
  },

  {
    x: 509,
    y: 662,
    width: 70,
    height: 20
  },

  {
    x: 646,
    y: 662,
    width: 70,
    height: 20
  },

  {
    x: 575,
    y: 638,
    width: 72,
    height: 20
  },

  {
    x: 577,
    y: 255,
    width: 72,
    height: 20
  },

  {
    x: 403,
    y: 255,
    width: 72,
    height: 20
  },

  {
    x: 749,
    y: 255,
    width: 72,
    height: 20
  }

]

var pisoA = {

  x: 295,
  y: 500,
  width: 68,
  height: 64
}


var pisoB = {
  x: 870,
  y: 510,
  width: 68,
  height: 64
};

var keys = [];

function iniciarAPP() {
  //asegurarme de cargar canvas y el CTX
  canvas = document.getElementById('miCanvas');
  ctx = canvas.getContext('2d');
  //console.log(canvas);
  //console.log(ctx);

  //Listeners para eventos de teclado

  document.addEventListener('keydown', function(e) {
    keys[e.keyCode] = true;
  });

  document.addEventListener('keyup', function(e) {
    keys[e.keyCode] = false;
  });

  //cargar generar la ruta de cada IMG
  img_cadenas.src = 'img/cadenas.png';
  img_tubos.src = 'img/tubos.png';
  img_plataforma.src = 'img/plataforma.png';
  img_personaje.src = 'img/personajePatronSheet.png';
  img_plat.src = 'img/plat.png';
  img_arma1.src = 'img/arma1.png';
  img_arma2.src = 'img/arma2.png';
  img_bala.src = 'img/bala.png';
  img_puas.src = 'img/puas.png';
  img_gameOver.src = 'img/gameOver.png';
  img_logoItsco.src = 'img/logoItsco.png';
  img_palVida.src = 'img/palabraVida.png';
  img_Vidas.src = 'img/vida.png';
  img_Enemigo.src = 'img/enemigo.png';
  img_Winner.src = 'img/winner.png';

  //oyente para saber q las img estan cargadas

  img_cadenas.addEventListener('load', verCarga);
  img_tubos.addEventListener('load', verCarga);
  img_plataforma.addEventListener('load', verCarga);
  img_personaje.addEventListener('load', verCarga);
  img_plat.addEventListener('load', verCarga);
  img_arma1.addEventListener('load', verCarga);
  img_bala.addEventListener('load', verCarga);
  img_arma2.addEventListener('load', verCarga);
  img_puas.addEventListener('load', verCarga);
  img_gameOver.addEventListener('load', verCarga);
  img_logoItsco.addEventListener('load', verCarga);
  img_palVida.addEventListener('load', verCarga);
  img_Vidas.addEventListener('load', verCarga);
  img_Enemigo.addEventListener('load', verCarga);
  img_Winner.addEventListener('load', verCarga);

  //document.getElementsByClassName('reiniciar').style = ".mostrar";

  ///////////////////AUDIOOOOOOOOOOOOO///////////////////
    
    
  //calculo los valores iniciales

  nz1 = Math.floor(Math.random() * 3);
  nz2 = Math.floor(Math.random() * 2);
  nz3 = Math.floor(Math.random() * 2);
  //console.log(nz1, nz2, nz3);

  coordenada1 = zona1[nz1].x + Math.floor(Math.random()*zona1[nz1].width-50);
}

var n = 0;

function verCarga() {
    
  n++
  //console.log(n);
  if (n == nImg && actAudio == true) {
    vectorPuas.push(new PuasA(749, 260, 72, 20));
    vectorPuas.push(new PuasB(577, 260, 72, 20));
    vectorPuas.push(new PuasA(403, 260, 72, 20));
    //antes de llamar a la funcion main coloco las puas
    MAIN();
  }

}


function MAIN() {
  //borrar canvas
  ctx.clearRect(0, 0, 1200, 720);

  //remover Obj Dinamicos
  remover();

  //dibujo de background

  dibujarC1();
  dibujarC2();
  dibujarC3();

  //dibujoPlataformas Dinamicas
  dibujoPlataforma1();
  dibujoPlataforma2();

  //colocar armas
  dibujarArmas();

  //Disparos Armas
  colocarDisparos();
  dibujarDisparos();

  ///Puas
  dibujarPuas();
  dibujarJugador();

  pisoMovible();

  //COLISIONES
  //Personaje vs Balas Armas
  colisionA();
  colisionB();
  colisionC();
  colisionD();

  dibujarExplosion();

  //console.log(pisoDinamico, pisoDinamico.length);
  //dibujo de palabras

  dibujarPalabras();

  //dibujo de las vidas personaje
  dibujarVidas();

  //colocar logos
  dibujarMedalla();

  //dibujarPiso();
  //dibujarPiso();

  //enemigo
  dibujarEnemigo();

  gameOver();

  if(activo){
    requestAnimationFrame(MAIN);
  }
}

///////////////////GAME OVER///////////////////

function gameOver(){
  if(!activo){
    ctx.drawImage(img_gameOver,0,0);
  }
}

var zona1 = [
  {
    //aqui baje el eje en Y
    //izquierda arriba
    x: 474,
    y: 100,
    width: 276,
    height: 37
  },

  {
    //arriba centro
    x: 474,
    y: 100,
    width: 276,
    height: 37
  },

  {
    //aqui baje el eje en Y
    //arriba derecha
    x: 474,
    y: 100,
    width: 276,
    height: 37
  }
]

var zona3=[
  {

    x: 0,
    y: 352,
    width: 275,
    height: 37
  },

  {
    x: 925,
    y: 352,
    width: 275,
    height: 37
  }
]

var zona2=[
  {
    x: 0,
    y: 665,
    width: 415,
    height: 20
  },

  {
    x: 820,
    y: 665,
    width: 380,
    height: 20
  }
]

var nm = 0;
var medalla = {
  x:0,
  y:0,
  width:0,
  height:0,
  zona:0
}

var nz1 = 0;
var nz2 = 0;
var nz3 = 0;

var coordenada1 = 0;
var coordenada2 = 0;
var coordenada3 = 0;

function dibujarMedalla(){
  medalla.x = coordenada1;
  medalla.y = zona1[nz1].y-50;
  medalla.width = 50;
  medalla.height = 50;

  ctx.drawImage(img_logoItsco,coordenada1,zona1[nz1].y-50);

}

var movEne = 0;
var posEneX = 0;
var posEneY = 0;
var posEneCX = 405;
var posEneCY = 427;
var velEnemigo = 1

var nEne = 0;

var enemigo = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
}

function dibujarEnemigo(){
  /*x: 405,
  y: 457, || 520 x 60
  width: 415,
  height: 37*/
  ctx.drawImage(img_Enemigo,posEneX,posEneY,40,30,posEneCX,posEneCY,40,30);

  enemigo.x = posEneCX;
  enemigo.y = posEneCY;
  enemigo.width = 40;
  enemigo.height = 30;

  nEne++

  if(nEne == 8){
      posEneX += 40;
      nEne = 0;

      if(posEneX >= 300){
        posEneX = 0;
      }

  }

  //movimiento en Canvas
  posEneCX+= velEnemigo
  if(posEneCX >= 780){
    velEnemigo = -velEnemigo
    posEneY = 30
  }
  if(posEneCX <= 405){
    velEnemigo = -velEnemigo
    posEneY = 0
  }

}

//////////dibujo de las vidas en la parte superior

function dibujarVidas(){
  if(vida == 3){
    ctx.drawImage(img_Vidas,140,12);
    ctx.drawImage(img_Vidas,170,12);
    ctx.drawImage(img_Vidas,200,12);
  }

  if(vida == 2){
    ctx.drawImage(img_Vidas,140,12);
    ctx.drawImage(img_Vidas,170,12);
    //ctx.drawImage(img_Vidas,200,12);
  }

  if(vida == 1){
    ctx.drawImage(img_Vidas,140,12);
    //ctx.drawImage(img_Vidas,170,12);
    //ctx.drawImage(img_Vidas,200,12);
  }

  if(vida <= 0){
    activo = false;
  }

}

//dibujar dibujarPalabras

function dibujarPalabras(){
  ctx.drawImage(img_palVida,80,20);
}

///////////PISO MOVIBLE////////////////

function pisoMovible(){

  pisoDinamico = [];

  pisoDinamico[0] = {
    x: vectorPuas[0].x,
    y: vectorPuas[0].y,
    width: vectorPuas[0].width,
    height: vectorPuas[0].height
  };
  pisoDinamico[1] = {
    x: vectorPuas[1].x,
    y: vectorPuas[1].y,
    width: vectorPuas[1].width,
    height: vectorPuas[1].height
  };
  pisoDinamico[2] = {
    x: vectorPuas[2].x,
    y: vectorPuas[2].y,
    width: vectorPuas[2].width,
    height: vectorPuas[2].height
  };
  pisoDinamico[3] = {
    x: 405,
    y: 700,
    width: 105,
    height: 20
  };
  pisoDinamico[4] = {
    x: 715,
    y: 700,
    width: 105,
    height: 20
  };

  //dibujo a ver si sale la asignacion de los cuadrados
/*
  for(var l in pisoDinamico){
    ctx.fillStyle = "red";
    ctx.fillRect(pisoDinamico[l].x, pisoDinamico[l].y, pisoDinamico[l].width, pisoDinamico[l].height);
  }
*/
}

////////////////COLISIONES/////////////

function colisionA() {
  for (var k in vectorBalas) {
    if (colision(player, vectorBalas[k])) {

        vectorBalas[k].activo = false;
        //creo una nueva funcion y le paso el JSON PLAYER
        colocarExplosion(player);
        vida--
    }
  }
}


function colisionB(){
  //meto los cuadros dentro de piso DINAMICOS
  for(var l in pisoDinamico){
    if(colision(player, pisoDinamico[l])){
      player.activo = false;
      colocarExplosion(player);
      vida--
    }
  }
}

function colisionC(){
  //meto los cuadros dentro de piso DINAMICOS

    if(colision(player, enemigo)){
      colocarExplosion(player);
      vida--
    }
    else if(colision(player, medalla)){
      console.log('x fin');
    }
}

function colisionD(){
  if(colision(player, enemigo)){
    colocarExplosion(player);
    vida--
  }
  else if(colision(player, medalla)){
    ctx.drawImage(img_Winner,100 ,50);
      activo = false;
  }
}

function colocarExplosion(player) {

  for (var k = 0; k <= 20; k++) {
    var ang = Math.random() * 360;
    //console.log(ang);
    //console.log(gradosRadianes(ang));
    var rad = gradosRadianes(ang);
    var inc = Math.random()*3;
    vectorExplode.push(new Explosion(player.x + 12, player.y + 14, rad, inc));
  }

}

////////////CONVERTIRGRADOS A RADIANES/////

function gradosRadianes(ang) {

  var radianes = (ang * Math.PI) / 180;
  return radianes;
  //console.log(radianes);

}

///////////////DIBUJO DE EXPLOSIONES///////////

function dibujarExplosion() {

  if (vectorExplode.length > 0) {

    for (var k in vectorExplode) {
      vectorExplode[k].dibujar();
    }

  }

}

////////////REMOVER///////////

function remover() {

  for (var k in vectorBalas) {
    if (vectorBalas[k].activo == false) {

      vectorBalas.splice(k, 1);

    }

  }


  //remover las EXPLOSIONES

  for(var k in vectorExplode){
    if(vectorExplode[k].activo == false){
      vectorExplode.splice(k, 1);
    }
  }

}
//////////////// PUAS ///////////


function dibujarPuas() {
  //console.log(vectorPuas.length);
  for (var i in vectorPuas) {
    vectorPuas[i].dibujar();
  }

}

////////////ARMAS

function dibujarArmas() {
  //armas IZQUIERDA
  ctx.drawImage(img_arma1, 5, 459);
  ctx.drawImage(img_arma1, 5, 322);
  ctx.drawImage(img_arma1, 5, 636);

  //armas DERECHA
  ctx.drawImage(img_arma2, 1115, 215);
  ctx.drawImage(img_arma2, 1070, 498);

}

///////////////DISPAROS/////////////////////

//incrementadoers
var incDis = 0;
var px = 0;
var py = 0;

function colocarDisparos() {
    
  incDis++;
  if (incDis == 60) {
    //console.log('disparando');
    //pos Aleatoria
      
    var ar = Math.floor(Math.random() * 5);
      
    if (ar == 0) {
      px = 5
      py = 455
      vectorBalas.push(new Bala(px, py, 10));
    }

    if (ar == 1) {
      px = 5
      py = 322
      vectorBalas.push(new Bala(px, py, 10));
    }

    if (ar == 2) {
      px = 1115
      py = 215
      vectorBalas.push(new Bala(px, py, -10));
    }

    if (ar == 3) {
      px = 52
      py = 636
      vectorBalas.push(new Bala(px, py, 10));
    }

    if (ar == 4) {
      px = 1070
      py = 498
      vectorBalas.push(new Bala(px, py, -10));
    }

      disparo.play();
    incDis = 0;
  }


}


function dibujarDisparos() {
  for (var i in vectorBalas) {
    var bala = vectorBalas[i];
    bala.dibujar();
  }
}

////////////PLATAFORMAS//////////

var plat1 = {
  x: 295,
  y: 510,
  width: 70,
  height: 65,
  posX: 295,
  posY: 510,
  angulo: 0,
  radio: 90
}

var plat2 = {
  x: 870,
  y: 510,
  width: 70,
  height: 65,
  posX: 870,
  posY: 510,
  angulo: 0,
  radio: 90
}

function dibujoPlataforma1() {
  //ctx.fillStyle = "#00ff6c";
  ctx.drawImage(img_plat, 0, 0, 70, 65, plat1.x, plat1.y, plat1.width, plat1.height)

  //ctx.fillRect(plat1.x,plat1.y,plat1.width,plat1.height);

  //plat1.x = plat1.posX + Math.cos(plat1.angulo) * plat1.radio;
  plat1.y = plat1.posY + Math.sin(plat1.angulo) * plat1.radio;

  pisoA.y = plat1.y;
  //ctx.fillRect(pisoA.x, pisoA.y, pisoA.width, pisoA.height);

  plat1.angulo -= 0.02;

  //Dentro de la plataforma mando a llamar a la funcion nuevamente
  var dir = colCheck(player, plat1);

  if (dir === "l" || dir === "r") {
    player.velX = 0;
    player.saltando = false;
  } else if (dir === "b") {
    player.aterrizando = true;
    player.saltando = false;
  } else if (dir === "t") {
    player.velY *= -1;
  }

  //si existe colision le hago quedarse en cero

  if (player.aterrizando) {
    player.velY = 0;
  }


}


function dibujoPlataforma2() {
  //ctx.fillStyle = "#00ff6c";
  ctx.drawImage(img_plat, 0, 0, 70, 65, plat2.x, plat2.y, plat2.width, plat2.height)

  //ctx.fillRect(plat1.x,plat1.y,plat1.width,plat1.height);

  //plat1.x = plat1.posX + Math.cos(plat1.angulo) * plat1.radio;
  plat2.y = plat2.posY + Math.sin(plat2.angulo) * plat2.radio;

  pisoB.y = plat2.y;
  //ctx.fillRect(pisoB.x, pisoB.y, pisoB.width, pisoB.height);

  plat2.angulo += 0.02;

  //Dentro de la plataforma mando a llamar a la funcion nuevamente
  var dir = colCheck(player, plat2);

  if (dir === "l" || dir === "r") {
    player.velX = 0;
    player.saltando = false;
  } else if (dir === "b") {
    player.aterrizando = true;
    player.saltando = false;
  } else if (dir === "t") {
    player.velY *= -1;
  }

  //si existe colision le hago quedarse en cero

  if (player.aterrizando) {
    player.velY = 0;
  }

}


////////////FUNCIONES BACK////////

var calculo1 = -200;
var calculo2 = -200;

function dibujarC3() {
  ctx.drawImage(img_plataforma, -200, 0);
}

function dibujarC2() {

  calculo2 = -(player.x * 100) / 600;
  ctx.drawImage(img_tubos, calculo2, 0);
}


function dibujarC1() {
  //console.log("dibujando");

  calculo1 = -(player.x * 200) / 600

  ctx.drawImage(img_cadenas, calculo1, 0);

}

var control = 0;

///////////////FUNCIONES////////////////////////////////////

function dibujarJugador() {
//doy un booleano a jugador si el vive todo vale si no marcha
/*if(player.activo){

}
*/
    
    
  //VERIFICACION DE TECLAS
  if (keys[39]) {
    if (player.velX < player.velocidad) {
      player.velX++;
        disparo.play();
    }
    player.estado = 1;
  }

  if (keys[37]) {
    if (player.velX > -player.velocidad) {
      player.velX--;
    }
    player.estado = 2;
  }

  if (keys[38]) {
    if (!player.saltando && player.aterrizando) {

      player.saltando = true;
      player.aterrizando = false;

      player.velY = -player.velocidad * 2;
    }
  }


  //Generamos el movimiento
  //antes de eso hago la friccion
  //EJE X
  player.velX *= friccion;
  player.x += player.velX;

  //ejecuto el movimiento en el EJE de las Y
  //añado una gravedad
  player.velY += gravedad;
  player.y += player.velY;

  /////////////////AQUI//////////////////

  player.aterrizando = false;

  for (var i = 0; i < piso.length; i++) {
    /*ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.fillRect(piso[i].x, piso[i].y, piso[i].width, piso[i].height);
    ctx.rect(piso[i].x, piso[i].y, piso[i].width, piso[i].height);
*/
    var dir = colCheck(player, piso[i]);
    //var dir = colCheck(player, plat1);
    //var dir = colCheck(player, plat2);

    if (dir === "l" || dir === "r") {
      player.velX = 0;
      player.saltando = false;
    } else if (dir === "b") {
      player.aterrizando = true;
      player.saltando = false;
    } else if (dir === "t") {
      player.velY *= -1;
    }

  }


  if (player.aterrizando) {
    player.velY = 0;
  }

  //tx.fillStyle = player.color;
  //1 img
  //4 x-x-w-h patron
  //4 x-y-w-h canvas

  switch (player.estado) {
    case 1:
      player.py = 0;
      control++;

      if (control == 5) {
        player.px += 30;

        if (player.px > 180) {
          player.px = 0;
        }

        control = 0;
      }
      break;
    case 2:

      player.py = 30;

      control++;

      if (control == 5) {
        player.px += 30;

        if (player.px > 180) {
          player.px = 0;
        }

        control = 0;
      }


      break;
    case 3:

      break;

    default:
      break;
  }

  ctx.drawImage(img_personaje, player.px, player.py, 30, 30, player.x, player.y, player.width, player.height);

  //ctx.fillRect(player.x, player.y, player.width, player.height);

}

////////////////////COLISIONES/////////////////////


function colCheck(shapeA, shapeB) {
  // get the vectors to check against
  var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
    vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
    // add the half widths and half heights of the objects
    hWidths = (shapeA.width / 2) + (shapeB.width / 2),
    hHeights = (shapeA.height / 2) + (shapeB.height / 2),
    colDir = null;

  // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
  if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
    // figures out on which side we are colliding (top, bottom, left, or right)
    var oX = hWidths - Math.abs(vX),
      oY = hHeights - Math.abs(vY);
    if (oX >= oY) {
      if (vY > 0) {
        colDir = "t";
        shapeA.y += oY;
      } else {
        colDir = "b";
        shapeA.y -= oY;
      }
    } else {
      if (vX > 0) {
        colDir = "l";
        shapeA.x += oX;
      } else {
        colDir = "r";
        shapeA.x -= oX;
      }
    }
  }
  return colDir;
}


function colision(shapeA, shapeB) {
  if ((shapeA.x + shapeA.width >= shapeB.x) && (shapeA.x <= shapeB.x + shapeB.width)) {
    if ((shapeA.y + shapeA.height >= shapeB.y) && (shapeA.y <= shapeB.y + shapeB.height)) {
      return true;
    }
  }

  return false;
}

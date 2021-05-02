//player objeto ==================================
var Player = function()
{
  this.x = 0;
  this.y = 0;
  this.corrente_sprite = NaN;
  this.tamanho = 200;
}

Player.prototype.preload_plr = function()
{
  this.corrente_sprite = loadImage("./assets/Idle (1).png");
}

Player.prototype.draw = function()
{
  image(this.corrente_sprite, this.x, this.y);
}

Player.prototype.logica = function()
{
  if (keyIsDown(LEFT_ARROW)) {
    this.x -= 2;
  }

  if (keyIsDown(RIGHT_ARROW))
  {
    this.x += 2;
  }

  if (keyIsDown(UP_ARROW))
  {
  }

  if (keyIsDown(DOWN_ARROW))
  {
  }
  
}

Player.prototype.loop = function()
{
  this.logica();
  this.draw();
}

var player = new Player();
//------------------------------------------------

// Player estado ==============================
let image_atual = 1;
let idle = [];
let run = [];
let jump = [];
let walk = [];
let dead = [];
let velocidade_morrer = 80;
let velocidade_caminhar = 50;
let velocidade_pular = 50;
let velocidade_correr = 50;
let velocidade_idle = 50;
let sprites_animacao = 1;
let dead_estado = false;
let walk_estado = false;
let run_estado = false;
let idle_estado = false;
let jump_estado = false;
let tamanho = 120;
let x = 0;
let y = 200;

function preload_player()
{
  for( i = 1; i <= 16; i++)
  {
    idle[i] = loadImage("./assets/Idle (" + i + ").png");
  }
  for( i = 1; i <= 20; i++)
  {
    run[i] = loadImage("./assets/Run (" + i + ").png");
  }
  for( i = 1; i <= 30; i++)
  {
    jump[i] = loadImage("./assets/Jump (" + i + ").png");
  }
  for( i = 1; i <= 20; i++)
  {
    walk[i] = loadImage("./assets/Walk (" + i + ").png");
  }
  for( i = 1; i <= 30; i++)
  {
    dead[i] = loadImage("./assets/Dead (" + i + ").png");
  }
}

let local = NaN;
let animacao_pular = NaN;

function draw_player()
{
  try
  {
    if (run_estado)
    {
      image(run[image_atual], x, y, tamanho, tamanho);
    }
    else if(jump_estado)
    {
      image(jump[image_atual], x, y, tamanho, tamanho);
      if(image_atual <= 15)
      {
        y--;
      }
      else
      {
        y++;
      }
    }
    else if(walk_estado)
      image(walk[image_atual], x, y, tamanho, tamanho);
    else if(dead_estado)
      image(dead[image_atual], x, y, tamanho, tamanho);
    else
      image(idle[image_atual], x, y, tamanho, tamanho);
  }
  catch(error)
  {
    //console.log(error);
  }
}

function loop_player()
{
  if (keyIsDown(LEFT_ARROW)) {
    x -= 1;
  }

  if (keyIsDown(RIGHT_ARROW))
  {
    x += 2;
    if(!run_estado && !jump_estado)correr();
  }
  else if(!idle_estado && !jump_estado)
    aguardar();

  if (keyIsDown(UP_ARROW)) {
    if(!jump_estado)pular();
  }

  if (keyIsDown(DOWN_ARROW)) {
    y += 5;
  }
}

function correr()
{
  clearInterval(local);
  dead_estado = false;
  walk_estado = false;
  run_estado = true;
  idle_estado = false;
  jump_estado = false;
  sprites_animacao = 21;
  init_acao(atualizar_logica,velocidade_correr);
}

function aguardar()
{
  clearInterval(local);
  dead_estado = false;
  walk_estado = false;
  run_estado = false;
  idle_estado = true;
  jump_estado = false;
  sprites_animacao = 16;
  init_acao(atualizar_logica,velocidade_idle);
}

function pular()
{
  clearInterval(animacao_pular);
  dead_estado = false;
  walk_estado = false;
  run_estado = false;
  idle_estado = false;
  jump_estado = true;
  sprites_animacao = 30;
  init_acao(atualizar_logica,velocidade_pular);
}

function pular_player()
{
  
}

function andar()
{
  clearInterval(local);
  dead_estado = false;
  walk_estado = true;
  run_estado = false;
  idle_estado = false;
  jump_estado = false;
  sprites_animacao = 20;
  init_acao(atualizar_logica,velocidade_caminhar);
}

function morrer()
{
  clearInterval(local);
  dead_estado = true;
  walk_estado = false;
  run_estado = false;
  idle_estado = false;
  jump_estado = false;
  sprites_animacao = 30;
  init_acao(atualizar_logica,velocidade_morrer);
}

function init_acao(handle, tempo)
{
  local = setInterval(handle, tempo);
}

function atualizar_logica()
{
  image_atual ++;
  if(image_atual >= sprites_animacao)
  {
    image_atual = 1;
  }
}

aguardar();

//---------------------------------------------
// Game estado geral ==========================
function preload()
{
  preload_player();
  player.preload_plr();
}
function setup()
{
  createCanvas(windowWidth, windowHeight);
  background(255);
}

function draw()
{ 
  clear();
  background(100);
  loop_player();
  draw_player();
  player.loop();
}

// --------------------------------------------
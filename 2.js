document.querySelector('img').style.display = "none"
document.getElementById('try').style.display = "none"
var canvas = document.getElementById('canvas');
canvas.style.display = "none"
var ctx = canvas.getContext('2d');

document.getElementById('start').addEventListener('click',()=>{
    canvas.style.display = "block"
    document.getElementById('start').style.display = "none"
    document.querySelector('img').style.display = "block"

canvas.width = window.innerWidth -40;


const rectangle = {
    x:20,
    y:canvas.height/2 - 40,
    dx:2
}
const rectangle1 = {
    x:10,
    y:canvas.height/2 ,
    dx:0.1
}
const rectangle2 = {
    x:10,
    y:canvas.height/4,
    dx:5
}
console.log(canvas.width)

function player(){

    ctx.fillStyle = "pink"
ctx.fillRect(10,canvas.height/4 + 50,canvas.width-20,(canvas.height/2 -canvas.height/4  ))
    ctx.fillStyle = 'blue';
ctx.fillRect(rectangle.x,rectangle.y,40,40);
ctx.fillStyle = 'black'
ctx.fillRect(rectangle1.x,rectangle1.y,canvas.width-20,50);

ctx.fillStyle = 'black'
ctx.fillRect(rectangle2.x,rectangle2.y,canvas.width-20,50);


}


class holes{
    constructor(x,y){
        this.x =x;
        this.y = y;
        this.width = 50;
        this.height = 50;
    }

    draw(){
       ctx.beginPath()
       ctx.fillStyle ="rgb(243, 241, 239)"
       ctx.fillRect(this.x,this.y,this.width,this.height)
       ctx.fill()
    }
}
let roofholes = []
let enemy = []
var rd = Math.random()
console.log(rd)
let some

//  function runagain(){

if(rd<0.5){
     some=  Math.floor(rd*(canvas.width-150) + 100)
     console.log(some)
}
else{
    some=  Math.floor(rd*((canvas.width/2)-150) )
    console.log(some)
}
   enemy.push( new holes(some,canvas.height/2));

   enemy.push(new holes(some+400,canvas.height/2))
   
   enemy.push(new holes(some+700,canvas.height/2))
   
if(rd>0.3 && rd <0.5 ){
    roofholes.push(new holes(some-150,canvas.height/4))
    roofholes.push(new holes(some+200,canvas.height/4))
    roofholes.push(new holes(some+500,canvas.height/4))
}
else{
    roofholes.push(new holes(some+200,canvas.height/4))
    roofholes.push(new holes(some+500,canvas.height/4))
}

 
var dist = canvas.height/2 -canvas.height/4 - 40;
console.log(dist)
    
let animateid;


function increment(){

    ctx.clearRect(0,0,canvas.width,canvas.height)
    player();
    // runagain()
    rectangle.x += rectangle.dx;

    animateid =requestAnimationFrame(increment);

   enemy.forEach(eny =>{
       eny.draw()
       let dist1 = eny.x - rectangle.x -40
    let dist2 = eny.x - rectangle.x 
    let hi = eny.y 
    if(dist1 <1 && dist2 > -50 && rectangle.y +40 == hi){
        cancelAnimationFrame(animateid)
        document.querySelector('img').style.display = "none"
        document.getElementById('try').style.display = "block"
    }
    else{
        score += 50;
        document.getElementById('score').innerText = score
    }
    let bi = eny.x
   })

roofholes.forEach(roof =>{
    roof.draw()
    let dist3 = roof.x - rectangle.x -40
    let dist4 = roof.x - rectangle.x 
    let pi = roof.y +50
    if(dist3 <1 && dist4 > -50 && rectangle.y  == pi){
        cancelAnimationFrame(animateid)
        document.querySelector('img').style.display = "none"
        document.getElementById('try').style.display = "block"
    }
    if(rectangle.x > roof.x){
        
    }
    let hki = roof.x
})



if(rectangle.x+60 > canvas.width){
    rectangle.x = rectangle.dx
    // roofholes.forEach(roof =>{
    //     roof.x=  Math.round(Math.random()*(canvas.width-50))
    // })
    // enemy.forEach(eny =>{
    //     eny.x=  Math.round(Math.random()*(canvas.width-50))
    // }) 

    rd = Math.random()
    console.log(rd)
    
    if(rd<0.5){
        some=  Math.floor(rd*(canvas.width-150) + 100)
        console.log(some)
   }
   else{
       some=  Math.floor(rd*((canvas.width/2)-150) )
       console.log(some)
   }
      enemy[0].x=some
   
      enemy[1].x =some+400
      
      enemy[2].x =some+700
      
   if(rd>0.3 && rd <0.5 ){
       roofholes[0].x = some-150
       roofholes[1].x = some+200
       roofholes[2].x = some+500
   }
   else{
    roofholes[0].x = some+200
    roofholes[1].x = some+500
   }
     
}
    
}

increment();
var score =0 

addEventListener('click',()=>{
    if(rectangle.y ==canvas.height/2 -40 ){
    rectangle.y = rectangle.y-60;
    console.log(rectangle.y)
    }
    else if(rectangle.y ==canvas.height/4 +50){
          rectangle.y = rectangle.y+60;
          console.log(rectangle.y)
    }
})

addEventListener('spacebar',()=>{
    if(rectangle.y ==canvas.height/2 -40 ){
    rectangle.y = rectangle.y-60;
    console.log(rectangle.y)
    }
    else if(rectangle.y ==canvas.height/4 +50){
          rectangle.y = rectangle.y+60;
          console.log(rectangle.y)
    }
})

})
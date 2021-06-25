var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

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
const holes1 = {
    x: Math.floor(Math.random()*(canvas.width-50)) ,
    y: canvas.height/2
}
const holes2 = {
    x: Math.floor(Math.random()*(canvas.width-50)),
    y: canvas.height/4
}
function player(){
    ctx.fillStyle = 'blue';
ctx.fillRect(rectangle.x,rectangle.y,40,40);
ctx.fillStyle = 'black'
ctx.fillRect(rectangle1.x,rectangle1.y,canvas.width-20,50);

ctx.fillStyle = 'black'
ctx.fillRect(rectangle2.x,rectangle2.y,canvas.width-20,50);
}

console.log(holes1.x)
    console.log(holes2.x)

// class holes{
//     constructor(x,y){
//         this.x =x;
//         this.y = y;
//         this.width = 50;
//         this.height = 50;
//     }

//     draw(){
//        ctx.beginPath()
//        ctx.fillRect(this.x,this.y,this.width,this.height)
//        ctx.fillStyle ="rgb(243, 241, 239)"
//        ctx.fill()
//     }
// }
// var del1 = Math.floor(Math.random() *  canvas.width-50)+100
// console.log(del1)
// var del2 = Math.floor(Math.random() *  canvas.width-50)+100
// player()
var dist = canvas.height/2 -canvas.height/4 - 40;
console.log(dist)

let animateid;
function increment(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    player();
    rectangle.x += rectangle.dx;

     
    if(rectangle.x+60 > canvas.width){
        rectangle.x = rectangle.dx
        holes1.x =  Math.floor(Math.random()*(canvas.width-50))
        holes2.x = Math.floor(Math.random()*(canvas.width-50))
    }
    

    
    animateid =requestAnimationFrame(increment);

     
     ctx.fillStyle = "rgb(243, 241, 239)"
    ctx.fillRect(holes1.x,holes1.y ,50,50)

    ctx.fillStyle = "rgb(243, 241, 239)"
    ctx.fillRect(holes2.x,holes2.y ,50,50)
    let dist1 = holes1.x - rectangle.x -40
    let dist2 = holes1.x - rectangle.x 

    let dist3 = holes2.x - rectangle.x -40
    let dist4 = holes2.x - rectangle.x 
    //console.log(dist3)
    let hi = holes1.y 
    let pi = holes2.y +50
    //console.log(pi)

    if(dist1 <1 && dist2 > -50 && rectangle.y +40 == hi){
        cancelAnimationFrame(animateid)
    }

    if(dist3 <1 && dist4 > -50 && rectangle.y  == pi){
        cancelAnimationFrame(animateid)
    }
}

// holeenimies = []
// function enimies(){

//     setInterval(()=>{
//      const x =Math.floor(Math.random() *  canvas.width-50)+100
//      const y = canvas.height/2
     
//     holeenimies.push(new holes(x,y))
//     console.log('go')
//     },1000)

// }
increment();
//enimies()


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


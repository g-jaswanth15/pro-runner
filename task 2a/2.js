document.querySelector('img').style.display = "none"
document.getElementById('try').style.display = "none"
document.getElementById('reload').style.display = "none"
document.getElementById('tryagain').style.display = "none"
document.getElementById('score').style.display = "none"
document.getElementById('highscore').style.display = "none"
var canvas = document.getElementById('canvas');
canvas.style.display = "none"
var ctx = canvas.getContext('2d');
var run = document.getElementById("run")
var jump = document.getElementById("jump")
var power = document.getElementById("power")
var gameover = document.getElementById("gameover")
document.getElementById('start').addEventListener('click',()=>{
    document.querySelector("ul").style.display ="none"
    canvas.style.display = "block"
    document.getElementById('start').style.display = "none"
    document.querySelector('img').style.display = "block"

canvas.width = window.innerWidth -40;

document.getElementById('reload').style.display = "block"
document.getElementById('reload').addEventListener('click',()=>{
    window.location.reload(true)
})

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

var highscore = localStorage.getItem("best")

    var bestscore = highscore

function player(){

    ctx.fillStyle = "pink"
    ctx.fillRect(10,canvas.height/4 + 50,canvas.width-20,(canvas.height/2 -canvas.height/4  ))
    ctx.fillStyle = 'blue';
    ctx.fillRect(rectangle.x,rectangle.y,40,40);
    ctx.fillStyle = 'black'
    ctx.fillRect(rectangle1.x,rectangle1.y,canvas.width-20,50);

    ctx.fillStyle = 'black'
    ctx.fillRect(rectangle2.x,rectangle2.y,canvas.width-20,50);

    ctx.fillStyle = "rgb(79, 9, 94)"
    ctx.font = "bold 40px Arial"
    ctx.fillText(" SCORE : ",canvas.width-290,100)
    ctx.fillText( (Math.floor(score/10)),canvas.width-100,100)
    ctx.fillText("THE BEST :",40,100)
    ctx.fillText(bestscore,270,100)

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
let some

if(rd<0.5){
     some=  Math.floor(rd*(canvas.width-150) + 100)
}
else{
    some=  Math.floor(rd*((canvas.width/2)-150) )
}
   enemy.push( new holes(some,canvas.height/2 ));

   enemy.push(new holes(some+400,canvas.height/2))
   
   enemy.push(new holes(some+700,canvas.height/2))
   
if(rd>0.3 && rd <0.5 ){
    roofholes.push(new holes(some-150,canvas.height/4))
    roofholes.push(new holes(some+200,canvas.height/4))
    roofholes.push(new holes(some+500,canvas.height/4))
}
else{
    roofholes.push(new holes(some+200,canvas.height/4))
    roofholes.push(new holes(some+550,canvas.height/4))
}
    
let animateid;

var score = 0;
function increment(){

    run.play()
    run.loop = true
    
    ctx.clearRect(0,0,canvas.width,canvas.height)
    player();
    // runagain()
    rectangle.x += rectangle.dx;
    score += rectangle.dx
    animateid =requestAnimationFrame(increment);

   enemy.forEach(eny =>{
       eny.draw()
       let dist1 = eny.x - rectangle.x -40
        let dist2 = eny.x - rectangle.x 
        let hi = eny.y 
    if(dist1 <1 && dist2 > -50 && rectangle.y +40 == hi){
        stopping()
    }
})

roofholes.forEach(roof =>{
    roof.draw()
    let dist3 = roof.x - rectangle.x -40
    let dist4 = roof.x - rectangle.x 
    let pi = roof.y +50
    if(dist3 <1 && dist4 > -50 && rectangle.y == pi ){
        stopping()
    }
})

function stopping(){
    cancelAnimationFrame(animateid)
        gameover.play()
        jump.pause()
        power.pause()
        run.pause()
        document.querySelector('img').style.display = "none"
        document.getElementById('try').style.display = "block"
        document.getElementById('score').style.display = "block"
        document.getElementById('highscore').style.display = "block"
        var totalscore = Math.round(score /10)  ;
        document.getElementById('score').innerText = "🎉 SCORE :" + totalscore + "🎉"
        document.getElementById('tryagain').style.display = "block"
        document.getElementById('tryagain').addEventListener('click',()=>{
         window.location.reload(true)
        })
        canvas.style.display = "none"
        
        if(localStorage.getItem("best") == null){
           localStorage.setItem("best",totalscore)
           var highscore = localStorage.getItem("best")
            document.getElementById('highscore').innerText = "🔥BEST :" + highscore + "🔥"
           }
        else if(totalscore > localStorage.getItem('best')){
            localStorage.setItem("best",totalscore)
            var highscore = localStorage.getItem("best")
            document.getElementById('highscore').innerText = "🔥BEST :" + highscore + "🔥"
        }
         else{
            var highscore = localStorage.getItem("best")
        document.getElementById('highscore').innerText ="🔥BEST  :" +  highscore + "🔥"
        }
}
if(rectangle.x+60 > canvas.width){
    rectangle.x = rectangle.dx

    rd = Math.random()
    
    if(rd<0.5){
        some=  Math.floor(rd*(canvas.width-150) + 100)
   }
   else{
       some=  Math.floor(rd*((canvas.width/2)-150) )
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
    roofholes[1].x = some+600
   }
     
}
    
}

increment();

addEventListener('click',()=>{
    jump.play()
    if(rectangle.y ==canvas.height/2 -40 ){
    rectangle.y = rectangle.y-60;
    }
    else if(rectangle.y ==canvas.height/4 +50){
          rectangle.y = rectangle.y+60;
    }
})

document.addEventListener("keyup",event =>{
    jump.play()
    if(event.keyCode == 32){
        if(rectangle.y ==canvas.height/2 -40 ){
        rectangle.y = rectangle.y-60;
        }
        else if(rectangle.y ==canvas.height/4 +50){
            rectangle.y = rectangle.y+60;
        }
    }
})

})

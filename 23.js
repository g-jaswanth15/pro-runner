document.querySelector('img').style.display = "none"
document.getElementById('try').style.display = "none"
document.getElementById('reload').style.display = "none"
document.getElementById('tryagain').style.display = "none"
document.getElementById('score').style.display = "none"
document.getElementById('highscore').style.display = "none"
var canvas = document.getElementById('canvas');
//canvas.style.display = "none"
var ctx = canvas.getContext('2d');
var run = document.getElementById("run")
var jump = document.getElementById("jump")
var power = document.getElementById("power")
var gameover = document.getElementById("gameover")
document.getElementById('start').addEventListener('click',()=>{
    canvas.style.display = "block"
    document.getElementById('start').style.display = "none"
    document.querySelector('img').style.display = "block"
canvas.width = window.innerWidth -40;

document.getElementById('reload').style.display = "block"
document.getElementById('reload').addEventListener('click',()=>{
    window.location.reload(true)
})

const line1 = {
    x:20,
    y:canvas.height/2 +70,
    dx:2
}

const line2 = {
    y:canvas.height/2 +30,
    dx:2
}

const circle = {
    x:canvas.width+30,
    y:canvas.height/2+50,
    dy:2
}

const rectangle1 = {
    x:10,
    y:canvas.height/2 +70,
    dx:0.1
}
const rectangle2 = {
    x:10,
    y:canvas.height/4,
    dx:5
}
const diamond = {
    y:canvas.height/4+70
}

//var colors = ["#cf1578", "#e8d21d", "#039fbe" ," #b20238"]

var colors = ["red","violet"]

//drawing roof,floor,obstacles,player 

function player(){

    ctx.fillStyle = "pink"
    ctx.fillRect(10,canvas.height/4 + 70,canvas.width-20,(canvas.height/2 +70 -canvas.height/4  ))
            
    ctx.fillStyle = 'black'
    ctx.fillRect(rectangle1.x,rectangle1.y,canvas.width-20,70);
        
    ctx.fillStyle = 'black'
    ctx.fillRect(rectangle2.x,rectangle2.y,canvas.width-20,70);
    
    ctx.beginPath()
    ctx.fillStyle = "rgb(27, 92, 27)"
    ctx.arc(circle.x,circle.y,20,0,2* Math.PI)
    ctx.fill()

    ctx.beginPath()
    ctx.fillStyle = "rgb(0,0,255)"
    ctx.moveTo(line1.x,line1.y)
    ctx.lineTo(line1.x+20,line2.y)
    ctx.lineTo(line1.x+40,line1.y)
    ctx.fill()

    ctx.beginPath()
    ctx.fillStyle = "yellow"
    ctx.moveTo(diamond.x,diamond.y)
    ctx.lineTo(diamond.x-30,diamond.y+30)
    ctx.lineTo(diamond.x,diamond.y+60)
    ctx.lineTo(diamond.x+30,diamond.y+30)
    ctx.closePath()
    ctx.fill()
}

//creating holes

class holes{
    constructor(x,y){
        this.x =x;
        this.y = y;
        this.width = 90;
        this.height = 70;
    }

    draw(){
       ctx.beginPath()
       ctx.fillStyle = "rgb(243, 241, 239)"
       ctx.fillRect(this.x,this.y,this.width,this.height)
       ctx.fill()
    }
}

class powerup{
    constructor(x){
        this.x = x
    }

    draw1(){
        ctx.beginPath()
        ctx.fillStyle = colors[Math.floor(Math.random() *colors.length)]
        ctx.moveTo(this.x,diamond.y)
        ctx.lineTo(this.x-30,diamond.y+30)
        ctx.lineTo(this.x,diamond.y+60)
        ctx.lineTo(this.x+30,diamond.y+30)
        ctx.closePath()
        ctx.fill()
    }
}
let roofholes = []
let enemy = []
var rd = Math.random()
let some

//adusting holes randomly

if(rd<0.5){
     some=  Math.floor(rd*(canvas.width-150) + 100)
}
else{
    some=  Math.floor(rd*((canvas.width/2)-150) )
}
   enemy.push( new holes(some,canvas.height/2 +70 ));

   enemy.push(new holes(some+400,canvas.height/2 +70))
   
   enemy.push(new holes(some+800,canvas.height/2 +70))
   
if(rd>0.3 && rd <0.5 ){
    roofholes.push(new holes(some-200,canvas.height/4))
    roofholes.push(new holes(some+170,canvas.height/4))
    roofholes.push(new holes(some+550,canvas.height/4))
}
else{
    roofholes.push(new holes(some+200,canvas.height/4))
    roofholes.push(new holes(some+600,canvas.height/4))
    roofholes.push(new holes(canvas.width+30,canvas.height/4))
}
    
let powerups = new powerup(canvas.width +30)
var podist
let animateid;
var count =1;
var score = 0;
function increment(){

    run.play()
    run.loop = true

    ctx.clearRect(0,0,canvas.width,canvas.height)
    
    line1.x += line1.dx //for moving the player

    score += line1.dx //creating the score

    //moving the obstacle

    if(circle.y + 20 >= canvas.height/2 +70 || circle.y-20 <=canvas.height/4 +70){
        circle.dy = -circle.dy
    }
    circle.y += circle.dy
 
    animateid =requestAnimationFrame(increment);

    player();

    //collision detection of holes on floor with player

    enemy.forEach(eny =>{
        eny.draw()
        let dist1 = eny.x - line1.x -40
            let dist2 = eny.x - line1.x 
            let hi = eny.y 
        if(dist1 <1 && dist2 > -90 && line1.y == hi){
            stoping()
        }
    })

    //collision detection of holes on roof with player

    roofholes.forEach(roof =>{
        roof.draw()
        let dist3 = roof.x - line1.x -40
        let dist4 = roof.x - line1.x 
        let pi = roof.y +70
        if(dist3 <1 && dist4 > -90 && line1.y == pi){
            stoping()
        }
    })

    //collision detection of obstacles  with player

    var ili = 20*Math.cos(45 * (Math.PI/180))

    let imagedata1 = ctx.getImageData(circle.x,circle.y-20,20,20)
    let imagedata2 = ctx.getImageData(circle.x -20 ,circle.y, 40,40)
    let imagedata3 = ctx.getImageData(circle.x,circle.y,20,20)
    let imagedata4 = ctx.getImageData(circle.x-ili,circle.y-ili,20*Math.SQRT2,20*Math.SQRT2)
    let c1x = line1.x+20 - circle.x
    let c1y = line2.y - circle.y


    red2 = imagedata2.data[0];
    green2 = imagedata2.data[1];
    blue2 = imagedata2.data[2];

    red3 = imagedata3.data[0];
    green3 = imagedata3.data[1];
    blue3 = imagedata3.data[2];

    red1 = imagedata1.data[0]
    green1 = imagedata1.data[1]
    blue1 = imagedata1.data[2]

    red4 = imagedata4.data[0];
    green4 = imagedata4.data[1];
    blue4 = imagedata4.data[2];

    if((red1 == 0 && green1==0 && blue1 == 255) ||
    (red2 == 0 && green2==0&& blue2==255) ||
    (red3 == 0 && green3==0 && blue3 == 255) ||
    (red4 == 0 && green4==0 && blue4 == 255)){
        stoping()
    }
    if((Math.hypot(c1x,c1y) <=20)){
        stoping();
    }
       
    powerups.draw1()

    //for changing the room after completion of room

function something(){
    rd = Math.random()
    if(rd<0.5){
        some=  Math.floor(rd*(canvas.width-150) + 100)
    }
    else{
        some=  Math.floor(rd*((canvas.width/2)-150) )
    }

    enemy[0].x=some

    enemy[1].x =some+400

    enemy[2].x = some+800
    
    if(rd>0.3 && rd <0.5 ){
        roofholes[0].x = some-200
        roofholes[1].x = some+170
        roofholes[2].x = some+550
    }
    else{
        roofholes[0].x = some+200
        roofholes[1].x = some+600
        roofholes[2].x =canvas.width+30
    }
}

//if detection occurs to stop the game
function stoping(){
    cancelAnimationFrame(animateid)
        gameover.play()
        jump.pause()
        power.pause()
        run.pause()
        document.querySelector('img').style.display = "none"
        document.getElementById('try').style.display = "block"
        document.getElementById('score').style.display = "block"
        document.getElementById('highscore').style.display = "block"
        var totalscore = Math.round(score /10) ;
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
        document.getElementById('highscore').innerText ="🔥BEST :" + highscore + "🔥"
        }
}

    if(line1.x+60 > canvas.width){
        line1.x = line1.dx

        powerups.x = canvas.width+30

        var updo = [canvas.height/4+70 , canvas.height/2+10]
        diamond.y = updo[Math.floor(Math.random()*2)]
        count =count+1

        if((count%2) !=0){
            something()
            xdist = canvas.width+30
            circle.x = canvas.width +30   
        }

        else if((count%2) ==0 ){

            let rd1 = (Math.random() *100 )+100

            let rd2 = (Math.random() *100 ) +320

            let rd3 = (Math.random() *100 ) +570

            let rd4 = (Math.random() *100 ) +800            

            var rds = [rd1,rd2,rd3,rd4]

            enemy[1].x = canvas.width +30
            enemy[2].x = canvas.width +30

            roofholes[1].x = canvas.width+30
            roofholes[2].x = canvas.width+30
            let some1 = Math.floor(Math.random()*3 +1)
            circle.x = rds[some1]

            if(some1 ==1){
                enemy[0].x = rds[2]
                roofholes[0].x = rds[0]
                roofholes[1].x = rds[3]
            }
            if(some1 ==2){
                enemy[0].x = rds[0]
                roofholes[0].x = rds[1]
                enemy[1].x = rds[3]
            }
            if(some1 ==3){
                enemy[0].x = rds[1]
                roofholes[0].x = rds[0]
                roofholes[1].x = rds[2]
            }
        }

        if(count>3){
            line1.dx = 3
            var linedx = line1.dx
            circle.dy += 0.5
        }
    }

//for powerup
function speed(){
    power.play()
    run.pause()
    enemy.forEach(eny=>{
        eny.x = canvas.width+30
    })
    roofholes.forEach(hole=>{
        hole.x = canvas.width+30
    }) 
    circle.x = canvas.width+30

    if(line1.x <canvas.width){
        let line1dx = 6
        line1.dx = line1dx
    }
    else{
        line1.dx = 3
    }
}

    if(count%3 == 0){

        if(roofholes[0].x > enemy[0].x){
        var pox = enemy[0].x+110
        }
        else {
            pox = roofholes[0].x+110
        }
        powerups.x = pox
        podist = powerups.x - line1.x -30-28

        if(podist <1 && podist > -60 && line1.y==diamond.y ){
            speed()
        }
        else if(podist <1 && podist > -60 && line1.y==diamond.y+60){
            speed()
        }
    }
}

increment()

//player moving up and down on roof and floor

addEventListener('click',()=>{

    jump.play()
    if(line1.y == canvas.height/2+70){
        line1.y = canvas.height/4 +70;
        line2.y = canvas.height/4 +110
    }
    else if(line1.y == canvas.height/4+70){
        line1.y = canvas.height/2+70;
        line2.y = canvas.height/2 +30
    }
})

addEventListener('keydown',()=>{

    jump.play()
    if(line1.y == canvas.height/2+70){
        line1.y = canvas.height/4 +70;
        line2.y = canvas.height/4 +110
    }
    else if(line1.y == canvas.height/4+70){
        line1.y = canvas.height/2+70;
        line2.y = canvas.height/2 +30
    }
})
    
})



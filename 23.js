document.querySelector('img').style.display = "none"
document.getElementById('try').style.display = "none"
document.getElementById('reload').style.display = "none"
document.getElementById('tryagain').style.display = "none"
document.getElementById('score').style.display = "none"
document.getElementById('highscore').style.display = "none"
var canvas = document.getElementById('canvas');
//canvas.style.display = "none"
var ctx = canvas.getContext('2d');

// document.getElementById('start').addEventListener('click',()=>{
    canvas.style.display = "block"
    document.getElementById('start').style.display = "none"
    document.querySelector('img').style.display = "block"

canvas.width = window.innerWidth -40;

document.getElementById('reload').style.display = "block"
document.getElementById('reload').addEventListener('click',()=>{
    window.location.reload(true)
})

console.log(canvas.width)

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
console.log(canvas.width)


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

//adusting holes randomly

if(rd<0.5){
     some=  Math.floor(rd*(canvas.width-150) + 100)
     console.log(some)
}
else{
    some=  Math.floor(rd*((canvas.width/2)-150) )
    console.log(some)
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
}
    
let animateid;
var count =1;
var score = 0;
function increment(){

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
            cancelAnimationFrame(animateid)
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
            //canvas.style.display = "none"
            
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
    })

    //collision detection of holes on roof with player

    roofholes.forEach(roof =>{
        roof.draw()
        let dist3 = roof.x - line1.x -40
        let dist4 = roof.x - line1.x 
        let pi = roof.y +70
        if(dist3 <1 && dist4 > -90 && line1.y == pi){
            cancelAnimationFrame(animateid)
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
            //canvas.style.display = "none"
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
        
    })


    //collision detection of obstacles  with player

    let imagedata1 = ctx.getImageData(circle.x,circle.y-20,20,20)
    let imagedata2 = ctx.getImageData(circle.x -10 ,circle.y, 20,20)
    let imagedata3 = ctx.getImageData(circle.x,circle.y,20,20)

    red2 = imagedata2.data[0];
    green2 = imagedata2.data[1];
    blue2 = imagedata2.data[2];

    red3 = imagedata3.data[0];
    green3 = imagedata3.data[1];
    blue3 = imagedata3.data[2];

    red1 = imagedata1.data[0]
    green1 = imagedata1.data[1]
    blue1 = imagedata1.data[2]

    if((red1 == 0 && green1==0 && blue1 == 255) ||
    (red2 == 0 && green2==0&& blue2==255) ||
    (red3 == 0 && green3==0 && blue3 == 255)){
        cancelAnimationFrame(animateid)
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
        //canvas.style.display = "none"
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
        
    //for changing the room after completion of room

    if(line1.x+60 > canvas.width){
        line1.x = line1.dx

        count =count+1
        console.log(count)

        if((count%2) !=0){
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
                
                //enemy[2].x =some+700
                
                if(rd>0.3 && rd <0.5 ){
                    roofholes[0].x = some-150
                    //    roofholes[1].x = some+200
                    //    roofholes[2].x = some+500
                }
                else{
                    roofholes[0].x = some+200
                    //roofholes[1].x = some+600
                }
            xdist = canvas.width+30
            circle.x = canvas.width +30   

        }

        else if((count%2) ==0 ){

            let rd1 = (Math.random() *200 )+100

            let rd2 = (Math.random() *150 ) +450

            let rd3 = (Math.random() *150 ) +750

            console.log(rd1)
            console.log(rd2)
            console.log(rd3)

            var rds = [rd1,rd2,rd3]
            
            let some1 = Math.floor(Math.random()*3)
            circle.x = rds[some1]
            console.log(circle.x)

            enemy[1].x = canvas.width+30
            enemy[2].x = canvas.width+30

            roofholes[1].x = canvas.width+30

            if(rd>0.3 && rd<0.5){
                roofholes[2].x = canvas.width+30
            }

            if(some1 ==0){
                enemy[0].x = rds[1]
                roofholes[0].x = rds[2]
                console.log("1")
            }
            if(some1 ==1){
                enemy[0].x = rds[2]
                roofholes[0].x = rds[0]
                console.log("2")
            }
            if(some1 ==2){
                enemy[0].x = rds[0]
                roofholes[0].x = rds[1]
                console.log("3")
            }
        }

        if(count>3){
            line1.dy = 3
            circle.dy += 0.25
        }
        if(count >6){
            line1.dy += 0.5
        }
    }
}

increment()

    //player moving up and down on roof and floor

    addEventListener('click',()=>{

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

        if(line1.y == canvas.height/2+70){
            line1.y = canvas.height/4 +70;
            line2.y = canvas.height/4 +110
        }
        else if(line1.y == canvas.height/4+70){
            line1.y = canvas.height/2+70;
            line2.y = canvas.height/2 +30
        }
    })
// })
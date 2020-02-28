var rod1=document.getElementById("rod1");
var rod2=document.getElementById("rod2");
var ball=document.getElementById("ball");
var score=0;
var moving;

var ballRect=ball.getBoundingClientRect();

var ballSpeedX=1;
var ballSpeedY=1;



winWidth=window.innerWidth;
winHeight=window.innerHeight;

var gameOn=false;


document.addEventListener('keydown',function(event){
    if(event.keyCode==13){
        moving=setInterval(function(){
            ballMovement(gameOn);
        },10);
    }
});

    

function ballMovement(gameOn){
    
        var ballX=ball.getBoundingClientRect().x;
        var ballY=ball.getBoundingClientRect().y;
        var rodRect=rod1.getBoundingClientRect();
        ballX += ballSpeedX;
        ballY += ballSpeedY;
        let ballDia = ballRect.width;
        let rod1X = rod1.getBoundingClientRect().x;
        let rod2X = rod2.getBoundingClientRect().x;
        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';
        if ((ballX + ballDia) > winWidth || ballX < 0) {
            ballSpeedX = -ballSpeedX;
        }
        if (ballY<=rodRect.height) {
            if((ballX>rod1X)&&(ballX<(rod1X+rodRect.width))){
                ballSpeedY=-ballSpeedY;
                score++;
            }
            else{
                gameOn=!gameOn;
                resetGame();
            }
        }
        if ((ballY+ballDia)>(winHeight-rodRect.height)) {
            if((ballX>rod2X)&&(ballX<(rod2X+rodRect.width))){
                ballSpeedY=-ballSpeedY;
                score++;
            }
            else{
                gameOn=!gameOn;
                resetGame();
            }
        
        }

    
}

function resetGame(){
    
    rod1.style.left=50+"%";
    rod2.style.left=50+"%";
    ball.style.left=55+"%";
    ball.style.top=50+"%";
    clearInterval(moving);
    var maxScore=localStorage.getItem("max");
    if(maxScore<(score*100)){
        localStorage.setItem("max",(score*100))
    }
    maxScore=localStorage.getItem("max");
    window.alert("Score is "+(score*100)+" Max score is "+maxScore);
    score=0;

}


document.addEventListener('keypress',function(event){
    moveRod(event);
});

function moveRod(event){
    var key=event.keyCode;
    console.log(key);
    var rodRect=rod1.getBoundingClientRect();
    if((key==65 || key==97) && (rodRect.x)>0){
        console.log((rodRect.x + rodRect.width)>0);
        rod1.style.left=((rodRect.x)-10)+"px";
        rod2.style.left=rod1.style.left;
    }
    if((key==68 || key==100) && (rodRect.x + rodRect.width)<winWidth){
        console.log((rodRect.x + rodRect.width)<winWidth);
        rod1.style.left=((rodRect.x)+10)+"px";
        rod2.style.left=rod1.style.left;
    }

}
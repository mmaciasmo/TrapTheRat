

var racket = document.getElementById("racket");
document.addEventListener("keydown",function (hola) {if ((hola.key =='z')||(hola.key =='Z')||(hola.key =='m')||(hola.key =='M')){jumpdown();racket.style.setProperty("background-color", "red");}else if ((hola.key =='a')||(hola.key =='A')||(hola.key =='k')||(hola.key =='K')) {jumpup();}});
document.addEventListener("keyup",function (hola) {if ((hola.key =='z')||(hola.key =='Z')){jumpdown();racket.style.setProperty("background-color", "red");}else if ((hola.key =='a')||(hola.key =='A')) {jumpup();}});


document.addEventListener("click",function (ola) {if (ola.button == 2){jumpdown();racket.style.setProperty("background-color", "blue");}});






document.getElementById("Div1").addEventListener("mousedown",function () {jumpup();});
document.getElementById("Div1").addEventListener("mouseup",function () {jumpup();});
document.getElementById("Div2").addEventListener("mousedown",function () {jumpdown();});
document.getElementById("Div2").addEventListener("mouseup",function () {jumpdown();});





function jumpdown(){
    if (racket.offsetTop < 490){racket.style.top = (racket.offsetTop) + 30+'px';}
}

function jumpup(){
	if (racket.offsetTop > 30){racket.style.top = (racket.offsetTop) - 30+'px';}
}




var circle = document.getElementById("circle");


let score=0;
let angle;
const d = new Date();
let E = court.offsetWidth/2.5;




let V=1.2; //Speed

if (d.getSeconds()%2 == 0) {angle=d.getSeconds();} else {angle=-(d.getSeconds()+1);}

let degree = Math.PI/(180);

let Vx=Math.cos(degree*angle), Vy=Math.sin(degree*angle);// Initial director cosines.



	//Function that manage the collision between the racket and the ball.
function collision(){

let A,B,C,T,CHx,CHy,CHnx,CHny,Vch,Vchn;


       	if (Math.sqrt(Math.pow(((racket.offsetLeft+38)-(circle.offsetLeft+12)),2)+Math.pow(((racket.offsetTop+38)-(circle.offsetTop+12)),2))<=50) {
       	
       	
       	// The solution of a second degree ecuation to find the exact position of the ball when the collision happened.
        A=Math.pow((0-Vx*V*E),2)+Math.pow((0-Vy*V*E),2);
        B=2*(((racket.offsetLeft+38)-(circle.offsetLeft+12))*(0-Vx*V*E)+2*((racket.offsetTop+38)-(circle.offsetTop+12))*(0-Vy*V*E));
        C=Math.pow(((racket.offsetLeft+38)-(circle.offsetLeft+12)),2)+Math.pow(((racket.offsetTop+38)-(circle.offsetTop+12)),2)-Math.pow((50),2);
        T=(-B-Math.sqrt(Math.pow(B,2)-4*A*C))/(2*A);
        
	// Exact position of the ball in the moment of the collision.
        circle.style.left = (circle.offsetLeft)+Vx*(T)*E*V+'px';
        circle.style.top = (circle.offsetTop)+Vy*(T)*E*V+'px';
        
        
        CHx=((racket.offsetLeft+38)-(circle.offsetLeft+12))/Math.sqrt(Math.pow(((racket.offsetLeft+38)-(circle.offsetLeft+12)),2)+Math.pow(((racket.offsetTop+38)-(circle.offsetTop+12)),2));
        CHy=((racket.offsetTop+38)-(circle.offsetTop+12))/Math.sqrt(Math.pow(((racket.offsetLeft+38)-(circle.offsetLeft+12)),2)+Math.pow(((racket.offsetTop+38)-(circle.offsetTop+12)),2));
        
        CHnx=CHy;
        CHny=-CHx;

        Vch=-(Vx*CHx+Vy*CHy);//Vector speed in the direction of the collision. Note the change of the sense.
        Vchn=(Vx*CHnx+Vy*CHny);//Vector speed normal of the collision. 

        Vx=Vch*CHx+Vchn*CHnx;//After collision new director cosine.
        Vy=Vch*CHy+Vchn*CHny;//After collision new director cosine.

	return 1;
	}
}

	// This function does change the angle of the ball when it is so horizontal or vertical.
function deriv(){
	if ((Math.acos(Vx) < degree*6)&& (Math.acos(Vx) >= 0)){ Vx=Math.cos(degree*6);Vy=Math.sin(degree*6);} 
	if ((Math.acos(Vx) < degree*360)&& (Math.acos(Vx) > degree*354)){ Vx=Math.cos(degree*354);Vy=Math.sin(degree*354);}
	if ((Math.asin(Vy) < degree*100)&& (Math.asin(Vy) >= degree*90)){ Vx=Math.cos(degree*100);Vy=Math.sin(degree*100);} 
	if ((Math.asin(Vy) < degree*90)&& (Math.asin(Vy) > degree*80)){ Vx=Math.cos(degree*80);Vy=Math.sin(degree*80);}
	if ((Math.asin(Vy) < degree*110)&& (Math.asin(Vy) >= degree*100)){ Vx=Math.cos(degree*110);Vy=Math.sin(degree*110);} 
	if ((Math.asin(Vy) < degree*80)&& (Math.asin(Vy) > degree*70)){ Vx=Math.cos(degree*70);Vy=Math.sin(degree*70);}
}



let timer = null;
timer = setInterval(fotograma,30);



let w = window.innerWidth;
let h = window.innerHeight;



function fotograma() {
	
	
	if (collision()==1){score++;}
	if (score >= 500){
	score=0;
	V=V*1.1;
	circle.style.top ='288px';
	circle.style.left= '480px';
	Vx=Math.cos(degree*angle);
	Vy=Math.sin(degree*angle);
	alert("Congratulations!!! You won.  :-)  Try again!! ");
	}
	deriv();	
	if ((circle.offsetLeft < -130) && (score > 10)) {alert("Congratulations your score is "+ score + " :-)  Game over!!");window.close();}
	else if ((circle.offsetLeft < -130) && (score <= 10)) {alert("Sorry your score is "+ score + " :-(  Game over!!");window.close();}
	
	
	
	if (circle.offsetTop < 0){circle.style.top="1px"; Vy=-Vy;}
	if (circle.offsetLeft > 876){circle.style.left="876px";Vx=-Vx;}
	if ((circle.offsetLeft < 0) && (circle.offsetLeft > -40) && ((circle.offsetTop < 88)||(circle.offsetTop > 488))){circle.style.left="1px";Vx=-Vx;}
	if (circle.offsetTop > 575){Vy=-Vy; circle.style.top = "570px"; }
	
	
	

	circle.style.left = circle.offsetLeft+(E*Vx*V*0.033)+'px';
	circle.style.top = circle.offsetTop+(E*Vy*V*0.033)+'px';

	document.getElementById("Score").innerHTML =  'Score:  '+ score;
}

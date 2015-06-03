
var mellomlagring;
var allekort1;
var kortNummer;
var kort;
var antallIkort;
var runde;
var kortknapp;
var kort;
var kortverdi1;
var kortverdi2;
var kortverdi3;
var hoyde;

$(document).ready( function () {
	newGame();
});

$("#kortstokk1").click(function(){
	if ("vibrate" in navigator) {
		navigator.vibrate(10);
	}
	var a = allekort1.length-4;
	if(a>=4){
		$("#kortstokk1").html("<img src ='./pics/kortstokk"+a+".png' height='auto' width='100%'>");
	}
	else{
		$("#kortstokk1").html("");
	}
	mellomlagring=[];
	card();
	runde++;
});
$(".kort").click(function(){
	if ("vibrate" in navigator) {
		navigator.vibrate(10);
	}
	kortknapp= this.id.substring(4,5);
	if(kort[kortknapp-1].length == 0 && typeof mellomlagring[0] != "undefined"){
		kort[kortknapp-1][0]=mellomlagring[0];
		kort[kortknapp-1][1]=mellomlagring[1];
		
			var a = mellomlagring[0];
			var b = mellomlagring[1];
			
			$(this).append("<div id='kort"+kortknapp+"-1' style='position:absolute; top:0px'><img src ='./pics/"+a+b+".png' height='auto' width='100%'></div>");
			
			$("#kort"+mellomlagring[2]+"-"+antallIkort[mellomlagring[2]-1]+"").remove();
			var a = kort[mellomlagring[2]-1].length;
			kort[mellomlagring[2]-1].splice(a-2,2);
			antallIkort[mellomlagring[2]-1]--;

			antallIkort[kortknapp-1]++;
			mellomlagring=[];
	} 
	else{
	kortcheck();
	}
});

function kortcheck(){

	var sistekort1 = kort[kortknapp-1].length;
	var tallkort1  = kort[kortknapp-1][sistekort1-2];
	var typekort1  = kort[kortknapp-1][sistekort1-1];

	var sistekort2;
	var tallkort2; 
	var typekort2;

	
	for (var i = 0; i<=3; i++) {
		if(kortknapp-1!=i){
			sistekort2 = kort[i].length;
			tallkort2  = kort[i][sistekort2-2];
			typekort2  = kort[i][sistekort2-1];
			
			if(tallkort1<tallkort2 && typekort1 == typekort2){
				kort[kortknapp-1].splice(sistekort1-2,2);
				$("#kort"+kortknapp+"-"+antallIkort[kortknapp-1]+"").remove();
				antallIkort[kortknapp-1]--;
				return;
			}
		}
	}
	hentkortverdi();
}

function hentkortverdi(){
		var a = kort[kortknapp-1].length;
		var b = kort[kortknapp-1][a-2];
		var c = kort[kortknapp-1][a-1];
		mellomlagring[0]=b;
		mellomlagring[1]=c;
		mellomlagring[2]=kortknapp;
}

function card(){
var nummer;
var item;
var tall;
	for(var i = 0; i<=3; i++){
		nummer= Math.floor(Math.random()*allekort1.length);
		item = allekort1[nummer];
		tall= parseInt(item);
		if(tall==10){
			var b =	item.replace("10", "");
		}
		else{
			var b =	item.replace("0", "");
		}
		var c =	b.replace(tall, "");
		var tallposisjon = kort[i].length;
		if(tallposisjon==0){
			kort[i][tallposisjon]=tall;
			kort[i][tallposisjon+1]=c;
		}
		else{
			kort[i][tallposisjon]=tall;
			kort[i][tallposisjon+1]=c;
		}
		antallIkort[i]++;
		var a = i+1;
		var divId = "kort"+a+"-"+antallIkort[i];
		var a = i+1;
		$("#kort"+a).append("<div id='"+divId+"'><img src ='./pics/"+tall+c+".png'  height='auto' width='100%'></div>");
		if(antallIkort[i]==1){
			$("#"+divId+"").css({
				"border-radius":"15px","z-index": ""+antallIkort[i]+"", "position": "absolute", "top": ""+(antallIkort[i]-1)*100+"px",  "width":"100%"
			});
		}
		else {
			$("#"+divId+"").css({
				"z-index": ""+antallIkort[i]+"", "position": "absolute","top": ""+(antallIkort[i]-1)*75+"px",  "width":"100%"
			});
		}

		allekort1.splice(nummer, 1);
	}
}
function newGame(){

		$(".kort").html("");

	mellomlagring=[];
	allekort1=["02_of_spade","03_of_spade","04_of_spade","05_of_spade","06_of_spade","07_of_spade","08_of_spade","09_of_spade",
	"10_of_spade","11_of_spade","12_of_spade","13_of_spade","14_of_spade",
	"02_of_hearts","03_of_hearts","04_of_hearts","05_of_hearts","06_of_hearts","07_of_hearts","08_of_hearts","09_of_hearts","10_of_hearts",
	"11_of_hearts","12_of_hearts","13_of_hearts","14_of_hearts",
	"02_of_diamonds","03_of_diamonds","04_of_diamonds","05_of_diamonds","06_of_diamonds","07_of_diamonds","08_of_diamonds","09_of_diamonds",
	"10_of_diamonds","11_of_diamonds","12_of_diamonds","13_of_diamonds","14_of_diamonds",
	"02_of_clubs","03_of_clubs","04_of_clubs","05_of_clubs","06_of_clubs","07_of_clubs","08_of_clubs","09_of_clubs","10_of_clubs","11_of_clubs",
	"12_of_clubs","13_of_clubs","14_of_clubs"];
	kortNummer=0;
	kort=[[],[],[],[]];
	antallIkort=[0,0,0,0];
	card();
	runde=1;
	
	var a = $(window).height();
	hoyde = a*0.366; 
	
	$(".kort").append("<img src ='./pics/tom.png' height='auto' width='100%'>");
	$("#kortstokk,#kortstokk1").css("height","auto");
	$("#kortstokk1").html("<img src ='./pics/kortstokk48.png' height='auto' width='100%'>");
	hoydestartknapp = a*0.0389;
	$("#startpaanytt").css("height", ""+hoydestartknapp+"px");
	runde++;

}

$("#startpaanytt").click(function(){
	if(confirm("Er du sikker på at du vil begynne på nytt?")){
		newGame();
	}
});
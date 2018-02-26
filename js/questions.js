var formElement=null;
var nota = 0;  //nota de la prueba

var answRadio1;
var answRadio2;
var answText1;
var answText2;
var answCheck1 = [];
var answCheck2 = [];
var answSelect1;
var answSelect2;
var answMult1 = [];
var answMult2 = [];
//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function(){ 

 //CORREGIR al apretar el botón
 formElement=document.getElementById("comp");
  formElement.onclick=function(){
    if(confirm("Esta seguro que desea corregir el examen?")){
    inicializar();
    corregirRadio1();
    corregirRadio2();
    corregirText1();
    corregirText2();
    corregirCheckbox1();
    corregirCheckbox2();
    corregirSelect1();
    corregirSelect2();
    corregirMulti1();
    corregirMulti2();
    presentarNota();
    document.getElementById("comp").style.display="none";
    document.getElementById("resultadosDiv").style.display="block";
    document.getElementById("volver").style.display="block";
    document.getElementById('resultadosDiv').scrollIntoView();
    alert("Tu nota es: "+nota);
  }
 }
 //LEER XML de xml/preguntas.xml
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 };
 xhttp.open("GET", "xml/preguntas.xml", true);
 xhttp.send();
}

//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/preguntas.xml
// xmlDOC es el documento leido XML. 
function gestionarXml(contXml){
  var xmlDoc = contXml.responseXML;
  var inpt = document.createElement("input");

/*radio1*/
/*Pregunta tipo 'radio'  1.*/
  document.getElementById('q01').innerHTML=xmlDoc.getElementsByTagName("title")[0].innerHTML;
  answRadio1 = xmlDoc.getElementById("q_01").getElementsByTagName("answer")[0].innerHTML;/*Guardamos respuesta/s correctas para comprobación posterior.*/
  select=document.getElementById("in_1");
  var nopciones = xmlDoc.getElementById("q_01").getElementsByTagName("option").length;
  for (i = 0; i < nopciones; i++){ 
    inpt = document.createElement("input");
    inpt.type = xmlDoc.getElementsByTagName("type")[0].innerHTML;
    inpt.value=i+1;
    inpt.name=inpt.type;
    select.appendChild(inpt);
    select.innerHTML += xmlDoc.getElementById("q_01").getElementsByTagName("option")[i].innerHTML;
    select.innerHTML+="<br/>";
  } 
  
  /*radio2*/
  document.getElementById('q02').innerHTML=xmlDoc.getElementsByTagName("title")[1].innerHTML;
  answRadio2 = xmlDoc.getElementById("q_02").getElementsByTagName("answer")[0].innerHTML;/*Guardamos respuesta/s correctas para comprobación posterior.*/
  select=document.getElementById("in_2");
  nopciones = xmlDoc.getElementById("q_02").getElementsByTagName("option").length;
  for (i = 0; i < nopciones; i++){ 
    inpt = document.createElement("input");
    inpt.type = xmlDoc.getElementsByTagName("type")[1].innerHTML;
    inpt.value=i+1;
    inpt.name=inpt.type;
    select.appendChild(inpt);
    select.innerHTML += xmlDoc.getElementById("q_02").getElementsByTagName("option")[i].innerHTML;
    select.innerHTML+="<br/>";
  }  

  /*text1*/
  document.getElementById("q03").innerHTML = xmlDoc.getElementsByTagName("title")[2].innerHTML;
  answText1 = xmlDoc.getElementById("q_03").getElementsByTagName("answer")[0].innerHTML;/*Guardamos respuesta/s correctas para comprobación posterior.*/
  select= document.getElementById("in_3");
  var inpt = document.createElement("input");
  inpt.type = xmlDoc.getElementsByTagName("type")[2].innerHTML;
  inpt.name = "text1";
  inpt.autocomplete="off";
  select.appendChild(inpt);

  /*text2*/
  document.getElementById("q04").innerHTML = xmlDoc.getElementsByTagName("title")[3].innerHTML;
  answText2 = xmlDoc.getElementById("q_04").getElementsByTagName("answer")[0].innerHTML;/*Guardamos respuesta/s correctas para comprobación posterior.*/
  select= document.getElementById("in_4");
  var inpt = document.createElement("input");
  inpt.type = xmlDoc.getElementsByTagName("type")[3].innerHTML;
  inpt.name = "text2";
  inpt.autocomplete="off";
  select.appendChild(inpt);

  /*Pregunta tipo 'checkbox'  1.*/
  document.getElementById('q05').innerHTML = xmlDoc.getElementsByTagName("title")[4].innerHTML;
  answCheck1 = xmlDoc.getElementById("q_05").getElementsByTagName("answer")[0].innerHTML;/*Guardamos respuesta/s correctas para comprobación posterior.*/
  select= document.getElementById("in_5");
  var nopciones = xmlDoc.getElementById("q_05").getElementsByTagName("option").length;
  for (i = 0; i < nopciones; i++)
  { 
    inpt = document.createElement("input");
    inpt.type = xmlDoc.getElementsByTagName("type")[4].innerHTML;
    inpt.name = inpt.type;
    inpt.value=i+1;
    select.appendChild(inpt);
    select.innerHTML += xmlDoc.getElementById("q_05").getElementsByTagName("option")[i].innerHTML;
    select.innerHTML+="<br/>";
  }
  
  /*answers*/
  var nres = xmlDoc.getElementById("q_05").getElementsByTagName('answer').length;
  for (i = 0; i < nres; i++)
  { 
    answCheck1[i]=xmlDoc.getElementById("q_05").getElementsByTagName("answer")[i].innerHTML;
  }

  /*Pregunta tipo 'checkbox'  2.*/
  document.getElementById('q06').innerHTML = xmlDoc.getElementsByTagName("title")[5].innerHTML;
  answCheck2 = xmlDoc.getElementById("q_06").getElementsByTagName("answer")[0].innerHTML;/*Guardamos respuesta/s correctas para comprobación posterior.*/
  select= document.getElementById("in_6");
  var nopciones = xmlDoc.getElementById("q_06").getElementsByTagName("option").length;
  for (i = 0; i < nopciones; i++)
  { 
    inpt = document.createElement("input");
    inpt.type = xmlDoc.getElementsByTagName("type")[5].innerHTML;
    inpt.name = inpt.type;
    inpt.value=i+1;
    select.appendChild(inpt);
    select.innerHTML += xmlDoc.getElementById("q_06").getElementsByTagName("option")[i].innerHTML;
    select.innerHTML+="<br/>";
  }
  /*answers*/
  var nres = xmlDoc.getElementById("q_06").getElementsByTagName('answer').length;
  for (i = 0; i < nres; i++)  { 
    answCheck2[i]=xmlDoc.getElementById("q_06").getElementsByTagName("answer")[i].innerHTML;
  }

  /*Pregunta tipo 'select'  1.*/
  document.getElementById("q07").innerHTML = xmlDoc.getElementsByTagName("title")[6].innerHTML;
  answSelect1 = xmlDoc.getElementById("q_07").getElementsByTagName("answer")[0].innerHTML;/*Guardamos respuesta/s correctas para comprobación posterior.*/
  select = document.getElementById("in_7");
  var nopciones = xmlDoc.getElementById("q_07").getElementsByTagName("option").length;
  for (i = 0; i < nopciones; i++)
  { 
   var option = document.createElement("option");
    option.text = xmlDoc.getElementById("q_07").getElementsByTagName("option")[i].innerHTML;
    option.value=i+1;
    select.appendChild(option);
  } 
    /*Pregunta tipo 'select'  2.*/
  document.getElementById("q08").innerHTML = xmlDoc.getElementsByTagName("title")[7].innerHTML;
  answSelect2 = xmlDoc.getElementById("q_08").getElementsByTagName("answer")[0].innerHTML;/*Guardamos respuesta/s correctas para comprobación posterior.*/
  select = document.getElementById("in_8");
  var nopciones = xmlDoc.getElementById("q_08").getElementsByTagName("option").length;
  for (i = 0; i < nopciones; i++){ 
    var option = document.createElement("option");
    option.text = xmlDoc.getElementById("q_08").getElementsByTagName("option")[i].innerHTML;
    option.value=i+1;
    select.appendChild(option);
  } 

   /*Pregunta tipo select 'multiple'  1.*/
  document.getElementById("q09").innerHTML = xmlDoc.getElementsByTagName("title")[8].innerHTML;
  for (i = 0; i < nres; i++)
  {
    answMult1[i] = xmlDoc.getElementById("q_09").getElementsByTagName("answer")[i].innerHTML;
  }
  select = document.getElementById("in_9");
  select.multiple = true;    
  var nopciones = xmlDoc.getElementById("q_09").getElementsByTagName("option").length;
  for (i = 0; i < nopciones; i++)
  { 
    var option = document.createElement("option");
    option.text = xmlDoc.getElementById("q_09").getElementsByTagName("option")[i].innerHTML;
    option.value=i+1;
    select.appendChild(option);
  } 
     /*Pregunta tipo select 'multiple'  2.*/
  document.getElementById("q10").innerHTML = xmlDoc.getElementsByTagName("title")[9].innerHTML;
  for (i = 0; i < nres; i++)
  {
    answMult2[i] = xmlDoc.getElementById("q_10").getElementsByTagName("answer")[i].innerHTML;
  }
  select = document.getElementById("in_10");
  select.multiple = true;    
  var nopciones = xmlDoc.getElementById("q_10").getElementsByTagName("option").length;
  for (i = 0; i < nopciones; i++){ 
    var option = document.createElement("option");
    option.text = xmlDoc.getElementById("q_10").getElementsByTagName("option")[i].innerHTML;
    option.value=i+1;
    select.appendChild(option);
  } 

}

function corregirRadio1(){
  var r=null;
  var opt = document.getElementById("in_1").elements["radio"];
  for (i = 0; i < opt.length; i++)
  {
    if(opt[i].checked) {r=i;}
  }
  if(r==answRadio1) {darRespuestaHtml(" 1: <b>Correcto!</b>"); nota +=1;}
  else {darRespuestaHtml(" 1: Respuesta incorrecta.");}
}
function corregirRadio2(){
  var r=null;
  var opt = document.getElementById("in_2").elements["radio"];
  for (i = 0; i < opt.length; i++)
  {
    if(opt[i].checked) {r=i;}
  }
  if(r==answRadio2) {darRespuestaHtml(" 2: <b>Correcto!</b>"); nota +=1;}
  else {darRespuestaHtml(" 2: Respuesta incorrecta.");}
}

function darRespuestaHtml(r){
  var p = document.createElement("p");
  p.innerHTML = (r);
  document.getElementById("resultadosDiv").appendChild(p);
}

function inicializar(){
  var v=document.getElementById("resultadosDiv");
  v.innerHTML="";
  nota=0.0;
}

function presentarNota(){
  darRespuestaHtml("<b>Nota: "+nota+"</b> punto/s sobre 10");
}

function corregirText1(){
  var s = document.getElementById("in_3").getElementsByTagName("input")[0].value;
  if (s.toUpperCase()==answText1.toUpperCase())
  {
    darRespuestaHtml(" 3: <b>Correcto!</b>");
    nota +=1;
  }
  else{
      darRespuestaHtml(" 3: Respuesta incorrecta, la respuesta era: "+answText1);
    }
}

function corregirText2(){
  var s = document.getElementById("in_4").getElementsByTagName("input")[0].value;
  if (s.toUpperCase()==answText2.toUpperCase())
  {
    darRespuestaHtml(" 4: <b>Correcto!</b>");
    nota +=1;
  }
  else{
      darRespuestaHtml(" 4: Respuesta incorrecta, la respuesta era: "+answText2);
    }
}


function corregirCheckbox1(){
  var v=[];
  var corr=0;
  var opt = document.getElementById("in_5").elements["checkbox"];

    for (i = 0; i < opt.length; i++)
  {
    if(opt[i].checked) 
    {
      v[i]=false;
      for (j = 0; j < answCheck1.length; j++) 
      {
        if(i==answCheck1[j]) {v[i]=true;}
      }
    }
  }

  for (i = 0; i < opt.length; i++) 
  {   
    if (opt[i].checked) 
    {
      if (v[i]) {nota +=1.0/answCheck1.length; corr++;} /*dividido por el  de respuestas correctas*/     
      else {nota -=1.0/answCheck1.length; corr--;} /*dividido por el  de respuestas correctas*/   
    }
  }
  if (corr==answCheck1.length) {darRespuestaHtml(" 5: <b>Correcto!</b>");}
  else {darRespuestaHtml(" 5: Respuesta incorrecta.");}
}

function corregirCheckbox2(){
  var v=[];
  var corr=0;
  var opt = document.getElementById("in_6").elements["checkbox"];

  for (i = 0; i < opt.length; i++)
  {
    if(opt[i].checked) 
    {
      v[i]=false;
      for (j = 0; j < answCheck2.length; j++) 
      {
        if(i==answCheck2[j]) {v[i]=true;}
      }
    }
  }

  for (i = 0; i < opt.length; i++) 
  {   
    if (opt[i].checked) 
    {
      if (v[i]) {nota +=1.0/answCheck2.length; corr++;} /*dividido por el  de respuestas correctas*/     
      else {nota -=1.0/answCheck2.length; corr--;} /*dividido por el  de respuestas correctas*/   
    }
  }
  if (corr==answCheck1.length) {darRespuestaHtml(" 6: <b>Correcto!</b>");}
  else {darRespuestaHtml(" 6: Respuesta incorrecta.");}
}

function corregirSelect1(){
  var sel = document.getElementById("in_7");  
  if (sel.selectedIndex==answSelect1)
  {
    darRespuestaHtml(" 7: <b>Correcto!</b>");
    nota +=1;
  }
  else {darRespuestaHtml(" 7: Respuesta incorrecta.");}
}

function corregirSelect2(){
  var sel = document.getElementById("in_8");  
  if (sel.selectedIndex==answSelect2)
  {
    darRespuestaHtml(" 8: <b>Correcto!</b>");
    nota +=1;
  }
  else {darRespuestaHtml(" 8: Respuesta incorrecta.");}
}

function corregirMulti1(){
  var v=[];
  var corr=0;
  var opt = document.getElementById("in_9").getElementsByTagName("option");

  for (i = 0; i < opt.length; i++)
  {
    if(opt[i].selected) 
    {
      v[i]=false;
      for (j = 0; j < answMult1.length; j++) 
      {
        if(i==answMult1[j]) {v[i]=true;}
      }
    }
  }
  for (i = 0; i < opt.length; i++) 
  {   
    if (opt[i].selected) 
    {
      if (v[i]) {nota +=1.0/answMult1.length; corr++;} /*dividido por el  de respuestas correctas*/   
      else {nota -=1.0/answMult1.length; corr--;} /*dividido por el  de respuestas correctas*/
    }
  }
  if (corr==answMult1.length) {darRespuestaHtml(" 9: <b>Correcto!</b>");}
  else {darRespuestaHtml(" 9: Respuesta incorrecta.");}
}

function corregirMulti2(){
  var v=[];
  var corr=0;
  var opt = document.getElementById("in_10").getElementsByTagName("option");

  for (i = 0; i < opt.length; i++)
  {
    if(opt[i].selected) 
    {
      v[i]=false;
      for (j = 0; j < answMult2.length; j++) 
      {
        if(i==answMult2[j]) {v[i]=true;}
      }
    }
  }
  for (i = 0; i < opt.length; i++) 
  {   
    if (opt[i].selected) 
    {
      if (v[i]) {nota +=1.0/answMult2.length; corr++;} /*dividido por el  de respuestas correctas*/   
      else {nota -=1.0/answMult2.length; corr--;} /*dividido por el  de respuestas correctas*/
    }
  }
  if (corr==answMult2.length) {darRespuestaHtml(" 10: <b>Correcto!</b>");}
  else {darRespuestaHtml(" 10: Respuesta incorrecta.");}
}
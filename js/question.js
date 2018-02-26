var formElement = null;
var res_t_1 = null;
var res_t_2 = null;
var res_sel_1 = null;
var res_sel_2 = null;
var res_chb_1 = [];
var res_chb_2 = [];
var res_mul_1 = [];
var res_mul_2 = [];
var res_rad_1 = null;
var res_rad_2 = null;
var click=false;

/*al cargar la página...*/
window.onload = function()
{ /*CORREGIR al apretar el botón.*/
  formElement=document.getElementById("comp");
  formElement.onclick=function()
  {    
    corrExam();
    click=true;
  };
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200)
    {
      gestionarXml(this);
    
    }
  };
  
  xhttp.open("GET", "XML_DTD/questions.xml", true);
  xhttp.send();
};
/*Pone a cero contador 'nota'. Comprueba y muestra resultados.*/
function corrExam()
{
  inicializar();
corregirRadio1();
    corregirRadio2();
  corregirText1();
  corregirSelect1();
  corregirMulti1();
  corregirCheckbox1();
  corregirText2();
  corregirSelect2();
  corregirMulti2();
  corregirCheckbox2();
  presentarNota();
}

/*Rellenamos la página con el contenido de esta.*/
function gestionarXml(contXml)
{
  var xmlDoc = contXml.responseXML;
  
  /*Pregunta tipo 'radio' nº 1.*/
   var tituloRadio = xmlDoc.getElementsByTagName("title")[0].innerHTML;
    var opcionesRadio = [];
    var nopt = xmlDoc.getElementById("q_01").getElementsByTagName('option').length;
    for (i = 0; i < nopt; i++) {
        opcionesRadio[i] = xmlDoc.getElementById("q_01").getElementsByTagName('option')[i].innerHTML;
    }
    ponerDatosRadio(tituloRadio, "q1", opcionesRadio, "radioDiv1");
    //ANSWER
    var answRadio1 = xmlDoc.getElementById("q_01").getElementsByTagName('answer')[0].innerHTML;

    
      function ponerDatosRadio(tituloRadio, IDposicion, opciones, divID) {
    document.getElementById(IDposicion).innerHTML = tituloRadio;
    var radioContainer = document.getElementById(divID);

    for (i = 0; i < opciones.length; i++) {
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML = opciones[i];
        label.setAttribute("for", "rad_" + i + divID);
        input.id = "rad_" + i + divID;
        input.type = "radio";
        input.name = "rad" + divID;
        radioContainer.appendChild(input);
        radioContainer.appendChild(label);
        radioContainer.appendChild(document.createElement("br"));
    }

}

 /*Pregunta tipo 'radio' nº 2.*/
  document.getElementById('q_02').innerHTML=xmlDoc.getElementsByTagName("title")[1].innerHTML;
  res_rad_2 = xmlDoc.getElementById("q_02").getElementsByTagName("answer")[1].innerHTML;/*Guardamos respuesta/s correctas para comprobación posterior.*/
  nopciones = xmlDoc.getElementById("q_02").getElementsByTagName("option").length;
  select=document.getElementById("in_2");
  for (i = 0; i < nopciones; i++)
  { 
    inpt = document.createElement("input");
    inpt.type = xmlDoc.getElementsByTagName("type")[1].innerHTML;
    inpt.value=i+1;
    inpt.name=inpt.type;
    select.appendChild(inpt);
    select.innerHTML += xmlDoc.getElementById("q_02").getElementsByTagName("option")[i].innerHTML;
    select.innerHTML+="\t";
  }
}
  
  /*Pregunta tipo 'texto' nº 1.*/
  document.getElementById("q001").innerHTML = xmlDoc.getElementsByTagName("title")[0].innerHTML;
  res_t_1 = xmlDoc.getElementById("q001").getElementsByTagName("answer")[0].innerHTML;/*Guardamos respuesta/s correctas para comprobación posterior.*/
  select= document.getElementById("in_1");
  var inpt = document.createElement("input");
  inpt.type = xmlDoc.getElementsByTagName("type")[0].innerHTML;
  inpt.name = "text1";
  inpt.autocomplete="off";
  select.appendChild(inpt);

/*Pregunta tipo 'texto' nº 2.*/
  document.getElementById("q006").innerHTML = xmlDoc.getElementsByTagName("title")[5].innerHTML;
  res_t_2 = xmlDoc.getElementById("q006").getElementsByTagName("answer")[0].innerHTML;/*Guardamos respuesta/s correctas para comprobación posterior.*/
  select= document.getElementById("in_6");
  inpt = document.createElement("input");
  inpt.type = xmlDoc.getElementsByTagName("type")[5].innerHTML;
  inpt.name = "text2";
  inpt.autocomplete="off";
  select.appendChild(inpt);


  /*Pregunta tipo 'checkbox' nº 1.*/
  document.getElementById("q004").innerHTML = xmlDoc.getElementsByTagName("title")[3].innerHTML;
  select= document.getElementById("in_4");
  nopciones = xmlDoc.getElementById("q004").getElementsByTagName("option").length;
  for (i = 0; i < nopciones; i++)
  { 
    inpt = document.createElement("input");
    inpt.type = xmlDoc.getElementsByTagName("type")[3].innerHTML;
    inpt.name = inpt.type;
    inpt.value=i+1;
    select.appendChild(inpt);
    select.innerHTML += xmlDoc.getElementById("q004").getElementsByTagName("option")[i].innerHTML;
    select.innerHTML+="<br/>";
  }
  /*Guardamos respuesta/s correctas para comprobación posterior.*/
  nres = xmlDoc.getElementById("q004").getElementsByTagName('answer').length;
  for (i = 0; i < nres; i++)
  { 
    res_chb_1[i]=xmlDoc.getElementById("q004").getElementsByTagName("answer")[i].innerHTML;
  }

  /*Pregunta tipo 'checkbox' nº 2.*/
  document.getElementById('q009').innerHTML = xmlDoc.getElementsByTagName("title")[8].innerHTML;
  res_rad_2 = xmlDoc.getElementById("q009").getElementsByTagName("answer")[0].innerHTML;/*Guardamos respuesta/s correctas para comprobación posterior.*/
  select= document.getElementById("in_9");
  nopciones = xmlDoc.getElementById("q009").getElementsByTagName("option").length;
  for (i = 0; i < nopciones; i++)
  { 
    inpt = document.createElement("input");
    inpt.type = xmlDoc.getElementsByTagName("type")[8].innerHTML;
    inpt.name = inpt.type;
    inpt.value=i+1;
    select.appendChild(inpt);
    select.innerHTML += xmlDoc.getElementById("q009").getElementsByTagName("option")[i].innerHTML;
    select.innerHTML+="<br/>";
  }
  /*Guardamos respuesta/s correctas para comprobación posterior.*/
  nres = xmlDoc.getElementById("q009").getElementsByTagName('answer').length;
  for (i = 0; i < nres; i++)
  { 
    res_chb_2[i]=xmlDoc.getElementById("q009").getElementsByTagName("answer")[i].innerHTML;
  }
  

  /*Pregunta tipo 'select' nº 1.*/
  document.getElementById("q002").innerHTML = xmlDoc.getElementsByTagName("title")[1].innerHTML;
  res_sel_1 = xmlDoc.getElementById("q002").getElementsByTagName("answer")[0].innerHTML;/*Guardamos respuesta/s correctas para comprobación posterior.*/
  select = document.getElementById("in_2");
  var nopciones = xmlDoc.getElementById("q002").getElementsByTagName("option").length;
  for (i = 0; i < nopciones; i++)
  { 
    option = document.createElement("option");
    option.text = xmlDoc.getElementById("q002").getElementsByTagName("option")[i].innerHTML;
    option.value=i+1;
    select.appendChild(option);
  } 

/*Pregunta tipo 'select' nº 2.*/
  document.getElementById("q007").innerHTML = xmlDoc.getElementsByTagName("title")[6].innerHTML;
  res_sel_2 = xmlDoc.getElementById("q007").getElementsByTagName("answer")[0].innerHTML;/*Guardamos respuesta/s correctas para comprobación posterior.*/
  select = document.getElementById("in_7");
  nopciones = xmlDoc.getElementById("q007").getElementsByTagName("option").length;
  for (i = 0; i < nopciones; i++)
  { 
    option = document.createElement("option");
    option.text = xmlDoc.getElementById("q007").getElementsByTagName("option")[i].innerHTML;
    option.value=i+1;
    select.appendChild(option);
  } 



  /*Pregunta tipo select 'multiple' nº 1.*/
  document.getElementById("q003").innerHTML = xmlDoc.getElementsByTagName("title")[2].innerHTML;
  var nres = xmlDoc.getElementById("q003").getElementsByTagName("answer").length;/*Guardamos respuesta/s correctas para comprobación posterior.*/
  for (i = 0; i < nres; i++)
  {
    res_mul_1[i] = xmlDoc.getElementById("q003").getElementsByTagName("answer")[i].innerHTML;
  }
  select = document.getElementById("in_3");
  select.multiple = true;    
  nopciones = xmlDoc.getElementById("q003").getElementsByTagName("option").length;
  for (i = 0; i < nopciones; i++)
  { 
    option = document.createElement("option");
    option.text = xmlDoc.getElementById("q003").getElementsByTagName("option")[i].innerHTML;
    option.value=i+1;
    select.appendChild(option);
  } 




  /*Pregunta tipo select 'multiple' nº 2.*/
  document.getElementById("q008").innerHTML = xmlDoc.getElementsByTagName("title")[7].innerHTML;
  for (i = 0; i < nres; i++)
  {
    res_mul_2[i] = xmlDoc.getElementById("q008").getElementsByTagName("answer")[i].innerHTML;
  }
  select = document.getElementById("in_8");
  select.multiple = true;    
  nopciones = xmlDoc.getElementById("q008").getElementsByTagName("option").length;
  for (i = 0; i < nopciones; i++)
  { 
    option = document.createElement("option");
    option.text = xmlDoc.getElementById("q008").getElementsByTagName("option")[i].innerHTML;
    option.value=i+1;
    select.appendChild(option);
  } 


/*Implementación de la corrección de cada pregunta.*/
function corregirRadio1()
{
  var r=null;
  var opt = document.getElementById("in_5").elements["radio"];
  for (i = 0; i < opt.length; i++)
  {
    if(opt[i].checked) {r=i;}
  }
  if(r==res_rad_1) {darRespuestaHtml("Nº 5: <b>Correcto!</b>"); nota +=1;}
  else {darRespuestaHtml("Nº 5: <b>Respuesta incorrecta</b>");}
}

function corregirRadio2()
{
  var r=null;
  var opt = document.getElementById("in_10").elements["radio"];
  for (i = 0; i < opt.length; i++)
  {
    if(opt[i].checked) { r=i; }
  }
  if(r==res_rad_2) { darRespuestaHtml("Nº 10: <b>Correcto!</b>"); nota +=1; }
  else {darRespuestaHtml("Nº 10: <b>Respuesta incorrecta</b>");}


function corregirText1()
{
  var s = document.getElementById("in_1").getElementsByTagName("input")[0].value;
  if (s.toUpperCase()==res_t_1.toUpperCase())
  {
    darRespuestaHtml("Nº 1: <b>Correcto!</b>");
    nota +=1;
  }
  else
  {
    if (s.toUpperCase()!=res_t_1.toUpperCase())
    {
      darRespuestaHtml("Nº 1: <b>Respuesta incorrecta</b>");
    }
    else
    {
      darRespuestaHtml("Nº 1: <b>Respuesta incorrecta</b>");
    }
  }
}

function corregirText2()
{
  var s = document.getElementById("in_6").getElementsByTagName("input")[0].value;
  if (s.toUpperCase()==res_t_2.toUpperCase())
  {
    darRespuestaHtml("Nº 6: <b>Correcto!</b>");
    nota +=1;
  }
  else
  {
    if (s.toUpperCase()!=res_t_2.toUpperCase())
    {
      darRespuestaHtml("Nº 6: <b>Respuesta incorrecta</b>");
    }
      else {darRespuestaHtml("Nº 6: <b>Respuesta incorrecta</b>");}
  }
}

function corregirSelect1()
{
  var sel = document.getElementById("in_2");  
  if (sel.selectedIndex==res_sel_1)
  {
    darRespuestaHtml("Nº 2: <b>Correcto!</b>");
    nota +=1;
  }
  else {darRespuestaHtml("Nº 2: <b>Respuesta incorrecta</b>");}
}

function corregirSelect2()
{
  var sel = document.getElementById("in_7");  
  if (sel.selectedIndex==res_sel_2)
  {
    darRespuestaHtml("Nº 7: <b>Correcto!</b>");
    nota +=1;
  }
  else {darRespuestaHtml("Nº 7: <b>Respuesta incorrecta</b>");}
}

function corregirMulti1()
{
  var v=[];
  var corr=0;
  var opt = document.getElementById("in_3").getElementsByTagName("option");

  for (i = 0; i < opt.length; i++)
  {
    if(opt[i].selected) 
    {
      v[i]=false;
      for (j = 0; j < res_mul_1.length; j++) 
      {
        if(i==res_chb_2[j]) {v[i]=true;}
      }
    }
  }
  for (i = 0; i < opt.length; i++) 
  {   
    if (opt[i].selected) 
    {
      if (v[i]) {nota +=1.0/res_mul_1.length; corr++;} /*dividido por el número de respuestas correctas*/   
      else {nota -=1.0/res_mul_1.length; corr--;} /*dividido por el número de respuestas correctas*/
    }
  }
  if (corr==res_mul_1.length) {darRespuestaHtml("Nº 3: <b>Correcto!</b>");}
  else {darRespuestaHtml("Nº 3: <b>Respuesta incorrecta</b>");}
}

function corregirMulti2()
{
  var v=[];
  var corr=0;
  var opt = document.getElementById("in_8").getElementsByTagName("option");

  for (i = 0; i < opt.length; i++)
  {
    if(opt[i].selected) 
    {
      v[i]=false;
      for (j = 0; j < res_mul_2.length; j++) 
      {
        if(i==res_mul_2[j]) {v[i]=true;}
      }
    }
  }
  for (i = 0; i < opt.length; i++) 
  {   
    if (opt[i].selected) 
    {
      if (v[i]) {nota +=1.0/res_mul_2.length; corr++;} /*dividido por el número de respuestas correctas*/   
      else {nota -=1.0/res_mul_2.length; corr--;} /*dividido por el número de respuestas correctas*/   
    }
  }
  if (corr==res_mul_2.length) {darRespuestaHtml("Nº 8: <b>Correcto!</b>");}
  else {darRespuestaHtml("Nº 8: <b>Respuesta incorrecta</b>");}
}

function corregirCheckbox1()
{
  var v=[];
  var corr=0;
  var opt = document.getElementById("in_4").elements["checkbox"];

  for (i = 0; i < opt.length; i++)
  {
    if(opt[i].checked) 
    {
      v[i]=false;
      for (j = 0; j < res_chb_1.length; j++) 
      {
        if(i==res_chb_1[j]) {v[i]=true;}
      }
    }
  }

  for (i = 0; i < opt.length; i++) 
  {   
    if (opt[i].checked) 
    {
      if (v[i]) {nota +=1.0/res_chb_1.length; corr++;} /*dividido por el número de respuestas correctas*/     
      else {nota -=1.0/res_chb_1.length; corr--;} /*dividido por el número de respuestas correctas*/   
    }
  }
  if (corr==res_chb_1.length) {darRespuestaHtml("Nº 4: <b>Correcto!</b>");}
  else {darRespuestaHtml("Nº 4: <b>Respuesta incorrecta</b>");}
}

function corregirCheckbox2()
{
  var v=[];
  var corr=0;
  var opt = document.getElementById("in_9").elements["checkbox"];

  for (i = 0; i < opt.length; i++)
  {
    if(opt[i].checked) 
    {
      v[i]=false;
      for (j = 0; j < res_chb_2.length; j++) 
      {
        if(i==res_chb_2[j]) {v[i]=true;}
      }
    }
  }

  for (i = 0; i < opt.length; i++) 
  {   
    if (opt[i].checked) 
    {
      if (v[i]) {nota +=1.0/res_chb_2.length; corr++;} /*dividido por el número de respuestas correctas*/    
      else {nota -=1.0/res_chb_2.length; corr--;} /*dividido por el número de respuestas correctas*/   
    }
  }
  if (corr==res_chb_2.length) {darRespuestaHtml("Nº 9: <b>Correcto!</b>");}
  else {darRespuestaHtml("Nº 9: <b>Respuesta incorrecta</b>");}
}

}
/*Gestionar la presentación de las respuestas.*/
function darRespuestaHtml(r)
{
  var p = document.createElement("p");
  p.innerHTML = (r);
  document.getElementById("comprobacion").appendChild(p);
}
/*Muestra el resultado de la nota final del ejercicio.*/
function presentarNota()
{
  darRespuestaHtml("<b>Nota: "+nota+"</b> punto/s sobre 10");
}
/*Borramos resultados anteriores. Contador de notas a cero.*/
function inicializar()
{
  var v=document.getElementById("comprobacion");
  v.innerHTML="";
  nota=0.0;
}
/*Reloj de cuenta atras del tiempo para la realización de la prueba.*/
function cargaCrono()
{
  t=1000;
  contador_s=0;
  contador_m=5;
  s = document.getElementById("segundos");
  m = document.getElementById("minutos");
  m.innerHTML = contador_m;
  setInterval(function()
  {
    if(contador_s>0)
    {
      contador_s--;
      if (contador_s<10)
      {
        contador_s = "0"+contador_s;/*Añade '0' cuando los segundos son < 10.*/
      }
      s.innerHTML=contador_s;
    }            
    else
    {
      if(contador_m>0)
      {
        contador_m--;
        if (contador_m<10) {contador_m = "0"+contador_m;}/*Añade '0' cuando los minutos son < 10.*/
        m.innerHTML=contador_m;
        contador_s=59;
        s.innerHTML=contador_s;
      }
    }
    if (s.innerHTML==1 && m.innerHTML==0) { t=0;nota=0.0; stop();}/*Dejamos a '1' los seg. para evitar repetición de 'alert'.*/
  },t);
}
/* Alerta sobre fin de tiempo y, al aceptar, presenta nota final.*/
function stop()
{  
  var doc=document.getElementById("exam");
  var com=document.getElementById("comprobacion");
  var c=document.getElementById("crono");
  var res=document.getElementById("comprobacion").innerHTML;
  corrExam();
  alert("¡¡Tiempo agotado!!  Pulse 'ACEPTAR' y aparecerá su calificación");
  c.remove("crono");
  doc.innerHTML="";  
  doc.appendChild(com);
  creaBoton(doc);
  com.appendChild(res);  
}
/*Creamos un botón para retornar al test directamente desde la página de resultados.*/
function creaBoton(enDiv)
{
  var b=document.createElement("input");
  b.className="start";
  b.type="button";
  b.value="¿Nuevo intento?";
  b.onclick=function(){window.location.reload()};
  enDiv.appendChild(b);
}

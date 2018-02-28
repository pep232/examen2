var formElement=null;
var numeroSecreto=null;
var respuestaSelect=null;
var respuestasCheckbox = [];
var nota = 0;  

//---------------------------------------------
window.onload = function(){ 

 formElement=document.getElementById('form');
 formElement.onsubmit=function(){
   inicializar();
   if (comprobar()){
    corregirNumber();
    corregirSelect();
    corregirCheckbox();
    presentarNota();
   }
   return false;
 }
 //--------------------------------------------
 function corregirNumber(){
  //Vosotros debéis comparar el texto escrito con el texto que hay en el xml
  //en este ejemplo hace una comparación de números enteros
  var s=formElement.elements[5].value;     
  if (s==numeroSecreto) {
   darRespuestaHtml("P1: Exacto!");
   nota +=1;
  }
  else {
	  (s>numeroSecreto) darRespuestaHtml(" Prueba otra vez ");
  }//----------------------------------------------
  function gestionarXml(dadesXml){
 var xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc
 
//SELECT
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementsByTagName("title")[0].innerHTML;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("question001").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("question001").getElementsByTagName('option')[i].innerHTML;
 }
 ponerDatosSelectHtml(tituloSelect,opcionesSelect);
 respuestaSelect=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);

 //NUMBER
 //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
 var tituloInput=xmlDoc.getElementsByTagName("title")[1].innerHTML;
 ponerDatosInputHtml(tituloInput);
 numeroSecreto=parseInt(xmlDoc.getElementsByTagName("answer")[1].innerHTML);
 


 //CHECKBOX
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox = xmlDoc.getElementsByTagName("title")[2].innerHTML;
 var opcionesCheckbox = [];
 var nopt = xmlDoc.getElementById("question003").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox[i]=xmlDoc.getElementById("question003").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosCheckboxHtml(tituloCheckbox,opcionesCheckbox);
 var nres = xmlDoc.getElementById("question003").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox[i]=xmlDoc.getElementById("question003").getElementsByTagName("answer")[i].innerHTML;
 }
}

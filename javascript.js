// var vehiculos = new vehiculo("asda","asda","asd","asdas","1231");
var vehiculos = [];
var currentModPosicion;

$(document).ready(function(){
  if(JSON.parse(localStorage.getItem('data')))
    vehiculos = JSON.parse(localStorage.getItem('data'));

update();
unableTexts();
$("#btnNuevo").click(function(){
  nuevoRegistro();
});
$("#btnAgregar").click(function(){
  addToArray();
  update();
  unableTexts();

});

$("#btnModificar").click(function(){
var placa = $("#txtPlaca").val();
  var marca = $("#txtMarca").val();
  var modelo = $("#txtModelo").val();
  var color = $("#txtColor").val();
  var precio = $("#txtPrecio").val();
  var object = new vehiculo(placa,marca,modelo,color,precio);
delete vehiculos[currentModPosicion];
vehiculos[currentModPosicion] = object;
update();
clearData();
unableTexts();
});

});

function update(){
  $("#tbody tr").remove();
var count = 0;

  var tbody = $('#table tbody'),
      props = ["placa", "marca", "modelo", "color", "precio"];
  $.each(vehiculos, function(i, vehiculos) {
    var tr = $('<tr>');
    $.each(props, function(i, prop) {
      $('<td>').html(vehiculos[prop]).appendTo(tr);
    });
	$('<td>').html('<a style="padding-left:5px; padding-right:5px;" href="#" onClick="modificar('+count+')">Modificar</a><a style="padding-left:5px; padding-right:5px;" href="#" onClick="deleteRecord('+count+')">Eliminar</a>').appendTo(tr);
    tbody.append(tr);
count++;
  });

  localStorage.setItem('data',JSON.stringify(vehiculos));
}

function loadData(){
  var vehiculoSelected = vehiculos[currentModPosicion];
  $("#txtPlaca").val(vehiculoSelected.placa);
  $("#txtMarca").val(vehiculoSelected.marca);
  $("#txtModelo").val(vehiculoSelected.modelo);
  $("#txtColor").val(vehiculoSelected.color);
  $("#txtPrecio").val(vehiculoSelected.precio);

}

function clearData(){
  $("#txtPlaca").empty();
  $("#txtMarca").empty();
  $("#txtModelo").empty();
  $("#txtColor").empty();
  $("#txtPrecio").empty();
}

function deleteRecord(posicion){
vehiculos.splice(posicion,1);
update();
}

function prueba(posicion){
alert(posicion);
}

function modificar(posicion){
nuevoRegistro();
  $("#btnAgregar").prop("disabled",true);
$("#btnModificar").show(500);
currentModPosicion = posicion;
loadData();

}

function fillTextBox(vehiculo){
alert(vehiculo.placa);
}

function addToArray(){
  var placa = $("#txtPlaca").val();
  var marca = $("#txtMarca").val();
  var modelo = $("#txtModelo").val();
  var color = $("#txtColor").val();
  var precio = $("#txtPrecio").val();
  var object = new vehiculo(placa,marca,modelo,color,precio);
  vehiculos.push(object);
  alert(vehiculos.length);
}

function nuevoRegistro(){
  $("#txtPlaca").show(500);
  $("#txtMarca").show(500);
  $("#txtModelo").show(500);
  $("#txtColor").show(500);
  $("#txtPrecio").show(500);
  $("#btnNuevo").prop("disabled",true)
  $("#btnAgregar").prop("disabled",false)

}

function unableTexts(){
  $("#txtPlaca").hide(500);
  $("#txtMarca").hide(500);
  $("#txtModelo").hide(500);
  $("#txtColor").hide(500);
  $("#txtPrecio").hide(500);
  $("#btnAgregar").prop("disabled",true)
  $("#btnNuevo").prop("disabled",false)
  $("#btnModificar").hide(500);


}

function vehiculo(placa,marca,modelo,color,precio){
  this.placa = placa;
  this.marca = marca;
  this.modelo = modelo;
  this.color = color;
  this.precio = precio
}

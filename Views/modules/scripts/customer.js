var tabla;

//funcion que se ejecuta al inicio
function init() {
  mostrarform(false);
  listar();

  $("#formulario").on("submit", function (e) {
    guardaryeditar(e);
  });
}

//funcion limpiar
function limpiar() {
  $("#nombre").val("");
  $("#num_documento").val("");
  $("#direccion").val("");
  $("#telefono").val("");
  $("#email").val("");
  $("#idpersona").val("");
}

//funcion mostrar formulario
function mostrarform(flag) {
  limpiar();
  if (flag) {
    $("#listadoregistros").hide();
    $("#formularioregistros").show();
    $("#btnGuardar").prop("disabled", false);
    $("#btnagregar").hide();
  } else {
    $("#listadoregistros").show();
    $("#formularioregistros").hide();
    $("#btnagregar").show();
  }
}

//cancelar form
function cancelarform() {
  limpiar();
  mostrarform(false);
}

//funcion listar
function listar() {
  tabla = $("#tbllistado")
    .dataTable({
      language: {
        decimal: "",
        emptyTable: "No hay información",
        info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
        infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
        infoFiltered: "(Filtrado de _MAX_ total entradas)",
        infoPostFix: "",
        thousands: ",",
        lengthMenu: "Mostrar _MENU_ Entradas",
        loadingRecords: "Cargando...",
        processing: "Procesando...",
        search: "Buscar:",
        zeroRecords: "Sin resultados encontrados",
        paginate: {
          first: "Primero",
          last: "Ultimo",
          next: "Siguiente",
          previous: "Anterior",
        },
      },
      aProcessing: true, //activamos el procedimiento del datatable
      aServerSide: true, //paginacion y filrado realizados por el server
      dom: "Bfrtip", //definimos los elementos del control de la tabla
      buttons: [
        {
          extend: "excelHtml5",
          text: '<i class="fa fa-file-excel-o bg-green"></i> Excel',
          titleAttr: "Exportar a Excel",
          title: "Reporte de Clientes",
          sheetName: "Clientes",
          exportOptions: {
            columns: [1, 2, 3, 4, 5],
          },
        },
        {
          extend: "pdfHtml5",
          text: '<i class="fa fa-file-pdf-o bg-red"></i> PDF',
          titleAttr: "Exportar a PDF",
          title: "Reporte de Clientes",
          //messageTop: "Reporte de usuarios",
          pageSize: "A4",
          //orientation: 'landscape',
          exportOptions: {
            columns: [1, 2, 3, 4, 5],
          },
        },
      ],
      ajax: {
        url: "Controllers/Person.php?op=listarc",
        type: "get",
        dataType: "json",
        error: function (e) {
          console.log(e.responseText);
        },
      },
      bDestroy: true,
      iDisplayLength: 10, //paginacion
      order: [[0, "desc"]], //ordenar (columna, orden)
    })
    .DataTable();
}
//funcion para guardaryeditar
function guardaryeditar(e) {
  e.preventDefault(); //no se activara la accion predeterminada
  $("#btnGuardar").prop("disabled", true);
  var formData = new FormData($("#formulario")[0]);

  $.ajax({
    url: "Controllers/Person.php?op=guardaryeditar",
    type: "POST",
    data: formData,
    contentType: false,
    processData: false,

    success: function (datos) {
      var tabla = $("#tbllistado").DataTable();
      swal({
        title: "Registro",
        text: datos,
        icon: "info",
        buttons: {
          confirm: "OK",
        },
      }),
        mostrarform(false);
      tabla.ajax.reload();
    },
  });

  limpiar();
}

function mostrar(idpersona) {
  $.post(
    "Controllers/Person.php?op=mostrar",
    { idpersona: idpersona },
    function (data, status) {
      data = JSON.parse(data);
      mostrarform(true);

      $("#nombre").val(data.nombre);
      $("#tipo_documento").val(data.tipo_documento);
      //$("#tipo_documento").selectpicker("refresh");
      $("#num_documento").val(data.num_documento);
      $("#direccion").val(data.direccion);
      $("#telefono").val(data.telefono);
      $("#email").val(data.email);
      $("#idpersona").val(data.idpersona);
    }
  );
}

//funcion para desactivar
function eliminar(idpersona) {

  $.post(
    "Controllers/Person.php?op=mostrarVentas",
    { idpersona: idpersona },
    function (e) {
      data = JSON.parse(e);
      //  console.log(data.cantidadVentas);
      if (parseInt(data.cantidadVentas) > 0) {
        swal({
          title: "Error?",
          text: "Este cliente tiene ventas registradas",
          icon: "error",
        });
      } else {
        swal({
          title: "Eliminar?",
          text: "Esá seguro de eliminar?",
          icon: "warning",
          buttons: {
            cancel: "No, cancelar",
            confirm: "Si, eliminar",
          },
          //buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            $.post(
              "Controllers/Person.php?op=eliminar",
              { idpersona: idpersona },
              function (e) {
                swal(e, "Desactivado!", {
                  icon: "success",
                });
                var tabla = $("#tbllistado").DataTable();
                tabla.ajax.reload();
              }
            );
          }
        });
      }
    }
  );

}

init();

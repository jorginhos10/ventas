var tabla;

//funcion que se ejecuta al inicio
function init() {

  var now = new Date();
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var today = now.getFullYear() + "-" + month + "-" + day;
  $("#fecha_inicio").val(today);
  $("#fecha_fin").val(today);

  listar();
  //cargamos los items al select cliente
  $.post("Controllers/Person.php?op=selectCliente", function (r) {
    $("#idcliente").html(r);
    $("#idcliente").selectpicker("refresh");
  });

  $("#fecha_inicio").change(listar);
  $("#fecha_fin").change(listar);
  $("#idcliente").change(listar);
}

//funcion listar
function listar() {
  var fecha_inicio = $("#fecha_inicio").val();
  var fecha_fin = $("#fecha_fin").val();
  var idcliente = $("#idcliente").val();

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
          text: '<i class="fa fa-file-excel-o"></i> Excel',
          titleAttr: "Exportar a Excel",
          title: "Reporte de Ventas por fecha y cliente",
        },
        {
          extend: "pdfHtml5",
          text: '<i class="fa fa-file-pdf-o"></i> PDF',
          titleAttr: "Exportar a PDF",
          title: "Reporte de Ventas por fecha y cliente",
        },
      ],
      ajax: {
        url: "Controllers/Consult.php?op=ventasfechacliente",
        data: {
          fecha_inicio: fecha_inicio,
          fecha_fin: fecha_fin,
          idcliente: idcliente,
        },
        type: "get",
        dataType: "json",
        error: function (e) {
          console.log(e.responseText);
        },
      },
      bDestroy: true,
      iDisplayLength: 15, //paginacion
      order: [[0, "desc"]], //ordenar (columna, orden)
    })
    .DataTable();
}

init();

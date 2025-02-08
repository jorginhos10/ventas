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

  $("#fecha_inicio").change(listar);
  $("#fecha_fin").change(listar);
}


//funcion listar
function listar() {
  var fecha_inicio = $("#fecha_inicio").val();
  var fecha_fin = $("#fecha_fin").val();

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
          sheetName: "VentaArticulos",
          title:
            "Reporte de Compra de articulos de " +
            fecha_inicio +
            " a " +
            fecha_fin,
        },
        {
          extend: "pdfHtml5",
          text: '<i class="fa fa-file-pdf-o"></i> PDF',
          titleAttr: "Exportar a PDF",
          title:
            "Reporte de Compra de articulos de " +
            fecha_inicio +
            " a " +
            fecha_fin,
          //orientation: 'landscape',
          pageSize: "A4",
          exportOptions: {
            columns: [0, 1, 2, 3, 4],
            alignment: "center",
          },
          customize: function (doc) {
            doc.content[1].table.widths = ["5%", "20%", "50%", "10%", "12%"];
          },
        },
      ],
      ajax: {
        url: "Controllers/Consult.php?op=listacomprasarticulos",
        data: { fecha_inicio: fecha_inicio, fecha_fin: fecha_fin },
        type: "get",
        dataType: "json",
        error: function (e) {
          console.log(e.responseText);
        },
      },
      bDestroy: true,
      iDisplayLength: 20, //paginacion
      //""
      //"order":[[0,"desc"]]//ordenar (columna, orden)
    })
    .DataTable();
}

init();

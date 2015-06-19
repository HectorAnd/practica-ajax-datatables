   'use strict';
   var miTabla;
   $(document).ready(function() {
       miTabla = $('#miTabla').DataTable({
           'processing': true,
           'serverSide': true,

           'ajax': 'http://www.futbolistas.com/server_processing2.php',
           "columns": [{
                   "data": "id_doctor",
                   //"visible": false
               }, {
                   "data": "nombre"
               }, {
                   "data": "numcolegiado"
               }, {
                   "data": "id_clinicas"
               }, {
                   "data": "nombreclinicas"
               }, 

               {
                   'data': 'id_doctor',
                   'render': function(data) {
                       return '<a class="btn btn-primary editarbtn" href=http://www.futbolistas.com/editar.php?id_doctor=' + data + '>Editar</a><a class="btn btn-warning borrarbtn" href=http://www.futbolistas.com/borrar.php?id_doctor=' + data + '>Borrar</a>';
                   }
               }
           ],
           'language': {
               'sProcessing': 'Procesando...',
               'sLengthMenu': 'Mostrar _MENU_ registros',
               'sZeroRecords': 'No se encontraron resultados',
               'sEmptyTable': 'Ningún dato disponible en esta tabla',
               'sInfo': 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
               'sInfoEmpty': 'Mostrando registros del 0 al 0 de un total de 0 registros',
               'sInfoFiltered': '(filtrado de un total de _MAX_ registros)',
               'sInfoPostFix': '',
               'sSearch': 'Buscar:',
               'sUrl': '',
               'sInfoThousands': ',',
               'sLoadingRecords': 'Cargando...',
               'oPaginate': {
                   'sFirst': 'Primero',
                   'sLast': 'Último',
                   'sNext': 'Siguiente',
                   'sPrevious': 'Anterior'
               },
               'oAria': {
                   'sSortAscending': ': Activar para ordenar la columna de manera ascendente',
                   'sSortDescending': ': Activar para ordenar la columna de manera descendente'
               }
           }

       });
       $('#miTabla').on('click', '.editarbtn', function(e) {
           e.preventDefault();
           $('#tabla').fadeOut(100);
           $('#formulario').fadeIn(100);
           var nRow = $(this).parents('tr')[0];
           var aData = miTabla.row(nRow).data();
           $('#id_doctor').val(aData.id_doctor);
           $('#nombre').val(aData.nombre);
           $('#numcolegiado').val(aData.numcolegiado);
           $('#id_clinicas').val(aData.id_clinicas);
           $('#nombreclinicas').val(aData.nombreclinicas);
           
       });
       $('#miTabla').on('click', '.borrarbtn', function(e) {
           e.preventDefault();

           var nRow = $(this).parents('tr')[0];
           var aData = miTabla.row(nRow).data();
           var id_doctor = aData.id_doctor;
           $.ajax({
                   url: 'http://www.futbolistas.com/borrar_doctor.php',
                   type: 'GET',
                   dataType: 'json',
                   data: {
                       'id_doctor': id_doctor
                   },
               })
               .done(function() {
                   var $mitabla = $('#miTabla').dataTable({
                       bRetrieve: true
                   });
                   $mitabla.fnDraw();
                   console.log("se ha borrado la clinica" + aData.nombre);

               })
               .fail(function() {
                   console.log("error al borrar la clinica");
               });


       });




       /*Cargamos los datos para las tarifas:*/
       /*function cargarTarifas() {
           $.ajax({
                   type: 'GET',
                   dataType: 'json',
                   url: 'http://www.futbolistas.com/listar_tarifas.php'


               })
               .done(function(data) {
                   $('#idTarifa').empty();
                   $.each(data, function() {
                       $('#idTarifa').append(
                           $('<option></option>').val(this.id_tarifa).html(this.nombre)
                       );
                   });
               })
               .fail(function() {
                   console.log("ha habido un error al obtener las tarifas")

               });
       }
       cargarTarifas();*/

       $('#enviar').click(function(e) {
               e.preventDefault();


               var datos = $('#miFormulario').serialize();
               
               window.alert(datos);
               $.ajax({
                       url: 'http://www.futbolistas.com/modificar_doctor.php',
                       type: 'POST',
                       dataType: 'json',
                       data: datos,

                   })
                   .done(function() {
                       var $mitabla = $('#miTabla').dataTable({
                           bRetrieve: true
                       });
                       $mitabla.fnDraw();
                   })
                   .fail(function() {
                       console.log("error");
                   })
                   .always(function() {
                       $('#tabla').fadeIn(100);
                       $('#formulario').fadeOut(100);
                   });

           
       });

   });

   'use strict';
   var miTabla;
   $(document).ready(function() {
       miTabla = $('#miTabla').DataTable({
           'processing': true,
           'serverSide': true,

           'ajax': 'php/server_processing2.php',
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
            cargarClinicas();
            //selecciono las que estaban
          var clinicas = aData.id_clinicas;

          clinicas = clinicas.split(",");

          //cargo el select con las que ya estaban
          $('#clinicas_e').val(clinicas);

       });
              $('#a_doctor').click(function(e) {
           e.preventDefault();
           $('#tabla').fadeOut(100);
           $('#aformulario').fadeIn(100);
           $('#a_nombre').val(' ');
           $('#a_numcolegiado').val(' ');

            cargarClinicas();
 
      

       });




       $('#miTabla').on('click', '.borrarbtn', function(e) {
           e.preventDefault();

           var nRow = $(this).parents('tr')[0];
           var aData = miTabla.row(nRow).data();
           var id_doctor = aData.id_doctor;
           $.ajax({
                   url: 'php/borrar_doctor.php',
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

       function cargarClinicas() {
           $.ajax({
               type: 'POST',
               dataType: 'json',
               url: 'php/select_clinicas.php',
               async: false,
               error: function(xhr, status, error) {
                   //mostraríamos alguna ventana de alerta con el error
               },
               success: function(data) {
                   $('#clinicas_a,#clinicas_e').empty();
                   $.each(data, function() {
                       $('#clinicas_a,#clinicas_e').append(
                           $('<option ></option>').val(this.id_clinica).html(this.nombre)
                       );
                   });
               },
               complete: {
                   //si queremos hacer algo al terminar la petición ajax
               }
           });
       }




       $('#enviar').click(function(e) {
           e.preventDefault();
         var id_doctor = $('#id_doctor').val();
         var  nombre = $('#nombre').val();
         var  numcolegiado = $('#numcolegiado').val();
          var clinicas_e = $('#clinicas_e').val();

           var datos = $('#miFormulario').serialize();
          
      
           $.ajax({
                   url: 'php/modificar_doctor.php',
                   type: 'POST',
                   dataType: 'json',
                  data: {
                   id_doctor: id_doctor,
                   nombre: nombre,
                   numcolegiado: numcolegiado,
                   clinicas_e:clinicas_e
                   
               }
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




       $('#registrar').click(function(e) {
           e.preventDefault();
      
         var  nombre = $('#a_nombre').val();
         var  numcolegiado = $('#a_numcolegiado').val();
          var clinicas= $('#clinicas_a').val();

           var datos = $('#a_miFormulario').serialize();
          
   
           $.ajax({
                   url: 'php/nuevo_doctor.php',
                   type: 'POST',
                   dataType: 'json',
                  data: {
                 
                   nombre: nombre,
                   numcolegiado: numcolegiado,
                   clinicas:clinicas
                   
               }
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
                   $('#aformulario').fadeOut(100);
               });


       });

   });

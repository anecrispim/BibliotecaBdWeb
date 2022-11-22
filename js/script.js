//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(function() {
	$(".submit").click(function(){
		return false;
	});

	$(document).on("click", ".plus-button", function(){
		if ($(this).data('tipo') == 'table') {
			$("#div-tables").append('<input type="text" class="tables" placeholder="Nome da Tabela" /><button data-tipo="tables" type="button" class="remove-button"><i class="fa-solid fa-trash-can"></i></button>');
			jBloqueiaCampo('tables');
		} else {
			$(this).after('<button data-tipo="columns" type="button" class="remove-button"><i class="fa-solid fa-trash-can"></i></button>');
			$(this).after('<select id="type" class="types" style="margin-left:5px;"></select>');
			$(this).next().append('<option value="INT">INT</option>');
			$(this).next().append('<option value="VARCHAR">VARCHAR</option>');
			$(this).next().append('<option value="DECIMAL">DECIMAL</option>');
			$(this).next().append('<option value="DATETIME">DATETIME</option>');
			$(this).next().append('<option value="TIME">TIME</option>');
			$(this).next().append('<option value="TIMESTAMP">TIMESTAMP</option>');
			$(this).next().append('<option value="YEAR">YEAR</option>');
			$(this).next().append('<option value="DOUBLE">DOUBLE</option>');
			$(this).next().append('<option value="FLOAT">FLOAT</option>');
			$(this).next().append('<option value="CHAR">CHAR</option>');
			$(this).next().append('<option value="JSON">JSON</option>');
			$(this).next().append('<option value="LONGTEXT">LONGTEXT</option>');
			$(this).next().append('<option value="BOOLEAN">BOOLEAN</option>');
			$(this).next().append('<option value="ENUM">ENUM</option>');
			$(this).after('<input type="text" class="columns" placeholder="Nome da Coluna" / data-table="'+$(this).data('table')+'">');
			
			jBloqueiaCampo('columns');
		}
	});

	$(document).on("click", ".remove-button", function() {
		if ($(this).data('tipo') == 'columns') {
			$(this).prev().remove();
		}
		$(this).prev().remove();
		$(this).remove();
		jBloqueiaCampo($(this).data('tipo'));
	});

	$('#user').on('change', function(){
		if ($(this).val() != '' && $('#port').val() != '' && $('#url').val() != '' && $('#nameBD').val() != '') {
			$('#next1').removeAttr('disabled');
			$('#next1').removeAttr('style');
		} else if ($('#next1').attr('disabled') != 'disabled') {
			$('#next1').attr('disabled', 'true');
			$('#next1').attr('style', 'background: #98e1b7;');
		}
	});

	$('#port').on('change', function(){
		if ($(this).val() != '' && $('#user').val() != '' && $('#url').val() != '' && $('#nameBD').val() != '') {
			$('#next1').removeAttr('disabled');
			$('#next1').removeAttr('style');
		} else if ($('#next1').attr('disabled') != 'disabled') {
			$('#next1').attr('disabled', 'true');
			$('#next1').attr('style', 'background: #98e1b7;');
		}
	});

	$('#url').on('change', function(){
		if ($(this).val() != '' && $('#port').val() != '' && $('#user').val() != '' && $('#nameBD').val() != '') {
			$('#next1').removeAttr('disabled');
			$('#next1').removeAttr('style');
		} else if ($('#next1').attr('disabled') != 'disabled') {
			$('#next1').attr('disabled', 'true');
			$('#next1').attr('style', 'background: #98e1b7;');
		}
	});

	$('#nameBD').on('change', function(){
		if ($(this).val() != '' && $('#port').val() != '' && $('#user').val() != '' && $('#url') != '') {
			$('#next1').removeAttr('disabled');
			$('#next1').removeAttr('style');
		} else if ($('#next1').attr('disabled') != 'disabled') {
			$('#next1').attr('disabled', 'true');
			$('#next1').attr('style', 'background: #98e1b7;');
		}
	});

	$(document).on('change', '.tables', function(){
		jBloqueiaCampo('tables');
	});

	$(document).on('change', '.columns', function(){
		$(this).next().attr('data-column', $(this).val());
		jBloqueiaCampo('columns');
	});

	$('#next2').on('click', function(){
		var aSelect = [];
		aSelect.push('<select id="type" class="types" style="margin-left:5px;">');
		aSelect.push('<option value="INT">INT</option>');
		aSelect.push('<option value="VARCHAR">VARCHAR</option>');
		aSelect.push('<option value="DECIMAL">DECIMAL</option>');
		aSelect.push('<option value="DATETIME">DATETIME</option>');
		aSelect.push('<option value="TIME">TIME</option>');
		aSelect.push('<option value="TIMESTAMP">TIMESTAMP</option>');
		aSelect.push('<option value="YEAR">YEAR</option>');
		aSelect.push('<option value="DOUBLE">DOUBLE</option>');
		aSelect.push('<option value="FLOAT">FLOAT</option>');
		aSelect.push('<option value="CHAR">CHAR</option>');
		aSelect.push('<option value="JSON">JSON</option>');
		aSelect.push('<option value="LONGTEXT">LONGTEXT</option>');
		aSelect.push('<option value="BOOLEAN">BOOLEAN</option>');
		aSelect.push('<option value="ENUM">ENUM</option>');
		aSelect.push('</select>');
		$('#div-columns').html('');
		$('input.tables').each(function(){
			
			var sElem = "<h4 style='font-weight: bold;'>"+$(this).val()+"</h4>";
			$('#div-columns').append(sElem);	
			$('#div-columns').append('<input type="text" class="columns" placeholder="Nome da Coluna" / data-table="'+$(this).val()+'">');
			$('#div-columns').append(aSelect.join(''));
			$('#div-columns').append('<button type="button" data-tipo="column" class="plus-button" data-table="'+$(this).val()+'"><i class="fa-solid fa-circle-plus" style="font-size: 14px;"></i></button>');
		});
	});

	$('#gerar-json').on('click', function(){
		var aTables = [];
		var oColumnsFinal = {};
		var oTypes = {};

		$('.tables').each(function(iIdx, oElem){
			aTables.push($(this).val());
			var aColumns = [];
			$('.columns').each(function(){
				if ($(this).data('table') == $(oElem).val()) {
					aColumns.push($(this).val());
				}
			});
			oColumnsFinal[$(oElem).val()] = aColumns;
		});

		$('.types').each(function(){
			oTypes[$(this).data('column')] = $(this).val();
		});

		var oData = {
			  url: $('#url').val()
			, port: $('#port').val()
			, user: $('#user').val()
			, password: $('#senha').val()
			, tipoBD: $('#tipoBD').val()
			, nameBD: $('#nameBD').val()
			, tables: aTables
			, columns: oColumnsFinal
			, types: oTypes
		};
		$.ajax({
			url : "gerarJson.php",
			type : 'post',
			data : oData,
			beforeSend : function(){
				 $("#load").html('<img src="img/load.gif" style="width: 200px;margin-right: 45px;">');
			},
			success: function(){
				$("#load").html('');
				if (confirm('Gerar arquivo JSON para download?')) {
					window.location.href = 'baixar.php';
				} else {
					window.open('mostrar.php');
				}
			}
	   })
	});
});

function jBloqueiaCampo(sTipo) {
	var sElem = 'input.'+sTipo;
	var sButton = sTipo == 'tables' ? '#next2' : '#gerar-json';
	var bHabilita = true;
	$(sElem).each(function(){
		if ($(this).val() == '') {
			bHabilita = false;
		}
	});

	if (bHabilita) {
		$(sButton).removeAttr('disabled');
		$(sButton).removeAttr('style');
	} else {
		$(sButton).attr('disabled', 'true');
		$(sButton).attr('style', 'background: #98e1b7;');
	}
}
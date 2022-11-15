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

	$(".plus-button").on("click", function(){
		$("#div-tables").append('<input type="text" class="tables" placeholder="Nome da Tabela" /><button type="button" class="remove-button"><i class="fa-solid fa-trash-can"></i></button>');
	});
	$(document).on("click", ".remove-button", function() {
		$(this).prev().remove();
		$(this).remove();
	});

	$('#user').on('change', function(){
		if ($(this).val() != '' && $('#port').val() != '' && $('#url').val() != '') {
			$('#next1').removeAttr('disabled');
			$('#next1').removeAttr('style');
		} else if ($('#next1').attr('disabled') != 'disabled') {
			$('#next1').attr('disabled', 'true');
			$('#next1').attr('style', 'background: #98e1b7;');
		}
	});

	$('#port').on('change', function(){
		if ($(this).val() != '' && $('#user').val() != '' && $('#url').val() != '') {
			$('#next1').removeAttr('disabled');
			$('#next1').removeAttr('style');
		} else if ($('#next1').attr('disabled') != 'disabled') {
			$('#next1').attr('disabled', 'true');
			$('#next1').attr('style', 'background: #98e1b7;');
		}
	});

	$('#url').on('change', function(){
		if ($(this).val() != '' && $('#port').val() != '' && $('#user').val() != '') {
			$('#next1').removeAttr('disabled');
			$('#next1').removeAttr('style');
		} else if ($('#next1').attr('disabled') != 'disabled') {
			$('#next1').attr('disabled', 'true');
			$('#next1').attr('style', 'background: #98e1b7;');
		}
	});

	$(document).on('change', '.tables', function(){
		$('.tables').each(function(){
			if ($(this).val() == '') {
				if ($('#next2').attr('disabled') != 'disabled') {
					$('#next2').attr('disabled', 'true');
					$('#next2').attr('style', 'background: #98e1b7;');
				}
			} else {
				$('#next2').removeAttr('disabled');
				$('#next2').removeAttr('style');
			} 
		});
	});
});
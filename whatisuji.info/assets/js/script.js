$(document).ready(function(){    
    $(".homeVimeo").fitVids();
	loadAll();

    updateResize();
    $(window).resize(function(){
        updateResize();
    });
    
    $('#spyme').on('activate.bs.scrollspy', function () {
		console.log('hello');
  	})
  	
});

function updateResize(){
    $('.section').css('min-height',$(window).height()+'px')
    $('#gallery').css('max-height',$(window).height()+'px')
    setTimeout(function(){centerVideo();},1000);
}

function centerVideo(){
	var margin_vid = $(window).height()/2 - $('#video').height()/2;
	$('#video').css('margin-top',margin_vid+'px');
}
function loadAll(){
	$('#load0').fadeIn(500); // video first

	setTimeout(function(){$('#load1').fadeIn(1000)},1000);	
	setTimeout(function(){$('#load2').fadeIn(1000)},1000);	
	setTimeout(function(){$('#load3').fadeIn(1000)},1000);	
	setTimeout(function(){$('#load4').fadeIn(1000)},1000);
	setTimeout(function(){$('#load5').fadeIn(1000)},1000);	
}
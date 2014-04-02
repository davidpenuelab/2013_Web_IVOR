$(document).ready(function(){    
    $(".homeVimeo").fitVids();
	loadAll();

    setTimeout(function(){centerVideo();},1000);
    setTimeout(function(){centerGallery();},1000);
    setTimeout(function(){centerCredits();},1000);
    
	setupSections();

    $(window).resize(function(){
        updateResize();
    });
    	
	setupVimeo();
    
});

function updateResize(){
    centerVideo();
    centerGallery();
    centerCredits();
}

function centerVideo(){
	var margin_vid = $(window).height()/2 - $('#video').height()/2;
	$('#video').css('margin-top',margin_vid+'px');
}

function centerGallery(){
	var margin_gal = $(window).height()/2 - $('#gallery').height()/2;
	$('#gallery').css('margin-top',margin_gal+'px');
}

function centerCredits(){
	var margin_cred = $(window).height()/2 - $('.second').height();
	$('.second').css('top',margin_cred+'px');
}

function loadAll(){
	$('#load0').fadeIn(500); // video first
	setTimeout(function(){$('#load1').fadeIn(1000)},500);	
	setTimeout(function(){$('#load2').fadeIn(1000)},1000);	
	setTimeout(function(){$('#load3').fadeIn(1000)},1000);	
	setTimeout(function(){$('#load4').fadeIn(1000)},1000);
	setTimeout(function(){$('#load5').fadeIn(1000)},1000);	
}

function setupSections(){
	$(".main").onepage_scroll({
		sectionContainer: "section",
		loop: false,
		pagination: false,
		responsiveFallback: 768,
		beforeMove: function(next_index) {
		  console.log("next_index->"+next_index);
		}     
	});

}

function setupVimeo(){
	console.log("+++++++++++++++++++++++++++++++++++");
	console.log("0 - START SETUP VIMEO");
	
	 // Listen for the ready event for any vimeo video players on the page
	var vimeoPlayers = $(document).find('iframe');
	
	for (var i = 0, length = vimeoPlayers.length; i < length; i++) {
		console.log("+++++++++++++++++++++++++++++++++++");
		console.log("1 - asign the player");
	    player = vimeoPlayers[i];
	    $f(player).addEvent('ready', ready);
	}
	
	/**
	 * Utility function for adding an event. Handles the inconsistencies
	 * between the W3C method for adding events (addEventListener) and
	 * IE's (attachEvent).
	 */
	function addEvent(element, eventName, callback) {
		console.log("+++++++++++++++++++++++++++++++++++");
		console.log("2 - add the event ");
		if (element.addEventListener) {
			console.log("if");
			element.addEventListener(eventName, callback, false);
		}else {
			console.log("else");
			element.bind('on' + eventName, callback);
		}
	}
	
	/**
	 * Called once a vimeo player is loaded and ready to receive
	 * commands. You can add events and make api calls only after this
	 * function has been called.
	 */
	function ready(player_id) {
		console.log("+++++++++++++++++++++++++++++++++++");
		console.log("3 - I am ready");
	
	    // Keep a reference to Froogaloop for this player
	    var container = document.getElementById(player_id).parentNode.parentNode;
	    var froogaloop = $f(player_id);
	    function setupSimpleButtons() {
		console.log("+++++++++++++++++++++++++++++++++++");
		console.log("4 - Setup simple buttons");
	
			console.log("setup buttons");
	        var buttons = $(container).find('.homeVimeo'),
	            playBtn = $(buttons).find('.playbutton');
	            console.log(playBtn);
	
	        // Call play when play button clicked
	       $('.playbutton img').click(function() {
			   console.log("+++++++++++++++++++++++++++++++++++");
			   console.log(" BUTTON PRESSED ");
			   console.log("+++++++++++++++++++++++++++++++++++");
			   $(this).fadeOut(4200);
			   froogaloop.api('play');
			});
		}
		function setupPlayer(){
			console.log("+++++++++++++++++++++++++++++++++++");
			console.log("5 - Extra setup Player");	
		}
		function onFinish(){
			console.log("+++++++++++++++++++++++++++++++++++");
			console.log("6 - Setup FINISH event");	
			froogaloop.addEvent('finish', function(data) {
				console.log("+++++++++++++++++++++++++++++++++++");
				console.log("END PLAYING VIDEO");	
				console.log("+++++++++++++++++++++++++++++++++++");
				$('.playbutton img').fadeIn(100);
			});
		}
	    setupSimpleButtons();
	    setupPlayer();
	    onFinish();
		console.log("+++++++++++++++++++++++++++++++++++");
		console.log("7 - END SETUP VIMEO");	
		console.log("+++++++++++++++++++++++++++++++++++");
	}
}
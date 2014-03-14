var currC = 0; 

var p;
var once = 1;
//snap
var el = $('body');
var nextPost;
var timer;
var prevPost;
var scrollTop = 0;
var scrollwheel = false;
var article = $('article');

var currentSetOfQuestions = 1;
var currentQuestion = 1;
var totalQuestions = 5;

var qFile = "js/qs.json";
var aFile = "js/saveInfo.php";

var questions = new Array();
var answers = new Array();

var param;
$(document).ready(function(){
	
	param = parseURLParams(document.URL);
	/*****************************/
	/*JSON->JS********************/
	/*****************************/
	$.getJSON( "js/qs.json", function( data ) {
	    var items = new Array();
	      $.each( data, function( key, val ) {
	        questions = val.questions.slice();
	        answers = val.answers.slice();
	      }); 
	  }).fail(function(jqxhr, textStatus, error ) {
	      var err = textStatus + ", " + error;
	      console.log( "Request Failed: " + err );
	  }).done(function() {
		console.log("ready 1");
		setup();
		loadJsonInformation();
		$( "#answerForm" ).focus(function() {
			if(once==1){
				once = 0;
	  			$("#answerForm").html(""); 
	  			$('#send').fadeIn();
			}
			$('*:focus').css('outline','none');
		});
	
	
		// auto adjust the height of
		$('#a').on( 'keyup', 'textarea', function (e){
		    $(this).css('height', 'auto' );
		    $(this).height( this.scrollHeight );
		});
		$('#a').find( 'textarea' ).keyup();
	
		$('#s').click(function(event){
			event.preventDefault();
			$('#a').fadeOut('fast');
			$('#s').fadeOut('fast',function(){
				$('#thanks').fadeIn();
				$('button').css('display','none');
			});
			saveText();
		});
		
		
	
		$(window).resize(function(){
			var el = $('body');
			init(el);
			resetTextPos();
			
		});
	
	});
	
});


function resetTextPos(){
	var h = $('#q').height();
	var ch = h/2;
	
	
}
function setCurrentSet(currentQ, currentSet){
	currentQuestion = currentQ;
	currentSetOfQuestions = currentSet;
}
function getCurrentSet(currentQ){
	var result = 1;

	if(currentQ<6){
		return 1;
	}else if(currentQ<11){
		return 2;

	}else if(currentQ<16){
		return 3;

	}else if(currentQ<21){
		return 4;
	}else{
		return 1;
	}
	 
}

function setup(){
	if(param == null || param == undefined || param.q>totalQuestions){
		setCurrentSet(1,getCurrentSet(1));
	}else{
		setCurrentSet(param.q,getCurrentSet(param.q));
	}
	$('#center').html('Nº'+currentQuestion+' of '+ totalQuestions); // number X from Y, number 'currentQuestion' of 'totalQuestions'(taken fom json);
	$('#hiddenQ').attr('q',currentQuestion);// where do we save it

	$('.header').fadeIn(2000);
	// fade in cover and body
	setTimeout(function(){$('article').fadeIn(2000);}, 500);

	init(el);

	header = 'inactive';

	//set font properties
/*
	$("#q").fitText(1.1, { minFontSize: '0px', maxFontSize: '70px' });
	$("#thanks").fitText(1.1, { minFontSize: '0px', maxFontSize: '30px' });
	$("#answerForm").fitText(1.1, { minFontSize: '0px', maxFontSize: '30px' });
	$("#goodbye p").fitText(1.1, { minFontSize: '0px', maxFontSize: '20px' });
	$("#goodbye2 p").fitText(1.1, { minFontSize: '0px', maxFontSize: '20px' });
*/
	var nextQ = parseInt(currentQuestion)+1;
	if(nextQ>totalQuestions){
		nextQ = 1;
	}

	$("#nextOne").attr("href", "/index.php?q="+nextQ);
	
	if($('body').hasClass('about')){
		$('body').addClass('normal');
	}else{
		console.log("home"+currentSetOfQuestions);
		$('body').addClass('set'+currentSetOfQuestions);
	}
	
}

function init(el){
	var winWidth = $(window).width();
	winHeight = $(window).height();
	halfHeight = winHeight / 2;
	var figHeight = winHeight - 240;
	$('.inner', el).css({height:figHeight});	
}

// Navigation
function findNext(){
	var scrollPosition = $(document).scrollTop();
	$('.block').each(function() {
		that = $(this);
		currentPosition = that.offset().top;
		if (currentPosition > scrollPosition) {
			nextPost = that;
			$.scrollTo(nextPost, 300, {axis:'y', easing:'easeInOutQuart'});
			return false;
		}
	});
}

function findPrev(){
	var scrollPosition = $(document).scrollTop();
	$($('.block').get().reverse()).each(function(){
		that = $(this);
		currentPosition = that.offset().top;
		if (currentPosition < scrollPosition) {
			prevPost = that;
			$.scrollTo(prevPost, 300, {axis:'y', easing:'easeInOutQuart'});
			return false;
		}
	});
}

function updateElementsWeb(){
	currentQuestion++;
	if(currentQuestion>totalQuestions){
		currentQuestion=1;
	}
	setCurrentSet(currentQuestion,getCurrentSet(currentQuestion));

	$('#center').html('Nº'+currentQuestion+' of '+ totalQuestions); // number X from Y, number 'currentQuestion' of 'totalQuestions'(taken fom json);
	$('#hiddenQ').attr('q',currentQuestion);// where do we save it
}
function saveText(){
	var text = $('textarea#answerForm').val();
	saveAnswer(text, currentQuestion,aFile);
}

function loadJsonInformation(){
	//json load
	console.log("loadjson 2");

	console.log("cQ-> "+currentQuestion);
	console.log("Q->"+questions[currentQuestion-1].q);
	console.log("A->"+answers[currentQuestion-1].a);
	$("#q").html(questions[currentQuestion-1].q);
	$("#thanks").html(answers[currentQuestion-1].a).hide();

}

function swapHeaderBottom(){
// 	$('#left').fadeOut();
// 	$('#center').fadeOut();
// 	$('#right').fadeOut();

// 	var nextQ = parseInt(currentQuestion)+1;
// 	if(nextQ>=totalQuestions){
// 		nextQ = 1;
// 	}
// 	$('#center').html('<a href="/index.php?q='+nextQ+'">Answer another question</a>').hide().fadeIn();
// 
}

function swapHeaderTop(){
	// $('#left').fadeIn();
	// $('#center').html('Nº1 of 5').fadeIn();
	// $('#right').fadeIn();
}

//taken from another site for the arrow scrolling
// Easing
$.extend($.easing,
{
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	}
});

// Mousewheel plugin
(function(a){function d(b){var c=b||window.event,d=[].slice.call(arguments,1),e=0,f=true,g=0,h=0;b=a.event.fix(c);b.type="mousewheel";if(c.wheelDelta){e=c.wheelDelta/120}if(c.detail){e=-c.detail/3}h=e;if(c.axis!==undefined&&c.axis===c.HORIZONTAL_AXIS){h=0;g=-1*e}if(c.wheelDeltaY!==undefined){h=c.wheelDeltaY/120}if(c.wheelDeltaX!==undefined){g=-1*c.wheelDeltaX/120}d.unshift(b,e,g,h);return(a.event.dispatch||a.event.handle).apply(this,d)}var b=["DOMMouseScroll","mousewheel"];if(a.event.fixHooks){for(var c=b.length;c;){a.event.fixHooks[b[--c]]=a.event.mouseHooks}}a.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var a=b.length;a;){this.addEventListener(b[--a],d,false)}}else{this.onmousewheel=d}},teardown:function(){if(this.removeEventListener){for(var a=b.length;a;){this.removeEventListener(b[--a],d,false)}}else{this.onmousewheel=null}}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);

/*****************************/
/*****************URL PHP->JS*/
/*****************************/
function parseURLParams(url) {
  console.log("parsing "+url);

  var queryStart = url.indexOf("?") + 1;
  var queryEnd   = url.indexOf("#") + 1 || url.length + 1;
  var query      = url.slice(queryStart, queryEnd - 1);

  if (query === url || query === "") return;

  var params  = {};
  var nvPairs = query.replace(/\+/g, " ").split("&");

  for (var i=0; i<nvPairs.length; i++) {
    var nv = nvPairs[i].split("=");
    var n  = decodeURIComponent(nv[0]);
    var v  = decodeURIComponent(nv[1]);
    if ( !(n in params) ) {
      params[n] = [];
    }
    params[n].push(nv.length === 2 ? v : null);

  }
    console.log("params-> "+parseInt(params.q));
	return params;
}

/*****************************/
/***************JSON HANDLERS*/
/*****************************/


/*****************************/
/*JS->JSON********************/
/*****************************/
//text = text, answer to save
//currentQ= number of the question. We save it in order to know wich answer goes with wich question
//name of the file to be saved in
function saveAnswer(text, currentQ,aFile){
  $.post( aFile, { t: text, q: parseInt(currentQ) } )
        .done(function(){console.log("Successfully saved "+text+" in "+aFile+". CQ Current answer saved under the question "+currentQ);})
        .fail(function(){console.log("Error while saving to File "+aFile);});
}

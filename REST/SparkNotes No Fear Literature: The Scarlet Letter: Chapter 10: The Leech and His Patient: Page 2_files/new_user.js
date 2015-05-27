// user.js
// (c)2001-2005 SparkNotes, LLC
// $Id: new_user.js 31053 2014-11-20 18:22:43Z juliana $

/* Sets up the "Return to studying..." bookmark */
function saveBookmark(title, url, page_type) {
	// If you pass title here (ie: via head/configure.epl) it should be as
	// short+sweet as possible.  Otherwise, this sub will attempt to parse
	// the HTML title, which should be in this format:
	//
	// SparkNotes: Document Title: Page Title
	//
	// 'Page Title' (and the colon before it) is optional.
	
	if (!title) {
		// Strip "SparkNotes: " from the beginning of title. Strip out
		// the second colon and anything following it (if present.)
		title = document.title;
		var res = title.match(/([^\s:][^:]+[^\s:])/g);
		title = res[1] || res[0] || title; 
	}
	
	if (!url) {
		// Determine the current URL
		url = window.location + "";
	}

	if (!page_type) {
		// Determine what type of page it is (www, mb, or tp)
		var identifier = url.substring(7,9);
		var page_type;
		if (identifier == "ww" && url.indexOf("testprep") > 0 ) { page_type = "tp"; }
		else if (identifier == "ww" && url.indexOf("testprep") == -1 ) { page_type ="www"; }
		else if (identifier == "mb") { page_type = "mb"; } 
		else { page_type =""; }
	}

	setCookie ("bookmark_title", title, "1000");
	setCookie ("bookmark_url", url, "1000");
	setCookie ("bookmark_type", page_type , "1000");
	
	// for debugging:
	//document.write('<h4>', title, ' ', url, ' ', page_type, '</h4>');
}

/** CURRENTLY DOESN'T HANDLE TESTPREP **/
function print_bookmark() {

	//if the user isn't logged in, then don't print anything
	if(is_loggedin()) {

		var bookmark_url = get_bookmark_url();
		var bookmark_title = get_bookmark_title();
		var bookmark_type = get_bookmark_type();
		var prefix;
		if(bookmark_url != "" && bookmark_url != null && bookmark_title != ""  && bookmark_title != null) {
			
			if (bookmark_type == "mb") { prefix = "Return to the "; }
			else { prefix = "Go back to studying "; }

			
			document.write (prefix + "<a href='" + bookmark_url + "'>" + bookmark_title + "</a>");
		}
	}

}

//sends the page to the url indicated in the parameters, with the origin passed in the "url" variable.
function addUrl (url) {

        window.location.href = url;

}

/*
** returns the correct help page, depending on where the user currently is
**
*/

function get_help_url() {

	var url = window.location.href;
	var help_url;
	if(url.indexOf("http://www.sparknotes.com/testprep/") != -1 || url.indexOf("http://testprep.sparknotes.com/") != -1) {		
		help_url = "http://www.sparknotes.com/testprep/help/";
	}
	else {
	help_url = "http://www.sparknotes.com/help/";
	}
	window.location.href = help_url;

}

/*
** prints the user links for the right hand side of the subnavigation
**
*/

function print_user_links() {

	var userName = getUserNick();
	if (userName) {
		document.write("<ul><li class='first'><a href='javascript:get_help_url();'>Help</a></li><li><a href='http://www.sparknotes.com/account/" + userName + "'>Profile</a></li><li><a href='http://www.sparknotes.com/account/preferences'>Account</a></li><li class='last'><a href='javascript:addUrl(\"https://www.sparknotes.com/logout\")'>Log out</a></li></ul>");
	} else {
		document.write("<ul><li class='first'><a href='javascript:get_help_url();'>Help</a></li><li><a href='javascript:addUrl(\"https://www.sparknotes.com/login\")'>Log in</a></li><li><a href='javascript:addUrl(\"https://www.sparknotes.com/account/signup\")'>Sign Up for a Free Account</a></li></ul>");
	}
}

function print_user_links2013() {
	var userName = getUserNick();
	var htmlBlock = '<ul class="clearfix is-inline text-color semi-bold user-links">';
	if(userName) {
		htmlBlock += '<li class="top-login"><a href="http://www.sparknotes.com/account/' + userName + '">Profile</a></li>';
		htmlBlock += '<li><a href="http://www.sparknotes.com/account/preferences">Account</a></li>';
		htmlBlock += '<li class="border-0"><a href="javascript:addUrl(\'https://www.sparknotes.com/logout\')">Log out</a></li>';
	} else {
		htmlBlock += '<li class="border-0">Login with</li>';
		htmlBlock += '<li class="border-0" id="socializebuttons"></li>';
		htmlBlock += '<li class="email-sign-up"><a class="hide-text" href="#" id="emailLoginLink">email</a></li>';
		htmlBlock += '<li class="sign-up" ><a href="javascript:addUrl(\'https://www.sparknotes.com/account/signup\')">Sign Up for a Free Account</a></li>';
	}
	htmlBlock += '<li class="border-0 help"><a href="javascript:get_help_url();"">Help</a></li>';
	htmlBlock += '</ul>';
	document.write(htmlBlock);
}

function print_user_links_newsl() {

	

	var userName = getUserNick();
	if (userName) {
	
		
		document.write("<a href='javascript:get_help_url();'>Help</a>&nbsp;|&nbsp;<a href='http://www.sparknotes.com/account/preferences'>Account</a>&nbsp;");
		
		document.write("&nbsp;|&nbsp;<a href='javascript:addUrl(\"https://www.sparknotes.com/logout\")'>Log out</a></span>");
	
	} else {
	
		document.write("<a href='javascript:get_help_url();'>Help</a>&nbsp;|&nbsp;<a href='javascript:addUrl(\"https://www.sparknotes.com/login\")'>Log in</a>&nbsp;|&nbsp;<a href='javascript:addUrl(\"https://www.sparknotes.com/account/signup\")'>Sign Up for a Free Account</a>&nbsp;");
		
		
	}
}

function print_welcome_msg() {

	var userName = getUserNick();
	if (userName) {
		document.write("<b>Welcome " + userName + "!</b> ");
		
	} else {
		document.write("Welcome to SparkNotes! ");
	}


}


function get_bookmark_url () {
	
	return getCookie("bookmark_url");
}

function get_bookmark_title () {

	return getCookie("bookmark_title");

}

function get_bookmark_type () {

	return getCookie("bookmark_type");

}


//
//  returns a link (in the given style class) to the last visited Study Guide or null otherwise
//

function lastGuideVisited(cls) {

	var url = getCookie("last_guide_url");
	var title = getCookie("last_guide_title");
	
	show_bookmark = ((url != null) && (url != "") && (title != null) && (title != ""));

	if (show_bookmark) {
		return "<A HREF=\"" + url + "\" class=\"" + cls + "\">" + title + "</A>";
	} else {
	        return null;
	}
}


// return the user's nickname.  relies on PLogin to set cookie snu_nick.
function getUserNick() {
	return getCookie("snu_nick");
}


function is_loggedin() {
	var nickname = getCookie("snu_nick");
	if(nickname != null && nickname != "") { return true; }
	else { return false; }
}

//since we can't really touch the database to make sure a remember cookie is authentic
//just assume it is and do the real check when they try to do something
function fake_memory()
{
    if(!is_loggedin())
    {
        if(getCookie('psist') != null)
        {
            if(getCookie('psist_nick') != null)
            {
                document.cookie = "snu_nick=" + getCookie('psist_nick')
                + "; path=/" +
	            "; domain=.sparknotes.com";
            }
            else
            {
                document.cookie = "snu_nick=sparknotestheactualperson"
                + "; path=/" +
	            "; domain=.sparknotes.com";
            }
        }
    }
}


//
// Stores the Current Page for the user, for up to one month
//
                
function saveBookmarkX() {

        var today = new Date();
        var currenturl = window.location + "";
        var currenttitle = document.title;
        var identifier = currenturl.substring(7,9);
//filter out the SparkNotes text from the title
	if (currenttitle.substr(0,12) == "SparkNotes: ")
		currenttitle = currenttitle.substr(12);
	if (currenttitle.substr(0,11) == "SparkNotes ")
		currenttitle = currenttitle.substr(11);
//        currenttitle = currenttitle.substring(12, currenttitle.length);

        setCookie ("bookmark", currenturl, "1000");
        setCookie ("new_bookmark", currenttitle, "1000");

	if (identifier == "ww") {
		if (currenturl.indexOf("testprep") > 0) {
			setCookie ("last_testprep_url", currenturl, "1000");
			setCookie ("last_testprep_title", currenttitle, "1000");
		} else 	if (currenturl.indexOf(".dir") == -1) {
			setCookie ("last_guide_url", currenturl, "1000");
			setCookie ("last_guide_title", currenttitle, "1000");
		}
	} else if (identifier == "mb") {
		var boardid_start = currenturl.indexOf("b=");
		var boardid_end = currenturl.indexOf("&");
		if (boardid_end == -1) {
			boardid_end = currenturl.indexOf("#");
			if (boardid_end == -1) boardid_end = currenturl.length+1
		};
		if (boardid_start != -1) {
			currenturl = "http://mb.sparknotes.com/mb.mpl?" + currenturl.substring(boardid_start, boardid_end);
		} else {
			currenturl = null;
			currenttitle = null;
		}
		setCookie ("last_board_url", currenturl, "1000");
	        setCookie ("last_board_title", currenttitle, "1000");
	} else if (identifier == "te") {
		setCookie ("last_testprep_url", currenturl, "1000");
		setCookie ("last_testprep_title", currenttitle, "1000");
	}
}

                      




//
// Sets cookie values.
//
function setCookie(name, value, expiredays) {
    var ExpireDate = new Date ();
    ExpireDate.setTime(ExpireDate.getTime() + (expiredays * 24 * 3600 * 1000));

	document.cookie = name + "=" + escape(value)
         + "; path=/" +
	   "; domain=.sparknotes.com"
         + ((expiredays == null) ? "" : "; expires=" + ExpireDate.toGMTString());

}

//
// Gets cookie values.
//
function getCookie(Name) {
	var search = Name + "=" ;
	if (document.cookie.length > 0) { // if there are any cookies
		offset = document.cookie.indexOf(search) ;
		if (offset != -1) { // if cookie exists
			offset += search.length ;
			// set index of beginning of value
			end = document.cookie.indexOf(";", offset) ;
			// set index of end of cookie value
			if (end == -1) end = document.cookie.length
			return unescape(document.cookie.substring(offset, end));
		}
	}
}


//
// Drops a test cookie
//
function setTestCookie() {
	var date = new Date();
	setCookie('testcookie', Math.floor(date.getTime() / 1000));
}

setTestCookie(); //always try so we can check cookie setting status
fake_memory();


// Handles th user login dialog box at the top
// of sparknotes, sparklife and mindhut.

function setupEmailLoginDialog() {

	jQuery(document).click(function()
	{
		jQuery("#login-dialog").slideUp('medium');
		jQuery("#emailLoginLink").removeClass('active');
	});
	jQuery("#login-dialog").click(function(event)
	{
		event.stopPropagation();
	});

	jQuery("#emailLoginLink").click(function(event){
		jQuery("#referer").val(window.location.href);
		if( jQuery("#login-dialog").is( ":hidden" ) )
		{
			jQuery("#login-dialog").slideDown('medium');
			jQuery("#emailLoginLink").addClass('active');
		}
		else
		{
			jQuery("#login-dialog").slideUp('medium');
			jQuery("#emailLoginLink").removeClass('active');
		}
		event.stopPropagation();
	});
/*
	jQuery("#loginform").submit(function(e) 
	{
		e.preventDefault();
		var email = jQuery(this).find("input[name='email']").val();
		var password = jQuery(this).find("input[name='password']").val();
		var remember = jQuery(this).find("input[name='remember_me']").val();
		var referer = location.href;

		var posting = jQuery.post( '/login', { email: email, password : password, remember_me : remember, referer: referer } );
		posting.done(function(data)
		{
			var form = jQuery(data).find("#loginform").html();
			if(form)
			{
				jQuery("#login-dialog > #loginform").html(form);
			}
			else
			{
				location.reload();			
			}
			

		});
	});*/
};

/* jQuery homegrown plugin that replaces jQuery Tools tooltip functionality
** Nathaniel Herz
** Copyright 2013
*/ 
;(function( $ ){
  /* replicate the jQuery Tools tooltip method or as much of it as we need 
  */
  $.fn.SparkTooltip = function( options ) {

    // Set and extend options
    options = $.extend({}, defaults, options);

    return this.each(function() {        
      var $this = $(this);
      if($this.hasClass('next')) {
      	$this.tooltip = $this.parent().parent().children('.tooltip').eq(1);
  	  } else if($this.next().hasClass('tooltip')) {
  	  	$this.tooltip = $this.next();
  	  }  else {
  	  	$this.tooltip = $this.parent().parent().children('.tooltip').first();
  	  }
      $this.tooltip.css('position','absolute');         
      var ot = $this.offset().top + options.offset[0];
      var lt = $this.offset().left + 30 + options.offset[1];
      lt = Math.floor(lt);
      /*
      // try with position instead
      var position = $this.position();
      ot = position.top;
      lt = position.left;
      lt = Math.floor(lt);
      */
      if(!$this.hasClass('arrow-nav')) {
      	$this.click(function(e){e.preventDefault();});
  	  }
      $this.mouseover(function(e){
        $this.tooltip.css('left',-1000); 
        $this.tooltip.css('display','block');   
        $this.tooltip.offset({top: ot, left: lt});             
        $this.tooltip.fadeIn('slow');
        //console.log('mouseover event. top: ' + ot + ' left: ' + lt);
        //console.log(options.offset[0]);
        //console.log(options.offset[1]);  
      });
      $this.mouseout(function(e){        
        $this.tooltip.fadeOut('slow');
        //console.log('mouseout event. top: ' + ot + ' left: ' + lt);    
      });

    });
  };
  var defaults = {
  	cancelDefault: true,
  	effect: 'toggle',
  	delay: 30,
  	events: {},
  	layout: '<div/>',
    offset: [0, 0],
    opacity: 1,
    position: 'top center',
    predelay: 0,
    relative: false,
    tipClass: 'tooltip' 
  };
  
})( jQuery );

/* jQuery homegrown plugin that replaces jQuery Tools overlay functionality
** Nathaniel Herz
** Copyright 2013
*/ 
;(function( $ ) {
	
		$.fn.SparkOverlay = function( options ) {
		// Set and extend options
    	options = $.extend({}, defaults, options);

	    // Set and extend options
	    //options = $.extend({}, defaults, options);
	    return this.each(function() {
	      // overlay selector should have click element attached to it that opens target       
	      var $this = $(this);
	      // attach reference to trigger element so that data('SparkOverlay') is useful

	      var target = $this.attr('rel') || options.target;
	      if(!target) {
	      	// problem
	      	console.log('problem finding a target');
	      	return;
	      }
	      //$this.overlay = $this.parent().parent().children('.overlay').first();
	      $this.close = function() {
	      	// call option onBeforeClose if set
	      	if(options.onBeforeClose) {options.onBeforeClose();}
	      	jQuery(target).hide();
	      	// call option onClose if set
	      	if(options.onClose) {options.onClose();}
	      };
	      $this.load = function() {	      	
	      	//$(target).css('position','absolute');         
      		var ot = $this.offset().top + options.offset[0];
      		var lt = $this.offset().left + 30 + options.offset[1];
      			
      		if(options.fixed) {
	      		$(target).css('position','fixed');
	      	} else {
	      		$(target).css('position','absolute');
	      	}
	      	
	      	//$(target).css('top',options.top);
	      	//$(target).css('left',options.left);
	      	//$(target).css('left',-1000); 
        	$(target).css('display','block'); 
	      	$(target).offset({top: ot, left: lt}); 
	      	//$(target).css('top',''+ot+'px');
	      	//$(target).css('left',''+lt+'px');
	      	$(target).show();
	      	//$(target).css('display','block');
	      	console.log(ot);
	      	console.log($(target).offset());
	      	console.log($(target).css('top'));
	      };
	      $this.data('SparkOverlay',$this);
	      $this.click(function(e){
	      	e.preventDefault();	      	
	      	if(options.fixed) {
	      		$(target).css('position','fixed');
	      	} else {
	      		$(target).css('position','absolute');
	      	}
	      	$(target).css('top',options.top);
	      	$(target).css('left',options.left);
	      	// call option onBeforeLoad if set
	      	if(options.onBeforeLoad) {options.onBeforeLoad();}
	      	$(target).show();
	      	// call option onLoad if set
	      	if(options.onLoad) {options.onLoad();}
	      });
	  	});
	};
	var defaults = {
	closeOnClick: true, 
	fixed: false,
	offset: [0, 0],
    left: "center",
    top: '10%'
  };  

})(jQuery);


// 
// This little jQuery homegrown plugin clears the default value
// of an input or textarea on focus and resets it on blur.
//

;(function( $ ) {

	$.fn.clearOnFocus = function() {
		$(this).each( function() {
			var $this = $(this),
				defaultVal = $this.val();

			$this.focus( function() {
				if ($this.val() === defaultVal) {
					$this.val('');
				}
			});
			$this.blur( function() {
				if ($this.val() === '') {
					$this.val(defaultVal);
				}
			});
		});
	};

})(jQuery)

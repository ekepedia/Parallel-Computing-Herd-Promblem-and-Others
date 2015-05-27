function objectWrite(value) {
	document.write(value);
}

function getALEWindow(myWindow) {
	if (myWindow.opener) {
		return getALEWindow(myWindow.opener);
	} else {
		return myWindow.parent;
	}
}

function init() {
	showVariableContent();
}

function showVariableContent() {
	if ((getCookie('ProductType') == 30) || (getCookie('ProductType') == 43)) {
		changeCss('DIV.ctv');
		hideClass('ct');
	} else {
		changeCss('DIV.ct');
		hideClass('ctv');
	}

	if (getCookie('IsEssential') == 'false') {
		changeCss('DIV.honors');
		hideClass('core');
	} else {
		changeCss('DIV.core');
		changeCss('SPAN.core');
		hideClass('honors');
	}

	if ((getCookie('Pathway') == 'Honors')) {
		UnembellishKeyTerms();
	}

}

function IsKeyTermEmbellished() {
	if (getCookie('Pathway') == 'Honors') {
		return false;
	}
	return true;
}

function UnembellishKeyTerms() {
	var $myWindow = getALEWindow(window).$(window.document);
	var $keyterms = $myWindow.find("span.keyterm");
	$keyterms.find("object").remove();
	$keyterms.each(function(i) {
		var fc = this.firstChild;
		fc.nodeValue = (fc.nodeValue).replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g,
				'');
	});
}

function changeCss(newRule) {
	if (document.createStyleSheet) {
		var newStyle = document.createStyleSheet();
		newStyle.addRule(newRule, "display:block;")
	} else {
		var styleElement = document.createElement("style");
		styleElement.type = 'text/css';
		styleElement.appendChild(document.createTextNode(newRule
				+ " { display : block; }"));
		document.getElementsByTagName("head")[0].appendChild(styleElement);
	}
}

function hideClass(strClassName) {
	var arrElements = getElementsByClassName(window.document, "div",
			strClassName);

	for ( var i = 0; i < arrElements.length; i++) {
		arrElements[i].innerHTML = '';
	}
}

function getCookie(check_name) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split(';');
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	for (i = 0; i < a_all_cookies.length; i++) {
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split('=');

		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		// if the extracted name matches passed check_name
		if (cookie_name == check_name) {
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no =
			// sign, that is):
			if (a_temp_cookie.length > 1) {
				cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g,
						''));
			}
			// note that in cases where cookie is initialized but no value, null
			// is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if (!b_cookie_found) {
		return null;
	}
}

function getPrintableType() {
	var myPathname = window.location.pathname;
	var indexofLastSlash = myPathname.lastIndexOf('/');
	var myFilename = myPathname.substring(indexofLastSlash + 1).replace(/\d*/g,
			'').replace(/_/g, ' ').replace('.htm', '');
	return myFilename;
}

function showAnswers(show) {
	var redirectLocation = window.location.href;
	// check for showAnswers
	var queryString = window.location.search.substring(1);
	if (queryString == "") {
		redirectLocation = redirectLocation + '?showAnswers=' + show;
	} else if (queryString.search(/showAnswers/) > -1) {
		if (show)
			redirectLocation = redirectLocation.replace('showAnswers=false',
					'showAnswers=true');
		else
			redirectLocation = redirectLocation.replace('showAnswers=true',
					'showAnswers=false');
	} else {
		redirectLocation = redirectLocation + '&showAnswers=' + show;
	}

	window.location = redirectLocation;
}

function getElementsByClassName(oElm, strTagName, strClassName) {
	var arrElements = (strTagName == "*" && oElm.all) ? oElm.all : oElm
			.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for ( var i = 0; i < arrElements.length; i++) {
		oElement = arrElements[i];
		if (oRegExp.test(oElement.className)) {
			arrReturnElements.push(oElement);
		}
	}
	return (arrReturnElements)
}

var childWindow;
function RenderAssetContent(assetContentName, contentID, assetID, displayName,
		height, width, title, isPrintable) {
	CloseChildWindow();
	childWindow = window.open(assetContentName, assetID,
			"scrollbars=yes, scrollbars=1, resizeable=1, width= " + width
					+ " ,height=" + height);

}

function CloseChildWindow() {
	if (childWindow != null) {
		childWindow.close();
	}
}
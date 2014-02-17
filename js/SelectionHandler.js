/*jslint vars: true */
var Zuhlke = Zuhlke || {};
Zuhlke.Leap = Zuhlke.Leap || {};

// cunstructor
Zuhlke.Leap.SelectionHandler = function (contentFlow) {
    'use strict';

    var selectedItems={};


    // private methods
    function handleFrame(frame) {

        var currentKeyTapGesture = getCurrentGesture(frame, "keyTap", "stop");
        if (currentKeyTapGesture !== null) {
            selectItem(contentFlow);
        }
    }
    this.HandleFrame = handleFrame;

    function getCurrentGesture(frame, gestureType, gestureState) {
        var gesture = null, i;

        for (i = 0; i < frame.gestures.length; i++) {
            if (frame.gestures[i].type === gestureType && frame.gestures[i].state === gestureState) {
                gesture = frame.gestures[i];
            }
        }

        return gesture;
    }

    function selectItem(contentFlow) {
        var res = contentFlow.getActiveItem();
        var image =$(res.item).find('img');
        var imageId=image.attr('id');
        var url = image.attr('src').replace('thumb', 'front');
		var title=image.attr('title');

        var category = evalCategory(imageId);

        addToSelectedItems(category,title);

        setCloth(url,category);
        updateSelectedItems();
    }

	function addToSelectedItems(category,title) {
		var previous=null;
		if(category in selectedItems){
			previous=selectedItems[category];
			delete selectedItems[category];
		}

		if(previous!==title){
            selectedItems[category]=title;}
	}

	function updateSelectedItems(){
		var table=$('#current_style_table');
        var category;
        table.empty();
        for(category in selectedItems){
            var tableRow="<tr><td class=\"large\">"+selectedItems[category].toUpperCase()+"</td><td class=\"small\">£300</td></tr>"
            +"<tr><td class=\"large\">Recommended Size:</td><td class=\"small\">UK6</td></tr>"
            +"<tr><td colspan=\"2\"><a class=\"link_as_button grey_background\">ADD TO BASKET</a></td></tr>";
            table.append(tableRow);
        }
    }

    function evalCategory(imgId) {
        var idxUndersore = imgId.indexOf('_');
        var category = imgId.substring(0,idxUndersore);
        return category;
    }

    function setCloth(url, category) {
        var overlayId = '#overlay_'+ category;
        var imgElem = jQuery(overlayId);
        var srcAtrributeName = 'src';


        var currentUrl = imgElem.attr(srcAtrributeName);
        if (currentUrl === url) {
            imgElem.attr(srcAtrributeName, 'pics/empty.png');
        }
        else {
            imgElem.attr(srcAtrributeName,url);
        }
    }

    function startsWith(imgTitle, category) {
        if(imgTitle.indexOf(category) !== -1) {
            return true;
        }

        return false;
    }

    String.format = function() {
        // The string containing the format items (e.g. "{0}")
        // will and always has to be the first argument.
        var theString = arguments[0];

        // start with the second argument (i = 1)
        for (var i = 1; i < arguments.length; i++) {
            // "gm" = RegEx options for Global search (more than one instance)
            // and for Multiline search
            var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
            theString = theString.replace(regEx, arguments[i]);
        }

        return theString;
    }
};
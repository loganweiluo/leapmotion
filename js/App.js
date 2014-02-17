// namespace
var Zuhlke = Zuhlke || {};
Zuhlke.Leap = Zuhlke.Leap || {};

$(document).ready(function () {
    'use strict';
    var contentFlow = new ContentFlow('contentFlow', {reflectionHeight:0,scaleFactor:0.6, circularFlow:false,flowSpeedFactor:0.5,endOpacity:0.9});
    var swipe = new Zuhlke.Leap.SwipeHandler(contentFlow);
    var selection = new Zuhlke.Leap.SelectionHandler(contentFlow);


	var controllerOptions = { enableGestures: true };
    Leap.loop(controllerOptions, watchGestueres);
    bindButtonFunctions();

    function watchGestueres(frame){
        selection.HandleFrame(frame);
        swipe.HandleFrame(frame);
    }

    function bindButtonFunctions(){
        $("#previous_button").click(function(){contentFlow.moveToIndex('pre')});
        $("#next_button").click(function(){contentFlow.moveToIndex('next')});
    }


}

);


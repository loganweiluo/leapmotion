/*jslint vars: true */
var Zuhlke = Zuhlke || {};
Zuhlke.Leap = Zuhlke.Leap || {};

// cunstructor
Zuhlke.Leap.SwipeHandler = function (contentFlow) {
    'use strict';

    var styleAndSizeHeader;

    // private methods
    function handleFrame(frame) {

        var currentGesture = getCurrentSwipeGesture(frame);
        if (currentGesture !== null) {
                moveContentFlow(currentGesture, contentFlow);
        }
    }
    this.HandleFrame = handleFrame;

    function getCurrentSwipeGesture(frame) {
        var gesture = null, lgesture;
        if (frame.gestures.length === 1) {
            lgesture = frame.gestures[0];

            if (lgesture.type === "swipe") {
                gesture = lgesture;
            }
        }

        return gesture;
    }

    function moveContentFlow(currentGesture, contentFlow) {
        var direction = getDirection(currentGesture);
        setContentFlowIndex(direction, currentGesture);
    }

    function getDirection(currentGesture) {
        var xDirection = currentGesture.direction[0],
            yDirection = currentGesture.direction[1],
            zDirection = currentGesture.direction[2],

            maxVal = Math.max(xDirection, yDirection, zDirection),
            minVal = Math.min(xDirection, yDirection, zDirection);

        if (xDirection === minVal && xDirection < 0) {
            return "left";
        } else if (xDirection === maxVal && xDirection > 0) {
            return "right";
        } else {
            return "no direction";
        }
    }

    function setContentFlowIndex(direction, currentGesture) {

        if (direction === "left") {
            contentFlow.moveTo('next');
        } else if (direction === "right") {
            contentFlow.moveTo('pre');
        }
    }

};
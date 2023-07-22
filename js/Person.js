var Person = (function () {

    // multipliers of leg coordinates
    var steps = [0, 1, 2, 1, 0, -1, -2, -1];
    // initial multiplier in steps array
    var initialStepIndex = 1;

    return function (c) {

        // location of the person
        var x = 0, y = 0;

        // person is going to this location
        var destX, destY;

        var opacity = 0;

        var stepIndex = initialStepIndex;

        // move interval, null when person is not moving
        var moveInterval;

        // float between -1 and 1
        // max 1 when person is moving to 03:00
        // min -1 when left is moving to 09:00
        var movingHorizontal = 0;

        // float between -1 and 1
        // max 1 when person is moving to 06:00
        // min -1 when left is moving to 12:00
        var movingVertical = 0;

        // interval handling showing or hiding the entire person
        var showHideInterval = setInterval(function () {
            opacity += 0.05;
            repaint();
        }, 40);

        var that = {
            balloon: Balloon(c),
            die: function (callback) {
                clearInterval(showHideInterval);
                showHideInterval = setInterval(function () {
                    opacity -= 0.05;
                    if (opacity <= 0) {
                        clearInterval(showHideInterval);
                        callback(that);
                    }
                    repaint();
                }, 40);
            },
            locate: function (location) {
                if (opacity) {
                    destX = location.x;
                    destY = location.y;
                    if (!moveInterval) {
                        moveInterval = setInterval(function () {
                            var deltaX = destX - x,
                                deltaY = destY - y,
                                distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
                                done = 0;
                            movingHorizontal = deltaX / distance;
                            movingVertical = deltaY / distance;
                            stepIndex = (stepIndex + 1) % steps.length;
                            if (deltaX >= -1 && deltaX <= 1) {
                                x = destX;
                                done++;
                            } else {
                                x += deltaX / distance;
                            }
                            if (deltaY >= -1 && deltaY <= 1) {
                                y = destY;
                                done++;
                            } else {
                                y += deltaY / distance;
                            }
                            if (done == 2) {
                                clearInterval(moveInterval);
                                stepIndex = initialStepIndex;
                                movingHorizontal = 0;
                                movingVertical = 0;
                                moveInterval = null;
                            }
                            repaint();
                        }, 40);
                    }
                } else {
                    x = location.x;
                    y = location.y;
                }
                return that;
            },
            paintPerson: function () {

                var leftLegX = -1 - steps[stepIndex] * movingHorizontal,
                    leftLegY = 14 - steps[stepIndex] * movingVertical,
                    rightLegX = 1 + steps[stepIndex] * movingHorizontal,
                    rightLegY = 14 + steps[stepIndex] * movingVertical;

                c.save();

                c.lineJoin = c.lineCaps = 'round';
                c.translate(x, y - 14);
                c.globalAlpha = opacity;
                c.beginPath();
                c.arc(0, 0, 3, 0, 2 * Math.PI, false);
                c.fillStyle = '#000';
                c.fill();
                c.moveTo(0, 0);
                c.lineTo(0, 8);
                c.lineTo(leftLegX, leftLegY);
                c.moveTo(0, 8);
                c.lineTo(rightLegX, rightLegY);
                c.stroke();

                c.restore();

            },
            paintBalloon: function () {
                c.save();
                c.translate(x, y - 21);
                that.balloon.paint();
                c.restore();
            },
            say: function (text) {
                that.balloon.pushText(text);
                return that;
            }
        };

        // Map needs it
        that.balloon.person = that;

        return that;

    };

})();

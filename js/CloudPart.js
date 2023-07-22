function CloudPart (c) {

    var offscreenCanvas = document.createElement('canvas'),
        offscreenC = offscreenCanvas.getContext('2d');

    // location of the cloud
    var x, y;

    // opacity of the cloud
    var opacity = 0;

    var slideInterval = setInterval(function () {
        x -= 0.4;
    }, 110);

    offscreenCanvas.width = 400;
    offscreenCanvas.height = 200;
    offscreenC.fillStyle = 'rgba(255, 255, 255, 0.01)';

    var that = {
        paint: function () {
            c.save();
            c.translate(x - offscreenCanvas.width / 2, y - offscreenCanvas.height / 2);
            c.globalAlpha = opacity;
            c.drawImage(offscreenCanvas, 0, 0);
            c.restore();
        },
        reset: function () {
            setTimeout(function () {

                // randomize coordinates
                x = Math.random() * c.canvas.width - c.canvas.width / 2,
                y = Math.random() * c.canvas.height - c.canvas.height / 2;

                // clear offscreen canvas
                offscreenC.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

                // start cloud rendering
                var i = 0;
                var interval = setInterval(function () {
                    i++;
                    if (i < 10) {
                        var x1 = Math.random() * (offscreenCanvas.width - 112) + 56,
                            y1 = Math.random() * (offscreenCanvas.height - 112) + 56;
                        for (var j = 0; j < 16; j++) {
                            var x2 = x1 + Math.random() * 56 - 28,
                                y2 = y1 + Math.random() * 56 - 28;
                            for (var k = 0; k < 12; k++) {
                                var radius = 8,
                                    x3 = x2 + Math.random() * 28 - 14,
                                    y3 = y2 + Math.random() * 28 - 14;
                                offscreenC.beginPath();
                                offscreenC.moveTo(x3 + radius, y3);
                                offscreenC.arc(x3, y3, radius, 0, 2 * Math.PI, false);
                                offscreenC.fill();
                            }
                        }
                    } else {
                        // stop cloud rendering
                        clearInterval(interval);
                        // start fading in
                        interval = setInterval(function () {
                            opacity += 0.03;
                            if (opacity >= 1) {
                                opacity = 1;
                                // stop fading in
                                clearInterval(interval);
                                setTimeout(function () {
                                    // start fading out
                                    interval = setInterval(function () {
                                        opacity -= 0.03;
                                        if (opacity <= 0) {
                                            // stop fading out
                                            clearInterval(interval);
                                            opacity = 0;
                                            that.reset();
                                        }
                                    }, 110);
                                }, 3000 + Math.random() * 8000);
                            }
                        }, 110);
                    }
                }, 150);

            }, 1000 + Math.random() * 6000);

            return that;

        },
    };

    return that.reset();

}

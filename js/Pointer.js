var Pointer = (function () {

    var gradients = [];

    // delay of frames for the second animation wave
    var delay = 4;

    (function () {

        var c = document.createElement('canvas').getContext('2d');

        var numGradients = 20,
            radius = 2,
            radiusIncrement = numGradients;

        for (var i = 0; i < numGradients; i++) {

            var opacity = Math.pow(1 - i / (numGradients - 1), 3) * 0.7;

            var g = c.createRadialGradient(0, 0, radius / 4, 0, 0, radius);
            g.addColorStop(0, 'rgba(233, 233, 143, 0)');
            g.addColorStop(0.5, 'rgba(233, 233, 143, ' + opacity + ')');
            g.addColorStop(1, 'rgba(233, 233, 143, 0)');
            gradients.push(g);

            radius += (1 - i / (numGradients - 1)) * 2.5;

        }

    })();

    return function (c, x, y, onfinish) {

        // index of the current gradient
        var gradientIndex = 0;

        // animation interval
        var interval = setInterval(function () {
            gradientIndex++;
            if (gradientIndex == gradients.length - 1 + delay) {
                clearInterval(interval);
                onfinish(that);
            }
            repaint();
        }, 40);

        var that = {
            paint: function () {
                c.save();
                c.translate(x, y);
                c.scale(2, 2 / 3);
                c.beginPath();
                if (gradientIndex < gradients.length) {
                    c.fillStyle = gradients[gradientIndex];
                    c.arc(0, 0, 60, 0, 2 * Math.PI, false);
                    c.fill();
                }
                if (gradientIndex - delay >= 0) {
                    c.fillStyle = gradients[gradientIndex - delay];
                    c.arc(0, 0, 60, 0, 2 * Math.PI, false);
                    c.fill();
                }
                c.restore();
            }
        };

        return that;

    };

})();

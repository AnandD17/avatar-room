var Balloon = (function () {

    var scales = [0, 0.1, 0.2, 0.4, 0.8, 1.1, 1.2, 1.1, 1.05, 0.95, 1];

    return function (c) {

        function next () {
            var nextText = textQueue[0];
            if (nextText && !scaleIndex) {
                that.onnext();
                textQueue.shift();
                text = nextText;
                width = Math.max(4 * padding, c.measureText(text).width);
                x0 = -width / 2,
                x1 = width / 2,
                y0 = -height - 2 * padding,
                y1 = -2 * padding;
                interval = setInterval(function () {
                    scaleIndex++;
                    if (scaleIndex == scales.length - 1) {
                        clearInterval(interval);
                        var delay = 1000 + text.length * 150;
                        setTimeout(function () {
                            interval = setInterval(function () {
                                scaleIndex--;
                                if (!scaleIndex) {
                                    clearInterval(interval);
                                    next();
                                }
                                repaint();
                            }, 40);
                        }, delay);
                    }
                    repaint();
                }, 40);
            }
        }

        // corners of the balloon
        var x0, x1, y0, y1;

        var padding = 4,
            width = 0,
            height = theme.lineHeight,
            scaleIndex = 0,
            text = '',
            textQueue = [],
            interval,
            that = {
                pushText: function (text) {
                    textQueue.push(text);
                    next();
                },
                paint: function () {
                    c.save();

                    var scale = scales[scaleIndex];
                    if (scale) {
                        c.scale(scale, scale);
                        c.globalAlpha = scaleIndex / (scales.length - 1);
                        c.fillStyle = 'rgba(255, 255, 255, 0.8)';
                        c.strokeStyle = 'rgba(44, 44, 44, 0.4)';
                        c.textBaseline = 'middle';
                        c.textAlign = 'center';
                        c.beginPath();

                        // bottom left corner
                        c.arc(x0, y1, padding, Math.PI / 2, Math.PI, false);

                        // top left corner
                        c.arc(x0, y0, padding, Math.PI, 3 * Math.PI / 2, false);

                        // top right corner
                        c.arc(x1, y0, padding, -Math.PI / 2, 0, false);

                        // bottom right corner
                        c.arc(x1, y1, padding, 0, Math.PI / 2, false);

                        // bottom
                        c.lineTo(padding, y1 + padding);
                        c.lineTo(0, y1 + 2 * padding);
                        c.lineTo(-padding, y1 + padding);
                        c.closePath();

                        c.fill();
                        c.stroke();
                        c.fillStyle = '#222';

                        c.translate(0, y0 + theme.lineHeight / 2);
                        c.fillText(text, 0, 0);
                    }

                    c.restore();
                }
            };

        return that;
    };

})();

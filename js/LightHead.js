var LightHead = (function () {

    var beamGradient, areaCanvas;

    (function () {

        // temporal quadratic canvas for area light
        var canvas = document.createElement('canvas'),
            c = canvas.getContext('2d');

        // gradient to fill area light
        var g = c.createRadialGradient(45, 45, 10, 45, 45, 45);
        g.addColorStop(0, 'rgba(255, 255, 205, 0.15)');
        g.addColorStop(0.5, 'rgba(255, 255, 205, 0.1)');
        g.addColorStop(1, 'rgba(255, 255, 205, 0)');

        // fill quadratic area light
        canvas.width = canvas.height = 90;
        c.fillStyle = g;
        c.fillRect(0, 0, canvas.width, canvas.height);

        // eliptical quadratic canvas for area light
        areaCanvas = document.createElement('canvas');
        areaCanvas.width = 90;
        areaCanvas.height = 30;
        var areaC = areaCanvas.getContext('2d');
        areaC.drawImage(canvas, 0, 0, areaCanvas.width, areaCanvas.height);

        // gradient to fill light beam
        beamGradient = c.createRadialGradient(0, 0, 10, 0, 0, 70);
        beamGradient.addColorStop(0, 'rgba(255, 255, 205, 0.2)');
        beamGradient.addColorStop(0.5, 'rgba(255, 255, 205, 0.05)');
        beamGradient.addColorStop(1, 'rgba(255, 255, 205, 0)');

    })();

    return function () {

        var that = {
            paint: function (c) {
                c.save();

                // round stem
                c.beginPath();
                c.moveTo(0, 0);
                c.quadraticCurveTo(0, -8, 8, -8);
                c.quadraticCurveTo(16, -8, 16, 0);
                c.stroke();

                // light handle
                c.fillStyle = '#000';
                c.translate(16, 0);
                c.beginPath();
                c.moveTo(0, 0);
                c.lineTo(4, 1);
                c.lineTo(4, 2);
                c.lineTo(0, 3);
                c.lineTo(-4, 2);
                c.lineTo(-4, 1);
                c.closePath();
                c.fill();

                // light source
                c.save();
                c.beginPath();
                c.shadowBlur = 1;
                c.shadowColor = c.fillStyle = 'rgb(255, 255, 205)';
                c.moveTo(0, 4);
                c.lineTo(4, 2);
                c.lineTo(0, 3);
                c.lineTo(-4, 2);
                c.closePath();
                c.fill();
                c.restore();

                // beam
                c.fillStyle = beamGradient;
                c.beginPath();
                c.moveTo(-4, 1);
                c.lineTo(0, 2);
                c.lineTo(4, 1);
                c.lineTo(40, 70);
                c.lineTo(-40, 70);
                c.closePath();
                c.fill();

                // area
                c.drawImage(areaCanvas, -  areaCanvas.width / 2, 70 - areaCanvas.height / 2);

                c.restore();
            },
        };

        return that;

    };
})();

function GrassPattern () {

    var canvas = document.createElement('canvas'),
        c = canvas.getContext('2d');

    canvas.width = 200;
    canvas.height = 200;

    // background
    c.fillStyle = 'hsl(96, 40%, 52%)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    // render random straight lines
    c.lineWidth = 2;
    for (var i = 0; i < 500; i++) {
        var rx = -canvas.width / 2 + Math.random() * canvas.width,
            ry = -canvas.height / 2 + Math.random() * canvas.height;
        c.strokeStyle = 'hsl(96, 40%, 48%)';
        for (var j = 0; j < 2; j++) {
            for (var k = 0; k < 2; k++) {
                var x = rx + j * canvas.width,
                    y = ry + k * canvas.height;
                c.beginPath();
                c.moveTo(x, y);
                c.lineTo(x + 30 * (Math.random() >= 0.5 ? 1 : -1), y + 10);
                c.stroke();
            }
        }
    }

    var colors = [
        'hsl(96, 40%, 58%)',
        'hsl(96, 40%, 52%)',
        'hsl(96, 40%, 48%)',
    ];

    // render random grass particles
    for (var i = 0; i < 8000; i++) {
        var rx = -canvas.width / 2 + Math.random() * canvas.width,
            ry = -canvas.height / 2 + Math.random() * canvas.height;
        c.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        for (var j = 0; j < 2; j++) {
            for (var k = 0; k < 2; k++) {
                c.save();
                c.translate(rx + j * canvas.width, ry + k * canvas.height);
                c.scale(0.3, 1);
                c.beginPath();
                c.arc(0, 0, 2, 0, 2 * Math.PI, true);
                c.fill();
                c.restore();
            }
        }
    }

    return c.createPattern(canvas, 'repeat');

}

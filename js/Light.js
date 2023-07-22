function Light (c, x, y) {

    // position of the stand
    var offsetX = 70, offsetY = 80;

    var leftHead = LightHead(),
        rightHead = LightHead();

    // offscreen canvas
    var canvas = document.createElement('canvas');
    canvas.width = 140;
    canvas.height = 108;

    (function () {

        var c = canvas.getContext('2d');

        // debug rectangle
        //c.fillStyle = 'rgba(255, 0, 0, 0.1)';
        //c.fillRect(0, 0, canvas.width, canvas.height);
        //c.fillStyle = '#000';

        // draw stand
        c.translate(offsetX, offsetY);
        c.save();
        c.moveTo(3, 0);
        c.scale(1, 1 / 3);
        c.arc(0, 0, 3, 0, 2 * Math.PI, false);
        c.restore();
        c.fill();

        // draw stem
        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(0, -70);
        c.stroke();

        // left head
        c.translate(0, -70);
        leftHead.paint(c);

        // right head
        c.scale(-1, 1);
        rightHead.paint(c);

    })();

    var that = {
        paintStem: function () {
            c.save();
            c.translate(x - canvas.width / 2, y - offsetY);
            c.drawImage(canvas, 0, 0);
            c.restore();
        },
    };

    return that;

}

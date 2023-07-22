function Cloud (c) {

    var parts = [];

    var that = {
        paint: function () {
            parts.forEach(function (e) {
                e.paint();
            });
        },
    };

    for (var i = 0; i < 8; i++) {
        parts.push(CloudPart(c));
    }

    return that;

}

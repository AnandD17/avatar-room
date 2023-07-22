function Map (c) {

    function removeBalloon (person) {
        balloons.splice(balloons.indexOf(person.balloon), 1);
    }

    function personDieCallback (person) {
        persons.splice(persons.indexOf(person), 1);
        removeBalloon(person);
    }
    
    var lights = [],
    persons = [],
    pointers = [],
    balloons = [];
    // console.log(lights);
    // console.log(persons);
    var that = {
        addLight: function (light) {
            lights.push(light);
        },
        addPerson: function (person) {
            person.balloon.onnext = function () {
                removeBalloon(person);
                balloons.push(person.balloon);
            };
            persons.push(person);
            balloons.push(person.balloon);
        },
        addPointer: function (e) {
            pointers.push(
                Pointer(c, e.x, e.y, function (pointer) {
                    pointers.splice(pointers.indexOf(pointer), 1);
                })
            );
        },
        paint: function () {
            for (var i = 0; i < persons.length; i++) {
                persons[i].paintPerson();
            }
            for (var i = 0; i < lights.length; i++) {
                lights[i].paintStem();
            }
            for (var i = 0; i < balloons.length; i++) {
                balloons[i].person.paintBalloon();
            }
            for (var i = 0; i < pointers.length; i++) {
                pointers[i].paint();
            }
        },
        removeAllPersons: function () {
            persons.forEach(function (e) {
                e.die(personDieCallback);
            });
        },
        removePerson: function (person) {
            person.die(personDieCallback);
        },
    };

    return that;

}

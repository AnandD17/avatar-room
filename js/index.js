const socket = io('http://localhost:8000');
const messageInput = document.querySelector('.send');

const appennd = (message,position)=>{
    const messageElement = document.createElement('div');
    // console.log("entered append");
    messageElement.innerText=message;
    messageElement.classList.add('msg');
    messageElement.classList.add(position);
    const messageContainer = document.getElementById('senddiv');
messageContainer.appendChild(messageElement);
}
let name = prompt("Enter your name");
socket.emit('new-user-joined', name);


var global_id;

socket.on('user-joined',name=>{
console.log("fine its entering when user joins");
appennd(`${name} joined the chat `,'right');
if(global_id.length==0)
global_id[global_id.length] = name;
else
global_id[global_id.length+1] = name;

});


// socket.on('user-stick-man',name=>{
//     if(global_id.length==0)
// global_id[global_id.length] = name;
// else
// global_id[global_id.length+1] = name;
// });
console.log(global_id);
var globalMessage = "hi";

socket.on('receive', data =>{
    appennd(`${data.name}: ${data.message}`, 'left');
    globalMessage = data.message;
})


socket.on('left', name =>{
    appennd(`${name} left the chat`, 'right');
})

socket.on('messageOnline', message =>{
   globalMessage = message;
})

function addTextInContainer(messageParser){
    const inputDiv = document.getElementsByClassName('send')[0];
    inputDiv.addEventListener('keyup', function (e) {
        if(messageParser!=''){
        if (e.keyCode === 13) {
            appennd(`You: ${messageParser}`, 'right');
            socket.emit('send', messageParser);
            console.log(messageParser);
            messageParser = '';
            console.log(typeof(messageParser));
            // globalMessage = messageParser;
            }
        }
        });
}


var repaint,
    keys = {
        BACKSPACE: 8,
        ENTER: 13,
        ESC: 27, 
    },
    theme = {
        lineHeight: 14
    };

var canvas = document.querySelector('canvas'),
    c = canvas.getContext('2d'),
    backgroundPattern = GrassPattern();

canvas.width = innerWidth;
canvas.height = innerHeight;


(function () {

    function whoami () {
        loadAjax('whoami', {}, function (e) {
            if (e) {
                wait(e);
                // console.log(e);
                you = persons[e.idclients];
                // console.log(you);
            } else {
                setTimeout(function () {
                    whoami();
                }, 3000);
            }
        });
    }

    function wait (e) {
       
        if (e) {
            if (e.locates) {
                e.locates.forEach(function (e) {
                    if (persons[e.idclients]) {
                        // persons[e.idclients].locate(e.location);
                    }
                });
            }
            if (e.onlines) {
                e.onlines.forEach(function (e) {
                    if (!persons[e.idclients]) {
                        persons[e.idclients] = Person(c).locate(e.location);
                        map.addPerson(persons[e.idclients]);

                        // socket.emit('online', e,persons,c);
                    }
                });
            }
            if (e.offlines) {
                e.offlines.forEach(function (e) {
                    if (persons[e.idclients]) {
                        map.removePerson(persons[e.idclients]);
                        delete persons[e.idclients];
                    }
                });
            }
            if (e.messages) {
                e.messages.forEach(function (message) {
                    var person = persons[message.idclients];
                    if (person) person.say(message.text);
                });
            }
            loadAjax('wait', {}, wait);
        } else {
            whoami();
        }
    }

    var you, idclients,
        focused = true,
        justFocused = false,
        map = Map(c),
        persons = {},
        textField = TextField(function (text) {
            loadAjax('send', { text: text });
        });

    for (var i = 0; i < 4; i++) {
        map.addLight(Light(c, -450 + 300 * i, 50 * (i % 2 ? -1 : 1)));
    }

//    var cloud = Cloud(c);

    repaint = throttle(function () {

        // adjust canvas size
        canvas.width = innerWidth;
        canvas.height = innerHeight;

        // half lengths of the canvas
        var w2 = canvas.width / 2,
            h2 = canvas.height / 2;

        c.font = '12px sans-serif';
        c.save();
        c.textBaseline = 'middle';
        c.textAlign = 'center';
        c.translate(w2, h2);
        c.fillStyle = backgroundPattern;
        c.fillRect(-w2, -h2, canvas.width, canvas.height);
        map.paint();
//        cloud.paint();
        c.restore();

    }, 50);

    document.body.appendChild(canvas);
    repaint();
    textField.focus();

    addEventListener('focus', function () {
        focused = true;
        justFocused = true;
    });

    addEventListener('blur', function () {
        focused = false;
    });

    addEventListener('resize', repaint, false);

    addEventListener('click', function (e) {
        if (justFocused) justFocused = false;
        else {
            if (e.target == canvas) {
                var location = {
                    x: e.pageX - innerWidth / 2,
                    y: e.pageY - innerHeight / 2
                };
                map.addPointer(location);
                loadAjax('locate', location);
                textField.focus();
                if (you) {
                    you.locate(location);
                }
            }
        }
    });

    addEventListener('load', whoami);

})();




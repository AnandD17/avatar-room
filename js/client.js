
const socket = io('http://localhost:8000');
const messageInput = document.querySelector('.send');

const appennd = (message,position)=>{
    const messageElement = document.createElement('div');
    console.log("entered append");
    messageElement.innerText=message;
    messageElement.classList.add('msg');
    messageElement.classList.add(position);
    const messageContainer = document.getElementById('senddiv');
messageContainer.appendChild(messageElement);
}
let name = prompt("Enter your name");
socket.emit('new-user-joined', name);


socket.on('user-joined',name=>{
    console.log("fine its entering when user joins");
appennd(`${name} joined the chat `,'right');
});


socket.on('receive', data =>{
    appennd(`${data.name}: ${data.message}`, 'left');
})


socket.on('left', name =>{
    appennd(`${name} left the chat`, 'right');
})

// var messageParser;
function addTextInContainer(messageParser){
    const inputDiv = document.getElementsByClassName('send')[0];
    inputDiv.addEventListener('keyup', function (e) {
        if(messageParser!=''){
        if (e.keyCode === 13) {
            // messageParser = inputDiv.innerHTML;
            appennd(`You: ${messageParser}`, 'right');
            socket.emit('send', messageParser);
            console.log(messageParser);
            messageParser = '';
            console.log(typeof(messageParser));
            }
        }
        });
}

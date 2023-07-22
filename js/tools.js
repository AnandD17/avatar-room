function debounce (callback, milliseconds) {
    var timeout;
    return function () {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(callback, milliseconds);
    };
}
// var globalMessage = "";
// const messageOnline = (message)=>{
//     globalMessage = message;
//     return message;
// }
// globalMessage = messageOnline;
// globalMessage;
// console.log("msg "+ globalMessage);
// const headMessage;
for (let i = 0; i < global_id.length; i++) {
    console.log(global_id[i]);
function fake_response () {
    return {
    

    
        
        idclients: i,
        onlines: [{
            idclients: i,
            location: {
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
            },
        }],
        locates: [{
            idclients: i,
            location: {
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
            },
        }],
        messages: [{
            idclients: i,
            text:globalMessage,
        }],
    }
}
}


function loadAjax (url, params, callback) {

    if (url === 'whoami') {
        setTimeout(function () {
            callback(fake_response());
        }, 0)
        return
    }

    if (url === 'wait') {
        setTimeout(function () {
            callback(fake_response());
        }, 5000)
        return
    }

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status) {
                if (callback) {
                    callback(JSON.parse(xhr.responseText));
                }
            } else {
                if (callback) callback();
            }
        }
    };
    var pairs = [];
    for (var i in params) {
        pairs.push(encodeURIComponent(i) + '=' + encodeURIComponent(params[i]));
    }
    xhr.open('post', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(pairs.join('&'));
}

function throttle (callback, milliseconds) {
    var timeout, next,
        throttled = function () {
            if (timeout) next = true;
            else {
                callback();
                timeout = setTimeout(function () {
                    timeout = 0;
                    if (next) throttled();
                    next = false;
                }, milliseconds);
            }
        };
    return throttled;
}

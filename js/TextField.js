function TextField (onenter) {

    var input = document.createElement('input');
    input.classList.add('send');
    input.type = 'text';
    input.maxLength = 40;
    input.style.cursor = 'text';
    input.style.background = 'rgba(255, 255, 255, 0.8)';
    input.style.border = '1px solid rgba(44, 44, 44, 0.4)';
    input.style.padding = '4px';
    input.style.borderRadius = '4px';
    input.style.textAlign = 'left';
    input.addEventListener('keydown', function (e) {
        if (e.keyCode == 13) {
            addTextInContainer(input.value);
            // input.value = input.value.replace(/^\s*(.*?)\s*$/, '$1');
            if (input.value) {
                onenter(input.value);
                input.value = '';
            }
        }
    });

    var sayDiv = document.createElement('div');
    sayDiv.appendChild(document.createTextNode('Say something:'));
    sayDiv.style.display = 'inline-block';
    sayDiv.style.padding = '0 4px';
    sayDiv.style.verticalAlign = 'middle';

    var inputDiv = document.createElement('div');
    inputDiv.appendChild(input);
    inputDiv.style.display = 'inline-block';
    inputDiv.style.verticalAlign = 'middle';

    var div = document.createElement('div');
    div.style.background = 'rgba(244, 244, 244, 0.8)';
    div.style.position = 'fixed';
    div.style.top = '30px';
    div.style.left = div.style.right = '0';
    div.style.padding = '4px';
    div.style.margin = 'auto';
    div.style.borderRadius = '4px';
    div.style.width = '300px';
    div.style.border = '1px solid rgba(44, 44, 44, 0.4)';
    div.appendChild(sayDiv);
    div.appendChild(inputDiv);

    document.body.appendChild(div);

    return input;

}

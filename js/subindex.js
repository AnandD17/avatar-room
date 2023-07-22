function Toggler(){
    const container = document.querySelector('.container');
    if(container.style.display!='none'){
        container.style.display='none';
        document.querySelector('button').innerHTML='View History';
    }
    else{
        container.style.display='block';
        document.querySelector('button').innerHTML='Hide History';
    }


}
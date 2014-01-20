requirejs.config({
  paths: {}
});
 
require (['container'], function(containerCreator) {
    var container = containerCreator.create();
    
    var containerElement = document.getElementById('container');
    if(containerElement) {
        containerElement.appendChild(container);
    }
    
    document.onkeydown = function(event) {
        switch(event.keyCode)
        {
            case 39: // Right Arrow
                container.moveNext();
                break;
            
            case 37: // Left Arrow
                container.movePrevious();
                break;
        }
    };
});
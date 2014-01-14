requirejs.config({
  paths: {}
});
 
require (['container'], function(container) {
    var containerElement = document.getElementById('container');
    if(containerElement) {
        containerElement.innerHTML = container.create().outerHTML;
    }
});
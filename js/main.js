requirejs.config({
  paths: {}
});
 
require (['container'], function(container) {
    var containerElement = document.getElementById('container');
    containerElement.innerHTML = container.create().outerHTML;
});
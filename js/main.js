requirejs.config({
  paths: {
    knockout: "../bower_components/knockout.js/knockout",
    "requirejs-domready": "../bower_components/requirejs-domready/domReady"
  }
});
 
require (['knockout', 'containerViewModel', 'placeholderItemFactory'], function(ko, ContainerViewModel, ItemFactory) {
    ko.applyBindings(new ContainerViewModel(new ItemFactory(100)));

    /*document.onkeydown = function(event) {
        switch(event.keyCode)
        {
            case 39: // Right Arrow
                container.moveNext();
                break;
            
            case 37: // Left Arrow
                container.movePrevious();
                break;
        }
    };*/
});
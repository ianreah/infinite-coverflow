requirejs.config({
  paths: {
    knockout: "../bower_components/knockout.js/knockout",
    "requirejs-domready": "../bower_components/requirejs-domready/domReady"
  }
});
 
require(['knockout', 'containerViewModel', 'placeholderItemFactory', 'requirejs-domready!'], function (ko, ContainerViewModel, ItemFactory, dom) {
    var vm = new ContainerViewModel(new ItemFactory(100));
    ko.applyBindings(vm);

    dom.onkeydown = function(event) {
        switch(event.keyCode)
        {
            case 39: // Right Arrow
                vm.moveNext();
                break;
            
            case 37: // Left Arrow
                vm.movePrevious();
                break;
        }
    };
});
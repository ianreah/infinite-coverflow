define(['knockout'], function (ko) {
    var itemCount = 9;
    
    return function (itemFactory) {
        var itemsArray = [];
        for (var i = 0; i < itemCount; i++) {
            itemsArray.push(itemFactory.getItem(i));
        }
        
        this.items = ko.observableArray(itemsArray);
        this.currentIndex = ko.observable(Math.floor(itemCount/2));
        this.slidingStatus = ko.observable();
        
        this.moveNext = function() {
            this.slidingStatus("slide-left");
        };
        
        this.movePrevious = function() {
            this.slidingStatus("slide-right");
        };
        
        this.completeTransition = function(data, event) {
            this.slidingStatus("");
        };
    };
});
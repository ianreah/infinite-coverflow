define(['knockout'], function (ko) {
    var itemCount = 9;
    
    return function (itemFactory) {
        var itemsArray = [];
        for (var i = 0; i < itemCount; i++) {
            itemsArray.push(itemFactory.getItem(i));
        }
        
        this.items = ko.observableArray(itemsArray);
    };
});
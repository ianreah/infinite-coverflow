define(['knockout'], function (ko) {
    var itemCount = 9;
    
    return function (itemFactory) {
        var itemsArray = [];
        for (var i = 0; i < itemCount; i++) {
            itemsArray.push(itemFactory.getItem(i));
        }
        
        this.items = ko.observableArray(itemsArray);
        this.currentIndex = ko.observable(Math.floor(itemCount/2));
        
        var direction = ko.observable(0);
        this.slidingStatus = ko.computed(function() {
            if(direction() > 0) {
                return "slide-left";
            }
            
            if(direction() < 0) {
                return "slide-right";
            }
            
            return "";
        });

        this.moveNext = function() {
            direction(1);
        };
        
        this.movePrevious = function() {
            direction(-1);
        };
        
        this.completeTransition = function(data, event) {
            // Ignore events bubbling from the child elements
            // (Assumes child elements are bound to a different vm)
            var eventVm = ko.dataFor(event.target);
            if(eventVm !== this) {
                return;
            }
            
            var newItemIndex;
            if(direction() > 0) {
                newItemIndex = itemsArray[itemCount-1].index() + 1;
                
                itemsArray.shift();
                itemsArray.push(itemFactory.getItem(newItemIndex));
            } else if (direction() < 0) {
                newItemIndex = itemsArray[0].index() - 1;
                
                itemsArray.pop();
                itemsArray.unshift(itemFactory.getItem(newItemIndex));
            }
            
            direction(0);
            this.items.valueHasMutated();
        };
    };
});
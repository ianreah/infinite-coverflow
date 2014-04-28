define(['knockout'], function (ko) {
    var itemCount = 9;
    var centralItem = Math.floor(itemCount/2);
    
    return function (itemFactory) {
        var itemsArray = [];
        for (var i = 0; i < itemCount; i++) {
            itemsArray.push(itemFactory.getItem(i));
        }
        
        this.items = ko.observableArray(itemsArray);
        this.currentIndex = ko.observable(centralItem);
        this.slidingStatus = ko.observable("");
        
        var me = this;
        var direction = ko.computed(function(){
            switch(me.slidingStatus()) {
                case "slide-left":
                    return 1;
                    
                case "slide-right":
                    return -1;
                    
                default:
                    return 0;
            }
        });
        
        var initialDuration = 0.5;
        var acceleration = 0.6;
        var minimumDuration = 0.02;
        var currentDuration = ko.observable(initialDuration);
        
        this.duration = ko.computed(function(){
            if(me.slidingStatus() === "") {
                return 0;
            }
            
            return currentDuration();
        });

        this.moveNext = function() {
            if(direction() < 0) {
                this.slidingStatus("slide-reset");
                
                itemsArray[0].fadingStatus("fade-out");
                itemsArray[itemCount-2].fadingStatus("fade-in");
                
                this.currentIndex(itemsArray[centralItem].index());
            } else {
                this.slidingStatus("slide-left");
                
                itemsArray[itemCount-1].fadingStatus("fade-in");
                itemsArray[1].fadingStatus("fade-out");
                
                this.currentIndex(itemsArray[centralItem+1].index());
            }
        };
        
        this.movePrevious = function() {
            if(direction() > 0) {
                this.slidingStatus("slide-reset");
                
                itemsArray[itemCount-1].fadingStatus("fade-out");
                itemsArray[1].fadingStatus("fade-in");
                
                this.currentIndex(itemsArray[centralItem].index());
            } else {
                this.slidingStatus("slide-right");
                                
                itemsArray[0].fadingStatus("fade-in");
                itemsArray[itemCount-2].fadingStatus("fade-out");
                
                this.currentIndex(itemsArray[centralItem-1].index());
            }
        };
        
        var accelerationTimeoutId;
        this.completeTransition = function(data, event) {
            // Ignore events bubbling from the child elements
            // (Assumes child elements are bound to a different vm)
            var eventVm = ko.dataFor(event.target);
            if(eventVm !== this) {
                return;
            }
            
            itemsArray.forEach(function(x){
                x.fadingStatus("");
            });
            
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
            
            this.slidingStatus("");
            this.items.valueHasMutated();
            
            currentDuration(Math.max(currentDuration() * acceleration, minimumDuration));
            clearTimeout(accelerationTimeoutId);
            accelerationTimeoutId = setTimeout(function() {
                currentDuration(initialDuration);
            }, 500);
        };
    };
});
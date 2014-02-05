define(['knockout'], function(ko){
    return function(index) {
        this.index = ko.observable(index);
        this.fadingStatus = ko.observable("");
        
        this.imageSource = ko.computed(function(){
            var itemLabel = this.index()+1;
            return "http://placehold.it/100x100&text=" + itemLabel;
        }, this);
    };
});
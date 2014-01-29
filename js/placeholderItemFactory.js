define(['placeholderItem'], function(PlaceHolderItem) {
    return function(itemCount) {
        this.getItem = function (requestedIndex) {
            var wrappedIndex = requestedIndex % itemCount;
            if (wrappedIndex < 0) {
                wrappedIndex += itemCount;
            }
            return new PlaceHolderItem(wrappedIndex);
        };
    };
});
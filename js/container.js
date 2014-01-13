define(function() {
    var itemCount = 9;
    
    function setDummyItemContent(item, name) {
        item.innerHTML = "<img src='http://placehold.it/100x100&text=" + name + "'/>";
    }
    
    return {
        create: function() {
            var result = document.createElement('ul');
            result.id = 'albumList';
            
            for (var i = 0; i < itemCount; i++) {
                var item = document.createElement('li');
                setDummyItemContent(item, i+1);
                result.appendChild(item);
            }
            return result;
        }
    };
});
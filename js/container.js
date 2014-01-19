define(function() {
    var itemCount = 9;
    var centralItem = Math.floor(itemCount / 2);
    
    function setDummyItemContent(item, name) {
        item.innerHTML = "<img src='http://placehold.it/100x100&text=" + name + "'/>";
    }
    
    return {
        create: function() {
            var result = document.createElement('ul');
            result.id = 'albumList';
            
            result.addEventListener('webkitTransitionEnd', function(event) {
                if(event.target != result) {
                    return;
                }
                
                result.className = '';

                var firstChild = result.children[0];
                result.removeChild(firstChild);
                result.appendChild(firstChild);
                
                result.children[0].className = '';
                result.children[itemCount-2].className = '';
                
                // TODO: update the content of firstChild
            }, false );
            
            for (var i = 0; i < itemCount; i++) {
                var item = document.createElement('li');
                setDummyItemContent(item, i+1);
                result.appendChild(item);
            }
            
            result.children[centralItem].className = 'current';
            
            result.moveNext = function () {
                this.className = 'slide-left';
                
                this.children[1].className = 'fade-out';
                this.children[itemCount-1].className = 'fade-in';
                
                this.children[centralItem].className = '';
                this.children[centralItem+1].className = 'current';
            };
            
            return result;
        }
    };
});
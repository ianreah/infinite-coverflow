define(function() {
    var itemCount = 9;
    var centralItem = Math.floor(itemCount / 2);
    
    var direction = 0;
    
    function setDummyItemContent(item, name) {
        item.innerHTML = "<img src='http://placehold.it/100x100&text=" + name + "'/>";
    }

    return {
        create: function() {
            var result = document.createElement('ul');
            result.id = 'albumList';
            
            function updateChildClasses(fadeIn, fadeOut, current) {
                for(var i = 0; i != result.children.length; ++i) {
                    result.children[i].className = '';
                }
                result.children[fadeIn].className = 'fade-in';
                result.children[fadeOut].className = 'fade-out';
                result.children[current].className = 'current';
            }
            
            result.addEventListener('webkitTransitionEnd', function(event) {
                if(event.target != result) {
                    return;
                }
                
                result.className = '';
                
                var firstChild = result.children[0];
                if(direction > 0) {
                    result.removeChild(firstChild);
                    result.appendChild(firstChild);
                } else if (direction < 0) {
                    var lastChild = result.children[itemCount-1];
                    result.removeChild(lastChild);
                    result.insertBefore(lastChild, firstChild);
                }
                
                updateChildClasses(centralItem, centralItem, centralItem);
                direction = 0;
                
                // TODO: update the content of firstChild
            }, false );
            
            for (var i = 0; i < itemCount; i++) {
                var item = document.createElement('li');
                setDummyItemContent(item, i+1);
                result.appendChild(item);
            }
            
            result.children[centralItem].className = 'current';
            
            result.moveNext = function () {
                if(direction < 0) {
                    this.className = 'slide-reset';
                    updateChildClasses(itemCount-2, 0, centralItem);
                    direction = 0;
                } else {
                    this.className = 'slide-left';
                    updateChildClasses(itemCount-1, 1, centralItem+1);
                    direction = 1;
                }
            };
            
            result.movePrevious = function () {
                if(direction > 0) {
                    this.className = 'slide-reset';
                    updateChildClasses(1, itemCount-1, centralItem);
                    direction = 0;
                } else {
                    this.className = 'slide-right';
                    updateChildClasses(0, itemCount-2, centralItem-1);
                    direction = -1;
                }
            };
            
            return result;
        }
    };
});
define(['container'], function(container) {
    describe("Container module", function () {
        var containerUnderTest;
        
        beforeEach(function(){
            containerUnderTest = container.create();
        });
        
        function simulateTransitionEnd() {
            var transitionEndEvent = document.createEvent('CustomEvent');
            transitionEndEvent.initCustomEvent('webkitTransitionEnd');
            containerUnderTest.dispatchEvent(transitionEndEvent);
        }
            
        describe("created container", function() {
            it("is an unordered list", function() {
                expect(containerUnderTest.nodeName).toBe("UL");
            });
            
            it("contains 9 list items", function() {
               expect(containerUnderTest.children.length).toBe(9);
               for(var i = 0; i != containerUnderTest.children.length; ++i) {
                   expect(containerUnderTest.children[i].nodeName).toBe("LI");
               }
            });
            
            it("has an id of albumList", function() {
                expect(containerUnderTest.id).toBe("albumList");
            });
            
            it("marks central item as current", function() {
               for(var i = 0; i != containerUnderTest.children.length; ++i) {
                   if(i==4) {
                       expect(containerUnderTest.children[i].className).toBe("current");
                   } else {
                       expect(containerUnderTest.children[i].className).toBe("");
                   }
               }
            });
        });
        
        describe("moveNext", function() {
           it("moves all items one to the left", function() {
               var itemContent = Array.prototype.map.call(containerUnderTest.children, function (item) {
                   return item.innerHTML;
               });
               
               containerUnderTest.moveNext();
               simulateTransitionEnd();

               for (var i = 0; i != containerUnderTest.children.length-1; ++i) {
                   expect(containerUnderTest.children[i].innerHTML).toBe(itemContent[i+1]);
               }
           });
           
           it("still marks central item as current", function() {
               containerUnderTest.moveNext();
               simulateTransitionEnd();

               for(var i = 0; i != containerUnderTest.children.length; ++i) {
                   if(i==4) {
                       expect(containerUnderTest.children[i].className).toBe("current");
                   } else {
                       expect(containerUnderTest.children[i].className).toBe("");
                   }
               }
           });
        });
        
        describe("movePrevious", function() {
           it("moves all items one to the right", function() {
               var itemContent = Array.prototype.map.call(containerUnderTest.children, function (item) {
                   return item.innerHTML;
               });
               
               containerUnderTest.movePrevious();
               simulateTransitionEnd();

               for (var i = 1; i != containerUnderTest.children.length; ++i) {
                   expect(containerUnderTest.children[i].innerHTML).toBe(itemContent[i-1]);
               }
           });
           
           it("still marks central item as current", function() {
               containerUnderTest.movePrevious();
               simulateTransitionEnd();

               for(var i = 0; i != containerUnderTest.children.length; ++i) {
                   if(i==4) {
                       expect(containerUnderTest.children[i].className).toBe("current");
                   } else {
                       expect(containerUnderTest.children[i].className).toBe("");
                   }
               }
           });
        });
    });
});
define(['container'], function(container) {
    describe("Container module", function () {
        var containerUnderTest;
        
        beforeEach(function(){
            containerUnderTest = container.create();
        });
            
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
        });
        
        describe("moveNext", function() {
           it("moves all current items one to the left", function() {
               var currentItems = Array.prototype.map.call(containerUnderTest.children, function (item) {
                   return item.innerHTML;
               });
               
               containerUnderTest.moveNext();
               
               for (var i = 0; i != containerUnderTest.children.length-1; ++i) {
                   expect(containerUnderTest.children[i].innerHTML).toBe(currentItems[i+1]);
               }
           });
        });
    });
});
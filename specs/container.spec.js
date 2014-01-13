define(['js/container'], function(container) {
    describe("Container module", function () {
        describe("created container", function() {
            var containerUnderTest;
            
            beforeEach(function(){
                containerUnderTest = container.create();
            });
            
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
    });
});
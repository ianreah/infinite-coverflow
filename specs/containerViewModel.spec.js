define(['containerViewModel'], function (ContainerViewModel) {
    describe("Container View Model module", function () {
        var vmUnderTest;

        var mockItemFactory = {            
            getItem: function(requestedIndex) {
                return {                    
                    index: function() {
                        return requestedIndex;
                    }
                };
            }
        };
        
        beforeEach(function () {
            vmUnderTest = new ContainerViewModel(mockItemFactory);
        });
        
        it("has 9 items", function () {
            expect(vmUnderTest.items().length).toBe(9);
        });

        it("initial items are the first items from the factory", function () {
            expect(vmUnderTest.items()[0].index()).toBe(0);
            expect(vmUnderTest.items()[1].index()).toBe(1);
            expect(vmUnderTest.items()[2].index()).toBe(2);
            expect(vmUnderTest.items()[3].index()).toBe(3);
            expect(vmUnderTest.items()[4].index()).toBe(4);
            expect(vmUnderTest.items()[5].index()).toBe(5);
            expect(vmUnderTest.items()[6].index()).toBe(6);
            expect(vmUnderTest.items()[7].index()).toBe(7);
            expect(vmUnderTest.items()[8].index()).toBe(8);
        });

        it("initially marks the central item as current", function() {
            expect(vmUnderTest.currentIndex()).toBe(4);
        });
        
        it("isn't sliding yet", function() {
           expect(vmUnderTest.slidingStatus()).toBeUndefined();
        });
        
        describe("moveNext", function() {
            it("slides the container to the left", function() {
                vmUnderTest.moveNext();
                expect(vmUnderTest.slidingStatus()).toBe("slide-left");
                
                vmUnderTest.completeTransition();
                expect(vmUnderTest.slidingStatus()).toBe("");
           });
        });
        
        describe("movePrevious", function() {
            it("slides the container to the right", function() {
                vmUnderTest.movePrevious();
                expect(vmUnderTest.slidingStatus()).toBe("slide-right");
                
                vmUnderTest.completeTransition();
                expect(vmUnderTest.slidingStatus()).toBe("");
           });
        });
    });
});
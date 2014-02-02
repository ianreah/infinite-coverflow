define(['containerViewModel', 'knockout'], function (ContainerViewModel, ko) {
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
            
            ko.cleanNode(document.body);
            document.body.innerHTML = "<ul id='testContainer' data-bind='foreach: items'><li data-bind='text: index'></li></ul>";
            ko.applyBindings(vmUnderTest);
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
           expect(vmUnderTest.slidingStatus()).toBe("");
        });
        
        it("ignores completeTransition calls from child elements", function(){
            var testContainer = document.getElementById("testContainer");
            vmUnderTest.completeTransition(vmUnderTest, {target: testContainer.children[0]});
            
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
        
        describe("moveNext", function() {
            it("slides the container to the left", function() {
                vmUnderTest.moveNext();
                expect(vmUnderTest.slidingStatus()).toBe("slide-left");
                
                vmUnderTest.completeTransition(vmUnderTest, {target: document.getElementById("testContainer")});
                expect(vmUnderTest.slidingStatus()).toBe("");
           });
           
           it("updates the items", function(){
                vmUnderTest.moveNext();
                vmUnderTest.completeTransition(vmUnderTest, {target: document.getElementById("testContainer")});

                expect(vmUnderTest.items()[0].index()).toBe(1);
                expect(vmUnderTest.items()[1].index()).toBe(2);
                expect(vmUnderTest.items()[2].index()).toBe(3);
                expect(vmUnderTest.items()[3].index()).toBe(4);
                expect(vmUnderTest.items()[4].index()).toBe(5);
                expect(vmUnderTest.items()[5].index()).toBe(6);
                expect(vmUnderTest.items()[6].index()).toBe(7);
                expect(vmUnderTest.items()[7].index()).toBe(8);
                expect(vmUnderTest.items()[8].index()).toBe(9);
           });
        });
        
        describe("movePrevious", function() {
            it("slides the container to the right", function() {
                vmUnderTest.movePrevious();
                expect(vmUnderTest.slidingStatus()).toBe("slide-right");
                
                vmUnderTest.completeTransition(vmUnderTest, {target: document.getElementById("testContainer")});
                expect(vmUnderTest.slidingStatus()).toBe("");
            });
                   
            it("updates the items", function(){
                vmUnderTest.movePrevious();
                vmUnderTest.completeTransition(vmUnderTest, {target: document.getElementById("testContainer")});
                
                expect(vmUnderTest.items()[0].index()).toBe(-1);
                expect(vmUnderTest.items()[1].index()).toBe(0);
                expect(vmUnderTest.items()[2].index()).toBe(1);
                expect(vmUnderTest.items()[3].index()).toBe(2);
                expect(vmUnderTest.items()[4].index()).toBe(3);
                expect(vmUnderTest.items()[5].index()).toBe(4);
                expect(vmUnderTest.items()[6].index()).toBe(5);
                expect(vmUnderTest.items()[7].index()).toBe(6);
                expect(vmUnderTest.items()[8].index()).toBe(7);
            });
        });
    });
});
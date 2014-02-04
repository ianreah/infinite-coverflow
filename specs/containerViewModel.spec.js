define(['containerViewModel', 'knockout'], function (ContainerViewModel, ko) {
    describe("Container View Model module", function () {
        var vmUnderTest;

        var mockItemFactory = {            
            getItem: function(requestedIndex) {
                return {                    
                    index: function() {
                        return requestedIndex;
                    },
                    fadingStatus: function() {
                        return "";
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
           
           it("marks the next item as current", function(){
                vmUnderTest.moveNext();
                vmUnderTest.completeTransition(vmUnderTest, {target: document.getElementById("testContainer")});
                
                expect(vmUnderTest.currentIndex()).toBe(5);
           });
           
           it("followed by movePrevious before it finishes puts items back the way they were", function(){
                vmUnderTest.moveNext();
                vmUnderTest.movePrevious();
                expect(vmUnderTest.slidingStatus()).toBe("slide-reset");
                
                vmUnderTest.completeTransition(vmUnderTest, {target: document.getElementById("testContainer")});
                expect(vmUnderTest.slidingStatus()).toBe("");
                
                expect(vmUnderTest.items()[0].index()).toBe(0);
                expect(vmUnderTest.items()[1].index()).toBe(1);
                expect(vmUnderTest.items()[2].index()).toBe(2);
                expect(vmUnderTest.items()[3].index()).toBe(3);
                expect(vmUnderTest.items()[4].index()).toBe(4);
                expect(vmUnderTest.items()[5].index()).toBe(5);
                expect(vmUnderTest.items()[6].index()).toBe(6);
                expect(vmUnderTest.items()[7].index()).toBe(7);
                expect(vmUnderTest.items()[8].index()).toBe(8);
                
                expect(vmUnderTest.currentIndex()).toBe(4);
           });
           
           it("fades in last item", function(){
                var lastItem = vmUnderTest.items()[8];
                spyOn(lastItem, "fadingStatus");
                
                vmUnderTest.moveNext();
                expect(lastItem.fadingStatus).toHaveBeenCalledWith("fade-in");
                
                vmUnderTest.completeTransition(vmUnderTest, {target: document.getElementById("testContainer")});
                expect(lastItem.fadingStatus).toHaveBeenCalledWith("");
           });
           
           it("fades out second item", function(){
                var secondItem = vmUnderTest.items()[1];
                spyOn(secondItem, "fadingStatus");
                
                vmUnderTest.moveNext();
                expect(secondItem.fadingStatus).toHaveBeenCalledWith("fade-out");
                
                vmUnderTest.completeTransition(vmUnderTest, {target: document.getElementById("testContainer")});
                expect(secondItem.fadingStatus).toHaveBeenCalledWith("");
           });
           
           it("followed by movePrevious before it finishes fades the last item back out again", function (){
                var lastItem = vmUnderTest.items()[8];
                spyOn(lastItem, "fadingStatus");
                
                vmUnderTest.moveNext();
                vmUnderTest.movePrevious();
                expect(lastItem.fadingStatus).toHaveBeenCalledWith("fade-out");
                
                vmUnderTest.completeTransition(vmUnderTest, {target: document.getElementById("testContainer")});
                expect(lastItem.fadingStatus).toHaveBeenCalledWith("");
           });
           
           it("followed by movePrevious before it finishes fades the second item back in again", function (){
                var secondItem = vmUnderTest.items()[1];
                spyOn(secondItem, "fadingStatus");
                
                vmUnderTest.moveNext();
                vmUnderTest.movePrevious();
                expect(secondItem.fadingStatus).toHaveBeenCalledWith("fade-in");
                
                vmUnderTest.completeTransition(vmUnderTest, {target: document.getElementById("testContainer")});
                expect(secondItem.fadingStatus).toHaveBeenCalledWith("");
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
           
            it("marks the previous item as current", function(){
                vmUnderTest.movePrevious();
                vmUnderTest.completeTransition(vmUnderTest, {target: document.getElementById("testContainer")});
                
                expect(vmUnderTest.currentIndex()).toBe(3);
            });
           
           it("followed by moveNext before it finishes doesn't change the current item", function(){
                vmUnderTest.movePrevious();
                vmUnderTest.moveNext();
                expect(vmUnderTest.slidingStatus()).toBe("slide-reset");
                
                vmUnderTest.completeTransition(vmUnderTest, {target: document.getElementById("testContainer")});
                expect(vmUnderTest.slidingStatus()).toBe("");
                
                expect(vmUnderTest.items()[0].index()).toBe(0);
                expect(vmUnderTest.items()[1].index()).toBe(1);
                expect(vmUnderTest.items()[2].index()).toBe(2);
                expect(vmUnderTest.items()[3].index()).toBe(3);
                expect(vmUnderTest.items()[4].index()).toBe(4);
                expect(vmUnderTest.items()[5].index()).toBe(5);
                expect(vmUnderTest.items()[6].index()).toBe(6);
                expect(vmUnderTest.items()[7].index()).toBe(7);
                expect(vmUnderTest.items()[8].index()).toBe(8);
                
                expect(vmUnderTest.currentIndex()).toBe(4);
           });
           
           
           it("fades in first item", function(){
                var firstItem = vmUnderTest.items()[0];
                spyOn(firstItem, "fadingStatus");
                
                vmUnderTest.movePrevious();
                expect(firstItem.fadingStatus).toHaveBeenCalledWith("fade-in");
                
                vmUnderTest.completeTransition(vmUnderTest, {target: document.getElementById("testContainer")});
                expect(firstItem.fadingStatus).toHaveBeenCalledWith("");
           });
           
           it("fades out second-last item", function(){
                var secondLastItem = vmUnderTest.items()[7];
                spyOn(secondLastItem, "fadingStatus");
                
                vmUnderTest.movePrevious();
                expect(secondLastItem.fadingStatus).toHaveBeenCalledWith("fade-out");
                
                vmUnderTest.completeTransition(vmUnderTest, {target: document.getElementById("testContainer")});
                expect(secondLastItem.fadingStatus).toHaveBeenCalledWith("");
           });
           
           it("followed by moveNext before it finished fades the first item back out again", function(){
                var firstItem = vmUnderTest.items()[0];
                spyOn(firstItem, "fadingStatus");
                
                vmUnderTest.movePrevious();
                vmUnderTest.moveNext();
                expect(firstItem.fadingStatus).toHaveBeenCalledWith("fade-out");
                
                vmUnderTest.completeTransition(vmUnderTest, {target: document.getElementById("testContainer")});
                expect(firstItem.fadingStatus).toHaveBeenCalledWith("");
           });
           
           it("followed by moveNext before it finished fades the second-last item back in again", function(){
                var secondLastItem = vmUnderTest.items()[7];
                spyOn(secondLastItem, "fadingStatus");
                
                vmUnderTest.movePrevious();
                vmUnderTest.moveNext();
                expect(secondLastItem.fadingStatus).toHaveBeenCalledWith("fade-in");
                
                vmUnderTest.completeTransition(vmUnderTest, {target: document.getElementById("testContainer")});
                expect(secondLastItem.fadingStatus).toHaveBeenCalledWith("");
           });
        });
    });
});
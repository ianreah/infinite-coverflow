define(['placeholderItem'], function(PlaceholderItem) {
    describe("Placeholder Item module", function () {
        it("constructs items with the given index", function() {
            expect(new PlaceholderItem(0).index()).toBe(0);
            expect(new PlaceholderItem(1).index()).toBe(1);
            expect(new PlaceholderItem(41).index()).toBe(41);
        });

        it("constructs items with blank fadingStatus", function() {
            expect(new PlaceholderItem(0).fadingStatus()).toBe("");
        });
        
        it("can set fadingStatus", function() {
           var item = new PlaceholderItem(0) ;
           item.fadingStatus("fade-in");
           
           expect(item.fadingStatus()).toBe("fade-in");
        });
        
        it("provides placehold.it image source urls labeled with the index (converted to 1-based)", function() {
            expect(new PlaceholderItem(0).imageSource()).toBe("http://placehold.it/100x100&text=1");
            expect(new PlaceholderItem(1).imageSource()).toBe("http://placehold.it/100x100&text=2");
            expect(new PlaceholderItem(41).imageSource()).toBe("http://placehold.it/100x100&text=42");
        });
        
        it("updates imageSource when the index is updated", function() {
            var item = new PlaceholderItem(41);
            item.index(31);
            
            expect(item.index()).toBe(31);
            expect(item.imageSource()).toBe("http://placehold.it/100x100&text=32");
        });
        
        it("doesn't allow writes to imageSource", function(){
            var tryToWriteToImageSource = function() {
                new PlaceholderItem(41).imageSource("http://placehold.it/100x100&text=32");
            };
            
            expect(tryToWriteToImageSource).toThrow();
        });
    });
});
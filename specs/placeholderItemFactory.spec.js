define(['placeholderItemFactory'], function (ItemFactory) {
    describe("Place Holder Item Factory module", function () {
        var itemFactoryUnderTest;

        beforeEach(function () {
            itemFactoryUnderTest = new ItemFactory(5);
        });

        it("gets items from a valid index", function () {
            expect(itemFactoryUnderTest.getItem(0).index()).toBe(0);
            expect(itemFactoryUnderTest.getItem(1).index()).toBe(1);
            expect(itemFactoryUnderTest.getItem(2).index()).toBe(2);
            expect(itemFactoryUnderTest.getItem(3).index()).toBe(3);
            expect(itemFactoryUnderTest.getItem(4).index()).toBe(4);
        });

        it("wraps correctly when index requested is higher than the number of items", function () {
            expect(itemFactoryUnderTest.getItem(5).index()).toBe(0);
            expect(itemFactoryUnderTest.getItem(6).index()).toBe(1);
            expect(itemFactoryUnderTest.getItem(42).index()).toBe(2);
            expect(itemFactoryUnderTest.getItem(58).index()).toBe(3);
            expect(itemFactoryUnderTest.getItem(79).index()).toBe(4);
        });

        it("wraps correctly when index requested is negative", function () {
            expect(itemFactoryUnderTest.getItem(-1).index()).toBe(4);
            expect(itemFactoryUnderTest.getItem(-2).index()).toBe(3);
            expect(itemFactoryUnderTest.getItem(-42).index()).toBe(3);
            expect(itemFactoryUnderTest.getItem(-58).index()).toBe(2);
            expect(itemFactoryUnderTest.getItem(-79).index()).toBe(1);
        });
    });
});
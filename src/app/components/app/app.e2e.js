describe('AppComponent', function () {
    beforeEach(function () {
        browser.get('/');
    });
    it('should have <home>', function () {
        var subject = element(by.css('app home')).isPresent();
        var result = true;
        expect(subject).toEqual(result);
    });
});
//# sourceMappingURL=app.e2e.js.map
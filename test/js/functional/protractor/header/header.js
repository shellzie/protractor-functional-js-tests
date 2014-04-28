//CODE CHANGES FROM CQ SEEMS TO HAVE BROKEN THIS TEST. WAS WORKING BEFORE.
describe('header test page', function() {

    var ptor, driver;

    beforeEach(function() {
        ptor = protractor.getInstance();
        driver = ptor.driver;
        ptor.ignoreSynchronization = true;
        browser.driver.get('http://localhost:3000/showroom_cms/content/components/core/header.html');
    });

    it('loads the header component on test page', function() {

        var title = $('h1');
        expect(title.getText()).toBe('Header Component Test Page');

        var section = $('section#pageHeading');
        expect(section.getInnerHtml()).toContain('<h1>Header Component Test Page</h1>');

    });


});



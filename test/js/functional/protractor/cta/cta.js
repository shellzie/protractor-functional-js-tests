//var jasmine = require('jasmine-node');

//var expect = chai.expect;

describe('cta test page', function() {

    var ptor, driver;

    beforeEach(function() {
        ptor = protractor.getInstance();
        driver = ptor.driver;
        ptor.ignoreSynchronization = true;
        browser.driver.get('http://localhost:3000/showroom_cms/content/components/core/cta.html');
    });

    it('displays all ctas with correct urls', function() {
        var items = element.all(by.css('a.ccta')).map(function(elm, index) {
            return {
                index: index,
                url: elm.getAttribute('href')
            };
        });
        expect(items).toEqual([
            {index: 0, url: 'http://intuit.com/'},
            {index: 1, url: 'http://intuit.com/'},
            {index: 2, url: 'http://intuit.com/'},
            {index: 3, url: 'http://intuit.com/'},
            {index: 4, url: 'http://localhost:3000/showroom_cms/content/components/modal/modal_video'},
            {index: 5, url: 'http://intuit.com/'}
        ]);
    }, 5000);

    it('displays all ctas with correct text', function() {
        var items2 = element.all(by.css('a.ccta')).map(function(elt, index) {
            return {
                index: index,
                text: elt.getText()
            };
        });

        expect(items2).toEqual([
            {index: 0, text: 'Buy Now\naccess'},
            {index: 1, text: 'Try Now'},
            {index: 2, text: 'See All'},
            {index: 3, text: 'Contact us'},
            {index: 4, text: 'Save the whales'},
            {index: 5, text: 'CTA with ID'}
        ]);
    }, 50000);

});



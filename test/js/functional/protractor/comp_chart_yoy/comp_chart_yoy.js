describe('comparison chart - YOY - test page', function() {

    var ptor, driver;

    beforeEach(function() {
        ptor = protractor.getInstance();
        driver = ptor.driver;
        ptor.ignoreSynchronization = true;
        browser.driver.get('http://localhost:3000/showroom_cms/content/components/comparison/comparison_yoy.html');
    });

    it('loads the comp chart component on test page', function() {

        var title = $('h3');
        expect(title.getText()).toBe('Feature List by Version Year');

    });
//
//    it('toggles the disclosures when user clicks on disclosures link', function() {
//
//        //1. before clicking disclosure link, the disclosures should NOT be on page
//        expect($(".cdisclosure-text").getText()).toBe("");
//
//        //2. click disclosure link
//        var link = $(".toggle-disclosure");
//        link.click();
//        ptor.sleep(2000);
//
//        //3. verify that the disclosure text now appears on page
//        var item = $('.cdisclosure-text p');
//        expect(item.getText()).toContain('30% off the monthly price for QuickBooks Online Essentials');
//    });


});



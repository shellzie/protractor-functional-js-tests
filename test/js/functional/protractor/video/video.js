describe('video test page', function() {

    var ptor, driver;

    beforeEach(function() {
        ptor = protractor.getInstance();
        driver = ptor.driver;
        ptor.ignoreSynchronization = true;
        //use browser.driver because this is a non-angular app. This allows us to access wrapped webdriver instance.
        browser.driver.get('http://localhost:3000/showroom_cms/content/components/core/video.html');
    });


    it('plays first video', function() {
        var vid1 = element(by.css('.cvideo'));
        console.log(">>>>>>>>>> " + vid1);
        var outer = vid1.getOuterHtml().then(function(code) {
            var re = /(video_)(.)*\"/;
            var first_match = code.match(re)[0];
            var video_id = "" + first_match.substring(0, first_match.length-1); //remove last character which was a quote.
            console.log(">>>>>>>>> video_id = " + video_id);


//            console.log(">>>>>> window = " + scope);
//            console.log(">>>>>> browser = " + browser);
//            console.log(">>>>>> browser.driver = " + browser.driver);
//            console.log(">>>>>> browser.driver.Window = " + browser.driver.Window);
//            console.log(">>>>>> browser.driver.Window.Intuit = " + browser.driver.Window.Intuit);
//            console.log(">>>>>> browser.driver.Window.Intuit.Library = " + browser.driver.Window.Intuit.Library);
//            var vid_state = browser.driver.Window.Intuit.Library.Video.YouTubePlayer.play(video_id); //play() returns the object
//            expect(vid_state).to.equal("1"); //unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5)

        });

        console.log("++++++++++ outer = " + outer);


    });   //waiting for overall page to load

//    it('loads the video component and player controls work', function() {
//        var labels = element.all(by.css('iframe')).map(function(elm, index)  {
//            return {
//                index: index,
//                text: elm.getOuterHtml()
//            }
//        });
//        expect(labels).toEqual([
//            {index: 0, text: 'repeater'},
//            {index: 1, text: 'bindings'}
//        ]);
//    });

//    it('loads the video component on test page', function() {
//        var items = element.all(by.css(".cvideo")).map(function(elm, index) {
//            var outer = elm.getOuterHtml().then(function(outer) {
//                var re = /(video_)(.)*\"/;
//                var first_match = outer.match(re)[0];
//                var val = "" + first_match.substring(0, first_match.length-1); //remove last character which was a quote.
//                console.log(">>>>>>>>> val = " + val);
//                return {
//                    index: index,
//                    id_val: val
//                };
//            });
//            console.log(">>>>>>>>>> outer " + outer);
//        });
//
//        console.log(">>>>>>> items = " + items);
//
//
//        expect(items).toEqual([
//            {index: 0, id_val: "video_"},
//            {index: 1, id_val: "video_"}
//        ]);
//    });   //waiting for overall page to load
});



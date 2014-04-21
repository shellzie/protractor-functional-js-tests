describe('Testing Comp Chart with disclosures', function() {



    beforeEach(function(){
        var url = '/showroom_cms/content/components/comparison/comparison_yoy.html';
        browser().navigateTo(url);
        sleep(3);
    });

    it('loads page initially without disclosures', function(done) {
        console.log(">>>>>>>>> element(h2) = " + element("h2"));
        var title = element("h2").text();
        console.log(">>>>>>>> title = " + title);
        expect(title).toContain("QuickBooks Pro 2013");


//        console.log("+++++++++ vid1_id = " + vid1_id);
//        console.log("INtuit = " + Intuit);
//        console.log("INtuit.Library = " + Intuit.Library);
//        console.log("INtuit.Library.Video = " + Intuit.Library.Video);
//        console.log("INtuit.Library.Video.YouTubePlayer = " + Intuit.Library.Video.YouTubePlayer);
//        console.log("INtuit.Library.Video.YouTubePlayer.getState(vid1_id) = " + Intuit.Library.Video.YouTubePlayer.getState(vid1_id));


//        var vid_state = Intuit.Library.Video.YouTubePlayer.getState(vid1_id); //play() returns the object
//        expect(vid_state).toEqual("1"); //unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5)
    });

});

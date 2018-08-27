/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* A test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* Tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('URLs are defined and not empty', function() {
          allFeeds.forEach(Feed => {
            expect(Feed.url).toBeDefined();
            expect(Feed.url.length).not.toBe(0);
          });
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('Names are defined and not empty', function() {
           allFeeds.forEach(Feed => {
             expect(Feed.name).toBeDefined();
             expect(Feed.name.length).not.toBe(0);
           });
         });
    });

    describe('The menu', function() {
      /* A test that ensures the menu element is
       * hidden by default.
       */

       it('is hidden by default', function() {
         const checkClass = $('body').hasClass('menu-hidden');
         expect(checkClass).toBe(true);
       });

       /* A test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */

        it('changes visibility when icon is clicked', function()  {
          const menuButton = document.querySelector(".menu-icon-link");
          const clickEvent = new CustomEvent("click");

          //Clicked once, shows menu
          menuButton.dispatchEvent(clickEvent);
          expect(document.body.classList.toggle("menu-hidden")).toBe(true);

          //Clicked twice, hides menu
          menuButton.dispatchEvent(clickEvent);
          expect(document.body.classList.toggle("menu-hidden")).toBe(true);
        });

    });

    describe('Initial Entries', function() {

      /* A test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       */

      beforeEach(function(done) {
        loadFeed(0, done);
      });

      it('are present when LoadFeed is called', function() {
        const checkEntries = $('.feed .entry').length;
        expect(checkEntries).toBeGreaterThan(0);
      });

    });

    describe ('New Feed Selection', function() {

      /* A test that ensures when a new feed is loaded
       * by the loadFeed function and that the content actually changes.
       */

      let initialFeed;
      let newFeed;

      beforeEach(function(done){
        loadFeed(0, function () {
          initialFeed = $('.feed').html();
          done();
        });
      });

      it('loads new feed', function(done){
        loadFeed(2, function(){
          newFeed = $('.feed').html();
            expect(newFeed).not.toBe(initialFeed);
            done();
        });
      });
    });

}());

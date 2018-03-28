/* feedreader.js
 *
 * 这是 Jasmine 会读取的spec文件，它包含所有的要在你应用上面运行的测试。
 */

/* 我们把所有的测试都放在了 $() 函数里面。因为有些测试需要 DOM 元素。
 * 我们得保证在 DOM 准备好之前他们不会被运行。
 */
$(
    (function() {
        /* 这是我们第一个测试用例 - 其中包含了一定数量的测试。这个用例的测试
     * 都是关于 Rss 源的定义的，也就是应用中的 allFeeds 变量。
    */
        describe('RSS Feeds', function() {
            /* 这是我们的第一个测试 - 它用来保证 allFeeds 变量被定义了而且
         * 不是空的。在你开始做这个项目剩下的工作之前最好实验一下这个测试
         * 比如你把 app.js 里面的 allFeeds 变量变成一个空的数组然后刷新
         * 页面看看会发生什么。
        */
            it('are defined', function() {
                expect(allFeeds).toBeDefined();
                expect(allFeeds.length).not.toBe(0);
            });

            /* 
         * 遍历 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的。
         */
            it('no empty url', function() {
                allFeeds.forEach(feed => {
                    expect(feed.url).toBeDefined();
                    expect(feed.url.length).not.toBe(0);
                });
            });

            /* 
         * 遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的。
         */
            it('no empty name', function() {
                allFeeds.forEach(feed => {
                    expect(feed.name).toBeDefined();
                    expect(feed.name.length).not.toBe(0);
                });
            });
        });

        /* 菜单测试用例 */
        describe('The menu', function() {
            /* 
         * 保证菜单元素默认是隐藏的
         */
            it('menu hidden by default', function() {
                expect($('body').hasClass('menu-hidden')).toBe(true);
            });

            /*
        * 测试点击显示和隐藏菜单
        */
            it('toggle menu', function() {
                const menuIcon = $('.menu-icon-link');
                const body = $('body');
                const HIDDEN_CLASS = 'menu-hidden';
                menuIcon.click();
                expect(body.hasClass(HIDDEN_CLASS)).toBe(false);
                menuIcon.click();
                expect(body.hasClass(HIDDEN_CLASS)).toBe(true);
            });
        });

        describe('Initial Entries', function() {
            beforeEach(function(done) {
                loadFeed(0, function() {
                    done();
                });
            });

            it('should get initial entries', function(done) {
                expect($('.feed').find('.entry').length).not.toBe(0);
                done();
            });
        });

        describe('New Feed Selection', function() {
            let initialData = '';

            /**
             * 此处国内网络如果不手动增加Jasmine的DEFAULT_TIMEOUT_INTERVAL就会报超时错误
             */
            beforeEach(function(done) {
                loadFeed(0, function() {
                    initialData = $($('.entry-link')[0]).attr('href');
                    loadFeed(1, function() {
                        done();
                    });
                });
            });

            it('entries should change when new feed selected', function(done) {
                const changedData = $($('.entry-link')[0]).attr('href');
                expect(changedData).not.toBe(initialData);
                done();
            });
        });
    })()
);

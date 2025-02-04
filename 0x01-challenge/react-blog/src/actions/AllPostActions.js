var alt = require('../alt');
var request = require('superagent');
var config = require('../../config');

class AllPostActions {
    loadPage(pageNum, cb) {
        var AllPostStore = require('../stores/AllPostStore');
        var state = AllPostStore.getState();

        if (!!state.postsByPage[pageNum]) {
            this.actions.updatePosts(state.postsByPage[pageNum], pageNum);
        } else {
            var self = this;
            pageNum = pageNum - 1;

            var end = (pageNum * config.itemsPerPage) + config.itemsPerPage;
            var start = (pageNum * config.itemsPerPage);

            if (typeof NProgress !== 'undefined') {
                NProgress.start();
            }

            request.get(config.baseUrl + '/ajax/postsByPage/' + start + '/' + end, function (err, response) {
                if (err) {
                    console.error("Error fetching posts:", err);
                    return;
                }

                self.actions.updatePosts(response.body, pageNum + 1);

                setTimeout(function () {
                    if (typeof NProgress !== 'undefined') {
                        NProgress.done();
                    }
                }, 500);

                if (!!cb) {
                    cb();
                }
            });
        }
    }

    loadPostListContent() {
        var self = this;
        var AllPostStore = require('../stores/AllPostStore');
        var state = AllPostStore.getState();

        if (
            (!!state.postListContent.content && state.postListContent.content !== '') ||
            (!!state.postListContent.header && state.postListContent.header !== '')
        ) {
            return;
        }

        request.get(config.baseUrl + '/ajax/postListContent', function (err, response) {
            if (err) {
                console.error("Error fetching post list content:", err);
                return;
            }
            self.actions.updatePostListContent(response.body);
        });
    }

    getNumberOfPosts() {
        var self = this;
        var AllPostStore = require('../stores/AllPostStore');
        var state = AllPostStore.getState();

        if (state.numberOfPosts === 0) {
            request.get(config.baseUrl + '/ajax/getNumberOfPosts', function (err, response) {
                if (err) {
                    console.error("Error fetching number of posts:", err);
                    return;
                }
                self.actions.updateNumberOfPosts(response.body.numberOfPosts);
            });
        } else {
            this.actions.updateNumberOfPosts(state.numberOfPosts);
        }
    }

    updateNumberOfPosts(num) {
        this.dispatch(num);
    }

    updatePosts(post, pageNum) {
        this.dispatch({
            post: post,
            pageNum: pageNum
        });
    }

    updatePostListContent(postListContent) {
        this.dispatch(postListContent);
    }
}

module.exports = alt.createActions(AllPostActions);


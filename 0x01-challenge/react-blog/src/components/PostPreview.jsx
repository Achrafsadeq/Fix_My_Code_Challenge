var React = require('react');
var PropTypes = require('prop-types');
var SinglePostActions = require('../actions/SinglePostActions');
var AuthorMixin = require('../mixins/AuthorMixin.jsx');

var PostPreview = React.createClass({
    contextTypes: {
        router: PropTypes.object
    },

    mixins: [AuthorMixin],

    loadPost: function (e) {
        e.preventDefault();
        this.context.router.push('/post/' + this.props.post.id + '/' + this.props.post.slug);
    },

    render: function () {
        return (
            <a 
                href={'/post/' + this.props.post.id + '/' + this.props.post.slug} 
                className="single-post" 
                onClick={this.loadPost}
            >
                <div className="post-title">{this.props.post.title}</div>
                <div className="author-details">
                    {this.getAuthorDetails(this.props.post)}
                </div>
            </a>
        );
    }
});

module.exports = PostPreview;


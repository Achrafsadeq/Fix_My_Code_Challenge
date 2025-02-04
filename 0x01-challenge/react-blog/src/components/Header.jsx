var React = require('react');
var PropTypes = require('prop-types');
var { Navbar } = require('react-bootstrap');
var { Link } = require('react-router');

var Header = React.createClass({
    contextTypes: {
        router: PropTypes.object
    },

    render: function () {
        return (
            <Navbar>
                <NavBrand>
                    <Link to="/">React Blog</Link>
                </NavBrand>
            </Navbar>
        );
    }
});

module.exports = Header;


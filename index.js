var $ = require('jquery');
var React = require('react');
var HelloWorld = require('./src/HelloWorld');

$(document).ready(function() {
    React.render(<HelloWorld />, document.body);
});

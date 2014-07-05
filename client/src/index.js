/** @jsx React.DOM */

var $ = require('jquery');
var React = window.React = require('react');
var CommentBox = require('./app/components/comment-box');

$(function() {
  React.renderComponent(
    <CommentBox url="/api/comments" pollInterval={3000} />,
    document.getElementById('content')
  );
});

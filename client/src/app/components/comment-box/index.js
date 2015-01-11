/** @jsx React.DOM */

var $ = require('jquery');
var React = require('react');
var CommentList = require('./comment-list');
var CommentForm = require('./comment-form');

var CommentBox = React.createClass({
  getInitialState: function() {
    return {
      data: []
    };
  },

  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    var newComments = this.state.data.concat([comment]);
    this.setState({ data: newComments });

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({ data: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={ this.state.data } />
        <CommentForm onCommentSubmit={ this.handleCommentSubmit } />
      </div>
    );
  }
});

module.exports = CommentBox;

/** @jsx React.DOM */

var React = require('react');
var Comment = require('./comment');

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment, index) {
      return (
        <Comment author={ comment.author } key={ index }>{ comment.text }</Comment>
      );
    });

    return (
      <div className="commentList">
        { commentNodes }
      </div>
    );
  }
});

module.exports = CommentList;

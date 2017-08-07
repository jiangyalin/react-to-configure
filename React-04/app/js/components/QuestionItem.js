const React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div key={this.props.key}>
        <p>aaaaaaaaaaaaaa</p>
        <p>{this.props.voteCount}</p>
        <p>{this.props.title}</p>
        <p>{this.props.description}</p>
      </div>
    )
  }
});
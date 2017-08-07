const React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <form>
        <input type="text"/>
        <button className="btn btn-success pull-right">确认</button>
      </form>
    )
  }
});
const React = require('react');
const ShowAddButton = require('./ShowAddButton');
const QuestionForm = require('./QuestionForm');
const QuestionList = require('./QuestionList');

module.exports = React.createClass({
  getInitialState: function () {
    var questions = [
      {
        key: 1,
        title: '这是1问题',
        description: 'dhfjafhsadfaks',
        voteCount: 10
      },
      {
        key: 2,
        title: '这是2问题',
        description: 'dhfjafhsadfaks',
        voteCount: 10
      },
      {
        key: 3,
        title: '这是3问题',
        description: 'dhfjafhsadfaks',
        voteCount: 10
      }
    ];
    return {
      questions: questions
    }
  },
  render: function () {
    return (
      <div>
        <p>abc</p>
        <ShowAddButton/>
        <QuestionForm/>
        <QuestionList questions={this.state.questions}/>
      </div>
    )
  }
});
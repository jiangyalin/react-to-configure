const React = require('react');
const QuestionItem = require('./QuestionItem');

module.exports = React.createClass({
  render: function () {
    const questions = this.props.questions;
    if (!Array.isArray(questions)) throw new Error('问题必须是数组');

    return (
      <div>
        <p>这是列表5{questions[0].key}</p>
        {questions.map(item =>
          <QuestionItem key={item.key}
            title={item.title}
            description={item.description}
            voteCount={item.voteCount} />
        )}
      </div>
    )
  }
});
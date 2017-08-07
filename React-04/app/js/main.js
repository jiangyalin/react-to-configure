const React = require('react');
const ReactDOM = require('react-dom');
const QuestionApp = require('./components/QuestionApp');

let mainCom = ReactDOM.render(
  <QuestionApp />,
  document.getElementById('app')
);
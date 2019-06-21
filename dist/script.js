function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} // TODO: Implement design, remember to mention that you based it off https://dribbble.com/shots/2838580-Quote-Machine

// Redux:
const GENERATE = 'GENERATE_QUOTE';

const fetchQuote = () => {
  return dispatch => {
    fetch('https://quota.glitch.me/random').
    then(response => {
      return response.json();
    }).
    then(quoteData => {
      dispatch(generateQuote(quoteData));
    });
  };
};

const generateQuote = quote => {
  return {
    type: GENERATE,
    quote: quote };

};

const initialState = { quoteAuthor: 'Julius Caesar', quoteText: 'I came, I saw, I conquered' };
const quoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GENERATE:
      return Object.assign({}, state, {
        quoteAuthor: action.quote.quoteAuthor,
        quoteText: action.quote.quoteText });

    default:
      return state;}

};

const store = Redux.createStore(quoteReducer, Redux.applyMiddleware(ReduxThunk.default));

// React:
const { Provider, connect } = ReactRedux;

class RandomQuoteMachine extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    {
      tweetUrl: '' });_defineProperty(this, "generateQuote",










    () => {
      this.props.displayNewQuote();
    });_defineProperty(this, "generateTweetUrl",
    quote => {
      const baseUrl = 'https://twitter.com/intent/tweet?text=';
      const tweetUrl = `${baseUrl}${encodeURIComponent(quote.quoteAuthor)}-${encodeURIComponent(quote.quoteText)}`;
      this.setState({
        tweetUrl: tweetUrl });

    });}componentDidMount() {this.props.displayNewQuote();}componentDidUpdate(prevProps) {if (this.props.quote !== prevProps.quote) {// if it's a new quote, generate a new Twitter URL
      this.generateTweetUrl(this.props.quote);}}render() {
    return (
      React.createElement(React.Fragment, null,
      React.createElement("h2", { id: "text", className: "font-weight-bold" }, this.props.quote.quoteText),
      React.createElement("h5", { id: "author" }, this.props.quote.quoteAuthor),
      React.createElement("a", { id: "new-quote", className: "btn btn-link", onClick: this.generateQuote }, "New Quote"),
      React.createElement("a", { id: "tweet-quote", className: "btn btn-link", href: this.state.tweetUrl }, "Tweet Quote")));


  }}


const mapStateToProps = state => {
  return { quote: state };
};

const mapDispatchToProps = dispatch => {
  return {
    displayNewQuote: () => {
      dispatch(fetchQuote());
    } };

};

const Container = connect(mapStateToProps, mapDispatchToProps)(RandomQuoteMachine);
class AppWrapper extends React.Component {
  render() {
    return (
      React.createElement(Provider, { store: store },
      React.createElement(Container, null)));


  }}


ReactDOM.render(React.createElement(AppWrapper, null), document.getElementById('quote-box'));
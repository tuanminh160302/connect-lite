import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import gsap from 'gsap';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";
gsap.ticker.fps(120);

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "cache-and-network",
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: "cache-and-network",
    errorPolicy: 'all',
  },
}

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions
});

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

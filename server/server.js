import express from 'express';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.dev.babel';
import webpackMiddleware from 'webpack-dev-middleware';
import HMR from 'webpack-hot-middleware';
import App from '../src/App';

const app = express();

const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler));
app.use(HMR(compiler));

app.get('/', (req, res) => {
  let index = fs.readFileSync('./public/index.html', 'utf-8');
  const appRendered = renderToString(<App />);
  index = index.replace('<%= preloadedApplication %>', appRendered);
  res.send(index);
});

app.listen(3000, () => {
  console.log('app listening on 3000');
});

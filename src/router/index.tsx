import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../view/Home';

const RootRouter = function () {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </HashRouter>
  );
};

export default RootRouter;

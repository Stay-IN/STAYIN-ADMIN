import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from 'layouts';

import {
  ProductList as ProductListView,
  UserList as UserListView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Addhotel as AddhotelView,
  Updatehotel as UpdatehotelView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={AddhotelView}
        exact
        layout={MainLayout}
        path="/addhotel"
      />
      <RouteWithLayout
        component={UpdatehotelView}
        exact
        layout={MainLayout}
        path="/updatehotel/:id"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/hotels"
      />

      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;

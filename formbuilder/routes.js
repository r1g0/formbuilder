import React from "react";
import { Route, IndexRoute, Link } from "react-router";

import App from "./containers/App";
import FieldListContainer from "./containers/builder/FieldListContainer";
import FormContainer from "./containers/builder/FormContainer";
import JsonViewContainer from "./containers/builder/JsonViewContainer";

import NotificationContainer from "./containers/NotificationContainer";
import FormCreatedContainer from "./containers/FormCreatedContainer";
import Check from "./components/Check";

const common = {
  notifications: NotificationContainer,
  sidebarComponent: FieldListContainer
};

const LinkToBuilder = (props) => {
  return (
    <div className="list-group">
      <Link className="list-group-item" to="/builder">
        <i className="glyphicon glyphicon-chevron-left" />
        {props.text || "Back"}
      </Link>
    </div>
  );
};

const BackAndCheck = () => {
  return (
    <div>
      <LinkToBuilder text="Continue editing"/>
      <Check />
    </div>
  );
};

export default (
    <Route path="/" component={App}>
      <IndexRoute components={{...common, content: FormContainer}} />
      {/*<Route path="faq"
        components={{...common, sidebarComponent: LinkToBuilder, content: FAQ}} />*/}
      <Route path="builder"
        components={{...common, content: FormContainer}} />
      <Route path="builder/json"
        components={{...common, sidebarComponent: LinkToBuilder, content: JsonViewContainer}} />
      {/*<Route path="builder/published/:adminToken"
        components={{...common, sidebarComponent: BackAndCheck, content: FormCreatedContainer}} />
      <Route path="*" components={{
        sidebarComponent: FieldListContainer,
        content: _ => <h1>Page not found.</h1>
      }}/>*/}
    </Route>
  );

import React from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import FormsComponent from '../Pages/FormBuilder';
import SurveyComponent from '../Pages/Surveys';

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={FormsComponent} />
            <Route exact path="/survey/:slug" component={SurveyComponent} />
        </Switch>
    );
}
import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import MainLayout from "./Containers/MainLayout";
import BaseRouter from "./routes";
import * as actions from "./store/actions/auth";

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <MainLayout {...this.props}>
                        <BaseRouter />
                    </MainLayout>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

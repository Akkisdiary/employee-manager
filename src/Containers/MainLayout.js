import React, { Component } from "react";
import { Layout } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as action from "../store/actions/auth";
import MainHeader from "../Components/MainHeader";
const { Content } = Layout;

class MainLayout extends Component {
    addEmployee = () => {
        this.props.history.push("/addEmployee");
    };

    render() {
        return (
            <Layout className="layout">
                <MainHeader
                    isAuthenticated={this.props.isAuthenticated}
                    title="Employee Manager"
                    addEmployee={this.addEmployee}
                    logout={this.props.logout}
                />
                <Content style={{ padding: "0 50px" }}>
                    {this.props.children}
                </Content>
            </Layout>
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
        logout: () => dispatch(action.logout()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MainLayout)
);

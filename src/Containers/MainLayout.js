import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as action from "../store/actions/auth";

const { Header, Content } = Layout;

class MainLayout extends Component {
    render() {
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={["2"]}
                    >
                        <Menu.Item key="home">
                            <Link to="/">Employee Manager</Link>
                        </Menu.Item>
                        {this.props.isAuthenticated ? (
                            <Menu.Item key="logout" onClick={this.props.logout}>
                                Logout
                            </Menu.Item>
                        ) : null}
                    </Menu>
                </Header>
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

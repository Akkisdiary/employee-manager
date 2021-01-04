import React, { Component } from "react";
import { Layout, Menu, Avatar } from "antd";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import * as action from "../store/actions/auth";
import MainHeader from "../Components/MainHeader";
import { UserOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

class MainLayout extends Component {
    addEmployee = () => {
        this.props.history.push("/addEmployee");
    };

    render() {
        return (
            <Layout className="layout">
                <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={["1"]}
                    >
                        <Menu.Item key="1">
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        {this.props.isAuthenticated ? (
                            <Menu.Item key="2" onClick={this.props.logout}>
                                {" "}
                                Logout
                            </Menu.Item>
                        ) : null}
                    </Menu>
                </Header>
                <MainHeader
                    isAuthenticated={this.props.isAuthenticated}
                    title="Employee Manager"
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

import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import * as action from "../store/actions/auth";

class NormalLoginForm extends Component {
    onFinish = (values) => {
        this.props.onAuth(values.username, values.password);
    };

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.props.history.push("/");
        }
    }

    componentDidUpdate() {
        if (this.props.isAuthenticated) {
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={this.onFinish}
            >
                <Form.Item>
                    <h3>Login</h3>
                </Form.Item>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Username!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Password!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    {!this.props.loading ? (
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            Log in
                        </Button>
                    ) : (
                        <Spin />
                    )}
                </Form.Item>
                Or <a href="/signup">register now!</a>
                <p>{this.props.error}</p>
            </Form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.token !== null,
        loading: state.loading,
        error: state.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (username, password) =>
            dispatch(action.authLogin(username, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);

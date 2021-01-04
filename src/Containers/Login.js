import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Spin } from "antd";
import { LockOutlined } from "@ant-design/icons";
import * as action from "../store/actions/auth";

class NormalLoginForm extends Component {
    onFinish = (values) => {
        this.props.onAuth(values.email, values.password);
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
        let errorMsg = "";
        if (this.props.error) {
            errorMsg = this.props.error.message;
        }
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
                    name="email"
                    rules={[
                        {
                            required: true,
                            type: "email",
                            message: "The input is not valid E-mail!",
                        },
                    ]}
                >
                    <Input />
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
                <p>{errorMsg}</p>
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
        onAuth: (email, password) =>
            dispatch(action.authLogin(email, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);

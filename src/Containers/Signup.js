import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, Button } from "antd";
import * as action from "../store/actions/auth";

class RegistrationForm extends Component {
    formRef = React.createRef();

    componentDidUpdate() {
        if (this.props.isAuthenticated) {
            this.props.history.push("/");
        }
    }

    tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    onFinish = (values) => {
        this.props.onAuth(
            values.username,
            values.email,
            values.password,
            values.confirm
        );
        this.props.history.push("/");
    };

    render() {
        return (
            <Form
                ref={this.formRef}
                name="register"
                onFinish={this.onFinish}
                scrollToFirstError
            >
                <Form.Item>
                    <h3>Signup</h3>
                </Form.Item>
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Username!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: "email",
                            message: "The input is not valid E-mail!",
                        },
                        {
                            required: true,
                            message: "Please input your E-mail!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(
                                    "The two passwords that you entered do not match!"
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item {...this.tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                    Or{" "}
                    <a className="btn" href="/login">
                        Login
                    </a>
                </Form.Item>
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
        onAuth: (username, email, password1, password2) =>
            dispatch(action.authSignup(username, email, password1, password2)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);

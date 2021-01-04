import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Input, DatePicker, Button } from "antd";
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
            values.first_name,
            values.last_name,
            values.email,
            values.password,
            values.confirm,
            values.address,
            values.dob,
            values.company,
            values.mobile,
            values.city
        );
    };

    render() {
        let errorMsg = "";
        if (this.props.error) {
            errorMsg = this.props.error.message;
        }
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
                <p>{errorMsg}</p>
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        {
                            required: true,
                            message: "Please input username!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="first_name"
                    label="First Name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your First Name!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="last_name"
                    label="Last Name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Last Name!",
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
                <Form.Item
                    name="address"
                    label="Address"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Address!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="dob" label="DOB" {...this.config}>
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    name="company"
                    label="Company"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Company!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="mobile"
                    label="Mobile"
                    rules={[
                        {
                            required: true,
                            message: "Please input your mobile!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="city"
                    label="City"
                    rules={[
                        {
                            required: true,
                            message: "Please input your City!",
                        },
                    ]}
                >
                    <Input />
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
        onAuth: (
            username,
            first_name,
            last_name,
            email,
            password,
            confirm,
            address,
            dob,
            company,
            mobile,
            city
        ) =>
            dispatch(
                action.authSignup(
                    username,
                    first_name,
                    last_name,
                    email,
                    password,
                    confirm,
                    address,
                    dob,
                    company,
                    mobile,
                    city
                )
            ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);

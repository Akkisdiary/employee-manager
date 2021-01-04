import React, { Component } from "react";
import { Form, Input, Button, DatePicker, Spin } from "antd";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";

class AddEmployeeForm extends Component {
    formRef = React.createRef();
    state = {
        isLoading: false,
        employeeId: this.props.match.params.employeeId,
        error: "",
    };

    config = {
        rules: [
            { type: "object", required: true, message: "Please select time!" },
        ],
    };

    componentDidMount() {
        if (this.props.isAuthenticated) {
            axios.defaults.headers = {
                "Content-type": "application/json",
                authorization: "Token " + this.props.token,
            };
            if (this.state.employeeId) {
                axios
                    .get(`http://127.0.0.1:8000/api/${this.state.employeeId}/`)
                    .then((res) => {
                        let data = res.data;
                        data.dob = moment(data.dob);
                        this.formRef.current.setFieldsValue(data);
                    })
                    .catch((err) => this.setState({ error: err }));
            }
        } else {
            this.props.history.push("/login");
        }
    }

    componentDidUpdate() {
        if (!this.props.isAuthenticated) {
            this.props.history.push("/login");
        }
    }

    onFinish = (values) => {
        this.setState({ isLoading: true });
        if (this.state.employeeId) {
            axios.defaults.headers = {
                "Content-type": "application/json",
                authorization: "Token " + this.props.token,
            };
            axios
                .put(`http://127.0.0.1:8000/api/${this.state.employeeId}/`, {
                    id: this.state.employeeId,
                    email: values.email,
                    first_name: values.first_name,
                    last_name: values.last_name,
                    address: values.address,
                    dob: values.dob.format("YYYY-MM-DD"),
                    company: values.company,
                    mobile: values.mobile,
                    city: values.city,
                })
                .then((result) => {
                    this.props.history.push("/");
                })
                .catch((err) => this.setState({ error: err }));
        } else {
            axios.defaults.headers = {
                "Content-type": "application/json",
                authorization: "Token " + this.props.token,
            };
            axios
                .post("http://127.0.0.1:8000/api/", {
                    email: values.email,
                    first_name: values.first_name,
                    last_name: values.last_name,
                    address: values.address,
                    dob: values.dob.format("YYYY-MM-DD"),
                    company: values.company,
                    mobile: values.mobile,
                    city: values.city,
                })
                .then((result) => {
                    this.props.history.push("/");
                })
                .catch((err) => this.setState({ error: err }));
        }

        this.setState({ isLoading: false });
    };

    render() {
        return (
            <Form
                ref={this.formRef}
                name="control-ref"
                onFinish={this.onFinish}
                onFieldsChange={(v) => console.log("VALUES", v)}
                scrollToFirstError
            >
                <br></br>
                <p>{this.state.error}</p>
                <Form.Item
                    name="email"
                    label="E-mail"
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
                    name="first_name"
                    label="First Name"
                    rules={[
                        {
                            required: true,
                            message: "Please input employee first name!",
                            whitespace: false,
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
                            message: "Please input employee last name!",
                            whitespace: false,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="dob" label="DOB" {...this.config}>
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Address"
                    rules={[
                        {
                            required: true,
                            message: "Please input address!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="company"
                    label="Company"
                    rules={[
                        {
                            required: true,
                            message: "Please input address!",
                            whitespace: true,
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
                            message: "Please input mobile!",
                            len: 10,
                        },
                    ]}
                >
                    <Input
                        style={{
                            width: "100%",
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="city"
                    label="City"
                    rules={[
                        {
                            required: true,
                            message: "Please input address!",
                            whitespace: false,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                {this.state.isLoading ? (
                    <Form.Item>
                        <Spin />
                    </Form.Item>
                ) : (
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add
                        </Button>
                    </Form.Item>
                )}
            </Form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.token !== null,
        token: state.token,
    };
};

export default connect(mapStateToProps)(AddEmployeeForm);

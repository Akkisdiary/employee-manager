import { Table, Space } from "antd";
import { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "antd";

const { Column } = Table;

class EmployeeList extends Component {
    state = {
        employees: [],
        errorMsg: "",
    };

    componentDidMount() {
        if (this.props.isAuthenticated) {
            axios.defaults.headers = {
                "Content-type": "application/json",
                Authorization: "Token " + this.props.token,
            };
            console.log(axios.defaults.headers);
            axios
                .get("http://127.0.0.1:8000/api/")
                .then((res) => {
                    this.setState({ employees: res.data });
                })
                .catch((err) => {
                    this.setState({ errorMsg: err.message });
                });
        } else {
            this.props.history.push("/login");
        }
    }

    componentDidUpdate() {
        if (!this.props.isAuthenticated) {
            this.props.history.push("/login");
        }
    }

    deleteEmployee = (employeeId) => {
        axios.defaults.headers = {
            "Content-type": "application/json",
            authorization: this.props.token,
        };
        axios
            .delete(`http://127.0.0.1:8000/api/${employeeId}/`)
            .then((res) => {
                console.log("SUCCESS:", res);
            })
            .catch((err) => this.setState({ error: err.message }));
    };

    render() {
        return (
            <div>
                <br />
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                >
                    <Link to="/addEmployee">Add Employee</Link>
                </Button>
                <br />
                <p>{this.state.errorMsg}</p>
                <br />
                <Table dataSource={this.state.employees}>
                    <Column
                        title="First Name"
                        dataIndex="first_name"
                        key="first_name"
                    />
                    <Column
                        title="Last Name"
                        dataIndex="last_name"
                        key="last_name"
                    />
                    <Column title="Email" dataIndex="email" key="email" />
                    <Column title="DOB" dataIndex="dob" key="dob" />
                    <Column title="city" dataIndex="city" key="city" />
                    <Column title="company" dataIndex="company" key="company" />
                    <Column title="mobile" dataIndex="mobile" key="mobile" />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                <Link key="id" to={`/employee/${record.id}`}>
                                    Edit
                                </Link>
                                <button
                                    onClick={() =>
                                        this.deleteEmployee(record.id)
                                    }
                                >
                                    Delete
                                </button>
                            </Space>
                        )}
                    />
                </Table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.token !== null,
        token: state.token,
    };
};

export default connect(mapStateToProps)(EmployeeList);

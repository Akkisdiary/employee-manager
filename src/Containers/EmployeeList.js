import { Table, Space, Button } from "antd";
import { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

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
            Authorization: "Token " + this.props.token,
        };
        axios
            .delete(`http://127.0.0.1:8000/api/${employeeId}/`)
            .then((res) => {
                let temp = [];
                this.state.employees.map((employee) => {
                    if (employee.id !== employeeId) {
                        temp.push(employee);
                    }
                });
                this.setState({ employees: temp });
            })
            .catch((err) => {
                this.setState({ errorMsg: err.message });
            });
    };

    render() {
        return (
            <div>
                <p>{this.state.errorMsg}</p>
                <Button onClick={() => this.props.history.push("/addEmployee")}>
                    Add Employee
                </Button>
                <p>{this.state.errorMsg}</p>
                <Table dataSource={this.state.employees}>
                    <Column title="ID" dataIndex="id" key="id" />
                    <Column
                        title="First Name"
                        dataIndex="first_name"
                        key="id"
                    />
                    <Column title="Last Name" dataIndex="last_name" key="id" />
                    <Column title="Email" dataIndex="email" key="id" />
                    <Column title="DOB" dataIndex="dob" key="id" />
                    <Column title="city" dataIndex="city" key="id" />
                    <Column title="company" dataIndex="company" key="id" />
                    <Column title="mobile" dataIndex="mobile" key="id" />
                    <Column
                        title="Action"
                        key="id"
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

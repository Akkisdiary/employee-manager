import { PageHeader, Button } from "antd";

const MainHeader = (props) => {
    return (
        <PageHeader
            className="site-page-header"
            title={props.isAuthenticated ? props.title : "Employee Manager"}
            extra={
                props.isAuthenticated
                    ? [
                          <Button key="2" onClick={props.logout}>
                              Logout
                          </Button>,
                          <Button
                              key="1"
                              type="primary"
                              onClick={props.addEmployee}
                          >
                              Add Employee
                          </Button>,
                      ]
                    : null
            }
        ></PageHeader>
    );
};

export default MainHeader;

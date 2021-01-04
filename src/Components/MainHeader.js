import { PageHeader,Button,  } from "antd";

const MainHeader = (props) => {
    return (
        <PageHeader
            className="site-page-header"
            title={props.title}
            extra={[
                <Button key="2" onClick={props.logout}>
                    Logout
                </Button>,
                <Button key="1" type="primary" onClick={(props.addEmployee)}>
                    Add Employee
                </Button>,
            ]}
        ></PageHeader>
    );
};
export default MainHeader;

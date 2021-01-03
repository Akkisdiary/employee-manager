import React from "react";
import { List, Avatar } from "antd";

const Employee = (props) => {
    return (
        <List
            itemLayout="horizontal"
            dataSource={props.data}
            renderItem={(item) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title={
                            <a href={item.id}>
                                {item.first_name} {item.last_name}
                            </a>
                        }
                        description={item.mobile}
                    />
                </List.Item>
            )}
        />
    );
};

export default Employee;


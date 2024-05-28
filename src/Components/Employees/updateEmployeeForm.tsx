import React from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Space } from 'antd';
import { EmployeeModel } from "../../Models/employeeModel";

interface UpdateEmployeeFormProps {
    employee: EmployeeModel;
    onSubmit: (employee: EmployeeModel) => void;
    onClose: () => void;
}

const UpdateEmployeeForm: React.FC<UpdateEmployeeFormProps> = (props) => {
    const [form] = Form.useForm();

    const onFinish = (values: EmployeeModel) => {
        const Newemployee = {
            ...values,
            Id: props.employee.Id,
   
        }
        props.onSubmit(Newemployee);
        props.onClose();
    }


    return (
        <Form
            initialValues={{ ...props.employee, firstName: props.employee.FirstName, lastName: props.employee.LastName }}
            form={form}
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: 'Please Enter First Name' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: 'Please Enter Last Name' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Edit
                    </Button>
                    <Button onClick={props.onClose}>
                        Cancel
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
}

const mapStateToProps = (state: any) => {
    return {
        response: state.employees.response,
        employees: state.employees.employees,
    }
}

export default connect(mapStateToProps)(UpdateEmployeeForm);

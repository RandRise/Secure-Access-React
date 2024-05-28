import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Space, notification } from 'antd';
import { AddEmployeeModel } from "../../Models/AddEmployeeModel";
import { ICommonResponse } from "../../Common/commonInterfaces";

interface AddEmployeeFormProps {
    onSubmit: (employee: AddEmployeeModel) => void;
    onClose: () => void;
    visible: boolean;
    response: ICommonResponse;
}

const AddEmployeeForm: React.FC<AddEmployeeFormProps> = (props: AddEmployeeFormProps) => {
    const [form] = Form.useForm();

    const onFinish = (values: AddEmployeeModel) => {
        props.onSubmit(values);
        props.onClose();
        form.resetFields();

    }

    return (
        <Form
            initialValues={{ remember: false }}
            form={form}
            autoComplete="false"
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
            <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Please Enter Email' }]}
            >
                <Input type="email" />
            </Form.Item>

            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Add
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
        employees: state.employees.employees,
        response: state.employees.response,
    }
}

export default connect(mapStateToProps)(AddEmployeeForm);

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, notification } from 'antd';
import { registrationModel } from "../Models/registrationModel";
import { REGISTER_USER_REQUEST } from "../Actions/actions";
import { ICommonResponse } from "../Common/commonInterfaces";
interface RegistrationFormProps {
    onSubmit: (user: registrationModel) => void;
    isSuccess: boolean;
    response: ICommonResponse
}

const RegistrationForm: React.FC<RegistrationFormProps> = (props: RegistrationFormProps) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    useEffect(() => {
        if (props.response) {
            (props.response?.Code === 200) ?
                notification.success({ message: props.response?.Message })
                :
                notification.error({ message: props.response?.Message })
        }
    }, [props.response])
    useEffect(() => {
        if (props.isSuccess) {
            navigate("/confirmation")

        }
    }, [props.isSuccess, navigate])



    const onFinish = (values: registrationModel) => {
        props.onSubmit(values);
        localStorage.setItem('userEmail', values.email);
        form.resetFields();

    }

    return (
        <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                name="email"
                label="E-mail"
                rules={[{ required: true, type: "email", message: 'Please enter your email' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please enter your password' }]}
            >
                <Input.Password autoComplete="false" />
            </Form.Item>
            <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={['password']}
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The passwords do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password autoComplete="false" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>

        </Form>
    );
}
const mapStateToProps = (state: any) => {
    return {
        registrations: state.registrations.registrations,
        response: state.registrations.response,
        isSuccess: state.registrations.isSuccess,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmit: (user: registrationModel) => dispatch({ type: REGISTER_USER_REQUEST, payload: user })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
import React from 'react'
import { connect } from 'react-redux'
import { Form, Input } from 'antd';
import { userLoginModel } from '../Models/userLoginModel'
import { ICommonResponse } from '../Common/commonInterfaces';
import { USER_LOGIN_REQUEST } from '../Actions/actions';

interface LoginFormProps {
    onSubmit: (user: userLoginModel) => void;
    response: ICommonResponse
}

const UserLoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        props.onSubmit(values);
        form.resetFields();
    }

    return (
        <div>
            <Form
                form={form}
                layout='vertical'
                onFinish={onFinish}
            >
                <Form.Item
                    name='email'
                    label='E-mail'
                    rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name='password'
                    label='Password'
                    rules={[{ required: true, type: 'string', message: 'Please enter a valid password' }]}>
                    <Input.Password />
                </Form.Item>

            </Form>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        registrations: state.registrations.registrations,
        response: state.registrations.response,
        // isSuccess: state.registrations.isSuccess
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmit: (user: userLoginModel) => dispatch({type:USER_LOGIN_REQUEST, payload: user})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLoginForm)
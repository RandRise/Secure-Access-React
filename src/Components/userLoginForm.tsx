import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Input, notification } from 'antd';
import { userLoginModel } from '../Models/userLoginModel'
import { ICommonResponse } from '../Common/commonInterfaces';
import { USER_LOGIN_REQUEST } from '../Actions/actions';
import axios from 'axios';
interface LoginFormProps {
    onSubmit: (user: userLoginModel) => void;
    response: ICommonResponse
    isUserLoginSuccess: boolean;
}

const UserLoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();


    useEffect(() => {
        if (props.response) {
            (props.response.Code === 200) ? notification.success({ message: props.response.Message })
                :
                notification.error({ message: props.response.Message })
        }
    }, [props.response])

    useEffect(() => {
        if (props.isUserLoginSuccess) {
            navigate("/employee");
        }
    }, [props.isUserLoginSuccess, navigate]);


    const onFinish = (values: userLoginModel) => {
        props.onSubmit(values);
        form.resetFields();
 
}

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>

            <Card title="Sign in" style={{ width: 400, backgroundColor: '#96bfff', borderRadius: 20 }}>
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
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        logins: state.logins.logins,
        response: state.logins.response,
        isUserLoginSuccess: state.logins.isUserLoginSuccess,

    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmit: (user: userLoginModel) => dispatch({ type: USER_LOGIN_REQUEST, payload: user }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLoginForm)
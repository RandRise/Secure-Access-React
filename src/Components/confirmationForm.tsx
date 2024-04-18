import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { confirmationModel } from "../Models/confirmationModel";
import { CONFIRM_EMAIL_REQUEST } from "../Actions/actions";
import ResendverificationButton from "./resendConfirmation"
import { ICommonResponse } from "../Common/commonInterfaces";
interface ConfirmationFormProps {
    onSubmit: (user: confirmationModel) => void
    response: ICommonResponse;
}

const ConfirmationForm: React.FC<ConfirmationFormProps> = (props: ConfirmationFormProps) => {

    const [form] = Form.useForm();
    const userEmail = localStorage.getItem('userEmail') || '';

    const onFinish = (values: confirmationModel) => {
        props.onSubmit(values);
        form.resetFields();
        
    }
    return (
        <Form
            form={form}
            initialValues={{email: userEmail}}
            onFinish={onFinish}
            layout="vertical">

            <Form.Item
                name="email"
                label="E-mail"
                rules={[{
                    required: true,
                    type: "email",
                    message: 'Please enter a valid email address'
                }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="verificationCode"
                label="Verification Code"
                rules={[{
                    required: true,
                    type: "string",
                    message: 'Enter verification code'
                }]}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="default" htmlType="submit">
                    Confirm
                </Button>
                <ResendverificationButton  response={props.response}/>
            </Form.Item>


        </Form >
    )
}

const mapStateToProps = (state: any) => {
    return {
        registrations: state.registrations.registrations,
        response: state.registrations.response
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmit: (user: confirmationModel) => dispatch({ type: CONFIRM_EMAIL_REQUEST, payload: user })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationForm);
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Input, notification } from "antd";
import { confirmationModel } from "../Models/confirmationModel";
import { CONFIRM_EMAIL_REQUEST } from "../Actions/actions";
import ResendverificationButton from "./resendConfirmation";
import { ICommonResponse } from "../Common/commonInterfaces";

interface ConfirmationFormProps {
    onSubmit: (user: confirmationModel) => void;
    response: ICommonResponse;
    isConfirmedEmail: boolean;
}

const ConfirmationForm: React.FC<ConfirmationFormProps> = (props: ConfirmationFormProps) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail') || '';

    useEffect(() => {
        if (props.response) {
            (props.response.Code === 200) ? notification.success({ message: props.response.Message })
                :
                notification.error({ message: props.response.Message })
        }
    }, [props.response])
    useEffect(() => {
        if (props.isConfirmedEmail) {
            navigate("/login");
        }
    }, [props.isConfirmedEmail, navigate]);

    const onFinish = (values: confirmationModel) => {
        props.onSubmit(values);
        form.resetFields();
        console.log("Confirmation", props.isConfirmedEmail)

    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
            <Card title="Verification" style={{ width: 400, backgroundColor: '#96bfff', borderRadius: 20 }}>

                <Form
                    form={form}
                    initialValues={{ email: userEmail }}
                    onFinish={onFinish}
                    layout="vertical"
                >
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
                        name="verficationCode"
                        label="Verification Code"
                        rules={[{
                            required: true,
                            type: "string",
                            message: 'Enter verification code'
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Confirm
                        </Button>
                        <ResendverificationButton response={props.response} />
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        confirmations: state.confirmations.confirmations,
        response: state.confirmations.response,
        isConfirmedEmail: state.confirmations.isConfirmedEmail

    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmit: (user: confirmationModel) => dispatch({ type: CONFIRM_EMAIL_REQUEST, payload: user })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationForm);

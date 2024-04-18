import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button, notification } from 'antd';
import { RESEND_VERIFICATION_CODE_REQUEST } from "../Actions/actions";
import { ICommonResponse } from "../Common/commonInterfaces";

interface ResendVerificationButtonProps {
    onSubmit: (email: string | null) => void;
    response: ICommonResponse;
}

const ResendVerificationButton: React.FC<ResendVerificationButtonProps> = (props: ResendVerificationButtonProps) => {
    useEffect(() => {
        if (props.response) {
            (props.response?.Code === 200) ?
                notification.success({ message: props.response?.Message })
                :
                notification.error({ message: props.response?.Message })
        }
    }, [props.response])
    const handleResendVerification = () => {
        const userEmail = localStorage.getItem('userEmail')
        console.log('user Email', userEmail)
        props.onSubmit(userEmail);
    }

    return (
        <Button type="link" onClick={handleResendVerification}>
            Resend Verification Code
        </Button>
    )
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmit: (email: string | null) => dispatch({ type: RESEND_VERIFICATION_CODE_REQUEST, payload: email })
    }
}
export default connect(null, mapDispatchToProps)(ResendVerificationButton);

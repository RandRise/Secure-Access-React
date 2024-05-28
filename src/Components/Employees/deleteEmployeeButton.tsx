import React from "react";
import { connect } from "react-redux";
import { Button, Popconfirm } from "antd";
import { DELETE_EMPLOYEE_REQUEST } from "../../Actions/actions";

interface DeleteEmployeeButtonProps {
    EmployeeId: number
    onSubmit: (EmployeeId: number) => void;
}

const DeleteEmployeeButton: React.FC<DeleteEmployeeButtonProps> = (props) => {
    const handleDelete = () => {
        try {
            props.onSubmit(props.EmployeeId);
        } catch (error) {
            console.error('Error in DeleteEmployeeButton:', error);
        }
    };
    return (
        <Popconfirm
            title="Are You Sure?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="Cancel">
            <Button
                type="primary" danger>
                Delete
            </Button>
        </Popconfirm>
    );
};

const mapStateToProps = (state: any) => ({
    response: state.employees.response,
    employees: state.employees.employees,
})
const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmit: (EmployeeId: number) => dispatch({ type: DELETE_EMPLOYEE_REQUEST, payload: EmployeeId })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteEmployeeButton);
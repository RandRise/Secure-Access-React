import React, { useState } from "react";
import { connect } from 'react-redux';
import { Button, Modal } from 'antd';
import { EmployeeModel } from "../../Models/employeeModel";
import { UPDATE_EMPLOYEE_REQUEST } from "../../Actions/actions";
import UpdateEmployeeForm from "./updateEmployeeForm";

interface UpdateEmployeeButtonProps {
    employee: EmployeeModel[];
    onSubmit: (employee: EmployeeModel) => void;

}

const UpdateEmployeeButton: React.FC<UpdateEmployeeButtonProps> = (props) => {
    const [visible, setVisible] = useState(false);


    const handleOpenModal = () => {
        setVisible(true);

    };

    const handleCloseModal = () => {
        setVisible(false);
    };

    const handleUpdateEmployee = (values: EmployeeModel) => {

        props.onSubmit(values);
        handleCloseModal();
    };
    return (
        <>
            <Button type="primary" onClick={handleOpenModal}>
                Edit
            </Button>
            <Modal
                title="Update Employee Info"
                open={visible}
                onCancel={handleCloseModal}
                footer={null}
            >
                <UpdateEmployeeForm
                    employee={props.employee}
                    onSubmit={handleUpdateEmployee}
                    onClose={handleCloseModal} />
            </Modal>
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        employees: state.employees.employees,
        response: state.employees.response,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmit: (employee: EmployeeModel) => dispatch({ type: UPDATE_EMPLOYEE_REQUEST, payload: employee })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEmployeeButton);
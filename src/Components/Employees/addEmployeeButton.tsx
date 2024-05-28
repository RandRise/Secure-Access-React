import React, { useState } from 'react'
import { connect } from 'react-redux'
import { AddEmployeeModel } from '../../Models/AddEmployeeModel'
import { Button, Modal } from 'antd';
import AddEmployeeForm from './addEmployeeForm';
import { ADD_EMPLOYEE_REQUEST } from '../../Actions/actions';
import { ICommonResponse } from '../../Common/commonInterfaces';

interface addEmployeeButtonProps {

    // employee: AddEmployeeModel;
    onSubmit: (employee: AddEmployeeModel) => void;
    response: ICommonResponse;

}


const addEmployeeButton = (props: addEmployeeButtonProps) => {
    const [visible, setVisible] = useState(false);

    const handleOpenModal = () => {
        setVisible(true);
    }
    const handleCloseModal = () => {
        setVisible(false);
    }
    const handleAddEmployee = (values: AddEmployeeModel) => {
        props.onSubmit(values);

    }
    return (

        <div>
            <Button type="primary" onClick={handleOpenModal}>
                Add New Employee +
            </Button>
            <Modal
                title="Create New Student"
                open={visible}
                onCancel={handleCloseModal}
                footer={null}
            >
                <AddEmployeeForm
                    onSubmit={handleAddEmployee}
                    visible={visible}
                    onClose={handleCloseModal} />
            </Modal>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        employees: state.employees.employees,
        response: state.employees.response
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmit: (employee: AddEmployeeModel) => dispatch({ type: ADD_EMPLOYEE_REQUEST, payload: employee })

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(addEmployeeButton)
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { GET_EMPLOYEES_REQUEST } from "../../Actions/actions";
import { Space, Table, notification } from "antd";
import { EmployeeModel } from "../../Models/employeeModel";
import { ICommonResponse } from "../../Common/commonInterfaces";
import AddEmployeeButton from "./addEmployeeButton";
import DeleteEmployeeButton from "./deleteEmployeeButton";
import UpdateEmployeeButton from "./updateEmployeeButton";

interface EmployeeListProps {
  employee: EmployeeModel[];
  getEmployees: () => any[];
  onSubmit:(employee: EmployeeModel) => any;
  response: ICommonResponse;
}

const EmployeeList: React.FC<EmployeeListProps> = (props: EmployeeListProps) => {
  useEffect(() => {
    props.getEmployees();
  }, [props.getEmployees]);

  useEffect(() => {
    if (props.response) {
      (props.response?.Code === 200) ?
        notification.success({ message: props.response?.Message })
        :
        notification.error({ message: props.response?.Message })
    }
  }, [props.response])

  const columns = [
    {
      title: "First Name",
      dataIndex: "FirstName",
      key: "FirstName",
    },

    {
      title: "Last Name",
      dataIndex: "LastName",
      key: "LastName",
    },

    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
    },

    // {
    //   title: "Employee Team",
    //   dataIndex: "EmployeeTeam",
    //   key: "EmployeeTeam",

    // },

    {
      title: "Employee Missions",
      dataIndex: "EmployeeMissions",
      key: "EmployeeMissions",
      render: (missions: { Id: number; Name: string }[]) => (
        <span>
          {missions.map((mission) => (
            <span key={mission.Id}>,{mission.Name} </span>
          ))}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "Actions",
      render: (text: any, record: EmployeeModel) => (
        <>
          <Space>
            <UpdateEmployeeButton employee={record} />
            <DeleteEmployeeButton EmployeeId={record.Id} />
          </Space>
        </>
      )
    }

  ];
  return (
    <div>
      <AddEmployeeButton />

      <Table
        dataSource={props.employee}
        columns={columns}
        rowKey={(r) => r.Id}
      />

    </div>
  )
}
const mapStateToProps = (state: any) => {
  return {

    employee: state.employees.employees,
    response: state.employees.response,
  }
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getEmployees: () => dispatch({ type: GET_EMPLOYEES_REQUEST })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
import { useEffect } from "react";
import { connect } from "react-redux";
import { GET_EMPLOYEES_REQUEST, GET_EMPLOYEES_SUCCESS } from "../Actions/actions";
import { Table, notification } from "antd";
import { EmployeeModel } from "../Models/employeeModel";
import { ICommonResponse } from "../Common/commonInterfaces";

interface EmployeeListProps {
  employees: EmployeeModel[];
  getEmployees: () => any;
  response: ICommonResponse
}

const EmployeeList: React.FC<EmployeeListProps> = (props: EmployeeListProps) => {
  useEffect(() => {
    if (props.response) {
      (props.response?.Code === 200) ?
        notification.success({ message: props.response?.Message })
        :
        notification.error({ message: props.response.Message })
    }
  }, [props.response])
  const columns = [
    {
      title: "First Name",
      dataIndex: "FirstName",
      key: "FirstName",
      render: (text: any, record: EmployeeModel) => (record.FirstName)
    },
    {
      title: "Last Name",
      dataIndex: "LastName",
      key: "LastName",
      render: (text: any, record: EmployeeModel) => (record.LastName)
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      render: (text: any, record: EmployeeModel) => (record.Email)
    },
    {
      title: "Employee Team",
      dataIndex: "EmployeeTeam",
      key: "EmployeeTeam",
      render: (text: any, record: EmployeeModel) => (record.EmployeeTeam)
    },
    {
      title: "Employee Missions",
      dataIndex: "EmployeeMissions",
      key: "EmployeeMissions",
      render: (text: any, record: EmployeeModel) => (record.EmployeeMissions)
    },
  ];
  return (
    <div>
      <Table dataSource={props.employees} columns={columns} rowKey={"Id"} />
    </div>
  )
}
const mapStateToProps = (state: any) => {
  return {
    employees: state.employees.employees,
    response: state.employees.response,
  }
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getEmployees: () => dispatch({ type: GET_EMPLOYEES_REQUEST })
  }
}

export default connect (mapStateToProps,mapDispatchToProps)(EmployeeList);
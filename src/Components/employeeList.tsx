import { useEffect } from "react";
import { connect } from "react-redux";
import { GET_EMPLOYEES_REQUEST } from "../Actions/actions";
import { Table, notification } from "antd";
import { EmployeeMission, EmployeeModel } from "../Models/employeeModel";
import { ICommonResponse } from "../Common/commonInterfaces";

interface EmployeeListProps {
  employees: EmployeeModel[];
  getEmployees: () => any;
  response: ICommonResponse;
}

const EmployeeList: React.FC<EmployeeListProps> = (props: EmployeeListProps) => {

  useEffect(() => {

    props.getEmployees();
  }, [])

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
            <span key={mission.Id}>{mission.Name}, </span>
          ))}
        </span>
      ),
    },

  ];
  return (
    <div>

      <Table dataSource={props.employees} columns={columns}  rowKey="Id"/>

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

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
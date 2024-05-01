export interface EmployeeModel {
    Id: number
    FirstName: string
    LastName: string
    Email: string
    EmployeeTeam: any[]
    EmployeeMissions: EmployeeMission[]
  }
  
  export interface EmployeeMission {
    Id: number
    Name: string
  }
  
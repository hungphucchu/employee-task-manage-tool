import { Employee } from "../dto/common.dto";
import { employeeRepo } from "../repository/employeeRepo";
import { utils } from "../utills";
import BaseService from "./baseService";
import { emailService } from "./emailService";
import { userService } from "./userService";

class EmployeeService extends BaseService<Employee> {
  constructor() {
    super(employeeRepo);
  }
  private static smtpUser = process.env.SMTP_USER;
  private static setupAccountLink = process.env.EMPLOYEE_SET_UP_ACCOUNT_LINK;

  setupEmployeeAccount = async (employee: Employee): Promise<any> => {
    try {
      // check if employee email already created
      const userExistRes = await userService.validateUserAlreadyExists({
        email: employee.email,
      });

      if (!userExistRes.success) return userExistRes;

      // add the employee to the database
      const newEmployee = await employeeService.createItem(employee);
      const accessString = utils.generateRandomString(8);

      if (newEmployee?.id) {
        const employeeUserAccountRes = await userService.createItem({
          email: employee.email,
          employeeId: newEmployee?.id,
          accessString,
          ownerId: employee.ownerId,
        });
        if (employeeUserAccountRes.success && employeeUserAccountRes?.id) {
          await userService.updateItem(employeeUserAccountRes?.id, {
            employeeId: newEmployee.id,
          });
          await employeeService.updateItem(newEmployee?.id, {
            ...newEmployee,
            userId: employeeUserAccountRes.id,
          });
        } else {
          await employeeService.deleteItem(newEmployee?.id);
          return employeeUserAccountRes;
        }
      }

      if (!EmployeeService.smtpUser) {
        throw new Error("SMTP_USER is not defined in environment variables");
      }

      // sent message to the employee email
      await emailService.sendEmail({
        from: EmployeeService.smtpUser,
        to: employee.email,
        subject: `Set up account instruction for ${employee.name} at the department ${employee.department}`,
        text: `Please click on this link ${`${EmployeeService.setupAccountLink}?code=${accessString}`} to set up your account`,
      });

      return {
        success: true,
        message: "Complete setting new employee account",
      };
    } catch (error) {
      console.error(`Can not set up employee account due to: ${error}`);
    }
  };

  public getAllEmployeesByCriteria = async (
    employee: Employee,
    matchAll: boolean,
  ) => {
    let getUserByCriteriaRes = null;
    try {
      const employees = await employeeRepo.getItemsByCriteria(
        employee,
        matchAll,
      );
      if (employees && employees.length > 0)
        getUserByCriteriaRes = {
          success: true,
          employees: employees,
          message: "Complete getting the employees by criteria!",
        };
      return getUserByCriteriaRes;
    } catch (error) {
      console.error(`Error getting the employees: ${error}`);
      return { success: false, message: error };
    }
  };
}

export const employeeService = new EmployeeService();

import axios, { AxiosRequestConfig } from "axios";
import { BaseWithKey, Employee, User } from "../dto/common.dto";

class ApiHelper {
  private static backend_url = process.env.REACT_APP_BACKEND_URL;
  private static users_endpoint = process.env.REACT_APP_USERS_ENDPOINT;
  private static employees_endpoint = process.env.REACT_APP_EMPLOYEES_ENDPOINT;

  static async callApi(url: string, method: string = "GET", data: any = null) {
    const currentToken = localStorage.getItem('authToken') || "";
    try {
      const config: AxiosRequestConfig = {
        method: method,
        url: url,
        headers: {
          Authorization: `Bearer ${currentToken}`,
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios(config);
      return response?.data ? response.data : response;
    } catch (error) {
      console.error("Error calling API: ", error);
      return {successs: false, message: error}
    }
  }

  static async createNewUserAccount(user: User) {
    try {
      const url = `${ApiHelper.backend_url}/${ApiHelper.users_endpoint}`;
      return await ApiHelper.callApi(url, "POST", user);
    } catch (error) {
      console.error("Error creating user account:", error);
      throw new Error("Error creating user account");
    }
  }

  static async setupNewEmployeeAccount(employee: Employee) {
    try {
      const url = `${ApiHelper.backend_url}/${ApiHelper.employees_endpoint}/setup`;
      return await ApiHelper.callApi(url, "POST", employee);
    } catch (error) {
      console.error("Error creating user account:", error);
      throw new Error("Error setting up employee account");
    }
  }

  static async createNewAccessCode(accessCodeReq: User) {
    try {
      const url = `${ApiHelper.backend_url}/${ApiHelper.users_endpoint}/accessCode`;
      return await ApiHelper.callApi(url, "POST", accessCodeReq);
    } catch (error) {
      console.error("Error creating new access code:", error);
      throw new Error("Error creating new access code");
    }
  }

  static async validateAccessCode(userReq: User) {
    try {
      const url = `${ApiHelper.backend_url}/${ApiHelper.users_endpoint}/validate/accessCode`;
      return await ApiHelper.callApi(url, "POST", userReq);
    } catch (error) {
      console.error("Error validating access code:", error);
      throw new Error("Error validating access code");
    }
  }

  static async validateToken() {
    try {
      const url = `${ApiHelper.backend_url}/${ApiHelper.users_endpoint}/validate/token`;
      const tokenRes = await ApiHelper.callApi(url, "GET");
      return tokenRes;
    } catch (error) {
      console.error("Error validating token:", error);
      throw new Error("Error validating token");
    }
  }

  static async validateUsernameAndPassword(userReq: User) {
    try {
      const url = `${ApiHelper.backend_url}/${ApiHelper.users_endpoint}/validate/username`;
      return await ApiHelper.callApi(url, "POST", userReq);
    } catch (error) {
      console.error("Error validating access code:", error);
      throw new Error("Error validating username and password");
    }
  }

  static async createEmployee(employeeReq: Employee) {
    try {
      const url = `${ApiHelper.backend_url}/${ApiHelper.employees_endpoint}`;
      return await ApiHelper.callApi(url, "POST", employeeReq);
    } catch (error) {
      console.error("Error creating new employee:", error);
      throw new Error("Error creating new employee");
    }
  }

  static async editEmployee(employeeReq: Employee) {
    try {
      const url = `${ApiHelper.backend_url}/${ApiHelper.employees_endpoint}/${employeeReq.id}`;
      return await ApiHelper.callApi(url, "PUT", employeeReq);
    } catch (error) {
      console.error("Error creating new employee:", error);
      throw new Error("Error creating new employee");
    }
  }

  static async editUser(user: User) {
    try {
      const url = `${ApiHelper.backend_url}/${ApiHelper.users_endpoint}`;
      return await ApiHelper.callApi(url, "PUT", user);
    } catch (error) {
      console.error("Error creating new employee:", error);
      throw new Error("Error creating new employee");
    }
  }

  static async editUserWithCriteria(user: User) {
    try {
      const url = `${ApiHelper.backend_url}/${ApiHelper.users_endpoint}/criteria`;
      return await ApiHelper.callApi(url, "PUT", user);
    } catch (error) {
      console.error("Error edit user:", error);
      throw new Error("Error creating new employee");
    }
  }

  static async getUserById(user: User) {
    try {
      const url = `${ApiHelper.backend_url}/${ApiHelper.users_endpoint}/id`;
      return await ApiHelper.callApi(url, "POST", user);
    } catch (error) {
      console.error("Error get user:", error);
      throw new Error("Error get new employee");
    }
  }

  static async deleteEmployee(employeeKey: BaseWithKey) {
    try {
      const url = `${ApiHelper.backend_url}/${ApiHelper.employees_endpoint}`;
      return await ApiHelper.callApi(url, "DELETE", employeeKey);
    } catch (error) {
      console.error(`Error deleting employee with id of ${employeeKey.id}:`, error);
      return { success: false, message: error}
    }
  }

  static async getAllEmployee() {
    try {
      const url = `${ApiHelper.backend_url}/${ApiHelper.employees_endpoint}`;
      return await ApiHelper.callApi(url, "GET");
    } catch (error) {
      console.error("Error getting all employees:", error);
      throw new Error("Error getting all employees");
    }
  }
}

export default ApiHelper;

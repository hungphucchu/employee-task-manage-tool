import { Employee, Owner } from "../dto/common.dto";
import { ownerRepo } from "../repository/ownerRepo";
import { utils } from "../utills";
import BaseService from "./baseService";
import { emailService } from "./emailService";
import { userService } from "./userService";

class OwnerService extends BaseService<Owner> {
  constructor() {
    super(ownerRepo);
  }

  private static smtpUser = process.env.SMTP_USER;
  private static setupAccountLink = process.env.EMPLOYEE_SET_UP_ACCOUNT_LINK;
}

export const ownerService = new OwnerService();

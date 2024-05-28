// src/services/userService.ts
import { User, } from '../dto/common.dto';
import { userRepo } from '../repository/userRepo';
import { utils } from '../utills';
import { emailService } from './emailService';
import { authenticateMiddleware } from '../middleware/authentication';
import BaseService from './baseService';
import { ownerRepo } from '../repository/ownerRepo';

class UserService extends BaseService<User>{

  constructor() {
    super(userRepo);
  }

  private static smtpUser = process.env.SMTP_USER;

  public deleteUserByCriteria = async (user: User): Promise<{ success: boolean }> => {
    try{
      const userRes = await this.getUserByCriteria(user, true);
      if (userRes?.success && userRes.user){
        const result = await userRepo.deleteItem(userRes.user.id);
        return { success: true };
      }
      return { success: false };
    }catch(error){
      console.error(`Error deleting the user: ${error}`);
      return { success: false };
    }
  }

  public getUserByCriteria = async (user: User, matchAll: boolean) => {
    let getUserByCriteriaRes = null;
    try{
      const users = await userRepo.getItemsByCriteria(user, matchAll);
      if (users && users.length > 0) getUserByCriteriaRes = { success: true, user: users[0], message: "Complete getting the user!"}
      return getUserByCriteriaRes;
    }catch(error){
      console.error(`Error getting the user: ${error}`);
      return { success: false, message: error}
    }
  }

  public validateUserAlreadyExists = async (user: User): Promise<any> => {
        let validateUserAlreadyExistsRes = {success: true, message: "User not exists"};
        try{
          const userExists = await userRepo.getItemsByCriteria(user)
          if (userExists.length > 0) validateUserAlreadyExistsRes =  {success: false, message: "Other user already sign up with this email"};
          return validateUserAlreadyExistsRes;
        }catch(error){
          console.error(`Error validating user exists: ${error}`)
          return {success: false, message: {error}};
        }
  }

  public createNewUser = async (user: User): Promise<any> => {
    try {
      // check if email already created
      if (user?.email){
        const userHasThisEmailRes = await userService.validateUserAlreadyExists({email: user?.email});
        if (!userHasThisEmailRes.success) return userHasThisEmailRes;
      }
      if (user?.password) {
        user = { ...user, password: await utils.hashPassword(user.password) };
      }
      await userRepo.createItem(user);
      return {success: true, message: "Complete creating user account"};
    } catch (error) {
      console.error(`Error creating user with ${error}`);
    }
  };
  

  public createNewAccessCode = async (accessCodeReq: User): Promise<string> => {
    try {
      const { email } = accessCodeReq;

      // check if email already created
      if (email){
        const userHasThisEmailRes = await userService.validateUserAlreadyExists({email});
        if (!userHasThisEmailRes.success) return userHasThisEmailRes;
      }

      if (!email) {
        throw new Error('Email is required');
      }
      
      if (!UserService.smtpUser) {
        throw new Error('SMTP_USER is not defined in environment variables');
      }

      const accessCode = utils.generateRandomCode();
      const newUser: User = {
        email: email,
        accessCode: accessCode,
      };
      await userRepo.createItem(newUser);
      await emailService.sendEmail({
        from: UserService.smtpUser,
        to: email,
        subject: 'Your Access Code',
        text: `Your access code is ${accessCode}`,
      });
      return accessCode;
    } catch (error) {
      console.error(`Error creating new access code: ${error}`);
      return "";
    }
  };

  public validateUser = async (user: User): Promise<any> => {
    let valid = false;
    let userName = user.username; 
    let userRes: User = {};
    try {
      if (user.username && user.password){
        const users = await userRepo.getItemsByCriteria({username: user.username}, true);
        if (users.length === 0) return false;
        if (user.password && users[0]?.password) valid = await utils.comparePassword(user?.password, users[0]?.password)
        userRes = {...user, employeeId: users[0].employeeId, id: users[0].id};
      /**
       * if it is role owner then create user account with ownerId then create record in owner
       *  */ 
      }else if (user.accessCode && user.email){
        const owner = await ownerRepo.createItem({ email: user.email});
        // auto create username and password for user
        userName = user.email.split("@")[0];
        const password = utils.generateRandomPassword();
        const hashedPassword = await utils.hashPassword(password);
        const ownerAccount = await userRepo.getItemsByCriteria({accessCode: user.accessCode, email: user.email}, true);
        if (ownerAccount && ownerAccount.length > 0){
          const newUserRes = await userRepo.updateItemWithCriteria(user,{ username: userName, password: hashedPassword, ownerId: owner.id, accessCode:""})
          if (newUserRes && UserService.smtpUser){
            await emailService.sendEmail({
              from: UserService.smtpUser,
              to: user.email,
              subject: 'Your Automated Username and password',
              text: `Your username is ${userName} and password is ${password}`,
            });
          }
          userRes = {...user, ownerId: ownerAccount[0].id, id: ownerAccount[0].id};
        }
        valid = true;
        console.log(`Complete creating username and password for user with email ${user.email}`);
      }
      const token = authenticateMiddleware.generateAccessToken({username: userName })

      return { token: token.toString(), success: valid, message: "Validating user complete", user: userRes};
    } catch (error) {
      console.error(`Error validating user: ${error}`);
      return {  success: false, message: "Error validating user"};
    }
  };

}

export const userService = new UserService();

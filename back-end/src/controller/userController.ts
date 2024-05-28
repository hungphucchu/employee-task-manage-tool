// src/controllers/userController.ts
import { Request, Response } from 'express';
import { userService } from '../services/userService';
import { User } from '../dto/common.dto';
import { CustomRequest } from '../types/CustomRequest';
import { utils } from '../utills';

class UserController {

    createNewAccessCode = async (req: Request, res: Response): Promise<void> => {
        const { email } = req.body;
        if (email) {
            const accessCode = userService.createNewAccessCode({email});
            res.status(201).json(accessCode);
        } else {
            res.status(400).send('email is required');
        }
    };

    createNewUserAccount = async (req: Request, res: Response): Promise<void> => {
        const user: User = req.body;
        if (user) {
            const newUserAccountRes = await userService.createNewUser(user);
            if (newUserAccountRes.success) res.status(201).json(newUserAccountRes);
            else res.status(400).json(newUserAccountRes);
        } else {
            res.status(400).send({success: false, message:'Please provide username or password'});
        }
    };

    validateAccessCode = async (req: Request, res: Response): Promise<void> => {
        const { email, accessCode } = req.body;
        if (email && accessCode) {
            const validateAccessCodeRes = await userService.validateUser({ email, accessCode });
            if (validateAccessCodeRes.success) res.status(201).json(validateAccessCodeRes);
            else res.status(400).json(validateAccessCodeRes);
        } else {
            res.status(400).send('phoneNumber and accessCode is required');
        }
    };

    validateUsernameAndPassword = async (req: Request, res: Response): Promise<void> => {
        const { username, password } = req.body;
        if (username && password) {
            const validateSuccessRes = await userService.validateUser({ username, password });
            if (validateSuccessRes.success) res.status(201).json(validateSuccessRes);
            else res.status(400).json(validateSuccessRes);
        } else {
            res.status(400).send({ success: false, message: "username and password is required"});
        }
    };

    validateToken =  async (req: CustomRequest, res: Response): Promise<void> => { 
        if (req.user) {
            const {username} = req.user;
            const validateTokenRes = await userService.getUserByCriteria({username}, true);
            if (validateTokenRes?.success) res.status(200).json(validateTokenRes);
            else  res.status(500).json(validateTokenRes);
        } else {
            res.status(401).json({ success: false, message: "Unauthorized" });
        }
    };

    async editUser(req: Request, res: Response): Promise<void> {
        const user: User = req.body;
        try {
            if (user?.id){
                const result = await userService.updateItem(user.id, user);
                if (result) {
                    res.status(200).json({ success: result, message: 'User edited successfully' });
                } else {
                    res.status(500).json({ success: false, message: 'Can not edit user' });
                }
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
            res.status(500).json({ success: false, message: error });
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        const user: User = req.body;
        try{
            if (user.id){
                const getUserRes = await userService.getItem(user.id)
                if (getUserRes) res.status(200).json({success: true, user: getUserRes, message: "Complete getting user"});
                else res.status(500).json({ success: false, message: "Can not get user" });
            }
        }catch(error){
            console.error('Error deleting employee:', error);
            res.status(500).json({ success: false, message: error });
        }
       
    }

    async editUserWithCriteria(req: Request, res: Response): Promise<void> {
        const user: User = req.body;
        const getUserRes = await userService.getUserByCriteria(user,false);
        try {
            if (getUserRes?.user?.id){
                let updateUser = {...getUserRes?.user,...user};
                if (updateUser?.password){
                    updateUser = {...updateUser, password: await utils.hashPassword(updateUser?.password)}
                }
                const result = await userService.updateItem(getUserRes?.user?.id, updateUser);
                if (result) {
                    res.status(200).json({ success: result, message: 'User edited with criteria successfully' });
                } else {
                    res.status(500).json({ success: false, message: 'Can not edit user with criteria' });
                }
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
            res.status(500).json({ success: false, message: error });
        }
    }

}

export const userController = new UserController();

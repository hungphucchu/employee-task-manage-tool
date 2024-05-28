import { User } from "../dto/common.dto";
import BaseRepo from "./baseRepo";

class UserRepo extends BaseRepo<User> {}

export const userRepo = new UserRepo("users");

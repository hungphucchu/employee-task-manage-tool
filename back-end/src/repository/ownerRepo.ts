import {  Owner } from "../dto/common.dto";
import BaseRepo from "./baseRepo";

class OwnerRepo extends BaseRepo<Owner>{  
}

export const ownerRepo = new OwnerRepo("owners");


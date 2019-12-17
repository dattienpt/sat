import common from "./common/commonModel";
import loginModel from "../models/authentication/loginModel";
import users from "./user-management/usersModel";
import handlePasswordModel from './authentication/handlePasswordModel';
import client from './clients/clients';
import loanProductModel from './products/loanProductModel';
import saving from './products/savingProductModel';
import share from './products/shareProductModel';



export default [common, loginModel, users, handlePasswordModel, client, loanProductModel,saving,share];

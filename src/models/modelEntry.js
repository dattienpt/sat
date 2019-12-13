import common from "./common/commonModel";
import loginModel from "../models/authentication/loginModel";
import users from "./user-management/usersModel";
import handlePassword from '../models/authentication/handlePassword';
import client from './clients/clients';

export default [common, loginModel, users, handlePassword, client];

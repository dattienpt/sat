import example from "./exampleModel";
import common from "./common/commonModel";
import loginModel from "../models/authentication/loginModel";
import Users from "./user-management/usersModel";
import handlePassword from '../models/authentication/handlePassword';

export default [common, example, loginModel, Users, handlePassword];

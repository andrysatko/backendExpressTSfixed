import {authValidator} from "../validator/auth.validator";
import userAttributes from "../databasemodel/attributes/userAttributes"
export type AuthDTO = Record<keyof typeof userAttributes, string>
export type LoginDto =Pick<Record<keyof typeof userAttributes, string>,'password'|'email'>

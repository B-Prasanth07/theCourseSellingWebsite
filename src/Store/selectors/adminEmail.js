import { selector } from "recoil";
import { adminUserState } from "../atoms/adminUser";

export const adminEmailState=selector({
    key : 'adminEmailState',
    get : ({get}) => {
        const state=get(adminUserState);
        return state.adminEmail
    }
})
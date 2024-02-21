import { selector } from "recoil";
import { adminUserState } from "../atoms/adminUser";

export const isAdminLoading=selector({
    key :'AdminLoadingState',
    get : ({get}) => {
        const state=get(adminUserState);

        return state.isLoading;
    }
})
import { selector } from "recoil";
import { userState } from "../atoms/user.js";

export const isuserLoading=selector({
    key :'isuserLoadingState',
    get : ({get}) => {
        const state=get(userState);

        return state.isLoading;
    }
})
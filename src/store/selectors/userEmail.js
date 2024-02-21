import { selector } from "recoil";
import { userState } from "../atoms/user";

export const userEmailState=selector({
    key : 'userEmailState',
    get : ({get}) => {
        const state=get(userState);
        return state.userEmail
    }
})

// import {atom} from 'recoil'

// export const adminUserState=atom({
//     key:'adminUserState',
//     default : {
//         isLoading : true,
//         adminEmail:null
//     }
// })
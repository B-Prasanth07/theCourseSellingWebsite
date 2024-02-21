import {atom} from 'recoil'

export const adminUserState=atom({
    key:'adminUserState',
    default : {
        isLoading : true,
        adminEmail:null
    }
})
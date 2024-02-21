import {atom} from 'recoil'

export const userState=atom({
    key: 'userState',
    default : {
        isLoading : true,
        userEmail:null
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
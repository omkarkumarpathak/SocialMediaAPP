import React, { createContext, useState } from 'react'
import LoginEmail from '../../components/PasswordReset/LoginEmail';
import ChangePassword from '../../components/PasswordReset/ChangePassword';


export const RecoveryContext=createContext();


function PasswordReset({children}) {
 
    const [OTP,setOTP]=useState();
    const [email,setEmail]=useState();


    return(
        <RecoveryContext.Provider value={{email,setEmail, OTP,setOTP}}>  
            <LoginEmail/>
        </RecoveryContext.Provider>
    )
}

export default PasswordReset

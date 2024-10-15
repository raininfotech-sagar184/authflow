import { forgotPasswordMail, encodeJwtWithPem   } from "@/utils/backend";
// import { validate_string, chk_email, chk_password, chk_confirm_password, chk_OTP, get_timestemp, passEnc, encryption_key, generateNumeric, enc, dec } from "@/utils/common";
import {   recaptcha  } from "@/utils/backend";
import { validate_string, chk_email,   get_timestemp,  encryption_key, generateNumeric, enc  } from "@/utils/common";
import { sql_query } from "@/utils/dbconnect";

import { NextResponse } from "next/server";

const jwt = require("jsonwebtoken"); 
 
export async function POST(req, res) {
    try { 
        let { repchaToken,email } = await req.json() 
        let checkRepcha = await recaptcha(repchaToken);
        if (!checkRepcha) { 
            return NextResponse.json({ message: 'Something went to wrong' }, { status: 400 })
        } 
        try {
            email = email.toLowerCase().trim();
            validate_string(email, "email", 0);
            chk_email(email);
        } catch (e) { 
            return NextResponse.json({ message: e.message }, { status: 400 })
        } 
        const getUser = await sql_query("SELECT email, adminId, isVerify FROM tblAdmin WHERE email = ?", [email]);  
        if (getUser) {
            const accessTokenMail =  enc(JSON.stringify({email:getUser.email}) , encryption_key('token'))
            if (getUser.isVerify == 0) { 
                return NextResponse.json({ isVerify: 0, accessToken: accessTokenMail, message: "success" }, { status: 200 })
             } else {
                let forgetCode = generateNumeric(6);
                let currentTime = get_timestemp();
                // await forgotPasswordMail(getUser.email, forgetCode); 
                await sql_query(
                    `UPDATE tblAdmin SET otpCode = ?, otpExpireTime = ?, updatedOn = ? WHERE adminId = ?`,
                    [enc(forgetCode.toString(), encryption_key('otpKey')), parseInt(currentTime) + 1800, currentTime, getUser.userId],
                    "Update"
                ); 
                return NextResponse.json({  accessToken: accessTokenMail, message: "OTP has been successfully sent to your email" }, { status: 200 }) 
            }
        } else {
            return NextResponse.json({message: "Entered email is not registered" }, { status: 400 }) 
        }
    } catch (e) {
        console.log("Error forgot password", e);
        return NextResponse.json({ message: 'Internal server error'  }, { status: 400 }) 
    }
}
 
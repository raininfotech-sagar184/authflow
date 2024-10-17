 import {   recaptcha, resendOtpMail  } from "@/utils/backend";
import {  get_timestemp,  encryption_key, generateNumeric, enc, dec  } from "@/utils/common";
import { sql_query } from "@/utils/dbconnect";

import { NextResponse } from "next/server";

const jwt = require("jsonwebtoken"); 
 
export async function POST(req, res) {
    try { 
        let { repchaToken,email,mlTkn } = await req.json() 
        let checkRepcha = await recaptcha(repchaToken);
        if (!checkRepcha) { 
            return NextResponse.json({ message: 'Something went to wrong' }, { status: 400 })
        }   
        let token = {}
        if (dec(mlTkn, encryption_key("token"))) {
            token=JSON.parse(dec(mlTkn, encryption_key("token")))
        } 
        if (!token.email) { 
            return NextResponse.json({ email: 'invalid'  }, { status: 400 })   
        } else {
            const user = await sql_query("SELECT email, adminId, otpCode, otpExpireTime FROM tblAdmin WHERE email = ?", [token.email]);
            if (user) {
                let forgetCode = generateNumeric(6);
                let currentTime = get_timestemp();
                console.log('temporary mail functionality id off',{otp:forgetCode  })
                await sql_query(
                    `UPDATE tblAdmin SET otpCode = ?, otpExpireTime = ?, updatedOn = ? WHERE adminId = ?`,
                    [enc(forgetCode.toString(), encryption_key("otpKey")), parseInt(currentTime) + 1800, currentTime, user.adminId],
                    "Update"
                );
                // await resendOtpMail(user.email, forgetCode, "Forgot password");
                return NextResponse.json({ message: 'OTP has been successfully sent to your email'  }, { status: 200 })  
            } else {
                return NextResponse.json({ message: 'invalid'  }, { status: 400 })   
            }
        }
    } catch (e) {
        console.log("Error forgot password", e);
        return NextResponse.json({ message: 'Internal server error'  }, { status: 400 }) 
    }
}
 
 
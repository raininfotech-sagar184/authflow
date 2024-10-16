import { NextResponse } from 'next/server';
import { check_admin_login, validate_2fa } from "../../../../../utils/backend";
import { sql_query } from "../../../../../utils/dbconnect";
import { draftMode } from 'next/headers';
import { chk_OTP,   dec,   encryption_key, validate_string } from '@/utils/common';
export async function POST(req, res) {
    draftMode().enable()
    try {
        let adm = await check_admin_login(req)
        if (!adm.status || !adm.data.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }  
        let body =await req.json();
        const { otp, status } = body 
        console.log({ otp, status })
        try {
            validate_string(otp, "OTP")
            chk_OTP(otp)
        } catch (e) {
            return NextResponse.json({ message: e }, { status: 400 }) 
        } 
        let userData = await sql_query(`select twoOpen as isTwoFa,twoFaCode from tblAdmin where adminId = ? `, [adm.data.id])
        if (userData) {
            if (userData?.isTwoFa == 0 && status == 0) {
                return NextResponse.json({ message: "Google authentication already deactivated, please refresh the page." }, { status: 400 }) 
            } else if (userData?.isTwoFa == 1 && status == 1) {
                return NextResponse.json({ message: "Google authentication already activated, please refresh the page." }, { status: 400 }) 
            } 
            let validOTP = await validate_2fa(dec( userData.twoFaCode   , encryption_key("twofaKey")), otp)
            if (!validOTP) {
                return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 }) 
            }
            let twofaCode = userData.isTwoFa == 0 ? userData.twoFaCode : null
            let twoOpen = userData.isTwoFa == 0 ? 1 : 0

            await sql_query(`update tblAdmin set twoFaCode = ?, twoOpen = ? where adminId =?`, [twofaCode, twoOpen, adm.data.id])
            return NextResponse.json({ message: `Google authentication is ${userData.isTwoFa == 0 ? 'activated' : 'deactivated'}.` }, { status: 200 }) 
        } 
    } catch (e) {
        console.log("Error=>", e);
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
}

  
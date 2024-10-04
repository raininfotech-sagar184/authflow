import { NextResponse, NextRequest } from 'next/server'
import { changeUserPasswordMail, check_admin_login } from '../../../../utils/backend';
import { chk_otp, chk_password, dec, encryption_key, passDec, passEnc, validate_string } from '../../../../utils/common';
import { sql_query } from '../../../../utils/dbconnect';
export async function POST(req, res) {
    try {
        let admin = await check_admin_login(req)
        if (!admin.status || !admin.data.id) {
            return NextResponse.json({ message: 'Logout' }, { status: 400 })
        }
        let { adminPass, userPassword, otp, userId } = await req.json()
        try {
            validate_string(adminPass, "admin password")
            validate_string(userPassword, "user's new password")
            chk_password(userPassword)
            chk_otp(otp)
        } catch (e) {
            return NextResponse.json({ message: e }, { status: 400 })
        }
        let id = userId ? dec(userId.toString(), encryption_key("userId")) : ""
        if (id) {
            let adminData = await sql_query("select password,twoFaCode from tblexAdmin where adminId = ? ", [admin.data.id])
            if (adminData && adminPass === passDec(adminData.password, encryption_key("passwordKey"))) {
                let speakeasy = require("speakeasy")
                let twofa = speakeasy.totp.verify({
                    secret: passDec(adminData.twoFaCode, encryption_key("twofaKey")),
                    encoding: "base32",
                    token: otp,
                })
                if (twofa) {
                    let getUser = await sql_query("select userId,email from tbluser where userId = ? ", [id])
                    if (getUser) {
                        if (await changeUserPasswordMail(getUser.email)) {
                            await sql_query("update tbluser set password = ? where userId = ?", [passEnc(userPassword, encryption_key("userPasswordKey")), id])
                            return NextResponse.json({ message: 'User password has been changed successfully' }, { status: 200 })
                        } else {
                            return NextResponse.json({ message: 'Oops!! Mail service is down. Try again later' }, { status: 400 })
                        }
                    } else {
                        return NextResponse.json({ message: 'Invalid request' }, { status: 400 })
                    }
                } else {
                    return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 })
                }
            } else {
                return NextResponse.json({ message: 'Invalid admin password' }, { status: 400 })
            }
        }
    } catch (error) {
        console.log("change-password===>", error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}

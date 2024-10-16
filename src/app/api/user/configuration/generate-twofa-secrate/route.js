import { NextResponse } from 'next/server';
import { check_admin_login } from "../../../../../utils/backend";
import { sql_query } from "../../../../../utils/dbconnect";
import { draftMode } from 'next/headers';
import {   enc, encryption_key } from '@/utils/common';
export async function GET(req, res) {
    draftMode().enable()
    try {
        let adm = await check_admin_login(req)
        if (!adm.status || !adm.data.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }  
        const params = Object.fromEntries(new URLSearchParams(req.nextUrl.search).entries());
        const {  status } = params;
        let userData = await sql_query(`SELECT twoOpen as isTwoFa, twoFaCode, email FROM tblAdmin WHERE adminId = ?`, [adm.data.id])
        if (userData) {
            if (userData.isTwoFa == 1) { 
                return NextResponse.json({ message: "Google authentication already activated, please refresh the page." }, { status: 400 })
            } else if (userData.isTwoFa == 0 && status == 0) {
                return NextResponse.json({ message: "Google authentication already deactivated, please refresh the page." }, { status: 400 }) 
            }
            let speakeasy = require("speakeasy")
            let qr = require("qrcode")
            let twoFaname = process.env.SITENAME + " (" + userData.email + ")"
            let secret = speakeasy.generateSecret({ name: twoFaname })
            let secretKey = secret.base32
            let qrcode = await qr.toDataURL(secret.otpauth_url)
            await sql_query("update tblAdmin set twoFaCode = ? where adminId =?", [enc(secretKey, encryption_key("twofaKey")), adm.data.id])
            return NextResponse.json({ message: `success`, data: { secretKey: secretKey, qrcode: qrcode } }, { status: 200 })  
        }  
    } catch (e) {
        console.log("Error=>", e);
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
}

 

 
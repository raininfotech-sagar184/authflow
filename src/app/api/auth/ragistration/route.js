

import { validate_string, validateFile, get_timestemp, encryption_key, chk_password, chk_username, chk_email, generateNumeric, enc, passEnc } from "@/utils/common"
import { sql_query } from "@/utils/dbconnect"
import { NextResponse } from "next/server";
import { check_admin_login } from "../../../../utils/backend"
const fs = require('fs');
import { writeFile } from 'fs/promises'



const checkref_code = async (refCode) => {
    let res = [false, {}, '']
    try {
        if (refCode) {
            let userData = await sql_query("SELECT userId, isActive FROM tbluser WHERE referralcode= ? ", [refCode])
            console.log({ userData })
            if ((userData && Object.entries(userData).length)) {
                if (userData['isActive'] == 1) {
                    res[0] = true;
                    res[1] = { userName: userData['username'], userId: userData['userId'] }
                    res[2] = (userData ? 'S' : 'C');

                } else {
                    res[2] = "Your sponsor not activate.";
                }
            } else {
                res[2] = "Invalid referral code.";
            }
        } else {
            res[2] = "Enter referral code.";
        }
        return res;
    } catch (e) {
        console.log('checkref_code', e)
    }
    return res
}

export async function POST(request, response) {
    try {
        let adm = await check_admin_login(request)
        console.log({adm})
        if (!adm.status || !adm.data.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        }
        let requestBody = await request.formData(),
            body = Object.fromEntries(requestBody)
        body = JSON.parse(body.data)
        let image = requestBody.get('image')
        const { id, imageUrl, isImage, username, email, mobile, referralcode, password } = body
        try {
            validate_string(username, "Username")
            chk_username(username)
            validate_string(email, "Email")
            chk_email(email)
            validate_string(mobile, "Mobile")
            if (`${mobile}`.length != 10) {
                throw "Mobile number should be 10 digits."
            }
            validate_string(referralcode, "Referral code")
            validate_string(password, "Password")
            chk_password(password)
            if (!imageUrl) {
                validateFile(image, "Images")
            }

        } catch (e) {
            console.log("Error=>", e);
            return NextResponse.json({ message: e }, { status: 400 })
        }
        let currentTime = get_timestemp()
        let lockerName = await generate_username()
        let newImageName = ""
        let sponserId = ""

        let getUserData = await sql_query(`SELECT username,email from tbluser where username like ? OR email like ?`, [username, email])
        if (getUserData) {
            return NextResponse.json({ message: getUserData.email == email ? "Entered email already exist" : "Entered username already exist" }, { status: 400 })
        } else {
            let rd = [true, {}, ""]
            if (referralcode) {
                rd = await checkref_code(referralcode)
                if (rd[0] == false) {
                    return NextResponse.json({ message: rd[2] }, { status: 400 })
                } else {
                    if (rd[2] == 'S') {
                        sponserId = rd[1].userId
                    } else {
                        sponserId = 0
                    }
                }
            } 
            if (id && isImage == 0) {
                newImageName = imageUrl.split('/').pop()
            } else {
                const upload_path = `public/assets/`
                let bytes = await image.arrayBuffer()
                let buffer = Buffer.from(bytes)
                newImageName = id ? imageUrl : (lockerName).toLowerCase() + '-' + currentTime + '.' + image.type.split('/')[1]
                if (id) {
                    try {
                        fs.unlinkSync(`${upload_path}upload/profile-image/${imageUrl}`)
                    } catch (error) {
                        console.log("Error=>", error);
                    }
                }
                fs.existsSync(`${upload_path}upload/profile-image`) || fs.mkdirSync(`${upload_path}upload/profile-image`, { recursive: true })
                await writeFile(`${upload_path}upload/profile-image/` + newImageName, buffer)
            }
            let forgetCode = generateNumeric(6);
            // await forgotPasswordMail(email, forgetCode); 
            console.log('temporary mail functionality id off', { otp: forgetCode })
            const accessTokenMail = enc(JSON.stringify({ email: email }), encryption_key('token'))
            await sql_query(`INSERT into tbluser (username,email,mobile,image,referralcode,password,otpCode,otpExpireTime,sponserId,createdOn) VALUES (?,?,?,?,?,?,?,?,?,?)`, [username, email, mobile, newImageName, referralcode, passEnc(password, encryption_key("passwordKey")), enc(forgetCode.toString(), encryption_key('otpKey')), parseInt(currentTime) + 1800, sponserId, currentTime], "Insert")
            return NextResponse.json({ message: `Ragistration successfully`, accessToken: accessTokenMail }, { status: 200 })
        }
    } catch (e) {
        console.log("Error=>", e);
    } 
    return NextResponse.json({ message: "Session expired! Please refresh page" }, { status: 400 })
}

async function generate_username() {
    let count = await sql_query('SELECT userId FROM tbluser', [], 'Count')
    return "USR-" + (count + 1).toString();
}
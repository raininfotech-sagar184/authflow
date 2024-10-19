

import { validate_string, validateFile, get_timestemp, validate_input_number, validate_input_number_in_range, dec, encryption_key, chk_password, chk_username, chk_email } from "@/utils/common"
import { sql_query } from "@/utils/dbconnect"
import { NextResponse } from "next/server";
import { check_admin_login } from "../../../../utils/backend"
const fs = require('fs');
import { writeFile } from 'fs/promises'

export async function POST(request, response) {
    try {
        // let adm = await check_admin_login(request)
        // console.log({adm})
        // if (!adm.status || !adm.data.id) {
        //     return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
        // }
        let requestBody = await request.formData(),
        body = Object.fromEntries(requestBody)
        body = JSON.parse(body.data)
        let image = requestBody.get('image')
        const {  id, imageUrl, isImage,  username,  email,  mobile,   referralcode, password } = body
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
        let lockerName = await generate_packageme()
        let newImageName = ""
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

        if (id) {
            await sql_query(`UPDATE tbluser set username=?,email=?,mobile=?,image=?,referralcode=?,password=?,updatedOn=? WHERE packageId=?`, [username, email, mobile, newImageName, referralcode,password, currentTime, dec(`${id}`, encryption_key("ids"))])
        } else {
            await sql_query(`INSERT into tbluser (username,email,mobile,image,referralcode,password,createdOn) VALUES (?,?,?,?,?,?,?)`, [username, email, mobile, newImageName, referralcode,password, currentTime], "Insert")
        }

        return NextResponse.json({ message: `Package has been ${id ? "updated" : "added"} successfully` }, { status: 200 })
    } catch (e) {
        console.log("Error=>", e);
    }
    console.log("==================================================================>")
    return NextResponse.json({ message: "Session expired! Please refresh page" }, { status: 400 })
}

async function generate_packageme() {
    let count = await sql_query('SELECT packageId FROM tblPackage', [], 'Count')
    return "PAC-" + (count + 1).toString();
}
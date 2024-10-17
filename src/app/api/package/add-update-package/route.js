

import { validate_string, validateFile, get_timestemp, validate_input_number, validate_input_number_in_range, dec, encryption_key } from "@/utils/common"
import   { sql_query } from "@/utils/dbconnect" 
import { NextResponse } from "next/server";
import { check_admin_login } from "../../../../utils/backend"
const fs = require('fs');
import { writeFile } from 'fs/promises' 

export async function POST(request, response) {
    try {
        let adm = await check_admin_login(request)
        if (!adm.status || !adm.data._id) {
            return NextResponse.json({ message: "Logout" }, { status: 400 })
        }
        let requestBody = await request.formData(), 
        body = Object.fromEntries(requestBody)
        body = JSON.parse(body.data)
        let image = requestBody.get('image')
        const { name, amount, rewarType,id,imageUrl,isImage } = body
        try {
            validate_string(name, "Package name")
            validate_input_number(amount, "Package amount")
            validate_input_number_in_range(rewarType, "Reward type") 
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
        if (id && isImage  == 0) { 
            newImageName = imageUrl.split('/').pop() 
         }else{
            const upload_path = `public/assets/`  
            let bytes = await image.arrayBuffer()
            let buffer = Buffer.from(bytes) 
            newImageName =id ? imageUrl : (lockerName).toLowerCase() + '-' + currentTime + '.' + image.type.split('/')[1] 
            if (id) {
                try {
                    fs.unlinkSync(`${upload_path}upload/package-image/${imageUrl}`) 
                } catch (error) {
                    console.log("Error=>", error);
                } 
            }
            fs.existsSync(`${upload_path}upload/package-image`) || fs.mkdirSync(`${upload_path}upload/package-image`, { recursive: true })
            await writeFile(`${upload_path}upload/package-image/` + newImageName, buffer) 
         } 

        if (id) { 
            await sql_query(`UPDATE tblPackage set name=?,amount=?,rewardType=?,image=?,updatedOn=? WHERE packageId=?`, [name,parseFloat(amount),parseInt(rewarType),newImageName,currentTime,dec(`${id}` , encryption_key("ids"))] )
        } else {
            await sql_query(`INSERT into tblPackage (name,amount,rewardType,image,createdOn) VALUES (?,?,?,?,?)`, [name,parseFloat(amount),parseInt(rewarType),newImageName,currentTime], "Insert")
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
    return "PAC-" + (count + 1).toString() ;
}
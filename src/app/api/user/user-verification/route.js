import { NextRequest, NextResponse } from 'next/server';
import { dec, encryption_key, get_timestemp, validate_filter_numbers, validate_filter_strings } from '../../../../utils/common';
import { check_admin_login } from '../../../../utils/backend';
import { sql_query } from '../../../../utils/dbconnect';

export async function POST(req, res) {
    try {
        let adm = await check_admin_login(req)
        if (!adm.status || !adm.data.id) {
            return NextResponse.json({ message: "Logout" }, { status: 400 });
        }
        let { userId } = await req.json()
        if (userId) {
            const id = dec(userId, encryption_key("userId"))
            let getuser = await sql_query("select userId,isVerify from tbluser where userId = ? ", [id])
            if (getuser) {
                if (getuser.isVerify === 1) {
                    return NextResponse.json({ message: "User already verified" }, { status: 400 })
                } else {
                    let now = get_timestemp()
                    await sql_query("update tbluser set isVerify = ?,updatedOn = ? where userId = ?", [1, now, getuser.userId])
                    return NextResponse.json({ message: `User verified successfully.` }, { status: 200 })
                }
            }
        }
        return NextResponse.json({ message: 'Service temporary unavailable' }, { status: 400 })
    } catch (e) {
        console.log("error user activation", e);
        return NextResponse.json({ message: "Internal server error" }, { status: 400 })
    }
}
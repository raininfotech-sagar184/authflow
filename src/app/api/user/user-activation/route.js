import { NextRequest, NextResponse } from 'next/server';
import { dec, encryption_key, get_timestemp, validate_filter_numbers, validate_filter_strings } from '../../../../utils/common';
import { check_admin_login } from '../../../../utils/backend';
import { sql_query } from '../../../../utils/dbconnect';

export async function POST(req, res) {
    try {
        let adm = await check_admin_login(req)
        if (!adm.status || !adm.data.id) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
        }
        let { status, userId } = await req.json()
        if (validate_filter_numbers(status) && validate_filter_strings(userId) && [0, 1, 2].indexOf(status) !== -1) {
            const id = dec(userId, encryption_key("userId"))
            let getuser = await sql_query("select userId,isActive from tbluser where userId = ? ", [id])
            if (getuser) {
                if (status === 0 && getuser.isActive === 0) {
                    return NextResponse.json({ message: "User already deactivated" }, { status: 400 })
                }
                else if (status === 1 && getuser.isActive === 1) {
                    return NextResponse.json({ message: "User already activated" }, { status: 400 })
                } else if (status === 2 && getuser.isActive === 2) {
                    return NextResponse.json({ message: "User already blocked" }, { status: 400 })
                } else {
                    let now = get_timestemp()
                    await sql_query("update tbluser set isActive = ?,updatedOn = ? where userId = ?", [status, now, getuser.userId])
                    return NextResponse.json({ message: `User ${status === 0 ? "deactive" : status === 1 ? "active" : "block"} successfully.` }, { status: 200 })
                }
            }
        }
        return NextResponse.json({ message: 'Service temporary unavailable' }, { status: 400 })
    } catch (e) {
        console.log("error user activation", e);
        return NextResponse.json({ message: "Internal server error" }, { status: 400 })
    }
}
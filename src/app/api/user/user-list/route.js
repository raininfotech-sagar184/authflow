import { NextResponse } from 'next/server';
import { sql_query } from '../../../../utils/dbconnect';
import { check_admin_login } from '../../../../utils/backend';
import { enc, encryption_key, validate_filter_numbers, validate_filter_strings } from '../../../../utils/common';
import { draftMode } from 'next/headers';

export async function GET(req, res) {
    draftMode().enable()

    try {
        let adm = await check_admin_login(req)
        if (!adm.status || !adm.data.id) {
            return NextResponse.json({ message: "Logout" }, { status: 400 });
        }
        let query = "", filter = [], limit = process.env.PAGE

        const params = Object.fromEntries(new URLSearchParams(req.nextUrl.search).entries());
        const { page, order, orderColumn, startDate, endDate, search, status, verify } = params;

        query += `SELECT userId,userName,kycStatus,isVerify,isActive, createdOn, parentId, email FROM tbluser WHERE parentId = ?`
        filter.push(0)

        if (validate_filter_numbers([startDate, endDate])) {
            query += " AND createdOn >=? AND createdOn<= ?";
            filter.push(parseInt(startDate))
            filter.push(parseInt(endDate))
        }

        if (status != "" && status >= 0) {
            query += " AND isActive =?"
            filter.push(status)
        }

        if (verify != "" && verify >= 0) {
            query += " AND isVerify =?"
            filter.push(verify)
        }

        if (validate_filter_strings([search])) {
            query += " AND (userName like ?)"
            filter.push("%" + search.trim() + "%") 
        }

        let fields = ["createdOn", "userName", "email", "isActive", "kycStatus","isVerify", "createdOn"]
        if (validate_filter_numbers([orderColumn, order])) {
            query += " order by " + fields[orderColumn] + " " + (order == 0 ? 'asc' : 'desc')
        }
        console.log(fields[orderColumn] )
        let countData = await sql_query(query, filter, 'Count')
        query += " limit ?,?"
        filter.push(page * limit)
        filter.push(parseInt(limit))

        let userList = await sql_query(query, filter, "Multi")

        let allData = [], ascNum = page * limit, descNum = countData - page * limit
        if (userList.length) {

            allData = userList.map((j, k) => { 
                return {
                    num: order == 1 ? descNum-- : ++ascNum,
                    userName: j?.userName?? "-",
                    date: j?.createdOn?? 0,
                    parentId: j?.parentId?? "-",
                    varify: j?.isVerify??0,
                    status: j?.isActive??0,
                    kyc_status: j?.kycStatus??0,
                    email: j?.email?? "-",
                    id: enc(`${j?.userId}` , encryption_key("userId"))?? "-",
                }
            })
        }
        return NextResponse.json({ data: allData ? allData : [], total: countData ? countData : 0 }, { status: 200 })
    } catch (e) {
        console.log("error user list->", e)
        return NextResponse.json({ message: "Something went wrong" }, { status: 400 })
    }
}
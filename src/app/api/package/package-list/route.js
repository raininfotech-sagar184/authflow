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
        const { page, order,status, orderColumn, startDate, endDate, search } = params;

        query += `SELECT packageId,name,status,image,amount, createdOn, rewardType FROM tblPackage`
 
        if (validate_filter_numbers([startDate, endDate])) {
            query += " WHERE createdOn >=? AND createdOn<= ?";
            filter.push(parseInt(startDate))
            filter.push(parseInt(endDate))
        }  
        if (validate_filter_strings([search])) {
            query += " AND name like ?"
            filter.push("%" + search.trim() + "%") 
        }

        if (status != "" && status >= 0) {
            query += " AND status =?"
            filter.push(status)
        }
        let fields = ["createdOn", "name", "amount", "rewardType",  "createdOn"]
        if (validate_filter_numbers([orderColumn, order])) {
            query += " order by " + fields[orderColumn] + " " + (order == 0 ? 'asc' : 'desc')
        }

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
                    packageName: j?.name??"-",
                    date: j?.createdOn??0,
                    status: j?.status??0,
                    packageImg: j?.image??"-",
                    price: j?.amount??0,
                    reward_type: j?.rewardType??0, 
                    id: enc(`${j?.packageId}` , encryption_key("ids"))??"-",
                }
            })
        }
        return NextResponse.json({ data: allData ? allData : [], total: countData ? countData : 0 }, { status: 200 })
    } catch (e) {
        console.log("error user list->", e)
        return NextResponse.json({ message: "Something went wrong" }, { status: 400 })
    }
}
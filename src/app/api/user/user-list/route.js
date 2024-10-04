import { NextResponse } from 'next/server';
import { sql_query } from '../../../../utils/dbconnect';
// import { check_admin_login } from '../../../../utils/backend';
import { enc, encryption_key, validate_filter_numbers, validate_filter_strings } from '../../../../utils/common';
import { draftMode } from 'next/headers';

export async function GET(req, res) {
    draftMode().enable()

    try {
        // let adm = await check_admin_login(req)
        // if (!adm.status || !adm.data.id) {
        //     return NextResponse.json({ message: "Logout" }, { status: 400 });
        // }
        // let query = "", filter = [], limit = process.env.PAGE

        // const params = Object.fromEntries(new URLSearchParams(req.nextUrl.search).entries());
        // const { page, order, orderColumn, startDate, endDate, search, status, verify, refCode } = params;
try {
    const  query123 = `SELECT userName,  createdOn,parentId,email FROM tbluser`
    let userList = await sql_query(query123, [], "Multi")
    console.log(
        {userList}
    )
} catch (error) {
    console.log("----------------------------------------------------------Eror", error)
}
        // query += `SELECT ud.isClient,u.userId, u.userName, u.name, u.createdOn, ud.goldenTicket, u.parentId, u.email, u.sponsorId, s.userName AS sponserName, u.staterKit, ud.phoneNumber, u.USDBalance, u.PPROBalance, ud.tradeLastLoginIp, ud.tradeLastLoginTime,ud.countryCode, u.isActive, u.isVerify,ud.walletAddress FROM tbluserDetail as ud JOIN tbluser as u ON u.userId = ud.userId LEFT JOIN tbluser as s ON u.sponsorId = s.userId WHERE u.parentId = ?`
        // filter.push(0)

        // if (validate_filter_numbers([startDate, endDate])) {
        //     query += " AND u.createdOn >=? AND u.createdOn<= ?";
        //     filter.push(parseInt(startDate))
        //     filter.push(parseInt(endDate))
        // }

        // if (status != "" && status >= 0) {
        //     query += " AND u.isActive =?"
        //     filter.push(status)
        // }

        // if (verify != "" && verify >= 0) {
        //     query += " AND u.isVerify =?"
        //     filter.push(verify)
        // }

        // if (validate_filter_strings([refCode])) {
        //     let searchReffData = await sql_query(`SELECT userId,referralCode FROM tblmatrix WHERE referralCode like "%${refCode}%"`, [], "Multi")
        //     let userIds = searchReffData.length ? searchReffData.map((u) => u.userId) : [-1];
        //     if (userIds.length) {
        //         query += " AND u.userId in (?)"
        //         filter.push(userIds)
        //     }
        // }

        // if (validate_filter_strings([search])) {
        //     query += " AND (u.userName like ? OR u.name like ? OR u.email like ? OR ud.walletAddress like ?)"
        //     filter.push("%" + search.trim() + "%")
        //     filter.push("%" + search.trim() + "%")
        //     filter.push("%" + search.trim() + "%")
        //     filter.push("%" + search.trim() + "%")
        // }

        // let fields = ["u.createdOn", "u.userName", "u.name", "ud.goldenTicket", "u.email", "u.staterKit", "ud.countryCode", "u.USDBalance", "u.PPROBalance", "ud.tradeLastLoginIp", "ud.tradeLastLoginTime", "u.isActive", "u.isVerify", "u.createdOn", "ud.walletAddress", "ud.isClient"]
        // if (validate_filter_numbers([orderColumn, order])) {
        //     query += " order by " + fields[orderColumn] + " " + (order == 0 ? 'asc' : 'desc')
        // }

        // let countData = await sql_query(query, filter, 'Count')
        // query += " limit ?,?"
        // filter.push(page * limit)
        // filter.push(parseInt(limit))

        // let userList = await sql_query(query, filter, "Multi")
        // let userIds = userList.map(u => u.userId) || [], getSubData, getSubscriptionData = {};

        // if (userIds.length) {
        //     getSubData = await sql_query(`select userId,subscriptionId,isLifeTime from tblexUserSubscription where isActive = ? and userId IN (?) order by subscriptionId desc`, [1, userIds], "MULTI")
        // }

        // if (getSubData) {
        //     for (let sub of getSubData) {
        //         if (!getSubscriptionData[sub.userId]) {
        //             getSubscriptionData[sub.userId] = sub;
        //         }
        //     }
        // }

        // let subscriptionIds = getSubscriptionData ? Object.values(getSubscriptionData).map(sub => sub.subscriptionId) : [];
        // let subscriptionNames, getscriptionName = {};

        // if (subscriptionIds.length) {
        //     subscriptionNames = await sql_query(`SELECT subscriptionId, title FROM tblsubscription WHERE subscriptionId IN (?)`, [subscriptionIds], "MULTI");
        // }

        // if (subscriptionNames) {
        //     for (let sub of subscriptionNames) {
        //         getscriptionName[sub.subscriptionId] = sub.title;
        //     }
        // }

        // let allData = [], ascNum = page * limit, descNum = countData - page * limit
        // if (userList.length) {
        //     let get_referralCode = await sql_query(`SELECT userId,referralCode FROM tblmatrix`, [], "Multi")
        //     // let get_sponserName = await sql_query(`SELECT userId,userName FROM tbluser`, [], "Multi")

        //     allData = userList.map((j, k) => {
        //         let latestSubscription = getSubscriptionData[j.userId] || { subscriptionId: null, isLifeTime: null };
        //         let referralIndex = get_referralCode && get_referralCode.findIndex((x) => x.userId == j.userId)
        //         // let sponserIndex = get_sponserName && get_sponserName.findIndex((x) => x.userId == j.sponsorId)
        //         return {
        //             ...j,
        //             num: order == 1 ? descNum-- : ++ascNum,
        //             isLifeTime: latestSubscription.isLifeTime || 0,
        //             email: j.email || "-",
        //             subscriptionName: getscriptionName[latestSubscription.subscriptionId] || "Free",
        //             referralCode: referralIndex != -1 ? get_referralCode[referralIndex]['referralCode'] : "-",
        //             // sponserName: sponserIndex != -1 ? get_sponserName[sponserIndex]['userName'] : "-",
        //             sponserName: j.sponserName || "-",
        //             userId: j.userId ? enc(j.userId.toString(), encryption_key("userId")) : "",
        //             phoneNumber: j.countryCode || j.phoneNumber ? j.countryCode + " " + j.phoneNumber : "-"
        //         }
        //     })
        // }
        return NextResponse.json({ data: "allData" ? "allData" : [], total: "countData" ? "countData" : 0 }, { status: 200 })
    } catch (e) {
        console.log("error user list->", e)
        return NextResponse.json({ message: "Something went wrong" }, { status: 400 })
    }
}
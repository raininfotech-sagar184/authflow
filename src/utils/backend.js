// /* Use only Common function which is relivent to databse */
// import fs from "fs"; 

import { cookies, headers } from 'next/headers'
import { sql_query } from './dbconnect'; 
import { getToken } from 'next-auth/jwt';
import { strGenerator } from './common';
const speakeasy = require("speakeasy");

// const Mailjet = require('node-mailjet')
const fs = require('fs');
const jwt = require('jsonwebtoken');  
const path = require('path'); 
// const privateKeyPath = path.resolve(__dirname, '../utils/pem/private.key'); 
// const privateKey = fs.readFileSync(privateKeyPath, 'utf8'); 
// const publicKeyPath = path.resolve(__dirname, '../utils/pem/public.key'); 
// const publicKey = fs.readFileSync(publicKeyPath, 'utf8');  


// import { session } from '../utils/session';
// import { getToken } from "next-auth/jwt"
// import { sql_query } from "./dbconnect"
// import { get_timestemp } from "./common";
// import web3 from 'web3'

export async function validate_2fa(key, otp) {
	try {
		const status = speakeasy.totp.verify({
			secret: key,
			encoding: "base32",
			token: otp,
		});
		return status;
	} catch (e) {
		console.error("Error validating 2FA:", e);
	}
	return false;
};
export async function check_admin_login(req) { 
	let id = null, status = false
	try {
		let authData = await getToken({ req: req }) 
		if (authData && authData.email && authData.id) {
			let admin = await sql_query("select email,adminId from tblAdmin where email = ? AND adminId = ? ", [authData.email, authData.id])
			if (admin) {
				id = admin.adminId
				status = true
			}
		}
	} catch (e) {
		console.log("admin login==>", e)
	}
	return { status: status, data: { id: id } }
}

// export const setCookie_ = (key, data, isBackend = true) => {
// 	cookies().set({
// 		name: key,
// 		value: data,
// 		httpOnly: isBackend,
// 		maxAge: 60 * 60 * 24,
// 		path: '/',
// 		domain: process.env.TESTNET == 'false' ? 'domain_name' : 'localhost:2205',
// 		sameSite: 'none',
// 		secure: true
// 	})
// }

// export const getCookie_ = (key) => {
// 	return cookies().get(key)
// }

// export const auth_validate = async () => {
// 	return true
// 	const headersList = headers()
// 	const authTkn = headersList.get("authorization")
// 	const sessData = await get_session("sPauthXpdmToken")
// 	if (authTkn && sessData != null && authTkn == sessData) {
// 		return true
// 	}
// 	return false
// }

// export const set_session = async (key, data) => {
// 	return await session().set(key, data)
// }

// export const get_session = async (key) => {
// 	return await session().get(key)
// }

// export function remove_file(files) {
// 	let fs = require('fs')
// 	files.map((file) => {
// 		try {
// 			if (fs.existsSync(file)) {
// 				fs.unlink(file, (err) => {

// 				})
// 			}
// 		} catch (err) {
// 			console.log("remove_file", err)
// 		}
// 	})
// }

export async function recaptcha(token) { 
	const secret = process.env.SECRET_KEY; 
	const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`, {
		method: "POST",
	});
	const data = await response.json();
	return data.success;
}

// export async function directory_exists(directoryPath) {
// 	try {
// 		await fs.promises.access(directoryPath, fs.constants.F_OK);
// 	} catch (error) {
// 		if (error.code === 'ENOENT') {
// 			await fs.promises.mkdir(directoryPath, { recursive: true });
// 		} else {
// 			console.log("dir err", error);
// 			throw "Internal server error";
// 		}
// 	}
// }

// export function firstdate_currmonth() {
// 	let currentDate = new Date()
// 	let firstDayOfCurrentMonth = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), 1, 0, 0, 0, 0))
// 	let timestamp = firstDayOfCurrentMonth.getTime() / 1000
// 	return timestamp
// }

// export function lastdate_currmonth() {
// 	let currentDate = new Date()
// 	let firstDayOfNextMonth = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth() + 1, 1, 0, 0, 0, 0))
// 	let lastDayOfCurrentMonth = new Date(firstDayOfNextMonth - 1)
// 	let timestamp = Math.floor(lastDayOfCurrentMonth.getTime() / 1000)
// 	return timestamp
// }

// export const get_config = async (metaKey) => {
// 	try {
// 		let data = await sql_query("SELECT metaValue FROM tblconfig WHERE metaKey = ?", [metaKey])
// 		if (data) return data.metaValue
// 		else return ""
// 	} catch (e) {
// 		console.log('get_config', e)
// 	}
// 	return ""
// }

export async function file_get_contents(uri) {
	let res = await fetch(uri)
	let ress = await res.text()
	return ress
}

// export async function setLoginHistory(userId, userType, isMobile = 0) {
// 	try {
// 		let headersList = headers()
// 		let useragent = headersList.get('user-agent')
// 		let clientIP = (headersList.get('x-forwarded-for') || '').split(',').shift().trim() || '-'
// 		let browser_array = [{ name: "msie", value: "Internet Explorer" }, { name: "firefox", value: "Firefox" }, { name: "safari", value: "Safari" }, { name: "chrome", value: "Chrome" }, { name: "edge", value: "Edge" }, { name: "opera", value: "Opera" }, { name: "netscape", value: "Netscape" }, { name: "maxthon", value: "Maxthon" }, { name: "konqueror", value: "Konqueror" }, { name: "mobile", value: "Handheld Browser" },]
// 		let browserName = ""
// 		browser_array.map((c, k) => {
// 			if (useragent.match(c.name) || useragent.toLowerCase().match(c.name)) {
// 				browserName = c.value
// 			}
// 		})
// 		let os_array = [{ name: "windows nt 10", value: "Windows 10" }, { name: "windows nt 6.3", value: "Windows 8.1" }, { name: "windows nt 6.2", value: "Windows 8" }, { name: "windows nt 6.1/i", value: "Windows 7" }, { name: "windows nt 6.0", value: "Windows Vista" }, { name: "windows nt 5.2", value: "Windows Server 2003/XP x64" }, { name: "windows nt 5.1", value: "Windows XP" }, { name: "windows xp", value: "Windows XP" }, { name: "windows nt 5.0", value: "Windows 2000" }, { name: "windows me", value: "Windows ME" }, { name: "win98", value: "Windows 98" }, { name: "android", value: "Android" }, { name: "blackberry", value: "BlackBerry" }, { name: "webos", value: "Mobile" }, { name: 'macintosh|mac os x', value: 'Mac OS X' }, { name: 'mac_powerpc', value: 'Mac OS 9' }, { name: 'linux', value: 'Linux' }, { name: 'ubuntu', value: 'Ubuntu' }, { name: 'iphone', value: 'iPhone' }, { name: 'ipod', value: 'iPod' }, { name: 'ipad', value: 'iPad' }]
// 		let osName = ""
// 		os_array.map((c, k) => {
// 			if (useragent.match(c.name) || useragent.toLowerCase().match(c.name)) {
// 				osName = c.value
// 			}
// 		})
// 		let parentOS = ""
// 		if (useragent.indexOf("Win") != -1) {
// 			parentOS = "Window";
// 		} else if (useragent.indexOf("Android") != -1) {
// 			parentOS = "Android";
// 		} else if (useragent.indexOf("Linux") != -1) {
// 			parentOS = "Linux";
// 		} else if (useragent.indexOf("Ubuntu") != -1) {
// 			parentOS = "Ubuntu";
// 		} else if (
// 			useragent.indexOf("iphone") != -1 ||
// 			useragent.indexOf("ipod") != -1 ||
// 			useragent.indexOf("ipad") != -1
// 		) {
// 			parentOS = "IOS";
// 		} else if (useragent.indexOf("Blackberry") != -1) {
// 			parentOS = "Blackberry";
// 		} else if (useragent.indexOf("Webos") != -1) {
// 			parentOS = "Mobile";
// 		} else if (useragent.indexOf("Mac") != -1) {
// 			parentOS = "Mac";
// 		}
// 		let location = {}
// 		let rs = await file_get_contents("http://ip-api.com/json/" + clientIP)
// 		if (rs) {
// 			let location_arr = JSON.parse(rs);
// 			location = {
// 				city: Object.hasOwn(location_arr, "city") ? location_arr.city : "",
// 				regionName: Object.hasOwn(location_arr, "regionName")
// 					? location_arr.regionName
// 					: "",
// 				country: Object.hasOwn(location_arr, "country")
// 					? location_arr.country
// 					: "",
// 				lat: Object.hasOwn(location_arr, "lat") ? location_arr.lat : "",
// 				lon: Object.hasOwn(location_arr, "lon") ? location_arr.lon : "",
// 				timezone: Object.hasOwn(location_arr, "timezone")
// 					? location_arr.timezone
// 					: "",
// 				zip: Object.hasOwn(location_arr, "zip") ? location_arr.zip : "",
// 			}
// 		}
// 		let loc = location ? JSON.stringify(location) : {}
// 		let time = Math.floor(Date.now() / 1000)
// 		let data = [userId, useragent, browserName, clientIP, osName, parentOS, userType, isMobile, loc, time]
// 		await sql_query("insert into tblloginHistory (userId,userAgent,browserName,clientIP,oSName,parentOS,userType,isMobile,location,loginDate) values (?,?,?,?,?,?,?,?,?,?)", data)
// 	} catch (e) {
// 		console.log("setLoginHistory===>", e.message)
// 	}
// }

export async function get_price_data(tik) {
	try {
		let data = await sql_query("SELECT metaValue FROM tblexConfig WHERE metaKey = ?", ["USDTPrice"])
		let priceData = JSON.parse(data.metaValue)
		return priceData[tik];
	}
	catch (e) {
		console.log(e)
		return ""
	}

}

// export function calculateLateFeePerc(penaltyAfter, latePayExceptDate, totalRemainInstallment) {
// 	let time = get_timestemp()
// 	let isLate = time > penaltyAfter ? true : false
// 	let lateFeeday = isLate && latePayExceptDate > time ? Math.ceil((latePayExceptDate - time) / 86400) : 0
// 	let lateFeeUsd = 0
// 	let lateTillDate = ''
// 	let lateInstallmentCnt = 0
// 	if (isLate) {
// 		if (lateFeeday >= 60) {
// 			lateFeeUsd = 5
// 			lateTillDate = penaltyAfter + (30 * 86400)
// 			lateInstallmentCnt = 1
// 		} else if (lateFeeday >= 30) {
// 			lateFeeUsd = 10
// 			lateTillDate = penaltyAfter + (60 * 86400)
// 			lateInstallmentCnt = 2
// 		} else {
// 			lateFeeUsd = 15
// 			lateTillDate = latePayExceptDate
// 			lateInstallmentCnt = 3
// 		}
// 	}
// 	return {
// 		isLate: isLate,
// 		lateFeeUsd: lateFeeUsd,
// 		lateTillDate: lateTillDate,
// 		lateInstallmentCnt: totalRemainInstallment <= lateInstallmentCnt ? totalRemainInstallment : lateInstallmentCnt,
// 		totalInstallment: totalRemainInstallment <= lateInstallmentCnt ? totalRemainInstallment : lateInstallmentCnt + 1
// 	}
// }




// export async function send_mail(email, subject, mailData) {
// 	return new Promise((resolve, reject) => {
// 		try {
// 			mailData = {
// 				...mailData,
// 				logo: process.env.FRONT_URL + 'assets/logo/logo.svg',
// 				baseUrl: process.env.FRONT_URL,
// 				image: mailData.image ? process.env.FRONT_URL + 'assets/user/images/mail/' + mailData.image : '',
// 				sitename: process.env.SITENAME
// 			}

// 			const mailer = require('nodemailer')
// 			const ejs = require('ejs')
// 			const template = fs.readFileSync('mail.html', { encoding: 'utf-8' })

// 			if (process.env.TESTNET == "true") {
// 				const transporter = mailer.createTransport({
// 					service: 'gmail',
// 					auth: {
// 						user: 'raininfotech22@gmail.com',
// 						pass: 'pxry wbxg fryj usbt',
// 					},
// 				})
// 				const mailOptions = {
// 					from: 'raininfotech22@gmail.com',
// 					to: email,
// 					subject: subject,
// 					html: ejs.render(template, mailData),
// 				}
// 				transporter.sendMail(mailOptions, function (error, info) {
// 					if (error) {

// 						reject(false)
// 					} else {

// 						resolve(true)
// 					}
// 				})
// 			} else {
// 				let template = fs.readFileSync('mail.html', { encoding: 'utf-8' });
// 				const mailjet = new Mailjet({
// 					apiKey: process.env.EMAIL_USER,
// 					apiSecret: process.env.EMAIL_PASSWORD
// 				});
// 				mailjet
// 					.post("send", { version: "v3.1" })
// 					.request({
// 						Messages: [
// 							{
// 								From: {
// 									Email: "info@forexpro.ai",
// 									Name: "forexpro.ai"
// 								},
// 								To: [
// 									{
// 										Email: email,
// 									},
// 								],
// 								Subject: subject,
// 								HTMLPart: ejs.render(template, mailData),
// 							},
// 						],
// 					}).then((result) => {

// 					})
// 					.catch((err) => {

// 					})
// 				resolve(true)
// 			}
// 		} catch (e) {
// 			console.log("error send mail--", e);
// 			reject(false)
// 		}
// 	})
// }

// export const changeUserPasswordMail = async (email) => {
// 	try {
// 		let res = await send_mail(email, 'Change password', {
// 			des: `<div>We wanted to inform you that your password has been changed by the admin. </div>
// 			<div style="margin-top: 10px;">If you have any questions or need further assistance, please feel free to contact our support team.</div>`,
// 			des1: ``,
// 			desc1Style: "none",
// 			title1: "Change Password",
// 			title: "",
// 			titleStyle: "none",
// 			image: "change-user-password.png",
// 			otp: "",
// 			otpStyle: 'none'
// 		})
// 		return res
// 	} catch (e) {
// 	}
// 	return false
// }
// export const chechTxHash = async (txHash) => {
// 	let status = false;
// 	try {
// 		const provider = new web3.providers.HttpProvider(process.env.RPCURL);
// 		const Web3 = new web3(provider);
// 		const receipt = await Web3.eth.getTransactionReceipt(txHash);
// 		if (receipt) {
// 			status = true;
// 		}
// 	} catch (e) {
// 		console.log("chechTxHash", e)
// 	}
// 	return status
// }


 

 
 

async function send_mail(email, subject, mailData) { 
	try {
		mailData = {
			...mailData,
			logo: process.env.FRONT_URL + 'assets/image/logo.svg',
			baseUrl: process.env.FRONT_URL,
			image: mailData.image ? process.env.FRONT_URL + 'assets/image/' + mailData.image : '',
			sitename: process.env.SITENAME
		}

		const ejs = require('ejs')
		const template = fs.readFileSync('mail.html', { encoding: 'utf-8' })
		if (true) {
			console.log("innnn");
			const mailer = require('nodemailer')
			// const transporter = mailer.createTransport({
			// 	service: 'gmail',
			// 	auth: {
			// 		user: process.env.EMAIL_USER,
			// 		pass:  process.env.EMAIL_PASSWORD,
			// 	},
			// }) 
			var transporter = mailer.createTransport({
				host: process.env.EMAIL_HOST,
				port:process.env.EMAIL_PORT ,
				auth: {
					user:process.env.EMAIL_USER,
					pass:process.env.EMAIL_PASSWORD
				}	
			});

			const mailOptions = {
				from:process.env.EMAIL_USER,
				to:'hiheh26081@craftapk.com', //email,
				subject: subject,
				html: ejs.render(template, mailData),
			}
			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
				} else {
				}
			});
			return true
		} else {
			let data = {
				From: process.env.EMAIL_USER,
				To: email,
				Subject: subject,
				HtmlBody: ejs.render(template, mailData),
				MessageStream: "outbound"
			}
			let mld = await fetch("https://api.postmarkapp.com/email", {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'X-Postmark-Server-Token': process.env.EMAIL_PASSWORD
				}
			})
			let mlData = await mld.json()
			console.log("send mail function--", mlData, mlData?.ErrorCode);
			if (mlData?.ErrorCode == 0) {
				return true
			} else {
				return false
			}
		}
	} catch (e) {
		console.log("send mail function--", e);
		return false
	}
}
// async function verifyemail(email, otp, st = 0) {
// 	try {
// 		let res = await send_mail(email, 'Email Verification', {
// 			des: `<div>Thank you for taking the time to verify your email address with us. Your security is paramount, and this additional step helps us ensure that your account remains safe and accessible only to you.</div>
// 			<div style="margin-top: 10px;">To complete the verification process, please enter the OTP (One-Time Password) code provided below:</div>`,
// 			des1: `<div style="margin-top: 10px;>Once entered, you’ll gain immediate access to your account, where you can continue to enjoy our services with peace of mind. If you haven’t requested this OTP, please contact our support team immediately.</div>
// 			<div style="margin-top: 10px;">We appreciate your attention to this matter and look forward to continuing to serve you. Should you have any questions or need further assistance, please don't hesitate to reach out</div>`,
// 			desc1Style: "block",
// 			title1: "Email Verification",
// 			title: "Email Verification",
// 			titleStyle: "block",
// 			image: "send-otp.png",
// 			otp: otp,
// 			otpStyle: 'block'
// 		})
// 		return res
// 	} catch (e) {
// 	}
// 	return false
// }
export async function resendOtpMail(email, otp, title) {
	try {
		let res = await send_mail(email, title, {
			des: `<div>Your request to resend the OTP was successful. Please find the new OTP code below to complete the verification process:</div>`,
			des1: `<div style="margin-top: 10px;">If you did not request a new OTP, please contact our support team immediately.</div>`,
			desc1Style: "block",
			title1: title,
			title: title,
			titleStyle: "block",
			image: "resend-otp.png",
			otp: otp,
			otpStyle: 'block'
		})
		return res
	} catch (e) {
	}
	return false
}

// async function sendverificationmail(email) {
// 	try {
// 		let res = await send_mail(email, 'Email Verified', {
// 			des: `<div>We are delighted to inform you that your email address has been successfully verified! This additional step ensures the security of your account and allows us to keep you updated with important information.</div>
// 			<div style="margin-top: 10px;">You can now fully enjoy all the benefits of our services. Whether you're exploring new features, receiving updates, or managing your account settings, rest assured that your verified email will serve as a secure channel for communication.</div>
// 			<div style="margin-top: 10px;">Thank you for verifying your email address with us. Should you have any questions or need assistance, feel free to reach out to our support team. We're here to help!</div>`,
// 			des1: "",
// 			desc1Style: "none",
// 			title1: "Email Verified",
// 			title: "",
// 			titleStyle: "none",
// 			image: "verify-email.png",
// 			otp: "",
// 			otpStyle: 'none'
// 		})
// 		return res
// 	} catch (e) {
// 	}
// 	return false
// }
export async function genrate_reffral_code() {
	try {
	let generatedStr = strGenerator(8)
	const randIndex = Math.floor(Math.random() * 5);
	let cnt = await sql_query(`SELECT userId FROM tbluser`, [], "Count");
	cnt++;
	let refcode = (generatedStr.substr(0, randIndex) + cnt.toString().slice(-3) + generatedStr.substr(randIndex + (cnt.toString().slice(-3)).length)).substr(-6)
	return refcode
	} catch (error) {
		console.log({genrate_reffral_code:error})
	}
	
}

export async function forgotPasswordMail(email, otp) {
	try {
		let res = await send_mail(email, 'Forgot password', {
			des: `<span>We understand that occasionally passwords slip our minds. It’s more common than you might think, and we're here to make the process of resetting it as smooth and secure as possible.</span>
			<div style="margin-top: 10px; margin-bottom: 10px;">Your online security is our top priority, and we're committed to ensuring you have easy access to your account whenever you need it.</div>
			<span>Using Below OTP you can reset password.</span>`,
			des1: "",
			desc1Style: "none",
			title1: "Forgot password?",
			title: "",
			titleStyle: "block",
			image: "forgot-password.png",
			otp: otp,
			otpStyle: 'block',

		})
		return res
	} catch (e) {
	}
	return false
}



 
export function encodeJwtWithPem(param) {
	console.log('privateKey',param)
	try {
		return true// jwt.sign(param, privateKey, { algorithm: 'RS256' });
	} catch (e) {
		return ''
	}
}

export function decodeJwtWithPem(token) {
	try {
		return true //jwt.verify(token, publicKey);
	} catch (edge) {
		return ''
	}
}

 

 
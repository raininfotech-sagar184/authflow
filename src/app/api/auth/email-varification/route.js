
import { NextResponse } from 'next/server'
import { encryption_key, validate_string, chk_password, passEnc, chk_confirm_password, chk_otp, get_timestemp, dec } from '../../../../utils/common'
import { sql_query } from '../../../../utils/dbconnect'
import { recaptcha } from '../../../../utils/backend';
export async function POST(req, res) {
  try {
    let body = await req.json();
    if (!body) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 400 }) 
    }  
    const {repchaToken,mlTkn, otp} = body
    let checkRepcha = await recaptcha(repchaToken);
    if (!checkRepcha) { 
        return NextResponse.json({ message: 'Something went to wrong' }, { status: 400 })
    } 
    try { 
        validate_string(otp, "OTP", 0);
        chk_otp(otp);
    } catch (e) {
      return NextResponse.json({ message: e.message }, { status: 400 }) 
    } 
    let token = {}
    if (dec(mlTkn, encryption_key("token"))) {
        token=JSON.parse(dec(mlTkn, encryption_key("token")))
    } 
    if (!token.email) { 
      return NextResponse.json({  email: "invalid" }, { status: 400 }) 
    } else { 
        const user = await sql_query("SELECT email, userId, otpCode, otpExpireTime FROM tbluser WHERE email = ?", [token.email]); 
        if (user) {
            let currentTime = get_timestemp();  
            if (otp != dec(user.otpCode, encryption_key('otpKey'))) {
              return NextResponse.json({ message: "Invalid OTP" }, { status: 400 }) 
            }
            if (user.otpExpireTime < currentTime) {
              return NextResponse.json({ message: "This OTP is expired, Please click on resend OTP" }, { status: 400 }) 
            }  
            await sql_query(`UPDATE tbluser SET isVarify = ?, updatedOn = ? WHERE userId = ?`, [1, currentTime, user.userId], "Update");
            return NextResponse.json({message: "Your email has been varified successfully" }, { status: 200 }) 
        } else {
          return NextResponse.json({ message: 'invalid' }, { status: 400 }) 
        }
    }
  } catch (error) {
    console.log("Reset Password==>", error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}


 

import { NextResponse } from 'next/server'
import { encryption_key, validate_string, chk_email, chk_password, passDec, passEnc, generateNumeric, enc, get_timestemp } from '../../../../utils/common'
import { sql_query } from '../../../../utils/dbconnect'
import { recaptcha } from '../../../../utils/backend';
export async function POST(req, res) {
  try {
    let { email, password,repchaToken } = await req.json()
    let checkRepcha = await recaptcha(repchaToken);
    if (!checkRepcha) {
      return NextResponse.json({ message: 'Something went to wrong, Please refresh page' }, { status: 500 })
    }
    try {
      validate_string(email, "Email")
      chk_email(email)
      validate_string(password, "Password")
      chk_password(password)
    } catch (e) {
      return NextResponse.json({ message: e }, { status: 400 })
    }
    let adm = await sql_query("select email,password,isVarify from tbluser where email = ? ", [email]) 
    if (adm && passDec(adm.password, encryption_key("passwordKey")) === password) {
      console.log({adm})
      if (adm.isVarify == 0) {
        let currentTime = get_timestemp()
        let forgetCode = generateNumeric(6);
        // await forgotPasswordMail(email, forgetCode); 
        console.log('temporary mail functionality id off',{otp:forgetCode  })
        const accessTokenMail =  enc(JSON.stringify({email:email}) , encryption_key('token')) 
        await sql_query(`UPDATE tbluser set otpCode=?,otpExpireTime=?,updatedOn=? WHERE email=?`, [enc(forgetCode.toString(), encryption_key('otpKey')), parseInt(currentTime) + 1800, currentTime, email])
        return NextResponse.json({ message: 'Please verify your email',isVarify:adm.isVarify,accessToken:accessTokenMail }, { status: 400 })
      }
      return NextResponse.json({ message: 'success', data: { twoOpen: adm.twoOpen } }, { status: 200 })
    } else {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 })
    }
  } catch (error) {
    console.log("Login==>", error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
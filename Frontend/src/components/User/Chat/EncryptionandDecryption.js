import CryptoJS from "crypto-js"

const KEY="8be73940593011c04d654aba9088d1cf7694c3531d2c40018544a5c58809bd27"
const encryptdata=(data)=>{
    if(data){
    const encrypted=CryptoJS.AES.encrypt(data,KEY).toString()
    return encrypted
    }
    return " "
}

const decryptdata=(data)=>{
    if(data){
    const decrypted=CryptoJS.AES.decrypt(data,KEY).toString(CryptoJS.enc.Utf8)
    return decrypted
    }
    return ""
}

export {encryptdata,decryptdata}

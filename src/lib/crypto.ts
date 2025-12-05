import crypto from "crypto"
// We are using AES-256-GCM to encode sensitive data we are also using additional authentication data(aad)
// This does cost more on the server side but security is a must
// how it will be stored in the Db is (base64.iv).(base64 ciphertext).(base64 authTag)
const KEY_BASE64 = process.env.ENCRYPTION_KEY_BASE64;

if(!KEY_BASE64){
    throw new Error("Missing Key From Enviorment");
}

const Key = Buffer.from(KEY_BASE64, "base64");
if(Key.length !== 32){
    throw new Error("Key Does Not Decrypt Properly");
}

export function encryptAES(pt: string, aad?: string): string{
    // the iv will be 12 bytes long
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv("aes-256-gcm", Key, iv);
    if(aad){
        cipher.setAAD(Buffer.from(aad, "utf8"));
    }
    const ciphertext = Buffer.concat([cipher.update(pt, "utf8"), cipher.final()]);
    const authTag = cipher.getAuthTag();
    return(iv.toString("base64")+"."+ciphertext.toString("base64")+"."+authTag.toString("base64"));
}

export function decryptAES(encryptedTxt: string, aad?: string): string{
    const encryptSegments = encryptedTxt.split(".");
    if(encryptSegments.length !== 3){
        throw new Error("Improper encryption format or missing");
    }
    const iv = Buffer.from(encryptSegments[0], "base64");
    const ciphertext = Buffer.from(encryptSegments[1], "base64");
    const authTag = Buffer.from(encryptSegments[2], "base64");
    const decipher = crypto.createDecipheriv("aes-256-gcm", Key, iv);
    if(aad){
        decipher.setAAD(Buffer.from(aad,"utf8"));
    }
    const decryptedData = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    return(decryptedData.toString("utf8"));
}
import test from "node:test";
import assert from "node:assert/strict";
import { mailConfig, sheetTitle } from "../lib/integration-config";
test("Gmail defaults, recipients and legacy mail settings stay compatible", () => {
 const keys=['GMAIL_USER','GMAIL_APP_PASSWORD','CONTACT_EMAIL_1','CONTACT_EMAIL_2','SMTP_HOST','SMTP_PORT','SMTP_USER','SMTP_PASSWORD','SMTP_FROM','EMAIL_TO_1','EMAIL_TO_2','GOOGLE_SHEET_NAME'];
 const previous=Object.fromEntries(keys.map(k=>[k,process.env[k]]));
 try {
  keys.forEach(k=>delete process.env[k]);
  Object.assign(process.env,{GMAIL_USER:'organizer@example.com',GMAIL_APP_PASSWORD:'fixture-password',CONTACT_EMAIL_1:'one@example.com',CONTACT_EMAIL_2:'two@example.com'});
  assert.deepEqual(mailConfig(),{host:'smtp.gmail.com',port:465,user:'organizer@example.com',password:'fixture-password',from:'organizer@example.com',recipients:['one@example.com','two@example.com']});
  keys.forEach(k=>delete process.env[k]);
  Object.assign(process.env,{SMTP_HOST:'smtp.example.com',SMTP_PORT:'587',SMTP_USER:'user',SMTP_PASSWORD:'fixture-password',SMTP_FROM:'from@example.com',EMAIL_TO_1:'one@example.com',EMAIL_TO_2:'two@example.com'});
  assert.equal(mailConfig().host,'smtp.example.com');assert.equal(mailConfig().port,587);assert.equal(mailConfig().recipients.length,2);
  assert.equal(sheetTitle('contact-us'),'contact-us');process.env.GOOGLE_SHEET_NAME='Propack';assert.equal(sheetTitle('contact-us'),'Propack-contact-us');
 } finally { for(const k of keys) { if(previous[k]===undefined)delete process.env[k];else process.env[k]=previous[k]; } }
});

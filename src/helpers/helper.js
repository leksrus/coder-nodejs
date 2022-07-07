import {Storage} from '@google-cloud/storage';
import nodemailer from 'nodemailer';
import {format} from 'util';
import twilio from 'twilio';

const storage = new Storage({
keyFilename: 'tech-market-bad6f-firebase-adminsdk-upnfm-0321b83bea.json'
});
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

export const uploadImage = (file) => new Promise((resolve, reject) => {
    const { originalname, buffer } = file;

    const blob = bucket.file(originalname.replace(/ /g, "_"))
    const blobStream = blob.createWriteStream({
        resumable: false
    });
    blobStream.on('finish', async () => {
        const url = await blob.getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
        });
        const publicUrl = format(url[0]);
        resolve(publicUrl);
    })
        .on('error', (err) => {
            console.log(err)
            reject(`Unable to upload image, something went wrong`);
        })
        .end(buffer);
});

export const sendEmail = async (data) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.MAILUSER,
            pass: process.env.MAILPASS
        }
    });

     await transporter.sendMail({
        from: 'Site Admin',
        to: process.env.MAILUSER,
        subject: data.subject,
        html: data.message,
    });
}


export const sendSms = async (data) => {
    const client = twilio(process.env.TWILIOACCOUNT, process.env.TWILIOTOKEN);

    await client.messages.create({
        body: data.body,
        from: '+12514283970',
        to: data.phone
    });
}

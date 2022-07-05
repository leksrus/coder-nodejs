import {Storage} from '@google-cloud/storage';
import nodemailer from 'nodemailer';
import {format} from 'util';

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
    blobStream.on('finish', () => {
        const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        resolve(publicUrl);
    })
        .on('error', (err) => {
            console.log(err)
            reject(`Unable to upload image, something went wrong`);
        })
        .end(buffer);
});

export const sendEmail = async (email) => {
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
        subject: "New user register",
        html: `<b>New account created email: ${email}</b>`,
    });
}


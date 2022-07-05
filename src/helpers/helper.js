import {Storage} from '@google-cloud/storage';
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


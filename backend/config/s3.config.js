import { S3 } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const config = {
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: 'eu-west-3',
};
const s3 = new S3(config);

export default s3;
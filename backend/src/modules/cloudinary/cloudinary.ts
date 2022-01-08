import { CLOUDINARY } from './../../common/constants';
import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
    provide: CLOUDINARY,
    useFactory: () => {
        return v2.config({
            cloud_name: 'dqmna8qs1',
            api_key: '345845462513739',
            api_secret: 'cu8ncRUSuk5V7rc5_bzWI2O5kLc',
        });
    },
};
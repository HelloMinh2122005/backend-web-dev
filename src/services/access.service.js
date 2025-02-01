const bcrypt = require('bcrypt');
const crypto = require('crypto');
const shopModel = require('../models/shops'); // Ensure you have the correct path to your shop model

const Role = {
    ADMIN: 'admin',
    SHOP: 'shop',
    CUSTOMER: 'customer',
};

class AccessService {
    static signUp = async ({ name, email, password }) => {
        try {
            // step1: check email exists?
            const holderShop = await shopModel.findOne({ email: email }).lean(); // lean() to get plain Javascript object
            if (holderShop) {
                return {
                    code: '409: CONFLICT',
                    message: 'Email exists',
                    status: 409
                };
            }

            // step2: hash the password
            const passwordHash = await bcrypt.hash(password, 10);

            // step3: create new shop
            const newShop = await shopModel.create({ name, email, password: passwordHash, roles: [Role.SHOP] });

            if (newShop) {
                // if success give them a token to do shit immediately 
                // create private key, public key 
                const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 2048,
                    publicKeyEncoding: {
                        type: 'spki',
                        format: 'pem'
                    },
                    privateKeyEncoding: {
                        type: 'pkcs8',
                        format: 'pem'
                    }
                });
                // try print 
                console.log({ publicKey, privateKey });

                return {
                    code: '201: CREATED',
                    message: 'User created successfully',
                    status: 201,
                    data: newShop
                };
            } else {
                return {
                    code: '500: INTERNAL SERVER ERROR',
                    message: 'Sign up failed',
                    status: 500
                };
            }
        } catch (error) {
            return {
                code: '500: INTERNAL SERVER ERROR',
                message: error.message,
                status: 500
            };
        }
    }
}

module.exports = AccessService;
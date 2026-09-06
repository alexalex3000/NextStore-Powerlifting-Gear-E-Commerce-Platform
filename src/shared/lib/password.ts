import * as argon2 from 'argon2'

const PEPPER = Buffer.from(process.env.PASSWORD_PEPPER!);

const argon2Options: argon2.HashOptions = {
    type: argon2.argon2id,
    memoryCost: 2**16,
    timeCost: 3,
    parallelism: 1,
    secret: PEPPER,
}

export const hashPassword = async (password: string) => {
    const hashed = await argon2.hash(password, argon2Options);
    return hashed;
}

export const passwordVerify = async (password: string, hash: string) => {
    try{
        const isValid = await argon2.verify(password, hash, {secret: PEPPER});

        return isValid;
    } catch (e){
        return false;
    }
}
import { ObjectId } from 'mongodb';
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from '../constants/env';
export function isValidObjectId(value: string): boolean {
    try {
        new ObjectId(value);
        return true;
    } catch (error) {
        return false;
    }
}

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function isValidPhoneNumber(phoneNumber: string): boolean {
    const phoneRegex = /^[0-9]+$/;
    return phoneRegex.test(phoneNumber);
}

export const hashValue = async (value: string): Promise<string> => {
    const saltRounds = Number.parseInt(SALT_ROUNDS, 10);
    const hashedValue = await bcrypt.hash(value, saltRounds);
    return hashedValue;
}

export const compareValue = async (value: string, hashedValue: string) : Promise<boolean>=>{
   const valid = await bcrypt.compare(value,hashedValue).catch(()=> false);
   return valid;
}
import { ObjectId } from 'mongodb';
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from '@src/constants/env';

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

export const hashValue = async (value: string) => {
    bcrypt.hash(value, SALT_ROUNDS);
}

export const compareValue = async (value: string, hashedValue: string)=>{
    bcrypt.compare(value,hashedValue).catch(()=> false);
}
import { ObjectId } from 'mongodb';

/**
 * Valida si un valor es convertible a un ObjectId de MongoDB.
 * @param value - El valor a validar.
 * @returns true si el valor es convertible a un ObjectId, false en caso contrario.
 */
export function isValidObjectId(value: any): boolean {
    try {
        new ObjectId(value);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Valida si un correo electrónico es válido.
 * @param email - El correo electrónico a validar.
 * @returns true si el correo electrónico es válido, false en caso contrario.
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Valida si un número de teléfono es válido.
 * @param phoneNumber - El número de teléfono a validar.
 * @returns true si el número de teléfono es válido, false en caso contrario.
 */
export function isValidPhoneNumber(phoneNumber: string): boolean {
    const phoneRegex = /^[0-9]+$/;
    return phoneRegex.test(phoneNumber);
}

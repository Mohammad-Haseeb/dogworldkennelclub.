export declare class User {
    id: number;
    firstName: string;
    sureName: string;
    email: string;
    telephone: string;
    username: string;
    streetAddress: string;
    town: string;
    country: string;
    postcode: string;
    password: string;
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
    constructor(id: string, firstName: string, pass: string);
    createdAt: Date;
    updatedAt: Date;
}

export interface IUser {
    body: any;
    objectId: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    ACL: object;
    sessionToken: string;
}
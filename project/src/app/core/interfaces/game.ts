
export interface IGame {
        title: string;
        imgURL: string;
        description: string;
        price: string;
        objectId: string;
        createdAt: string;
        updatedAt: string;
        owner: {
            __type: string;
            className: string;
            objectId: string;
        }
}
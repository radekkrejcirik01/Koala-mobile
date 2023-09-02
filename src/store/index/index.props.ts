export interface ReducerProps {
    user: User;
    newAccount: NewAccount;
}

export interface User {
    token: string;
    user: {
        name: string;
        username: string;
        profilePhoto: string;
    };
}

export interface NewAccount {
    name: string;
    username: string;
}

type Vehicule = {
    name: string
    id: number
}

type User = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    avatar: string;
    solde: number;
    createdAt: string;
    updatedAt: string;
    emailVerificationToken: string | null;
    isVerified: boolean;
    tokenExpiresAt: string;
    phoneNumber: string;
    createdBy: string | null;
    updatedBy: string | null;
    isAdmin: boolean;
}
type InvestmentPlan = {
    id?: number;
    name: string;
    amount: number;
    incomePercentage: number;
    durationInMonth: number;
    durationInDay: number;
    minimumWithdrawalAmount: number;
    vehicleId: string;
    created_at?: Date
    updated_at?: Date
}


type UserToken = {
    type: string;
    name: string | null;
    token: string;
    abilities: string[];
    lastUsedAt: string | null;
    expiresAt: string;
}

type UserResponse = {
    user: User;
    token: Token;
}

type DepositRequest = {
    id: number;
    amount: string;
    method: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
    photo: string | null;
    createdBy: number;
    updatedBy: number | null;
    user: User;
    created: {
        id: number;
        firstname: string;
        lastname: string;
    };
    updated: null | {
        id: number;
        firstname: string;
        lastname: string;
    };
}
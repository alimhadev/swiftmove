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
    totalInvestments: number;
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
    vehicle?: Vehicule;
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

interface CreatedBy {
    id: number
    firstname: string
    lastname: string
}

interface Deposit {
    id: number
    amount: string
    method: string
    userId: number
    createdAt: string
    updatedAt: string
    isValidated: boolean
    photo: string
    createdBy: number
    updatedBy: number | null
    created: CreatedBy
    user: User
    updated: null | CreatedBy
}


interface Increase {
    id: number;
    amount: number;
    subscribeId: number;
    createdBy: number;
    updatedBy: number;
    createdAt: DateTime;
    updatedAt: DateTime;
    created: User;
    updated: User;
}
type Investment = {
    id: number;
    state: string;
    userId: number;
    investmentPlanId: number;
    createdAt: string;
    updatedAt: string;
    createdBy: number;
    updatedBy: number | null;
    lastActivity: string | null;
    leftDays: number;
    fakeMonths: number;
    increases: Increase[];
}


interface ActiveUserInvestment {
    id: number;
    state: string;
    userId: number;
    investmentPlanId: number;
    createdAt: string;
    updatedAt: string;
    createdBy: number;
    updatedBy: number | null;
    lastActivity: string | null;
    leftDays: number;
    fakeMonths: number;
    investmentPlan: InvestmentPlan;
}

interface CreatedBy {
    id: number;
    firstname: string;
    lastname: string;
}
interface Deposit {
    id: number;
    amount: string;
    method: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
    isValidated: boolean;
    photo: string;
    createdBy: number;
    updatedBy: number | null;
    created: CreatedBy;
    user: User;
    updated: null | CreatedBy;
}  

interface Withdrawal {
    id: number;
    amount: string;
    method: string;
    cost: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
    phoneNumber: string;
    createdBy: number;
    updatedBy: number | null;
    isValidated: boolean;
    user: User;
    updated: null | CreatedBy;
    created: CreatedBy;
  }
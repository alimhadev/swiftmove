import { getServerUrl } from "./utils"
// apiClient.ts
export const apiClient = async <T>(endpoint: string, method: string = "GET", body?: any, isFormData: boolean = false): Promise<T> => {
    const serverUrl = getServerUrl();
    const authToken = localStorage.getItem('token');

    if (!authToken) {
        throw new Error("Missing authorization token");
    }

    try {
        const headers: HeadersInit = {
            'Authorization': `Bearer ${authToken}`,
        };
        // create headers based on form data
        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }
        const response = await fetch(`${serverUrl}${endpoint}`, {
            method,
            headers,
            body: body ? isFormData ? body : JSON.stringify(body) : null
        });

        if (!response.ok) {
            const responseJson = await response.json()
            throw new Error(`Erreur ${response.status}: ${responseJson.message}`)
        }
        return await response.json();
    } catch (error: any) {
        throw new Error(`${error.message}`);
    }
};

export const getUsers = (): Promise<User[]> => apiClient<User[]>(`/users`);
export const getCurrentUser = (): Promise<User> => apiClient<User>(`/current-user`);

export const getVehicles = (): Promise<Vehicule[]> => apiClient<Vehicule[]>('/vehicles');

export const createVehicles = (name: string): Promise<String> => apiClient('/vehicles', 'POST', { name });
export const updateVehicle = (payload: { name: string, id: string }): Promise<String> => apiClient(`/vehicles/${payload.id}`, 'PUT', { name: payload.name });
export const deleteVehicles = (id: string): Promise<String> => apiClient(`/vehicles/${id}`, 'DELETE');
export const getInvestmentPlans = (): Promise<InvestmentPlan[]> => apiClient<InvestmentPlan[]>('/investment_plans');
export const createInvestmentPlan = (payload: Omit<InvestmentPlan, 'id' | 'created_at' | 'updated_at'>): Promise<String> => apiClient('/investment_plans', 'POST', payload);
export const updateInvestmentPlan = (payload: InvestmentPlan): Promise<String> => apiClient(`/investment_plans/${payload.id}`, 'PUT', payload);
export const deleteInvestmentPlan = (id: string): Promise<String> => apiClient(`/investment_plans/${id}`, 'DELETE');
export const getDepositRequests = (): Promise<Deposit[]> => apiClient<Deposit[]>('/deposits');
export const approveDeposit = (id: number): Promise<any> => apiClient(`/validate-deposit/${id}`, 'POST');
export const SubmitDepositRequest = (payload: any): Promise<any> => apiClient('/deposit-for-user', 'POST', payload, true);
export const SubmitWithdrawalRequest = (payload: any): Promise<any> => apiClient('/withdrawal-for-user', 'POST', payload,);
export const subscribeToPlan = (payload: { investmentPlanId: number }): Promise<String> => apiClient(`/subscribtion-for-user`, 'POST', payload);

export const userIncrease = (): Promise<Investment[]> => apiClient(`/user-increases`);
export const getUserActivePlans = (): Promise<ActiveUserInvestment[]> => apiClient<ActiveUserInvestment[]>('/user-subscribtion-plans');
export const getTotalInvestments = (): Promise<{ totalInvestments: number }> => apiClient<{ totalInvestments: number }>('/total-investment');

export const getWithdrawalRequests = (): Promise<Withdrawal[]> => apiClient<Withdrawal[]>('/withdrawals');

export const approveWithdrawal = (id: number): Promise<any> => apiClient(`/validate-withdrawal/${id}`, 'POST');
export const requestPasswordReset = (email: string): Promise<any> => apiClient(`/forgot-password`, 'POST', { email });
export const resetPassword = (payload: { password: string, token: string, email: string }): Promise<any> => apiClient(`/reset-password`, 'POST', payload);
export const getUserWithdrawalRequests = (): Promise<Withdrawal[]> => apiClient<Withdrawal[]>('/withdrawals-by-user');
export const getUserDepositRequests = (): Promise<Deposit[]> => apiClient<Deposit[]>('/deposits-by-user');
export const setUserRole = (id: number): Promise<any> => apiClient(`/set-admin/${id}`, 'POST');
export const getAdmins = (): Promise<User[]> => apiClient<User[]>('/admins-list');
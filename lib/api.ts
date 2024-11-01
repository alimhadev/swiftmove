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
            body: body? isFormData ? body : JSON.stringify(body) : null
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error: any) {
        console.log(error)
        throw new Error(`Error sending request: ${error.message}`);
    }
};

export const getUsers = (): Promise<User[]> => apiClient<User[]>(`/users`);
export const getUserById = (id: string): Promise<User> => apiClient<User>(`/users/${id}`);

export const getVehicles = (): Promise<Vehicule[]> => apiClient<Vehicule[]>('/vehicles');

export const createVehicles = (name: string): Promise<String> => apiClient('/vehicles', 'POST', { name });
export const updateVehicle = (payload: { name: string, id: string }): Promise<String> => apiClient(`/vehicles/${payload.id}`, 'PUT', { name: payload.name });
export const deleteVehicles = (id: string): Promise<String> => apiClient(`/vehicles/${id}`, 'DELETE');
export const getInvestmentPlans = (): Promise<InvestmentPlan[]> => apiClient<InvestmentPlan[]>('/investment_plans');
export const createInvestmentPlan = (payload: Omit<InvestmentPlan, 'id' | 'created_at' | 'updated_at'>): Promise<String> => apiClient('/investment_plans', 'POST', payload);
export const updateInvestmentPlan = (payload: InvestmentPlan): Promise<String> => apiClient(`/investment_plans/${payload.id}`, 'PUT', payload);
export const deleteInvestmentPlan = (id: string): Promise<String> => apiClient(`/investment_plans/${id}`, 'DELETE');
export const getDepositRequests = (): Promise<DepositRequest[]> => apiClient<DepositRequest[]>('/deposits');
export const SubmitDepositRequest = (payload: any): Promise<any> => apiClient('/deposits/by-user', 'POST', payload, true);
export const SubmitWithdrawalRequest = (payload: any): Promise<any> => apiClient('/withdrawals/by-user', 'POST', payload, );
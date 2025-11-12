const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface RegisterData {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    role?: 'REQUESTER' | 'TASKER' | 'VERIFIER';
}

export interface LoginData {
    email: string;
    password: string;
}

export interface ApiResponse<T = any> {
    message?: string;
    error?: string;
    data?: T;
    token?: string;
    user?: any;
    userId?: string;
}

class ApiClient {
    private baseUrl: string;
    private token: string | null = null;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.token = localStorage.getItem('token');
    }

    setToken(token: string) {
        this.token = token;
        localStorage.setItem('token', token);
    }

    clearToken() {
        this.token = null;
        localStorage.removeItem('token');
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Request failed');
        }

        return data;
    }

    async register(data: RegisterData) {
        return this.request<ApiResponse>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async login(data: LoginData) {
        const response = await this.request<ApiResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        if (response.token) {
            this.setToken(response.token);
        }
        return response;
    }

    async verifyEmail(token: string) {
        const response = await this.request<ApiResponse>('/auth/verify-email', {
            method: 'POST',
            body: JSON.stringify({ token }),
        });
        if (response.token) {
            this.setToken(response.token);
        }
        return response;
    }

    async resendVerification(email: string) {
        return this.request<ApiResponse>('/auth/resend-verification', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    }

    async connectWallet(walletAddress: string) {
        return this.request<ApiResponse>('/auth/connect-wallet', {
            method: 'POST',
            body: JSON.stringify({ walletAddress }),
        });
    }

    async getProfile() {
        return this.request<ApiResponse>('/auth/profile', {
            method: 'GET',
        });
    }

    logout() {
        this.clearToken();
    }
}

export const api = new ApiClient(API_BASE_URL);

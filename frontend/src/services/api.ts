import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      // Redirect to login if needed
    }
    return Promise.reject(error)
  },
)

export interface CompanyInfo {
  name: string
  colors: string
  logo: string
  description: string
  purpose: string
}

export interface GenerateRequest {
  company_info: CompanyInfo
  prompt: string
}

export interface GenerateResponse {
  webpage: string
}

// Landing page generation API calls
export const landingPageAPI = {
  // Generate landing page with company context
  async generate(data: GenerateRequest): Promise<GenerateResponse> {
    const response = await api.post('/generate', data)
    return response.data
  },

  // Simple page generation
  async generateSimple(prompt: string): Promise<GenerateResponse> {
    const response = await api.post('/generate-simple', { prompt })
    return response.data
  },

  // Get generation history
  async getHistory(): Promise<unknown[]> {
    const response = await api.get('/history')
    return response.data
  },

  // Save generated page
  async savePage(data: { name: string; html: string }): Promise<unknown> {
    const response = await api.post('/save-page', data)
    return response.data
  },
}

export default api

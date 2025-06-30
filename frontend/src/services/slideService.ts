// Example: Slide generation service
import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api'

export interface SlideRequest {
  slideType: string
  description: string
  targetAudience: string
}

export interface SlideResponse {
  html: string
  css: string
  metadata: {
    title: string
    description: string
  }
}

export const slideService = {
  async generateSlide(data: SlideRequest): Promise<SlideResponse> {
    const response = await axios.post(`${API_BASE_URL}/generate-slide`, data)
    return response.data
  },

  async getSlideHistory(): Promise<SlideResponse[]> {
    const response = await axios.get(`${API_BASE_URL}/slides`)
    return response.data
  }
}

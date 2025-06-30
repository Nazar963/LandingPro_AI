// Slide generation types
export interface SlideData {
  slideType: 'hero' | 'features' | 'testimonials' | 'pricing' | 'contact'
  description: string
  targetAudience: string
}

export interface GeneratedSlide {
  id: string
  type: string
  html: string
  css: string
  metadata: {
    title: string
    description: string
    createdAt: string
  }
}

export interface SlideGenerationResponse {
  success: boolean
  slide: GeneratedSlide
  message?: string
}

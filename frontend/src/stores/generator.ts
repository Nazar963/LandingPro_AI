import { defineStore } from 'pinia'

export interface OnboardingData {
  companyName: string
  productName: string
  purpose: string
}

export const useGeneratorStore = defineStore('generator', {
  state: () => ({
    // Onboarding form data
    onboarding: {
      companyName: '',
      productName: '',
      purpose: ''
    } as OnboardingData,
    
    // Current step in the onboarding process
    currentStep: 1,
    
    // UI states
    isLoading: false,
    error: null as string | null,
  }),

  getters: {
    isStepValid: (state) => (step: number) => {
      switch (step) {
        case 1:
          return state.onboarding.companyName.trim().length > 0
        case 2:
          return state.onboarding.productName.trim().length > 0
        case 3:
          return state.onboarding.purpose.trim().length > 0
        default:
          return false
      }
    },
    
    isOnboardingComplete: (state) => {
      return state.onboarding.companyName.trim().length > 0 &&
             state.onboarding.productName.trim().length > 0 &&
             state.onboarding.purpose.trim().length > 0
    },
  },

  actions: {
    updateCompanyName(name: string) {
      this.onboarding.companyName = name
    },

    updateProductName(name: string) {
      this.onboarding.productName = name
    },

    updatePurpose(purpose: string) {
      this.onboarding.purpose = purpose
    },

    nextStep() {
      if (this.currentStep < 3) {
        this.currentStep++
      }
    },

    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },

    resetOnboarding() {
      this.onboarding = {
        companyName: '',
        productName: '',
        purpose: ''
      }
      this.currentStep = 1
    },

    setError(message: string) {
      this.error = message
    },

    clearError() {
      this.error = null
    },
  },
})
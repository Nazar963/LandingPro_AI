<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <!-- Question Card -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <!-- Progress indicator -->
        <div class="mb-8 text-center">
          <div class="flex justify-center space-x-2 mb-2">
            <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div class="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
          <p class="text-sm text-gray-500">Step 1 of 3</p>
        </div>

        <!-- Question -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 text-center">
            What's your company name?
          </h2>
          <p class="text-gray-600 text-center mb-6">
            This will help us personalize your landing page
          </p>
          
          <!-- Input -->
          <div class="mb-6">
            <input 
              v-model="companyName"
              type="text"
              ref="inputRef"
              class="w-full text-lg border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors duration-200"
              placeholder="e.g., TechCorp Inc."
              @keyup.enter="handleNext"
            />
          </div>

          <!-- Error message -->
          <div v-if="store.error" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {{ store.error }}
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex justify-between">
          <button 
            @click="handleBack"
            class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            Back
          </button>
          
          <button 
            @click="handleNext"
            :disabled="!isValid"
            :class="[
              'px-6 py-2 rounded-lg transition-colors duration-200',
              isValid 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            ]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useGeneratorStore } from '@/stores/generator'

const router = useRouter()
const store = useGeneratorStore()
const inputRef = ref<HTMLInputElement>()

// Local reactive state
const companyName = ref(store.onboarding.companyName)

// Computed
const isValid = computed(() => companyName.value.trim().length > 0)

// Watch for changes and update store
watch(companyName, (newValue) => {
  store.updateCompanyName(newValue)
  store.clearError()
})

// Methods
const handleNext = () => {
  if (!isValid.value) {
    store.setError('Please enter your company name')
    return
  }
  
  store.updateCompanyName(companyName.value)
  router.push('/product-name')
}

const handleBack = () => {
  router.push('/')
}

// Focus input on mount
onMounted(() => {
  inputRef.value?.focus()
})
</script>

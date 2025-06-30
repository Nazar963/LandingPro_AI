<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <!-- Welcome Card -->
      <div class="bg-white rounded-lg shadow-lg p-8 text-center">
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            🚀 LandingPro AI
          </h1>
          <p class="text-gray-600">
            Let's create your perfect landing page in just 3 simple steps
          </p>
        </div>

        <!-- Progress indicator -->
        <div class="mb-8">
          <div class="flex justify-center space-x-2">
            <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div class="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div class="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
          <p class="text-sm text-gray-500 mt-2">Step 1 of 3</p>
        </div>

        <!-- Steps preview -->
        <div class="space-y-4 mb-8">
          <div class="flex items-center text-left">
            <div class="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
              1
            </div>
            <span class="text-gray-700">Tell us your company name</span>
          </div>
          <div class="flex items-center text-left">
            <div class="w-8 h-8 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
              2
            </div>
            <span class="text-gray-500">What's your product name?</span>
          </div>
          <div class="flex items-center text-left">
            <div class="w-8 h-8 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
              3
            </div>
            <span class="text-gray-500">What's the purpose of your landing page?</span>
          </div>
        </div>

        <!-- Start button -->
        <button 
          @click="startOnboarding"
          class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Let's Get Started
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGeneratorStore } from '@/stores/generator'

const router = useRouter()
const store = useGeneratorStore()

const startOnboarding = () => {
  store.resetOnboarding()
  router.push('/company-name')
}
</script>

<template>
	<div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center px-4">
		<div class="max-w-lg w-full">
			<!-- Completion Card -->
			<div class="bg-white rounded-lg shadow-lg p-8 text-center">
				<!-- Success Icon -->
				<div class="mb-6">
					<div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
							</path>
						</svg>
					</div>
					<h2 class="text-3xl font-bold text-gray-900 mb-2">
						Perfect! 🎉
					</h2>
					<p class="text-gray-600">
						We've collected all the information we need to create your landing page
					</p>
				</div>

				<!-- Summary -->
				<div class="bg-gray-50 rounded-lg p-6 mb-8 text-left">
					<h3 class="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
					<div class="space-y-3">
						<div>
							<span class="text-sm font-medium text-gray-500">Company:</span>
							<p class="text-gray-900">{{ store.onboarding.companyName }}</p>
						</div>
						<div>
							<span class="text-sm font-medium text-gray-500">Product:</span>
							<p class="text-gray-900">{{ store.onboarding.productName }}</p>
						</div>
						<div>
							<span class="text-sm font-medium text-gray-500">Purpose:</span>
							<p class="text-gray-900">{{ store.onboarding.purpose }}</p>
						</div>
					</div>
				</div>

				<!-- Actions -->
				<div class="space-y-4">
					<button @click="generateLandingPage" :disabled="store.isLoading"
						class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium">
						{{ store.isLoading ? 'Generating...' : '🚀 Generate My Landing Page' }}
					</button>

					<button @click="goBack"
						class="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-200">
						← Make Changes
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGeneratorStore } from '@/stores/generator'

const router = useRouter()
const store = useGeneratorStore()

// Methods
const generateLandingPage = async () => {
	// TODO: Implement landing page generation
	console.log('Generating landing page with data:', store.onboarding)

	// Simulate API call
	store.isLoading = true

	try {
		// This would be your actual API call
		await new Promise(resolve => setTimeout(resolve, 2000))

		// For now, just show success
		alert('Landing page generated successfully! (This is a demo)')
	} catch {
		store.setError('Failed to generate landing page. Please try again.')
	} finally {
		store.isLoading = false
	}
}

const goBack = () => {
	router.push('/purpose')
}

// Redirect if onboarding is not complete
if (!store.isOnboardingComplete) {
	router.push('/')
}
</script>

import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    build: {
        postcss: {
            postcssOptions: {
                plugins: {
                    tailwindcss: {},
                    autoprefixer: {},
                },
            },
        },
    },
    ssr: false,
    vite: {
        optimizeDeps: {
            include: [
                '@headlessui/vue',
                '@heroicons/vue/solid',
                '@heroicons/vue/outline',
                'vue',
            ]
        }
    } 
})

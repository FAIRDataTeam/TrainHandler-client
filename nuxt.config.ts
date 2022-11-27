// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    css: ['@/assets/main.scss'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: [
        '@pinia/nuxt',
    ],
    ssr: false,
    vite: {
        optimizeDeps: {
            include: [
                '@headlessui/vue',
                '@heroicons/vue/24/solid',
                '@heroicons/vue/24/outline',
                'vue',
            ]
        }
    },
    runtimeConfig: {
        public: {
            apiUrl: '',
            keycloakDisabled: '',
            keycloakUrl: '',
            keycloakRealm: '',
            keycloakClientId: '',
        }
    }
})

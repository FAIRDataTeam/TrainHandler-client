import { useKeycloak } from '@/stores/keycloak'

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig()
    const keycloakStore = useKeycloak()
    
    const defaultOpts = { baseURL: config.public.apiUrl }

    const withAuth = (obj) => {
        if (!keycloakStore.isSet()) {
            return obj
        }

        if (!obj.headers) {
            obj.headers = {}
        }

        obj.headers = { 
            ...obj.headers,
            'Authorization': `Bearer ${keycloakStore.keycloak.token}`
        }

        return obj
    }

    return {
        provide: {
            api: {
                get: (url) => $fetch(url, withAuth({ ...defaultOpts })),
                post: (url, data) => $fetch(url, withAuth({
                    ...defaultOpts,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: data,
                })),
                put: (url, data) => $fetch(url, withAuth({
                    ...defaultOpts,
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: data,
                })),
                delete: (url) => $fetch(url, withAuth({
                    ...defaultOpts,
                    method: 'DELETE',
                })),
                lazyFetch: (url) => useLazyFetch(url, withAuth({
                    ...defaultOpts,
                    key: typeof url === 'function' ? url() : url
                })),
                lazyFetchForm: (url, fields, callback) => {
                    const res = useLazyFetch(url, withAuth(defaultOpts))

                    watch(res.data, (newData) => {
                        callback(fields.map((field) => {
                            field.value = newData[field.name]
                            return field
                        }))
                    })

                    return res
                },
                download: async (url, fileName) => {
                    const blob = await $fetch(url, withAuth({ ...defaultOpts, responseType: 'blob' }))
                    const link = document.createElement('a')
                    link.href = URL.createObjectURL(blob)
                    link.download = fileName
                    link.click()
                    URL.revokeObjectURL(link.href)
                }
            }
        }
    }
})
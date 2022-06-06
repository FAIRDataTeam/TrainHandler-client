export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig()
    
    const defaultOpts = { baseURL: config.public.apiUrl }

    return {
        provide: {
            api: {
                get: (url) => $fetch(url, defaultOpts),
                post: (url, data) => $fetch(url, {
                    ...defaultOpts,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: data,
                }),
                put: (url, data) => $fetch(url, {
                    ...defaultOpts,
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: data,
                }),
                delete: (url) => $fetch(url, {
                    ...defaultOpts,
                    method: 'DELETE',
                }),
                lazyFetch: (url) => useLazyFetch(url, {
                    ...defaultOpts,
                    key: typeof url === 'function' ? url() : url
                }),
                lazyFetchForm: (url, fields, callback) => {
                    const res = useLazyFetch(url, defaultOpts)

                    watch(res.data, (newData) => {
                        callback(fields.map((field) => {
                            field.value = newData[field.name]
                            return field
                        }))
                    })

                    return res
                },
                download: async (url, fileName) => {
                    const blob = await $fetch(url, { ...defaultOpts, responseType: 'blob' })
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
export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig()

    return {
        provide: {
            api: {
                get: (url) => $fetch(`${config.API_URL}${url}`),
                post: (url, data) => $fetch(`${config.API_URL}${url}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: data,
                }),
                put: (url, data) => $fetch(`${config.API_URL}${url}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: data,
                }),
                delete: (url) => $fetch(`${config.API_URL}${url}`, {
                    method: 'DELETE',
                }),
                lazyFetch: (url) => useLazyFetch(`${config.API_URL}${url}`),
                lazyFetchForm: (url, fields, callback) => {
                    const res = useLazyFetch(`${config.API_URL}${url}`)

                    watch(res.data, (newData) => {
                        callback(fields.map((field) => {
                            field.value = newData[field.name]
                            return field
                        }))
                    })

                    return res
                },
            }
        }
    }
})
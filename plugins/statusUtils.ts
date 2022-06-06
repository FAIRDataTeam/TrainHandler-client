export default defineNuxtPlugin(nuxtApp => {
    return {
        provide: {
            statusUtils: {
                isInProgress: (status) => {
                    return ['PREPARED', 'QUEUED', 'SCHEDULED', 'RUNNING', 'ABORTING'].includes(status)
                }
            }
        }
    }
})

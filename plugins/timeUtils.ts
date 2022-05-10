import moment from 'moment'
import momentDurationFormatStup from 'moment-duration-format'

momentDurationFormatStup(moment)

export default defineNuxtPlugin(nuxtApp => {
    return {
        provide: {
            timeUtils: {
                getDuration: (start, finish) => {
                    if (start && finish) {
                        const startedAt = moment(start)
                        const finishedAt = moment(finish)
                        const duration = moment.duration(finishedAt.diff(startedAt))
                        return duration.format('h[h] mm[m] ss[s]')
                    }
                    return '-'
                }
            }
        }
    }
})

<script setup>
import _ from 'lodash'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';

const route = useRoute()
const { $api } = useNuxtApp()

const props = defineProps(['apiUrl', 'clientUrl', 'errorText', 'emptyText'])
const page = route.query.page || 1

const { pending, data, error } = $api.lazyFetch(`${props.apiUrl}?page=${page - 1}`)

const getPages = (data) => {
    const n = data.totalPages - 1
    const p = data.number
    return _.sortedUniq(
        _.sortBy(
            [0, 1, p - 2, p - 1, p, p + 1, p + 2, n - 1, n].filter((x) => x >= 0 && x <= n)
        )
    )
        .reduce((acc, x) => {
            if (x > 1 && _.last(acc) !== x - 1) {
                acc.push('...')
            }
            acc.push(x)
            return acc
        }, [])
}

const getPageLink = (page) => page === 0 ? props.clientUrl : `${props.clientUrl}?page=${page + 1}`
</script>
<template>
    <div class="max-w-screen-lg mx-auto px-6">
        <Loader class="mt-10" v-if="pending && !error" />
        <div class="mt-10 max-w-screen-lg mx-auto" v-else-if="error">
            <AlertError :text="errorText" />
        </div>
        <div class="mt-10 max-w-screen-lg mx-auto" v-else-if="data.content.length === 0">
            <AlertInfo :text="emptyText" />
        </div>
        <div v-else>
            <div class="mt-6 border border-gray-200 rounded-lg">
                <div v-for="(item, index) in data.content" :key="index"
                    class="py-3 px-4 w-full border-gray-200 flex justify-between items-center"
                    :class="index > 0 ? 'border-t' : ''">
                    <slot :item="item"></slot>
                </div>
            </div>

            <div class="mt-5 mb-10 sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p class="text-sm text-gray-700">
                        Showing
                        <span class="font-bold">{{ data.pageable.offset + 1 }}</span>
                        to
                        <span class="font-bold">{{ data.pageable.offset + data.numberOfElements }}</span>
                        of
                        <span class="font-bold">{{ data.totalElements }}</span>
                        entries
                    </p>
                </div>
                <div v-if="data.totalPages > 1">
                    <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <span v-if="data.first"
                            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-300 cursor-not-allowed">
                            <ChevronLeftIcon class="h-5 w-5" />
                        </span>
                        <NuxtLink v-else :to="getPageLink(data.number - 1)"
                            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <ChevronLeftIcon class="h-5 w-5" />
                        </NuxtLink>

                        <span v-for="(page, index) in getPages(data)" :key="index">
                            <span v-if="page === '...'"
                                class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                ...
                            </span>
                            <NuxtLink v-else :to="getPageLink(page)"
                                class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                :class="page === data.number ? 'z-10 bg-cyan-50 border-cyan-500 text-cyan-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'">

                                {{ page + 1 }}

                            </NuxtLink>
                        </span>
                        
                        <span v-if="data.last"
                            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-300 cursor-not-allowed">
                            <ChevronRightIcon class="h-5 w-5" />
                        </span>
                        <NuxtLink v-else :to="getPageLink(data.number + 1)"
                            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <ChevronRightIcon class="h-5 w-5" />
                        </NuxtLink>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

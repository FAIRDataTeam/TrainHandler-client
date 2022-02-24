<script lang="ts" setup>
import { ArrowSmRightIcon, DatabaseIcon, DocumentTextIcon, PlusIcon } from "@heroicons/vue/outline"

const items = [1, 2, 3]
</script>
<template>
    <div>
        <div class="w-full flex justify-between mb-5">
            <h1>Trains</h1>
            <div>
                <a
                    class="bg-cyan-600 border-cyan-600 hover:bg-cyan-500 hover:border-cyan-500 border rounded-full py-2 px-4 inline-flex items-center text-white cursor-pointer"
                >
                    <PlusIcon class="w-5 mr-2 inline-block" />Add train depot
                </a>
            </div>
        </div>
        <div class>
            <div
                v-for="(item, index) in items"
                :key="index"
                class="py-3 px-4 w-full border-b border-gray-200 hover:bg-gray-100 flex justify-between items-center"
                :class="index === 0 ? 'border-t' : ''"
            >
                <div>
                    <a href="#" class="font-bold inline-block hover:underline">Train {{ item }}</a>
                    <div class="text-gray-500">
                        <span class="mr-4">Train Garage Name</span>
                        <span class="mr-4">SPARQL</span>
                        <span class="mr-4 inline-flex align-middle">
                            <DatabaseIcon class="w-5 inline-block" />Triple Store
                            <ArrowSmRightIcon class="w-5 inline-block" />
                            <DocumentTextIcon class="w-5 inline-block" />RDF
                        </span>
                    </div>
                </div>
                <div>
                    <a href="#" class="text-cyan-700 hover:underline">
                        Depart
                        <ArrowSmRightIcon class="w-5 inline-block" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

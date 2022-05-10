<script setup>
const props = defineProps(['title', 'links', 'actions', 'wide'])
const emit = defineEmits(['action'])

const emitAction = (action) => {
    emit('action', action)
}
</script>
<template>
    <div class="bg-gray-50 pt-20 border-b border-gray-200">
        <div class="mx-auto" :class="wide ? 'px-6' : 'max-w-screen-lg'">
            <div class="flex mb-3 justify-between items-center">
                <slot>
                    <h1 class="pt-2">{{ title }}</h1>
                </slot>
                <div>
                    <span v-for="(action, index) in actions" :key="index">
                        <NuxtLink v-if="action.to" class="button button-sm ml-2"
                            :class="action.dangerous ? 'button-outline-danger' : 'button-outline-default'"
                            :to="action.to">{{ action.label }}
                        </NuxtLink>
                        <a v-else-if="action.emit" class="button button-sm ml-2"
                            :class="action.dangerous ? 'button-outline-danger' : 'button-outline-default'"
                            @click.prevent="emitAction(action.emit)">{{ action.label }}
                        </a>
                    </span>
                </div>
            </div>
            <div class="text-sm font-medium text-center text-gray-500 ">
                <ul class="flex flex-wrap -mb-px">
                    <li class="mr-2" v-for="(link, index) in links" :key="index">
                        <NuxtLink :to="link.to" class="inline-block px-4 py-3 rounded-t-lg border-b-2 "
                            :class="link.active ? 'text-cyan-600 border-cyan-600 active' : 'border-transparent hover:text-gray-600 hover:border-gray-300'">

                            {{ link.label }}</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
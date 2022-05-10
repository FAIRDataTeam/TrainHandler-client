<script setup>
import { reactive } from 'vue';
import useVuelidate from '@vuelidate/core'

const props = defineProps(['form'])
const emit = defineEmits(['submit', 'updated'])

const state = reactive(props.form.fields.reduce((acc, field) => {
    const defaultValue = field.type === 'multichoice' ? {} : ''
    acc[field.name] = field.value || defaultValue
    return acc
}, {}))

const rules = props.form.fields.reduce((acc, field) => {
    acc[field.name] = field.rules
    return acc
}, {})


const v$ = useVuelidate(rules, state)


const submit = async () => {
    const isFormCorrect = await v$.value.$validate()
    if (!isFormCorrect) return

    emit('submit', state)
}

const updated = () => {
    emit('updated', state)
}

const getComponent = (field) => field.type || 'input'
const getType = (field) => field.type === 'textarea' ? null : 'text'

</script>
<template>
    <form class="mt-5" @submit.prevent="submit">
        <div class="mb-5" v-for="field in form.fields" :key="field.name">
            <label class="block mb-1 text-sm font-medium">{{ field.label }}</label>
            <textarea
                v-if="field.type === 'textarea'"
                :type="getType(field)"
                v-model="state[field.name]"
                @blur="v$[field.name].$touch"
                class="border border-gray-300 text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full py-2 px-4"
                :class="{'border-red-600': v$[field.name].$error}"
            />
            <select
                v-else-if="field.type === 'select'"
                v-model="state[field.name]"
                @blur="v$[field.name].$touch"
                @change.prevent="updated"
                class="border border-gray-300 text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full py-2 px-4"
                :class="{'border-red-600': v$[field.name].$error}"
            >
                <option value="">- select -</option>
                <option v-for="option in field.options" :key="option.key" :value="option.key">
                    {{ option.value }}
                </option>
            </select>
            <div
                v-else-if="field.type === 'multichoice'"
            >
                <div v-if="field.options.length > 0">
                <label 
                    v-for="option in field.options" 
                    :key="option.key"
                    class="bg-gray-100 hover:bg-gray-200 text-sm rounded-lg flex items-center w-full py-2 px-4 mb-2"
                >
                    <input 
                        type="checkbox"
                        v-model="state[field.name][option.key]"
                        class="border border-gray-300 rounded-lg focus:ring-cyan-600 focus:border-cyan-600 accent-cyan-600 mr-1"
                    > 
                    {{ option.value }}
                </label>
                </div>
                <div 
                    v-else
                    class="text-gray-400 italic"
                >
                    {{ field.noOptions }}
                </div>
            </div>
            <input
                v-else
                :type="getType(field)"
                v-model="state[field.name]"
                @blur="v$[field.name].$touch"
                class="border border-gray-300 text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full py-2 px-4"
                :class="{'border-red-600': v$[field.name].$error}"
            />
            <p
                v-for="error of v$[field.name].$errors"
                :key="error.$uid"
                class="mt-1 text-sm text-red-600"
            >{{ error.$message }}</p>
        </div>
        <div>
            <input
                class="button button-primary"
                type="submit"
                :value="form.submit.label"
            />
        </div>
    </form>
</template>
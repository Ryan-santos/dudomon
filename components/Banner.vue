<template>
    <article
        class="relative z-0 flex h-full min-h-[calc(100svh+2rem)] flex-col items-center justify-center bg-background-100 pt-32 transition-all duration-500"
        :class="{
            'mb-12 pb-32 after:absolute after:bottom-0 after:h-8 after:w-full after:rounded-t-3xl after:bg-background after:transition-all after:duration-500': !props.unique,
            '-mb-12 pb-40': props.unique
        }"
    >
        <slot name="background">
            <div v-if="props.noImage" class="background absolute inset-0 -z-10" />
            <div v-else class="absolute inset-0 -z-10 bg-cover bg-fixed bg-center opacity-30" :style="`background-image: url('${image}')`" />
        </slot>
        <div class="container">
            <div v-if="props.title || props.description" class="mx-auto max-w-screen-md text-center">
                <h1 v-if="props.title" class="mb-8 text-[calc(2rem_+_1vw)] font-bold uppercase leading-tight">
                    {{ props.title }}
                </h1>
                <p v-if="props.description">
                    {{ props.description }}
                </p>
            </div>
            <slot />
        </div>
    </article>
</template>

<script setup lang="ts">
    const props = defineProps<{
        title?: string
        description?: string
        unique?: boolean
        noImage?: boolean
    }>();

    const imageName = useRoute().name?.toString().split("-").at(-1)?.toLowerCase();
    const image = props.noImage ? undefined : `/images/banner/${imageName}.jpg`;
</script>
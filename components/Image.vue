<template>
    <img
        :src="_src"
        loading="lazy"
    >
</template>

<script setup lang="ts">
    const props = defineProps<{
        src?: string
    }>();

    const _src = computed(() => {
        const urlRegex = /(https?|ftp):\/\/[^\s/$.?#].[^\s]*/g;
        const matches = props.src?.match(urlRegex);

        return matches ? props.src : `/images/${props.src}`;
    });
</script>
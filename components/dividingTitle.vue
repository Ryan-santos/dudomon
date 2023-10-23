<template>
    <div class="flex w-full flex-row items-center">
        <hr class="w-full">
        <h1 class="relative px-4 py-2 font-bold uppercase">
            {{ useCapitalize(title) }}
            <span class="absolute inset-y-0 left-0 h-full w-8 border border-current border-r-transparent opacity-20" />
            <span class="absolute inset-y-0 right-0 h-full w-8 rounded-r-full border border-current border-l-transparent opacity-20" />
        </h1>
        <hr class="w-full">
    </div>
</template>

<script setup lang="ts">
    defineProps<{
        title: string
    }>();
</script>
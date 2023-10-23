<template>
    <component
        :is="href ? NuxtLink : 'button'"
        :href="href"
        class="
            group/button
            relative
            inline-block
            select-none
            rounded-r-full
            text-center
            text-lg
            font-semibold
            tracking-wide
            transition-all
            duration-300

            before:absolute
            before:inset-y-0
            before:left-0
            before:h-full
            before:w-0
            before:rounded-e-full
            before:opacity-0
            before:transition-all
            before:duration-500

            hover:before:w-full
            hover:before:opacity-100

            disabled:pointer-events-none
            disabled:cursor-not-allowed

            activated:cursor-not-allowed
            activated:before:w-full
            activated:before:opacity-100
        "
        :class="[_color, {'activated': activated}]"
    >
        <span
            class="relative z-10 flex w-full flex-row items-center justify-center gap-2"
            :class="{'px-4 py-2': !noPadding}"
        >
            <slot />
        </span>
    </component>
</template>

<script setup lang="ts">
    import { NuxtLink } from "#components";

    const colors = /* @tw */ {
        primary: [
            "bg-primary text-black before:bg-contrast",
            "hover:text-background",
            "activated:text-background"
        ],
        contrast: [
            "bg-contrast text-background before:bg-primary",
            "hover:text-black"
        ],
        background: [
            "bg-background text-contrast before:bg-primary",
            "hover:text-black"
        ],
        white: [
            "text-black bg-white before:bg-white",
            "hover:text-white",
            "activated:text-white activated:bg-primary"
        ],
        black: [
            "text-white bg-black before:bg-black",
            "hover:text-black",
            "activated:text-black activated:bg-primary"
        ],
        danger: [
            "text-white bg-danger before:bg-contrast",
            "hover:text-danger",
            "activated:text-danger"
        ],
        success: [
            "text-white bg-success before:bg-contrast",
            "hover:text-success",
            "activated:text-success"
        ],
        twitch: [
            "bg-twitch text-white before:bg-contrast",
            "hover:text-twitch",
            "activated:text-twitch"
        ],
        outline: [
            "border border-contrast/20 before:bg-primary",
            "hover:text-black hover:border-primary"
        ],
        outline_white: [
            "border border-white/20 before:bg-primary",
            "hover:text-black hover:border-primary"
        ],
        outline_black: [
            "border border-black/20 before:bg-primary",
            "hover:text-black hover:border-primary"
        ],
        custom: "before:bg-primary hover:text-black activated:text-black",
        customFul: ""
    };

    const props = withDefaults(defineProps<{
        color?: keyof typeof colors
        noPadding?: boolean
        activated?: boolean
        href?: string
    }>(), {
        color: "primary",
        noPadding: false,
        activated: false,
        href: ""
    });

    const _color = computed(() => {
        return colors[props.color];
    });
</script>
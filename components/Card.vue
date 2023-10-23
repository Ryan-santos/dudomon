<template>
    <div
        class="flex flex-col text-center"
        :class="[props.higherClass, _size, _padding, _background, _border, {'animate-pulse': !$slots.default && props.pending}]"
    >
        <slot name="persist" />

        <TransitionScale
            mode="out-in"
        >
            <div v-if="$slots.default && !props.pending" v-bind="$attrs">
                <slot />
            </div>
            <div
                v-else
                class="flex h-full w-full flex-col items-center justify-center"
                :class="{'p-6': props.noPadding}"
            >
                <Icon
                    key="1"
                    name="svg-spinners:90-ring-with-bg"
                    size="4rem"
                    class="text-primary"
                />
            </div>
        </TransitionScale>
    </div>
</template>

<script setup lang="ts">
    import type { BaseColors } from "~/types/tailwind";

    defineOptions({
        inheritAttrs: false
    });

    const props = withDefaults(defineProps<{
        size?: "sm" | "md"
        background?: BaseColors | "transparent"
        border?: BaseColors | "transparent"
        pending?: boolean
        higherClass?: string | object
        noPadding?: boolean
    }>(), {
        size: "md",
        background: "background-100",
        border: "transparent",
        higherClass: ""
    });

    const _size = {
        sm: "rounded-2xl",
        md: "rounded-3xl"
    }[props.size];

    let _padding = {
        sm: "p-4",
        md: "p-4 sm:p-6"
    }[props.size];

    _padding = props.noPadding ? "" : _padding;

    let _background = {
        white: "bg-white",
        "white-100": "bg-white-100",
        black: "bg-black",
        "black-100": "bg-black-100",
        background: "bg-background",
        "background-100": "bg-background-100",
        contrast: "bg-contrast",
        "contrast-100": "bg-contrast-100",
        transparent: ""
    }[props.background];

    _background = _background ? `${_background} shadow-md` : _background;

    let _border = {
        white: "border-white/10",
        "white-100": "border-white-100/10",
        black: "border-black/10",
        "black-100": "border-black-100/10",
        background: "border-background/10",
        "background-100": "border-background-100/10",
        contrast: "border-contrast/10",
        "contrast-100": "border-contrast-100/10",
        transparent: ""
    }[props.border];

    _border = _border ? `${_border} border` : _border;
</script>
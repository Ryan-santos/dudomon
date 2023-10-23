<template>
    <ClientOnly fallback="tema...">
        <button class="relative" @click="toggle">
            <span
                v-if="min"
                class="transition-all duration-300 hover:text-primary"
            >
                <TransitionScale
                    mode="out-in"
                >
                    <Icon
                        v-if="isDark"
                        key="1"
                        :name="icon.dark"
                        size="1.5rem"
                    />
                    <Icon
                        v-else
                        key="2"
                        :name="icon.light"
                        size="1.5rem"
                    />
                </TransitionScale>
            </span>
            <label
                v-else
                class="relative z-0 block h-auto w-auto cursor-pointer rounded-e-full border text-opacity-50"
                :class="_color"
            >
                <span
                    class="absolute inset-0 block h-full w-1/2 transition-all duration-300 ease-linear"
                    :class="{'translate-x-full': $colorMode.value == 'dark'}"
                >
                    <span class="block h-full w-full rounded-e-full bg-primary" />
                </span>
                <div class="flex items-center justify-between text-lg">
                    <Icon
                        :name="icon.light"
                        class="p-1 transition-all duration-300 ease-linear"
                        size="1.5rem"
                        :class="{'relative text-black': !isDark}"
                    />
                    <Icon
                        :name="icon.dark"
                        class="p-1 transition-all duration-300 ease-linear"
                        size="1.5rem"
                        :class="{'relative text-black': isDark}"
                    />
                </div>
            </label>
        </button>
    </ClientOnly>
</template>

<script setup lang="ts">
    const props = withDefaults(defineProps<{
        color?: "white" | "white-100" | "black" | "black-100" | "auto" | "auto-100"
        min?: boolean
    }>(), {
        color: "auto"
    });

    const colorMode = useColorMode();

    const _color = computed(() => {
        return {
            white: "bg-white text-black border-black/10",
            "white-100": "bg-white-100 text-black border-black/10",
            black: "bg-black-100 text-white border-white/10",
            "black-100": "bg-black text-white border-white/10",
            auto: "bg-background text-contrast border-contrast/10",
            "auto-100": "bg-background-100 text-contrast border-contrast/10"
        }[props.color];
    });

    const icon = {
        dark: "akar-icons:moon-fill",
        light: "tabler:sun-filled"
    };

    const isDark = computed(() => {
        return colorMode.value === "dark";
    });

    const toggle = () => {
        colorMode.preference = isDark.value ? "light" : "dark";
    };
</script>
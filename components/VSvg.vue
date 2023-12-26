<!-- eslint-disable vue/no-v-html -->
<template>
    <span
        class="_SVG block"
        :class="{ '_SVG_CURRENTCOLOR': currentcolor }"
        v-html="icon"
    />
</template>

<script setup lang="ts">
    const props = withDefaults(defineProps<{
        name: string;
        currentcolor?: boolean
        preRender?: boolean
    }>(), {
        currentcolor: false,
        preRender: false
    });

    const icon = ref(`<span class="text-warn animate-ping">${props.name}...</span>`);

    const getIcon = async () => {
        try {
            const iconsImport = import.meta.glob("/assets/svg/**/**.svg", {
                as: "raw",
                eager: false
            });
            const rawIcon = await iconsImport[`/assets/svg/${props.name}.svg`]();
            icon.value = rawIcon;
        }
        catch {
            console.error(
                `[SVG] Svg '${props.name}' não existe em 'assets/svg'`
            );
        }
    };

    if (props.preRender) {
        await getIcon();
    }

    watchEffect(getIcon);
</script>

<style>
    ._SVG svg {
        width: 100%;
        height: auto;
    }

    ._SVG._SVG_CURRENTCOLOR,
    ._SVG._SVG_CURRENTCOLOR * {
        fill: currentColor !important;
    }
</style>
<template>
    <footer class="relative z-10 rounded-t-3xl border-t border-contrast/10 bg-background-100">
        <div class="container flex flex-row flex-wrap items-center justify-center gap-8 pb-6 pt-12 lg:justify-between">
            <VSvg name="logo" class="max-w-xs" />
            <div class="flex flex-row flex-wrap justify-center gap-6">
                <Button
                    v-for="(value, key) in medias"
                    :key="key"
                    :href="value.url"
                    target="_blank"
                    color="customFul"
                    class="border border-contrast/20"
                    :class="value.classHover"
                >
                    <Icon :name="value.icon" size="1.5rem" />
                </Button>
            </div>
            <hr class="w-full grow">
            <div class="flex flex-row items-center gap-4">
                <ButtonTheme color="auto" />
                <span class="h-7 w-px bg-contrast/20" />
                <NuxtLink href="/politica-de-privacidade" class="link">
                    Política de privacidade
                </NuxtLink>
            </div>
            <p>
                © {{ new Date().getFullYear() }}. Todos os direitos reservados.
            </p>
            <a href="https://ryancode.dev?ref=dudomon" target="_blank">
                <VSvg name="ryan" class="w-full max-w-[7rem]" />
            </a>
        </div>
    </footer>
</template>

<script setup lang="ts">
    const medias = useGroupsLinks().medias.links;
</script>
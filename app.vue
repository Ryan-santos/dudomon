<template>
    <NuxtLayout>
        <Head>
            <Link rel="icon" href="/favicon/favicon.ico" sizes="any" />
            <Link rel="icon" href="/favicon/1.icon.png" type="image/png" sizes="16x16" />
            <Link rel="icon" href="/favicon/2.icon.png" type="image/png" sizes="32x32" />
            <Link rel="icon" href="/favicon/3.icon.png" type="image/png" sizes="192x192" />
            <Link rel="icon" href="/favicon/4.icon.png" type="image/png" sizes="512x512" />
            <Link rel="icon" href="/favicon/apple-icon.png" type="image/png" sizes="180x180" />
            <Link rel="apple-touch-icon" href="/favicon/apple-icon.png" type="image/png" sizes="180x180" />

            <Meta name="author" content="https://ryancode.dev" />

            <Meta name="twitter:image:src" :content="ogImage" />
            <Meta name="twitter:image:width" content="796" />
            <Meta name="twitter:image:height" content="418" />
            <Meta name="twitter:image:type" content="image/png" />
            <Meta name="twitter:card" content="summary_large_image" />

            <Meta property="og:type" content="website" />
            <Meta property="og:image" :content="ogImage" />
            <Meta property="og:image:width" content="796" />
            <Meta property="og:image:height" content="418" />
            <Meta property="og:image:type" content="image/png" />
        </Head>

        <NuxtLoadingIndicator color="#FFCB00" :height="5" />
        <NuxtPage />

        <ClientOnly>
            <Transition
                enterFromClass="translate-y-full opacity-0"
                leaveToClass="translate-y-full opacity-0"
                appear
            >
                <div v-if="!cookies" class="fixed inset-x-0 bottom-0 z-40 w-full overflow-hidden rounded-t-3xl bg-contrast-100 p-4 text-center text-background shadow-md transition-all duration-500 sm:inset-x-auto sm:bottom-8 sm:left-8 sm:max-w-[20rem] sm:rounded-b-3xl">
                    <Icon name="noto:cookie" size="15rem" class="absolute left-0 top-1/2 -z-10 -translate-x-1/3 -translate-y-1/2 opacity-20" />
                    <p class="mb-6">
                        Utilizamos <Icon name="noto:cookie" /> cookies e outras tecnologias de rastreamento para melhorar a sua experiência no site.
                    </p>
                    <div class="flex w-full flex-col gap-4 xs:flex-row">
                        <NuxtLink href="/politica-de-privacidade" class="link text-sm">
                            Política de Privacidade
                        </NuxtLink>
                        <Button color="background" class="w-full" @click="cookies = 'accepted'">
                            OK, aceito
                        </Button>
                    </div>
                </div>
            </Transition>
        </ClientOnly>
    </NuxtLayout>
</template>

<script setup lang="ts">
    const cookies = useCookie("cookies", {
        secure: true,
        maxAge: 365 * 24 * 60 * 60
    });

    const ogImages = Object.keys(import.meta.glob("public/og_image/**/*.png", { as: "url", eager: true }));

    const ogImage = computed(() => {
        const requestURL = useRequestURL();
        const pathname = requestURL.pathname === "/" ? "/home" : requestURL.pathname;
        const search = `/public/og_image${pathname}.png`;
        const res = ogImages.includes(search) ? search.replace("/public/", "") : "og_image/default.png";
        return `${requestURL.origin}/${res}`;
    });
</script>

<style lang="postcss">
    .page-enter-active,
    .page-leave-active,
    .layout-enter-active,
    .layout-leave-active {
        @apply transition-all duration-500 ease-in-out
    }

    .page-enter-from,
    .page-leave-to {
        @apply opacity-0 blur-md translate-y-8
    }

    .layout-enter-from,
    .layout-leave-to {
        @apply blur-sm opacity-0
    }
</style>
<template>
    <main class="background">
        <section class="container flex min-h-full max-w-screen-sm flex-col gap-12 py-12 text-center">
            <div class="flex flex-col items-center justify-center gap-8 xs:flex-row">
                <div class="relative">
                    <Image
                        src="profile.png"
                        sizes="70"
                        width="70"
                        alt="Eduardo"
                        class="rounded-full"
                        :class="{'border-2 border-red-600': liveOn}"
                    />
                    <span v-if="liveOn" class="absolute inset-x-0 bottom-0 whitespace-nowrap rounded bg-red-600 p-px text-xs font-black text-white shadow-md">
                        AO VIVO
                    </span>
                </div>
                <VSvg name="logo" class="max-w-xs" />
            </div>
            <p>
                Me acompanhe para ficar por dentro de todas as novidades incríveis no mundo do Moba Mobile!
            </p>
            <a v-if="YT" :href="YT?.link" target="_blank" class="group rounded-3xl bg-youtube p-1 text-white transition-all duration-300 hover:bg-primary hover:text-black">
                <div class="relative overflow-hidden rounded-3xl">
                    <Image
                        :src="YT?.thumbnail"
                        :alt="YT?.title"
                        sizes="400 xs:650"
                        class="transition-all duration-500 group-hover:scale-105"
                    />
                    <div class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-row items-center rounded-l-3xl rounded-r-full bg-youtube p-3 text-left transition-[background-color] duration-300 group-hover:bg-primary">
                        <span class="whitespace-nowrap font-bold sm:text-lg">
                            Ver video novo
                        </span>
                        <Icon name="fluent:play-48-filled" size="2rem" />
                    </div>
                </div>
                <h4 class="p-4 font-semibold sm:p-6">
                    {{ YT?.title }}
                </h4>
            </a>
            <template v-for="(group, _key) in groupsLinks" :key="_key">
                <DividingTitle :title="group.title" />
                <div class="grid gap-10 xs:grid-cols-2">
                    <Button
                        v-for="(value, key) in group.links"
                        :key="key"
                        :href="value.url"
                        :target="value.url === '/' ? null : '_blank'"
                        noPadding
                        color="custom"
                        class="p-4"
                        :class="value.class"
                    >
                        <span v-if="liveOn && key === 'twitch'" class="absolute right-0 top-0 -mt-4 flex -translate-y-1/2 rounded-full bg-red-600 px-2 py-1 text-white">
                            <span class="absolute inset-0 animate-ping rounded-full bg-red-600 opacity-75" />
                            <Icon name="fluent:live-24-filled" />
                        </span>
                        <Icon :name="value.icon" size="1.5rem" />
                        {{ value.name }}
                    </Button>
                </div>
            </template>
            <hr>
            <div class="flex flex-col items-center justify-between gap-8 sm:flex-row">
                <ButtonTheme color="auto-100" />
                <p>
                    © {{ new Date().getFullYear() }}. Todos os direitos reservados.
                </p>
                <a href="https://ryancode.dev" target="_blank">
                    <VSvg name="ryan" class="w-full max-w-[7rem]" />
                </a>
            </div>
        </section>

        <LayoutPopUpTwitch />
    </main>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: "custom"
    });

    useSeoMeta({
        title: "Central de links",
        description: "Descubra as últimas novidades do mundo do Moba Mobile em minhas redes sociais e grupos. Mantenha-se atualizado!"
    });

    const YT = await useYT(1);
    const liveOn = ref(false);

    const groupsLinks = useGroupsLinks();

    groupsLinks.medias.links.site = {
        name: "Site",
        icon: "icon-park-solid:web-page",
        url: "/",
        class: "bg-contrast text-background"
    };

    onMounted(() => {
        watch(useNuxtData("twitchStream").data, (value) => {
            liveOn.value = !!value;
        });
    });
</script>
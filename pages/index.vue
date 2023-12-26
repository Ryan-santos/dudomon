<template>
    <section>
        <Banner
            title="Transmitindo diversão e informação para seu dia"
            description="Minha missão é proporcionar diversão e conhecimento às pessoas, compartilhando meu entusiasmo pelos jogos mobile, especialmente através dos meus vídeos sobre Honor of Kings, que é um dos jogos mobile mais amados em todo o mundo."
        >
            <template #background>
                <div class="absolute inset-0 -z-10 grid gap-1 opacity-20" :class="classGrid">
                    <!-- eslint-disable-next-line vue/valid-v-for -->
                    <Transition
                        v-for="(id, index) in videos"
                        enterFromClass="blur-sm scale-95"
                        leaveToClass="blur-sm scale-95"
                        mode="out-in"
                        appear
                    >
                        <video
                            :key="id"
                            :src="`/videos/${id}.mp4`"
                            muted
                            autoplay
                            class="pointer-events-none h-full w-full rounded-lg object-cover object-left-bottom transition-all duration-500"
                            @ended="toggleBanner(index)"
                            @error="toggleBanner(index)"
                        />
                    </Transition>
                </div>
            </template>
        </Banner>

        <article class="container mb-24">
            <Vakinha class="mx-auto lg:flex-row-reverse" />
        </article>

        <article class="container mb-24">
            <DividingTitle title="videos" class="mb-12" />
            <p class="mx-auto mb-8 max-w-screen-lg text-center">
                Diariamente, ao meio-dia, um vídeo fresquinho aguarda por você. Nele, você encontrará uma mistura envolvente de dicas, informações e gameplays, tudo apresentado com um toque contagiante de bom humor e diversão!
            </p>
            <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 xl:grid-cols-4">
                <a
                    v-for="value, key in YT"
                    :key="key"
                    :href="value.link"
                    target="_blank"
                    class="group relative z-10 block overflow-hidden rounded-3xl shadow-lg outline outline-2 outline-transparent transition-all duration-500 hover:outline-primary"
                    :class="{'lg:col-span-3 lg:row-span-3': key === 0}"
                >
                    <Image
                        :src="value.thumbnail"
                        :alt="value.title"
                        :sizes="key === 0 ? '450px lg:1120px' : '450px'"
                        class="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                    />
                    <div v-if="key === 0" class="absolute left-0 top-0 z-10 m-4 rounded-full bg-youtube px-3 py-1 font-bold text-white">
                        <Icon name="bi:youtube" />
                        <span class="font-black">
                            Novo
                        </span>
                    </div>
                    <div class="absolute inset-0 h-full w-full translate-y-full bg-gradient-to-t from-black to-black/0 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <p
                            class="absolute bottom-0 z-10 p-4 text-white transition-all duration-500 group-hover:text-primary"
                            :class="{'lg:text-2xl lg:font-bold': key === 0}"
                        >
                            {{ value.title }}
                        </p>
                    </div>
                </a>
            </div>
        </article>

        <article class="container mb-24 flex flex-col items-center justify-center gap-12 lg:flex-row">
            <VSvg name="groups" class="hidden max-w-screen-xs lg:block" />
            <div class="max-w-screen-sm">
                <DividingTitle title="grupos" class="mb-12" />
                <VSvg name="groups" class="mx-auto mb-8 max-w-xs lg:hidden" />
                <p class="mb-8">
                    Junte-se a nós nos grupos! Lá, você encontrará discussões envolventes e pessoas com quem poderá formar equipes para fazer aquele rush na ranqueada. Aproveite a oportunidade para conectar-se e compartilhar ideias com pessoas incríveis!
                </p>
                <p class="mb-8 text-sm opacity-50">
                    Para uma convivência harmoniosa, Por favor, siga as regras descritas no grupo.
                </p>
                <div class="grid gap-8 xs:grid-cols-2">
                    <Button
                        v-for="(value, key) in groupsLinks.groups.links"
                        :key="key"
                        :href="value.url"
                        target="_black"
                        color="custom"
                        :class="value.class"
                    >
                        <Icon :name="value.icon" />
                        {{ useCapitalize(value.name) }}
                    </Button>
                </div>
            </div>
        </article>

        <article class="container mb-24 text-center">
            <div class="mb-8 grid gap-8 overflow-hidden rounded-3xl bg-background-100 shadow md:grid-cols-2 md:gap-0">
                <div
                    v-for="(benefit, key) in benefits"
                    :key="key"
                    class="relative overflow-hidden rounded-3xl px-4 py-8 md:p-8"
                    :class="benefit.class"
                >
                    <Icon
                        :name="benefit.icon"
                        size="15rem"
                        class="mask-transparent absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 opacity-50 [--deg:300deg] [--percentage:0%]"
                    />
                    <div class="flex flex-row justify-center gap-4">
                        <Icon :name="benefit.icon" size="2rem" />
                        <h2 class="mb-8 font-black">
                            Seja {{ key.toUpperCase() }}!
                        </h2>
                    </div>
                    <ul class="mb-8 flex flex-col gap-4">
                        <li v-for="(item, key2) in benefit.list" :key="key2">
                            {{ item }}.
                        </li>
                        <li class="opacity-50">
                            *Mais benefícios em breve
                        </li>
                    </ul>
                    <Button :href="benefit.link" target="_black">
                        torna-se {{ key.toUpperCase() }}
                    </Button>
                </div>
            </div>
            <p>
                Você pode desfrutar simultaneamente dos dois benefícios
            </p>
        </article>

        <article class="container mb-24 text-center">
            <DividingTitle title="doação" class="mb-12" />
            <p class="mx-auto mb-6 max-w-screen-lg">
                Se você aprecia meu trabalho e deseja apoiar o canal diretamente, basta apontar sua câmera para um dos QR codes abaixo ou clicar neles para fazer uma doação no valor que achar adequado. Desde já, agradeço imensamente pelo seu apoio!
            </p>
            <div class="flex w-full flex-wrap items-stretch justify-center gap-8">
                <a
                    v-for="(value, key) in donations"
                    :key="key"
                    :href="value?.link"
                    target="_blank"
                    class="flex max-w-sm flex-col rounded-3xl bg-background-100 p-4 shadow-sm"
                    :class="{'transition-all duration-500 hover:bg-primary hover:text-black': value?.link}"
                >
                    <Image
                        :src="`donation/${value.name.replaceAll(' ', '').toLowerCase()}.jpg`"
                        sizes="450px"
                        :alt="value.name"
                        class="mb-6 rounded-3xl"
                    />
                    <span class="text-sm">
                        {{ value?.detail }}
                    </span>
                    <h3 class="my-auto font-medium">
                        {{ value.name }}
                    </h3>
                </a>
            </div>
        </article>
    </section>
</template>

<script setup lang="ts">
    definePageMeta({
        name: "home"
    });

    useSeoMeta({
        title: "Tornando você um jogador melhor.",
        description: "Divirta-se e aprenda comigo, estou aqui para ajudar você a ser um jogador melhor!"
    });

    const videos = ref<number[]>([]);
    const length = 20;
    const classGrid = ref("");

    const toggleBanner = (index: number) => nextTick(() => {
        let newId = 1;

        while (true) {
            newId = Math.floor(Math.random() * (length - 1 + 1)) + 1;
            if (!videos.value.includes(newId)) {
                break;
            }
        }

        videos.value[index] = newId;
    });

    const YT = await useYT();
    const groupsLinks = useGroupsLinks();
    const twitch = groupsLinks.medias.links.twitch;
    const benefits = {
        sub: {
            icon: "tabler:star-filled",
            class: "bg-twitch text-white",
            list: [
                "Desbloqueie 17 emotes exclusivos para utilizar no chat",
                "Receba um distintivo exclusivo, variando de acordo com o tempo em que você faz parte da comunidade",
                "Receba 1.2 vezes mais pontos do Canal",
                "Desfrute de visualização sem anúncios",
                "Desbloqueie a compra de áudios exclusivos na loja",
                "Ganha a possibilidade de contribuir em novas playsLists da live"
            ],
            link: "https://www.twitch.tv/products/dudomon"
        },
        vip: {
            icon: "ri:vip-diamond-fill",
            class: "text-twitch",
            list: [
                "Imunidade ao modo lento do chat",
                "Imunidade ao modo (somente emotes) do chat",
                "Recebe um distintivo exclusivo"
            ],
            link: twitch.url
        }
    };

    const donations = [
        {
            name: "LivePix",
            link: "https://livepix.gg/dudomonofc"
        },
        {
            name: "Pic Pay",
            detail: "Pix: contatodudomon@gmail.com"
        }
    ];

    const screenXS = useIsScreen("xs");
    const screenMD = useIsScreen("md");
    const screenLG = useIsScreen("lg");

    onMounted(() => {
        watch([screenXS, screenMD, screenLG], () => setTimeout(() => {
            videos.value = [];
            let length = 0;

            if (screenLG.value) {
                length = 8;
                classGrid.value = "grid-cols-4 grid-rows-2";
            }
            else if (screenMD.value) {
                length = 6;
                classGrid.value = "grid-cols-3 grid-rows-2";
            }
            else if (screenXS.value) {
                length = 4;
                classGrid.value = "grid-cols-2 grid-rows-2";
            }
            else {
                length = 6;
                classGrid.value = "grid-cols-2 grid-rows-3";
            }

            for (let index = 0; index <= (length - 1); index++) {
                setTimeout(() => {
                    toggleBanner(index);
                }, 200 * index);
            }
        }, 1000), {
            immediate: true
        });
    });
</script>
<template>
    <Transition
        enterActiveClass="transition-all duration-500"
        enterFromClass="opacity-0 translate-y-full"

        leaveActiveClass="transition-all duration-500"
        leaveToClass="opacity-0 translate-y-full"

        :duration="500"
        appear
    >
        <div v-if="open" class="fixed inset-x-0 bottom-0 z-30 overflow-hidden rounded-t-2xl bg-primary p-4 text-center text-black sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-xs sm:rounded-2xl">
            <Image
                :src="data?.image"
                alt="capa do jogo"
                loading="lazy"
                class="mask-transparent absolute inset-y-0 left-0 -z-10 h-full opacity-70 [--deg:90deg] [--percentage:0%]"
            />
            <h4 class="mb-8 font-black uppercase">
                <span class="relative text-red-600">
                    <span class="absolute inset-0 animate-ping rounded-full bg-red-600 opacity-75" />
                    <Icon name="fluent:live-24-filled" size="2rem" />
                </span>
                Estou ao vivo!
            </h4>
            <p class="mb-8 hidden sm:block">
                {{ data?.title }}
            </p>
            <div class="flex flex-row gap-6">
                <Button :href="link" target="_blank" color="customFul" class="w-full bg-twitch text-white before:bg-white hover:text-twitch">
                    <Icon name="bi:twitch" />
                    Assistir
                </Button>
                <Button color="customFul" class="whitespace-nowrap border border-black/20 before:bg-red-600 hover:border-red-600 hover:text-white" @click="toggle()">
                    Agora não
                </Button>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
    const link = useGroupsLinks().medias.links.twitch.url;
    const cookie = useCookie("PopUpTwitch", {
        maxAge: 1 * 60 * 60
    });

    const open = ref(false);

    const toggle = () => {
        open.value = !open.value;

        if (!open.value) {
            cookie.value = "closed";
        }
    };

    const { data } = await useLazyFetch("/api/twitch/stream", {
        transform (response) {
            if (response) {
                response.image = response?.image.replace("{width}", "300");
                response.image = response?.image.replace("{height}", "400");
            }

            return response;
        },

        key: "twitchStream"
    });

    watch(data, () => {
        if (data.value && !cookie.value) {
            toggle();
        }
    });
</script>
<template>
    <section>
        <Banner
            title="Som na caixa DJ!"
            description="Confira as variadas playlists que rolam durante as lives, e se você for um inscrito (SUB), poderá contribuir para a criação de novas playlists de tempos em tempos."
        />

        <DevOnly>
            <article v-if="playlists?.new_playlist" class="container mb-12">
                <div class="selection-black flex flex-col rounded-3xl bg-primary text-black shadow-md lg:flex-row">
                    <iframe
                        ref="newPlayList"
                        :src="spotifyEmbed(playlists.new_playlist.playlistId)"
                        class="h-[35rem] rounded-3xl lg:w-1/2"
                        loading="lazy"
                    />
                    <div class="flex flex-col justify-center px-6 pt-6 text-center lg:w-1/2" :class="{'pb-6': !search.data.value}">
                        <h3 class="mb-6 font-bold transition-all duration-500" :class="{'text-4xl': !search.data.value}">
                            Estamos criando uma nova playlist para live! Participe!
                        </h3>
                        <p class="mb-6 flex flex-row flex-wrap items-center justify-center gap-2 text-sm">
                            Gêneros permitidos:
                            <span v-for="genre in playlists.new_playlist.genres" :key="genre" class="rounded bg-black/10 px-2 py-1 font-bold uppercase">
                                {{ genre }}
                            </span>
                        </p>
                        {{ userInsertsTracks.data.value }}
                        <input
                            v-model="inputSearch"
                            type="text"
                            placeholder="Good Lesson - Bastille"
                            class="mx-auto w-[15rem] rounded-e-full border border-black/50 bg-transparent px-3 py-2 outline-none transition-all duration-500 placeholder:text-black/40 focus:w-full"
                            :class="{'!w-full': search.data.value}"
                        >
                        <div class="mask-transparent-border relative text-left transition-all duration-300" :class="{'grow': search.data.value}">
                            <TransitionGroup
                                enterFromClass="opacity-0 blur-md"
                                leaveActiveClass="!absolute"
                                leaveToClass="opacity-0 blur-md"

                                tag="ul"
                                class="scrollbar absolute inset-0 flex w-full flex-col gap-6 overflow-auto py-6 pl-1 pr-2"
                            >
                                <li
                                    v-for="track in search.data.value"
                                    :key="track.id"
                                    class="relative flex h-28 w-full cursor-pointer flex-row items-center rounded-2xl bg-background text-contrast shadow-md outline outline-2 outline-transparent transition-all duration-500 hover:bg-transparent hover:text-black hover:outline-black"
                                    @click="trackId = track.id"
                                >
                                    <Image :src="track.image" class="aspect-square h-full rounded-2xl" />
                                    <div class="w-full p-3">
                                        <span class="line-clamp-1 text-xs">
                                            {{ track.album }}
                                        </span>
                                        <h3 class="my-1 line-clamp-1 font-bold">
                                            {{ track.name }}
                                        </h3>
                                        <span class="line-clamp-1 text-sm font-medium">
                                            {{ track.artists.join(" | ") }}
                                        </span>
                                        <span class="absolute inset-y-0 right-0 -z-0 overflow-hidden">
                                            <Icon name="bi:spotify" size="6rem" class="mask-transparent relative top-1/2 -translate-y-1/2 translate-x-1/3 opacity-50 [--deg:270deg] [--percentage:0%]" />
                                        </span>
                                    </div>
                                </li>
                            </TransitionGroup>
                        </div>
                    </div>
                </div>
            </article>
        </DevOnly>

        <article class="container mb-12 grid gap-12 md:grid-cols-2">
            <Card
                v-for="(item, key) in playlists?.playlists"
                :key="key"
                noPadding
                class="flex h-full w-full flex-col"
                :higherClass="['h-[30rem]', {'!bg-primary': isPlaying(item)}]"
                :pending="!playlists?.playlists"
            >
                <h4 v-if="isPlaying(item)" class="p-3 text-center font-bold text-black">
                    Tocando agora na live
                </h4>
                <iframe
                    :src="spotifyEmbed(item)"
                    class="h-full w-full rounded-3xl"
                    loading="lazy"
                />
            </Card>
        </article>
    </section>
</template>

<script setup lang="ts">
    import type { Database } from "~/types/database";

    definePageMeta({
        icon: "fluent:music-note-1-24-filled"
    });

    const supabase = useSupabaseClient<Database>();
    const user = useSupabaseUser();

    useSeoMeta({
        title: "JukeBox",
        description: "Descubra nossas variadas playlists que tocam nas lives. torna-se inscrito (SUB) e participe na criação de novas!"
    });

    const { data: playlists } = await useLazyFetch("/api/spotify/playlists", {
        key: "spotifyPlaylists"
    });

    const spotifyEmbed = (id: string) => {
        return `https://open.spotify.com/embed/playlist/${id}`;
    };

    const isPlaying = (id: string) => {
        return id === playlists.value?.playing;
    };

    const inputSearch = ref("");

    const search = await useLazyFetch("/api/spotify/search", {
        params: {
            search: inputSearch
        },
        immediate: false
    });

    const trackId = ref("");

    const setTrack = await useLazyFetch("/api/spotify/playlists", {
        method: "POST",
        headers: useRequestHeaders(["cookie"]),
        params: {
            trackId
        },
        immediate: false
    });

    const newPlayList = ref<HTMLIFrameElement>();

    watch(setTrack.pending, (p) => {
        if (newPlayList.value && !p) {
            const src = newPlayList.value.src;
            newPlayList.value.src = "";
            newPlayList.value.src = src;

            inputSearch.value = "";
        }
    });

    const userInsertsTracks = useLazyAsyncData("userInsertsTracks", async () => {
        const { data } = await supabase
            .from("jukebox")
            .select()
            .eq("user_id", user.value!.id)
            .eq("playlist_id", playlists.value!.new_playlist!.playlistId!);

        return data;
    });
</script>
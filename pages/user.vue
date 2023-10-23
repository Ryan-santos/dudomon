<template>
    <Banner unique noImage>
        <Card background="background" higherClass="mx-auto max-w-screen-xs" class="flex w-full flex-col items-center gap-8">
            <div class="flex flex-col items-center gap-4">
                <img :src="supabaseUser?.user_metadata?.avatar_url" class="h-32 w-32 max-w-none rounded-full bg-primary">
                <h3 class="flex flex-row items-center gap-2 font-bold">
                    <NuxtIcon v-if="badge" :name="badge" filled />
                    {{ supabaseUser?.user_metadata?.nickname }}
                </h3>
            </div>
            <TransitionScale>
                <div v-if="$route.query?.page && $route.query?.type" class="rounded-2xl border border-warn/10 bg-warn/20 p-4 text-warn">
                    <h3 class="mb-4 font-bold">
                        <Icon name="jam:triangle-danger-f" size="2rem" />
                        Ops
                    </h3>
                    <p>
                        Para acessar a página <strong>[{{ $route.query?.page.toString().replaceAll("-", " → ") }}]</strong>, é necessário ser, no mínimo, um <strong>{{ (types as any)[$route.query?.type.toString()] }}</strong> do canal da Twitch.
                    </p>
                </div>
            </TransitionScale>
            <TransitionScale>
                <div v-if="twitchUser?.generateTokens?.length" class="w-full rounded-2xl border border-danger/10 bg-danger/20 p-4 text-danger">
                    <h3 class="mb-4 font-bold">
                        <Icon name="jam:triangle-danger-f" size="2rem" />
                        Gere os tokens!
                    </h3>
                    <p class="mb-6">
                        O site precisa desses tokens para funcionar corretamente.
                        <br>
                        <span class="text-xs">
                            *Se já gerou atualize essa paginá.
                        </span>
                    </p>
                    <div class="flex flex-col gap-6">
                        <Button v-for="(value, key) in twitchUser.generateTokens" :key="key" color="danger" :href="value" target="_blank">
                            Gerar token {{ value.split("/")[2] }}
                        </Button>
                    </div>
                </div>
            </TransitionScale>
            <div class="grid w-full gap-8 xs:grid-cols-2">
                <template v-for="(value, key) in twitchUser" :key="key">
                    <Card
                        v-if="['follower', 'subscription'].includes(key)"
                        size="sm"
                        background="transparent"
                        border="contrast-100"
                        class="flex flex-col items-center gap-4"
                        :pending="typeof value === 'undefined'"
                    >
                        <template #persist>
                            <h4 class="mb-4">
                                {{ useCapitalize(types[key]) }}
                            </h4>
                        </template>

                        <Icon
                            :name="value ? 'mdi:success' : 'heroicons:x-mark-20-solid'"
                            size="4rem"
                            class="block rounded-full  p-2"
                            :class="value ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'"
                        />
                        <span v-if="value" class="block text-xs opacity-50">
                            {{ useCapitalize(value) }}
                        </span>
                        <Button
                            v-else
                            :href="key === 'follower' ? twitch.url : 'https://www.twitch.tv/products/dudomon'"
                            target="_black"
                            color="twitch"
                            class="w-full"
                        >
                            <Icon :name="key === 'follower' ? 'ph:heart-fill' : 'tabler:star-filled'" />
                            {{ key === 'follower' ? "Seguir" : "Ser SUB" }}
                        </Button>
                    </Card>
                </template>
            </div>
            <Button color="danger" class="w-full" @click="signOut">
                <Icon name="humbleicons:logout" />
                Desconectar
            </Button>
        </Card>
    </Banner>
</template>

<script setup lang="ts">
    definePageMeta({
        middleware: [
            "auth"
        ]
    });

    const supabaseUser = useSupabaseUser();

    useSeoMeta({
        title: supabaseUser.value?.user_metadata?.nickname ?? "Perfil"
    });

    const twitchUser = await useTwitchUser();
    const twitch = useGroupsLinks().medias.links.twitch;

    const badge = computed(() => {
        if (twitchUser.value) {
            const keys = Object.keys(twitchUser.value) as (keyof typeof twitchUser.value)[];
            return keys.find(key => twitchUser.value?.[key] === true);
        }
    });

    const types: Record<string, string> = {
        follower: "seguidor",
        subscription: "inscrito (SUB)"
    };

    const supabase = useSupabaseClient();
    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
            .finally(() => useRouter().push("/"));

        if (error) {
            console.error(error);
        };
    };
</script>
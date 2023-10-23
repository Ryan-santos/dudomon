<template>
    <main class="background">
        <section class="container flex min-h-screen flex-col items-center justify-center">
            <div class="flex w-full max-w-screen-xs flex-col gap-6 rounded-3xl bg-background-100 p-6 text-center">
                <p>
                    Faça login com sua conta da Twitch e aproveite os seus benefícios!
                </p>
                <Button
                    color="twitch"
                    class="w-full"
                    :disabled="!loaded"
                    @click="signInWithOAuth"
                >
                    <Icon :name="loaded ? 'bi:twitch' : 'line-md:loading-twotone-loop'" />
                    {{ loaded ? "Entrar" : "Verificando" }}
                </Button>
                <hr>
                <div class="flex flex-row items-center justify-center gap-6">
                    <ButtonTheme />
                    <Button color="outline" noPadding class="px-3 py-1 text-sm" @click="back">
                        <Icon name="ri:arrow-go-back-line" />
                        Voltar página
                    </Button>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: "custom"
    });

    useSeoMeta({
        title: "Login",
        description: "Comece agora a desfrutar dos benefícios como seguidor, inscrito (SUB) ou VIP!"
    });

    const user = useSupabaseUser();
    const router = useRouter();

    if (user.value) {
        const routeQuery = useRoute().query;
        router.push(routeQuery?.back?.toString() ?? "/user");
    }

    const supabase = useSupabaseClient();

    const signInWithOAuth = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "twitch",
            options: {
                scopes: "user:read:follows user:read:subscriptions",
                redirectTo: useRequestURL().toString()
            }
        });

        if (error) {
            console.error(error);
        };
    };

    const back = () => {
        if (window.history.length > 2) {
            router.back();
        }
        else {
            router.push("/");
        }
    };

    const clientOnly = ref(false);
    const loaded = computed(() => {
        return clientOnly.value && !user.value;
    });

    onMounted(() => {
        clientOnly.value = true;
    });
</script>
<template>
    <section>
        <Banner
            title="Fique por dentro do meta!"
            description="Saiba quais heróis estão mais fortes no meta de Honor of Kings, quem sabe não pode ser o seu próximo main. A Tier List é elaborada por mim, um jogador que joga partidas ranqueadas diariamente e está sempre de olho no cenário competitivo."
        />

        <article class="container pb-20">
            <span class="mb-2 block text-center text-xs font-bold opacity-50">
                Filtros
            </span>
            <div class="z-50 mx-auto mb-12 flex w-fit flex-row flex-wrap items-center justify-center gap-4 p-1 md:sticky md:top-20 md:rounded-e-full md:bg-background-100/90 md:backdrop-blur-md">
                <Button
                    v-for="(value, key) in lines"
                    :key="key"
                    color="custom"
                    noPadding
                    class="overflow-hidden px-3 py-1"
                    :activated="key === line"
                    @click="line = key"
                >
                    <nuxt-icon :name="key" class="text-2xl" />
                    <Transition
                        enterActiveClass="transition-all duration-500"
                        leaveActiveClass="transition-all duration-500"
                        leaveToClass="opacity-0"
                        appear
                        @enter="enter"
                        @leave="leave"
                    >
                        <span v-show="key === line" class="block w-0 whitespace-nowrap">
                            {{ value }}
                        </span>
                    </Transition>
                </Button>
            </div>
            <div class="flex flex-col gap-8">
                <div
                    v-for="(tier) in tiers"
                    :key="tier.id"
                    class="flex min-h-[13rem] flex-col rounded-3xl border border-contrast/20 md:flex-row"
                    :style="`background: ${tier.color}33; border-color: ${tier.color}33`"
                >
                    <div
                        class="sticky top-20 z-20 row-span-full mb-4 w-full rounded-3xl text-center md:mb-0 md:max-w-[10rem]"
                        :class="`text-${tier.contrast}`"
                        :style="`background: ${tier.color}`"
                    >
                        <div class="flex flex-col items-center justify-center gap-2 p-4 md:sticky md:top-20 md:min-h-[13rem]">
                            <h1 class="font-black">
                                {{ tier.id }}
                            </h1>
                            <span class="text-xs">
                                {{ useCapitalize(tier.description) }}
                            </span>
                        </div>
                    </div>
                    <div class="w-full p-4 md:p-6">
                        <TransitionGroup
                            enterActiveClass="transition-all duration-500"
                            enterFromClass="opacity-0 scale-95"

                            leaveActiveClass="transition-all duration-500 !absolute"
                            leaveToClass="opacity-0 scale-95"

                            moveClass="transition-all duration-500"

                            tag="div"
                            class="relative grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7"

                            @before-leave="heroLeave"
                        >
                            <div
                                v-for="hero in filter(tier.id)"
                                :key="hero.id"
                                class="relative z-10 flex aspect-square flex-col justify-end rounded-2xl"
                            >
                                <img
                                    :src="usePictureHero(hero.heroes?.id!)"
                                    :alt="hero.heroes?.name"
                                    class="absolute inset-0 -z-10 h-full w-full rounded-2xl object-cover"
                                    loading="lazy"
                                >
                                <span class="rounded-b-2xl bg-gradient-to-b from-black/0 to-black p-2 text-center font-medium text-white">
                                    {{ hero.heroes?.name }}
                                </span>
                                <TransitionScale>
                                    <div v-show="line === 'all'" class="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 flex-row gap-2 rounded-full bg-background px-2 py-1">
                                        <nuxt-icon
                                            v-for="icon in filterLines(hero, tier.id)"
                                            :key="icon"
                                            :name="icon"
                                        />
                                    </div>
                                </TransitionScale>
                            </div>
                        </TransitionGroup>
                    </div>
                </div>
            </div>
        </article>
    </section>
</template>

<script setup lang="ts">
    import type { Database } from "~/types/database";
    type Hero = Database["public"]["Tables"]["tierlist"]["Row"];

    definePageMeta({
        icon: "fa6-solid:ranking-star"
    });

    useSeoMeta({
        title: "Fique por dentro do meta",
        description: "Está indeciso sobre qual será próximo main ou deseja subir de elo mais rápido? Confira agora minha Tier List de Honor of Kings!"
    });

    const lines = {
        all: "Tudo",
        top: "Rota superior",
        mid: "Rota do meio",
        adc: "Rota inferior",
        jg: "Caça",
        sup: "Apoio"
    };

    type Lines = keyof typeof lines;

    const line = ref<Lines>("all");

    const supabase = useSupabaseClient<Database>();

    const { data: tiers } = await useLazyAsyncData("tiers", async () => {
        const { data } = await supabase.from("tiers")
            .select("*")
            .order("order");

        return data;
    }, {
        server: false
    });

    const { data: tierList } = await useLazyAsyncData("tierlist", async () => {
        const { data } = await supabase.from("tierlist")
            .select("*, heroes(*)");

        return data;
    }, {
        server: false
    });

    const filter = (tier: string) => {
        return tierList.value?.filter((hero) => {
            if (line.value !== "all") {
                return hero?.[line.value] === tier;
            }
            else {
                return [
                    hero.jg,
                    hero.adc,
                    hero.mid,
                    hero.sup,
                    hero.top
                ].includes(tier);
            }
        });
    };

    const filterLines = (hero: Hero, tier: string) => {
        if (line.value !== "all") {
            return [];
        }

        const linesKeys = Object.keys(lines) as Lines[];
        return linesKeys.filter((key) => {
            return key !== "all" && hero[key] === tier;
        });
    };

    const enter = (element:Element) => {
        (element as HTMLElement).style.width = `${element.scrollWidth || 47}px`;
    };

    const leave = (element:Element) => {
        (element as HTMLElement).style.width = "0";
    };

    const heroLeave = (element:Element) => {
        (element as HTMLElement).style.width = `${element.clientWidth}px`;
    };
</script>
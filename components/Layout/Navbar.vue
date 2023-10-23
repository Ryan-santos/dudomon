<template>
    <header
        class="fixed inset-x-0 top-0 z-[99] h-[4.5rem] w-full transition-[height_transform] duration-500"
        :class="{'!h-[100dvh]': open}"
    >
        <nav
            ref="container"
            class="h-full transition-[padding] duration-500"
            :class="{'container pt-3': !open}"
        >
            <div
                class="relative flex h-full flex-col justify-between gap-4 border-contrast/10 p-4 transition-[background_backdrop-filter_border-color_padding] duration-500 max-lg:overflow-hidden lg:flex-row lg:items-center"
                :class="{
                    'bg-background/90 text-contrast shadow-sm backdrop-blur-md': !transparent || open,
                    'rounded-e-[4rem] border !p-2': !open
                }"
            >
                <div class="flex w-full items-center justify-between lg:w-fit">
                    <NuxtLink href="/" class="max-w-[15rem] md:max-w-[20rem]">
                        <VSvg name="logo" />
                    </NuxtLink>
                    <button
                        class="flex h-10 w-10 flex-col justify-between overflow-hidden rounded-e-full lg:hidden"
                        :class="{'text-red-600': open}"
                        @click="toggle()"
                    >
                        <span
                            class="block h-[2px] w-full bg-current transition duration-300"
                            :class="{'translate-y-4 rotate-45': open }"
                        />
                        <span
                            class="block h-[2px] w-full bg-current transition duration-300"
                            :class="{'opacity-0': open } "
                        />
                        <span
                            class="block h-[2px] w-full bg-current transition duration-300"
                            :class="{'-translate-y-4 -rotate-45': open }"
                        />
                    </button>
                </div>
                <hr class="w-full lg:hidden">
                <div
                    class="max-lg:mask-transparent-border relative left-0 h-full w-[200%] grow transition-[transform] duration-300 lg:static lg:h-fit lg:w-full"
                    :class="{'max-lg:translate-x-[-50%]': subNav.open}"
                >
                    <div
                        class="scrollbar absolute inset-y-0 left-0 my-auto grid h-fit max-h-full w-1/2 grid-flow-row auto-rows-min items-center justify-center justify-items-center gap-3 overflow-auto py-4 lg:static lg:h-fit lg:w-full lg:auto-cols-min lg:grid-flow-col lg:gap-0 lg:overflow-visible lg:py-0"
                        :class="{'max-lg:opacity-0': subNav.open}"
                    >
                        <NuxtLink
                            v-for="(value, key) in pages"
                            :key="key"
                            :href="value.path"
                            :class="linkClass"
                            :activeClass="linkClassActive"
                            @click="(e: Event) => subNav.toggle(e, key)"
                            @mouseenter="(e: Event) => subNav.toggle(e, key)"
                            @mouseleave="(e: Event) => subNav.toggle(e, key)"
                        >
                            {{ value.name }}
                            <Icon v-if="value?.routes" name="ep:arrow-right-bold" class="lg:rotate-90" />
                        </NuxtLink>
                    </div>
                    <Transition
                        enterActiveClass="lg:transition-all lg:duration-500"
                        enterFromClass="lg:scale-90 lg:opacity-0"

                        leaveActiveClass="lg:transition-all lg:duration-500"
                        leaveToClass="lg:scale-90 lg:opacity-0"

                        :duration="{enter: 500, leave: 1000}"
                    >
                        <div
                            v-show="subNav.open"
                            class="scrollbar absolute inset-y-0 right-0 my-auto h-fit max-h-full w-1/2 overflow-auto py-4 max-lg:!left-auto lg:inset-auto lg:top-full lg:w-fit lg:auto-cols-min lg:overflow-visible lg:py-0 lg:pt-4"
                            :class="{'lg:delay-500': !subNav.open}"
                            :style="`left: ${subNav.screenLeft}px;`"
                            @mouseenter="(e: Event) => subNav.toggle(e)"
                            @mouseleave="(e: Event) => subNav.toggle(e)"
                        >
                            <div class="lg:flex lg:flex-row lg:overflow-hidden lg:rounded-2xl lg:border lg:border-contrast/10 lg:bg-background lg:text-contrast lg:shadow-md">
                                <Transition
                                    enterActiveClass="lg:transition-all lg:duration-300"
                                    enterFromClass="lg:opacity-0 lg:translate-x-6"

                                    leaveActiveClass="lg:transition-all lg:duration-300"
                                    leaveToClass="lg:opacity-0 lg:-translate-x-6"

                                    mode="out-in"
                                >
                                    <div :key="subNav.key" class="grid grid-flow-row auto-rows-min items-center justify-center justify-items-center gap-3 lg:justify-items-start lg:p-4">
                                        <NuxtLink
                                            v-for="(value, key) in pages[subNav.key]?.routes"
                                            :key="key"
                                            :href="value.path"
                                            :class="linkClass"
                                            :activeClass="linkClassActive"
                                        >
                                            <Icon v-if="value.icon" :name="value.icon" />
                                            {{ value.name }}
                                        </NuxtLink>
                                    </div>
                                </Transition>
                            </div>
                        </div>
                    </Transition>
                </div>
                <hr class="w-full lg:hidden">
                <Transition
                    enterActiveClass="transition-all duration-300"
                    enterFromClass="translate-y-full opacity-0"

                    leaveActiveClass="transition-all duration-300"
                    leaveToClass="opacity-0 translate-y-full"

                    mode="out-in"
                    appear
                >
                    <Button
                        v-if="subNav.open && !isScreenLG"
                        class="mx-auto w-full xs:w-fit"
                        @click="(e: Event) => subNav.toggle(e)"
                    >
                        <Icon name="mingcute:back-fill" />
                        Volta opções
                    </Button>
                    <div v-else class="flex flex-row items-center justify-center gap-4 max-xs:w-full">
                        <ButtonTheme min />
                        <Button v-if="user" href="/user" noPadding class="p-1 max-xs:w-full">
                            <span class="pl-2 text-sm">
                                {{ user.user_metadata?.nickname }}
                            </span>
                            <img :src="user.user_metadata?.avatar_url" class="h-7 w-7 max-w-none rounded-full">
                        </Button>
                        <Button v-else href="/login" class="max-xs:w-full">
                            <Icon name="mingcute:user-2-fill" />
                            Entrar
                        </Button>
                    </div>
                </Transition>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
    const container = ref<HTMLDivElement>();
    const transparent = ref(true);
    const open = ref(false);
    const linkClass = "px-3 py-1 flex flex-row items-center justify-center gap-2 rounded-e-full border border-transparent transition-all duration-300 hover:text-primary";
    const linkClassActive = "dark:text-primary hover:text-current !border-primary bg-primary/50 dark:bg-primary/20";
    const isScreenLG = useIsScreen("lg");
    const user = useSupabaseUser();

    const getRoutes = (names: string[]) => {
        interface Response {
            name?: string;
            path?: string;
            icon?: string;
            routes?: Record<string, Response>;
        }

        const response: Record<string, Response> = {};

        const routes = useRouter().getRoutes();

        routes.forEach((value) => {
            const split = String(value.name).toLowerCase().split("-");

            if (names.includes(split[0])) {
                const route: Response = {
                    name: "",
                    path: value.path,
                    icon: value.meta?.icon
                };

                if (split.length > 1) {
                    route.name = useCapitalize(String(value.meta?.name ?? split[1]));
                    let nestedResponse = response[split[0]] as Response | undefined;

                    if (!nestedResponse) {
                        nestedResponse = {
                            name: useCapitalize(split[0]),
                            routes: {}
                        };
                        response[split[0]] = nestedResponse;
                    }

                    nestedResponse.routes = nestedResponse.routes || {};
                    nestedResponse.routes[split[1]] = route;
                }
                else {
                    route.name = useCapitalize(String(value.meta?.name ?? value.name));
                    response[split[0]] = route;
                }
            }
        });

        return usePick(response, names) as Record<string, Response>;
    };

    const pages = getRoutes(["home", "recursos"]);

    const toggle = (action?: boolean) => {
        open.value = action ?? !open.value;

        useBodyOverflow(open.value);
    };

    const subNav = ref({
        open: false,
        screenLeft: 0,
        image: "",
        key: "recursos" as string | number,

        toggle (event?: Event, key?: string | number) {
            if (!(event?.target as HTMLAnchorElement)?.href) {
                switch (event?.type) {
                    case "mouseenter": {
                        if (isScreenLG.value) {
                            this.open = true;
                        }
                        break;
                    }

                    case "mouseleave": {
                        if (isScreenLG.value) {
                            this.open = false;
                        }
                        break;
                    }

                    default: {
                        if (!isScreenLG.value) {
                            this.open = !this.open;
                        }
                        break;
                    }
                }

                if (key) {
                    const rect = (event?.target as HTMLElement).getBoundingClientRect();
                    const containerMargin = (window.innerWidth - (container.value?.offsetWidth || 0)) / 2;
                    this.screenLeft = isScreenLG.value ? rect.left - containerMargin : 0;
                }

                if (key) {
                    this.key = key;
                }
            }
        }
    });

    onMounted(() => {
        useRouter().afterEach(() => {
            toggle(false);
        });

        const toggleTransparent = () => {
            if (!open.value) {
                transparent.value = window.scrollY === 0;
            }
        };

        toggleTransparent();

        window.addEventListener("scroll", useDebounce(toggleTransparent, 100));
    });
</script>
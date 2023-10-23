<template>
    <section>
        <Banner>
            <div class="-mb-32 flex flex-col items-center justify-center gap-12 text-center lg:flex-row-reverse lg:text-left">
                <div class="w-full max-w-screen-sm lg:pb-32">
                    <span class="mb-2 block text-sm font-bold uppercase text-primary">
                        streamer
                    </span>
                    <VSvg name="logo" class="mx-auto mb-6 max-w-xs lg:mx-0" />
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.
                    </p>
                </div>
                <div class="w-full lg:max-w-screen-md xl:max-w-screen-sm">
                    <img src="/images/duds-banner.png" class="w-full">
                </div>
            </div>
        </Banner>
    </section>
</template>

<script setup lang="ts">
    definePageMeta({
        name: "Sobre"
    });

    useSeoMeta({
        title: "Streamer",
        description: ""
    });
</script>
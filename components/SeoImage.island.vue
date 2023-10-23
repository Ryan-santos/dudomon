<template>
    <div class="relative z-0 flex h-full w-full flex-col items-center justify-center gap-8 bg-black p-8 text-center text-white" :class="{'bg-[url(/images/background-dark.svg)]': !image}">
        <img :src="props.image" class="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-30">

        <svg
            width="540"
            height="71"
            viewBox="0 0 540 71"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="h-fit max-w-sm text-[#FFCB00]"
        >
            <path d="M0 0V70H35C44.6 70 53.3 66.1 59.6 59.7C60.3 59 61 58.3 61.6 57.6C66.8 51.5 69.9 43.6 69.9 35C69.9 15.7 54.2 0.0999987 34.9 0.0999987L0 0ZM12.4 12.6H34.9C47.3 12.6 57.4 22.7 57.4 35.1C57.4 47.5 47.3 57.6 34.9 57.6H12.4V12.6Z" fill="currentColor" />
            <path d="M137.48 0V35C137.48 47.4 127.38 57.5 114.98 57.5C102.58 57.5 92.4805 47.4 92.4805 35V0H79.9805V35C79.9805 54.3 95.6805 70 114.98 70C134.28 70 149.98 54.3 149.98 35V0H137.48Z" fill="currentColor" />
            <path d="M159.961 0V70H194.961C204.561 70 213.261 66.1 219.561 59.7C220.261 59 220.961 58.3 221.561 57.6C226.761 51.5 229.861 43.6 229.861 35C229.861 15.7 214.161 0.0999987 194.861 0.0999987L159.961 0ZM172.361 12.6H194.861C207.261 12.6 217.361 22.7 217.361 35.1C217.361 47.5 207.261 57.6 194.861 57.6H172.361V12.6Z" fill="currentColor" />
            <path d="M272.441 0C253.141 0 237.441 15.7 237.441 35C237.441 54.3 253.141 70 272.441 70C291.741 70 307.441 54.3 307.441 35C307.441 15.7 291.741 0 272.441 0ZM272.441 57.5C260.041 57.5 249.941 47.4 249.941 35C249.941 22.6 260.041 12.5 272.441 12.5C284.841 12.5 294.941 22.6 294.941 35C294.941 47.4 284.841 57.5 272.441 57.5Z" fill="currentColor" />
            <path d="M349.941 26.9L314.941 0V70H327.441V25.4L339.741 34.8L349.941 42.7L360.141 34.8L372.441 25.4V70H384.941V0L349.941 26.9Z" fill="currentColor" />
            <path d="M427.422 0C408.122 0 392.422 15.7 392.422 35C392.422 54.3 408.122 70 427.422 70C446.722 70 462.422 54.3 462.422 35C462.422 15.7 446.722 0 427.422 0ZM427.422 57.5C415.022 57.5 404.922 47.4 404.922 35C404.922 22.6 415.022 12.5 427.422 12.5C439.822 12.5 449.922 22.6 449.922 35C449.922 47.4 439.822 57.5 427.422 57.5Z" fill="currentColor" />
            <path d="M527.422 0V44.6L482.422 9.9L469.922 0.300002V70.1H482.422V25.8L527.422 60.5L539.922 70.1V0.0999987L527.422 0Z" fill="currentColor" />
        </svg>

        <h1 class="m-0 font-black uppercase" :class="classTitle">
            {{ props.title }}
        </h1>

        <p class="text-3xl">
            {{ props.description }}
        </p>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        title: string
        description: string
        image?: string
    }>();

    const classTitle = computed(() => {
        return props.title.length > 15 ? "text-8xl" : "text-9xl";
    });
</script>
<template>
    <div class="selection-black relative flex w-full max-w-4xl flex-col items-center gap-8 overflow-hidden rounded-3xl bg-primary p-4 py-8 text-center text-black md:p-8">
        <Icon
            name="nimbus:pix"
            size="15rem"
            class="mask-transparent absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 opacity-50 [--deg:300deg] [--percentage:0%]"
        />
        <div class="flex flex-col items-center">
            <h1 class="mb-8 text-[calc(1.5rem_+_1vw)] font-black leading-tight">
                Preciso da sua ajuda!
            </h1>
            <p class="mb-6">
                Infelizmente, estou passando por uma situação difícil no momento e estou buscando apoio para fazer a compra do mês.  Qualquer contribuição que você puder disponibilizar será imensamente valiosa e terá um grande impacto na minha vida.
            </p>
            <div class="flex w-fit flex-row items-center justify-center gap-3 rounded-e-full bg-black p-1 pl-3 text-white">
                <Icon name="nimbus:pix" size="1.3rem" class="!hidden sm:!block" />
                <span>{{ btnCopy.pix }}</span>
                <Button :color=" btnCopy.copied ? 'success' : 'primary'" class="px-3 py-1" noPadding @click="btnCopy.call()">
                    <Icon :name="btnCopy.copied ? 'fa-check' : 'ph:copy-fill'" class="mr-1" />
                    <span class="hidden sm:inline-block">
                        {{ btnCopy.copied ? "Copiado!" : "Copiar" }}
                    </span>
                </Button>
            </div>
        </div>
        <img src="/images/donation/picpay.jpg" class="relative max-w-xs rounded-3xl">
    </div>
</template>

<script setup lang="ts">
    const btnCopy = ref({
        pix: "contatodudomon@gmail.com",
        copied: false,

        async call () {
            try {
                await navigator.clipboard.writeText(this.pix);

                this.copied = true;

                setTimeout(() => {
                    this.copied = false;
                }, 1000);
            }
            catch {
                alert("Erro ao copiar");
            }
        }
    });
</script>
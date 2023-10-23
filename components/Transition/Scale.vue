<template>
    <Transition
        enterActiveClass="transition-all duration-500"
        enterFromClass="scale-90 opacity-0 blur-sm"

        leaveActiveClass="transition-all duration-500"
        leaveToClass="scale-90 opacity-0 blur-sm"
    >
        <slot />
    </Transition>
</template>
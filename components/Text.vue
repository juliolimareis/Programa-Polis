<template>
  <component :is="variant ?? 'h1'" v-if="type === 'title'" class="lg:text-4x1 md:text-3xl text-gray-900">
    <b v-if="isBold">
      <slot />
    </b>

    <slot v-else />
  </component>

  <component :is="variant ?? 'h1'" v-else-if="type === 'subtitle'" class="text-lg md:text-xl text-gray-900">
    <b v-if="isBold">
      <slot />
    </b>

    <slot v-else />

  </component>

  <component :is="variant ?? 'p'" v-else class="text-gray-900">
    <b v-if="isBold">
      <slot />
    </b>

    <slot v-else />
  </component>
</template>

<script lang="ts" setup>
defineProps<{
    type?: "title" | "subtitle" | "base";
    isBold?: boolean;
    variant?: string;
  }>();
</script>
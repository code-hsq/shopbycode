<script setup>
import DefaultTheme from 'vitepress/theme';
import { useRouter, useData } from 'vitepress';
import { ref } from 'vue';
import Loading from './Loading.vue';
const { Layout } = DefaultTheme;
const show = ref(false);
const router = useRouter();

const data = useData();
if (!import.meta.env.SSR) {
  router.go(_BASE_.value + _PAGES_[0].link);
}
// console.log(data.site.value.themeConfig.sidebar);
setTimeout(() => {
  show.value = true;
  // console.log('show');
}, 1000);
</script>

<template>
  <Layout v-if="show">
    <!-- <template #aside-outline-before> My custom sidebar top content </template> -->
  </Layout>
  <Loading v-else />
  <!-- <div v-else class="loading">加载中</div> -->
</template>
<style lang="scss">
.loading {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
}
</style>

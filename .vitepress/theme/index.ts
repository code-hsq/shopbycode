import DefaultTheme from 'vitepress/theme';
import '../../style.scss';
import MyLayout from './MyLayout.vue';
import { onMounted } from 'vue';

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  async enhanceApp(data) {},
  setup() {
    return {};
  },
};

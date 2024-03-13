import { reactive } from 'vue';

interface UrlState {
  baseUrl: string;
}

const state: UrlState = reactive({
  baseUrl: 'http://localhost:8001'
});

export default state;
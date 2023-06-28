import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import component from '@/components/UI/'

const app = createApp(App)
component.forEach(component=> {
    app.component(component.name,component)
});
app
    .use(store)
    .use(router)
    .mount('#app')

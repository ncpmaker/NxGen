import './assets/styles.css'
import './assets/transitions.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import VTextbox from '@/components/VTextbox.vue'
import VFormTextbox from '@/components/VFormTextbox.vue'
import VSelect from '@/components/VSelect.vue'
import VButton from '@/components/VButton.vue'
import VIconButton from '@/components/VIconButton.vue'
import VLinkButton from '@/components/VLinkButton.vue'
import VIntroButton from '@/components/VIntroButton.vue'
import VBottomSheet from '@/components/VBottomSheet.vue'
import VModal from '@/components/VModal.vue'
import VRadialProgress from '@/components/VRadialProgress.vue'
import VSteps from '@/components/VSteps.vue'

const app = createApp(App)

app.use(router)

app.mount('#app')
app.component('VTextbox', VTextbox)
app.component('VFormTextbox', VFormTextbox)
app.component('VSelect', VSelect)
app.component('VButton', VButton)
app.component('VIconButton', VIconButton)
app.component('VLinkButton', VLinkButton)
app.component('VIntroButton', VIntroButton)
app.component('VBottomSheet', VBottomSheet)
app.component('VModal', VModal)
app.component('VRadialProgress', VRadialProgress)
app.component('VSteps', VSteps)

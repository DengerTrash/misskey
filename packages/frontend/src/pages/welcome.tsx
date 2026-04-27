import { defineComponent } from "vue";

import { computed, ref } from 'vue';
import * as Misskey from 'misskey-js';
import { instanceName } from '@@/js/config.js';
import XSetup from './welcome.setup.vue';
import XEntranceClassic from './welcome.entrance.classic.vue';
import XEntranceSimple from './welcome.entrance.simple.vue';
import { definePage } from '@/page.js';
import { fetchInstance } from '@/instance.js';

export default defineComponent({

	setup(){
		const instance = ref<Misskey.entities.MetaDetailed | null>(null);
		fetchInstance(true).then((res) => {
			instance.value = res;
		});

		const headerActions = computed(() => []);
		const headerTabs = computed(() => []);
		definePage(() => ({
			title: instanceName,
			icon: null,
		}));
		return() => (
			<>
				{instance && (
					<div v-if="instance">
						{
							instance?.requireSetup
							? <XSetup/>
							: (instance.clientOptions.entrancePageStyle ?? 'classic') === 'classic'
							? <XEntranceClassic/>
							: <XEntranceSimple/>
						}
					</div>
				)}
			</>
		)
	},

})

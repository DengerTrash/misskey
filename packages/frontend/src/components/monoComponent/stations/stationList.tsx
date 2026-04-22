import { defineComponent } from "vue";
import * as Misskey from 'misskey-js';
import type { IPaginator, ExtractorFunction } from '@/utility/paginator.js';
import MkChannelPreview from '@/components/MkChannelPreview.vue';
import MkPagination from '@/components/MkPagination.vue';

const MediStationList = defineComponent({
	setup(){
		type P = IPaginator;
		const props = withDefaults(defineProps<{
			paginator: P;
			noGap?: boolean;
			extractor?: ExtractorFunction<P, Misskey.entities.Channel>;
		}>(), {
			extractor: (item: any) => item as Misskey.entities.Channel,
		});
		return() => (
		<template>
			<MkPagination paginator="paginator">
				<MkResult type="empty"/>
				<MkChannelPreview
					v-for="item in items"
					key="item.id" class="_margin"
					channel="extractor(item)"
				/>
			</MkPagination>
		</template>

		)
	}
})
export default MediStationList;

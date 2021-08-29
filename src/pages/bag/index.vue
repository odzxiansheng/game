<template>
  <div>
		<div class="map-card" v-for=" item in userInfo.bage" :key="item.id" @click="start(item)">
			<div class="map-name">{{item.name}}</div>
			<div class="map-item">
				<span class="get">x {{item.num}}</span>
			</div>
		</div>
	</div>
</template>
<script>
import { mixins } from "../../common/mixins";
export default {
  mixins: [mixins],
	created(){

	}
};
</script>
<style scoped>
		.map-card{
		width: 90%;
		margin: 20upx auto;
		height: 180upx;
		border: 1px solid #ccc;
		border-radius: 20upx;
		display: flex;
		align-items: center;
		box-shadow: 2upx 2upx 2upx #ccc;
		position: relative;
	}
	.map-card .map-name{
		width: 40%;
		text-align: center;
	}
	.map-card .map-item{

	}
	.map-card .map-item .get{
		margin-right: 8upx;
	}
</style>
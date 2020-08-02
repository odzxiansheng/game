<template>
    <div class="renwu">
      <div class="shuxing"  >
          <div v-for="(item,index) in people" :key="index" class="item" style="width:50%">
              <div v-if="item.title === '攻击力' || item.title === '魔攻'" class="magicPower">{{item.title}}:{{item.value}}</div>
              <div v-else>{{item.title}}:{{item.value}}</div>
          </div> 
      </div>
    </div>
</template>
<script>
export default {
    props:{
        people:{
            type:Object,
            default:{}
        },
    },
}
</script>
<style scoped lang="less"  src="./index.less"></style>
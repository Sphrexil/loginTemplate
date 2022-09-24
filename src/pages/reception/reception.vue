<template>
  <brain/>

  <div class="body_part">
    <q-card  class="my_card">
      <q-card-section>
        <div class="text-h6">这里是首页</div>
        <div class="text-subtitle2">显示首页</div>
      </q-card-section>

      <q-separator/>

      <q-card-section>
        首页
      </q-card-section>
    </q-card>
  </div>


</template>

<script>
import header from '@/components/header.vue'

export default {
  components:{brain : header}
}

</script>

<style lang="scss" scoped>
.body_part{

}
.my_card{
  width: 800%;
  height: 800px;
  padding: 0;
  margin-top: -500%;
  margin-left: -350%;
}
</style>

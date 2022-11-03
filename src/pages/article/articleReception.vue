<template>
  <brain/>
  <bcg id="bcg"/>
  <div class="container">
    <articleList/>
  </div>

</template>

<script>
import bcg from '@/components/backgroud2.vue'
import brain from "@/components/header.vue"
import articleList from '@/components/ArticleList.vue'
export default {
  components: {bcg, brain, articleList},
  setup() {

  }
}

</script>

<style>
#bcg{
  position: fixed;
  top: 20px;
  width: 2000px;
  left: -1%;

  background: #222;
}
</style>
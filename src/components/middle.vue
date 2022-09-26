<template>
  <div class="body_part">
    <bcg/>
    <q-card  class="my_card">

    </q-card>
  </div>
</template>

<script>
import bcg from '@/components/backgroud.vue'
export default {
  components: {bcg}
}

</script>

<style>
.my_card{
  width: 250%;
  height: auto;
  padding: 0;
  margin-top: -650px;
  margin-left: -70%;
  overflow: visible;
}

</style>

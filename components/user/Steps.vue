<template>
  <div class="register-steps">
    <div v-for="(step, index) in steps" :key="index" class="step">
      <div class="index" :class="{ 'index-red': index < active }">
        {{ index + 1 }}
      </div>
      <p class="desc" :class="{ 'desc-red': index < active }">{{ step }}</p>
      <div
        v-if="index != steps.length - 1"
        class="line"
        :class="{ 'line-red': index < active }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Number,
      default: 1,
    },
    steps: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.register-steps {
  .step {
    float: left;
    width: 155px;
    position: relative;
    .index {
      width: 20px;
      height: 20px;
      background: #b0b0b0;
      border-radius: 50%;
      line-height: 20px;
      text-align: center;
      color: #ffffff;
      font-size: 16px;
      margin: 0 auto;
    }
    .index-red {
      background: #d50200;
    }
    .desc {
      height: 20px;
      font-size: 14px;
      font-weight: 500;
      color: #b0b0b0;
      line-height: 20px;
      text-align: center;
      margin-top: 2px;
    }
    .desc-red {
      color: #d50200;
    }
    .line {
      height: 1px;
      width: 130px;
      border-bottom: 1px dashed #b0b0b0;
      position: absolute;
      top: 10px;
      left: 90px;
    }
    .line-red {
      border-bottom: 1px dashed #d50200;
    }
  }
}
</style>

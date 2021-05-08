<template>
  <div class="user-carousel">
    <el-carousel arrow="never" :interval="5000">
      <el-carousel-item v-for="item in 3" :key="item">
        <img :src="imgs[item - 1]" alt="" class="img" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgs: [
        require('@/assets/images/login-1.jpg'),
        require('@/assets/images/login-2.jpg'),
        require('@/assets/images/login-3.jpg'),
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.user-carousel {
  width: 422px;
  height: 590px;
  .img {
    width: 422px;
    height: 590px;
    object-fit: cover;
  }
}
</style>
<style lang="scss">
.user-carousel {
  .el-carousel__indicators--horizontal {
    bottom: 25px;
  }
  .el-carousel__button {
    width: 14px;
    height: 14px;
    border-radius: 50%;
  }
  .el-carousel__container {
    height: 590px;
  }
}
</style>

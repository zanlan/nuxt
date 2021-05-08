<template>
  <div class="sales-qualification">
    <div class="container">
      <div class="content-container">
        <h1 class="title">基金销售业务资质证书</h1>

        <img src="@/assets/images/salesqua2.jpg" alt="基金销售业务资质证书" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: '基金销售业务资质证书 - 金海九州',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: '金海九州,基金,理财,基金销售业务资质证书',
        },
        {
          hid: 'description',
          name: 'description',
          content: '基金销售业务资质证书 - 金海九州',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.sales-qualification {
  .content-container {
    padding: 40px;
    background-color: #ffffff;
    margin-bottom: 40px;
    margin-top: 40px;
    min-height: 600px;
    text-align: center;

    .title {
      height: 28px;
      font-size: 24px;
      font-weight: normal;
      color: #392424;
      line-height: 28px;
      text-align: center;
    }
  }
}
</style>

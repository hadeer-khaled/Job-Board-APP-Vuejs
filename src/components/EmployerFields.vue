<template>
  <div>
    <div class="form-group mb-4">
      <label for="companyName" class="form-label">Company Name</label>
      <input type="text" class="form-control" id="companyName" :value="companyName" @input="updateCompanyName">
    </div>
    <div class="form-group mb-4">
      <label for="logo" class="form-label">Logo</label>
      <input type="file" class="form-control" id="logo" @change="onLogoChange">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    companyName: {
      type: String,
      required: true
    }
  },
  emits: ['update:companyName', 'update:logo'],
  methods: {
    updateCompanyName(event) {
      this.$emit('update:companyName', event.target.value);
    },
    onLogoChange(event) {
      const file = event.target.files[0];
      console.log("ddddddddddddddddddddddddddddddddddddddd");
      console.log(file);
      this.$emit('update:logo', event.target.files[0]);
    }
  }
};
</script>

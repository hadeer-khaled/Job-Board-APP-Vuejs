<template>
  <div>
    <div class="form-group mb-4">
      <label for="companyName" class="form-label">Company Name</label>
      <input type="text" class="form-control" id="companyName" :value="companyName" @input="$emit('update:companyName', $event.target.value)" required>
    </div>
    <div class="form-group mb-4">
      <label for="logo" class="form-label">Logo</label>
      <input type="file" class="form-control" id="logo" @change="onLogoChange">
    </div>
  </div>
</template>

<script>
export default {
  props: ['companyName', 'logo'],
  emits: ['update:companyName', 'update:logo', 'logoChange'],
  methods: {
    onLogoChange(event) {
      this.$emit('logoChange', event.target.files[0]);
    }
  }
};
</script>
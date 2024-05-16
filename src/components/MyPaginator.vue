<template>
  <nav class="mx-5" aria-label="Page navigation example">
    <ul class="pagination">
      <!-- Prev -->
      <li :class="{ 'page-item': true, disabled: !prev }">
        <a class="page-link" @click="changePage(prev)" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <!-- Pages -->
      <li v-for="link in paginationLinks" :key="link.label" :class="{ 'page-item': true, active: link.active }">
        <a v-if="!link.active" @click="changePage(link.url)" class="page-link">{{ link.label }}</a>
        <span class="page-link" v-else>{{ link.label }}</span>
      </li>

      <!-- Next -->
      <li :class="{ 'page-item': true, disabled: !next }">
        <a class="page-link" @click="changePage(next)" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    paginationData: {
      type: Object,
      required: true
    }
  },
  computed: {
    prev() {
      return this.paginationData.prev;
    },
    next() {
      return this.paginationData.next;
    },
    paginationLinks() {
      return this.paginationData.links;
    }
  },
  methods: {
    changePage(url) {
      this.$emit('page-change', url);
    }
  }
};
</script>

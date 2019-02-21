<template>
  <div class="dashboard-table">
    <h1 class="md-title">{{ title }}</h1>

    <div class="grid">
      <div class="header">
        <div v-for="item in header" :key="item" class="header__item col">
          <div>{{ item }}</div>
        </div>
      </div>
      <div v-for="(item, index) in data" :key="index" class="row">
        <div
          v-for="(subItem, subIndex) in item"
          :key="subIndex"
          class="row__item col"
          :class="subItem.classes"
        >
          <div v-if="subItem.label === 'Name'" @click="handleClick(subItem.id)">{{ subItem.value }}</div>
          <div v-else>{{ subItem.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  computed: {
    header() {
      if (!this.data || !this.data.length) {
        return [];
      }

      return this.data[0].map(item => item.label);
    },
  },
  methods: {
    handleClick(id) {
      this.$router.push({ name: 'details', params: { id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.grid {
  overflow-x: auto;
  background-color: #424242;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.header,
.row {
  display: flex;
  min-width: 960px;
  text-align: center;

  .col:nth-child(1) {
    width: 10%;
  }

  .col:nth-child(2) {
    width: 15%;

    &.row__item {
      font-size: 16px;

      div {
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .col:nth-child(3) {
    width: 5%;
  }

  .col:nth-child(4) {
    width: 8%;
  }

  @for $i from 5 through 11 {
    .col:nth-child(#{$i}) {
      width: calc(62% / 7);
    }
  }
}

.header__item {
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  font-weight: bold;

  div {
    padding: 14px 10px;
    line-height: 28px;
  }
}

.row {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
}

.row__item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 10px;
  font-size: 13px;

  div {
    line-height: 18px;
  }

  &.block {
    padding: 12px 10px;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 25px;
      width: 100%;
    }
  }
}

.success {
  &.text {
    color: #bbdf88;
  }

  &.block div {
    background-color: #4caf50;
  }
}

.empty {
  &.block div {
    background-color: #9c9b9b;
  }
}
</style>

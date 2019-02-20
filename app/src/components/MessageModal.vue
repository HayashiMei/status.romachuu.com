<template>
  <div class="message-modal">
    <div :class="['message-box', { 'is-closed': !show }]">
      <div class="header" :class="{ 'is-opened': open }">
        <span>{{ messageTitle }}</span>
      </div>
      <div class="body" :class="{ 'is-opened': open }">
        <div class="body__inner">
          <vue-scroll>
            <h3>{{ contentTitle }}</h3>
            <p>{{ contentText }}</p>
          </vue-scroll>
        </div>
      </div>
      <div class="footer">
        <button
          v-for="btn in ['btn--close', 'btn--open']"
          :key="btn"
          :class="[btn, { 'is-opened': open }]"
          @click="handleClick(btn === 'btn--close' ? 'close' : 'open')"
        >
          <div class="line-box">
            <div v-for="line in 2" :key="line" class="line"></div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    messageTitle: String,
    contentTitle: String,
    contentText: String,
  },
  data: () => ({
    open: false,
  }),
  computed: {},
  methods: {
    handleClick(btn) {
      switch (btn) {
        case 'close':
          return this.handleClose();
        case 'open':
          this.open = true;
          break;
        default:
          break;
      }
    },
    handleClose() {
      if (this.open) {
        this.open = false;
      } else {
        this.$emit('close');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.message-modal {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
}

.message-box {
  width: 380px;
  box-shadow: rgba(0, 0, 0, 0.1) 5px 5px 20px;
  opacity: 0;
  border-radius: 14px;
  transition: all 0.4s ease-out 0s;
  animation: message-modal 0.45s ease 0s 1 normal forwards running;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 10px 10px 20px;
  }

  &.is-closed {
    animation: message-modal--close 0.45s ease 0s 1 normal forwards running;
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 125px;
  padding: 25px 25px 50px;
  border-radius: 14px 14px 0px 0px;
  border-bottom: 2px dashed #ddd;
  background-color: #424242;
  transition: all 0.4s cubic-bezier(0.68, 0.02, 0.25, 1) 0s;

  &.is-opened {
    height: 50px;
    padding: 0px;

    span {
      color: transparent;
      background-color: transparent;
    }
  }

  span {
    display: inline-block;
    color: rgb(93, 53, 35);
    font-size: 14px;
    line-height: 30px;
    letter-spacing: 0.2em;
    background-color: #ddd;
    opacity: 0;
    padding: 0px 14px;
    border-radius: 15px;
    transition: all 0.4s cubic-bezier(0.68, 0.02, 0.25, 1) 0s;
    animation: header 0.45s ease 0.3s 1 normal forwards running;
  }
}

.body {
  height: 0px;
  background-color: #ddd;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.68, 0.02, 0.25, 1) 0s;

  &.is-opened {
    height: 265px;
  }

  .body__inner {
    height: 100%;
    padding: 30px 20px 50px;

    h3 {
      font-size: 20px;
      line-height: 34px;
      color: #5d3523;
      text-align: center;
      padding: 5px;
      border-bottom: 1px dashed #cccccc;
      margin: 0px 0px 10px;
    }

    p {
      font-size: 13px;
      line-height: 30px;
      color: #5d3523;
      text-align: center;
      white-space: pre-wrap;
      overflow-wrap: break-word;
      margin: 0px;
      padding: 5px;
    }
  }
}

.footer {
  display: flex;
  justify-content: center;
  height: 50px;
  border-radius: 0px 0px 14px 14px;
  border-top: 2px dashed #ddd;
  background-color: #424242;

  button {
    position: relative;
    display: block;
    width: 55px;
    height: 55px;
    margin: 0px;
    border-radius: 50%;
    opacity: 0;
    transform: translateY(-50%);
    transition: all 0.4s ease-out 0s;
    animation: button 0.45s ease 0.4s 1 normal forwards running;

    &.is-opened {
      &.btn--close {
        opacity: 1;
        transform: translate(100%, -50%);
        animation: slide-cancel 0.4s ease 0s 1 normal none running;
      }

      &.btn--open {
        pointer-events: none;
        animation: hidden-open 0.4s ease 0s 1 normal none running;
      }
    }

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.2) 4px 4px 10px;

      &.btn--close .line {
        &:first-child::after {
          animation: slide-right 0.15s ease 0s 1 normal forwards running;
        }

        &:last-child::after {
          animation: slide-right 0.15s ease 0.15s 1 normal forwards running;
        }
      }

      &.btn--open .line {
        &:first-child::after {
          animation: slide-right 0.15s ease 0s 1 normal forwards running;
        }

        &:last-child::after {
          animation: slide-top 0.15s ease 0.15s 1 normal forwards running;
        }
      }
    }

    &.btn--close {
      background-color: rgb(234, 139, 152);

      .line {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 50%;
        height: 4px;
        border-radius: 2px;
        overflow: hidden;

        &:first-child {
          transform: translate(-50%, -50%) rotate(45deg);

          &::before {
            animation: slide-right 0.2s ease 1.1s 1 normal forwards running;
          }
        }

        &:last-child {
          transform: translate(-50%, -50%) rotate(-45deg);

          &::before {
            animation: slide-right 0.2s ease 1.3s 1 normal forwards running;
          }
        }

        &::before,
        &::after {
          content: '';
          display: block;
          position: absolute;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          transform: translateX(-101%);
        }

        &::before {
          background-color: #fff;
        }

        &::after {
          background-color: #5d3523;
        }
      }
    }

    &.btn--open {
      margin: 0px 0px 0px 55px;
      background-color: rgb(144, 189, 189);
      animation-delay: 0.5s;

      .line-box {
        position: absolute;
        top: 53%;
        left: 49%;
        width: 40%;
        height: 44%;
        transform: translate(-50%, -75%) rotate(45deg);
      }

      .line {
        position: absolute;
        right: 0px;
        bottom: 0px;
        border-radius: 2px;
        overflow: hidden;

        &:first-child {
          width: 80%;
          height: 4px;

          &::before {
            animation: slide-right 0.2s ease 0.8s 1 normal forwards running;
          }
        }

        &:last-child {
          width: 4px;
          height: 100%;

          &::before {
            animation: slide-top 0.2s ease 1s 1 normal forwards running;
          }
        }

        &::before,
        &::after {
          content: '';
          display: block;
          position: absolute;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          transform: translateX(101%);
        }

        &::before {
          background-color: #fff;
        }

        &::after {
          background-color: #5d3523;
        }
      }
    }
  }
}

@keyframes message-modal {
  0% {
    transform: translateY(50%);
    opacity: 0;
  }

  50% {
    transform: translateY(-10%);
    opacity: 1;
  }

  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}

@keyframes header {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }

  50% {
    transform: translateY(-25%);
    opacity: 1;
  }

  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}

@keyframes button {
  0% {
    transform: translateY(50%);
    opacity: 0;
  }

  50% {
    transform: translateY(-70%);
    opacity: 1;
  }

  100% {
    transform: translateY(-50%);
    opacity: 1;
  }
}

@keyframes slide-right {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
}

@keyframes slide-top {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0%);
  }
}

@keyframes message-modal--close {
  from {
    transform: translateY(0%);
    opacity: 1;
  }
  to {
    transform: translateY(30%);
    opacity: 0;
  }
}

@keyframes slide-cancel {
  from {
    transform: translate(0, -50%);
    opacity: 1;
  }
  to {
    transform: translate(100%, -50%);
    opacity: 1;
  }
}

@keyframes hidden-open {
  from {
    transform: translateY(-50%) scale(1);
    opacity: 1;
  }
  to {
    transform: translateY(-50%) scale(0);
    opacity: 0;
  }
}
</style>

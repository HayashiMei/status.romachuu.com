<template>
  <div class="loading">
    <div class="loading__icon">
      <div v-for="i in 4" :key="i" class="loading__icon__point">
        <div v-for="j in 3" :key="j"></div>
      </div>
      <div class="loading__icon__block">
        <div v-for="i in 4" :key="i"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  height: 100%;
  width: 100%;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;

  .loading__bar {
    position: relative;
    width: calc(100% - 100px);
    height: 100px;

    .loading__bar__line {
      position: absolute;
      right: 0;
      width: 100%;
      overflow: hidden;

      &::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        transform: translate(-100%);
        background-color: #ccc;
        opacity: 0.4;
      }

      &:nth-child(1) {
        top: 10px;
        height: 4px;

        &::after {
          animation: load-view__progressbar-line 1.5s ease 0s infinite;
        }
      }

      &:nth-child(2) {
        top: 30px;
        height: 2px;

        &::after {
          animation: load-view__progressbar-line 3s ease 1.5s infinite;
        }
      }

      &:nth-child(3) {
        bottom: 25px;
        height: 6px;

        &::after {
          animation: load-view__progressbar-line 5s ease 0.5s infinite;
        }
      }

      &:nth-child(4) {
        bottom: 10px;
        height: 3px;

        &::after {
          animation: load-view__progressbar-line 2s ease 1s infinite;
        }
      }
    }

    .loading__bar__mainline {
      position: absolute;
      top: 50%;
      right: 0;
      margin-top: -4px;
      width: 100%;
      height: 8px;
      overflow: hidden;

      div {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: translateX(-100%);
        background-color: #999;
        transition: all 0.5s ease 0s;
      }
    }
  }

  .loading__icon {
    position: absolute;
    width: 220px;
    height: 220px;
    border-radius: 3px;
    background-color: #333;
    transform: rotate(-45deg);

    .loading__icon__point {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      $duration: 0.75s;

      @for $i from 1 through 4 {
        &:nth-child(#{$i}) {
          transform: rotate(($i - 1) * 90deg);
        }
      }

      div {
        position: absolute;
        width: 16px;
        height: 16px;
        border-radius: 3px;

        &:nth-child(1) {
          top: 0;
          left: 0;
          background-color: #df7d81;
          animation: loading__icon__point-1 $duration ease 0s infinite;
        }

        &:nth-child(2) {
          background-color: #f2c047;
        }

        &:nth-child(3) {
          background-color: #c7d35e;
        }
      }

      &:nth-child(1),
      &:nth-child(3) {
        div:nth-child(2) {
          top: 21px;
          left: 0;
          animation: loading__icon__point-2-odd $duration ease 0s infinite;
        }

        div:nth-child(3) {
          top: 0;
          left: 21px;
          animation: loading__icon__point-3-odd $duration ease 0s infinite;
        }
      }

      &:nth-child(2),
      &:nth-child(4) {
        div:nth-child(2) {
          top: 0;
          left: 21px;
          animation: loading__icon__point-2-even $duration ease 0s infinite;
        }

        div:nth-child(3) {
          top: 21px;
          left: 0;
          animation: loading__icon__point-3-even $duration ease 0s infinite;
        }
      }
    }

    .loading__icon__block {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -22.5px;
      margin-left: -22.5px;
      width: 45px;
      height: 45px;

      div {
        float: left;
        width: 20px;
        height: 20px;
        margin-right: 5px;
        margin-bottom: 5px;
        background-color: #ccc;
        border-radius: 3px;

        &:nth-child(2),
        &:nth-child(3) {
          margin-right: 0;
        }

        &:nth-child(3) {
          float: right;
        }

        @for $i from 1 through 4 {
          &:nth-child(#{$i}) {
            animation: load-view__icon-block-#{$i} 3s ease 750ms * ($i - 1) infinite;
          }
        }
      }
    }
  }
}

@keyframes loading__icon__point-1 {
  25% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(204px);
  }
}

@keyframes loading__icon__point-2-odd {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(162px);
  }
}

@keyframes loading__icon__point-2-even {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(204px);
  }
}

@keyframes loading__icon__point-3-odd {
  50% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(204px);
  }
}

@keyframes loading__icon__point-3-even {
  50% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(162px);
  }
}

@mixin icon__block__normal {
  transform: scale(1);
  background-color: #ccc;
}

@mixin keyframes($i, $color) {
  @keyframes load-view__icon-block-#{$i} {
    0% {
      @include icon__block__normal;
    }

    12.5% {
      transform: scale(0.8);
      background-color: $color;
    }

    25% {
      @include icon__block__normal;
    }

    100% {
      @include icon__block__normal;
    }
  }
}

@include keyframes(1, #f2c047);
@include keyframes(2, #c7d35e);
@include keyframes(3, #b980ae);
@include keyframes(4, #df7d81);
</style>

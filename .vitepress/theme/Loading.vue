<template>
  <div class="loading-container" ref="container">
    <!-- 粒子背景 -->
    <div
      class="particles"
      v-for="(particle, index) in particles"
      :key="index"
      :style="{
        left: particle.x + 'px',
        top: particle.y + 'px',
        width: particle.size + 'px',
        height: particle.size + 'px',
        backgroundColor: particle.color,
        animation: `float ${particle.duration}s linear infinite`,
        animationDelay: particle.delay + 's',
      }"
    ></div>

    <!-- 加载动画主体 -->
    <div class="loader-wrapper">
      <div class="loader">
        <div class="spinner"></div>
        <div class="pulse"></div>
      </div>
      <p class="loading-text">加载中<span class="dots">...</span></p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, nextTick } from 'vue';

const container = ref(null);
const isLoading = ref(true);

// 模拟加载过程
const simulateLoading = () => {
  setTimeout(() => {
    isLoading.value = false;
    // 淡出动画
    setTimeout(() => {
      // 加载完成后的操作，如路由跳转
      console.log('加载完成');
    }, 500);
  }, 3000); // 3秒后完成加载
};

// 创建粒子背景
const particles = reactive([]);
const createParticles = () => {
  nextTick(() => {
    if (!container.value) return;

    const containerWidth = container.value.offsetWidth;
    const containerHeight = container.value.offsetHeight;
    const particleCount = 30; // 粒子数量

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * containerWidth,
        y: Math.random() * containerHeight,
        size: Math.random() * 5 + 2, // 2-7px
        color: `rgba(${Math.random() * 100 + 155}, ${
          Math.random() * 100 + 155
        }, ${Math.random() * 255}, 0.${Math.floor(Math.random() * 5 + 3)})`,
        duration: Math.random() * 20 + 10, // 10-30秒
        delay: Math.random() * 5, // 0-5秒延迟
      });
    }
  });
};

onMounted(() => {
  createParticles();
  simulateLoading();
});
</script>

<style scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.5s ease;
  opacity: 1;
}

.loading-container.fade-out {
  opacity: 0;
}

.particles {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.loader-wrapper {
  text-align: center;
  z-index: 10;
}

.loader {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
}

.spinner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top-color: #e94560;
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
}

.pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background-color: rgba(233, 69, 96, 0.2);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.loading-text {
  color: #e94560;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 18px;
  letter-spacing: 2px;
  margin-top: 30px;
}

.dots {
  display: inline-block;
  width: 20px;
  text-align: left;
  animation: dots 1.5s infinite;
}

/* 动画定义 */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.6;
  }
  100% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 1;
  }
}

@keyframes float {
  0% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-20px) translateX(10px);
  }
  50% {
    transform: translateY(-40px) translateX(-10px);
  }
  75% {
    transform: translateY(-20px) translateX(5px);
  }
  100% {
    transform: translateY(0) translateX(0);
  }
}

@keyframes dots {
  0%,
  20% {
    content: '.';
  }
  40% {
    content: '..';
  }
  60% {
    content: '...';
  }
  80%,
  100% {
    content: '';
  }
}
</style>

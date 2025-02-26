<template>
  <div class="container">
    <div class="draggable-block"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const block = document.querySelector(".draggable-block");
  let isDragging = false;

  block.addEventListener("mousedown", (e) => {
    isDragging = true;
    block.style.opacity = "0.5";
    block.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      let newX = e.clientX;
      let newY = e.clientY;

      // 限制拖拽范围在父容器内
      const container = block.parentElement;
      const maxX = container.clientWidth - block.clientWidth;
      const maxY = container.clientHeight - block.clientHeight;

      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));

      block.style.left = `${newX}px`;
      block.style.top = `${newY}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      block.style.opacity = "1";
      block.style.cursor = "grab";
    }
  });
});
</script>

<style scoped>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  position: relative;
}

.container {
  width: 500px;
  height: 500px;
  border: 2px solid lightblue;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
}

.draggable-block {
  width: 100px;
  height: 100px;
  background-color: pink;
  position: absolute;
  top: 0;
  left: 0;
  cursor: grab;
}
</style>

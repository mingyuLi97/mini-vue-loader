const compiler = require("vue/compiler-sfc");
const code = `<template>
<div>123</div>
</template>

<script setup lang="ts">
console.log("App");
</script>

<style lang="scss" scoped>
.main {
background: red;
}
</style>
`;

const { descriptor } = compiler.parse(code);

console.log(descriptor);

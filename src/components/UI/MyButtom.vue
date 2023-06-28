<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'my-buttom'
}
</script>

<style scoped>

.btn{
    align-self: flex-end;
    padding: 10px;
    background: none;
    color: teal;
    border: 1px solid teal;
}
.btn:hover{
    color: #3d8157;
    text-shadow: 0 0 1px #3a8d5a;
}
</style>
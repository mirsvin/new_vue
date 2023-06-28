<template>
<div class = "Post">
    <div>
        <div>{{ post.id }}</div>
        <div><strong>Название:</strong>{{post.title}}</div>
        <div><strong>Описание:</strong>{{post.body}}</div>
    </div>
    <div class ="post_btns">
        <my-buttom
            @click="$emit('remove',post)"
        >Удалить</my-buttom>
    </div>
    
</div>
</template>
<script>
export default {
    props: {
        post:{
            type: Object,
            required: true,
        }
    }
}

</script>
<style scoped>
.Post {
  padding: 15px;
  border: 2px solid rebeccapurple;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
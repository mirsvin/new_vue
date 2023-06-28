<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
      v-model = "searchQery"
      placeholder="Поиск..."
    />
    <div class="app__buttons">
      <my-buttom
        @click="showDialog"
    >
      Создать пост
      </my-buttom>
      <my-select
        v-model = "selectedSort"
        :options = 'sortOptions'
      />
      </div>
      <my-dialog v-model:show = "dialogVisible">
          <post-form
            @create = "createPost" 
          />
      </my-dialog>
        <post-list 
          :posts = "sorteAndSerchedPosts" 
          @remove = "removePost"
          v-if="!isPostsLoading"
        />
    <div v-else class="loader"></div>
    <div ref = "observer" class="observer"></div>
  </div>  
</template>

<style>

.loader{
  border: 8px solid #f3f3f3;
  border-top: 8px solid rgb(78, 155, 95);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

.app__buttons{
  margin:15px 0;
  display: flex;
  justify-content: space-between;
}

.page__wrapper{
  display: flex;
  flex-direction:row;
  margin-top: 15px;
}

.page{
  border: 1px solid black;
  padding: 10px;
}

.current-page{
  border: 2px solid teal;
}
.observer{
  height: 30px;
  background: gray;
  opacity: 0%;
}

@keyframes spin {
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}

</style>
<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from 'axios'
export default{
  components:{
    PostForm,PostList
  },
  data() {
    return {
      posts:[],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQery: '',
      page:1,
      limit:10,
      totalPages: 0,
      sortOptions: [
        {value:'title', name:'По названию'},
        {value:'body', name:'По содержмому'},
      ]
    }
  },
  methods: {
    createPost(post){
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post){ 
      this.posts=this.posts.filter(p=> p.id !== post.id)
    },
    showDialog(){
      this.dialogVisible = true;
    },
    async fetchPost(){
      try { 
        this.isPostsLoading = true;
        setTimeout(async()=>{
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
            params:{
              _page: this.page,
              _limit: this.limit
            }
          });
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
          this.posts = response.data;
          this.isPostsLoading = false;
        },1000)
      } catch (error) {
        alert('Ошибка')
      } finally {
        
      }
    },
    async loadMorePosts(){
      try { 
        this.page +=1;
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
            params:{
              _page: this.page,
              _limit: this.limit
            }
          });
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
          this.posts = [...this.posts, ...response.data]
      } catch (error) {
        alert('Ошибка')
      }
    },
  },
    mounted() {
      this.fetchPost();
      var options = {
        rootMargin: '0px',
        threshold: 1.0
      }
      var callback = (entries, observer)=> {
        if (entries[0].isIntersecting && this.page < this.totalPages){
          this.loadMorePosts()
        }
      };
      var observer = new IntersectionObserver(callback, options);
      observer.observe(this.$refs.observer);
    },
    computed: {
      sortedPost() {
        return [...this.posts].sort((post1,post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
      },
      sorteAndSerchedPosts(){
        return this.sortedPost.filter(post => post.title.toLowerCase().includes(this.searchQery.toLowerCase()))
      }
    },
    watch: {
    
    }
}
</script>
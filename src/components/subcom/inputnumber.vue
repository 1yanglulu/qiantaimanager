<template>
    <div class="subtmpl">
        <!-- 这是一个自定义的组件，用来做购物车中购物信息详情中的加减数量的效果 -->
        <ul>
            <li @click="substract">-</li>
            <li>{{count}}</li>
            <li @click="add">+</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //定义一个用来渲染视图中当前数量的变量，默认数据条数为1，因为添加到购物车才会显示在列表，而添加的话至少数量为1，所以默认值给了1
                count:1,
            }
        },
        //定义一下obj的格式，{gid:商品id，count:当前商品的购买数量}
        props:['obj'],
        mounted(){
           
             //将传入的商品购买数量赋值给this.count
             this.count=this.obj.count;
             console.log(this.obj);
        },
        methods: {
            //点击++
            add(){
                this.count++;
                // 点击了增加或者减少的时候触发父组件中的$emit方法
                this.notice();
            },
            //点击--
            substract(){
                this.count--;
                if(this.count<=1){
                     this.count=1
                }
                this.notice();
            },
            //子组件把接收到的独享再传递会父组件
            notice(){
                this.$emit('msg',{gid:this.obj.gid,count:this.count})
            }
        }
    }
</script>
<style scoped>
    /* 自己设置一下样式 */
       .subtmpl ul{
        width: 120px;
    }

    .subtmpl li{
        list-style: none;
        display:inline-block;
        width: 30px;
        border: 1px solid rgba(0,0,0,0.3);
        text-align: center;
        padding: 2px;
        cursor: pointer;
    }  
</style>
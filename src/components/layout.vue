<template>
    <div class="tmpl">
        <!-- 公共部分写在这里 -->
        <div id="header" class="header">
            <div class="head-top">
                <div class="section">
                    <div class="left-box">
                        <span>vue2.0单页应用</span>
                        <a target="_blank" href="#"></a>
                        <a target="_blank" href="#"></a>
                    </div>
                    <div id="menu" class="right-box">
                        <router-link v-if="!islogin" to="/site/login">登录</router-link>
                        <a v-if="!islogin" href="/register.html">注册</a>
                        <strong>|</strong>
                        <a v-if="islogin" href="/register.html">会员中心</a>
                        <a v-if="islogin" @click="logout" href="javascript:void(0)">退出</a>
                        <router-link to='/site/car' id='layoutbuycar'>
                              <i class="iconfont icon-cart"></i>购物车(<span id="shoppingCartCount">{{buyTotalCount}}</span>)
                            </router-link>
                    </div>
                </div>
            </div>
            <div class="head-nav">
                <div class="section">
                    <!-- <div class="logo">
                               <a href="/index.html"><img width="230px" height="70px" src="/templates/main/images/logo.png" /></a>
                           </div>-->
                    <div id="menu2" class="nav-box menuhd">
                        <ul>
                            <li class="index">
                                <a href="/index.html">
                                    首页
                                </a>
                            </li>
                            <li class="news">
                                <a href="/news.html">
                                    学员问题汇总
                                </a>
                            </li>
                            <li class="photo">
                                <a href="/photo.html">
                                    重难点专区
                                </a>
                            </li>
                            <!--<li class="goods"><a href="">就业阶段</a></li>-->
                            <li class="video">
                                <a href="/video.html">
                                    前端常用功能
                                </a>
                            </li>
                            <li class="down">
                                <a href="/down.html">
                                    资源下载
                                </a>
                            </li>
                            <li>
                                <router-link to='/site/goodsinfo'>
                                    购物商城
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="search-box">
                        <div class="input-box">
                            <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){SiteSearch('/search.html', '#keywords');return false};"
                                placeholder="输入关健字" x-webkit-speech="">
                        </div>
                        <a href="javascript:;" onclick="SiteSearch('/search.html', '#keywords');">
                            <i class="iconfont icon-search"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <!-- 商品列表占位 -->
            <router-view></router-view>
        </div>
    </div>
</template>
<!-- 现在我们学习的是用webpack打包，所以直接用script引入js文件根本没有作用，必须要用import方法引入文件 -->
<script>
    
// 导入bus.js文件中的vm对象
import {vm,KEY} from '../kits/bus.js';

    export default {
        data() {
            return {
                 // 用户购买的商品总数
                 buyTotalCount:0,
                 islogin: false
            }
        },
        methods: {
            checkLogin() {
                var res = localStorage.getItem('logined');
                if (res == "true") {
                    // 已经登录了
                    this.islogin = true;
                } else {
                    // 已经注销了
                    this.islogin = false;
                }
            },
             // 注销
             logout(){
                this.$ajax.get('/site/account/logout').then(res=>{
                    if(res.data.status == 0){
                        // 注销成功，应该将localStroage中的logined的值变成false,同时要将当前layou.vue中的this.isloing的值设置成false
                        this.islogin = false;
                        localStorage.setItem('logined','false');

                        // 跳转到商品列表
                        this.$router.push({name:'goodslist'});
                    }
                });
            },
        },
        /* jquery的实现应该要能找到dom对象 */
        mounted() {
            // console.log($);
            // $(document).ready(function () { //这里是等dom对象加载完再执行
                $("#menu2 li a").wrapInner('<span class="out"></span>');
                $("#menu2 li a").each(function () {
                    $('<span class="over">' + $(this).text() + '</span>').appendTo(this);
                });

                $("#menu2 li a").hover(function () {
                    $(".out", this).stop().animate({ 'top': '48px' }, 300); // move down - hide
                    $(".over", this).stop().animate({ 'top': '0px' }, 300); // move down - show

                }, function () {
                    $(".out", this).stop().animate({ 'top': '0px' }, 300); // move up - show
                    $(".over", this).stop().animate({ 'top': '-48px' }, 300); // move up - hide
                });

            // });
            //每次刷新过后，将曾经购买的总数加载回来
            var countStr=localStorage.getItem('buyTotalCount');
            console.log(countStr);
            if(countStr !="NaN"){
                this.buyTotalCount=parseInt(countStr);
            }else{
                this.buyTotalCount=0; 
            }
           //利用vm中的$on方法完成事件的监听
           vm.$on(KEY,(buycount)=>{
               //改变得失内存中的变量值
               //在这里监听，已经实现了购物车数据的更新，但是本地内存当中没有这个值，所以一刷新页面购物车就没有数据了
               this.buyTotalCount+=buycount;
            //在这里将总数存储起来（选择localStorag）
               localStorage.setItem('buyTotalCount',this.buyTotalCount);

           });
             // 4.0.1 去 localStorage.getItem('logined');拿到只有以后赋值给this.islogin
             this.checkLogin();

            // 4.0 .2 利用vm的$on注册登录状态的改变
            vm.$on('changelogin', (val) => {
                // 获取localStroage中的是否登录的状态 ,key="logined"
                this.checkLogin();
            });


        }
    }
</script>
<style scoped>
    /* 在这里引入css样式 */
/* 备注：在css中图片的路径需要修改，w-03.jpg，不然会静报路径错误,有bug */
    @import '../../statics/jqplugins/jqhovernav/jqhoverNav.css';
</style>
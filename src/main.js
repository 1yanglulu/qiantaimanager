// 1.0 导入vue.js  <script src="vue.js">
// import vue from 'vue'
// var vue  = require('vue');  //查找node_modules中的vue这个包
import Vue from 'vue';

// 2.0 导入app.vue组件对象
import App from './App.vue';   //当前目录下面查找app.vue这个组件

// 3.0 导入vue-router这个路由模块进行整个系统的路由控制
// 3.0.1 导入vue-router这个包
import VueRouter from 'vue-router';

// 3.0.0 将VueRouter对象通过Vue.use()使用一下
Vue.use(VueRouter);

// 3.0.2 导入组件对象
import layout from './components/layout.vue';
import goodslist from './components/goods/goodslist.vue';
//引入商品组件
import  goodsinfo from './components/goods/goodsinfo.vue';
//引入购物车页面
import car from './components/goods/car.vue';
//引入下单页面组件
import shopping from './components/goods/shopping.vue';
//支付页面组件
import pay from './components/goods/pay.vue';
//登录页面
import login from './components/account/login.vue';

// 3.0.2 实例化对象并且定义路由规则
var router = new VueRouter({
    routes:[
        // 默认跳转的路由规则
        {name:'default',path:'/',redirect:'/site/goodslist'},
       
        // 布局
        {name:'layout',path:'/site',component:layout,
        children:[
            // 登录页面
            { name: 'login', path: 'login', component: login, meta: { nosave: 'true' } },
            // 商品列表
            //需要传入id的时候。这里一定要带上id，不然获取不到请求
           {name:'goodslist',path:'goodslist',component:goodslist},
           {name:'goodsinfo',path:'goodsinfo/:id',component:goodsinfo},
           {name:'car',path:'car',component:car},
           {name:'shopping',path:'shopping/:ids',component:shopping,meta: { checklogin: true }},
           { name: 'pay', path: 'pay/:orderid', component: pay, meta: { checklogin: true }}  
        ]
    }
    ]
});


// 4.0 导入vue的一个组件库:element-ui
import elementUI from 'element-ui';
// 导入默认样式(由于咱们自己修改了样式所以要替换默认样式)
import '../statics/elementuiCss/index.css';

// 导入自己编写的全局样式
import '../statics/site/css/style.css'
// 引入iview样式
import '../node_modules/iview/dist/styles/iview.css';

// 绑定到vue中
Vue.use(elementUI);

//按需引入
import {Affix} from 'iview';
Vue.component('Affix', Affix);
// 5.0 导入axios
import axios from 'axios';

// 5.0.1 设定axios的默认请求域名，将来在真正调用get,post方法的时候传入的url中就不需要带域名的
axios.defaults.baseURL = 'http://127.0.0.1:8899';

// 5.0.2 配置axios在请求数据服务接口的时候，允许带cookie(凭证)
axios.defaults.withCredentials = true;

// 5.0.2 将axios对象绑定到Vue的原型属性 $ajax上，将来在任何组件中均可以通过this.$ajax中的get(),post() 就可以发出ajax请求了
Vue.prototype.$ajax = axios;

//6.0全局守卫
// 职责1：在localStorage中记录用户访问的最后的那个页面（存储一个路由对象),排除登录页面
//职责2：进行登录检查
router.beforeEach((to,from,next)=>{
    //1.0在localStorage中记录用户访问的最后那个页面(存储一个路由对象)，排除登录页面
    if(to.meta.nosave !="true"){
      //保存得失当前路由对象中的path
      //保存得失当前路由对象中的path
      console.log(to);
      localStorage.setItem('currentPath',to.path);
    }
    //2.0进行登录检查
    if(to.meta.checklogin){
         //发出ajax请求 /site/account/islogin
        axios.get('/site/account/islogin').then(res=>{
             if(res.data.code=='logined'){
                 //表示已经登录了，则可以成功进入到目标页面
                 next();
             }else{
                  //表示未登录，则跳转到登录页面//使用编程式导航的额方法
                  router.push({name:'login'})
                  
             }
        })
    }else{
        next();
    }
})
//设置一个全局过滤器来格式化日期和时间
Vue.filter('datafmt',(input,dateStr)=>{
     var date=new Date(input);//默认input
     var y=date.getFullYear();
     var m=date.getMonth()+1;
     var d=date.getDate();
     var h=date.getHours();
     var mm=date.getMinutes();
     var s=date.getSeconds();
     if(dateStr=='YY-MM-DD HH:mm:ss'){
         return y+'-'+m+'-'+d+' '+h+":"+mm+":"+s;
     }else{
        return  y + '-' + m + '-' + d;
     }
    
})
// 7.0 实例化vue对象
new Vue({
    el:'#app',
    router,  //绑定路由对象使它生效
    // render:function(create){create(App)}
    // 将app组件编译将这个组件中的内容填充到 el:指向的app这个div中
    render:create=>create(App)  
});

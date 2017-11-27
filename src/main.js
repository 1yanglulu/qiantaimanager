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

// 3.0.2 实例化对象并且定义路由规则
var router = new VueRouter({
    routes:[
        // 默认跳转的路由规则
        {name:'default',path:'/',redirect:'/site/goodslist'},
       
        // 布局
        {name:'layout',path:'/site',component:layout,
        children:[
            // 商品列表
            //需要传入id的时候。这里一定要带上id，不然获取不到请求
           {name:'goodslist',path:'goodslist',component:goodslist},
           {name:'goodsinfo',path:'goodsinfo/:id',component:goodsinfo}
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

// 绑定到vue中
Vue.use(elementUI);

// 5.0 导入axios
import axios from 'axios';

// 5.0.1 设定axios的默认请求域名，将来在真正调用get,post方法的时候传入的url中就不需要带域名的
axios.defaults.baseURL = 'http://127.0.0.1:8899';

// 5.0.2 配置axios在请求数据服务接口的时候，允许带cookie(凭证)
axios.defaults.withCredentials = true;

// 5.0.2 将axios对象绑定到Vue的原型属性 $ajax上，将来在任何组件中均可以通过this.$ajax中的get(),post() 就可以发出ajax请求了
Vue.prototype.$ajax = axios;

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

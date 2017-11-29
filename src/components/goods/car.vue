<template>
    <div class="tmpl">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    {{values}}
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <el-button type='success' size='small' @click='selectAll'>{{selecTxt}}</el-button>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-if='goodslist.length<=0'>
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-for='(item,index) in goodslist' :key='item.id'>
                                    <td width="48" align="center">
                                        <!-- 全选 el-switch -->
                                        <el-switch on-text="已选" on-color="#13ce66" off-color="#ff4949" v-model="values[index]" off-text="未选"></el-switch>
                                    </td>
                                    </td>
                                    <td align="left" colspan="2">
                                        <!-- 这里放商品的图片和标题 -->
                                        <img height='50' width='50' :src="item.img_url" alt="item.title"> {{item.title}}
                                    </td>
                                    <td width="84" align="left">
                                        {{item.sell_price}}
                                    </td>
                                    <td width="104" align="center">
                                        <!-- 这里要自己定义一个组件 -->
                                        <inputnumber v-bind:obj="{gid:item.id,count:item.buycount}"  @msg='getinputnumber'>
                                        </inputnumber>
                                        
                                    </td>
                                    <td width="104" align="left">{{item.sell_price*item.buycount}}(元)</td>
                                    <td width="54" align="center">
                                        <a href="javascript:void(0);" @click="delData(item.id)">删除</a>
                                    </td>
                                </tr>

                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{selectedCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{getAmount}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getItem,setItemReplace,remoteItem} from '../../kits/localStoragehelper.js';
    //导入自己编写好的inputnumber.vue组件
    import inputnumber from '../subcom/inputnumber.vue'; 
    export default {
        //注册一个子组件
        components:{
             inputnumber   
        },
        data() {
            return {
                selectedCount: 0,
                selecTxt: '全选',
                isselected: false,
                values: [],//存储选择状态的数组
                goodslist: []
            }
        },
        //在computed中定义的方法就类似于在data中定义了一个属性，可以在模板中直接通过使用插值表达式的方式取出
        computed: {
            getAmount() {
                //1.0计算出当前选中的商品总件数
                //特点：计算睡醒所以来的this.values数组中的值发生改变就会自动重新执行
                var trueArr = this.values.filter(item => item);
                this.selectedCount=trueArr.length;
                //2.0统计选中商品的总金额
                var totalcount=0;
                //计算选中的额某个商品的总价格：商品单价*购买数量
                //计算所有选中的商品总价格=this.values中的所有的true的索引位置在this.goodslist这个数组红的对象
                //重新遍历this.values这个数组，找到所有的true索引
                this.values.forEach((item,index)=>{
                    //判断item=true才是我要统计的
                    if(item){
                         totalcount+=(this.goodslist[index].buycount*this.goodslist[index].sell_price)
                    }
                })
                return totalcount;
            }
        },

        methods: {
            //定义一个方法，获取添加至购物车的商品列表信息
            getgoodslist() {
                // 1.0 从localStroage中获取到用户购买的商品id
                // goodsObj的格式：{商品id:购买数量,92:1} 
                var goodsObj = getItem();
                //遍历goodsobj对象中的key,变成一个字符串用逗号分隔
                var idArr = [];
                for (var key in goodsObj) {
                    idArr.push(key);
                }
                var ids = idArr.join(",");
                var url = "/site/comment/getshopcargoods/" + ids;
                this.$ajax.get(url).then(res => {
                    console.log(res);
                    //通过输出res发现返回的 对象中有一个属性buycount，但是这个值时存储在客户端的，所以应该手动将goodsObj中的对应的商品购买数量赋值过去
                    res.data.message.forEach((item, index) => {
                        item.buycount = goodsObj[item.id];

                        //1将values中的值的个数一一初始化
                        this.values[index] = false;
                    })
                    //赋值
                    this.goodslist = res.data.message;
                })

            },
            //定义全选和反选的方法
            selectAll() {
                //将isselected取反
                this.isselected = !this.isselected;
                if (this.isselected) {
                    this.selecTxt = '反选';
                } else {
                    this.selecTxt = '全选';
                }
                //2
                for (var i = 0; i < this.values.length; i++) {
                    //修改一个数据的某个索引值一定要通过splice的方式才能重新出发刷新
                    //可以将数组内容改变一下也会触发
                    //注意点：通过索引修改一个数组中的某个值后不会触发视图的使用位置的值
                    this.values[i] = this.isselected;
                }
                //这两段代码是用来触发vue中的视图刷新的
                this.values.push(false);
                this.values.pop();

            },
            //定义一个删除数据的方法
            delData(id){
                  var index=this.goodslist.findIndex(item=>item.id==id);
                 //删除当前所以对应的数据
                  this.goodslist.splice(index,1);
                  //删除values中当前索引对应的状态
                  this.values.splice(index,1);
                  //修改localStorage中的数据
                  remoteItem(id);      
            },
            //定义一个方法来接收子组件传递过来的信息
            // 接收子组件中传回来值
            // obj的格式：{gid:商品id,count:修改以后的值}
            getinputnumber(gobj){
                // 这里应当修改localStorage中当前商品对应的购买数量
                //然后获取localStorage中的当前商品
                 setItemReplace(gobj);
                 //只需要将goodslist中当前商品对应的buycount值更新即可
                 var index=this.goodslist.findIndex(item=>{
                      return item.id==gobj.gid
                 })
                 this.goodslist[index].buycount=gobj.count;

            }
        },
        mounted() {
            //生成数据列表
            this.getgoodslist();
        }

    }
</script>
<style scoped>
</style>
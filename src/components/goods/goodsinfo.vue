<template>
    <div class="tmpl">
        <!-- 导航栏 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
                <a href="/goods/42/1.html">商品详情</a>

            </div>
        </div>

        <!-- 商品详情 -->
        <div class="section" v-if="info.goodsinfo">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <!--页面左边-->
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!--商品图片-->
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in info.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.original_path" />
                                                    </div>
                                                </li>

                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <!--/商品图片-->

                            <!--商品信息-->
                            <div class="goods-spec">
                                <!-- //这里不用遍历 -->
                                <h1 v-text='info.goodsinfo.title'></h1>
                                <p class="subtitle" v-text='info.goodsinfo.sub_title'></p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{info.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{info.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em class="price" id="commoditySellPrice">¥{{info.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>

                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <el-input-number v-model="num1" @change="buyCount" :min="1" :max="info.goodsinfo.stock_quantity">

                                            </el-input-number>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{info.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div class="btn-buy" id="buyButton">
                                                <button class="buy">立即购买</button>
                                                <button class="add" ref='btnaddcar' @click='addCar'>加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>

                            </div>
                            <!--/商品信息-->
                        </div>
                           
                                <span class="demo-affix"></span>
                            </Affix>

                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!--选项卡-->
                            <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li @click='istabShow=true'>
                                        <a v-bind="{class:(istabShow?'selected':'')}" href="javascript:;">商品介绍</a>
                                    </li>
                                    <li @click='istabShow=false'>
                                        <a v-bind="{class:(!istabShow?'selected':'')}" href="javascript:;" class="">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            </Affix> 
                            <!--/选项卡-->

                            <!--选项内容-->
                            <div class="tab-content entry" v-show='istabShow' style="display:block">
                                <div style="padding:5px" v-html="info.goodsinfo.content"></div>
                            </div>

                            <div class="tab-content" v-show='!istabShow' style="display:block">
                                <!--网友评论-->
                                <div class="comment-box">
                                    <!--取得评论总数-->
                                    <form id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" v-model="commentTxt" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" @click="postComment" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </form>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="commentList.length<=0" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
                                        <li v-for='item in commentList' :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>匿名用户</span>
                                                    <span>{{item.add_time | datafmt('YY-MM-DD HH:mm:ss')}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <!--放置页码-->
                                    <div class="page-box" style="margin:5px 0 0 62px">
                                        <!-- 使用elementUI的分页组件替代 -->
                                        <el-pagination @size-change="sizeChange" @current-change="pageChange" :current-page="pageIndex" :page-sizes="[2,5,10,20,30]"
                                            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalcount">
                                        </el-pagination>
                                    </div>
                                    <!--/放置页码-->
                                </div>

                                <!--/网友评论-->
                            </div>

                        </div>

                    </div>
                    <!--/页面左边-->

                    <!--页面右边-->
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in info.hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                                                {{item.title}}
                                            </router-link>
                                            <span>{{item.add_time | datafmt}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!--/页面右边-->
                </div>
            </div>
        </div>

        <!-- 定义一个div是用来展示图片的 -->
        <transition @before-enter="benter" @enter="enter" @after-enter="aenter">

            <div v-if="info.imglist" class="img" ref="img" v-show="isshow">
                <img width="50" height="50" :src="info.imglist[0].thumb_path" alt="">
            </div>
        </transition>
    </div>
</template>

<script>
    // 步骤2:导入jqimgzoom这个插件js <script src="../../../statics/jqplugins/jqimgzoom/js/magnifier.js">
    import '../../../statics/jqplugins/jqimgzoom/js/magnifier.js';
    //导入全局事件总线的相关数据
    import { vm, KEY } from '../../kits/bus.js';
    //导入localStorage
    import { setItem } from '../../kits/localStoragehelper.js'

    export default {
        data() {
            return {
                offsetObj:{},
                lbcOffSet:{},
                goodsid: this.$route.params.id,
                isshow:false,// 隐藏图片div
                currentBuyCount:1,
                pageIndex: 1,
                pageSize: 2,
                totalcount: 0,
                commentTxt: '',//用户填写的评论数据
                commentList: [],
                istabShow: true,//默认显示的是商品的详情
                info: {}, //负责存储服务器响应回来的商品的相关数据
                num1: 1,
            }
        },
        watch: {
            '$route': function () {
                this.goodsid = this.$route.params.id;
                this.getinfo();
            }
        },
        methods: {
            //定义一个提交评论的方法
            postComment() {
                var url = '/site/validate/comment/post/goods/' + this.goodsid;
                this.$ajax.post(url, { commenttxt: this.commentTxt }).then(res => {
                    if (res.data.status == 1) {
                        this.$message.error(res.data.message);
                        return;
                    }
                    // 提交成功以后的处理（刷新一下评论数据 this.getCommentList()）
                    this.getCommentList();

                    // 清空文本框
                    this.commentTxt = '';
                })
            },
            // 1.0 定义方法去根据url传入的商品id获取到商品的详情数据,
            getinfo() {
                var url = '/site/goods/getgoodsinfo/' + this.goodsid;
                // console.log(this.goodsid);
                this.$ajax.get(url).then(res => {

                    // 这里赋值以后就会触发v-if的重新渲染
                    this.info = res.data.message;
                    if (!this.info.goodsinfo) {
                        this.$message.error('传入的商品id非法');
                    }
                    // 应该是等待整个数据回来以后，才进行相册图片的渲染
                    // 延迟200毫秒初始化 
                    setTimeout(function () {
                        //从插件源代码里面复制出来的代码，用来控制插件的效果
                        //延迟200s执行师因为，如果把插件的执行和数据的获取放在同一级，就会出现数据获取不到的错误，
                        //只有在获取数据之后才能进行图片的渲染，所以让插件延迟执行
                        $('#magnifier1').imgzoon({ magnifier: '#magnifier1' });
                    }, 200);

                })
            },

            // 2.0 elelentUI的inputnumber组件的触发事件
            // val:代表的是最新的这个数字
            buyCount(val) {
                // console.log(val);
                this.currentBuyCount = val;
            },
            //3:设置一个分页获取商品评论数据的方法
            getCommentList() {
                // 获取商品评论的url,其中pageIndex和pageSize参数从data中来
                var url = '/site/comment/getbypage/goods/' + this.goodsid + '?pageIndex=' + this.pageIndex + '&pageSize=' + this.pageSize;
                this.$ajax.get(url).then(res => {
                    this.commentList = res.data.message;
                    //获取评论的总条数
                    this.totalcount = res.data.totalcount;
                })
            },
            //4:定义分页组件需要的而两个事件
            sizeChange(size) {
                this.pageSize = size;
                // 重新获取数据
                this.getCommentList();
            },
            //5:
            pageChange(index) {
                this.pageIndex = index;
                // 重新获取数据
                this.getCommentList();
            },
            //6:定义一个addCar
            //这里要实现非父子组件间的传值，所以要用到全局事件总线的方法
            //             有时候，非父子关系的两个组件之间也需要通信。在简单的场景下，可以使用一个空的 Vue 实例作为事件总线：
            // var bus = new Vue()
            // // 触发组件 A 中的事件
            // bus.$emit('id-selected', 1)
            // // 在组件 B 创建的钩子中监听事件
            // bus.$on('id-selected', function (id) {
            //   // ...
            // })
            addCar() {
                //1：利用vm.$emit()触发事件，将购买数量传入layout.vue组件
                vm.$emit(KEY, this.currentBuyCount);
                //获取到当前商品ID和购买的数量 localStroagehelper.js这个文件中的setItem方法来存储值
                var goodsobj = { gid: this.goodsid, count: this.currentBuyCount };
                //将当前购买商品的数量存储到localStorage中
                setItem(goodsobj);
                //点击加入购物车的时候这只isshow为true
                this.isshow='true';
            },
            //7:定义动画进入的三个钩子函数
            //设置left和top值的时候记得带单位，不然报错
             benter(el){
                  //设定动画的开始位置
                  el.style.left=this.offsetObj.left+'px';
                  el.style.top=this.offsetObj.top+'px';
             },
             enter(el,done){
                  //设定动画的结束位置，同时要调用el.offsetWidth来达到刷新的目的;
                  //调用done来触发aenter的执行
                  el.offsetWidth;
                  el.style.left=this.lbcOffSet.left+'px';
                  el.style.top=this.lbcOffSet.top+'px';
                  done();
             },
             aenter(el){
                 //动画结束之后隐藏div
                 this.isshow=false;

             }

        },
        mounted() {
            this.getinfo();
            //进入页面的时候需要获取一次评论数据
            this.getCommentList();
            //利用jq获取这个对象的offset//数据获取成功之后再获取left和top才可以，所以设置了一个延迟，不然会报错
            setTimeout(()=>{
                 //获取当前页面上的加入购物车按钮的位置
                 var offsetObj=$(this.$refs.btnaddcar).offset();
                 this.offsetObj=offsetObj;
                //  console.log(offsetObj);
                 //将加入购物车按钮的位置赋值给图片div
                 $(this.$refs.img).css("left",offsetObj.left).css("top",offsetObj.top);
                 //获取layout.vue组件中的id=layoutbuycar 这个dom对象
                 var lbcOffSet=$("#layoutbuycar").offset();
                 this.lbcOffSet=lbcOffSet;
                //  console.log(lbcOffSet);
            },200)

        }
    }
</script>
<style scoped>
    /* 步骤1：导入jqimgzoom中的css样式 */

    @import url('../../../statics/jqplugins/jqimgzoom/css/magnifier.css');

    .img {
        border: 1px solid red;
        width: 50px;
        height: 50px;
        position: absolute;      
        transition: all 0.3s; 
    }  
</style>
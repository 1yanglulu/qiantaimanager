
// 职责：负责结合加入购物车这个业务来操作localStorate的数据

// 1.0 定义一个全局key
const KEY = 'buyGoods';

// 2.0 从localStorage中获取到数据
export function getItem(){
  var jsongString =  localStorage.getItem(KEY);

//   如果localStorage中没有这个key对应的数据则返回一个空对象
  if(!jsongString){
      return {};
  }
  
//   如果有值，则将这个字符串转换成对象返回
  return JSON.parse(jsongString);
}


// 3.0 设置localStorage中的数据
// gobjgeshi：{gid:91,count:1}
export function setItem(gobj){

    // 1.0 从localStorage中获取购买商品的对象
   var obj = getItem();

    // 2.0 判断gobj.gid的值在obj中是否存在，
    // 如果存在将gobj.count的值叠加上去即可
    if(obj[gobj.gid]){
        // obj.91 = obj.91 + 1;
        obj[gobj.gid] = obj[gobj.gid] + gobj.count;
    }else{
        // 如果不存在，则动态向ob对象中添加一个商品的购买数量
        // 等价于  obj.91 = 1;
        obj[gobj.gid] = gobj.count;
    }

    // 3.0 将obj存储在loacalStorage中
    localStorage.setItem(KEY,JSON.stringify(obj));
}


// 4.0 删除localStorage数据
export function remoteItem(id){
     //从localStorage中获取购买商品的对象
     var obj=getItem(); 
     //删除对象中id对应的数据即可
     delete obj[id];
     //再讲obj重新存回本地
     localStorage.setItem(KEY,JSON.stringify(obj));
}

//设置一个修改localStorage中内存的方法
export function setItemReplace(gobj){
        //从localStorage中获取商品对象
        var obj=getItem();
        obj[gobj.gid]=gobj.count;
        //将obj存储回localStorage
        localStorage.setItem(KEY,JSON.stringify(obj));
}
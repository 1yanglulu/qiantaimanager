// 1.0 导入vue
import Vue from 'Vue';

// 2.0 实例化一个空的Vm对象导出
export var vm = new Vue();

// 3.0 $on()和 $emit() 共同使用的key（事件名称）
export var KEY = 'sendmsg';
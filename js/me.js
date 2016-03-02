/**
 * Created by lujiaju on 16/3/3.
 */
//输入的数据
var data = ['ITEM000001-10','ITEM000002','ITEM000003-4','ITEM000005-5','ITEM000004-1.5','ITEM000007-9'];
//商品信息
var detailGoods = {
    ITEM000001:{price:'10',name:'RIO',unit:'瓶',id:1},
    ITEM000002:{price:'5',name:'苹果',unit:'个',id:2},
    ITEM000003:{price:'10',name:'香蕉',unit:'斤',id:3},
    ITEM000004:{price:'6',name:'薯片',unit:'袋',id:4},
    ITEM000005:{price:'15.5',name:'鸡蛋',unit:'盒',id:5},
    ITEM000006:{price:'3',name:'醋',unit:'瓶',id:6},
    ITEM000007:{price:'5.5',name:'酱油',unit:'瓶',id:7},
    ITEM000008:{price:'60',name:'中华',unit:'包',id:8},
    ITEM000009:{price:'11',name:'上海',unit:'包',id:9},
    ITEM000010:{price:'22',name:'玉溪',unit:'包',id:10}
}

//这一步把传过来的值转成有用的明细(包含价格数量名字的对象数组)
function triggerData(data){
    var count = 0;
    var temporary = detailGoods;
    var goodsArr = [];
    data.forEach(function(c){
        var tmp = c.split('-');
        var obj = {};
        if(tmp.length==2){
            obj.amount = tmp[1];
        }
        if(tmp.length==1){
            obj.amount = 1;
        }
        obj.price = temporary[tmp[0]].price;
        obj.name = temporary[tmp[0]].name;
        obj.unit = temporary[tmp[0]].unit;
        obj.id = temporary[tmp[0]].id;
        goodsArr.push(obj);
    },temporary);
    return goodsArr;
}

//这里插入p(优惠政策);

function insertP(data,p){
    data.map(function(current,index,array){
        p.forEach(function(c,i,arr){
            if(c.id== current.id){
                current.policy = c.policy;
            }
        })
    });
}
//计算价格
function countEveryGoods(goods){
    console.log('***<没钱赚商店>购物清单***');
    var sum=0;
    var discount = [];
    var three_one = [];
    var profit=0;
    var flag = 'blank';
    goods.forEach(function(c,i,arr){
        if(!c.policy){
            console.log('名称: '+ c.name+', 数量: '+ c.amount+', 单价: '+ c.price+'(元), 小计: '+ c.price* c.amount+'(元)');
            sum+=c.price* c.amount;
        }
        if(c.policy=='discount'){
            var singleSum=c.price* c.amount*0.95;
            console.log('名称: '+ c.name+', 数量: '+ c.amount+', 单价: '+ c.price+'(元), 小计: '+ singleSum+'(元)'+' 节省:'+c.price* c.amount*0.05+'元');
            sum+=c.price* c.amount;
            profit += c.price* c.amount*0.05;
            flag+='discount';
        }
        if(c.policy=='three_one'){
            var singleSum=c.price* c.amount-Math.floor(c.amount/3)* c.price;
            console.log('名称: '+ c.name+', 数量: '+ c.amount+', 单价: '+ c.price+'(元), 小计: '+ singleSum+'(元)');
            sum+=c.price* c.amount;
            three_one.push({name: c.name,amount: c.amount});
            profit += Math.floor(c.amount/3)* c.price;
            flag+='three_one';
        }

    });
    console.log('----------');
    if(profit==0){
        console.log('总计: '+sum+' (元)');
    }

    if(flag.indexOf('three_one')>=0){
        console.log('买二赠一商品');
        three_one.forEach(function(c){
            console.log('名称:'+ c.name+',数量:'+ c.amount);
        });
        console.log('总计: '+(sum-profit)+' (元)');
        console.log('节省: '+profit+' (元)');
    }
    if(flag.indexOf('discount')>=0&&flag.indexOf('three_one')<0){
        console.log('总计: '+(sum-profit)+' (元)');
        console.log('节省: '+profit+' (元)');
    }
}



function go(p){
    var start = triggerData(data);
    if(p){
        insertP(start,p);
    }
    countEveryGoods(start);
}
//优惠政策 'three_one'代表买二送一,'dicount'代表打折
var p;
//无打折买二送一
var p1 = [{id:1,policy:'three_one'},{id:5,policy:'three_one'},{id:7,policy:'three_one'}];
//有买二送一
var p2 = [{id:1,policy:'discount'},{id:5,policy:'discount'},{id:7,policy:'discount'}];
//有打折
var p3 = [{id:1,policy:'three_one'},{id:5,policy:'discount'},{id:7,policy:'discount'}];
//有打折有买二送一
go(p);
console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
go(p1)
console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
go(p2)
console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
go(p3)

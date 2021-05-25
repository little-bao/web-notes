## 一.补充

```
查找函数的返回值规律
(1)如果原函数返回下标位置,如果找不到,返回-1
(2)如果原函数返回一个数组或,如果找不到,返回null
(3)如果原函数返回类数组对象,如果找不到返回空类数组对象{length:0}
```

```
总结: this 5种: 判断this，一定不要看定义在哪儿！只看调用时！
1. obj.fun()   this->obj 
2. fun() 或 (function(){ ... })() 或 多数回调函数    this->window
3. new Fun()   this->new正在创建的新对象
4. 类型名.prototype.共有方法=function(){ ... }   this->将来谁调用指谁，同第一种情况
5. 事件处理函数中的this->当前正在触发事件的DOM元素对象
```

## 二.什么是DOM

### 1.什么是DOM

```
 Document Object Model(文档对象模型)
 一套专门操作网页元素内容的对象,函数和属性的整体!
```

### 2.为什么需要DOM

```
ECMAScript仅规定了js语言的核心语法(怎么写对,怎么写不对).但是,ES标准没有规定如何使用js操作网页内容
```

### 3.什么时候使用DOM

```
将来只要操作网页内容,都必须使用DOM提供的对象,函数和属性
```

### 4.问题

```
1.DOM提供的对象,函数和属性比较繁琐,不太好用
解决:后人在DOM提供的对象,函数和属性基础上,又封装了简化的jQuery和Vue

2.因为ECMAScript标准不包括DOM的对象和函数。所以早期DOM没有标准，每种浏览器操作网页的方法各不相同！——严重的兼容性问题
解决: W3C组织作为第三方机构又制定了一个DOM标准，规定了所有浏览器操作网页内容的标准方式——今后使用DOM标准操作网页，几乎所有浏览器100%兼容。

 学了DOM可以做哪些事儿？5件事: 增删改查+事件绑定
```

## 二.DOM树

### 1.什么是DOM树

```
一个html网页中所有元素、内容和属性，在内存中都是被保存在一棵树形结构上！
```

### 2.为什么需要DOM树

```
因为HTML网页中的元素和内容都有明显的复杂的上下级包含关系，而树形结构是最直观的保存和反应上下级包含关系的结构！
```

### 3.何时

```
当浏览器窗口加载了一个HTML网页文件后，浏览器都会扫描HTML文件的内容，并在内存中创建DOM树以及DOM树上的节点对象来保存HTML中每项内容。
```

### 4.节点

```
树形结构或网状结构中多条线交汇的点，就称为节点！
```

### 5.如何创建DOM树

```
(1). 先在内存中创建一个唯一的树根节点对象: document
(2). 浏览器扫描HTML文件内容
(3). 每扫描到一项内容(元素、文本、属性)，浏览器就会在树根节点document下对应位置，创建一个节点对象，保存当前扫描到的一项内容
(4). 当扫描整个HTML文件结束，内存中就形成了一棵树形结构
```

![image](C:\Users\zero\Desktop\web notes\data\dom\dom1.png)

## 三.查找元素:4种

### (1)不需要查找就可直接获得的元素: 4种

```
1)document对象: document -- 代表整个网页所有内容
2)<html>元素对象: document.documentElement
3)<head>元素对象: document.head
4)<body>元素对象: document.body
```

### (2)按节点间关系查找: 两大类关系,6个属性

```
①其实有两种DOM树:节点树和元素树
	a. 节点树: 包含所有节点对象(元素、文本等)的完整树结构
	b. 元素树: 仅包含元素节点，不包含文本等其他类型节点的简化版树结构

②节点树上的关系
	a. 父子关系: 4个属性: 
		1). 获得一个节点对象的父节点:  节点对象.parentNode 
											父   节点
		2).获得一个节点对象下的所有直接子节点对象: 节点对象.childNodes
												   孩子节点们
		3).获得一个节点对象下的第一个直接子节点: 节点对象.firstChild
											   		第一个孩子
		4).获得一个节点对象下的最后一个直接子节点: 节点对象.lastChild
		                                          		最后一个孩子
	b. 兄弟关系: 2个属性： 
		1). 获得当前节点对象相邻的前一个兄弟节点: 节点对象.previousSibling
													前一个兄弟
		2). 获得当前节点对象相邻的下一个兄弟节点: 节点对象.nextSibling
													下一个兄弟
											
③节点树问题
节点树认为连看不见的换行和空格，也是文本类型的节点对象。也会成为子节点和兄弟节点。——严重干扰我们的查找结果！

④解决
新DOM标准中在原有完整DOM树基础上规定了一棵新的DOM树——元素树。元素树上的关系仅指向元素类型的节点。不再指向其他类型的节点。——好处，查找结果不会受到看不见的空字符的干扰！


⑤注意
元素树，不是一棵新树。仅仅是原完整节点树中的部分元素节点的一个子集。
```

![image](C:\Users\zero\Desktop\web notes\data\dom\dom2.png)

### (重要)总结

```
今后按节点间关系查找时，都用元素树，而不用节点树
```

```
a. 父子关系: 4个属性: 
	1). 获得一个元素对象的父元素:  元素对象.parentElement 
										 父   元素
	2).获得一个元素对象下的所有直接子元素: 元素对象.children
												 孩子们
		因为一个元素可能包含多个子元素，所以children属性返回一个类数组对象，其中包含找到的所有直接子元素对象。下标从0开始！
	3).获得一个元素对象下的第一个直接子元素: 元素对象.firstElementChild
											 第一个 元素 孩子
	4).获得一个元素对象下的最后一个直接子元素: 元素对象.lastElementChild
		                                          最后一个 元素 孩子
b. 兄弟关系: 2个属性： 
	1). 获得当前元素对象相邻的前一个兄弟元素: 	
		元素对象.previousElementSibling
				  前一个 元素 兄弟
	2). 获得当前元素对象相邻的下一个兄弟元素: 
		元素对象.nextElementSibling
			   下一个 元素 兄弟
```

![image](C:\Users\zero\Desktop\web notes\data\dom\dom3.png)

```html
<!DOCTYPE HTML>
<html>

<head>
  <title>DOM Tree</title>
  <meta charset="utf-8" />
</head>

<body>
  <span id="s1">Hello</span>
  <h1>标题一</h1>
  <script>
    //想输出document对象
    console.log(document);
    //想输出html元素对象
    console.log(document.documentElement);
    //想输出head元素对象
    console.log(document.head);
    //想输出body元素对象
    console.log(document.body);
    //本例暂时不用live server运行
    //因为live server会自动插入一个多余的script，干扰我们的查找。
    //应该直接在硬盘上的文件夹中找到这个.html文件，右键，打开方式，用chrome打开
    //想获得body的父节点: 应该是<html>
    //既可以用parentNode，又可以用parentElement
    var html=document.body.parentNode;//首选
    //var html=document.body.parentElement;
    console.log(html);//正确
    //因为在网页中能当爹，包含其它子内容的，只可能是元素。<开始标签>子内容</结束标签>

    //想获得body下的所有直接子元素: 应该是3个
    //错误做法: 
    //var childNodes=document.body.childNodes;
    //console.log(childNodes);//7个
    //正确做法: 
    var children=document.body.children;
    console.log(children);//3个
    //想获得body下的第一个直接子元素: 应该是span
    //错误做法: 
    //var span=document.body.firstChild;
    //正确做法: 
    var span=document.body.firstElementChild;
    console.log(span);
    //想实现body中最后一个直接子元素: 应该是script
    var script=document.body.lastElementChild;
    console.log(script);
    //想获得body中第二个孩子：应该是h1
    var h1=document.body.children[1];
    console.log(h1);
    //想获得h1，还可以通过span的下一个兄弟元素获得
    var h1=span.nextElementSibling;
    console.log(h1);
    //想获得h1，还可以通过script的前一个兄弟元素获得
    var h1=script.previousElementSibling;
    console.log(h1);
  </script>
</body>

</html>
```

```
今后如果已经获得一个DOM元素，想找它周围附近的其它DOM元素时，就用按节点间关系查找。
```

### (3)按HTML特征查找: 4个方法

```
何时使用:只要还没有获得任何DOM元素，就要查找元素，或要查找的元素离当前获得的元素很远，就选择按HTML特征查找。
```

##### ①.按id名查找一个元素

```
1). var 一个元素对象=document.getElementById("id名")
		         在整个网页中获取 元素 以id为条件
2). 返回值: 
	i. 如果找到符合条件的一个元素，就返回一个元素对象
	ii. 如果没找到符合条件的元素，就返回null
3). 强调: 
	i. 必须用document.作为开头
	ii. 因为按id查找，只能找到一个元素，所以Element不带s结尾，是单数形式
	iii. 如果网页中确实有多个相同的id，则getElementById()永远只能找第一个符合条件的。
```

#####  ②按标签名查找多个元素

```
1). var 类数组对象=任意父元素.getElementsByTagName("标签名")
			  在指定父元素下 获取多个元素以标签名为查找条件
2). 返回值: 
	i. 如果找到符合条件的多个元素，则多个元素放在一个类数组对象中返回
	ii. 如果找不到符合条件的元素，则返回空类数组对象: { length:0 }
	3). 强调: 
		i. 不一定必须用document作为开头。可以用任意父元素作为开头！仅在当前父元素下查找符合条件的元素。——好处，限制查找范围，提高查找效率
		ii. 因为可能返回多个符合要求的子元素，所以方法名中Elements是s结尾，复数形式。
		iii. 不但查找直接子元素，而且在所有后代中查找符合要求的元素
		iv. 问题: getElementsByTagName()注定会返回一个类数组对象。即使只找到一个元素，也会放在类数组对象中返回！但是，我们希望使用的绝不是类数组对象，我们通常希望使用的是这一个DOM元素对象
			解决: 只要在查找结果基础上继续加[0]，从类数组对象中0位置，取出找到的唯一的一个DOM元素对象。
			比如: body中只有一个span
			错误: 
			var span=document.body.getElementsByTagName("span");
			//返回的span不是DOM元素对象，而是一个类数组对象，其中0位置放着找到的唯一一个DOM元素对象span： { 0:span对象, length:0 }
			正确: 
			var span=document.body.getElementsByTagName("span")[0];
			//返回的span就是HTML中的DOM元素对象。[0]是从查找结果类数组对象中0位置取出唯一一个DOM元素对象的意思。
```

#####  ③按class名查找多个元素

```
1). var 类数组对象=任意父元素.getElementsByClassName("class名")
		       在任意父元素下 获取多个元素以className为条件
2). 返回值: 
	i. 如果找到符合条件的多个元素，则多个元素放在一个类数组对象中返回
	ii. 如果找不到符合条件的元素，则返回空类数组对象: { length:0 }
3). 强调: 
	i.可以用任意父元素作为开头！仅在当前父元素下查找符合条件的元素。
		——好处，限制查找范围，提高查找效率
	ii. 方法名中Elements是s结尾，复数形式。
	iii.在所有后代中查找符合要求的元素
	iv. 如果只找到一个元素，也必须加[0]，才能取出这唯一的DOM元素对象
	v. 如果一个元素上同时被多个class修饰，那么只用其中一个class名就可找到该元素。
```

##### ④按name属性查找多个表单元素

```
1). var 类数组对象=document.getElementsByName("name名")
			   在整个页面中 获取多个元素以name名作为条件
2). 返回值: 
	i. 如果找到符合条件的多个元素，则多个元素放在一个类数组对象中返回
	ii. 如果找不到符合条件的元素，则返回空类数组对象: { length:0 }
3). 强调: 
	i.必须用document.作为开头！不能以任意父元素开头！
	ii. 方法名中Elements是s结尾，复数形式。
	iii. 如果只找到一个元素，也必须加[0]，才能取出这唯一的DOM元素对象
```

```html
//练习:使用按HTML特征查找四个函数查找想要的元素
<!DOCTYPE HTML>
<html>
  <head>
    <title>遍历节点树</title>
    <meta charset="utf-8"/>
  </head>
  <body>
    <span>Hello World !</span>
    <ul id="nav">
      <li class="parent">电影</li>
      <li class="parent">综艺
        <ul>
          <li class="child active">跑男</li>
          <li class="child">爸爸</li>
          <li class="child">极限</li>
        </ul>
      </li>
      <li class="parent">剧集</li>
    </ul> 
    用户名: <input type="text" name="uname"><br/>
    性别: 
    <label>
      <input type="radio" name="sex" value="1">男
    </label>
    <label>
      <input type="radio" name="sex" value="0">女
    </label>
    <script>
      //想查找id为nav的ul
      var ul=document.getElementById("nav");
      console.log(ul);
      //强调: 所有元素不查找，是不能直接使用！
      //要想使用某个元素，都必须先查找再使用
      //想查找ul下的所有li
      var lis=ul.getElementsByTagName("li");
      console.log(lis);

      //想在body下找span
      //只可能找到一个span时
      var span=
        //document.body.getElementsByTagName("span")
        //返回类数组对象，其中包含一个span元素对象

        document.body.getElementsByTagName("span")[0]
        //直接返回类数组对象中0位置的span元素对象。
      console.log(span);//

      //想查找ul下所有class为parent的li
      var parents=ul.getElementsByClassName("parent");
      console.log(parents);
      //想查找ul下所有class为child的li
      var children=ul.getElementsByClassName("child");
      console.log(children);
      //想查找ul下class为active的一个li
      var liActive=ul.getElementsByClassName("active")[0];
      console.log(liActive);

      //想查找name为sex的两个元素
      var radios=document.getElementsByName("sex");
      console.log(radios);
      //想查找name为uname的一个文本框
      var txtUname=document.getElementsByName("uname")[0];
      console.log(txtUname);
    </script>
  </body>
</html>
```

#### (4)按选择器查找:2个函数

```
今后，只要元素藏的很深，查找条件很复杂时，都要选择按选择器查找
```

##### ①只查找一个符合条件的元素

```
var 一个元素对象=任意父元素.querySelector("任意选择器");
```

##### ②查找多个符合条件的元素

```
var 类数组对象=任意父元素.querySelectorAll("任意选择器");
```

## 四.事件绑定函数基础

### 1.什么是事件

```
浏览器自己触发的或用户手工触发的页面中元素内容和状态的改变
```

### 2.什么是事件处理函数

```
事件发生时，希望浏览器自动调用的函数
```

### 3.什么是绑定事件

```
提前在元素的事件属性上保存一个事件处理函数
	结果: 等到事件发生时，自动执行该事件处理函数。
```

### 4.为什么绑定事件

```
网页中所有元素，默认即使发生了事件，也什么都不做
```

### 5. 何时需要事件绑定

```
如果希望一个元素触发事件时可以自动执行一个操作，都要提前为元素绑定事件处理函数
```

### 6.如何绑定事件处理函数

#### (1)在HTML中绑定: —— 不好，几乎不用！

```
a. HTML中:  <元素 on事件名="函数名()" >
b. js中: function 函数名(){ ... }
c. 问题: 
	1). 不符合js程序与HTML内容分离的原则，不便于维护！
	2). 开始标签中写死的事件属性，新生成的元素，无法自动获得。
d. 结论: 在DOM和jQuery中绝对不会使用HTML绑定事件处理函数
```

#### (2) 在js中用赋值方式绑定

```
a. 查找到要绑定事件的元素对象
b. 每个元素对象上，都包含很多on开头的特殊事件属性(console.dir(对象)可查看)
c. 当这个元素上发生事件时，浏览器会自动找到这个元素上对应的onxxx事件属性，并执行onxxx事件属性上提前绑定的事件处理函数。
d. 所以，我们需要提前为这个元素对象的某个onxxx事件属性赋值一个事件处理函数备用！
	元素对象.on事件名=function(){
		//当事件发生时，才执行的代码
	}
e. 强调: 这里的function，仅赋值并保存在on事件名属性中，暂不执行！
f. 优点: 
	1). 可集中写在js中，便于维护
	2). 是js语句，想什么时候执行，就什么时候执行！想给谁绑定，就给谁绑定！——灵活！
```

```
事件处理函数中的this -> 当前正在触发事件的元素
```

```
今后几乎所有DOM操作的标准4步: 
	a. 先查找可能触发事件的元素
	b. 再为元素绑定事件处理函数
	c. 当事件发生时，查找要修改的元素
	d. 修改元素
```

```html
<!DOCTYPE HTML>
<html>

<head>
    <title>使用Selector API实现购物车客户端计算</title>
    <meta charset="utf-8" />
    <style>
        table {
            width: 600px;
            text-align: center;
            border-collapse: collapse;
        }

        td,
        th {
            border: 1px solid black
        }

        td[colspan="3"] {
            text-align: right;
        }

        /*想让tbody中每行最后一个td背景变为粉色*/
        tbody td:last-child {
            background-color: pink;
        }

        /*想让tfoot中最后一个td背景变为黄色*/
        /* tfoot td:last-child{
		background-color:yellow;
	} */
    </style>

</head>

<body>
    <table id="data">
        <thead>
            <tr>
                <th>商品名称</th>
                <th>单价</th>
                <th>数量</th>
                <th>小计</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>iPhone6</td>
                <td>¥4488.00</td>
                <td>
                    <button>-</button>
                    <span>1</span>
                    <button>+</button>
                </td>
                <td>¥4488.00</td>
            </tr>
            <tr>
                <td>iPhone6 plus</td>
                <td>¥5288.00</td>
                <td>
                    <button>-</button>
                    <span>1</span>
                    <button>+</button>
                </td>
                <td>¥5288.00</td>
            </tr>
            <tr>
                <td>iPad Air 2</td>
                <td>¥4288.00</td>
                <td>
                    <button>-</button>
                    <span>1</span>
                    <button>+</button>
                </td>
                <td>¥4288.00</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3">Total: </td>
                <td>¥14064.00</td>
            </tr>
        </tfoot>
    </table>
    <script>
        //实现第一个功能: 点击按钮修改数量
        //DOM 4步
        //1.查找触发事件的元素
        //本例中: 应该查找table下的所有button元素: 2步
        //1.1 先查找table元素: 查找id为data的table
        let table = document.getElementById("data");
        //1.2再在table下查找所有的button元素
        let btns = table.getElementsByTagName("button");
        //2.为元素绑定事件处理函数
        for (let btn of btns) {
            btn.onclick = function () {
                //this->当前正在触发事件的DOM元素对象
                //获取要修改的span元素
                let span = btn.parentElement.children[1];
                //因为页面中的元素获取的值都是字符串,因此必须先转为数字才能进行加减运算
                let num = Number(span.innerHTML);
                if (this.innerHTML === "+") {
                    num++;//点击一次按钮,就加1
                    //将新值赋值回span元素
                }else{
                    if(num > 1){
                        num--;
                    }
                }
                
                span.innerHTML = num;
                //获取保存着单价的元素
                let unitPrice = btn.parentElement.previousElementSibling;
                //获取保存着小计的元素
                let td = btn.parentElement.nextElementSibling;
                // console.log(td);
                //去除价格前的￥,并将字符串转换为数值
                let price = Number(unitPrice.innerHTML.slice(1));
                //计算出新值
                price = num * price;
                //将新值赋值给保存着小计的元素
                td.innerHTML = `￥${price.toFixed(2)}`;
                //获取保存着总价的元素对象
                let totalPrice = table.querySelector("tfoot>tr>td:last-child");
                //计算前三个值的和
                //先获取到保存着小计的几个元素对象
                let tds = table.querySelectorAll("tbody>tr>td:last-child");
                let sum = 0;
                //循环遍历所有保存着小计的元素,取出值,并放入sum中
                for(let td of tds){
                    sum += Number(td.innerHTML.slice(1));
                }
                //将新计算的值放入保存着总价的元素中
                totalPrice.innerHTML = `￥${sum.toFixed(2)}`;

            };
        }
    </script>
</body>
</html>
```

## 五.修改: 3种情况

### 1.内容: 3种

#### (1)元素.innerHTML

```
获取或修改元素开始标签到结束标签之间的原始HTML内容
```

#### (2)元素.textContent

```
获取或修改元素开始标签到结束标签之间的纯文本内容
```

```
对比: textContent vs innerHTML
1.获取内容时:
	1)innerHTML: 不做任何加工,直接取出原始的HTML代码内容
	2)textContent: 将原始内容加工后,只返回纯文本正文内容
		a. 去掉所有内嵌的标签
   		b. 将特殊符号翻译为正文
   
2.修改内容时:
	1)交给innerHTML的内容,先交给浏览器解析,将解析后的内容显示给人看
    2)交给textContent的内容,不交给浏览器解析,而是原样显示内容
```

#### (3)元素.value

```
获取或设置表单元素的值
```

```html
//练习: 获取和修改各种元素的内容和值
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <p id="p1">来自<a href="javascript:;">&lt;&lt;新华社&gt;&gt;</a>的消息</p>
  <p id="p2"></p>
  <p id="p3"></p>
  <input id="uname" type="text"/>
  <button id="btn">提交</button>
  <script>
    var p1=document.getElementById("p1");
    var p2=document.getElementById("p2");
    var p3=document.getElementById("p3");
    //获取内容: 
    //想获得p1中的原始的HTML内容
    console.log(p1.innerHTML);
    //想获得p1中的纯文本内容
    console.log(p1.textContent);
    //修改内容: 
    //想修改p2的原始的HTML内容: 
    p2.innerHTML=`来自<a href="javascript:;">&lt;&lt;新华社&gt;&gt;</a>的消息`;
    //想修改p3的纯文本内容: 
    p3.textContent=`来自<a href="javascript:;">&lt;&lt;新华社&gt;&gt;</a>的消息`;

    //想点提交按钮时，获取文本框中用户输入的内容
    var btn=document.getElementById("btn");
    btn.onclick=function(){
      var uname=document.getElementById("uname");
      //错误: 
      // console.log(`你输入的用户名是:${uname.innerHTML}`);
      //正确: 
      console.log(`你输入的用户名是:${uname.value}`);
    }
  </script>
</body>
</html>
```

```html
//练习:开关门效果
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>读取并修改元素的内容</title>
    <style>
        div {
            float: left;
            height: 100px;
            line-height: 100px;
        }

        #d1,
        #d3 {
            background-color: #ccff00;
        }

        #d2 {
            cursor: pointer;
            background-color: #ffcc00;
        }
    </style>
</head>

<body>
    <div id="d1">树形列表</div>
    <div id="d2">&lt;&lt;</div>
    <div id="d3">内容的主体</div>

    <script>
        let d1 = document.getElementById("d1");
        let d2 = document.getElementById("d2");

        d2.onclick = function () {
            if (this.innerHTML === "&lt;&lt;") {
                d1.style.display = "none";
                this.innerHTML = "&gt;&gt;";
            } else {
                d1.style.display = "";
                this.innerHTML = "&lt;&lt;";
            }
        };
    </script>
</body>

</html>
```

### 2.属性: 3种

#### (1)字符串类型的HTML标准属性

```
a. 什么是: HTML标准中规定的大部分元素都有的值为字符串的HTML属性
b. 比如: title  id   name   href    src    ...
c. 如何: 2种: 
	1). 早期核心DOM四个函数: 
	i. 获取属性值: var 属性值=元素.getAttribute("属性名")
								获取 属性
	ii. 修改属性值: 元素.setAttribute("属性名","属性值")
					  设置 属性
	iii. 判断是否包含某个属性: var bool=元素.hasAttribute("属性名")
											包含 属性
	iv. 移除属性: 元素.removeAttribute("属性名")
					移除  属性
```

```html
//练习: 使用核心DOM4个函数操作元素属性
<!DOCTYPE html>
<html lang="en">

<head>
      
    <meta charset="UTF-8">
      
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
</head>

<body>
    <a href="https://www.baidu.com" id="a1">go to baidu</a>
    <script>
        var a1 = document.getElementById("a1");
        //想获得a1的href属性值
        var href = a1.getAttribute("href");
        console.log(href);
        //想判断a1是否包含title属性
        var bool = a1.hasAttribute("title");
        console.log(bool);//false
        //想为a1设置title属性
        a1.setAttribute("title", "欢迎访问tmooc")
        console.log(a1.outerHTML);//输出自己的HTML元素代码
        //再判断a1是否包含title属性
        var bool = a1.hasAttribute("title");
        console.log(bool);//true
        //想移除a1的title属性
        a1.removeAttribute("title")
        console.log(a1.outerHTML);//输出自己的HTML元素代码
        //再判断a1是否包含title属性
        var bool = a1.hasAttribute("title");
        console.log(bool);//false
    </script>
</body>

</html>
```

#### 新版HTML DOM简化方式

```
已经提前将元素所有可用的HTML标准属性都添加到内存中元素节点对象上!只不过页面上暂时没有出现的属性,值暂时为""而已.所以,我们可以用"元素.属性名"来访问HTML标准属性

i. 获取属性值: 元素.属性名
ii. 修改属性值: 元素.属性名="属性值"
iii. 判断是否包含某个属性: 元素.属性名!==""
iv. 移除属性: 元素.属性名=""
v. 特例: class属性: 
		html中: <元素 class="class名">
		js中: 元素对象.class="class名"
				ES6中，class是js的关键字，表示创建一种类型的意思！
				DOM中，元素对象.className
```

```html
 //练习: 使用HTML DOM方式简化操作元素属性
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <a id="a1" href="http://tmooc.cn">go to tmooc</a>
  <script>
    var a1=document.getElementById("a1");
    console.dir(a1);
    //想获得a1的href属性值: 
    console.log(a1.href);
    //想判断a1是否包含title属性
    console.log(a1.title!=="");//false
    //想为a1设置title属性
    a1.title="欢迎访问tmooc";
    console.log(a1.outerHTML);
    //再判断a1是否包含title属性
    console.log(a1.title!=="");//true
    //想移除a1的title属性
    a1.title="";
    console.log(a1.outerHTML);
    //再判断a1是否包含title属性
    console.log(a1.title!=="");//false
  </script>
</body>
</html>
```

```html
//练习: 下拉菜单，手风琴效果
<!DOCTYPE HTML>
<html>
<head>
<title>1. 实现伸缩二级菜单</title>
<meta charset="utf-8" />
<style>
	li{
		list-style:none;
	}
	li span{
		padding-left: 20px;
		cursor: pointer;
		background: url("../images/add.png") no-repeat center left;
	}
	li ul{
		display: none; 
	}
	.open{ 
		background: url("../images/minus.png") no-repeat center left; 
	}
	.open+ul{ 
		display: block; 
	}
</style>
</head>
<body>
	<ul class="tree">
		<li>
			<span class="open">考勤管理</span>
			<ul>
				<li>日常考勤</li>
				<li>请假申请</li>
				<li>加班/出差</li>
			</ul>
		</li>
		<li>
			<span>信息中心</span>
			<ul>
				<li>通知公告</li>
				<li>公司新闻</li>
				<li>规章制度</li>
			</ul>
		</li>
		<li>
			<span>协同办公</span>
			<ul>
				<li>公文流转</li>
				<li>文件中心</li>
				<li>内部邮件</li>
				<li>即时通信</li>
				<li>短信提醒</li>
			</ul>
		</li>
	</ul>
  <script>
		//需求: 
		//点击一级菜单: 
		//	如果自己(当前span)是开着的，只关闭自己（当前span）即可，不用管别人
		//	否则如果自己(当前span)是关着的，就需要做两件事
			//	先找到另一个开着的菜单(另一个class为open的span),把它先关上
			//  再把自己(当前span)打开
		//结果: 同一时刻最多只可能有一个菜单是开着的！
		//      也有可能所有菜单都关上

		//DOM 4步
		//1. 查找触发事件的元素
		//本例中: 用户点class为tree的ul下的每个li下的span触发变化
		var spans=document.querySelectorAll("ul.tree>li>span");
		//2. 绑定事件处理函数
		//本例中: 每个span都可以单击
		//遍历spans类数组对象中每个span元素
		for(var span of spans){
			//每遍历一个span元素，都要绑定单击事件
			span.onclick=function(){
				//测试: 点哪个span，让哪个span的内容变成❀
				//this.innerHTML="❀";
				//3. 查找要修改的元素
				//本例中: 注定要修改的就是当前span自己——this
				//所以不用找！
				//4. 修改元素:
				//如果当前span是开着的(如果当前span的class是open，则当前span旁边的ul一定是开着的)
				if(this.className=="open"){
					//只关闭自己即可
					this.className=""; //清除当前span的class open，当前span旁边的ul，就默认隐藏了！
				}else{//否则如果当前span是关着的
					//先尝试查找另一个开着的span——注定最多只能找到一个
					//查找class为tree下的class为open的span
					var openSpan=document.querySelector(
						"ul.tree>li>span.open"
					);//如果没找到返回null
					//如果找到另一个开着的span
					if(openSpan!=null){
						//就把另一个开着的span先关上
						openSpan.className="";//清除另一个开着的span的class open，则另一个开着的span旁边的ul默认隐藏
					}
					//无论前边是否找到另一个开着的span。最后，只要自己是关着的，都要把自己打开！
					this.className="open";//为当前span自己加class open，当前span旁边的ul就受牵连而显示！
				}
			}
		}
		//现在还不到你们原创的时候！
		//现阶段！就是处在照猫画虎的阶段！
		//你们要做的是反复练习人话！
	</script>
</body>
</html>
```

#### (2)bool类型的HTML标准属性

```
a. 什么是: HTML标准中规定的，但是不需要指定属性值，只要放在元素上就起作用的属性！
b. 比如: disabled 禁用     checked选中 ...
c. 如何: 只有一种访问方式: 
	1). 错误做法: 不能用核心DOM4个函数访问。因为核心DOM4个函数只支持字符串类型的属性值！不支持bool类型的属性值！
	2). 正确做法: 只能用HTML DOM "元素.属性名"，且属性值都是bool类型的true或false！
```

```html
//练习: 使用HTML DOM访问元素的bool类型的HTML标准属性
<!DOCTYPE html>
<html lang="en">

<head>
      
    <meta charset="UTF-8">
      
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
</head>

<body>
    <input type="checkbox" id="chb" type="checkbox">同意
    <button id="btn1">提交</button>
      
    <script>
        var btn1 = document.getElementById("btn1");
        btn1.onclick = function () {
            var chb = document.getElementById("chb");
            console.log(chb.checked == true ? "选中" : "未选中");
        }
    </script>
</body>
</html>
```

```
补充: CSS3中提供了一个选择器 ——> :checked，专门匹配选中的checkbox或radio元素
```

```html
//练习:全选和取消全选
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>全选和取消全选</title>
</head>
<body>
  <h2>管理员列表</h2>
  <table border="1px" width="500px">
    <thead>
    <tr>
      <th><input type="checkbox"/>全选</th>
      <th>管理员ID</th>
      <th>姓名</th>
      <th>操作</th>
    </tr>
    </thead>
    <tbody>
      <tr>
        <td><input type="checkbox"/></td>
        <td>1</td>
        <td>Tester</td>
        <td>修改 删除</td>
      </tr>
      <tr>
        <td><input type="checkbox"/></td>
        <td>2</td>
        <td>Manager</td>
        <td>修改 删除</td>
      </tr>
      <tr>
        <td><input type="checkbox"/></td>
        <td>3</td>
        <td>Analyst</td>
        <td>修改 删除</td>
      </tr>
      <tr>
        <td><input type="checkbox"/></td>
        <td>4</td>
        <td>Admin</td>
        <td>修改 删除</td>
      </tr>
    </tbody>
  </table>
  <button>删除选定</button>
  <script>
    //需求: 
    //1. 点表头中的checkbox，可控制表体中每行第一个checkbox的选中状态
    //2. 点表体中每行第一个checkbox，有可能反过来影响表头中的checkbox的选中状态

    //需求一: 点表头中的checkbox，可控制表体中每行第一个checkbox的选中状态
    //DOM 4步
    //1. 查找触发事件的元素
    //本例中: 用户点表头中的input，触发下边input的变化
    var chbAll=document.querySelector("thead>tr>th:first-child>input");
    console.log(chbAll);
    //2. 绑定事件处理函数
    //本例中: 用户单击全选按钮，触发下边的变化
    chbAll.onclick=function(){
      //this->全选按钮chbAll
      //3. 查找要修改的元素
      //本例中: 点表头中的全选，要修改表体中每行第一个td中的input
      var chbs=document.querySelectorAll("tbody>tr>td:first-child>input");
      //4. 修改元素
      //如果全选按钮是选中的
        //则下边每个按钮也都要选中
      //否则如果全选按钮时未选中的
        //则下边每个按钮也都要取消选中
      //结论: 其实就是让下边每个chb的checked属性值和全选按钮的checked属性值保持一致！
      for(var chb of chbs){
        chb.checked=this.checked;
      }
    }
  
    //需求二: 点表体中每行第一个checkbox，有可能反过来影响表头中的checkbox的选中状态
    //DOM 4步: 
    //1. 查找触发事件的元素
    //本例中: 用户点的是表体中每行第一个td中的checkbox
    var chbs=document.querySelectorAll("tbody>tr>td:first-child>input");
    //2. 绑定事件处理函数
    //本例中: 表体中每个chb都可以点击
    //遍历chbs中每个chb
    for(var chb of chbs){
      //每遍历一个chb元素，为其就绑定单击事件
      chb.onclick=function(){
        //3. 查找要修改的元素
        //本例中: 当单击下方每个chb时，都有可能修改表头中第一个th中的input
        var chbAll=document.querySelector("thead>tr>th:first-child>input");
        //4. 修改元素
        //尝试在tbody中查找一个未选中的checkbox
        var unchecked=document.querySelector(
          "tbody>tr>td:first-child>input:not(:checked)"
        );
        //如果找到了这样一个checkbox，则chbAll不选中。
        if(unchecked!=null){
          chbAll.checked=false;
        }else{//否则如果没找到这样一个checkbox，则chbAll选中
          chbAll.checked=true;
        }
      }
    }
  </script>
</body>
</html>
```

#### (3)自定义扩展属性

```
a. 什么是: HTML标准中没有定义的，程序员根据自身需要，自发添加的自定义属性。
b. 何时: 2个场景
	1). 在HTML元素上缓存一些业务相关的数据
```

![image](C:\Users\zero\Desktop\web notes\data\dom\dom5.png)

```
	2). 代替其他选择器，专门作为查找触发事件的元素的条件
		i. 其他选择器的问题: 
			id选择器: 一次只能选一个元素，不能选择多个元素
			元素选择器: 实现同一种效果，不同的人使用的元素可能各不相同！
			类选择器: 本职工作就不是为js服务的！类选择器的本质工作是为了给元素添加样式！所以，在类选择器中如果出现与css无关的class名，很可能被轻易删掉。此时，如果你的js刚好用到这个被删除的类名，则js程序立刻出错！
		ii. 以上三种选择器，尽量不要用于DOM中查找触发事件的元素！
		iii. 今后在DOM中查找触发事件的元素最好都用自定义扩展属性
```

![image](C:\Users\zero\Desktop\web notes\data\dom\dom6.png)

```
c. 如何使用自定义扩展属性: HTML5标准
	1). 在HTML中元素上添加自定义扩展属性: 
		<元素 data-自定义属性名="属性值">
	2). 在js中操作元素的自定义扩展属性: 
		i. 错误: 不能用.直接访问自定义扩展属性
			因为自定义扩展属性是后天添加的，不在HTML标准范围内。所以HTML DOM无法提前预知自定义属性，也就无法自动添加到内存中的元素对象上。
		ii. 正确: 2种: 
			①可以用旧式的核心DOM4个函数来操作——没有兼容性问题
				获取: 元素对象.getAttribute("data-自定义属性名")
				修改: 元素对象.setAttribute("data-自定义属性名","属性值")
				强调: 如果用核心DOM4个函数，自定义属性名前必须加data-才行
			②可以用HTML5提供的新的简写方式——兼容性问题
				如果html中元素上定义自定义扩展属性时，开头加了data-前缀，则可用: 
				元素对象.dataset.自定义属性名
				强调: 
					使用dataset时，不用加data-前缀！dataset会自动查找data-前缀的属性
					只有加了data-前缀的自定义属性，才能被dataset访问到！
```

```html
练习:使用自定义扩展属性查找元素，并操作元素的自定义扩展属性
<!DOCTYPE html>
<html lang="en">

<head>
      
    <meta charset="UTF-8">
      
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
</head>

<body>
    <a href="javascript:;" id="a1" data-click="btn" data-content="百度一下">百度</a>
      
    <script>
        //想查找带有data-click属性的，且属性值为btn的a元素
        let a = document.querySelector("[data-click=btn]");
        console.log(a.outerHTML);
        //想获得data-content属性的值
        //console.log(a.getAttribute("data-content"));
        console.log(a.dataset.content);
        //想修改data-content属性的值为hello
        //a.setAttribute("data-content","hello");
        a.dataset.content="baidu";
        console.log(a);
    </script>
</body>

</html>
```

```html
//练习: 标签页效果
<!DOCTYPE HTML>
<html>
<head>
<title>读取并修改元素的属性</title>
<meta charset="utf-8" />
<style>
  *{
    margin:0;
    padding: 0;
  }
  #tab li{
    float: left; list-style: none;
  }
  #tab li a{
    display:inline-block;
    text-decoration:none;
    width: 80px; height: 40px;
    line-height: 40px;
    text-align: center;
    color:#000;
  }
  #container{
    position: relative;
  }
  #content1,#content2,#content3{
    width: 300px;
    height: 100px;
    padding:30px;
    position: absolute;
    top: 40px;
    left: 0;
  }
  #tab li:first-child,#content1{
    background-color: #ffcc00;
  }
  #tab li:first-child+li,#content2{
    background-color: #ff00cc;
  }
  #tab li:first-child+li+li,#content3{
    background-color: #00ccff;
  }
</style>

</head>
<body>
	<h2>实现多标签页效果</h2>
  <div class="tabs">
    <ul id="tab">
      <li><a href="#content1" data-btn="tab" data-divid="content1">10元套餐</a></li>
      <li><a href="#content2" data-btn="tab" data-divid="content2">30元套餐</a></li>
      <li><a href="#content3" data-btn="tab" data-divid="content3">50元包月</a></li>
    </ul>
    <div id="container">
      <div id="content1">
        10元套餐详情：<br />&nbsp;每月套餐内拨打100分钟，超出部分2毛/分钟
      </div>
      <div id="content2">
        30元套餐详情：<br />&nbsp;每月套餐内拨打300分钟，超出部分1.5毛/分钟
      </div>
      <div id="content3">
        50元包月详情：<br />&nbsp;每月无限量随心打
      </div>
    </div>
  </div>
  <script>
    //准备工作: 
    //1. 为每个触发事件的按钮添加自定义属性，用于查找触发事件的元素
    //2. 为每个按钮添加自定义扩展属性，提前保存每个按钮对应的div的id
    //DOM 4步
    //1. 查找触发事件的元素
    //本例中: 用户点ul下的包含data-btn属性，且属性值为tab的按钮元素触发变化
    var tabs=document.querySelectorAll(`[data-btn=tab]`);
    //先定义一个变量i=100，记录目前最大的zIndex值
    var i=100;//每点一次标签页，都i++。
    //结果，下次点标签页时的i，一定比上次点标签页时i大1
    //2. 绑定事件处理函数
    //本例中: 每个标签都可以点
    //遍历tabs中每个标签按钮
    for(var tab of tabs){
      //每遍历一个标签按钮就要为其绑定单击事件
      tab.onclick=function(){
        //3. 查找要修改的元素
        //本例中: 找到当前标签按钮对应的div
        //2步: 
        //3.1 从当前按钮自己身上的data-divid属性中取出对一个div的id名
        var divid=this.getAttribute("data-divid");
                //this.dataset.divid
        //3.2 用拿到的divid，查找对应的div元素对象
        var div=document.getElementById(divid);
        //4. 修改元素
        //本例中: 修改当前按钮对应的div的zIndex值最大！就可以让当前按钮对应div到最上方来，挡住其它div
        div.style.zIndex=i;
        i++;
      }
    }
  </script>
</body>
</html>
```

![image](C:\Users\zero\Desktop\web notes\data\dom\dom7.png)



### 3.样式

```
(1). 修改元素的内联样式: 
	元素的style属性中的css属性为属性值
	a. html中: <元素 style="css属性:属性值; ..."></元素>

	b. js中: 元素对象.style.css属性="属性值";
                  的   的
	c. 坑: 有些css属性名中带-，-会和js中的减法的减号冲突！
	d. 解决: 所有css属性名中带-的属性，都要去横线变驼峰
		比如: background-color   backgroundColor
			 font-size          fontSize
	e. 强调: 大小，长短，位置有关的css属性值必须加px单位！不加单位不生效！
```


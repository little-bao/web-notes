### mysql的部署结构

```
服务器端 :  负责存储/维护数据
客户端 : 负责连接服务器,对数据进行增删改查
```

### 连接mysql数据库

```
mysql.exe -h127.0.0.1 -P3306 -uroot -p
-h host 主机(IP地址/域名) localhost/127.0.0.1
-P port 端口
-u user 用户名 root管理员账号
-p password 密码 root的密码为空
```

### 常用的管理命令

```
quit; 退出服务器的连接
show databases; 显示服务器下所有的数据库
use 数据库名称; 进入指定的数据库
show tables; 显示当前数据库下所有的表
desc 表名称; 描述表中都有哪些列
简写形式: mysql -uroot
```

### SQL语句

> 结构化查询语句,用于操作关系型数据库服务器,包括对数据的增删改查

#### 1.SQL语句的执行方式

```
交互模式 : 在客户端输入一行命令,回车后会执行一行命令.适用于临时性的查看数据
脚本模式 : 客户端把要执行的多行命令写在一个脚本文件(.sql)中,然后一次性的提交给服务器执行;适用于批量的操作数据--增删改查(mysql -uroot < D:/mysql/01.sql)
```

```
练习:编写脚本文件02.sql，显示所有的数据库有哪些，进入到数据库phpmyadmin，显示所有的数据表有哪些，描述表pma__recent有哪些列；最后提交给服务器执行

02.sql
show databases; #显示所有的数据库
use phpmyadmin; #进入到数据库phpmyadmin中
show tables; #显示phpmyadmin数据库中有哪些数据表
desc pma__recent; #描述pma__recent有哪些列
```

#### 2.SQL语句的规范

```
1)假设某一条语句出现了错误,则此条语句往后的所有语句都不再执行
2)一条SQL语句可以跨越多行,以英文的分号作为结尾
3)SQL语句不区分大小写,习惯上关键字大写,非关键字小写
4)注释分为单行注释(#)和多行注释(/*...*/),注释的代表不被服务器执行
```

#### 3.常用的SQL语句

```
DROP DATABASE IF EXISTS jd; #丢弃数据库jd,如果数据库jd存在
CREATE DATABASE jd; #创建新的数据库
USE jd; #进入创建的数据库
#创建保存数据的表student
CREATE TABLE student(
    sid INT,
    name VARCHAR(8),
    sex VARCHAR(1),
    score INT
);
INSERT INTO student VALUES(1001,"zero","male",99); #插入数据
SELECT * FROM student; #查询数据
UPDATE student set name="Tom",sex="m" WHERE sid=1002;#修改数据
DELETE FROM student WHERE sid=1002;# 删除数据
```

``` 
练习：编写脚本文件04_tedu.sql，先丢弃数据库tedu，如果存在；创建一个新的数据库tedu; 最后在交互模式下查看是否创建。
练习：在04_tedu.sql继续完成，进入创建的数据库tedu，创建保存员工数据的表emp，包含有编号eid，姓名ename，地址addr，电话phone
练习：在04_tedu.sql继续完成，往员工表emp中插入若干条数据，查询结果。

04_tedu.sql
# 丢弃数据库tedu,如果数据库tedu存在
DROP DATABASE IF EXISTS tedu;
#创建数据库tedu
CREATE DATABASE tedu;
#进入数据库tedu
USE tedu;
#创建保存数据的表emp
CREATE TABLE emp(
    eid INT,
    ename VARCHAR(8),
    addr VARCHAR(100),
    phone CHAR(11)
);
#往emp表中插入若干条数据
INSERT INTO emp VALUES(1001,"zero","china","19514236541");
INSERT INTO emp VALUES(1002,"Tom","china","15234269452");
INSERT INTO emp VALUES(1003,"Jerry","china","19642358103");
```

```
练习: 编写脚本文件xz.sql，先丢弃数据如果存在，然后创建数据库xz，进入该数据库，创建保存用户数据的表user，包含编号uid，用户名uname，密码upwd，邮箱email，电话phone，注册时间regTime，是否在线isOnline
  '2020-12-25'
  插入若干条数据，查询结果。
  
 xz.sql
#丢弃数据库xz,如果数据库xz存在
DROP DATABASE IF EXISTS xz;
#创建新的数据库xz
CREATE DATABASE xz;
#进入数据库xz
USE xz;
#创建保存数据的表user
CREATE TABLE user(
    uid INT,
    uname VARCHAR(8),
    upwd VARCHAR(16),
    email VARCHAR(35),
    phone CHAR(11),
    regTime DATETIME,
    isOnline BOOL
);
#往user表中插入若干条数据
INSERT INTO user VALUES(1001,"zero","123456","zero@qq.com","15236489520","2021-05-05 21:28:59",true);
INSERT INTO user VALUES(1002,"Tom","123456","Tom@qq.com","15234681560","2021-05-05 21:28:59",false);
INSERT INTO user VALUES(1003,"Jerry","123456","Jerry@qq.com","18754263015","2021-05-05 21:28:59",true);
```

### 计算机存储字符

```
1)存储英文字符
ASCII 对128个英文字母进行了编码
Latin-1 对欧洲字符以及符号进行编码,总共256个,兼容ASCII码

2)存储中文字符
GB2312 对六千多常用的汉字进行了编码,兼容ASCII码
GBK 对两万多的汉字进行了编号,兼容GB2312
BIG5 台湾繁字体编码,兼容ASCII码
Unicode 对世界上主流国家常用的语言进行了编码,具体的存储档案UTF-8,UTF-16,UTF-32;兼容ASCII,其他的不兼容

3)mysql的默认存储编号是Latin-1编码,所以会出现中文乱码问题
4)解决mysql中文乱码问题
①脚本文件另存为的编码为UTF8;
②客户端连接服务器端的编码为UTF8; --> SET NAMES UTF8s;
③服务器端创建数据库使用的编码为UTF8; --> CREATE DATABASE xz CHARSET=UTF8;
```

```
练习：编写脚本文件01_sina.sql，先丢弃再创建数据库sina，设置存储的编码为UTF8，创建保存新闻数据的表news，包含编号nid，标题title，内容cont，作者author，添加若干条数据，删除1条，修改1条。

01_sina.sql
#设置客户端连接服务端的编号为UTF8
SET NAMES UTF8;
#丢弃数据库sina,如果数据库sina存在
DROP DATABASE IF EXISTS sina;
#创建数据库,设置服务器端创建数据库时的编码为UTF8
CREATE DATABASE sina CHARSET=UTF8;
#进入数据库sina
USE sina;
#创建保存数据的表news
CREATE TABLE news(
    nid INT,
    title VARCHAR(100),
    cont VARCHAR(1000),
    author VARCHAR(8)
);
#插入若干条数据
INSERT INTO news VALUES(1001,"TITLE01","这是TITLE01的内容","zero");
INSERT INTO news VALUES(1002,"TITLE02","这是TITLE02的内容","Tom");
INSERT INTO news VALUES(1003,"TITLE03","这是TITLE03的内容","Jerry");
#删除一条数据
DELETE FROM news WHERE nid=1002;
#修改一条数据
UPDATE news SET cont="这是TITLE03修改后的内容" WHERE nid=1003;
```

### mysql中的列类型

#### 1.数值型--引号可不加

```
tinyint 微整型,占一个字节,范围-128~127
smallint 小整型,占两个字节,范围-32768~32767
int 整型,占四个字节,范围-2147483648~2147483647
bigint 大整型,占八个字节
float 单精度浮点型,占四个字节,最大是3.4e38,可能产生误差
double 双精度浮点型,占八个字节,范围比bigint大的多,可能产生计算误差
decimal(M,D) 定点小数,几乎不会产生误差,M代表总的有效位数,D代表小数点后的有效位数
boolean/bool 布尔型,只有两个值(true,false),这两个值不能加引号.使用的时候会自动转为tinyint,true变为了1,false变为了0;也可以直接使用1或者0.

2)日期时间型--必须加引号
date 日期型 2021-05-05
time 时间型 21:56:59
datetime 日期时间型 2021-05-05 21:56:59

3)字符串型--必须加引号
varchar(M) 变长字符串,操作数据相对慢,M最大值是65535
char(M) 定长字符串,操作数据相对快,M最大值是255;往往存储长度固定的数据;例如身份证号码,手机号码等.可能产生空间浪费
text(M) 大型变长字符串,M最大值是2G
```

```
练习：
选择合理的列类型。编写脚本文件02_xz.sql，先丢弃再创建数据库xz，设置编码为UTF8，进入该数据库，创建保存商品数据的表laptop，包含有编号lid，标题title，价格price，库存量stockCount，上架时间shelfTime，是否为首页推荐isIndex；插入若干条数据。

02_xz.sql
#设置客户端连接服务器端的编码为UTF8
SET NAMES UTF8;
#丢弃数据库xz,如果数据库xz存在
DROP DATABASE IF EXISTS xz;
#创建数据库xz,并设置服务器端创建数据库时的编码为UTF8
CREATE DATABASE xz CHARSET=UTF8;
#进入数据库xz
USE xz;
#创建保存数据的表laptop
CREATE TABLE laptop(
    lid INT,
    title VARCHAR(25),
    price DECIMAL(8,2),
    stockCount SMALLINT,
    shelfTime DATETIME,
    isIndex BOOL
);
#插入若干条数据
INSERT INTO laptop VALUES(1001,"联想拯救者Y7000",6999.00,100,"2021-05-05 22:05:59",true);
INSERT INTO laptop VALUES(1002,"小米",5999.00,99,"2021-05-05 22:05:59",false);
INSERT INTO laptop VALUES(1001,"戴尔",5999.00,35,"2021-05-05 22:05:59",1);
```

```
  练习:
  编写脚本文件03_xz.sql，，先丢弃再创建数据库xz，设置编码为UTF8,进入数据库，创建保存笔记本分类的表family，包含有fid，名称fname；插入以下数据
    10   联想     20  戴尔    30  小米
  创建保存笔记本数据的表laptop，包含有lid，title，price，规格spec，详情detail,上架时间shelfTime，是否在售isOnsale，所属分类编号familyId
插入若干条数据

xz.sql
#设置客户端连接服务器端的编码为UTF8
SET NAMES UTF8;
#丢弃数据库xz,如果数据库xz存在
DROP DATABASE IF EXISTS xz;
#创建新的数据库xz,并设置服务器端创建数据库时的编码为UTF8
CREATE DATABASE xz CHARSET=UTF8;
#进入数据库xz
USE xz;
#创建保存笔记本分类数据的表family
CREATE TABLE family(
    fid INT PRIMARY KEY,
    fname VARCHAR(25)
);
#插入若干条数据
INSERT INTO family VALUES(10,"联想");
INSERT INTO family VALUES(20,"戴尔");
INSERT INTO family VALUES(30,"小米");
#创建保存笔记本数据的表laptop
CREATE TABLE laptop(
    lid INT PRIMARY KEY,
    title VARCHAR(25),
    price DECIMAL(8,2),
    spec VARCHAR(100),
    detail VARCHAR(1000),
    shelfTime DATETIME,
    isOnsale BOOl,
    familyId INT,
    FOREIGN KEY(familyId) REFERENCES family(fid)
);
#插入若干条数据
INSERT INTO laptop VALUES(1001,"联想拯救者",6999.99,"联想拯救者Y7000","联想拯救者Y7000详情","2021-05-05 22:28:59",true,10);
INSERT INTO laptop VALUES(1002,"小米",5999.99,"小米笔记本","小米笔记本详情","2021-05-05 22:28:59",false,20);
INSERT INTO laptop VALUES(1003,"戴尔",3999.99,"戴尔笔记本","戴尔笔记本详情","2021-05-05 22:28:59",true,30);
```



### 列约束

```
1)主键约束 -- primary key
声明了主键约束的列上不允许插入重复的值,一个表中只能有一个主键约束,通常加在编号列上,查询的时候会按照编号从小到大显示,会加快查询速度.声明了主键约束的列上不允许插入NULL(NULL表示空,表示一个无法确定的值,例如无法确定一个员工的姓名,工资,生日,这种情况下可以使用NULL来表示)

2)唯一约束--unique
声明了唯一约束的列上不允许插入重复的值,允许插入NULL,而且是多个NULL(NULL代表不确定的值,两个NULL不能划等号)

3)非空约束 -- not null

4)默认值约束 -- default
可以通过default给列设置默认值,具体有两种应用
insert into laptop values(5,"小米 Air",default,...);
insert into laptop(lid,title) values(6,"戴尔");

5)检查约束 -- check(mysql不支持)

6)外键约束 foreign key(外键列) references 另一个表(主键列)

7)自增列 -- auto_increment
自动增长,自动获取当前的最大值,然后加1插入
自增列添加在主键列上
注意: 只适用于整数型的列上,同时允许手动赋值,如果想要实现自增,需要赋值NULL
```

### 简单查询

#### 1.查询特定的列

```
练习:查询所有员工的编号和姓名
SELECT eid,ename FROM emp;
练习:查询出所有员工的姓名，性别，工资，生日
SELECT ename,sex,salary,birthday FROM emp;
```

#### 2.查询所有的列

```
SELECT * FROM emp;
SELECT eid,ename,sex,birthday,salary,deptId FROM emp;
```



#### 3.给列取别名 -- AS (AS可省略)

```
练习:查询出所有员工的编号和姓名，使用汉字别名
SELECT eid AS 编号,ename AS 姓名 FROM emp;
练习：查询出所有员工的姓名，性别，生日，使用汉字别名
SELECT ename 姓名,sex 性别,birthday 生日 FROM emp;
练习：查询出所有员工的姓名和工资，分别使用一个字母作为别名
SELECT ename e,salary s FROM emp;
```

#### 4.显示不同的记录 -- DISTINCT

```
练习:查询出员工所属的部门编号有哪些
SELECT DISTINCT deptId FROM emp;
练习：查询出都有哪些性别的员工
SELECT DISTINCT sex FROM emp;
```



#### 5.查询时执行计算

```
练习: 查询出所有员工的姓名及其年薪
SELECT ename,salary*12 FROM emp;
练习：假设每个员工的工资增长500元，年终奖10000，查询所有员工的姓名及其年薪，使用汉字别名
SELECT ename 性别,(salary+500)*12+10000 年薪 FROM emp;
```

#### 6.对结果集排序 -- ORDER BY

```
练习:查询所有的部门，结果集按照编号升序排列
SELECT * FROM dept ORDER BY did ASC; #ascendant 升序(默认是asc升序)
练习：查询所有的部门，结果集按照编号降序排列
SELECT * FROM dept ORDER BY did DESC; #descendant 降序
练习：查询所有的员工，结果集按照工资的降序排列
SELECT * FROM emp ORDER BY salary DESC;
练习：查询所有的员工，结果集按照年龄从大到小排列（生日从小到大）
SELECT * FROM emp ORDER BY birthday ASC;
练习：查询所有的员工，结果集按照姓名升序排列(按照Unicode码排序)
SELECT * FROM emp ORDER BY ename;
练习：查询所有的员工，结果集按照工资的降序排列，如果工资相同按照姓名排列
SELECT * FROM emp ORDER BY salary DESC,ename;
练习：查询所有的员工，结果集要求女员工显示在前，如果性别相同按照年龄从大到小排序
SELECT * FROM emp ORDER BY sex ASC,birthday ASC;
```

#### 7.条件查询

```
练习:查询出编号为5的员工的所有列
SELECT * FROM emp WHERE eid=5;
练习：查询出姓名为king的员工所有列
SELECT * FROM emp WHERE ename="king";
练习：查询出20号部门下的员工有哪些
SELECT * FROM emp WHERE deptId=20;
练习：查询出工资在5000以上的员工所有列
SELECT * FROM emp WHERE salary>5000;
练习：查询出1991年后出生的员工有哪些
SELECT * FROM emp WHERE birthday>="1991-01-01"
练习：查询出不在10号部门的员工有哪些
SELECT * FROM emp WHERE deptId!=10;
练习：查询出没有明确部门的员工有哪些
SELECT * FROM emp WHERE deptId IS NULL;
练习：查询出有明确部门的员工有哪些
SELECT * FROM emp WHERE deptId IS NOT NULL;
练习：查询出工资在5000以上的男员工有哪些
SELECT * FROM emp WHERE salary>5000 AND sex=1;
练习：查询出工资在5000~7000之间的员工有哪些
SELECT * FROM emp WHERE salary>=5000 AND salary<=7000;
SELECT * FROM emp WHERE salary BETWEEN 5000 AND 7000;
练习：查询出工资不在5000~7000之间的员工有哪些 
SELECT * FROM emp WHERE salary<5000 OR salary>7000;
SELECT * FROM emp WHERE salary NOT BETWEEN 5000 AND 7000;
练习：查询出1993年出生员工有哪些
SELECT * FROM emp WHERE birthday>="1993-01-01" AND birthday<="1993-12-31";
练习：查询出20号部门和30号部门的员工有哪些  满足其一 or
SELECT * FROM emp WHERE deptId=20 OR deptId=30;
SELECT * FROM emp WHERE deptId IN(20,30);
练习：查询出不在20号部门和30号部门的员工有哪些
SELECT * FROM emp WHERE deptId NOT IN(20,30);
查询出工资在8000以上的男员工的姓名，性别，工资，部门；结果集按照工资的降序排列。
SELECT ename,sex,salary,deptId FROM emp WHERE salary>8000 AND sex=1 ORDER BY salary DESC;
```

#### 8.分页查询

```
分页查询 -- LIMIT 每页开始查询的值,每页的数据量
查询的结果集中有太多的数据,一次性显示不完可以做成分页
需要有两个已知的条件: 当前页码,每页的数据量
每页开始查询的值=(当前的页码-1)*每页的数据量
练习：假设每页显示5条数据，分别查询出前3页的数据
SELECT * FROM emp LIMIT 1,5;
SELECT * FROM emp LIMIT 5,5;
SELECT * FROM emp LIMIT 10,5;
注意: 每页开始查询的值和每页的数据量必须是数值,不能加引号
```



### 复杂查询

#### 1.聚合查询/分组查询(分组查询只适合分组条件列和聚合函数)

```
练习:查询出所有员工的数量
SELECT COUNT(*) FROM emp;
练习：分别使用员工的编号列和所在部门编号列查询员工的数量
SELECT COUNT(eid) FROM emp; #推荐写法
SELECT COUNT(deptId) FROM emp;
函数(count(),avg(),sum(),max(),min(),year())
练习：查询出所有男员工的平均工资
SELECT AVG(salary) FROM emp WHERE sex=1;
练习：查询出30号部门员工的工资总和
SELECT sum(salary) FROM emp WHERE deptId=30;
练习：查询出女员工的最高工资是多少
SELECT MAX(salary) FROM emp WHERE sex=0;
练习：查询出年龄最大的员工生日是多少
SELECT MIN(birthday) FROM emp;
练习:查询出男女员工的数量，平均工资，最低工资
SELECT COUNT(eid),AVG(salary),MIN(salary),sex FROM emp GROUP BY sex;
练习：查询出每个部门的工资总和，最高工资，最低工资
SELECT deptId,SUM(salary),MAX(salary),MIN(salary) FROM emp GROUP BY deptId;
练习：查询出1993年出生的员工有哪些
SELECT * FROM emp WHERE YEAR(birthday)=1993;
```

#### 2.子查询

```
多个SQL命令的组合,把一个的结果作为另一个的条件使用
练习:查询出比tom工资高的员工有哪些
SELECT * FROM emp WHERE salary>(SELECT salary FROM emp WHERE ename="tom");
练习：查询出和king同一个部门下的员工有哪些
SELECT * FROM emp WHERE deptId=(SELECT deptId FROM emp WHERE ename="king") AND ename!="king";
练习:查询出和tom同一年出生的员工有哪些
SELECT * FROM emp WHERE YEAR(birthday)=(SELECT YEAR(birthday) FROM emp WHERE ename="tom") AND ename!="tom";
```



#### 3.多表查询

```
要查询的列分布在不同的表中,前提是表之间有关联
示例：查询出所有员工的姓名及其部门名称
SELECT ename,dname FROM emp,dept WHERE deptId=did;
内连接
SELECT emp.ename,dept.dname FROM emp INNER JOIN dept ON emp.deptId=dept.did;
左外连接,显示左侧表中所有记录,先写哪个表哪个就是左,outer关键字可以省略
SELECT ename,dname FROM emp LEFT OUTER JOIN dept ON deptId=did;
右外连接,显示右侧表中所有记录,后写哪个表哪个就是右,outer关键字可以省略
SELECT ename,dname FROM emp RIGHT OUTER JOIN dept ON deptId=did;
全连接FULL JOIN..ON (mysql不支持)
联合
union all 联合后不合并相同记录
union 联合后合并相同记录
全连接的解决:左外连接和右外连接联合,合并相同记录
(SELECT ename,dname FROM emp LEFT OUTER JOIN dept ON deptId=did)UNION(SELECT ename,dname FROM emp RIGHT OUTER JOIN dept ON deptId=did);
```





## datetime模块
* `from datetime import import`引入模块;
* `datetime.now()`获取现在时间`2018-01-22 16:18:38.195574`;
* `datetime.now().day`获取日期, 类似有`.month`,`.year`,`.date()`等;
* `datetime(2017,12,9,12,23)`设置时间;
* `datetime(2017,12,20).timestamp()`获取时间戳;
* `datetime.fromtimestamp(xxx)`把时间戳转换成日期;
* `datetime.strptime("2017-6-1 18:19:59","%Y-%m-%d %H:%M:%S")`按设置的时间格式, 把字符串处理成时间;
* `datetime(xxx).strftime("%y-%m-%d %H:%M:%S")`把时间对象按设定的格式输出,
* `from datetime import datetime,timedelta`引入时间模块和时间加减模块;
* `datetime(xxx)+timedelta(days=1,hours=12)`方便算出之前之后的时间;

## namedtuple模块
丰富tuple功能,
* `from collections import namedtuple`
```
Point = namedtuple("点坐标", ['x', 'y', 'z'])
p1 = Point(1,2,3)
print(p1)  # 点坐标(x=1, y=2, z=3)
print(p1.y)  # 2
isinstance(p1, Point)  # True
isinstance(p2, tuple)  # True
```


## deque模块
提高list的性能
`from collections import deque`
```
q = deque(['a', 'b', 'c'])
q.append('footer')  # 尾部插入
q.appendleft('header')  # 头部插入
# 同理有 pop() 和 popleft()
```

## defaultdict模块
读取dict中没有的key值是,抛出错误; 此模块设置没有时的默认值;
`from collections import defaultdict`
```
mydict = defaultdict(lamba: '没有此key')
mydict['key1'] = "四叶草"
mydict['key1']  # 四叶草
mydict['key2']  # 没有此key
```

## Counter模块
计数器 `cter = Counter()`
```
cter = Counter()
for item in "secrippcration":
    cter[item] = cter[item]+1
cter  # Counter({'c': 2, 'r': 2, 'i': 2, 'p': 2, 's': 1, 'e': 1, 'a': 1, 't': 1, 'o': 1, 'n': 1})
```

## base64模块
用64个字符表示二进制数据
`import base64`
```
base64.b64encode(b'binary\x00string')  # 编码成base64
base64.b64decode(b'YmluYXJ5AHN0cmluZw==')  # 解析base64

base64.urlsafe_b64encode(b'binary\x00string')  # 编码成可用于URL中的base64
base64.urlsafe_b64encode(b'YmluYXJ5AHN0cmluZw==')  # 解析可用于URL中的base64
```

## hashlib模块
`import hashlib`
```
md5 = hashlib.md5()
md5.update("母猪的产后护理".encode("utf-8"))  # 此语句可以多吃调用;
md5.hexdigest()  # md5值: 相同的内容产生相同的md5值;
```

## hmac模块
加入key值的hash算法(更安全)
`import hmac`
```
key = b'the salt'
message = b'jintianwo1, hanyeli'
h = hmac.new(key, message, digestmod='MD5')
h.hexdigest()  # hash值
```
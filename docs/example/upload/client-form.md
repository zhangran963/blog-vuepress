---
title: '页面 - form'
---

## form表单形式
* 缺点: 上传后, 页面会跳转

``` JS{10-13}
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<form id="upload-form" method="POST" action="/upload" enctype="multipart/form-data">
			<input id="select-btn" type="file" name="selfName" />
			<input id="upload-btn" type="submit" value="开始上传" />
		</form>

		<script></script>
	</body>
</html>
```
* form元素: method="post", action="/upload", enctype="multipart/form-data"
* input[type="file"]: name="自定义名称"
* input[type="submit"]: 提交类型, 点击会自动触发form上传
// 公共方法库

window.Store = function(name) {
  this.name = name;
  var store = localStorage.getItem(this.name);
  this.data = (store && JSON.parse(store)) || {};
};
_.extend(Store.prototype, {
	
  // Save the current state of the **Store** to *localStorage*.
  save: function() {
    localStorage.setItem(this.name, JSON.stringify(this.data));
  },

  // Add a model, giving it a (hopefully)-unique GUID, if it doesn't already
  // have an id of it's own.
  create: function(model) {
    if (!model.id) model.id = model.attributes.id = guid();
    this.data[model.id] = model;
    this.save();
    return model;
  },

  // Update a model by replacing its copy in `this.data`.
  update: function(model) {
  	var self = this;
    this.data[model.id] = model;
    this.save();
    return model;
  },

  // Retrieve a model from `this.data` by id.
  find: function(model) {
    return this.data[model.id];
  },

  // Return the array of all models currently in storage.
  findAll: function() {
    return _.values(this.data);
  },

  // Delete a model from `this.data`, returning it.
  destroy: function(model) {
    delete this.data[model.id];
    this.save();
    return model;
  }
});

function getError(option, xhr) {
	var msg = 'cannot post ' + option.action + ' ' + xhr.status + '\'';
	var err = new Error(msg);
	err.status = xhr.status;
	err.method = 'post';
	err.url = option.action;
	return err;
}
function getBody(xhr) {
	var text = xhr.responseText || xhr.response;
	if (!text) {
		return text;
	}
	try {
		return JSON.parse(text);
	} catch (e) {
		return text;
	}
}
const CustomUpload = function(option){
	var xhr = new XMLHttpRequest();
	if (option.onProgress && xhr.upload) {
		xhr.upload.onprogress = function progress(e) {
			if (e.total > 0) {
				e.percent = e.loaded / e.total * 100;
			}
			option.onProgress(e);
		};
	}
	var formData = new FormData();
	if (option.data) {
		Object.keys(option.data).map(function (key) {
			formData.append(key, option.data[key]);
		});
	}
	formData.append(option.filename, option.file);
	xhr.onerror = function error(e) {
		option.onError(e);
	};
	xhr.onload = function onload() {
		if (xhr.status < 200 || xhr.status >= 300) {
			return option.onError(getError(option, xhr), getBody(xhr));
		}
		option.onSuccess(getBody(xhr));
	};

	var queryString='jwfile=';
	queryString = queryString + encodeURIComponent(option['file']['name'])+'&app_id=undefined&app_type=jw_app_as';
	var actionUrl = option.action+ (option.action.indexOf('?')==-1?'?':'&') + queryString
	xhr.open('POST',actionUrl, true);
	if (option.withCredentials && 'withCredentials' in xhr) {
		xhr.withCredentials = true;
	}
	var headers = option.headers || {};
	if (headers['X-Requested-With'] !== null) {
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	}
	for (var h in headers) {
		if (headers.hasOwnProperty(h) && headers[h] !== null) {
			xhr.setRequestHeader(h, headers[h]);
		}
	}
	xhr.send(option.file);
	return {
		abort: function abort() {
			xhr.abort();
		}
	};
}

// 生成ID
var jschars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
function generateMixed(n) {
  var res = "";
  for(var i = 0; i < n ; i ++) {
    var id = Math.ceil(Math.random()*61);
    res += jschars[id];
  }
  return res;
}

// 键盘唤起事件处理，惰性函数实现方案，只执行一次
window.jwInputProcess = function(){
  var rootNode = $('#root')
  console.log('xxx2',rootNode.length);
  rootNode.on('focusin focusout', function(evt){
    console.log('xxx',evt.type, evt)
    if (evt.type === "focusin" && $(evt.target).is("input, textarea"))
      rootNode.addClass("jw-ui-fixed-hidden");
    else
      rootNode.removeClass("jw-ui-fixed-hidden");
  })
}

//获取指定时间0:0:0的时间戳
window.getNowDate = function(data){
	if(data){
		var date = new Date(data); //获取当前Date对象
	}else{
		var date = new Date(); //获取当前Date对象
	}
	//var date = new Date('2020/10/10 11:22:33'); //获取指定时间的Date对象，这里只能用"2020/10/10"格式，其他格式如"2020-10-10"浏览器兼容性不好
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);
	return (date.getTime()/1000)
}


window.upload = {
	name: 'file',
	action: '/upload/file/upload',
	headers: {
	},
	withCredentials:true,
	showUploadList:false,
	customRequest:function(option){
		function getError(option, xhr) {
			var msg = 'cannot post ' + option.action + ' ' + xhr.status + '\'';
			var err = new Error(msg);
			err.status = xhr.status;
			err.method = 'post';
			err.url = option.action;
			return err;
		}
		function getBody(xhr) {
			var text = xhr.responseText || xhr.response;
			if (!text) {
				return text;
			}
			try {
				return JSON.parse(text);
			} catch (e) {
				return text;
			}
		}
		var xhr = new XMLHttpRequest();
		if (option.onProgress && xhr.upload) {
			xhr.upload.onprogress = function progress(e) {
				if (e.total > 0) {
					e.percent = e.loaded / e.total * 100;
				}
				option.onProgress(e);
			};
		}
		var formData = new FormData();
		if (option.data) {
			Object.keys(option.data).map(function (key) {
				formData.append(key, option.data[key]);
			});
		}
		formData.append(option.filename, option.file);
		xhr.onerror = function error(e) {
			option.onError(e);
		};
		xhr.onload = function onload() {
			if (xhr.status < 200 || xhr.status >= 300) {
				return option.onError(getError(option, xhr), getBody(xhr));
			}
			option.onSuccess(getBody(xhr));
		};

		var queryString='jwfile=';
		queryString = queryString + encodeURIComponent(option['file']['name'])+'&app_id=undefined&app_type=jw_app_as';
		var actionUrl = option.action+ (option.action.indexOf('?')==-1?'?':'&') + queryString;
		xhr.open('POST',actionUrl, true);
		if (option.withCredentials && 'withCredentials' in xhr) {
			xhr.withCredentials = true;
		}
		var headers = option.headers || {};
		if (headers['X-Requested-With'] !== null) {
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		}
		for (var h in headers) {
			if (headers.hasOwnProperty(h) && headers[h] !== null) {
				xhr.setRequestHeader(h, headers[h]);
			}
		}
		console.log('xxxx');
		xhr.send(option.file);
		return {
			abort: function abort() {
				xhr.abort();
			}
		};
	},
	onStart:function(info){
		message.loading('正在上传：'+info['name']);
	},
	//
	onSuccess:function(info){
		message.destroy();
		// let dispatch = self.props.dispatch;
		// dispatch({
		// 	type:'form/changeData',
		// 	data:{
		// 		logo:info
		// 	}
		// })
	}
};

// 重写confirm 去除网址
window.confirm = function (message) {
    var iframe = document.createElement("IFRAME");
    iframe.style.display = "none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    var alertFrame = window.frames[0];
    var result = alertFrame.window.confirm(message);
    iframe.parentNode.removeChild(iframe);
    return result;
};
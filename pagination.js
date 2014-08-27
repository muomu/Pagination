;(function(){
	"use strict"
	if(!("$"in self)) {
		self.$ = function(arg1,arg2){
			var dom, r
			
			if(!arg1) return
			
			if(arg2 && arg2.constructor == HTMLDocument){
				dom = arguments[1]
			}
			else{
				dom = window.document
			}
			
			if(arg1.constructor == String){
				var _obj = document.getElementById(arg1) || ((_obj = document.getElementsByTagName(arg1))[0] ? _obj : null) || ((_obj = document.getElementsByName(arg1))[0] ? _obj : null)
				if(_obj[0]){
					_obj.first = _obj[0]
				}
				
				if(_obj[_obj.length-1]){
					_obj.last = _obj[_obj.length-1]
				}
				
				return _obj
			}
			
			if(arg1.constructor == Function){
				self.onload = arg1
				return
			}
			
		}
	}
	
	self.sform = function() {
		if (arguments.length < 1) return null
		if (arguments.length < 2) return arguments[0]
		var s = Array.prototype.shift.call(arguments).split("%@")
		var r = ""
		for (var i = 0; i < s.length ; i++) {
			r += s[i] + (arguments[i] || "")
		}
		return r
	}
	
	self.Pagination = function(view) {
		var _hdl  //代理
		var _err  //错误
		var _http //http请求协议
		var _m	  //自身作用域
		this.delegate //［函数］代理托管
		this.token	  //［函数］页面切换（注意：传入的必须是无符号行整数而非页整数）
		this.bind	  //［函数］绑定HTTP请求协议 （方法可选，默认为“post”）
		this.view	  //［DOM] 这是一个html元素
		this.handler  // 代理对象的作用域引用
		this.point	  // 返回当前的行整数
		this.requestText //设置一个值，该值定义了如何请求服务器，%@表示当前的行整数
		
		self.perror = function(desc) {
			if (!_err) return
			if ("console"in self) {
				if ("error"in console) {
					desc = desc || "error"
					console.error(sform("%@: %@", desc, _err))
				}
				else if ("log"in console) {
					console.log(sform("%@:%@", desc, _err))
				}
			}
		}
		
		var _hash = function (hn) {
			if (Object.prototype.hasOwnProperty.call(_hdl,hn)) {
				if (_hdl[hn].constructor == Function) {
					return true
				}
			}
			return false
		}
		var creajax = function(t_pah, t_pam, url, header){
			try {
				_http = t_pah()
				_http.open(t_pam, url, true)
				header && eval(sform("_http.setRequestHeader(%@)",header))
				_http.onreadystatechange = aevs
				//_http.setRequestHeader("Content-type","application/x-www-form-urlencoded")
				return 0
			}
			catch (e) {
				_err = e
				return -1
			}
		}
		var aevs = function() {
			try {
				if (_http.readyState == 4 && _http.status == 200) {
					_hash("onbegin") && _hdl.onbegin.call(_m, _http.responseText)
				}
			}
			catch (e) {
				_err = e
			}
		}
		var aart = function() {
			if (window.XMLHttpRequest) {
			  return new XMLHttpRequest()
			}
			else {
			  return new ActiveXObject("Microsoft.XMLHTTP")
			}
		}
		
		this.delegate = function(hdl) {
			if (hdl) {
				_hdl = hdl
				this.handler = hdl
				return
			}
			if ("defaultHandler"in self.Pagination) {
				_hdl = self.Pagination.defaultHandler
				this.handler = _hdl
				return
			}
		}
		this.token = function(point) {
			try {
				if (!_http) {
					console.log()
					_err = "no call bind"
					return -1
				}
				if (+point > 0) {
					this.point = point
					_http.send(sform(this.requestText,point))
					return 0
				}
				_err = "type of argument is not unsign number"
				return -1
			}
			catch(e) {
				_err = e.toString()
				return -1
			}
		}
		this.bind = function(url, method) {
			if (!url) {
				_err = "not url"
				return -1
			}
			var ca = creajax(aart, (method || "GET"), url, 0)
			return ca
		}
		this.toString = function() {
			return "[Pagination Object]"
		}
		this.view = view
		_m = this
	}
	self.Pagination.toString = function() {
		return "[Pagination Constructor]"
	}
	self.Pagination.defaultHandler = {
		onbegin: function(sdr) {
			var pa
			try {
				pa = eval(sform("(%@)", sdr))
				var hs = ("_pstyleson" in self),
					si = ((hs && ("index" in _pstyleson)) ? _pstyleson.index : 0),
					se = ((hs && ("styles" in _pstyleson)) ? _pstyleson.styles : 0)
				for (var i = 0; i < pa.length; i++) {
					var d = document.createElement("div")
					si && (d.className = si.valueOf())
					for (var j in pa[i]) {
						if (Object.prototype.hasOwnProperty.call(pa[i], j)) {
							var e = document.createElement("div")
							e.innerHTML = pa[i][j]
							se && (e.className = se[j].valueOf())
							d.appendChild(e)
						}
					}
					this.view.appendChild(d)
				}
			}
			catch (e) {
				console.warn(e)
			}
		}
	}
	self.Pagination.defaultHandler.toString = function() {
		return "[Pagination Handler]"
	}
})()
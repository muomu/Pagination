;(function(){
	"use strict"
	if (!("$"in window)) {
		window.$ = function(arg1, arg2) {
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
				window.self.onload = arg1
			}
		}
		window.$.toString = function() {
			return "function $(arg1, arg2)"
		}
	}
	if (!("sform"in window)) {
		window.sform = function() {
			if (arguments.length < 1) return null
			if (arguments.length < 2) return arguments[0]
			var s = Array.prototype.shift.call(arguments).split("%@")
			var r = ""
			for (var i = 0; i < s.length ; i++) {
				r += s[i] + (arguments[i] || "").valueOf()
			}
			return r
		}
		window.sform.toString = function() {
			return "function sform(arg1[,arg2...argn])"
		}
	}
	if (!("perror"in window)) {
		window.perror = function(desc) {
			if (!_err) return
			if (_err === 1) {
				if ("console"in window) {
					if ("log"in window.console) {
						window.console.log("no error")
						return
					}
				}
			}
			if (desc && desc.length) {
				var s = desc + ":" + _err
			}
			else {
				var s = _err
			}
			if ("console"in window) {
				if ("error"in window.console) {
					window.console.error(s)
				}
				else if ("log"in window.console) {
					window.console.log(s)
				}
			}
			else {
				window.alert(s)
			}
		}
		window.perror.toString = function() {
			return "function perror(desc)"
		}
	}
	if (!("Pagination"in window)) {
		window.Pagination = function() {
			var _ajax,	 				//ajax object
				_sref,	 				//self ref-object
				_crax,	 				//create ajax function
				_aevs,	 				//ajax event services function
				_hasof,  				//if has own-function function
				_is_init =				//is inited boolean object
			undefined
			this.init,   				//initial function
			this.delegate, 				//delegate function
			this.handler,  				//has a delegate handler object
			this.token,    				//token refrw function
			this.view,
			this.requestText = 			//request field property
			undefined
			var _crax = function(u, m) {
				if (!u) {
					_err && (_err = "never define url")
					return -1
				}
				if ("XMLHttpRequest"in window) {
				  _ajax = new window.XMLHttpRequest()
				}
				else if ("ActiveXObject"in window){
				  _ajax = new window.ActiveXObject("Microsoft.XMLHTTP")
				}
				if (!_ajax) {
					_err && (_err = "your browser cannot of ajax")
					return -1
				}
				try {
					_ajax.open(m||"GET", u, true)
					_ajax.onreadystatechange = _aevs.bind(_ajax, perror)
					return 0
				}
				catch (e) {
					_err && (_err = e.toString())
					return -1
				}
			}
			var _aevs = function(ep) {
				if (!_sref) {
					_err && (_err = "never initing") && ep("Syntaxes failed")
					return
				}
				try {
					if (this.readyState == 4 && this.status == 200) {
						if (_is_init&_hasof("oninit")) {
							_sref.handler.oninit.call(_sref, this.responseText)
							_is_init ^= _is_init
							return
						}
						_hasof("begin") && _sref.handler.begin.call(_sref, this.responseText)
					}
				}
				catch (e) {
					_err && (_err = e.toString()) && ep("Ajax Exception")
				}
			}
			var _hasof = function(fn) {
				if (!_sref) {
					_err && (_err = "never initing")
					return false
				}
				if (!_sref.handler) {
					_err && (_err = "never delegate")
					return false
				}
				if (Object.prototype.hasOwnProperty.call(_sref.handler, fn)) {
					if (_sref.handler[fn].constructor === Function) {
						return true
					}
				}
				return false
			}
			this.init = function(url, method) {
				if (_crax(url, method) == -1) {
					perror("Init failed")
					return
				}
				_sref = this
				_is_init = 1
				this.token(0)
			}
			this.delegate = function(hdl) {
				if (hdl) {
					this.handler = hdl
				}
			}
			this.token = function() {
				if (this.requestText && this.requestText.length) {
					var c = Array.prototype.unshift.call(arguments,this.requestText)
					_ajax.send(sform.apply(undefined,arguments))
				}
			}
		}
	}
	if ("Docket"in window) {
		_err && (_err = "already make up docket")
	}
	else {
		window.Docket = function(captions) {
			var _count,
				_index = _count = +null,
				_sref  = this,
				_pref,
				_layer,
				_oldf
			this.count,
			this.index,
			this.oninit,
			this.begin,
			this.refrw,
			this.alloc,
			this.captions = captions,
			this.token
			
			this.refrw = function() {
				if (this.alloc) {
					this.alloc.innerHTML = ""
					_layer = Object.create(null)
					if (this.captions.arrow && (this.captions.arrow&1)) {
						var al = document.createElement("div")
						al.className = ""
						if (this.captions.general) {
							al.className = sform("%@ %@", al.className, this.captions.general)
						}
						if (this.captions.al) {
							al.className = sform("%@ %@", al.className, this.captions.al)
						}
						al.onmousedown = function(e) {
							_sref.token(_index-1)
						}
						this.alloc.appendChild(al)
						_layer.al = al
					}
					if (this.captions.lock) {
						_layer.length = this.captions.lock < _count ? this.captions.lock : _count
						for (var i = 1; i <= _layer.length; i++) {
							var e = document.createElement("div")
							e.className = ""
							if (this.captions.general) {
								e.className = sform("%@ %@", e.className, this.captions.general)
							}
							if (this.captions.items) {
								e.className = sform("%@ %@", e.className, this.captions.items)
							}
							e.appendChild(document.createTextNode(i))
							this.alloc.appendChild(e)
							_layer[i] = e
						}
					}
					if (this.captions.arrow && (this.captions.arrow&2)) {
						var ar = document.createElement("div")
						if (this.captions.general) {
							ar.className = sform("%@ %@", ar.className, this.captions.general)
						}
						if (this.captions.ar) {
							ar.className = sform("%@ %@", ar.className, this.captions.ar)
						}
						ar.onmousedown = function(e) {
							_sref.token(_index+1)
						}
						this.alloc.appendChild(ar)
						_layer.ar = ar
					}
				}
			}
			this.token = function(i) {
				if (i <= _count && i > 0) {
					_index = i
				}
				else return
				this.count = _count
				this.index = _index
				_pref.token(i)
				var _efunc = function(i) {
					return function(e) {
						_sref.token(i)
					}
				}
				if (this.captions.focus) {
					_oldf && (_layer[_oldf].className = _layer[_oldf].className.replace(this.captions.focus, ""))
					_layer[i].className = sform("%@ %@", _layer[i], this.captions.focus)
					_oldf = i
				}
				for (var x = 1; x < i; x++) {
					_layer.onmousedown = _efunc(x)
					_layer.innerHTML = ""
					_layer.appendChild(document.createTextNode(x))
				}
				for (var x = i+1; x <= count; x++) {
					_layer.onmousedown = _efunc(x)
					_layer.innerHTML = ""
					_layer.appendChild(document.createTextNode(x))
				}
				
			}
			this.oninit = function(sdr) {
				if (sdr && sdr.length) {
					var arr = sdr.split(",")
					if (arr.length > 1) {
						_count = +arr[0]
						_index = +arr[1]
					}
					else if (arr.length = 1) {
						_count = +arr[0]
						_index = 1
					}
					!!!"test";
					_count = 12
					_index = 1
					if (_count > 0) {
						_pref = this
						_sref.refrw()
						_sref.token(_index)
					}
				}
			}
			this.begin = function(sdr) {
				this.view.innerHTML = sdr || ""
			}
			
			if (!this.captions) {
				_err && (_err = "can't define captions argument")
			}
		}
	}
	var _err = null+1
})()
_pstyleson = {
	general:"dock",
	al:"arror-left",
	ar:"arror-right",
	items:"arror-items",
	focus:"arror-focus",
	lock:10,
	arrow:3
}
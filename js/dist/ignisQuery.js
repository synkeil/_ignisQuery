/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	function $() {
	  var mainSelector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	  var subSelector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	  // seting up shorthands

	  var mainS = mainSelector || null;
	  var subS = subSelector || null;
	  // recipients of the selection in case it returns multiple elements
	  var main = [];
	  var sub = [];
	  // htmlCollections
	  var mainCount = [];
	  var subCount = [];
	  // the final selection that gets returned by the function
	  var selected = [];
	  var count = 0;

	  // setting up iterators
	  var a = 0;
	  var b = 0;
	  var c = 0;
	  var d = 0;
	  var f = 0;
	  var g = 0;
	  var i = 0;
	  var temp = void 0;

	  (function () {
	    // select the appropriate type of element eg: tag, class, id
	    switch (mainS.charAt(0)) {
	      case '#':
	        mainS = mainS.slice(1);
	        main[0] = document.getElementById(mainS);
	        break;
	      case '.':
	        // gets rid of the . in front of the class
	        mainS = mainS.slice(1);
	        // gets the htmlCollection into mainCount
	        mainCount = document.getElementsByClassName(mainS);
	        for (a = 0; a < mainCount.length; a += 1) {
	          main.push(document.getElementsByClassName(mainS)[a]);
	        }
	        break;
	      default:
	        mainCount = document.getElementsByTagName(mainS.toUpperCase());
	        for (b = 0; b < mainCount.length; b += 1) {
	          main.push(document.getElementsByTagName(mainS)[b]);
	        }
	    }
	    // check if the parent is specified or not
	    if (subS === null) {
	      for (c = 0; c < main.length; c += 1) {
	        selected.push(main[c]);
	      }
	      //end the function in case there is no parent specified
	      return selected;
	    }

	    // get the child depending on the parent
	    switch (subS.charAt(0)) {
	      case '#':
	        subS = subS.slice(1);
	        sub[0] = document.getElementById(subS);
	        break;
	      case '.':
	        // gets rid of the . in front of the class
	        subS = subS.slice(1);
	        // gets the htmlCollection into subCount
	        subCount = main.childNodes;
	        for (d = 0; d < subCount.length; d += 1) {
	          if (main.childNodes[d].className !== undefined) {
	            if (main.childNodes[d].className.split(' ').indexOf(subS) !== null) {
	              sub[count] = main.childNodes[d];
	              count += 1;
	            }
	          }
	        }
	        break;
	      default:
	        subCount = main.childNodes;
	        subS = subS.toUpperCase();
	        for (f = 0; f < main.childNodes.length; f += 1) {
	          if (main.childNodes[f].tagName !== undefined) {
	            if (main.childNodes[f].tagName === subS) {
	              sub[count] = main.childNodes[f];
	              count += 1;
	            }
	          }
	        }
	    }
	    for (g = 0; g < sub.length; g += 1) {
	      selected[g] = sub[g];
	    }
	    return selected;
	  })();

	  // allow for direct dom interaction
	  this.dom = function returnDomElement() {
	    var toSelect = main[0];
	    return toSelect;
	  };

	  // get a specific index in the returned array
	  this.eq = function atIndex() {
	    var iM = arguments.length > 0 && (arguments.length <= 0 ? undefined : arguments[0]) !== undefined ? arguments.length <= 0 ? undefined : arguments[0] : null;

	    (function () {
	      if (iM !== null) {
	        selected[0] = selected[iM - 1];
	        selected.splice(1, selected.length - 1);
	        return selected[0];
	      }
	      return selected;
	    })();
	    return this;
	  };

	  this.attr = function setAttribut(atr, val) {
	    selected.map(function (x) {
	      temp = x;
	      temp.setAttribute(atr, val);
	      return selected;
	    });
	    return this;
	  };

	  this.get = function returnSelectedArray() {
	    return selected;
	  };

	  // set the css of the iQ in the form of "color:blue;width:125px"
	  this.css = function setStyle(style) {
	    selected.map(function (x) {
	      temp = x;
	      temp.style.cssText = style;
	      return selected;
	    });
	    return this;
	  };

	  this.addClass = function addClassToElement(toAdd) {
	    selected.map(function (x) {
	      temp = x;
	      temp.classList.add(toAdd);
	      return selected;
	    });
	    return this;
	  };

	  this.removeClass = function removeClassFromElement(toRemove) {
	    selected.map(function (x) {
	      temp = x;
	      temp.classList.remove(toRemove);
	      return selected;
	    });
	    return this;
	  };

	  // returns the content of $ if 'a' is empty, else sets it to 'a'
	  this.html = function setContentAbsolutly() {
	    a = arguments.length > 0 && (arguments.length <= 0 ? undefined : arguments[0]) !== undefined ? arguments.length <= 0 ? undefined : arguments[0] : null;

	    if (a === null) {
	      return selected.innerHTML;
	    }
	    selected.map(function (x) {
	      temp = x;
	      temp.innerHTML = a;
	      return selected;
	    });
	    return this;
	  };

	  this.val = function returnElemValue() {
	    a = arguments.length > 0 && (arguments.length <= 0 ? undefined : arguments[0]) !== undefined ? arguments.length <= 0 ? undefined : arguments[0] : null;

	    if (a === null) {
	      return selected[0].value;
	    }
	    selected.map(function (x) {
	      temp = x;
	      temp.value = a;
	      return selected;
	    });
	    return this;
	  };

	  // adds an event listener in the form of element.addEventListener(type, listener);
	  this.listen = function addEvent(evnt, func) {
	    selected.map(function (x) {
	      temp = x;
	      temp.addEventListener(evnt, func);
	      return selected;
	    });
	    return this;
	  };

	  // add your code to the html of $
	  this.append = function addContentToExisting(code) {
	    selected.map(function (x) {
	      temp = x;
	      temp.innerHTML += code;
	      return selected;
	    });
	    return this;
	  };

	  this.ajax = function getAndPost() {
	    var options = arguments.length > 0 && (arguments.length <= 0 ? undefined : arguments[0]) !== undefined ? arguments.length <= 0 ? undefined : arguments[0] : {};

	    var url = options.url || alert('You need to specify a url');
	    var method = options.methods || 'GET';
	    var data = options.data || '';

	    var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

	    if (method === 'POST') {
	      xmlhttp.open('POST', url, true);
	      xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	      xmlhttp.send(data);
	    } else {
	      xmlhttp.onreadystatechange = function whenChangeHappen() {
	        if (xmlhttp.readyState === XMLHttpRequest.DONE) {
	          if (xmlhttp.status === 200) {
	            for (i = 0; i < selected.length; i += 1) {
	              selected[i].innerHTML += xmlhttp.response;
	            }
	          } else if (xmlhttp.status === 400) {
	            alert('page does not exist on the server.');
	          } else {
	            alert('something went wrong.');
	          }
	        }
	        return this;
	      };

	      xmlhttp.open('GET', url, true);
	      xmlhttp.send(data);
	    }
	  };

	  this.index = function getIndexOfElement() {
	    var children = selected.parentNode.childNodes;
	    var num = 0;
	    for (i = 0; i < children.length; i += 1) {
	      if (children[i] === selected) return num;
	      if (children[i].nodeType === 1) num += 1;
	    }
	    return -1;
	  };
	  return this;
	}

/***/ }
/******/ ]);
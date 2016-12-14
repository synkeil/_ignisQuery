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

	var iqf = function ignisQueryFunctional() {
	  var mainSelector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	  var subSelector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	  var mainS = mainSelector;
	  var subS = subSelector;

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
	    // end the function in case there is no parent specified
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
	};
	var addClass = function addClassToElement(elem, toAdd) {
	  var temp = void 0;
	  iqf(elem).map(function (x) {
	    temp = x;
	    temp.classList.add(toAdd);
	    return iqf(elem);
	  });
	};
	var removeClass = function removeClassToElement(elem, toRemove) {
	  var temp = void 0;
	  iqf(elem).map(function (x) {
	    temp = x;
	    temp.classList.remove(toRemove);
	    return iqf(elem);
	  });
	};

	var attr = function setAttribut(elem, atr, val) {
	  var temp = void 0;
	  iqf(elem).map(function (x) {
	    temp = x;
	    temp.setAttribute(atr, val);
	    return iqf(elem);
	  });
	};
	var css = function setStyle(elem, style) {
	  var temp = void 0;
	  iqf(elem).map(function (x) {
	    temp = x;
	    temp.style.cssText = style;
	    return iqf(elem);
	  });
	};

	// returns the content of $ if 'a' is empty, else sets it to 'a'
	var html = function setContentAbsolutly(elem) {
	  var temp = void 0;
	  var a = (arguments.length <= 1 ? 0 : arguments.length - 1) > 0 && (arguments.length <= 1 ? undefined : arguments[1]) !== undefined ? arguments.length <= 1 ? undefined : arguments[1] : null;

	  if (a === null) {
	    return iqf(elem).innerHTML;
	  }
	  iqf(elem).map(function (x) {
	    temp = x;
	    temp.innerHTML = a;
	    return iqf(elem);
	  });
	  return this;
	};

	var val = function returnElemValue(elem) {
	  var temp = void 0;
	  var a = (arguments.length <= 1 ? 0 : arguments.length - 1) > 0 && (arguments.length <= 1 ? undefined : arguments[1]) !== undefined ? arguments.length <= 1 ? undefined : arguments[1] : null;

	  if (a === null) {
	    return iqf(elem)[0].value;
	  }
	  iqf(elem).map(function (x) {
	    temp = x;
	    temp.value = a;
	    return iqf(elem);
	  });
	};

	// adds an event listener in the form of element.addEventListener(type, listener);
	var listen = function addEvent(elem, evnt, func) {
	  var temp = void 0;
	  iqf(elem).map(function (x) {
	    temp = x;
	    temp.addEventListener(evnt, func);
	    return iqf(elem);
	  });
	};

	// add your code to the html of $
	var append = function addContentToExisting(elem, code) {
	  var temp = void 0;
	  iqf(elem).map(function (x) {
	    temp = x;
	    temp.innerHTML += code;
	    return iqf(elem);
	  });
	  return this;
	};

	// probably needs some work with multiple elements returned by iqf
	var index = function getIndexOfElement(elem) {
	  var children = iqf(elem).parentNode.childNodes;
	  var num = 0;
	  for (var i = 0; i < children.length; i += 1) {
	    if (children[i] === iqf(elem)) return num;
	    if (children[i].nodeType === 1) num += 1;
	  }
	  return -1;
	};
/***/ }
/******/ ]);

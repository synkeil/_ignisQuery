const iqf = function ignisQueryFunctional(mainSelector = null, subSelector = null) {
  let mainS = mainSelector;
  let subS = subSelector;

  // recipients of the selection in case it returns multiple elements
  const main = [];
  const sub = [];
  // htmlCollections
  let mainCount = [];
  let subCount = [];
  // the final selection that gets returned by the function
  const selected = [];
  let count = 0;

  // setting up iterators
  let a = 0;
  let b = 0;
  let c = 0;
  let d = 0;
  let f = 0;
  let g = 0;

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
  this.eq = function atIndex(...theArgs) {
    const iM = theArgs.length > 0 && theArgs[0] !== undefined ? theArgs[0] : null;

    if (iM !== null) {
      selected[0] = selected[iM - 1];
      selected.splice(1, selected.length - 1);
      return selected[0];
    }
    return selected;
  };
  return selected;
};

const addClass = function addClassToElement(elem, toAdd) {
  let temp;
  elem.map(
    (x) => {
      temp = x;
      temp.classList.add(toAdd);
      return elem;
    }
  );
};

const removeClass = function removeClassToElement(elem, toRemove) {
  let temp;
  elem.map(
    (x) => {
      temp = x;
      temp.classList.remove(toRemove);
      return elem;
    }
  );
};

const attr = function setAttribut(elem, atr, val) {
  let temp;
  elem.map(
    (x) => {
      temp = x;
      temp.setAttribute(atr, val);
      return elem;
    }
  );
};

// set the css of the query in the form of "backgroundcolor:blue;width:125px"
const css = function setStyle(elem, style) {
  let temp;
  elem.map(
    (x) => {
      temp = x;
      temp.style.cssText = style;
      return elem;
    }
  );
};

// returns the content of $ if 'a' is empty, else sets it to 'a'
const html = function setContentAbsolutly(elem, code) {
  let temp;
  const tempArray = [];
  const a = code.length > 0 && code !== undefined ? code : null;

  if (a === null) {
    elem.map(
      (x) => {
        tempArray.push(x.innerHTML);
        return tempArray;
      }
    );
  } else {
    elem.map(
      (x) => {
        temp = x;
        temp.innerHTML = a;
        return elem;
      }
    );
  }
};

const val = function returnElemValue(elem, ...theArgs) {
  let temp;
  const a = theArgs.length > 0 && theArgs[0] !== undefined ? theArgs[0] : null;

  if (a === null) {
    return elem[0].value;
  }
  elem.map(
    (x) => {
      temp = x;
      temp.value = a;
      return elem;
    }
  );
  return elem;
};

// adds an event listener in the form of element.addEventListener(type, listener);
const listen = function addEvent(elem, evnt, func) {
  let temp;
  elem.map(
    (x) => {
      temp = x;
      temp.addEventListener(evnt, func);
      return elem;
    }
  );
};

// add your code to the html of $
const append = function addContentToExisting(elem, code) {
  let temp;
  elem.map(
    (x) => {
      temp = x;
      temp.innerHTML += code;
      return elem;
    }
  );
};

// probably needs some work with multiple elements returned by $
const index = function getIndexOfElement(elem) {
  const children = elem.parentNode.childNodes;
  let num = 0;
  for (let i = 0; i < children.length; i += 1) {
    if (children[i] === elem) return num;
    if (children[i].nodeType === 1) num += 1;
  }
  return -1;
};

const ajaxPost = function getAndPost(elem, ...theArgs) {
  const options = theArgs.length > 0 && theArgs[0] !== undefined ? theArgs[0] : {};

  const url = options.url || alert('You need to specify a url');
  const method = options.methods || 'GET';
  const data = options.data || '';

  const xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

  if (method === 'POST') {
    xmlhttp.open('POST', url, true);
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send(data);
  } else {
    xmlhttp.onreadystatechange = function whenChangeHappen() {
      if (xmlhttp.readyState === XMLHttpRequest.DONE) {
        if (xmlhttp.status === 200) {
          for (let i = 0; i < elem.length; i += 1) {
            elem[i].innerHTML += xmlhttp.response;
          }
        } else if (xmlhttp.status === 400) {
          alert('page does not exist on the server.');
        } else {
          alert('something went wrong.');
        }
      }
    };

    xmlhttp.open('GET', url, true);
    xmlhttp.send(data);
  }
};

addClass(iqf('#addclassSingle'), 'singleClass_added');
addClass(iqf('.addclassMultiple'), 'multipleClass_added');
removeClass(iqf('#removeClsSingle'), 'you_shouldntSee_this');
removeClass(iqf('#removeCls_mltp'), 'you_shouldntSee_AnyOfThis');
attr(iqf('#sglAttr'), 'new_attribut', 'got_added');
attr(iqf('.MltpAttr'), 'new_attributs', 'also_got_added');
css(iqf('#sglCss'), 'backgroundcolor:blue');
css(iqf('.MltpCss'), 'backgroundcolor:blue');
html(iqf('#sglHtml'), '');
html(iqf('.MltpHtml'), '');
val();
listen(iqf('#sglListen'), '');
listen(iqf('.MltpListen'), '');
append(iqf('#sglAppend'), '');
append(iqf('.MltpAppend'), '');
index();
ajaxPost();

; (function (exports) {
  var keyBoard = function (input, options) {
    var body = document.getElementsByTagName('body')[0];
    var DIV_ID = options && options.divId || '__divid_' + Math.random();

    if (document.getElementById(DIV_ID)) {
      body.removeChild(document.getElementById(DIV_ID));
    }

    this.input = input;
    this.el = document.createElement('div');

    var self = this;
    var zIndex = options && options.zIndex || 9999;
    var mobile = typeof orientation !== 'undefined';

    this.el.id = DIV_ID;
    this.el.style.position = 'absolute';
    this.el.style.left = 0;
    this.el.style.right = 0;
    this.el.style.bottom = 0;
    this.el.style.zIndex = zIndex;

    //样式
    var cssString = '<style type="text/css">' +
      '  .keyboard{position:absolute;width:100%;bottom:0px;}' +
      '  .keyboard ul{margin: 0;padding: 0;list-style: none;font-size:20px;overflow:hidden;background: #eee;padding-top:5px;}' +
      '  .keyboard ul li{float:left;font-size: .95rem;width:22.5%;height: 50px;line-height: 50px;margin: 0 1.5% 5px 0;text-align: center;background: #fff;background: #fff;border: 1px solid #f9f9f9;-moz-border-radius: 5px;-webkit-border-radius: 5px;}' +
      '  .keyboard ul li:active{position: relative;top: 1px;left: 1px;border-color: #e5e5e5;cursor: pointer;}' +
      '  .keyboard ul li.item-left{margin-left:1.5%;}' +
      '  .keyboard ul li.item-right{border-right:0;}' +
      '  .keyboard ul li.item-bottom{border-bottom:0;}' +
      '</style>';

    //填充数字键盘
    var keyboardDiv = '<div class="keyboard">\
                              <ul id="keyboard">\
                                  <li class="item-left" data-value="1">1</span></li>\
                                  <li class="" data-value="2">2</span></li>\
                                  <li class="" data-value="3">3</span></li>\
                                  <li class="item-right" data-value="cls">关闭</span></li>\
                                  <li class="item-left" data-value="4">4</span></li>\
                                  <li class="" data-value="5">5</span></li>\
                                  <li class="" data-value="6">6</span></li>\
                                  <li class="item-right" data-value="del">退格</span></li>\
                                  <li class="item-left" data-value="7">7</span></li>\
                                  <li class="" data-value="8">8</span></li>\
                                  <li class="" data-value="9">9</span></li>\
                                  <li class="item-right" data-value="-">输</span></li>\
                                  <li class="item-left item-bottom" data-value=".">●</span></li>\
                                  <li class="item-bottom" data-value="0">0</span></li>\
                                  <li class="item-bottom" data-value="00">00</span></li>\
                                  <li class="item-right item-bottom" data-value="+">赢</span></li>\
                              </ul>\
                          </div>';

    this.el.innerHTML = cssString + keyboardDiv;


    function addEvent(e) {
      var ev = e || window.event;
      var clickEl = ev.element || ev.target;
      if (clickEl.tagName.toLocaleLowerCase() != 'li')
        return;
      var value = clickEl.getAttribute('data-value');
      switch (value) {
        case '+':
          var iptVal = parseFloat(self.input.value);
          if (iptVal && iptVal < 0) {
            iptVal = iptVal * (-1);
            self.input.value = iptVal;
          }
          break;
        case '-':
          var iptVal = parseFloat(self.input.value);
          if (isNaN(iptVal)) {
            self.input.value = value;
            return;
          }
          if (iptVal && iptVal > 0) {
            iptVal = iptVal * (-1);
            self.input.value = iptVal;
          }
          break;
        case 'del':
          var iptVal = self.input.value;
          if (iptVal && iptVal.length > 0) {
            iptVal = iptVal.substr(0, iptVal.length - 1);
            self.input.value = iptVal;
          }
          break;
        case 'cls':
          body.removeChild(self.el);
          break;
        case 'confirm':
          body.removeChild(self.el);
          break;
        case '':
          break;
        default:
          if (self.input) {
            self.input.value += value;
          }
          break;
      }

      resetContainer();
    }

    //防止被遮盖
    function resetContainer() {

    }

    if (mobile) {
      this.el.ontouchstart = addEvent;
    } else {
      this.el.onclick = addEvent;
    }
    body.appendChild(this.el);

    resetContainer();
  }

  exports.keyBoard = keyBoard;

})(window);
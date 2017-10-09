// Generated by LiveScript 1.5.0
(function(){
  var React, createClass, UNICODE, rZyS, rZyJ, rZyY, rZyD, TYPESET, ruby2hruby;
  React = require('react');
  createClass = compose$(React.createClass, React.createFactory);
  module.exports = createClass({
    render: function(){
      var __html;
      __html = "<hruby class=\"rightangle\" rightangle=\"rightangle\">" + ruby2hruby(this.props.html) + "</hruby>";
      return React.createElement('span', {
        dangerouslySetInnerHTML: {
          __html: __html
        }
      });
    }
  });
  UNICODE = {
    zhuyin: {
      base: '[\u3105-\u312D\u31A0-\u31BA]',
      initial: '[\u3105-\u3119\u312A-\u312C\u31A0-\u31A3]',
      medial: '[\u3127-\u3129]',
      final: '[\u311A-\u3129\u312D\u31A4-\u31B3\u31B8-\u31BA]',
      tone: '[\u02D9\u02CA\u02C5\u02C7\u02CB\u02EA\u02EB]',
      ruyun: '[\u31B4-\u31B7][\u0358\u030d]?'
    }
  };
  rZyS = UNICODE.zhuyin.initial;
  rZyJ = UNICODE.zhuyin.medial;
  rZyY = UNICODE.zhuyin.final;
  rZyD = UNICODE.zhuyin.tone + '|' + UNICODE.zhuyin.ruyun;
  TYPESET = {
    zhuyin: {
      form: new RegExp('^\u02D9?(' + rZyS + ')?(' + rZyJ + ')?(' + rZyY + ')?(' + rZyD + ')?$'),
      diao: new RegExp('(' + rZyD + ')', 'g')
    }
  };
  ruby2hruby = function(html){
    var $, $rbs, maxspan, $rus, spans;
    $ = require('cheerio').load("<ruby class='rightangle'>" + html + "</ruby>");
    $rbs = $('rb');
    maxspan = $rbs.length;
    $rus = [];
    $('rtc.zhuyin').each(function(_, e){
      return $(e).find('rt').each(function(i, rt){
        var $rb, $rt, $ru, $zhuyin, $yin, $diao, zhuyin, yin, len, diao, form;
        if (!$rbs[i]) {
          return;
        }
        $rb = $($rbs[i]).clone();
        $rt = $(rt);
        $ru = $('<ru/>');
        $zhuyin = $('<zhuyin/>');
        $yin = $('<yin/>');
        $diao = $('<diao/>');
        zhuyin = $rt.text();
        yin = zhuyin.replace(TYPESET.zhuyin.diao, '');
        len = yin ? yin.length : 0;
        diao = zhuyin.replace(yin, '').replace(/[\u02C5]/g, '\u02C7').replace(/[\u030D]/g, '\u0358');
        form = zhuyin.replace(TYPESET.zhuyin.form, function(s, j, y){
          return [s ? 'S' : null, j ? 'J' : null, y ? 'Y' : null].join('');
        });
        $diao.html(diao);
        $yin.html(yin);
        $zhuyin.append($yin);
        $zhuyin.append($diao);
        $ru.append($rb);
        $ru.append($zhuyin);
        $ru.attr('zhuyin', '');
        $ru.attr('diao', diao);
        $ru.attr('length', len);
        $ru.attr('form', form);
        $($rbs[i]).replaceWith($ru);
        return $rus.push($ru);
      });
    });
    $('rtc.zhuyin').remove();
    spans = [];
    $('rtc').each(function(order, e){
      return $(e).find('rt').each(function(i, rt){
        var aRb, rbspan, ref$, span, rb, $ru, $rt, i$, len$, x, results$ = [];
        if (order === 0) {
          aRb = [];
          rbspan = (ref$ = Number($(rt).attr('rbspan') || 1)) < maxspan ? ref$ : maxspan;
          span = 0;
          while (rbspan > span) {
            rb = $rus.shift();
            aRb.push(rb);
            if (rb == null) {
              break;
            }
            span += Number($(rb).attr('span') || 1);
          }
          if (rbspan < span) {
            if (aRb.length > 1) {
              return;
            }
            aRb = $(aRb[0]).find('rb').get();
            $ru = aRb.slice(rbspan).concat($ru);
            aRb = aRb.slice(0, rbspan);
            span = rbspan;
          }
          spans[i] = span;
        } else {
          span = spans[i];
          aRb = [$('ru[order=0]').eq(i)];
        }
        $ru = $('<ru/>');
        $rt = $(rt).clone();
        $ru.html(aRb.map(function(rb){
          if (rb == null) {
            return '';
          }
          return $.html(rb);
        }).join(''));
        $ru.append($rt);
        $ru.attr('span', span);
        $ru.attr('order', order);
        $ru.attr('class', $('ruby').attr('class'));
        $ru.attr('annotation', $rt.text().replace(/\u0061[\u030d\u0358]/g, '\uDB80\uDC61').replace(/\u0065[\u030d\u0358]/g, '\uDB80\uDC65').replace(/\u0069[\u030d\u0358]/g, '\uDB80\uDC69').replace(/\u006F[\u030d\u0358]/g, '\uDB80\uDC6F').replace(/\u0075[\u030d\u0358]/g, '\uDB80\uDC75'));
        $(aRb.shift()).replaceWith($ru);
        for (i$ = 0, len$ = aRb.length; i$ < len$; ++i$) {
          x = aRb[i$];
          results$.push($(x).remove());
        }
        return results$;
      });
    });
    $('rtc').remove();
    $('rt').attr('style', 'text-indent: -9999px; color: transparent');
    return $('ruby').html().replace(/&#x([0-9a-fA-F]+);/g, function(_, _1){
      var codePoint;
      codePoint = parseInt(_1, 16);
      if (codePoint <= 0xFFFF) {
        return String.fromCharCode(codePoint);
      } else {
        codePoint -= 0x10000;
        return '' + String.fromCharCode((codePoint >> 10) + 0xD800) + String.fromCharCode(codePoint % 0x400 + 0xDC00);
      }
    });
  };
  function compose$() {
    var functions = arguments;
    return function() {
      var i, result;
      result = functions[0].apply(this, arguments);
      for (i = 1; i < functions.length; ++i) {
        result = functions[i](result);
      }
      return result;
    };
  }
}).call(this);

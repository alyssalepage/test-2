/*
CSS Browser Selector v0.3.5 (Feb 05, 2010)
Rafael Lima (https://rafael.adm.br)
https://rafael.adm.br/css_browser_selector
License: https://creativecommons.org/licenses/by/2.5/
Contributors: https://rafael.adm.br/css_browser_selector#contributors
*/
function css_browser_selector(u) {
  var ua = u.toLowerCase(),
    is = function (t) {
      return ua.indexOf(t) > -1;
    },
    g = 'gecko',
    w = 'webkit',
    s = 'safari',
    o = 'opera',
    h = document.documentElement,
    b = [
      !/opera|webtv/i.test(ua) && /msie\s(\d)/.test(ua)
        ? 'ie ie' + RegExp.$1
        : is('firefox/2')
        ? g + ' ff2'
        : is('firefox/3.5')
        ? g + ' ff3 ff3_5'
        : is('firefox/3')
        ? g + ' ff3'
        : is('gecko/')
        ? g
        : is('opera')
        ? o + (/version\/(\d+)/.test(ua) ? ' ' + o + RegExp.$1 : /opera(\s|\/)(\d+)/.test(ua) ? ' ' + o + RegExp.$2 : '')
        : is('konqueror')
        ? 'konqueror'
        : is('chrome')
        ? w + ' chrome'
        : is('iron')
        ? w + ' iron'
        : is('applewebkit/')
        ? w + ' ' + s + (/version\/(\d+)/.test(ua) ? ' ' + s + RegExp.$1 : '')
        : is('mozilla/')
        ? g
        : '',
      is('j2me')
        ? 'mobile'
        : is('iphone')
        ? 'iphone'
        : is('ipod')
        ? 'ipod'
        : is('mac')
        ? 'mac'
        : is('darwin')
        ? 'mac'
        : is('webtv')
        ? 'webtv'
        : is('win')
        ? 'win'
        : is('freebsd')
        ? 'freebsd'
        : is('x11') || is('linux')
        ? 'linux'
        : '',
    ];
  c = b.join(' ');
  h.className += ' ' + c;
  return c;
}
css_browser_selector(navigator.userAgent);

/*! $script.js v1.2
 https://github.com/polvero/script.js
 Copyright: @ded & @fat - Dustin Diaz, Jacob Thornton 2011
 License: CC Attribution: https://creativecommons.org/licenses/by/3.0/
*/
!(function (a, b, c) {
  function u(a) {
    h.test(b[n])
      ? c(function () {
          u(a);
        }, 50)
      : a();
  }
  var d = b.getElementsByTagName('script')[0],
    e = {},
    f = {},
    g = {},
    h = /in/,
    i = {},
    j = 'string',
    k = !1,
    l = 'push',
    m = 'DOMContentLoaded',
    n = 'readyState',
    o = 'addEventListener',
    p = 'onreadystatechange',
    q = (function () {
      return (
        Array.every ||
        function (a, b) {
          for (var c = 0, d = a.length; c < d; ++c) if (!b(a[c], c, a)) return 0;
          return 1;
        }
      );
    })(),
    r = function (a, b) {
      q(a, function (c, d) {
        return !b(c, d, a);
      });
    };
  !b[n] &&
    b[o] &&
    (b[o](
      m,
      function s() {
        b.removeEventListener(m, s, k), (b[n] = 'complete');
      },
      k
    ),
    (b[n] = 'loading'));
  var t = function (a, j, k) {
    a = a[l] ? a : [a];
    var m = j.call,
      o = m ? j : k,
      s = m ? a.join('') : j,
      u = a.length,
      v = function (a) {
        return a.call ? a() : e[a];
      },
      w = function () {
        if (!--u) {
          (e[s] = 1), o && o();
          for (var a in g) q(a.split('|'), v) && !r(g[a], v) && (g[a] = []);
        }
      };
    if (!f[s]) {
      c(function () {
        r(a, function (a) {
          if (!i[a]) {
            i[a] = f[s] = 1;
            var c = b.createElement('script'),
              e = 0;
            (c.onload = c[p] =
              function () {
                (c[n] && !!h.test(c[n])) || e || ((c.onload = c[p] = null), (e = 1), w());
              }),
              (c.async = 1),
              (c.src = a),
              d.parentNode.insertBefore(c, d);
          }
        });
      }, 0);
      return t;
    }
  };
  (t.ready = function (a, b, c) {
    a = a[l] ? a : [a];
    var d = [];
    !r(a, function (a) {
      e[a] || d[l](a);
    }) &&
    q(a, function (a) {
      return e[a];
    })
      ? b()
      : !(function (a) {
          (g[a] = g[a] || []), g[a][l](b), c && c(d);
        })(a.join('|'));
    return t;
  }),
    (a.$script = t);
})(this, document, setTimeout);

function isNumeric(sText) {
  var validChars = '0123456789';
  var isNumber = true;
  var char;
  for (i = 0; i < sText.length && isNumber == true; i++) {
    char = sText.charAt(i);
    if (validChars.indexOf(char) == -1) {
      isNumber = false;
    }
  }
  return isNumber;
}

/*!
 * Modernizr v1.6
 * https://www.modernizr.com
 *
 * Developed by:
 * - Faruk Ates  https://farukat.es/
 * - Paul Irish  https://paulirish.com/
 *
 * Copyright (c) 2009-2010
 * Dual-licensed under the BSD or MIT licenses.
 * https://www.modernizr.com/license/
 */

/*
 * Modernizr is a script that detects native CSS3 and HTML5 features
 * available in the current UA and provides an object containing all
 * features with a true/false value, depending on whether the UA has
 * native support for it or not.
 *
 * Modernizr will also add classes to the <html> element of the page,
 * one for each feature it detects. If the UA supports it, a class
 * like "cssgradients" will be added. If not, the class name will be
 * "no-cssgradients". This allows for simple if-conditionals in your
 * CSS, giving you fine control over the look & feel of your website.
 *
 * @author        Faruk Ates
 * @author        Paul Irish
 * @copyright     (c) 2009-2010 Faruk Ates.
 * @contributor   Ben Alman
 */

window.Modernizr = (function (window, doc, undefined) {
  var version = '1.6',
    ret = {},
    /**
     * !! DEPRECATED !!
     *
     * enableHTML5 is a private property for advanced use only. If enabled,
     * it will make Modernizr.init() run through a brief while() loop in
     * which it will create all HTML5 elements in the DOM to allow for
     * styling them in Internet Explorer, which does not recognize any
     * non-HTML4 elements unless created in the DOM this way.
     *
     * enableHTML5 is ON by default.
     *
     * The enableHTML5 toggle option is DEPRECATED as per 1.6, and will be
     * replaced in 2.0 in lieu of the modular, configurable nature of 2.0.
     */
    enableHTML5 = true,
    docElement = doc.documentElement,
    /**
     * Create our "modernizr" element that we do most feature tests on.
     */
    mod = 'modernizr',
    m = doc.createElement(mod),
    m_style = m.style,
    /**
     * Create the input element for various Web Forms feature tests.
     */
    f = doc.createElement('input'),
    smile = ':)',
    tostring = Object.prototype.toString,
    // List of property values to set for css tests. See ticket #21
    prefixes = ' -webkit- -moz- -o- -ms- -khtml- '.split(' '),
    // Following spec is to expose vendor-specific style properties as:
    //   elem.style.WebkitBorderRadius
    // and the following would be incorrect:
    //   elem.style.webkitBorderRadius

    // Webkit ghosts their properties in lowercase but Opera & Moz do not.
    // Microsoft foregoes prefixes entirely <= IE8, but appears to
    //   use a lowercase `ms` instead of the correct `Ms` in IE9

    // More here: https://github.com/Modernizr/Modernizr/issues/issue/21
    domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
    ns = { svg: 'https://www.w3.org/2000/svg' },
    tests = {},
    inputs = {},
    attrs = {},
    classes = [],
    featurename, // used in testing loop
    // todo: consider using https://javascript.nwbox.com/CSSSupport/css-support.js instead
    testMediaQuery = function (mq) {
      var st = document.createElement('style'),
        div = doc.createElement('div'),
        ret;

      st.textContent = mq + '{#modernizr{height:3px}}';
      (doc.head || doc.getElementsByTagName('head')[0]).appendChild(st);
      div.id = 'modernizr';
      docElement.appendChild(div);

      ret = div.offsetHeight === 3;

      st.parentNode.removeChild(st);
      div.parentNode.removeChild(div);

      return !!ret;
    },
    /**
     * isEventSupported determines if a given element supports the given event
     * function from https://yura.thinkweb2.com/isEventSupported/
     */
    isEventSupported = (function () {
      var TAGNAMES = {
        select: 'input',
        change: 'input',
        submit: 'form',
        reset: 'form',
        error: 'img',
        load: 'img',
        abort: 'img',
      };

      function isEventSupported(eventName, element) {
        element = element || document.createElement(TAGNAMES[eventName] || 'div');
        eventName = 'on' + eventName;

        // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and "resize", whereas `in` "catches" those
        var isSupported = eventName in element;

        if (!isSupported) {
          // If it has no `setAttribute` (i.e. doesn't implement Node interface), try generic element
          if (!element.setAttribute) {
            element = document.createElement('div');
          }
          if (element.setAttribute && element.removeAttribute) {
            element.setAttribute(eventName, '');
            isSupported = typeof element[eventName] == 'function';

            // If property was created, "remove it" (by setting value to `undefined`)
            if (typeof element[eventName] != 'undefined') {
              element[eventName] = undefined;
            }
            element.removeAttribute(eventName);
          }
        }

        element = null;
        return isSupported;
      }
      return isEventSupported;
    })();

  // hasOwnProperty shim by kangax needed for Safari 2.0 support
  var _hasOwnProperty = {}.hasOwnProperty,
    hasOwnProperty;
  if (typeof _hasOwnProperty !== 'undefined' && typeof _hasOwnProperty.call !== 'undefined') {
    hasOwnProperty = function (object, property) {
      return _hasOwnProperty.call(object, property);
    };
  } else {
    hasOwnProperty = function (object, property) {
      /* yes, this can give false positives/negatives, but most of the time we don't care about those */
      return property in object && typeof object.constructor.prototype[property] === 'undefined';
    };
  }

  /**
   * set_css applies given styles to the Modernizr DOM node.
   */
  function set_css(str) {
    m_style.cssText = str;
  }

  /**
   * set_css_all extrapolates all vendor-specific css strings.
   */
  function set_css_all(str1, str2) {
    return set_css(prefixes.join(str1 + ';') + (str2 || ''));
  }

  /**
   * contains returns a boolean for if substr is found within str.
   */
  function contains(str, substr) {
    return ('' + str).indexOf(substr) !== -1;
  }

  /**
   * test_props is a generic CSS / DOM property test; if a browser supports
   *   a certain property, it won't return undefined for it.
   *   A supported CSS property returns empty string when its not yet set.
   */
  function test_props(props, callback) {
    for (var i in props) {
      if (m_style[props[i]] !== undefined && (!callback || callback(props[i], m))) {
        return true;
      }
    }
  }

  /**
   * test_props_all tests a list of DOM properties we want to check against.
   *   We specify literally ALL possible (known and/or likely) properties on
   *   the element including the non-vendor prefixed one, for forward-
   *   compatibility.
   */
  function test_props_all(prop, callback) {
    var uc_prop = prop.charAt(0).toUpperCase() + prop.substr(1),
      props = (prop + ' ' + domPrefixes.join(uc_prop + ' ') + uc_prop).split(' ');

    return !!test_props(props, callback);
  }

  /**
   * Tests
   */

  tests['flexbox'] = function () {
    /**
     * set_prefixed_value_css sets the property of a specified element
     * adding vendor prefixes to the VALUE of the property.
     * @param {Element} element
     * @param {string} property The property name. This will not be prefixed.
     * @param {string} value The value of the property. This WILL be prefixed.
     * @param {string=} extra Additional CSS to append unmodified to the end of
     * the CSS string.
     */
    function set_prefixed_value_css(element, property, value, extra) {
      property += ':';
      element.style.cssText = (property + prefixes.join(value + ';' + property)).slice(0, -property.length) + (extra || '');
    }

    /**
     * set_prefixed_property_css sets the property of a specified element
     * adding vendor prefixes to the NAME of the property.
     * @param {Element} element
     * @param {string} property The property name. This WILL be prefixed.
     * @param {string} value The value of the property. This will not be prefixed.
     * @param {string=} extra Additional CSS to append unmodified to the end of
     * the CSS string.
     */
    function set_prefixed_property_css(element, property, value, extra) {
      element.style.cssText = prefixes.join(property + ':' + value + ';') + (extra || '');
    }

    var c = doc.createElement('div'),
      elem = doc.createElement('div');

    set_prefixed_value_css(c, 'display', 'box', 'width:42px;padding:0;');
    set_prefixed_property_css(elem, 'box-flex', '1', 'width:10px;');

    c.appendChild(elem);
    docElement.appendChild(c);

    var ret = elem.offsetWidth === 42;

    c.removeChild(elem);
    docElement.removeChild(c);

    return ret;
  };

  // On the S60 and BB Storm, getContext exists, but always returns undefined
  // https://github.com/Modernizr/Modernizr/issues/issue/97/

  tests['canvas'] = function () {
    var elem = doc.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
  };

  tests['canvastext'] = function () {
    return !!(ret['canvas'] && typeof doc.createElement('canvas').getContext('2d').fillText == 'function');
  };

  tests['webgl'] = function () {
    var elem = doc.createElement('canvas');

    try {
      if (elem.getContext('webgl')) {
        return true;
      }
    } catch (e) {}

    try {
      if (elem.getContext('experimental-webgl')) {
        return true;
      }
    } catch (e) {}

    return false;
  };

  /*
   * The Modernizr.touch test only indicates if the browser supports
   *    touch events, which does not necessarily reflect a touchscreen
   *    device, as evidenced by tablets running Windows 7 or, alas,
   *    the Palm Pre / WebOS (touch) phones.
   *
   * Additionally, Chrome (desktop) used to lie about its support on this,
   *    but that has since been rectified: https://crbug.com/36415
   *
   * We also test for Firefox 4 Multitouch Support.
   *
   * For more info, see: https://modernizr.github.com/Modernizr/touch.html
   */

  tests['touch'] = function () {
    return 'ontouchstart' in window || testMediaQuery('@media (' + prefixes.join('touch-enabled),(') + 'modernizr)');
  };

  /**
   * geolocation tests for the new Geolocation API specification.
   *   This test is a standards compliant-only test; for more complete
   *   testing, including a Google Gears fallback, please see:
   *   https://code.google.com/p/geo-location-javascript/
   * or view a fallback solution using google's geo API:
   *   https://gist.github.com/366184
   */
  tests['geolocation'] = function () {
    return !!navigator.geolocation;
  };

  // Per 1.6:
  // This used to be Modernizr.crosswindowmessaging but the longer
  // name has been deprecated in favor of a shorter and property-matching one.
  // The old API is still available in 1.6, but as of 2.0 will throw a warning,
  // and in the first release thereafter disappear entirely.
  tests['postmessage'] = function () {
    return !!window.postMessage;
  };

  // Web SQL database detection is tricky:

  // In chrome incognito mode, openDatabase is truthy, but using it will
  //   throw an exception: https://crbug.com/42380
  // We can create a dummy database, but there is no way to delete it afterwards.

  // Meanwhile, Safari users can get prompted on any database creation.
  //   If they do, any page with Modernizr will give them a prompt:
  //   https://github.com/Modernizr/Modernizr/issues/closed#issue/113

  // We have chosen to allow the Chrome incognito false positive, so that Modernizr
  //   doesn't litter the web with these test databases. As a developer, you'll have
  //   to account for this gotcha yourself.
  tests['websqldatabase'] = function () {
    var result = !!window.openDatabase;
    /*
      if (result){
        try {
          result = !!openDatabase( mod + "testdb", "1.0", mod + "testdb", 2e4);
        } catch(e) {
        }
      }
      */
    return result;
  };

  // Vendors have inconsistent prefixing with the experimental Indexed DB:
  // - Firefox is shipping indexedDB in FF4 as moz_indexedDB
  // - Webkit's implementation is accessible through webkitIndexedDB
  // We test both styles.
  tests['indexedDB'] = function () {
    for (var i = -1, len = domPrefixes.length; ++i < len; ) {
      var prefix = domPrefixes[i].toLowerCase();
      if (window[prefix + '_indexedDB'] || window[prefix + 'IndexedDB']) {
        return true;
      }
    }
    return false;
  };

  // documentMode logic from YUI to filter out IE8 Compat Mode
  //   which false positives.
  tests['hashchange'] = function () {
    return isEventSupported('hashchange', window) && (document.documentMode === undefined || document.documentMode > 7);
  };

  // Per 1.6:
  // This used to be Modernizr.historymanagement but the longer
  // name has been deprecated in favor of a shorter and property-matching one.
  // The old API is still available in 1.6, but as of 2.0 will throw a warning,
  // and in the first release thereafter disappear entirely.
  tests['history'] = function () {
    return !!(window.history && history.pushState);
  };

  tests['draganddrop'] = function () {
    return (
      isEventSupported('drag') &&
      isEventSupported('dragstart') &&
      isEventSupported('dragenter') &&
      isEventSupported('dragover') &&
      isEventSupported('dragleave') &&
      isEventSupported('dragend') &&
      isEventSupported('drop')
    );
  };

  tests['websockets'] = function () {
    return 'WebSocket' in window;
  };

  // https://css-tricks.com/rgba-browser-support/
  tests['rgba'] = function () {
    // Set an rgba() color and check the returned value

    set_css('background-color:rgba(150,255,150,.5)');

    return contains(m_style.backgroundColor, 'rgba');
  };

  tests['hsla'] = function () {
    // Same as rgba(), in fact, browsers re-map hsla() to rgba() internally,
    //   except IE9 who retains it as hsla

    set_css('background-color:hsla(120,40%,100%,.5)');

    return contains(m_style.backgroundColor, 'rgba') || contains(m_style.backgroundColor, 'hsla');
  };

  tests['multiplebgs'] = function () {
    // Setting multiple images AND a color on the background shorthand property
    //  and then querying the style.background property value for the number of
    //  occurrences of "url(" is a reliable method for detecting ACTUAL support for this!

    set_css('background:url(//:),url(//:),red url(//:)');

    // If the UA supports multiple backgrounds, there should be three occurrences
    //   of the string "url(" in the return value for elem_style.background

    return new RegExp('(url\\s*\\(.*?){3}').test(m_style.background);
  };

  // In testing support for a given CSS property, it's legit to test:
  //    elem.style[styleName] !== undefined
  // If the property is supported it will return an empty string,
  // if unsupported it will return undefined.
  // We'll take advantage of this quick test and skip setting a style
  // on our modernizr element, but instead just testing undefined vs
  // empty string.
  // The legacy set_css_all calls will remain in the source
  // (however, commented) for clarity, yet functionally they are
  // no longer needed.

  tests['backgroundsize'] = function () {
    return test_props_all('backgroundSize');
  };

  tests['borderimage'] = function () {
    //  set_css_all( 'border-image:url(m.png) 1 1 stretch' );
    return test_props_all('borderImage');
  };

  // Super comprehensive table about all the unique implementations of
  // border-radius: https://muddledramblings.com/table-of-css3-border-radius-compliance

  tests['borderradius'] = function () {
    //  set_css_all( 'border-radius:10px' );
    return test_props_all('borderRadius', '', function (prop) {
      return contains(prop, 'orderRadius');
    });
  };

  tests['boxshadow'] = function () {
    //  set_css_all( 'box-shadow:#000 1px 1px 3px' );
    return test_props_all('boxShadow');
  };

  // Note: FF3.0 will false positive on this test
  tests['textshadow'] = function () {
    return doc.createElement('div').style.textShadow === '';
  };

  tests['opacity'] = function () {
    // Browsers that actually have CSS Opacity implemented have done so
    //  according to spec, which means their return values are within the
    //  range of [0.0,1.0] - including the leading zero.

    set_css_all('opacity:.5');

    return contains(m_style.opacity, '0.5');
  };

  tests['cssanimations'] = function () {
    //  set_css_all( 'animation:"animate" 2s ease 2', 'position:relative' );
    return test_props_all('animationName');
  };

  tests['csscolumns'] = function () {
    //  set_css_all( 'column-count:3' );
    return test_props_all('columnCount');
  };

  tests['cssgradients'] = function () {
    /**
     * For CSS Gradients syntax, please see:
     * https://webkit.org/blog/175/introducing-css-gradients/
     * https://developer.mozilla.org/en/CSS/-moz-linear-gradient
     * https://developer.mozilla.org/en/CSS/-moz-radial-gradient
     * https://dev.w3.org/csswg/css3-images/#gradients-
     */

    var str1 = 'background-image:',
      str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
      str3 = 'linear-gradient(left top,#9f9, white);';

    set_css((str1 + prefixes.join(str2 + str1) + prefixes.join(str3 + str1)).slice(0, -str1.length));

    return contains(m_style.backgroundImage, 'gradient');
  };

  tests['cssreflections'] = function () {
    //  set_css_all( 'box-reflect:right 1px' );
    return test_props_all('boxReflect');
  };

  tests['csstransforms'] = function () {
    //  set_css_all( 'transform:rotate(3deg)' );
    return !!test_props(['transformProperty', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform']);
  };

  tests['csstransforms3d'] = function () {
    //  set_css_all( 'perspective:500' );

    var ret = !!test_props(['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective']);

    // Webkit’s 3D transforms are passed off to the browser's own graphics renderer.
    //   It works fine in Safari on Leopard and Snow Leopard, but not in Chrome (yet?).
    //   As a result, Webkit typically recognizes the syntax but will sometimes throw a false
    //   positive, thus we must do a more thorough check:
    if (ret) {
      // Webkit allows this media query to succeed only if the feature is enabled.
      // "@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-ms-transform-3d),(-webkit-transform-3d),(modernizr){ ... }"
      ret = testMediaQuery('@media (' + prefixes.join('transform-3d),(') + 'modernizr)');
    }
    return ret;
  };

  tests['csstransitions'] = function () {
    //  set_css_all( 'transition:all .5s linear' );
    return test_props_all('transitionProperty');
  };

  // @font-face detection routine by Diego Perini
  // https://javascript.nwbox.com/CSSSupport/
  tests['fontface'] = function () {
    var sheet,
      head = doc.head || doc.getElementsByTagName('head')[0] || docElement,
      style = doc.createElement('style'),
      impl = doc.implementation || {
        hasFeature: function () {
          return false;
        },
      };

    style.type = 'text/css';
    head.insertBefore(style, head.firstChild);
    sheet = style.sheet || style.styleSheet;

    // removing it crashes IE browsers
    //head.removeChild(style);

    var supportAtRule = impl.hasFeature('CSS2', '')
      ? function (rule) {
          if (!(sheet && rule)) return false;
          var result = false;
          try {
            sheet.insertRule(rule, 0);
            result = !/unknown/i.test(sheet.cssRules[0].cssText);
            sheet.deleteRule(sheet.cssRules.length - 1);
          } catch (e) {}
          return result;
        }
      : function (rule) {
          if (!(sheet && rule)) return false;
          sheet.cssText = rule;

          return sheet.cssText.length !== 0 && !/unknown/i.test(sheet.cssText) && sheet.cssText.replace(/\r+|\n+/g, '').indexOf(rule.split(' ')[0]) === 0;
        };

    // DEPRECATED - allow for a callback
    ret._fontfaceready = function (fn) {
      fn(ret.fontface);
    };

    return supportAtRule('@font-face { font-family: "font"; src: "font.ttf"; }');
  };

  // These tests evaluate support of the video/audio elements, as well as
  // testing what types of content they support.
  //
  // We're using the Boolean constructor here, so that we can extend the value
  // e.g.  Modernizr.video     // true
  //       Modernizr.video.ogg // 'probably'
  //
  // Codec values from : https://github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L845
  //                     thx to NielsLeenheer and zcorpan

  // Note: in FF 3.5.1 and 3.5.0, "no" was a return value instead of empty string.
  //   Modernizr does not normalize for that.

  tests['video'] = function () {
    var elem = doc.createElement('video'),
      bool = !!elem.canPlayType;

    if (bool) {
      bool = new Boolean(bool);
      bool.ogg = elem.canPlayType('video/ogg; codecs="theora"');

      // Workaround required for IE9, which doesn't report video support without audio codec specified.
      //   bug 599718 @ msft connect
      var h264 = 'video/mp4; codecs="avc1.42E01E';
      bool.h264 = elem.canPlayType(h264 + '"') || elem.canPlayType(h264 + ', mp4a.40.2"');

      bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"');
    }
    return bool;
  };

  tests['audio'] = function () {
    var elem = doc.createElement('audio'),
      bool = !!elem.canPlayType;

    if (bool) {
      bool = new Boolean(bool);
      bool.ogg = elem.canPlayType('audio/ogg; codecs="vorbis"');
      bool.mp3 = elem.canPlayType('audio/mpeg;');

      // Mimetypes accepted:
      //   https://developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
      //   https://bit.ly/iphoneoscodecs
      bool.wav = elem.canPlayType('audio/wav; codecs="1"');
      bool.m4a = elem.canPlayType('audio/x-m4a;') || elem.canPlayType('audio/aac;');
    }
    return bool;
  };

  // Both localStorage and sessionStorage are
  //   tested via the `in` operator because otherwise Firefox will
  //   throw an error: https://bugzilla.mozilla.org/show_bug.cgi?id=365772
  //   if cookies are disabled

  // They require try/catch because of possible firefox configuration:
  //   https://github.com/Modernizr/Modernizr/issues#issue/92

  // FWIW miller device resolves to [object Storage] in all supporting browsers
  //   except for IE who does [object Object]

  // IE8 Compat mode supports these features completely:
  //   https://www.quirksmode.org/dom/html5.html

  tests['localstorage'] = function () {
    try {
      return 'localStorage' in window && window.localStorage !== null;
    } catch (e) {
      return false;
    }
  };

  tests['sessionstorage'] = function () {
    try {
      return 'sessionStorage' in window && window.sessionStorage !== null;
    } catch (e) {
      return false;
    }
  };

  tests['webWorkers'] = function () {
    return !!window.Worker;
  };

  tests['applicationcache'] = function () {
    return !!window.applicationCache;
  };

  // Thanks to Erik Dahlstrom
  tests['svg'] = function () {
    return !!doc.createElementNS && !!doc.createElementNS(ns.svg, 'svg').createSVGRect;
  };

  tests['inlinesvg'] = function () {
    var div = document.createElement('div');
    div.innerHTML = '<svg/>';
    return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
  };

  // Thanks to F1lt3r and lucideer
  // https://github.com/Modernizr/Modernizr/issues#issue/35
  tests['smil'] = function () {
    return !!doc.createElementNS && /SVG/.test(tostring.call(doc.createElementNS(ns.svg, 'animate')));
  };

  tests['svgclippaths'] = function () {
    // Possibly returns a false positive in Safari 3.2?
    return !!doc.createElementNS && /SVG/.test(tostring.call(doc.createElementNS(ns.svg, 'clipPath')));
  };

  // input features and input types go directly onto the ret object, bypassing the tests loop.
  // Hold this guy to execute in a moment.
  function webforms() {
    // Run through HTML5's new input attributes to see if the UA understands any.
    // We're using f which is the <input> element created early on
    // Mike Taylr has created a comprehensive resource for testing these attributes
    //   when applied to all input types:
    //   https://miketaylr.com/code/input-type-attr.html
    // spec: https://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary
    ret['input'] = (function (props) {
      for (var i = 0, len = props.length; i < len; i++) {
        attrs[props[i]] = !!(props[i] in f);
      }
      return attrs;
    })('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));

    // Run through HTML5's new input types to see if the UA understands any.
    //   This is put behind the tests runloop because it doesn't return a
    //   true/false like all the other tests; instead, it returns an object
    //   containing each input type with its corresponding true/false value

    // Big thanks to @miketaylr for the html5 forms expertise. https://miketaylr.com/
    ret['inputtypes'] = (function (props) {
      for (var i = 0, bool, len = props.length; i < len; i++) {
        f.setAttribute('type', props[i]);
        bool = f.type !== 'text';

        // Chrome likes to falsely purport support, so we feed it a textual value;
        // if that doesnt succeed then we know there's a custom UI
        if (bool) {
          f.value = smile;

          if (/^range$/.test(f.type) && f.style.WebkitAppearance !== undefined) {
            docElement.appendChild(f);
            var defaultView = doc.defaultView;

            // Safari 2-4 allows the smiley as a value, despite making a slider
            bool =
              defaultView.getComputedStyle &&
              defaultView.getComputedStyle(f, null).WebkitAppearance !== 'textfield' &&
              // Mobile android web browser has false positive, so must
              // check the height to see if the widget is actually there.
              f.offsetHeight !== 0;

            docElement.removeChild(f);
          } else if (/^(search|tel)$/.test(f.type)) {
            // Spec doesnt define any special parsing or detectable UI
            //   behaviors so we pass these through as true
            // Interestingly, opera fails the earlier test, so it doesn't
            //  even make it here.
          } else if (/^(url|email)$/.test(f.type)) {
            // Real url and email support comes with prebaked validation.
            bool = f.checkValidity && f.checkValidity() === false;
          } else {
            // If the upgraded input compontent rejects the :) text, we got a winner
            bool = f.value != smile;
          }
        }

        inputs[props[i]] = !!bool;
      }
      return inputs;
    })('search tel url email datetime date month week time datetime-local number range color'.split(' '));
  }

  // End of test definitions

  // Run through all tests and detect their support in the current UA.
  // todo: hypothetically we could be doing an array of tests and use a basic loop here.
  for (var feature in tests) {
    if (hasOwnProperty(tests, feature)) {
      // run the test, throw the return value into the Modernizr,
      //   then based on that boolean, define an appropriate className
      //   and push it into an array of classes we'll join later.
      featurename = feature.toLowerCase();
      ret[featurename] = tests[feature]();

      classes.push((ret[featurename] ? '' : 'no-') + featurename);
    }
  }

  // input tests need to run.
  //if (!ret.input) webforms();

  // Per 1.6: deprecated API is still accesible for now:
  ret.crosswindowmessaging = ret.postmessage;
  ret.historymanagement = ret.history;

  /**
   * Addtest allows the user to define their own feature tests
   * the result will be added onto the Modernizr object,
   * as well as an appropriate className set on the html element
   *
   * @param feature - String naming the feature
   * @param test - Function returning true if feature is supported, false if not
   */
  ret.addTest = function (feature, test) {
    feature = feature.toLowerCase();

    if (ret[feature]) {
      return; // quit if you're trying to overwrite an existing test
    }
    test = !!test();
    docElement.className += ' ' + (test ? '' : 'no-') + feature;
    ret[feature] = test;
    return ret; // allow chaining.
  };

  /**
   * Reset m.style.cssText to nothing to reduce memory footprint.
   */
  set_css('');
  m = f = null;

  // Enable HTML 5 elements for styling in IE.
  // fyi: jscript version does not reflect trident version
  //      therefore ie9 in ie7 mode will still have a jScript v.9
  if (
    enableHTML5 &&
    window.attachEvent &&
    (function () {
      var elem = doc.createElement('div');
      elem.innerHTML = '<elem></elem>';
      return elem.childNodes.length !== 1;
    })()
  ) {
    // iepp v1.6 by @jon_neal : code.google.com/p/ie-print-protector
    (function (f, l) {
      var j = 'abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video',
        n = j.split('|'),
        k = n.length,
        g = new RegExp('<(/*)(' + j + ')', 'gi'),
        h = new RegExp('\\b(' + j + ')\\b(?!.*[;}])', 'gi'),
        m = l.createDocumentFragment(),
        d = l.documentElement,
        i = d.firstChild,
        b = l.createElement('style'),
        e = l.createElement('body');
      b.media = 'all';
      function c(p) {
        var o = -1;
        while (++o < k) {
          p.createElement(n[o]);
        }
      }
      c(l);
      c(m);
      function a(t, s) {
        var r = t.length,
          q = -1,
          o,
          p = [];
        while (++q < r) {
          o = t[q];
          s = o.media || s;
          p.push(a(o.imports, s));
          p.push(o.cssText);
        }
        return p.join('');
      }
      f.attachEvent('onbeforeprint', function () {
        var r = -1;
        while (++r < k) {
          var o = l.getElementsByTagName(n[r]),
            q = o.length,
            p = -1;
          while (++p < q) {
            if (o[p].className.indexOf('iepp_') < 0) {
              o[p].className += ' iepp_' + n[r];
            }
          }
        }
        i.insertBefore(b, i.firstChild);
        b.styleSheet.cssText = a(l.styleSheets, 'all').replace(h, '.iepp_$1');
        m.appendChild(l.body);
        d.appendChild(e);
        e.innerHTML = m.firstChild.innerHTML.replace(g, '<$1bdo');
      });
      f.attachEvent('onafterprint', function () {
        e.innerHTML = '';
        d.removeChild(e);
        i.removeChild(b);
        d.appendChild(m.firstChild);
      });
    })(this, document);
  }

  // Assign private properties to the return object with prefix
  ret._enableHTML5 = enableHTML5;
  ret._version = version;

  // Remove "no-js" class from <html> element, if it exists:
  docElement.className = docElement.className.replace(/\bno-js\b/, '') + ' js';

  // Add the new classes to the <html> element.
  docElement.className += ' ' + classes.join(' ');

  return ret;
})(this, this.document);

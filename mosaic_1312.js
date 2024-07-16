/*

  DONE

  - json structure
  - parses json
  - slides
  - destroys posts out of view
  - creates new html
  - pre-loads images
  - uses some css animations
  - uses js to search json for categories
  - get it to respond to a hash on load
  - don't paginate if it doesnt need to
  - refines by categories
  - slide animation can now work with CSS transitions
  - test touch swipe
  - tested in Firefox 4, 7
  - tested in Safari 5
  - tested in Internet Explorer 9 and 8
  - trapped other potential hook up cases
  - detail pages now show my mosaic

  TO DO

  - BUG: investigate 2px excess in IE8
  - BUG: layout borked in IE7, think its html5shiv

  - opacity transition with JS if no CSS transitions
  - optimize swipe

*/

// first lets remove the webkit event x and y warnings
// https://stackoverflow.com/questions/7825448/webkit-issues-with-event-layerx-and-event-layery
(function () {
  // remove layerX and layerY
  var all = $.event.props,
    len = all.length,
    res = [];
  while (len--) {
    var el = all[len];
    if (el != 'layerX' && el != 'layerY') res.push(el);
  }
  $.event.props = res;
})();

// and now my object!
var mosaic_1312 = (function () {
  var articles_obj = {};
  var storage = {};
  storage.panels = [];
  storage.panels_html = [];
  storage.articles = []; // used for search results
  var current_states = [];
  var total_articles = 0;
  var total_panels = 0;
  var panel_height = $('#m-panel-current').height();
  var can_scroll_prev = false;
  var can_scroll_next = false;
  var preload_all_called = false;
  var is_detail_page = $('#m').hasClass('detail') ? true : false;
  var detail_article_id = is_detail_page ? $('#content > article').attr('id') : '';
  //var image_path = "/wp-content/uploads/";
  var siteURL = window.location.host;
  lastCharacter = siteURL.slice(-1);
  if (lastCharacter == '/') {
    var image_path = `https://${siteURL}wp-content/uploads/`;
  } else {
    var image_path = `https://${siteURL}/wp-content/uploads/`;
  }
  //
  // some switches
  var useCssTransitions = true; // if possible
  var preload_all_images = true; // to test performance
  //
  // if its a mobile or ipad, we're deffo not going to preload everything as we don't want to cram the smaller devices memory
  if (preload_all_images) {
    preload_all_images = $('html').hasClass('mobile') || $('html').hasClass('ipad') ? false : true;
  }

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* captures function calls to the old mosiac function * /
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  var old_functions_called = [];
  var old_function_call = function (funcname, funcargs) {
    func_args = funcargs != undefined ? funcargs : [''];
    //console.log('OLD function "'+funcname+'" called with args: '+func_args.join(","));
    old_functions_called.push({ name: funcname, args: funcargs });
    // calling init when the init call comes from the original script stops IE7 fouling up
    if (funcname == 'init') {
      init();
    }
  };

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* init! */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  var init_attempt_count = 0;

  var init = function () {
    if ($('#m.rebuild').length > 0) {
      // look for the array in the page, declared globally
      if (typeof m_articles_arr != 'undefined') {
        articles_obj = m_articles_arr;
        if (!getHash()) {
          parse_articles(articles_obj);
        } else {
          category_filter.filter(getHash());
        }
      } else {
        // if not, load the json
        init_attempt_count++;
        //$.getJSON("/wp-content/themes/lifeandtimes/json/optimised.json", function(data) {
        //$.getJSON('/wp-admin/admin-ajax.php?action=json', function(data) {
        $.getJSON('/jz_static.json', function (data) {
          articles_obj = data;
          if (!getHash()) {
            parse_articles(articles_obj);
          } else {
            category_filter.filter(getHash());
          }
        }).error(function () {
          if (init_attempt_count < 3) {
            init();
          } else {
            alert("We're sorry! But the data has failed to load. Hit your refresh key and try it again!");
          }
        });
      }
    }
  };

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* shape, probably a cross, stored so it can be updated */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  // a grid of the shape, turn blocks on and off
  var shape_homepage = [
    [1, 0, 1, 1, 1, 1],
    [0, 0, 0, 1, 1, 1],
    [1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
  ];

  var shape_detail = [
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
  ];

  var shape = is_detail_page ? shape_detail : shape_homepage;

  // some helper variables, how many cells are on each panel and how many articles can we put in each panel
  // nb: not the same number, as there are blanked out spaces to show the background image

  var cells_per_panel = shape.join(',').split(',').length;
  var articles_per_panel = count_articles_per_panel();

  function count_articles_per_panel() {
    var count = 0;
    $.each(shape.join(',').split(','), function (index, value) {
      if (value == '1') {
        count++;
      }
    });
    return count;
  }

  // ############ FUTURE! ##
  // Going to update these to be an array of shapes, so that different panels can have different shapes. That would be fly
  // Could even make it random, boo-yah
  //

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* split articles into panels */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  function parse_articles(articles_to_split, search) {
    // first do some house keeping
    total_articles = articles_to_split.length;
    total_panels = Math.ceil(total_articles / articles_per_panel);
    current_states = [total_panels - 1, 0, 1];
    //
    split_articles(articles_to_split);
    insert_html_and_show(search);
  }

  // split the articles up into the panels and generate html
  function split_articles(articles_to_split) {
    //
    // this loop makes enough panels in an object, to put html into
    var panel_count = -1;
    $.each(articles_to_split, function (index, article) {
      if (index % articles_per_panel == 0) {
        panel_count++;
        storage.panels.push([]);
      }
      storage.panels[panel_count].push(article);
    });
    //
    // make the html for each of the panels
    $.each(storage.panels, function (index, panel) {
      var items = [''];
      var counter = 0;
      $.each(shape.join(',').split(','), function (index, value) {
        if (value == '0') {
          items.push(
            '<div class="m-cell m-blank"><a href="/about" title="About Jay-Z" class="p"><span class="u-hidden-visually">Read more about Jay Z </span></a></div>'
          );
        } else {
          if (counter < panel.length) {
            var article = panel[counter];
            var article_type = article.ty ? article.ty.replace(/^\s\s*/, '').replace(/\s\s*$/, '') : '';
            var current_article = is_detail_page && detail_article_id == article.id ? ' current' : '';
            var article_thumb =
              article.th != false && article.th != 'false' && article.th != undefined && article.th != 'undefined' && article.th != '' && article.th != null
                ? image_path + article.th
                : '';
            //
            items.push(
              '<div class="m-cell' +
                current_article +
                '"><a href="' +
                article.h +
                '" class="p p-' +
                article_type +
                '"><img width="154" height="154" data-src="' +
                article_thumb +
                '" alt="Read full article about - ' +
                article.t +
                '"><h2>' +
                article.t +
                '</h2><p class="pubdate">' +
                article.d +
                '</p><footer class="typecat"><span class="type"></span><span class="category">' +
                article.c +
                '</span></footer></a></div>'
            );
          } else {
            items.push('<div class="m-cell m-empty"></div>');
          }
          counter++;
        }
      });
      storage.panels_html.push(items.join(''));
    });
    //
    // Now check to see if the returned results are long enough to need extra panels, fix what can and can't scroll
    if (storage.panels.length == 1) {
      // only one panel, hide things, stop animation happening
      current_states[0] = false;
      current_states[2] = false;
      can_scroll_prev = false;
      can_scroll_next = false;
      $('#mp-right, #mp-left, #m-paginate').hide();
    } else if (storage.panels.length == 2) {
      // 2 panels, lets cheat and copy the 2nd panel to be in the last panels place, so you can get infinate scrolling
      can_scroll_prev = true;
      can_scroll_next = true;
      $('#mp-right, #mp-left, #m-paginate').show();
      storage.panels_html[2] = storage.panels_html[1];
    } else if (storage.panels.length > 2) {
      // more than 2 panels, operate as normal
      can_scroll_prev = true;
      can_scroll_next = true;
      $('#mp-right, #mp-left, #m-paginate').show();
    }
  }

  function insert_html_and_show(search) {
    // we might need to reload new things here, so clear out old stuff
    if (search) {
      $('#m-panel-prev, #m-panel-current, #m-panel-next').removeClass('loaded').addClass('loading').html('');
    }

    // something to put in the prev panel?
    if (current_states[0]) {
      $('#m-panel-prev')
        .addClass('loading')
        .removeClass('loaded')
        .html(storage.panels_html[current_states[0]])
        .show()
        .addClass('panel_' + current_states[0])
        .parent()
        .css('padding-left', '0');
    } else {
      // if not, hide it and sort the spacing out
      $('#m-panel-prev').hide().parent().css('padding-left', '972px');
    }

    // update the current panel
    $('#m-panel-current')
      .addClass('loading')
      .removeClass('loaded')
      .html(storage.panels_html[current_states[1]])
      .show()
      .attr('aria-hidden', 'false')
      .addClass('panel_' + current_states[1]);

    // something to put in the next panel?
    if (current_states[2]) {
      $('#m-panel-next')
        .addClass('loading')
        .removeClass('loaded')
        .html(storage.panels_html[current_states[2]])
        .show()
        .addClass('panel_' + current_states[2]);
    } else {
      $('#m-panel-next').hide();
    }
    // get those images loading!
    // current panel first and then the others
    // uses classes and not the id's as the id's can change on movement
    loadImages('.panel_' + current_states[1], function () {
      loadImages('.panel_' + current_states[2], false);
      loadImages('.panel_' + current_states[0], false);
      // conditionally trigger pre-loading all the images
      if (preload_all_images && !preload_all_called) {
        preload_all_called = true;
        setTimeout(preload_all_images, 4000);
      }
    });

    $('#m.loading').removeClass('loading');
  }

  // ############ FUTURE! ##
  // - If doing the array of shapes, need to adust this function to sort different amounts of articles for each panel
  //

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* preload all the images */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  var preload_all_images = function () {
    //
    // Loads the image panels closet to the start, so like
    // (if there are 22 panels)
    // 0, 22, 1, 21, 2, 20, 3, 29, 4...
    // so the panels furthest away from the start, are loaded last
    // rather than the last panels being loaded last
    //
    var panels_length = storage.panels.length - 1;
    var load_order = [],
      temp_array = [];
    var firstLast = 1;
    //
    for (var i = 0; i <= panels_length; i++) {
      temp_array.push(i);
    }
    //
    for (var i = 0; i <= panels_length; i++) {
      if (firstLast == 0) {
        load_order.push(temp_array.pop());
        firstLast++;
      } else {
        load_order.push(temp_array.shift());
        firstLast--;
      }
    }
    //
    //$.each(storage.panels, function(index,panel){
    for (var i = 0; i <= panels_length; i++) {
      var panel = storage.panels[load_order[i]];
      if (panel) {
        $.each(panel, function (index, article) {
          if (article.th != false && article.th != 'false' && article.th != undefined && article.th != 'undefined' && article.th != '' && article.th != null) {
            var new_image = new Image();
            new_image.src = image_path + article.th;
          }
        });
      }
    }
  };

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* moves the panels */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  var animating = false;
  var slide_amount = $('.m-panel').width();
  var default_left = slide_amount * -1;

  // decides how to animate the panels, sets the new current states, and then initiates moving the slider
  // slide("left",true);
  // slide("right",true);
  function slide(direction, transition) {
    var speed = transition ? 400 : 0;
    if (!animating) {
      animating = true;
      switch (direction) {
        case 'left':
          if (can_scroll_prev) {
            current_states[0] = current_states[1];
            current_states[1] = current_states[2];
            current_states[2] = current_states[2] + 1 < total_panels ? current_states[2] + 1 : 0;
            animateSlider(default_left - slide_amount, speed, direction);
          } else {
            animating = false;
          }
          break;
        case 'right':
          if (can_scroll_next) {
            current_states[2] = current_states[1];
            current_states[1] = current_states[0];
            current_states[0] = current_states[0] - 1 < 0 ? total_panels - 1 : current_states[0] - 1;
            animateSlider(default_left + slide_amount, speed, direction);
          } else {
            animating = false;
          }
          break;
        default:
          break;
      }
    }
  }

  // animates and calls a complete function
  // uses css transitions if it can and if asked to
  function animateSlider(end_point, speed, direction) {
    if (Modernizr.csstransitions && useCssTransitions) {
      if (speed === 0) {
        $('#m-inner')
          .addClass('notransition')
          .css({ left: end_point + 'px' })
          .removeClass('notransition');
        transitionEnd(direction);
      } else {
        $('#m-inner')
          .addClass('csstransition')
          .css({ left: end_point + 'px' });
        setTimeout(function () {
          transitionEnd(direction);
        }, speed + 1);
      }
    } else {
      $('#m-inner').animate(
        {
          left: end_point + 'px',
        },
        speed,
        function () {
          transitionEnd(direction);
        }
      );
    }
  }

  // The slider has finished its slide
  // need to trigger the update function to populate the panels properly
  function transitionEnd(direction) {
    update_panels(direction);
    animating = false;
  }

  // called at the end of animating
  // 1. moves the html around that we want to keep
  // 2. moves the slider back to its default position
  // 3. sticks new html where its needed
  // 4. loads the new images
  function update_panels(direction) {
    switch (direction) {
      case 'left':
        //
        $('#m-panel-prev').remove();
        $('.m-panel:first')
          .attr('id', 'm-panel-prev')
          .next()
          .attr('id', 'm-panel-current')
          .after('<div id="m-panel-next" class="m-panel loading panel_' + current_states[2] + '" />');
        //
        resetPosition();
        //"panel_"+current_states[0]
        $('#m-panel-next').html(storage.panels_html[current_states[2]]);
        loadImages('.panel_' + current_states[2], false);
        break;
      case 'right':
        //
        $('#m-panel-next').remove();
        $('.m-panel:last')
          .attr('id', 'm-panel-next')
          .prev()
          .attr('id', 'm-panel-current')
          .before('<div id="m-panel-prev" class="m-panel loading panel_' + current_states[0] + '" />');
        //
        resetPosition();
        //
        $('#m-panel-prev').html(storage.panels_html[current_states[0]]);
        loadImages('.panel_' + current_states[0], false);
        break;
      default:
        break;
    }
  }

  // Resets the slider back to its start position
  // takes into account turning transitions on and off if needed
  function resetPosition() {
    if (Modernizr.csstransitions && useCssTransitions) {
      $('#m-inner')
        .addClass('notransition')
        .css({ left: default_left + 'px' });
      setTimeout(function () {
        $('#m-inner').removeClass('notransition');
      }, 1);
    } else {
      $('#m-inner').css({ left: default_left + 'px' });
    }
    //
    if ($('#m-panel-current img').length != $('#m-panel-current img[src]').length) {
      $('#m-panel-current').removeClass('loaded').addClass('loading');
      loadImages('#m-panel-current', false);
    } else {
      $('#m-panel-current').addClass('loaded').removeClass('loading');
    }
  }

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* what to do on category search */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  var category_filter = (function () {
    var filter = function (search_term) {
      searchForCategory(search_term);

      if (storage.articles.length > 0) {
        parse_articles(storage.articles, true);
        if (JAYZ.isHP && location.hash) {
          JAYZ.common.scrollTop();
        }
        insert_html_and_show(true);
        $('#nav .current').removeClass('current');
        $('#nav button[data-category=' + search_term + ']').addClass('current');
      } else {
        //console.log("no results");
        return false;
      }
    };

    function searchForCategory(search_term) {
      storage.articles = [];
      storage.panels = [];
      storage.panels_html = [];
      var search_for = search_term.replace(/#/i, '').toUpperCase();
      search_for = search_for == 'ART-DESIGN' ? 'ART &AMP; DESIGN' : search_for;
      search_for = search_for == 'JAYS-I' ? "JAY'S I" : search_for;
      $.each(articles_obj, function (index, article) {
        if (article.c == search_for && search_for != 'ALL') {
          storage.articles.push(article);
        } else if (search_for == 'ALL') {
          storage.articles.push(article);
        }
      });
    }

    return {
      filter: filter,
    };
  })();

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* what to do on site search articles */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  var search_articles = (function () {
    var search = function (search_term) {
      //$.getJSON("/wp-content/themes/lifeandtimes/json/results.json", function(data) {
      $.getJSON('/wp-admin/admin-ajax.php?action=json&s=' + search_term, function (data) {
        //searchForTerm(search_term);
        //searchForIDs(data);
        parse_results(data);

        if (storage.articles.length > 0) {
          parse_articles(storage.articles, true);
          if (JAYZ.isHP && location.hash) {
            JAYZ.common.scrollTop();
          }
          insert_html_and_show(true);
          $('#nav .current').removeClass('current');
        } else {
          //console.log("no results");
          JAYZ.search.emptyResults();
          return false;
        }
      }).error(function () {
        JAYZ.search.emptyResults();
        return false;
      });
    };

    function parse_results(search_results) {
      storage.articles = [];
      storage.panels = [];
      storage.panels_html = [];
      var search_for = search_results.length > 0 ? search_results : false;
      if (search_for) {
        storage.articles = search_results;
      } else {
        return false;
      }
    }

    return {
      search: search,
    };
  })();

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* iPad scroller */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  function touchPaginate() {
    if (Modernizr.touch) {
      var zone = $('.m-wrapper'),
        _this = this;

      zone.bind('touchstart', customTouchStart);

      function customTouchStart(e) {
        if (e.originalEvent.touches.length == 1) {
          var startX = e.originalEvent.touches[0].pageX,
            startY = e.originalEvent.touches[0].pageY,
            deltaX = 0,
            deltaY = 0;

          zone.bind({
            touchmove: customTouchMove,
            touchend: customTouchEnd,
          });

          function customTouchMove(e) {
            updateTouches(e);
          }

          function customTouchEnd() {
            updateTouches(e);
            if (deltaX == 0) {
              slideToMobile();
            } else if (Math.abs(deltaX) > 300) {
              slideToMobile(deltaX < 0 ? 'left' : 'right', deltaX);
            }

            zone.unbind('touchmove touchend');
          }

          function updateTouches(e) {
            var current = e.originalEvent.touches[0];
            deltaX = current.pageX - startX;
            deltaY = current.pageY - startY;
          }

          function slideToMobile(direction, gap) {
            switch (direction) {
              case 'left':
                slide('left', true);
                break;
              case 'right':
                slide('right', true);
                break;

              default:
                break;
            }
          }
        }
      }
    }
  }
  touchPaginate();

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* init clicking navs */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  // set the next and previous panels to be big links to activate the scroller
  $('body').delegate('#m-panel-prev', 'click keypress', function (event) {
    event.preventDefault();
    slide('right', true);
  });
  $('body').delegate('#m-panel-next', 'click keypress', function (event) {
    event.preventDefault();
    slide('left', true);
  });
  // make the links inside of the next and previous penels do nothing
  $('body').delegate('#m-panel-prev a, #m-panel-next a', 'click keypress', function (event) {
    event.preventDefault();
  });
  // set clicking the floating arrow to activate the scroller
  $('body').delegate('#mp-right', 'click keypress', function (event) {
    event.preventDefault();
    slide('left', true);
  });
  $('body').delegate('#mp-left', 'click keypress', function (event) {
    event.preventDefault();
    slide('right', true);
  });
  // the little arrows in the nav bar
  $('#m-paginate').delegate('.prev', 'click keypress', function (event) {
    event.preventDefault();
    slide('right', true);
  });
  $('#m-paginate').delegate('.next', 'click keypress', function (event) {
    event.preventDefault();
    slide('left', true);
  });

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* left / right arrows */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  var leftRightArrows = $('#mp-right, #mp-left');

  $('#m-panel-prev, #m-panel-next').hover(
    function () {
      leftRightArrows.removeClass('hide');
    },
    function () {
      leftRightArrows.addClass('hide');
    }
  );
  leftRightArrows.hover(function (event) {
    leftRightArrows.removeClass('hide');
  });
  $('#m').mousemove(function (event) {
    if (event.pageY < panel_height) {
      leftRightArrows.css('top', event.pageY);
    }
  });

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* init keyboard nav */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  $prev = $('#m-paginate .prev');
  $next = $('#m-paginate .next');

  if (!is_detail_page) {
    $(document).keydown(function (e) {
      switch (e.keyCode) {
        // user pressed "left" arrow
        case 37:
          $prev.addClass('down');
          break;
        // user pressed "right" arrow
        case 39:
          $next.addClass('next-down');
          break;
      }
    });

    $(document).keyup(function (e) {
      switch (e.keyCode) {
        // user pressed "left" arrow
        case 37:
          slide('right', true);
          $prev.removeClass('down');
          break;
        // user pressed "right" arrow
        case 39:
          slide('left', true);
          $next.removeClass('next-down');
          break;
      }
    });
  }

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* loads images in a panel, with a passible anonymous complete function */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  // loadImage("#m-panel-next",function(){ alert("loaded"); });
  // loadImage("#m-panel-prev",false);

  function loadImages(panel, onComplete) {
    // var time = new Date().getTime();
    var $panel = $(panel);
    var images_loaded = 0;
    var images = $panel.find('img');
    var total_images = images.length;
    //var panel_id = $panel.attr("id");
    //
    //console.log(time+" loadImages: "+panel+", "+panel_id);
    //
    images.each(function () {
      var $this = $(this);
      var newImg = new Image();
      var src = $this.attr('src') || $this.attr('data-src');
      src = src != null && src != undefined && src.length > 0 && src != 'null' ? src : 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
      //
      $panel = $(panel); // it may have changed since the initial call
      //panel_id = $panel.attr("id");
      //
      newImg.onload = function () {
        $this.attr('src', src);
        images_loaded++;
        //
        if (images_loaded === total_images) {
          //console.log(time+" loadImages LOADED: "+panel+", "+panel_id);
          $panel.removeClass('loading');
          setTimeout(function () {
            $panel.addClass('loaded');
          }, 500);
          if (onComplete) {
            onComplete.call();
          }
        }
      };
      // this is to force a load in webkit
      newImg.src = src;
      newImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
      newImg.src = src;
    });
  }

  // ############ FUTURE! ##
  // Could transition in the images in some other way other than just "the all fade in". Maybe a swipe or randomly show them, or something.
  //

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* check for hash and return if found */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

  function getHash() {
    var hash = window.location.hash || false;
    return hash;
  }

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* return things */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  return {
    old_function_call: old_function_call,
    category_filter: category_filter,
    search_articles: search_articles,
    init: init,
  };
})();

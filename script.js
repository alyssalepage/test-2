JAYZ = {
  isMobile: false,
  isIE: false,
  isIE6: false,
  isIE7: false,
  isIE8: false,
  isIE9: false,
  isiPad: false,
  getParameters: '',

  htmlbody: $('html,body'),
  container: $('#container'),

  isHP: false,

  /* Turn on/off log messages */
  log: true,

  /* COMMON MODULE */
  common: {
    init: function () {
      //log('JAYZ.common.init()');

      JAYZ.getParameters = getQueryParams(document.location.search);

      JAYZ.isiPad = navigator.userAgent.match(/iPad/i) != null;
      if (JAYZ.isiPad) $('html').addClass('ipad');

      if ($('#m').hasClass('hp')) JAYZ.isHP = true;

      if (Modernizr.touch || JAYZ.isiPad) $('html').addClass('isTouch');

      var html = $('html');
      JAYZ.isIE = html.hasClass('ie') ? true : false;
      JAYZ.isIE6 = html.hasClass('ie6') ? true : false;
      JAYZ.isIE7 = html.hasClass('ie7') ? true : false;
      JAYZ.isIE8 = html.hasClass('ie8') ? true : false;
      JAYZ.isIE9 = html.hasClass('ie9') ? true : false;
      if (JAYZ.isIE9) JAYZ.isIE = false;

      this.hashchange();

      /* Load css styling with js */
      UTIL.fire('cssjs', 'init');

      UTIL.fire('search', 'init');

      UTIL.fire('mosaic', 'init');

      UTIL.fire('signup', 'init');

      UTIL.fire('useractions', 'init');

      UTIL.fire('tweets', 'init');

      UTIL.fire('bingModule', 'init');
    },

    scrollTop: function () {
      JAYZ.htmlbody.animate({ scrollTop: 0 }, 400);
    },

    noexists: function (elem) {
      if (elem.length == 0) return true;
    },

    finalize: function () {
      //log('JAYZ.common.finalize()');
    },

    isMobile: function () {
      var html = $('html');
      if (
        html.hasClass('mobile') ||
        html.hasClass('iphone') ||
        html.hasClass('ipod') ||
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/Windows CE/i) ||
        navigator.userAgent.match(/POCKET PC/i)
      ) {
        html.addClass('mobile');
        return true;
      } else {
        html.removeClass('mobile');
        return false;
      }
    },

    hashchange: function () {
      // Bind an event to window.onhashchange that, when the hash changes, gets the
      // hash and adds the class "selected" to any matching nav link.

      $(window).hashchange(function () {
        var hash = location.hash;

        if (hash.length == 0) return;

        // Set the page title based on the hash.
        //log('The hash is ' + ( hash.replace( /^#/, '' ) || 'blank' ) + '.');

        if (hash) {
          var _hash = hash.replace(/^#/, '');
          if (isNumeric(_hash)) {
          } else if (_hash == 'comments') {
            var othertrigger = $('a.p-comments-link');
            if (othertrigger.length > 0 && othertrigger.hasClass('active')) {
              return;
            }
            $('html,body').animate(
              {
                scrollTop: $('.nav-wrapper').length > 0 ? $('.nav-wrapper').offset().top : 0,
              },
              0,
              function () {
                if (!JAYZ.isIE) JAYZ.container.addClass('op100');
                else JAYZ.container.addClass('visible');
                $('#p-feat').addClass('inview');
              }
            );
          } else {
            //JAYZ.search.loadPage($('#nav').find('a[href='+hash+']'), 1, hash.replace( /^#/, '' ), 'append');
            mosaic_1312.category_filter.filter(hash);
          }
        }
      });

      // Since the event is only triggered when the hash changes, we need to trigger
      // the event now, to handle the hash the page may have loaded with.
      $(window).hashchange();
    },
  },

  /* JS FIXES */
  cssjs: {
    init: function () {
      // MAKE FOOTER STICK TO THE BOTTOM
      //$('#footer').prev().addClass('prefooter');

      /* ie6 fixes */
      if (JAYZ.isIE6)
        $('.m-cell')
          .find('a.p')
          .hover(function () {
            $(this).find('img').toggle();
          });

      if (!(JAYZ.common.isMobile() || JAYZ.isiPad)) {
        /*
				~~~~~~~~~~~~~~~~~~~~~~~ Replaced with CSS transitions

				if (! Modernizr.touch){
					$('body').delegate('.m-panel.current .m-cell:not(.current, .m-cross), #r-inner .m-cell', 'mouseenter', function() {
						var cell = $(this),
							link = cell.children('.p'),
							img = link.children('img'),
							elems = link.children('h2, p, footer');
						link.css('background', '#ffdb76');
						img.stop(true, true).fadeOut(300);
						elems.stop(true, true).fadeIn(300);
					});

					$('body').delegate('.m-panel.current .m-cell:not(.current, .m-cross), #r-inner .m-cell', 'mouseleave', function() {
						var cell = $(this),
							link = cell.children('.p'),
							img = link.children('img'),
							elems = link.children('h2, p, footer');
						elems.stop(true, true).fadeOut(300);
						img.stop(true, true).fadeIn(300);
					});
				}

				$('article.lp').each(function() {
					var lp = $(this),
						klass = 'lp-hover',
						hoverKlass = lp.hasClass('p-audio') ?
										klass + ' lp-audio-hover'
										: lp.hasClass('p-galleries') ?
										 	klass + ' lp-galleries-hover'
											: lp.hasClass('p-video') ?
											 	klass + ' lp-video-hover'
												: klass;

					lp.bind({
						mouseover: function() {
							$(this).addClass(hoverKlass);
						},
						mouseout: function() {
							$(this).removeClass(hoverKlass);
						}
					});
				});

				*/
      }

      // SLIDESHOW
      var c = $('.p-content');
      if (c.length > 0 && c.find('.portfolio-slideshow').length > 0) {
        $('#p-feat').addClass('active');
        $('.slideshow-holder, .portfolio-slideshow, .slideshow-nav').clone().appendTo($('#p-feat'));
        c.find('.portfolio-slideshow, .slideshow-nav, .slideshow-holder').remove();
        if ($('.portfolio-slideshow').children('.slideshow-next').size() == 1) {
          $('.portfolio-slideshow').children().eq(0).find('a').addClass('nolink');
        }
        slideshow();
      }

      // SCROLL FOR DETAIL
      if (!JAYZ.isHP) {
        var c = $('div.p-content');

        /* detect images (included in a p) and paragraphs followed by an image */
        c.children('p').find('img, iframe').parent().addClass('hasmedia').prev('p').addClass('medianext');
        /* filter by video */
        c.children('p').find('iframe').parent().addClass('hasvid');
        /* add last class for direct last paragraph */
        c.children('p:last-child').addClass('last');

        c.children('p')
          .children('br')
          .each(function () {
            $('<span/>').attr('class', 'trick').html('&nbsp;').insertAfter($(this));
          });

        $('html,body').animate(
          {
            scrollTop: $('.nav-wrapper').length > 0 ? $('.nav-wrapper').offset().top : 0,
          },
          0,
          function () {
            if (!JAYZ.isIE) JAYZ.container.addClass('op100');
            else JAYZ.container.addClass('visible');
            $('#p-feat').addClass('inview');
          }
        );
      } else {
        if (!JAYZ.isIE) JAYZ.container.addClass('op100');
        else JAYZ.container.addClass('visible');
      }

      // BIND BACK TO TOP
      $('.backtotop').click(function (e) {
        e.preventDefault();
        JAYZ.common.scrollTop();
      });
    },
  },

  bingModule: {
    placeholder: '',

    init: function () {
      var form = $('.bing-search-container');

      var input = form.find(':text'),
        submit = form.find(':submit'),
        _this = this;

      _this.placeholder = input.attr('placeholder');

      input.bind({
        focus: function (e) {
          if ($(e.target).val() == _this.placeholder) {
            $(e.target).val('');
            form.addClass('searchFor');
          }
        },
        blur: function (e) {
          if ($(e.target).val() == '') {
            $(e.target).val(_this.placeholder);
            form.removeClass('searchFor error');
          }
        },
      });

      submit.bind({
        mouseenter: function () {
          submit.addClass('hover');
        },
        mouseleave: function () {
          submit.removeClass('hover');
        },
      });
    },
  },

  signup: {
    s: $('.signup-wrapper'),
    placeholder: '',
    init: function () {
      var form = $('#signup');

      if (JAYZ.common.noexists(form)) return false;

      //log('JAYZ.signup.init()');

      var input = form.find(':text'),
        submit = form.find(':submit'),
        action = form.attr('action'),
        _this = this;

      _this.placeholder = input.attr('placeholder');

      function isSignupEmpty() {
        if (input.val() == '' || input.val() == _this.placeholder) return true;
        else return false;
      }

      function isSignupCompleted() {
        var valid = true;

        var email = $('#signup_email'),
          emailVal = email.val(),
          emailField = email.parents('.field_holder');
        if (emailVal == '' || !_this.isValidEmail(emailVal)) {
          valid = false;
          emailField.addClass('field_error').attr('aria-invalid', 'true');
        } else {
          emailField.removeClass('field_error').attr('aria-invalid', 'false');
        }

        var firstname = $('#signup_firstname'),
          firstnameVal = firstname.val(),
          firstnameField = firstname.parents('.field_holder');
        if (firstnameVal == '') {
          valid = false;
          firstnameField.addClass('field_error').attr('aria-invalid', 'true');
        } else {
          firstnameField.removeClass('field_error').attr('aria-invalid', 'false');
        }

        var lastname = $('#signup_lastname'),
          lastnameVal = lastname.val(),
          lastnameField = lastname.parents('.field_holder');
        if (lastnameVal == '') {
          valid = false;
          lastnameField.addClass('field_error').attr('aria-invalid', 'true');
        } else {
          lastnameField.removeClass('field_error').attr('aria-invalid', 'false');
        }

        var zip = $('#signup_zipcode'),
          zipVal = zip.val(),
          zipField = zip.parents('.field_holder');
        if (zipVal == '' || !_this.isValidZip(zipVal)) {
          valid = false;
          zipField.addClass('field_error').attr('aria-invalid', 'true');
        } else {
          zipField.removeClass('field_error').attr('aria-invalid', 'false');
        }

        var mm = $('#signup_dateofbirth_month'),
          mmVal = mm.val(),
          mmField = mm.parents('.field_holder');
        if (mmVal == '' || !isNumeric(mmVal)) {
          valid = false;
          mmField.addClass('field_error').attr('aria-invalid', 'true');
        } else {
          mmField.removeClass('field_error').attr('aria-invalid', 'false');
        }

        var dd = $('#signup_dateofbirth_day'),
          ddVal = dd.val(),
          ddField = dd.parents('.field_holder');
        if (ddVal == '' || !isNumeric(ddVal)) {
          valid = false;
          ddField.addClass('field_error').attr('aria-invalid', 'true');
        } else {
          ddField.removeClass('field_error').attr('aria-invalid', 'false');
        }

        var yy = $('#signup_dateofbirth_year'),
          yyVal = yy.val(),
          yyField = yy.parents('.field_holder');
        if (yyVal == '' || !isNumeric(yyVal)) {
          valid = false;
          yyField.addClass('field_error').attr('aria-invalid', 'true');
        } else {
          yyField.removeClass('field_error').attr('aria-invalid', 'false');
        }

        return valid;
      }

      input.bind({
        focus: function (e) {
          if ($(e.target).val() == _this.placeholder) {
            $(e.target).val('');
            form.addClass('searchFor');
          }
        },
        blur: function (e) {
          if ($(e.target).val() == '') {
            $(e.target).val(_this.placeholder);
            form.removeClass('searchFor error');
          }
        },
      });

      submit.bind({
        mouseenter: function () {
          if (!isSignupEmpty()) submit.addClass('hover');
        },
        mouseleave: function () {
          submit.removeClass('hover');
        },
        click: function (e) {
          var emailVal = $('#signup_email').val();
          //alert("email: " + emailVal);

          if (!isSignupCompleted()) {
            e.preventDefault();
            //_this.errorMsg();
          } else {
            //e.preventDefault();
            //var dob = $('#signup_dob');
            //dob.val(''+$('#signup_dateofbirth_month').val()+"/"+$('#signup_dateofbirth_day').val()+"/"+$('#signup_dateofbirth_year').val());
            submit.addClass('submitting');
            _this.successMsg(emailVal);
            //if (emailVal.length > 0 && _this.isValidEmail(emailVal)) {
            //} else {
            //}
          }
        },
      });

      form.submit(function (e) {
        //e.preventDefault();
        //submit.trigger('click');
      });

      this.trigger();

      $('html').delegate('.signup-feedback a', 'click', function (e) {
        e.preventDefault();
        _this.showhide('close');
      });

      this.s.find('.close').click(function (e) {
        e.preventDefault();
        _this.onReset();
      });

      // check for parameters
      if (JAYZ.getParameters['mtmessage'] == undefined) {
      } else {
        var feedback = $('.signup-feedback');
        JAYZ.signup.showhide('open');
        feedback.find('span').html('');
        $('#signup form').fadeOut('fast', function () {
          feedback.fadeIn('fast');
        });
      }
    },

    onReset: function () {
      $('#signup').find(':submit').removeClass('submitting');
      this.s
        .removeClass('s-alert')
        .find('.signup-error')
        .fadeOut('fast', function () {
          $('#email').val('');
          $('#signup').fadeIn('fast').find('#email').focus();
        });
    },

    successMsg: function (email) {
      var feedback = $('.signup-feedback');
      feedback.find('span').html(email);
      //$('#signup form').fadeOut('fast', function() {
      //feedback.fadeIn('fast');
      //});
    },

    errorMsg: function () {
      $('.signup-feedback').hide();
      var error = $('.signup-error'),
        _this = this;
      $('#signup').fadeOut('fast', function () {
        _this.s.addClass('s-alert');
        error.fadeIn('fast');
      });
    },

    clear: function () {
      $('.signup-error').hide();
      this.s.removeClass('s-alert');
      $('.signup-feedback').find('span').html('');
      $('#signup').removeClass('searchFor').find(':text').trigger('blur').val(this.placeholder);
    },

    showhide: function (status) {
      var klass = 's-open',
        speed = 200,
        _this = this,
        h = _this.s.outerHeight(true);

      function show() {
        JAYZ.search.showhide('close');
        $('#container').animate(
          {
            //paddingBottom: h,
          },
          speed
        );
        $('#footer').animate(
          {
            //bottom: h,
          },
          speed
        );
        _this.s.addClass('s-open').animate(
          {
            bottom: 0,
          },
          speed
        );

        JAYZ.htmlbody.animate({ scrollTop: _this.s.offset().top + _this.s.outerHeight(true) }, 200);
      }

      function close() {
        $('#container').animate(
          {
            //paddingBottom: '0',
          },
          speed
        );
        $('#footer').animate(
          {
            //bottom: '0',
          },
          speed
        );
        _this.s.removeClass('s-open').animate(
          {
            //bottom: h * -1,
          },
          speed,
          function () {
            _this.clear();
            $(this).removeClass('s-alert');
            $('#signup').find(':submit').removeClass('submitting');
            $('#signup').show();
            $('.signup-error .signup-feedback').hide();
          }
        );
      }

      switch (status) {
        case 'open':
          if (!this.s.hasClass('s-open')) {
            show();
          }
          break;
        case 'close':
          if (this.s.hasClass('s-open')) {
            close();
          }
          break;
        default:
          if (!this.s.hasClass('s-open')) {
            show();
          } else {
            close();
          }
          break;
      }
    },

    trigger: function () {
      var klass = 's-open',
        tklass = 'signup',
        t = $('.' + tklass),
        _this = this;

      t.click(function (e) {
        e.preventDefault();
        t.attr('aria-expanded') ? t.attr('aria-expanded', 'false') : t.attr('aria-expanded', 'true');
        if (_this.s.is(':animated')) return;
        _this.showhide();
      });
    },

    isValidEmail: function (emailAddress) {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      return pattern.test(emailAddress);
    },

    isValidZip: function (zipCode) {
      var re = /^\d{5}([\-]\d{4})?$/;
      return re.test(zipCode);
    },
  },

  tweets: {
    url: 'https://twitter.com/statuses/user_timeline/lifeandtimes.json?count=3&callback=?',
    init: function () {
      var el = $('#recenttweets'),
        _this = this;

      if (el.length == 0) return false;

      function formatTime(time_value) {
        var date = new Date(time_value.replace(/^\w+ (\w+) (\d+) ([\d:]+) \+0000 (\d+)$/, '$1 $2 $4 $3 UTC'));
        return $.timeago(date);
      }

      $('body').delegate('#recenttweets li', 'mouseover', function () {
        $(this).addClass('tweet-hover');
      });

      $('body').delegate('#recenttweets li', 'mouseout', function () {
        $(this).removeClass('tweet-hover');
      });

      $('#refresh-recenttweets').click(function (e) {
        e.preventDefault();
        var el = $('#recenttweets'),
          list = el.find('ul');
        if (JAYZ.isIE7) recent();
        else
          $(this).slideUp(1, function () {
            recent();
          });
      });

      $('#trigger-recenttweets').click(function (e) {
        e.preventDefault();
        $('#content-recenttweets').slideToggle(250);
        el.toggleClass('expanded');
      });

      function recent(mode) {
        var list = $('#recenttweets').find('ul');
        list.animate(
          {
            opacity: 0.5,
          },
          200
        );
        $.ajax({
          url: _this.url,
          dataType: 'jsonp',
          success: function (twitters) {
            var statusHTML = [];
            for (var i = 0; i < twitters.length; i++) {
              var username = twitters[i].user.screen_name,
                url = 'https://twitter.com/' + username + '/statuses/' + twitters[i].id,
                status = twitters[i].text
                  .replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function (url) {
                    return '<a href="' + url + '">' + url + '</a>';
                  })
                  .replace(/\B@([_a-z0-9]+)/gi, function (reply) {
                    return /*reply.charAt(0)+*/ '<a href="https://twitter.com/' + reply.substring(1) + '">@' + reply.substring(1) + '</a>';
                  })
                  .replace('@Enji16', '<a href="https://twitter.com/#!/search/%23lifeandtimes" target="_blank">#lifeandtimes</span>');
              var klass = i == twitters.length - 1 ? 'last-tweet' : '';
              statusHTML.push(
                '<li id="' +
                  klass +
                  '">' +
                  status +
                  '<span class="tweeted_by"><a href="https://twitter.com/@' +
                  username +
                  '" target="_blank">@' +
                  username +
                  '</a> ' +
                  formatTime(twitters[i].created_at) +
                  '</span></li>'
              );
            }
            if (twitters.length == 0)
              statusHTML.push("<li>No tweets yet from <a href='https://twitter.com/lifeandtimes' target='_blank'>https://twitter.com/lifeandtimes</a></li>");
            $('#refresh-recenttweets').slideDown(1);
            list.html(statusHTML.join('')).animate(
              {
                opacity: 1,
              },
              200
            );
          },
          error: function () {
            list.animate(
              {
                opacity: 1,
              },
              200
            );
          },
        });
      }

      recent();
    },
  },

  /* SEARCH MODULE */
  search: {
    s: $('.s-wrapper'),

    placeholder: '',

    init: function () {
      var form = $('#search');

      if (JAYZ.common.noexists(form)) return false;

      //log('JAYZ.search.init()');

      var input = form.find(':text'),
        submit = form.find(':submit'),
        reset = form.find(':reset'),
        action = form.attr('action'),
        _this = this;

      _this.placeholder = input.attr('placeholder');

      function isSearchEmpty() {
        if (input.val() == '' || input.val() == _this.placeholder) return true;
        else return false;
      }

      input.bind({
        focus: function (e) {
          if ($(e.target).val() == _this.placeholder) {
            $(e.target).val('');
            form.addClass('searchFor');
          }
        },
        blur: function (e) {
          if ($(e.target).val() == '') {
            $(e.target).val(_this.placeholder);
            form.removeClass('searchFor error');
          }
        },
      });

      form.find('.close').click(function (e) {
        e.preventDefault();
        _this.onReset();
      });

      reset.bind({
        mouseenter: function () {
          if (!isSearchEmpty()) reset.addClass('reset-hover');
        },
        mouseleave: function () {
          reset.removeClass('reset-hover');
        },
        click: function (e) {
          e.preventDefault();
          _this.onReset();
        },
      });

      submit.bind({
        mouseenter: function () {
          if (!isSearchEmpty()) submit.addClass('hover');
        },
        mouseleave: function () {
          submit.removeClass('hover');
        },
        click: function (e) {
          e.preventDefault();
          reset.fadeOut(1);
          if (!isSearchEmpty()) {
            submit.addClass('submitting');
            var type = JAYZ.isHP ? 'home' : 'inner';

            if (JAYZ.common.isMobile()) {
              window.location = form.attr('action') + $('#q').val();
            } else {
              submit.removeClass('submitting');
              mosaic_1312.search_articles.search($('#q').val());
            }
          }
        },
      });

      form.submit(function (e) {
        submit.trigger('click');
      });

      this.trigger();
      this.run();
    },

    onReset: function () {
      this.s.removeClass('s-alert').find('.search-feedback').fadeOut('fast');
      this.s.find('.submit').removeClass('submitting').fadeIn('fast');
      this.s.find('#q').val('').fadeIn('fast').focus();
      this.s.find(':reset').fadeOut('fast');
    },

    emptyResults: function () {
      //log('emptyResults');
      var feedback = $('.search-feedback'),
        _this = this;
      this.s.find('input').fadeOut('fast', function () {
        _this.s.addClass('s-alert');
        feedback.fadeIn('fast');
      });
    },

    clear: function () {
      this.s.find('.submit').removeClass('submitting').show();
      $('#search').removeClass('searchFor').find(':text').val('').blur();
      $('.reset').hide();
      $('.search-feedback').hide();
    },

    showhide: function (status) {
      var klass = 's-open',
        speed = 200,
        _this = this;

      function show() {
        JAYZ.common.scrollTop();
        JAYZ.useractions.saveLastCat();
        _this.updateCurrent($('.trig-search'));
        JAYZ.useractions.hasSearched = false;
        JAYZ.signup.showhide('close');
        _this.s.addClass('s-open').slideDown(speed).attr('aria-expanded', 'true');
      }

      function hide() {
        _this.s.removeClass('s-open').slideUp(speed, function () {
          $(this).removeClass('s-alert');
          $(this).find(':text').val(_this.placeholder).fadeIn('fast');
          $(this).find('form').removeClass('searchFor error');
          _this.clear();

          // pulls out last category visited
          if (JAYZ.useractions.hasSearched) {
            JAYZ.useractions.getLastCat().trigger('click');
          } else {
            _this.updateCurrent(JAYZ.useractions.getLastCat());
          }
        });
      }

      switch (status) {
        case 'open':
          if (!this.s.hasClass('s-open')) show();
          break;
        case 'close':
          if (this.s.hasClass('s-open')) hide();
          break;
        default:
          if (!this.s.hasClass('s-open')) {
            show();
          } else {
            hide();
          }
          break;
      }
    },

    trigger: function () {
      var klass = 's-open',
        tklass = 'trig-search',
        t = $('.' + tklass),
        h = 91,
        speed = 300,
        _this = this;

      t.click(function (e) {
        e.preventDefault();
        if (_this.s.is(':animated')) return;
        t.attr('aria-expanded') ? t.attr('aria-expanded', 'false') : t.attr('aria-expanded', 'true');
        _this.showhide();
      });
    },

    updateCurrent: function (elem) {
      $('#nav').children('a.current').removeClass('current');
      elem.addClass('current');
    },

    resizeMosaic: function () {
      if (JAYZ.isHP) {
        $('#m-inner').animate(
          {
            height: $('.m-panel.current').outerHeight(true),
          },
          500
        );
      }
    },

    loadPage: function (clicked, paged, cat, where, mode) {
      var _this = this,
        type = JAYZ.isHP ? 'home' : 'inner',
        url =
          mode && mode == 'search'
            ? '/wp-admin/admin-ajax.php?action=search-posts&s=' + $('#q').val() + '&paged=' + paged + '&type=' + type
            : '/wp-admin/admin-ajax.php?action=mosaic&paged=' + paged + '&category=' + cat + '&type=' + type,
        max = parseInt($('.m-panel.current').attr('data-total'));
      $.ajax({
        type: 'GET',
        url: url /* TODO : update this during integration */,
        dataType: 'html',
        success: function (data, textStatus) {
          if (paged == 1) {
            _this.updateCurrent(clicked);
            $('#m-inner').html(data);
            JAYZ.search.resizeMosaic();
            JAYZ.mosaic.initLayout();
            //JAYZ.img.loader();
            JAYZ.img.loader('onload');
          } else {
            if (where == 'append') {
              $('#m-' + (paged - 1)).after(data);
              // Clone it if it doesn't exist yet
              if ($('#clone-' + paged).length == 0) {
                //log('#clone-'+paged + ' does not exist. Clone it');
                var clone = $('#m-' + paged)
                  .clone()
                  .attr('id', 'clone-' + paged)
                  .removeClass('m-panel-last')
                  .addClass('cloned');
                if ($('#clone-' + (paged - 1)).length > 0) {
                  $('#clone-' + (paged - 1)).after(clone);
                  $('#m-inner').css('left', parseInt($('#m-inner').css('left').replace('px', '')) - JAYZ.mosaic.step);
                } else if ($('#clone-' + (paged + 1)).length > 0) {
                  $('#clone-' + (paged + 1)).before(clone);
                  $('#m-inner').css('left', parseInt($('#m-inner').css('left').replace('px', '')) - JAYZ.mosaic.step);
                } else {
                  $('#m-inner')
                    .prepend(clone)
                    .css('left', parseInt($('#m-inner').css('left').replace('px', '')) - JAYZ.mosaic.step);
                }
              }
            } else {
              var next = paged == max - 1 ? $('#m-' + (paged + 1)) : $('#clone-' + (paged + 1));
              if (next.length > 0) {
                var clone = $(data)
                  .attr('id', 'clone-' + paged)
                  .removeClass('m-panel-last')
                  .addClass('cloned');
                next.before(clone);
                $('#m-inner').css('left', parseInt($('#m-inner').css('left').replace('px', '')) - JAYZ.mosaic.step);
                // if the original m#paged does not exist, clone the cloned
                if ($('#m-' + paged).length == 0) {
                  if (paged == max - 1) {
                    $('#clone-' + max).before(data);
                  } else {
                    $('#m-' + (paged + 1)).before(data);
                  }
                }
              }
            }
            var el = $('#m-inner').children('.invisible');
            JAYZ.img.loader('all', el);
          }

          if (JAYZ.isHP && location.hash) JAYZ.common.scrollTop();
        },
        error: function () {
          //alert("no posts for " + cat);
        },
      });
    },

    run: function () {
      if (JAYZ.common.isMobile()) return;
      var _this = this;
      $('#nav')
        .children('button:not(.trig-search)')
        .click(function (e) {
          // remove this to allow hashchange
          // e.preventDefault();

          /* checkings */
          check();

          /* store current and newcurrent */
          var //current = $('#nav').children('a.current'),
            clicked = $(this);

          if (clicked.hasClass('current')) return false;

          /* store the category */
          var cat = $(this).data('category').replace('#', '');
          window.location.href = $(this).data('category');
          JAYZ.common.scrollTop();

          // commented it cos the hash already calls it
          //_this.loadPage(clicked, 1, cat, 'append');
        });

      function check() {
        $('#m').removeClass('slide'); // just in case
        _this.showhide('close'); // close it just in case
      }
    },
  },

  /* MOSAIC MODULE */
  /* now sends all function calls to the new function object, for testing evaluation */
  mosaic: {
    init: function () {
      mosaic_1312.old_function_call('init');
    },

    touchPaginate: function () {
      mosaic_1312.old_function_call('touchPaginate');
    },

    touchPaginateV2: function () {
      mosaic_1312.old_function_call('touchPaginateV2');
    },

    initEdgesPagination: function () {
      mosaic_1312.old_function_call('initEdgesPagination');
    },

    initLayout: function (mode) {
      mosaic_1312.old_function_call('initEdgesPagination', [mode]);
    },

    setPosition: function (elem, i) {
      mosaic_1312.old_function_call('setPosition', [elem, i]);
    },

    postInitLayout: function () {
      mosaic_1312.old_function_call('postInitLayout');
    },

    addPage: function (elem) {
      mosaic_1312.old_function_call('addPage', [elem]);
    },

    initPaginate: function () {
      mosaic_1312.old_function_call('initPaginate');
    },

    checkPages: function (mode) {
      mosaic_1312.old_function_call('checkPages', [mode]);
    },

    updatePaginate: function (round) {
      mosaic_1312.old_function_call('updatePaginate', [round]);
    },

    slide: function (direction, transition, force, target) {
      mosaic_1312.old_function_call('updatePaginate', [direction, transition, force, target]);
    },

    initKeyNav: function () {
      mosaic_1312.old_function_call('initKeyNav');
    },

    isInView: function () {
      mosaic_1312.old_function_call('isInView');
    },

    featInView: function () {
      mosaic_1312.old_function_call('featInView');
    },

    inViewScrolling: function () {
      mosaic_1312.old_function_call('inViewScrolling');
    },

    cross: function () {
      mosaic_1312.old_function_call('cross');
    },
  },

  useractions: {
    hasSearched: false,
    lastCat: '',

    init: function () {
      if (JAYZ.common.noexists($('#m'))) return false;
      //log('JAYZ.useractions.init()');

      this.saveLastCat();
    },

    saveLastCat: function () {
      this.lastCat = $('#nav').children('button.current');
    },

    getLastCat: function () {
      return this.lastCat;
    },
  },

  img: {
    loader: function (order, which) {
      var opFULL = 1,
        opHALF = 0.5;

      if (Modernizr.touch) opHALF = opFULL;

      var images =
        order == 'onload' || order == 'search'
          ? $('.m-panel.current').find('.m-cell').find('img')
          : which
          ? which.removeClass('invisible').find('.m-cell').find('img')
          : $('.m-panel').find('.m-cell').find('img');
      imagesNb = images.length;

      if (imagesNb == 0) return false;

      //log('JAYZ.img.loader()');

      function loadImage(which, index) {
        var images = which.find('img'),
          max = images.length;
        if (index < max) {
          images.eq(index).onImagesLoaded(function (_this) {
            var img = $(_this),
              post = img.parent(),
              op = opHALF;
            if (img.parents('.m-panel').hasClass('current')) {
              op = opFULL;
            }

            post.stop().animate(
              {
                opacity: op,
              },
              150,
              function () {
                // load next image
                loadImage(which, index + 1);
              }
            );
          });
        }
      }

      function loadImageOnSearch(index, max) {
        if (index < max) {
          var which = $('.m-panel.current');
          images.eq(index).onImagesLoaded(function (_this) {
            var img = $(_this),
              post = img.parent(),
              op = opHALF;
            if (img.parents('.m-panel').hasClass('current')) {
              op = opFULL;
            }

            post.stop().animate(
              {
                opacity: op,
              },
              150,
              function () {
                if (index == max - 1) {
                  if (which.next().length > 0) loadImage(which.next(), 0);
                  if (which.prev().length > 0) loadImage(which.prev(), 0);
                  if (which.next().nextAll().length > 0) {
                    loadImage(which.next().nextAll(), 0);
                  }
                  if (which.next().prevAll().length > 0) {
                    loadImage(which.next().prevAll(), 0);
                  }
                }
                // load next image
                loadImageOnSearch(index + 1, max);
              }
            );
          });
        }
      }

      function loadImages() {
        $('#m').addClass('onload');
        images.onImagesLoaded(function (_this) {
          var img = $(_this),
            post = img.parent(),
            op = opHALF,
            webkit_op = 'op60',
            speed = 400;
          if (img.parents('.m-panel').hasClass('current')) {
            op = opFULL;
            webkit_op = 'op100';
            speed = 400;
          }
          // if (Modernizr.csstransitions) {
          // 	post.addClass(webkit_op);
          // } else {
          post.stop().animate(
            {
              opacity: op,
            },
            speed,
            function () {}
          );
          which.find('.m-cross').find('.p').stop().animate(
            {
              opacity: op,
            },
            speed
          );
          //}
        });
      }

      function loadImagesOnLoad() {
        $('#m').addClass('onload');
        var speed = 400;
        current = $('.m-panel.current');
        images.onImagesLoaded(function (_this) {
          $(_this).parent('.p').stop().animate(
            {
              opacity: opFULL,
            },
            speed
          );
        });
        current
          .find('.p')
          .stop()
          .animate(
            {
              opacity: opFULL,
            },
            speed,
            function () {
              //_loadImagesOnLoad($('.m-panel.current').prev(), 'half');
              //_loadImagesOnLoad($('.m-panel.current').next(), 'half');
            }
          );
        var t = setTimeout(function () {
          // m1312 - ticket #97
          current = $('.m-panel.current');
          //
          current.next().find('.p').animate(
            {
              opacity: opHALF,
            },
            speed
          );
          current.prev().find('.p').animate(
            {
              opacity: opHALF,
            },
            1300
          );
        }, 1200);
      }

      function _loadImagesOnLoad(elem, style) {
        var images = elem.find('img'),
          opacity = style == 'full' ? opFULL : opHALF,
          speed = style == 'full' ? 400 : 1500;
        images.onImagesLoaded(function (_this) {
          $(_this).parent('.p').stop().animate(
            {
              opacity: opacity,
            },
            speed
          );
        });
        elem
          .find('.m-cross')
          .find('.p')
          .stop()
          .animate(
            {
              opacity: opacity,
            },
            speed,
            function () {
              if (elem.css('background') != '#000')
                elem.css({
                  background: '#000',
                });
            }
          );
      }

      switch (order) {
        case 'onload':
          loadImagesOnLoad();
          break;
        case 'search':
          loadImageOnSearch(0, imagesNb);
          break;
        case 'all':
          loadImages();
          break;
        default:
          loadImage(0, imagesNb);
          break;
      }

      /* Check if the mosaic contains the current post and if so highlights it */
      if ($('body').hasClass('single single-post'))
        $('.p[rel=' + $('article').attr('id') + ']')
          .parent('.m-cell')
          .addClass('current');

      JAYZ.mosaic.cross();
    },
  },

  comments: {
    init: function () {
      var disqus = $('#disqus_thread');
      if (disqus.length == 0) return false;

      //log('JAYZ.comments.init()');

      var nbcomments = $('#dsq-num-posts'),
        nbcommentsVal = parseInt(nbcomments.text()),
        text = nbcommentsVal > 1 ? 'Comments' : 'Comment';
      if (nbcomments.length > 0 && nbcommentsVal == 0) {
        disqus.addClass('empty');
      } else if (nbcomments.length > 0 && nbcommentsVal != 0) {
        $('.p-comments-link')
          .html(nbcommentsVal + ' ' + text)
          .css('display', 'block');
        disqus.removeClass('empty');
        if (nbcommentsVal == 1) {
          var t = disqus.find('h3').html();
          if (t != null && t != undefined) {
            t = t.replace('comments', 'comment');
            disqus.find('h3').html(t);
          }
        }
      }

      $('a.p-comments-link').click(function (e) {
        var self = $(this);
        if ($('#dsq-comments').length > 0 && $('#dsq-comments').children().size() > 0) {
          self.addClass('active');
          JAYZ.htmlbody.animate({ scrollTop: disqus.offset().top - 10 }, 300, function () {
            self.removeClass('active');
          });
        }
      });

      $('.dsq-comment-hide-thread').remove();
    },
  },
};

/* Create a closure to maintain scope of the '$' and remain compatible with other frameworks.  */
(function ($) {
  //same as $(document).ready();
  $(function () {
    UTIL.loadEvents();
  });

  $(window).bind('load', function () {
    JAYZ.img.loader('onload');
  });
})(window.jQuery);

/* https://paulirish.com/2009/markup-based-unobtrusive-comprehensive-dom-ready-execution/ */
UTIL = {
  fire: function (func, funcname, args) {
    var namespace = JAYZ; // indicate your obj literal namespace here

    funcname = funcname === undefined ? 'init' : funcname;
    if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function') {
      namespace[func][funcname](args);
    }
  },

  loadEvents: function () {
    var bodyId = document.body.id;

    // hit up common first.
    UTIL.fire('common');

    // do all the classes too.
    $.each(document.body.className.split(/\s+/), function (i, classnm) {
      UTIL.fire(classnm);
      UTIL.fire(classnm, bodyId);
    });

    UTIL.fire('common', 'finalize');
  },
};

/* External/homemade plugins
–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––*/
/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * https://benalman.com/projects/jquery-hashchange-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * https://benalman.com/about/license/
 */
(function ($, e, b) {
  var c = 'hashchange',
    h = document,
    f,
    g = $.event.special,
    i = h.documentMode,
    d = 'on' + c in e && (i === b || i > 7);
  function a(j) {
    j = j || location.href;
    return '#' + j.replace(/^[^#]*#?(.*)$/, '$1');
  }
  $.fn[c] = function (j) {
    return j ? this.bind(c, j) : this.trigger(c);
  };
  $.fn[c].delay = 50;
  g[c] = $.extend(g[c], {
    setup: function () {
      if (d) {
        return false;
      }
      $(f.start);
    },
    teardown: function () {
      if (d) {
        return false;
      }
      $(f.stop);
    },
  });
  f = (function () {
    var j = {},
      p,
      m = a(),
      k = function (q) {
        return q;
      },
      l = k,
      o = k;
    j.start = function () {
      p || n();
    };
    j.stop = function () {
      p && clearTimeout(p);
      p = b;
    };
    function n() {
      var r = a(),
        q = o(m);
      if (r !== m) {
        l((m = r), q);
        $(e).trigger(c);
      } else {
        if (q !== m) {
          location.href = location.href.replace(/#.*/, '') + q;
        }
      }
      p = setTimeout(n, $.fn[c].delay);
    }
    $.browser.msie &&
      !d &&
      (function () {
        var q, r;
        j.start = function () {
          if (!q) {
            r = $.fn[c].src;
            r = r && r + a();
            q = $('<iframe tabindex="-1" title="empty"/>')
              .hide()
              .one('load', function () {
                r || l(a());
                n();
              })
              .attr('src', r || 'javascript:0')
              .insertAfter('body')[0].contentWindow;
            h.onpropertychange = function () {
              try {
                if (event.propertyName === 'title') {
                  q.document.title = h.title;
                }
              } catch (s) {}
            };
          }
        };
        j.stop = k;
        o = function () {
          return a(q.location.href);
        };
        l = function (v, s) {
          var u = q.document,
            t = $.fn[c].domain;
          if (v !== s) {
            u.title = h.title;
            u.open();
            t && u.write('<script>document.domain="' + t + '"</script>');
            u.close();
            q.location.hash = v;
          }
        };
      })();
    return j;
  })();
})(jQuery, this);

/*
 * timeago: a jQuery plugin, version: 0.9.2 (2010-09-14)
 * @requires jQuery v1.2.3 or later
 *
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * For usage and examples, visit:
 * https://timeago.yarp.com/
 *
 * Licensed under the MIT:
 * https://www.opensource.org/licenses/mit-license.php
 *
 * Copyright (c) 2008-2010, Ryan McGeary (ryanonjavascript -[at]- mcgeary [*dot*] org)
 */
(function ($) {
  $.timeago = function (timestamp) {
    if (timestamp instanceof Date) return inWords(timestamp);
    else if (typeof timestamp == 'string') return inWords($.timeago.parse(timestamp));
    else return inWords($.timeago.datetime(timestamp));
  };
  var $t = $.timeago;

  $.extend($.timeago, {
    settings: {
      refreshMillis: 60000,
      allowFuture: false,
      strings: {
        prefixAgo: null,
        prefixFromNow: null,
        suffixAgo: 'ago',
        suffixFromNow: 'from now',
        seconds: 'less than a minute',
        minute: 'about a minute',
        minutes: '%d minutes',
        hour: 'about an hour',
        hours: 'about %d hours',
        day: 'a day',
        days: '%d days',
        month: 'about a month',
        months: '%d months',
        year: 'about a year',
        years: '%d years',
        numbers: [],
      },
    },
    inWords: function (distanceMillis) {
      var $l = this.settings.strings;
      var prefix = $l.prefixAgo;
      var suffix = $l.suffixAgo;
      if (this.settings.allowFuture) {
        if (distanceMillis < 0) {
          prefix = $l.prefixFromNow;
          suffix = $l.suffixFromNow;
        }
        distanceMillis = Math.abs(distanceMillis);
      }

      var seconds = distanceMillis / 1000;
      var minutes = seconds / 60;
      var hours = minutes / 60;
      var days = hours / 24;
      var years = days / 365;

      function substitute(stringOrFunction, number) {
        var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
        var value = ($l.numbers && $l.numbers[number]) || number;
        return string.replace(/%d/i, value);
      }

      var words =
        (seconds < 45 && substitute($l.seconds, Math.round(seconds))) ||
        (seconds < 90 && substitute($l.minute, 1)) ||
        (minutes < 45 && substitute($l.minutes, Math.round(minutes))) ||
        (minutes < 90 && substitute($l.hour, 1)) ||
        (hours < 24 && substitute($l.hours, Math.round(hours))) ||
        (hours < 48 && substitute($l.day, 1)) ||
        (days < 30 && substitute($l.days, Math.floor(days))) ||
        (days < 60 && substitute($l.month, 1)) ||
        (days < 365 && substitute($l.months, Math.floor(days / 30))) ||
        (years < 2 && substitute($l.year, 1)) ||
        substitute($l.years, Math.floor(years));

      return $.trim([prefix, words, suffix].join(' '));
    },
    parse: function (iso8601) {
      var s = $.trim(iso8601);
      s = s.replace(/\.\d\d\d+/, ''); // remove milliseconds
      s = s.replace(/-/, '/').replace(/-/, '/');
      s = s.replace(/T/, ' ').replace(/Z/, ' UTC');
      s = s.replace(/([\+-]\d\d)\:?(\d\d)/, ' $1$2'); // -04:00 -> -0400
      return new Date(s);
    },
    datetime: function (elem) {
      // jQuery's `is()` doesn't play well with HTML5 in IE
      var isTime = $(elem).get(0).tagName.toLowerCase() == 'time'; // $(elem).is("time");
      var iso8601 = isTime ? $(elem).attr('datetime') : $(elem).attr('title');
      return $t.parse(iso8601);
    },
  });

  $.fn.timeago = function () {
    var self = this;
    self.each(refresh);

    var $s = $t.settings;
    if ($s.refreshMillis > 0) {
      setInterval(function () {
        self.each(refresh);
      }, $s.refreshMillis);
    }
    return self;
  };

  function refresh() {
    var data = prepareData(this);
    if (!isNaN(data.datetime)) {
      $(this).text(inWords(data.datetime));
    }
    return this;
  }

  function prepareData(element) {
    element = $(element);
    if (!element.data('timeago')) {
      element.data('timeago', { datetime: $t.datetime(element) });
      var text = $.trim(element.text());
      if (text.length > 0) element.attr('title', text);
    }
    return element.data('timeago');
  }

  function inWords(date) {
    return $t.inWords(distance(date));
  }

  function distance(date) {
    return new Date().getTime() - date.getTime();
  }

  // fix for IE6 suckage
  document.createElement('abbr');
  document.createElement('time');

  if ($('#bvc-target').length) {
    var keywords = $('#bvc-target').attr('rel');
    //console.log(keywords);

    var apikey = '887D3537AAC1434A652B0AF1A6444AAC1426CDDC';
    var url =
      'https://api.bing.net/json.aspx?AppId=' +
      apikey +
      '&Version=2.2&Market=en-US&Query=' +
      keywords +
      '&Sources=video&Video.Count=3&JsonType=callback&JsonCallback=?';
    $.getJSON(url, function (data) {
      //console.log(data);
      count = 0;
      $.each(data.SearchResponse.Video.Results, function (i, item) {
        if (count < 3) {
          cssClass = '';
          if (count == 2) {
            cssClass = 'last';
          }

          url = 'https://clk.atdmt.com/MRT/go/339583569/direct;wi.1;hi.1/01/';
          url = url + item.ClickThroughPageUrl.substring(33);

          $('#bvc-target').prepend(
            '<a target="_blank" class="' +
              cssClass +
              '" href="' +
              url +
              '"><div class="bing-video-poster"><img src="' +
              item.StaticThumbnail.Url +
              '" width="185" height="138" /><span class="bing-video-playicon"></span></div><div class="bing-video-title"><span class="bing-video-source">' +
              item.SourceTitle +
              '</span>' +
              item.Title.truncate(22) +
              '</div></a>'
          );
        }
        count++;
      });
    });
  }
})(jQuery);

jQuery.fn.delay = function (time, callback) {
  jQuery.fx.step.delay = function () {};
  return this.animate({ delay: 1 }, time, callback);
};

jQuery.fn.onImagesLoaded = function (_cb) {
  return this.each(function () {
    var $imgs = this.tagName.toLowerCase() === 'img' ? $(this) : $('img', this),
      _cont = this,
      i = 0,
      _done = function () {
        if (typeof _cb === 'function') _cb(_cont);
      };

    if ($imgs.length) {
      $imgs.each(function () {
        var _img = this,
          _checki = function (e) {
            if (_img.complete || (_img.readyState == 'complete' && e.type == 'readystatechange')) {
              if (++i === $imgs.length) _done();
            } else if (_img.readyState === undefined) {
              // dont for IE
              $(_img).attr('src', $(_img).attr('src')); // re-fire load event
            }
          }; // _checki \\

        $(_img).bind('load readystatechange', function (e) {
          _checki(e);
        });
        _checki({ type: 'readystatechange' }); // bind to 'load' event...
      });
    } else _done();
  });
};

var addthis_share = {
  templates: { twitter: '{{title}} {{url}} via @lifeandtimes' },
};

String.prototype.truncate = function (length) {
  if (this.length > length) {
    return this.slice(0, length - 1) + '&hellip;';
  } else {
    return this;
  }
};

// usage: log('inside coolFunc',this,arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
log = function () {
  if (!JAYZ.log) return false;
  log.history = log.history || [];
  log.history.push(arguments);
  if (this.console) {
    console.log(Array.prototype.slice.call(arguments));
  }
};

function getQueryParams(qs) {
  qs = qs.split('+').join(' ');
  var params = {},
    tokens,
    re = /[?&]?([^=]+)=([^&]*)/g;

  while ((tokens = re.exec(qs))) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }

  return params;
}

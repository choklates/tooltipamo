var tooltipamo = (function ($) {
  var $tooltip, $tooltipHosts, $win,
    settings;

  function init(options) {
    _createTooltip();
    _setupElements(options);
    _setupEventHandlers();
  }

  function _setupElements(options) {
    settings = $.extend({
      classy: true
    }, options);
    $tooltip = $('.tooltipamo');
    if (settings.classy) {
      // requires .js-tooltipamo and data-tip for tooltipamo to work
      $tooltipHosts = $('.js-tooltipamo');
    } else {
      // requires only data-tip for tooltipamo to work
      $tooltipHosts = $('[data-tip]');
    }
    $win = $(window);
  }

  function _setupEventHandlers() {
    var offset, tooltip, win, text;

    // offsets so tooltip isn't too close to cursor
    offset = {};
    offset.x = 15;
    offset.y = 5;

    tooltip = {};
    tooltip.width = $tooltip.outerWidth(true);

    win = {};

    $win.on('load resize', function () {
      win.width = $win.width();
      win.height = $win.height();
      win.top = 0;
    }).on('scroll', function () {
      win.top = $win.scrollTop();
    });

    $tooltipHosts.on('mouseenter', function () {
      text = $(this).data('tip');
      tooltip.height = $tooltip.outerHeight(true);
      $tooltip.addClass('is-active')
        .find('span').text(text);
    }).on('mouseleave', function () {
      $tooltip.removeClass('is-active');
    });

    $tooltipHosts.add('.tooltipamo').on('mousemove', function (e) {
      tooltip.top = e.pageY + offset.y;
      tooltip.left = e.pageX + offset.x;

      // if tooltip is out of the window, shift its position
      if (tooltip.top + tooltip.height > win.height + win.top) {
        tooltip.top -= (tooltip.height + offset.y * 2);
      }
      if (tooltip.left + tooltip.width > win.width) {
        tooltip.left -= (tooltip.width + offset.x * 2);
      }

      $tooltip.css({
        top: tooltip.top,
        left: tooltip.left
      });
    });
  }

  function _createTooltip() {
    $('body').append('<div class="tooltipamo"><span></span></div>');
  }

  return {
    init: init
  };
})(jQuery);

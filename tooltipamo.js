var tooltipamo = (function ($) {
  var $tooltip, $tooltipHosts, $win;

  function init() {
    _createTooltip();
    _setupElements();
    _setupEventHandlers();
  }

  function _setupElements() {
    $tooltip = $('.tooltipamo');
    $tooltipHosts = $('.js-tooltipamo');
    $win = $(window);
  }

  function _setupEventHandlers() {
    var text, offset, win, tooltip;

    offset = {};
    offset.x = 15;
    offset.y = 5;

    win = {};

    tooltip = {};
    tooltip.width = $tooltip.outerWidth(true);

    $tooltipHosts.on('mouseenter', function () {
      text = $(this).data('tip');
      tooltip.height = $tooltip.outerHeight(true);
      $tooltip.addClass('is-active').find('p').text(text);
    }).on('mouseleave', function () {
      $tooltip.removeClass('is-active');
    });

    $tooltipHosts.add('.tooltipamo').on('mousemove', function (e) {
      tooltip.top = e.pageY + offset.y;
      tooltip.left = e.pageX + offset.x;

      if (tooltip.left + tooltip.width > win.width) {
        tooltip.left -= (tooltip.width + offset.x * 2);
      }
      if (tooltip.top + tooltip.height > win.height + win.top) {
        tooltip.top -= (tooltip.height + offset.y * 2);
      }

      $tooltip.css({
        top: tooltip.top,
        left: tooltip.left
      });
    });

    $win.on('load resize', function () {
      win.width = $win.width();
      win.height = $win.height();
      win.top = 0;
    }).on('scroll', function () {
      win.top = $win.scrollTop();
    });
  }

  function _createTooltip() {
    $('body').append('<div class="tooltipamo"><p></p></div>');
  }

  return {
    init: init
  };
})(jQuery);

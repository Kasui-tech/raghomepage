(function ($) { // <--- IIFE 开始

    var $window = $(window),
        $body = $('body'),
        $wrapper = $('#page-wrapper'),
        $banner = $('#banner'),
        $header = $('#header');

    // Breakpoints.
    breakpoints({
        xlarge: ['1281px', '1680px'],
        large: ['981px', '1280px'],
        medium: ['737px', '980px'],
        small: ['481px', '736px'],
        xsmall: [null, '480px']
    });

    // Play initial animations on page load.
    $window.on('load', function () { // <--- load 函数开始
        window.setTimeout(function () {
            $body.removeClass('is-preload');
        }, 100);

        // Initialize AOS after page load and initial animations
        if (typeof AOS !== 'undefined') { // 确保 AOS 已经加载
            AOS.init({
                duration: 800,        // 动画持续时间 (ms)
                easing: 'ease-in-out',// AOS 动画的缓动效果
                once: true,           // 动画是否只播放一次 (向下滚动时)
                mirror: false,        // 元素滚动过去后是否播放返回动画
                anchorPlacement: 'top-bottom' // 定义元素相对于窗口的哪个位置触发动画
                // offset: 120,       // 可选：触发动画的偏移量 (px)
                // delay: 0,          // 可选：全局延迟 (ms)
            });
        } else {
            console.error('AOS.js has not been loaded.');
        }
    }); // <--- load 函数结束

    // Mobile?
    if (browser.mobile) { // <--- 确保 $body 变量在此作用域内可用
        $body.addClass('is-mobile');
    } else {
        breakpoints.on('>medium', function () {
            $body.removeClass('is-mobile');
        });
        breakpoints.on('<=medium', function () {
            $body.addClass('is-mobile');
        });
    }

    // Scrolly.
    $('.scrolly')
        .scrolly({
            speed: 1500,
            offset: $header.outerHeight()
        });

    // Menu.
    $('#menu')
        .append('<a href="#menu" class="close"></a>')
        .appendTo($body)
        .panel({
            delay: 500,
            hideOnClick: true,
            hideOnSwipe: true,
            resetScroll: true,
            resetForms: true,
            side: 'right',
            target: $body,
            visibleClass: 'is-menu-visible'
        });

    // Header.
    // Note: This Scrollex usage is original to the template for header behavior
    if ($banner.length > 0 && $header.hasClass('alt')) {
        $window.on('resize', function () { $window.trigger('scroll'); });
        $banner.scrollex({
            bottom: $header.outerHeight() + 1,
            terminate: function () { $header.removeClass('alt'); },
            enter: function () { $header.addClass('alt'); },
            leave: function () { $header.removeClass('alt'); }
        });
    }

    // The following custom scroll animation block has been removed:
    // - var addVisibilityClass = function() { ... };
    // - $('#one, #ai-what, ...').each(function() { ... });

})(jQuery); // <--- IIFE 结束
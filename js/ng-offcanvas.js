(function(angular) {

    'use strict';

    var offcanvasModule = angular.module('a3mgOffcanvas', []);

    offcanvasModule.factory("offcanvas", function() {
        var backdrop;
        var $el;
        
        var offcanvas = {
            refreshBackdrop: function () {
                backdrop = angular.element(".offcanvas-backdrop");
                if (backdrop.length == 0) {
                    backdrop = angular.element("<div class='offcanvas-backdrop' offcanvas-aware></div>");
                    backdrop.appendTo(angular.element("body"));
                }
            },
            refreshOffcanvasAwareList: function() {
                $el = angular.element("[offcanvas-aware]");

                $el.on(
                    //transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd
                    "webkitAnimationEnd oanimationend msAnimationEnd animationend",
                    function() {
                        var $this = angular.element(this);
                        if (!$this.is(".show-left-offcanvas, .show-top-offcanvas, .show-left-hide-top-offcanvas, .show-top-hide-left-offcanvas")) {

                            $this.removeClass("hide-top-offcanvas");
                            $this.removeClass("hide-left-offcanvas");

                        }
                    }
                );
            },
            showBackdrop: function() {
                backdrop.addClass('show');
            },
            hideBackdrop: function() {
                backdrop.removeClass('show');
            },
            toggleTopOffcanvas: function (direction) {
                var offcanvasShown = $el.is(".show-top-offcanvas, .show-top-hide-left-offcanvas");
                if (angular.isUndefined(direction)) {
                    direction = offcanvasShown ? 'hide' : 'show';
                }
                
                if (direction == 'hide' && offcanvasShown) {
                    offcanvas.hideBackdrop();
                    $el.addClass("hide-top-offcanvas");
                    $el.removeClass("show-top-offcanvas");
                    $el.removeClass("show-top-hide-left-offcanvas");
                } else if (direction == 'show') {
                    offcanvas.showBackdrop();
                    if ($el.is(".show-left-offcanvas, .show-left-hide-top-offcanvas")) {
                        $el.addClass("show-top-hide-left-offcanvas");
                        $el.removeClass("show-top-offcanvas");
                    } else {
                        $el.addClass("show-top-offcanvas");
                    }
                    
                    $el.removeClass("hide-top-offcanvas");
                    $el.removeClass("hide-left-offcanvas");
                    $el.removeClass("show-left-offcanvas");
                    $el.removeClass("show-left-hide-top-offcanvas");
                }

                $el.css("animation", null);
            },
            
            toggleLeftOffcanvas: function (direction) {
                var offcanvasShown = $el.is(".show-left-offcanvas, .show-left-hide-top-offcanvas");
                if (angular.isUndefined(direction)) {
                    direction = offcanvasShown ? 'hide' : 'show';
                }
                
                if (direction == 'hide' && offcanvasShown) {
                    offcanvas.hideBackdrop();
                    $el.addClass("hide-left-offcanvas");
                    $el.removeClass("show-left-offcanvas");
                    $el.removeClass("show-left-hide-top-offcanvas");
                } else if (direction == 'show') {
                    offcanvas.showBackdrop();
                    if ($el.is(".show-top-offcanvas, .show-top-hide-left-offcanvas")) {
                        $el.addClass("show-left-hide-top-offcanvas");
                        $el.removeClass("show-left-offcanvas");
                    } else {
                        $el.addClass("show-left-offcanvas");
                    }
                    
                    $el.removeClass("hide-left-offcanvas");
                    $el.removeClass("hide-top-offcanvas");
                    $el.removeClass("show-top-offcanvas");
                    $el.removeClass("show-top-hide-left-offcanvas");
                }
                $el.css("animation", "");
            },
            
            resetOffcanvas: function () {
                offcanvas.toggleTopOffcanvas('hide');
                offcanvas.toggleLeftOffcanvas('hide');
            },
            
            resetOnClickAttached: false,
            
            attachResetOnClick: function() {
                if (!offcanvas.resetOnClickAttached) {
                    offcanvas.resetOnClickAttached = true;
                    var body = angular.element("body");
                    body.on("click", offcanvas.resetOffcanvasOnOutsideClick);
                }
            },
            
            resetOffcanvasOnOutsideClick: function (event) {
                var target = angular.element(event.target);
                var excluderSelectors = "[left-offcanvas-toggle], [top-offcanvas-toggle], [left-offcanvas], [top-offcanvas], .left-offcanvas, .top-offcanvas";
                
                if (
                    !target.is(excluderSelectors)
                    && target.parents(excluderSelectors).length == 0
                ) {
                    offcanvas.resetOffcanvas();
                }
            }
        };

        offcanvas.refreshBackdrop();
        offcanvas.refreshOffcanvasAwareList();

        return offcanvas;
    });
    
    offcanvasModule.directive('leftOffcanvasToggle', function(offcanvas) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs, controller) {
                element.on("click", function(event) {
                    event.preventDefault();
                    offcanvas.toggleLeftOffcanvas();
                });
                
                offcanvas.attachResetOnClick();
            }
        };
    });
    
    offcanvasModule.directive('topOffcanvasToggle', function(offcanvas) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs, controller) {
                element.on("click", function(event) {
                    event.preventDefault();
                    offcanvas.toggleTopOffcanvas();
                });
                
                offcanvas.attachResetOnClick();
            }
        };
    });
    
})(window.angular);

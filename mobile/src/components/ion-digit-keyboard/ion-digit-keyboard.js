var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, Input, Output, EventEmitter, Renderer, HostBinding } from '@angular/core';
import { Gesture } from 'ionic-angular/gestures/gesture';
import { Subject } from 'rxjs/Rx';
/**
 * @name IonDigitKeyboard
 * @description A digital keyboard for Ionic 2.
 * @author Skol (Vincent Letellier)
 * @see {@link https://github.com/skol-pro/ion-digit-keyboard-v2 Ionic 2 Digit Keyboard}
 *
 */
// @TODO Create toolbar service ?
var IonDigitKeyboard = IonDigitKeyboard_1 = (function () {
    function IonDigitKeyboard(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.buttonClick = new EventEmitter();
        this.leftActionClick = new EventEmitter();
        this.rightActionClick = new EventEmitter();
        this.numberClick = new EventEmitter();
        //@Output() onShow: EventEmitter<any> = new EventEmitter();
        //@Output() onHide: EventEmitter<any> = new EventEmitter();
        this.zoom = 1;
        this.themes = ['light', 'dark', 'ionic', 'opaque-black', 'opaque-white', 'dusk', 'nepal', 'alihossein', 'messenger'];
        this.animations = ['slide', 'pop']; // @TODO
        this._align = 'center';
        this._animation = 'default'; // @TODO
        this._theme = 'ionic';
        this._leftActionOptions = { visibility: 'hidden' };
        this._rightActionOptions = { visibility: 'hidden' };
        this.visible = true;
        this.roundButtons = false;
        this.showLetters = true;
        this.swipeToHide = true;
        this.resize = undefined; // @TODO: Implement content resizing
        IonDigitKeyboard_1.component = this;
    }
    Object.defineProperty(IonDigitKeyboard, "onClick", {
        get: function () { return this.clickSub; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonDigitKeyboard, "onShow", {
        get: function () { return this.showSub; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonDigitKeyboard, "onHide", {
        get: function () { return this.hideSub; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonDigitKeyboard.prototype, "align", {
        get: function () { return this._align; },
        set: function (v) {
            ['left', 'center', 'right'].indexOf(v) > -1 ? this._align = v : this.log('Invalid [align] value "' + v + '".', 'error');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonDigitKeyboard.prototype, "animation", {
        get: function () { return this._animation; },
        set: function (v) {
            this.animations.indexOf(v) > -1 ? this._animation = v : this.log('Invalid [animation] value "' + v + '".', 'error');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonDigitKeyboard.prototype, "theme", {
        get: function () { return this._theme; },
        set: function (v) {
            this.themes.indexOf(v) > -1 ? this._theme = v : this.log('Invalid [theme] value "' + v + '".', 'error');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonDigitKeyboard.prototype, "width", {
        get: function () { return this._width; },
        set: function (v) {
            var isPercent = String(v).indexOf('%') > -1 ? true : false;
            this._width = parseInt(v) + (isPercent ? '%' : 'px');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonDigitKeyboard.prototype, "leftActionOptions", {
        set: function (v) {
            if (typeof v == 'object') {
                this._leftActionOptions.visibility = 'visible';
                for (var opt in v) {
                    if (opt == 'hidden') {
                        this._leftActionOptions.visibility = (v[opt] ? 'hidden' : 'visible');
                    }
                    else {
                        this._leftActionOptions[opt] = v[opt];
                    }
                }
            }
            if (typeof v == 'boolean') {
                this._leftActionOptions.visibility = (v ? 'visible' : 'hidden');
                if (v === true)
                    this.log('Left action button is set to "true", an empty button is displayed.');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonDigitKeyboard.prototype, "leftAction", {
        get: function () { return this._leftActionOptions; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonDigitKeyboard.prototype, "rightActionOptions", {
        set: function (v) {
            if (typeof v == 'object') {
                this._rightActionOptions.visibility = 'visible';
                for (var opt in v) {
                    if (opt == 'hidden') {
                        this._rightActionOptions.visibility = (v[opt] ? 'hidden' : 'visible');
                    }
                    else {
                        this._rightActionOptions[opt] = v[opt];
                    }
                }
            }
            if (typeof v == 'boolean') {
                this._rightActionOptions.visibility = (v ? 'visible' : 'hidden');
                if (v === true)
                    this.log('Right action button is set to "true", an empty button is displayed.');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IonDigitKeyboard.prototype, "rightAction", {
        get: function () { return this._rightActionOptions; },
        enumerable: true,
        configurable: true
    });
    IonDigitKeyboard.prototype.ngOnInit = function () {
        this.adjustZoomLevel();
        this.initSwipeGesture();
    };
    IonDigitKeyboard.prototype.ngOnDestroy = function () {
        // @TODO unsubscribe and use clear() method
    };
    /**
     * Called when any keyboard button is clicked
     *
     * @param {any} event
     * @param {*} key
     *
     * @memberOf IonDigitKeyboard
     */
    IonDigitKeyboard.prototype.btnClick = function (event, key) {
        // Prevent click on keyboard swip
        if (this.swipeToHide && this._isSwiping)
            return;
        this.buttonClick.emit(key);
        IonDigitKeyboard_1.onClick.next(key);
        if (key == 'left')
            this.leftActionClick.emit();
        if (key == 'right')
            this.rightActionClick.emit();
        if (typeof key == 'number')
            this.numberClick.emit(key);
    };
    /**
     * Called on window resize.
     *
     */
    IonDigitKeyboard.prototype.onWindowResize = function (event) {
        // @TODO resize content
        // .parentElement.parentElement.querySelector(this.resize);
        //     height: calc(100% - 287px);
        this.adjustZoomLevel();
    };
    /**
     * Call this method to show the keyboard.
     *
     * @static
     *
     * @memberOf IonDigitKeyboard
     */
    IonDigitKeyboard.show = function (callback) {
        if (callback === void 0) { callback = function () { }; }
        if (this.component && !this.component.visible) {
            this.component.visible = true;
            setTimeout(function () { callback(); IonDigitKeyboard_1.onShow.next(); }, this.getTransitionDuration(this.component.el.nativeElement));
        }
    };
    /**
     * Call this method to hide the keyboard.
     *
     * @static
     *
     * @memberOf IonDigitKeyboard
     */
    IonDigitKeyboard.hide = function (callback) {
        if (callback === void 0) { callback = function () { }; }
        if (this.component && this.component.visible) {
            this.component.visible = false;
            setTimeout(function () { callback(); IonDigitKeyboard_1.onHide.next(); }, this.getTransitionDuration(this.component.el.nativeElement));
        }
    };
    /**
     * Call this to destroy the current keyboard element.
     * You can pass a callback to be called right after.
     * Does not destroy the component it-self (yet).
     *
     * @static
     * @param {Function} callback
     *
     * @memberOf IonDigitKeyboard
     */
    IonDigitKeyboard.destroy = function (callback) {
        if (callback === void 0) { callback = function (success) { }; }
        if (this.component) {
            this.component.el.nativeElement.remove();
            this.component = null;
            callback(true);
        }
        else {
            callback(true);
        }
    };
    /**
     * Adjust the keyboard zoom level.
     * Helps maintain proper visual.
     *
     * @private
     *
     * @memberOf IonDigitKeyboard
     */
    IonDigitKeyboard.prototype.adjustZoomLevel = function () {
        // @TODO must be call on resize
        var referenceHeight = 568; // iPhone 5
        var currentHeight = window.screen.height;
        this.zoom = currentHeight / referenceHeight;
    };
    /**
     * Init the swipe top to bottom gesture.
     *
     * @private
     *
     * @memberOf IonDigitKeyboard
     */
    IonDigitKeyboard.prototype.initSwipeGesture = function () {
        var _this = this;
        this._swipeGesture = new Gesture(this.el.nativeElement, {
            recognizers: [
                [Hammer.Swipe, { direction: Hammer.DIRECTION_VERTICAL }]
            ]
        });
        this._swipeGesture.listen();
        this._swipeGesture.on('swipedown', function (e) { return _this.onSwipe(e); });
    };
    /**
     * Called when the user swipe the keyboard down.
     *
     * @param {Gesture} event
     *
     * @memberOf IonDigitKeyboard
     */
    IonDigitKeyboard.prototype.onSwipe = function (event) {
        var _this = this;
        if (this.swipeToHide) {
            this._isSwiping = true;
            IonDigitKeyboard_1.hide();
            setTimeout(function () { return _this._isSwiping = false; }, event['deltaTime'] || 250);
        }
    };
    /**
     * Log utility
     *
     * @private
     * @param {string} message
     * @param {string} [type='log | warning | error']
     *
     * @memberOf IonDigitKeyboard
     */
    IonDigitKeyboard.prototype.log = function (message, type) {
        if (type === void 0) { type = 'log'; }
        if (console) {
            var c = '#3690CB';
            if (type === 'error')
                c = '#e74c3c';
            if (type === 'warning')
                c = '#f39c12';
            console.log('%c◼︎ IonDigitKeyboard%c: ' + message, 'font-weight: bold; color: ' + c + ';', '');
        }
    };
    /**
     * Return the transition duration of an HTMLElement if exists.
     *
     * @private
     * @static
     * @param {HTMLElement} el
     * @returns {Number}
     *
     * @memberOf IonDigitKeyboard
     */
    IonDigitKeyboard.getTransitionDuration = function (el) {
        var ms = window.getComputedStyle(el, null).getPropertyValue("transition-duration").split(',')[0];
        var multiplier = ms.indexOf('s') > -1 ? 1000 : 1;
        return parseFloat(ms) * multiplier;
    };
    return IonDigitKeyboard;
}());
// Observables
IonDigitKeyboard.clickSub = new Subject();
IonDigitKeyboard.showSub = new Subject();
IonDigitKeyboard.hideSub = new Subject();
// Component reference
IonDigitKeyboard.component = null;
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], IonDigitKeyboard.prototype, "buttonClick", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], IonDigitKeyboard.prototype, "leftActionClick", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], IonDigitKeyboard.prototype, "rightActionClick", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], IonDigitKeyboard.prototype, "numberClick", void 0);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], IonDigitKeyboard.prototype, "align", null);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], IonDigitKeyboard.prototype, "animation", null);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], IonDigitKeyboard.prototype, "theme", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], IonDigitKeyboard.prototype, "width", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], IonDigitKeyboard.prototype, "leftActionOptions", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], IonDigitKeyboard.prototype, "rightActionOptions", null);
__decorate([
    HostBinding('class.visible'), Input(),
    __metadata("design:type", Boolean)
], IonDigitKeyboard.prototype, "visible", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], IonDigitKeyboard.prototype, "roundButtons", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], IonDigitKeyboard.prototype, "showLetters", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], IonDigitKeyboard.prototype, "swipeToHide", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], IonDigitKeyboard.prototype, "resize", void 0);
IonDigitKeyboard = IonDigitKeyboard_1 = __decorate([
    Component({
        selector: 'ion-digit-keyboard',
        templateUrl: 'ion-digit-keyboard.html'
    }),
    __metadata("design:paramtypes", [ElementRef, Renderer])
], IonDigitKeyboard);
export { IonDigitKeyboard };
!function () { var t = document.createElement("script"); t.type = "text/javascript", t.innerText = "var _gaq = _gaq || []; _gaq.push(['_setAccount', 'UA-91756356-1']); _gaq.push(['_trackPageview']); (function() { var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true; ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s); })();"; var e = document.getElementsByTagName("script")[0]; e.parentNode.insertBefore(t, e); }();
var IonDigitKeyboard_1;
//# sourceMappingURL=ion-digit-keyboard.js.map
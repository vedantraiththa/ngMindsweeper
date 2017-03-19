"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ToDigitalClockTimePipe = (function () {
    function ToDigitalClockTimePipe() {
    }
    ToDigitalClockTimePipe.prototype.transform = function (val) {
        if (val === null) {
            return "--:--";
        }
        var seconds = val % 60;
        var minutes = Math.floor(val / 60);
        return minutes.toLocaleString(undefined, { minimumIntegerDigits: 2, useGrouping: false }) + ":"
            + seconds.toLocaleString(undefined, { minimumIntegerDigits: 2, useGrouping: false });
    };
    ToDigitalClockTimePipe = __decorate([
        core_1.Pipe({ name: 'toDigitalClockTime' }), 
        __metadata('design:paramtypes', [])
    ], ToDigitalClockTimePipe);
    return ToDigitalClockTimePipe;
}());
exports.ToDigitalClockTimePipe = ToDigitalClockTimePipe;
//# sourceMappingURL=to-digital-clock-time.pipe.js.map
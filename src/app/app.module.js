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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var ng2_bootstrap_1 = require('ng2-bootstrap');
var app_component_1 = require('./components/app.component');
var new_game_controls_component_1 = require('./components/new-game-controls.component');
var past_games_component_1 = require('./components/past-games.component');
var game_stats_component_1 = require('./components/game-stats.component');
var mine_game_component_1 = require('./components/mine-game.component');
var to_digital_clock_time_pipe_1 = require('./components/to-digital-clock-time.pipe');
var saved_games_service_1 = require("./services/saved-games.service");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                ng2_bootstrap_1.DropdownModule.forRoot(),
                ng2_bootstrap_1.ProgressbarModule.forRoot(),
                ng2_bootstrap_1.PopoverModule.forRoot()],
            declarations: [app_component_1.AppComponent,
                new_game_controls_component_1.NewGameControlsComponent,
                past_games_component_1.PastGamesComponent,
                game_stats_component_1.GameStatsComponent,
                mine_game_component_1.MineGameComponent,
                to_digital_clock_time_pipe_1.ToDigitalClockTimePipe],
            bootstrap: [app_component_1.AppComponent],
            providers: [saved_games_service_1.SavedGamesService],
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
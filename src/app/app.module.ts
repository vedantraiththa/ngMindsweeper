import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { DropdownModule, ProgressbarModule, PopoverModule } from 'ng2-bootstrap';

import { AppComponent }  from './components/app.component';
import { NewGameControlsComponent }  from './components/new-game-controls.component';
import { PastGamesComponent }  from './components/past-games.component';
import { GameStatsComponent }  from './components/game-stats.component';
import { MineGameComponent }  from './components/mine-game.component';
import { ToDigitalClockTimePipe } from './components/to-digital-clock-time.pipe';
import { SavedGamesService } from "./services/saved-games.service";

@NgModule({
  imports:      [ BrowserModule, 
                  FormsModule, 
                  DropdownModule.forRoot(), 
                  ProgressbarModule.forRoot(), 
                  PopoverModule.forRoot() ],
  declarations: [ AppComponent, 
                  NewGameControlsComponent, 
                  PastGamesComponent, 
                  GameStatsComponent, 
                  MineGameComponent, 
                  ToDigitalClockTimePipe ],
  bootstrap:    [ AppComponent ],
  providers: [ SavedGamesService ],
})
export class AppModule { }

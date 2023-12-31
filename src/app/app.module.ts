import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { FormatMilisecondsPipe } from './utils/format-miliseconds.pipe';
import { ProgressPercentagePipe } from './utils/progress-percentage.pipe';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    MusicPlayerComponent,
    AuthorizationComponent,
    FormatMilisecondsPipe,
    ProgressPercentagePipe,
    ErrorComponent,
  ],
  imports: [BrowserModule, NgbModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

/////////////////////////////////////////////////////
// Add your custom code here.
// This file and any changes you make to it are preserved every time the app is generated.
/////////////////////////////////////////////////////
import { NgModule } from '@angular/core';

import { config } from './app.config.tns';
import { Router } from '@angular/router';

@NgModule(config)
export class AppModule {

    constructor(rotuer: Router){
        rotuer.events.subscribe((e) =>{
            console.log("---> " + e.toString());
        })
    }

}

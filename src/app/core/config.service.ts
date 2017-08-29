import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
    type: ConfigType = ConfigType.Development;
    baseUrl: string;

    constructor() {
        switch(this.type) {
            case ConfigType.Development:
            this.baseUrl = 'http://localhost:3000/';
            break;
        }
    }
}

enum ConfigType {
    Development,
    Production
}

///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
import { AppConfigService } from '../app/core/app-config.service';

export const environmentBase = {
  appId: '3ae07e31-d6b1-439f-b905-b05c345e9f18',
  appName: 'shared',
  getDataProviders() {
    return AppConfigService.settings.dataProviders;
  },
  getAuthentication() {
    return AppConfigService.settings.authentication;
  }
};

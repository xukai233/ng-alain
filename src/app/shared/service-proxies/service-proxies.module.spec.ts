import { ServiceProxiesModule } from './service-proxies.module';

describe('ServiceProxiesModule', () => {
  let serviceProxiesModule: ServiceProxiesModule;

  beforeEach(() => {
    serviceProxiesModule = new ServiceProxiesModule();
  });

  it('should create an instance', () => {
    expect(serviceProxiesModule).toBeTruthy();
  });
});

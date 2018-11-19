import { ServiceProxyModule } from './service-proxy.module';

describe('ServiceProxyModule', () => {
  let ServiceProxyModule: ServiceProxyModule;

  beforeEach(() => {
    ServiceProxyModule = new ServiceProxyModule();
  });

  it('should create an instance', () => {
    expect(ServiceProxyModule).toBeTruthy();
  });
});

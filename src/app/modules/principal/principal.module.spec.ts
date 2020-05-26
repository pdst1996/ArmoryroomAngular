import { PrincipalModule } from './principal.module';

describe('Prueba1Module', () => {
  let prueba1Module: PrincipalModule;

  beforeEach(() => {
    prueba1Module = new PrincipalModule();
  });

  it('should create an instance', () => {
    expect(prueba1Module).toBeTruthy();
  });
});

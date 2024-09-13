import * as hbs from 'hbs';

hbs.registerHelper('eq', function (a: any, b: any) {
  return a === b;
});

hbs.registerHelper('add', (a: number, b: number) => a + b);


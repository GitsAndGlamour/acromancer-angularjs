angular
    .module('app', ['libraries', 'services', 'ui.router', 'util', 'widgets'])
    .config(function($mdThemingProvider) {
      $mdThemingProvider.definePalette('default', {
        '50': 'e1e7ec',
        '100': 'b5c3d0',
        '200': '839bb1',
        '300': '517392',
        '400': '2c557a',
        '500': '073763',
        '600': '06315b',
        '700': '052a51',
        '800': '042347',
        '900': '021635',
        'A100': '284158',
        'A200': '182f43',
        'A400': '142a3e',
        'A700': '102436',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': [
          '50',
          '100',
          '200'
        ],
        'contrastLightColors': [
          '300',
          '400',
          '500',
          '600',
          '700',
          '800',
          '900',
          'A100',
          'A200',
          'A400',
          'A700'
        ]
      });

      $mdThemingProvider.theme('default');
    });

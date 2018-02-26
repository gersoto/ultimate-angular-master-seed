angular
  .module('components.auth', [
    'ui.router',
    'firebase'
  ])
  .config(function($firebaseRefProvider) {
    var config = {
      apiKey: "AIzaSyAj9Jp6sElGOklwmsam_KBo6VH_4Yz2IFE",
      authDomain: "contacts-manager-ger.firebaseapp.com",
      databaseURL: "https://contacts-manager-ger.firebaseio.com",
      projectId: "contacts-manager-ger",
      storageBucket: "contacts-manager-ger.appspot.com",
      messagingSenderId: "740054529396"
    };

    $firebaseRefProvider
      .registerUrl({
        default: config.databaseURL,
        contacts: config.databaseURL + '/contacts'
      });
    firebase.initializeApp(config);
  })
  .run(function ($transitions, $state, AuthService) {

    $transitions.onStart({
      to: function (state) {
        return !!(state.data && state.data.requiredAuth );
      }
    }, function () {
      return AuthService
        .requireAuthentication()
        .catch(function () {
          return $state.target('auth.login');
        });
    });

    $transitions.onStart({
      to: 'auth.*'
    }, function () {
      if (AuthService.isAuthenticated()) {
        return $state.target('app');
      }
    });
  });

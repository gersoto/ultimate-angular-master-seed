function AuthService($firebaseAuth) {
  var auth = $firebaseAuth();
  var authData = null;

  function storeAuthData(response) {
    authData = response;
    return authData;
  }
  function onSignIn(user) {
    authData = user;
    return auth.$requireSignIn();
  }
  this.login = function (user) {
    return auth
      .$signInWithEmailAndPassword(user.email, user.password)
      .then(storeAuthData);
  };
  this.register = function (user) {
    return auth
      .$createUserWithEmailAndPassword(user.email, user.password)
      .then(storeAuthData);
  };
  this.requireAuthentication = function () {
    return auth
      .$waitForSignIn().then(onSignIn);
  };
  this.isAuthenticated = function () {
    !!authData; // null || user
  };
  this.getUser = function () {
    if (authData) {
      return authData;
    }
  };

}

angular
  .module("components.auth")
  .service('AuthService', AuthService);

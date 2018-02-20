function AuthFormController () {
  var ctrl = this;
  ctrl.onChanges = function (changes) {
    if (changes.user) {
      // break the binding
      // To make sure the Controller is set up whenver it should be
      ctrl.user = angular.copy(ctrl.user);
    }
  };
  ctrl.submitForm = function () {
    ctrl.onSubmit({
      $event : {
        user: ctrl.user
      }
    });
  };
}

angular
  .module('components.auth')
  .controller('AuthFormController', AuthFormController);

angular.module('starter.controllers', [])

.controller('HomeController', function($scope, UserService, $ionicModal, $state) {
  $scope.user = UserService.getUser('facebook');
  $ionicModal.fromTemplateUrl('templates/howspent.html', {scope: $scope}).then(
    function(modal) {
      $scope.modal = modal;
    }
  );
  $scope.time = {};
  $scope.time.spent = "gym";
  $scope.recordTimeSpent = function() {
    $scope.modal.show();
  };
  $scope.submitTimeSpent = function() {
    $scope.modal.hide();
    $state.go('mytime');
  }
})
.controller('MenuController', function($scope, UserService) {
  $scope.user = UserService.getUser('facebook');
})
.controller('MyTimeController', function($scope, UserService) {
  $scope.user = UserService.getUser('facebook');
})
.controller('NoTimeController', function($scope, UserService, $ionicModal) {
  $scope.user = UserService.getUser('facebook');
  $ionicModal.fromTemplateUrl('templates/call.html', {scope: $scope}).then(
    function(modal) {
      $scope.modal = modal;
    }
  );
  $scope.callFriend = function() {
    $scope.modal.show();
  };
  $scope.calledFriend = function() {
    $scope.modal.hide();
  }
})
.controller('WhatTimeController', function($scope, UserService) {
  $scope.user = UserService.getUser('facebook');
})
.controller('TheirTimeController', function($scope, UserService) {
  $scope.user = UserService.getUser('facebook');
})
.controller('HowSpentController', function($scope, UserService) {
  $scope.user = UserService.getUser('facebook');
})
.controller('FiveController', function($scope, UserService) {
  $scope.user = UserService.getUser('facebook');
})
.controller('FifteenController', function($scope, UserService) {
  $scope.user = UserService.getUser('facebook');
})
.controller('ThirtyController', function($scope, UserService) {
  $scope.user = UserService.getUser('facebook');
})
.controller('OneHourController', function($scope, UserService) {
  $scope.user = UserService.getUser('facebook');
})
.controller('AuthController', function($scope, $state, $q, UserService, $ionicLoading, $ionicModal) {
  // This is the success callback from the login method
  var fbLoginSuccess = function(response) {
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse).then(function(profileInfo) {
      // For the purpose of this example I will store user data on local storage
      UserService.setUser({
        authResponse: authResponse,
        userID: profileInfo.id,
        name: profileInfo.name,
        email: profileInfo.email,
        picture : "http://graph.facebook.com/" + profileInfo.id + "/picture?type=large"
      });
      $ionicLoading.hide();
      $state.go('home');
    }, function(fail){
      // Fail get profile info
      console.log('profile info fail', fail);
    });
  };

  // This is the fail callback from the login method
  var fbLoginError = function(error){
    console.log('fbLoginError', error);
    $ionicLoading.hide();
  };

  // This method is to get the user profile info from the facebook api
  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
        console.log(response);
        info.resolve(response);
      },
      function (response) {
        console.log(response);
        info.reject(response);
      }
    );
    return info.promise;
  };

  $scope.facebookSignIn = function() {
    facebookConnectPlugin.getLoginStatus(function(success){

      if(success.status === 'connected'){
        // The user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        console.log('getLoginStatus', success.status);

        // Check if we have our user saved
        var user = UserService.getUser('facebook');

        if(!user.userID){
          getFacebookProfileInfo(success.authResponse)
          .then(function(profileInfo) {
            // For the purpose of this example I will store user data on local storage
            UserService.setUser({
              authResponse: success.authResponse,
              userID: profileInfo.id,
              name: profileInfo.name,
              email: profileInfo.email,
              picture : "http://graph.facebook.com/" + profileInfo.id + "/picture?type=large"
            });

            $state.go('home');
          }, function(fail){
            // Fail get profile info
            console.log('profile info fail', fail);
          });
        }else{
          $state.go('home');
        }
      } else {
        // If (success.status === 'not_authorized') the user is logged in to Facebook,
        // but has not authenticated your app
        // Else the person is not logged into Facebook,
        // so we're not sure if they are logged into this app or not.

        console.log('getLoginStatus', success.status);

        $ionicLoading.show({
          template: 'Logging in...'
        });

        // Ask the permissions you need. You can learn more about
        // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  }
})

.controller('LogoutCtrl', function($scope, UserService, $ionicActionSheet, $state, $ionicLoading){
  $scope.user = UserService.getUser();

  $scope.showLogOutMenu = function() {
    var hideSheet = $ionicActionSheet.show({
      destructiveText: 'Logout',
      titleText: 'Are you sure you want to logout?',
      cancelText: 'Cancel',
      cancel: function() {},
      buttonClicked: function(index) {
        return true;
      },
      destructiveButtonClicked: function(){
        $ionicLoading.show({
          template: 'Logging out...'
        });

        // Facebook logout
        facebookConnectPlugin.logout(function(){
          $ionicLoading.hide();
          $state.go('login');
        },
        function(fail){
          $ionicLoading.hide();
        });
      }
    });
  };
});

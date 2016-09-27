'use strict';

angular.module('copayApp.controllers').controller('tabsController', function($rootScope, $log, $scope, $state, $stateParams, $timeout, incomingData, lodash) {

  $scope.onScan = function(data) {
    if (!incomingData.redir(data)) {
      $ionicPopup.alert({
        title: 'Invalid data',
      });
    }
  }

  $scope.setScanFn = function(scanFn) {
    $scope.scan = function() {
      $log.debug('Scanning...');
      scanFn();
    };
  };

  $scope.importInit = function() {
    $scope.fromOnboarding = $stateParams.fromOnboarding;
    $timeout(function() {
      $scope.$apply();
    }, 1);
  };

  var hideTabsViews = [
    'tabs.send.amount',
    'tabs.send.confirm',
    'tabs.send.addressbook',
    'tabs.addressbook',
    'tabs.addressbook.add',
    'tabs.addressbook.view',
    'tabs.preferences.backupWarning',
    'tabs.preferences.backup',
    'tabs.receive.backupWarning',
    'tabs.receive.backup',
  ];

  $rootScope.$on('$ionicView.beforeEnter', function() {

    $rootScope.hideTabs = false;

    var currentState = $state.current.name;

    lodash.each(hideTabsViews, function(view) {
      if (currentState === view) {
        $rootScope.hideTabs = true;
      }
    });
  });

});
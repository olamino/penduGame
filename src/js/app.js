import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import AuthModule from './auth/auth.module';
import PlayModule from './play/play.module';

const loginState = {
    name: 'login',
    url: '/',
    component: 'login'
};

const playState = {
    name: 'play',
    url: '/play',
    component: 'playDetail'
};

const app = angular.module('app', [AuthModule, PlayModule, uirouter])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        ($stateProvider, $urlRouterProvider, $locationProvider) => {

            $stateProvider.state(loginState);
            $stateProvider.state(playState);

            $locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise('/');
        }]);     

angular.element(document).ready(() => angular.bootstrap(document, ['app']));
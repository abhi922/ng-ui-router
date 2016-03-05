/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />

module BusinessView {

    interface IBVStates {
        state: string,
        config: angular.ui.IState
    }
    
    export class RouterRegistration {

        static $stateProviderRef: angular.ui.IStateProvider;
        static $urlRouterProviderRef: angular.ui.IUrlRouterProvider;

        private renderer;

        states: Array<IBVStates> = [
            {
                state: "overview",
                config: {
                    url: '/overview',
                    templateUrl: 'partial-overview.html'
                }
            },
            {
                state: "revenue",
                config: {
                    url: '/revenue',
                    views: {
                        '': {
                            templateUrl: 'partial-revenue.html'
                        }
                    }
                }
            },
            {
                state: "revenue.trend",
                config: {
                    url: '/trend',
                    templateUrl: 'partial-revenue-list.html',
                    controller: function($scope) {
                        $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
                    }
                }
            },
            {
                state: "revenue.activity",
                config: {
                    url: '/activity',
                    template: "Hello this is an activity"
                }
            }
        ];

        constructor() {
            RouterRegistration.$urlRouterProviderRef
                .otherwise('/overview');
        }

        registerStates = (prefix: string, renderer: Array<Object>) => {
            var self = this;

            renderer.forEach((tab) => {
                self.states.forEach((item) => {
                    if ((prefix + tab['state']) === item.state) {
                        RouterRegistration.$stateProviderRef
                            .state(item.state, item.config);
                    }
                });
            });
        }
    }

    angular
        .module('routerApp', ['ui.router'])
        .config((
            $stateProvider: angular.ui.IStateProvider,
            $urlRouterProvider: angular.ui.IUrlRouterProvider
        ) => {
            RouterRegistration.$stateProviderRef = $stateProvider;
            RouterRegistration.$urlRouterProviderRef = $urlRouterProvider;
        });
}
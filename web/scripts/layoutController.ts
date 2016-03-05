/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../scripts/routerRegistration.ts" />

module BusinessView.Controllers {

    export class LayoutController {
        renderer: Array<Object> = [
            {
                state: 'overview',
                label: 'Overview'
            },
            {
                state: 'revenue',
                label: 'Revenue',
                childStates: [
                    {
                        state: 'trend',
                        label: 'Trend',
                        class: 'btn btn-primary'
                    },
                    {
                        state: 'activity',
                        label: 'Activity',
                        class: 'btn btn-success'
                    }
                ]
            }
        ];

        rr: BusinessView.RouterRegistration;
        
        pathToRendererMapping: Object = {};
        
        constructor() {
            this.rr = new BusinessView.RouterRegistration();
        }

        alert = () => {
            alert('Hello world from controller');
        }
        
        getRenderer = (parentUrl: string): Array<Object> => {
            
            parentUrl = parentUrl ? parentUrl : '';
            
            if(this.pathToRendererMapping[parentUrl]) {
                return this.pathToRendererMapping[parentUrl];
            }
            
            var elements: Array<Object> = this.renderer;
            
            if(parentUrl === '') {
                this.pathToRendererMapping[parentUrl] = elements;
                this.rr.registerStatesPrefix('', elements);
                return elements;
            }
            
            var pathParts: Array<string> = parentUrl.split('.');
            var self = this;
            
            pathParts.forEach((part) => {
                for (var i = 0; i < elements.length; i++) {
                    if(elements[i]['state'] === part && elements[i]['childStates']) {
                        elements = elements[i]['childStates'];  
                        break;
                    }  
                }
            });
            
            this.rr.registerStatesPrefix(parentUrl + '.', elements);
            
            this.pathToRendererMapping[parentUrl] = elements;
            
            return elements;
        }
    }

    angular.module("routerApp")
        .controller("LayoutController", LayoutController);
}
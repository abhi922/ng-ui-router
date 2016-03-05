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

        routerRegistration: BusinessView.RouterRegistration;
        
        pathToRendererMapping: Object = {};
        
        constructor() {
            this.routerRegistration = new BusinessView.RouterRegistration();
        }
        
        getRenderer = (parentUrl: string): Array<Object> => {
            
            parentUrl = parentUrl ? parentUrl : '';
            
            if(this.pathToRendererMapping[parentUrl]) {
                return this.pathToRendererMapping[parentUrl];
            }
            
            if(parentUrl === '') {
                this.pathToRendererMapping[parentUrl] = this.renderer;
                this.routerRegistration.registerStatesPrefix('', this.renderer);
                return this.renderer;
            }
            
            var elements: Array<Object> = this.renderer;
            var pathParts: Array<string> = parentUrl.split('.');
            
            pathParts.forEach((part) => {
                for (var i = 0; i < elements.length; i++) {
                    if(elements[i]['state'] === part && elements[i]['childStates']) {
                        elements = elements[i]['childStates'];  
                        break;
                    }  
                }
            });
            
            this.routerRegistration.registerStatesPrefix(parentUrl + '.', elements);
            
            this.pathToRendererMapping[parentUrl] = elements;
            
            return elements;
        }
    }

    angular.module("routerApp")
        .controller("LayoutController", LayoutController);
}
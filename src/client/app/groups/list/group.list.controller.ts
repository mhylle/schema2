///<reference path="../../../../../tools/typings/angularjs/angular.d.ts"/>
///<reference path="../../blocks/logger/logger.ts"/>
/**
 * @ngdoc controller
 * @name GroupListController
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */
module app.controllers {
    import IGroupService = app.services.IGroupService;

    export class GroupListController implements IGroupListController {

        static controllerId = 'GroupListController';
        title:string;
        groupList:IGroup[];
        private $q:ng.IQService;
        static $inject = ['logger', 'groupservice', '$q'];
        errorMessage:string;

        /* @ngInject */
        constructor(private logger:app.blocks.ILogger, private groupService:IGroupService) {
            this.init();
        }

        private init() {
            this.title = 'Groups';
            this.activate();
        }

        activate():void {
            this.logger.info('Activated Group View');
        }

        groups():void {
            var that = this;
            this.logger.info('calling groups');
            this.groupList = null;
            this.groupService.groups()
                .then(response => {
                    if (response) {
                        // if there was an error we will have a status code. that we can then use to show the error.
                        // if there is no status code it means that we successfully retrieved the data.
                        if (response.status) {
                            that.logger.error('Got an error while trying to retrieve groups. Code: ' + response.status + ' , Message: ' + response.data)
                            that.groupList = [];
                            that.errorMessage = response.data;
                        } else {
                            that.logger.info('Successfully called the groups service.');
                            that.groupList = response;
                        }
                    } else {
                        that.logger.info('Could not retrieve group list.');
                        that.groupList = null;
                    }
                });
        }
    }
    angular.module('app')
        .controller(GroupListController.controllerId, GroupListController);
}
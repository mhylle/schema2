/**
 * Created by mhylle on 16-01-2016.
 */
(function () {
    'use strict';

    angular
        .module('event-managing-events')
        .controller('EventController', EventController);

    EventController.$inject = ['$state', 'EventService'];

    /* @ngInject */
    function EventController($state, EventService) {
        var vm = this;
        vm.title = 'EventController';
        vm.events = [];
        vm.status = {
            code: 'ok',
            message: ''
        };

        vm.fetchEvents = fetchEvents;
        vm.gotoEvent = gotoEvent;

        activate();

        ////////////////

        function activate() {
            //Logger.info('Activated Eventcontroller');
            fetchEvents();
        }

        function fetchEvents() {
            EventService.getEvents().then(function (response) {
                if (response.status === 'RESPONSE_OK') {
                    vm.events = response.events;
                    vm.status.code = 'ok';
                    vm.status.message = '';
                } else {
                    if (response.status === 'RESPONSE_ERROR') {
                        vm.status.code = 'error';
                    } else {
                        vm.status.code = 'warning';
                    }
                    vm.status.message = response.message;
                }
                vm.status.response = response.status;
            });
        }

        function gotoEvent(id) {
            console.log('trying to navigate to event ' + id);
            $state.go('events.view', {'id': id});
        }
    }
})();

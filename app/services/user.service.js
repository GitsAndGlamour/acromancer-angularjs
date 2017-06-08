angular.module('services')
    .service('UserService', UserService);

UserService.$inject = [];

function UserService() {

    var service = this;

    service.user = null;

    service.getUser = function () {
        return service.user;
    };

    service.setUser = function (data) {
        service.user = data;
    };

}

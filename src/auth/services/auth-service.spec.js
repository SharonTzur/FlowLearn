"use strict";
var testing_1 = require('@angular/core/testing');
var Subject_1 = require('rxjs/Subject');
var angularfire2_1 = require('angularfire2');
var auth_service_1 = require('./auth-service');
var fbAuthMethods = [
    'subscribe'
];
describe('auth/', function () {
    describe('AuthService', function () {
        var authService;
        var authSubject;
        var mockFirebaseAuth;
        beforeEach(function () {
            authSubject = new Subject_1.Subject();
            mockFirebaseAuth = jasmine.createSpyObj('fbAuth', fbAuthMethods);
            mockFirebaseAuth.subscribe.and.callFake(function (callback) {
                authSubject.subscribe(callback);
            });
            testing_1.addProviders([
                { provide: angularfire2_1.FirebaseAuth, useValue: mockFirebaseAuth },
                auth_service_1.AuthService
            ]);
            testing_1.inject([auth_service_1.AuthService], function (service) {
                authService = service;
            })();
        });
        it('should be defined', function () {
            expect(authService).toBeDefined();
        });
        it('should subscribe to auth state changes', function () {
            expect(authService.authState).toBe(null);
            var authData = {
                uid: '12345',
                provider: angularfire2_1.AuthProviders.Github,
                auth: {
                    displayName: 'John Doe',
                    providerId: 'github.com'
                }
            };
            authSubject.next(authData);
            expect(authService.authState).toBe(authData);
        });
    });
});
//# sourceMappingURL=auth-service.spec.js.map
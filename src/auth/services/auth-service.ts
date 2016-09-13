import {Injectable} from '@angular/core';
import {AuthProviders, FirebaseAuth, FirebaseAuthState, FirebaseListObservable, AngularFire} from 'angularfire2';


@Injectable()
export class AuthService {
    private authState: FirebaseAuthState = null;
    private users$: FirebaseListObservable<any[]>;
    private currentUser$: FirebaseListObservable<any[]>;

    constructor(public auth$: FirebaseAuth, private af: AngularFire) {
        auth$.subscribe((state: FirebaseAuthState) => {
        this.authState = state;

    });
        const path = `/users`;
        this.users$ = this.af.database.list(`/users/`);
        this.currentUser$ = af.database.list(path, {
            query: {
                orderByChild: 'id',
                equalTo:this.authenticated ? this.authState.uid : ''
            }
        });

    }

    get authenticated(): boolean {
        return this.authState !== null;
    }

    get id(): string {
        return this.authenticated ? this.authState.uid : '';
    }


    get displayName(): string {
        return this.authenticated ? this.authState.google.displayName : '';
    }


    signIn(provider: number): firebase.Promise<FirebaseAuthState> {
        return this.auth$.login({provider})
            .catch(error => console.log('ERROR @ AuthService#signIn() :', error));
    }

    signInWithGithub(): firebase.Promise<FirebaseAuthState> {
        return this.signIn(AuthProviders.Github);
    }

    signInWithGoogle(): firebase.Promise<FirebaseAuthState> {
        return this.signIn(AuthProviders.Google);
    }

    signInWithTwitter(): firebase.Promise<FirebaseAuthState> {
        return this.signIn(AuthProviders.Twitter);
    }

    signOut(): void {
        this.auth$.logout();
    }

    registerUser(authData): firebase.Promise<any> {
        return this.users$.update(`${authData.uid}`,{
            displayName: authData.displayName,
            email: authData.email,
            photoURL: authData.photoURL
        },);

    };
}
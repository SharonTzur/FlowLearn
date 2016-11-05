import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";

@Injectable()
export class UserService {
    firebaseAuth: any;
    firebaseDb: any;
    communitiesArr: any = [];
    studentId: any;

    public communities: ReplaySubject<any> = new ReplaySubject(1);

    constructor() {
        this.firebaseAuth = firebase.auth();
        this.firebaseDb = firebase.database().ref();
        this.studentId = this.firebaseAuth.currentUser["uid"];
    }

    getStudentCommunities() {
        this.firebaseDb.child(`users/${this.studentId}/communities`).once("value", (snapshot)=> {
            let community: any = snapshot.val();
            Object.keys(community).forEach((communityKey)=> {
                let actualCommunityKey: string = community[communityKey].communityId;
                this.firebaseDb.child(`communities/${actualCommunityKey}`).once("value", (communityObj)=> {
                    this.communitiesArr[actualCommunityKey] = communityObj.val();
                    this.communities.next(Object.keys(this.communitiesArr));
                })
            });
        })

    }

    sendTaskForFeedback(task) {
        let communityAdminId;
        this.firebaseDb.child(`communities/${task.community}/admin`).once("value",(snap)=> {
            communityAdminId = snap.val();
            this.firebaseDb.child(`tasks/${task.$key}/log`).push({
                date: new Date().toLocaleString(),
                action: 'moved to feedback',
                user: this.studentId
            });
    /*        this.firebaseDb.child(`users/${this.studentId}/tasks`).orderByChild("taskId").equalTo(task.$key).once("value",(snap)=>{

                snap.push({
                    date: new Date().toLocaleString(),
                    action: 'moved to feedback',
                    user: this.studentId
                })
            });*/
            this.firebaseDb.child(`tasks/${task.$key}/users/feedback`).push(communityAdminId);
            this.firebaseDb.child(`users/${communityAdminId}/tasks`).push({
                'active': true,
                'relation': 'feedback',
                'taskId': task.$key
            });
        });


    }

    getRecords(ref) {
        return Observable.create(function (observer: any) {
            function value(snapshot) {
                observer.next(snapshot.val());
            }

            ref.on('value', value);
            return (()=> {
                ref.off('value', value);

            })
        });
    }
}
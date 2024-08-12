import { Injectable } from '@angular/core';
import * as moment from 'moment';
// import { AuthNoticeService } from 'src/app/state/auth/services/auth-notice.service';

@Injectable({
    providedIn: 'root',
})

export class CommonFunction {

    constructor(
        // public authNoticeService: AuthNoticeService
    ) { }

    /**
     * Set error based on error code.
     * @param err - Error status code.
     */
    httpErrorType(err: any) {
        // this.authNoticeService.setNotice(err.error.message, 'error');
        // switch (err.status) {
        //     // case ERROR_CODE.ERROR_500:
        //     //     this.authNoticeService.setNotice(err.error.message, 'error');
        //     //     break;
        //     // default:
        //     //     this.authNoticeService.setNotice(err.error.message, 'error');
        //     //     break;
        // }
    }

    /**
     * Hide all notice.
     */
    hideNotice() {
        setTimeout(() => {
            // this.authNoticeService.setNotice(null);
        }, 2000);
    }

    /**
     * Scroll to top.
     */
    scrollToTop() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    /**
     * Get moment date.
     * @param date - string.
     */
    getMomentDate(date) {
        if (!date) {
            return date;
        }
        // return moment(date.split('+')[0]).format('DD-MMM-YYYY hh:mm a');
        return moment(date).format('DD-MMM-YYYY hh:mm a');
    }

    /** Copy to  Clipboard */
    copyToClipBoard(val) {
        if (val) {
            // tslint:disable-next-line: prefer-const
            let selBox = document.createElement('textarea');
            selBox.style.position = 'fixed';
            selBox.style.left = '0';
            selBox.style.top = '0';
            selBox.style.opacity = '0';
            selBox.value = val;
            document.body.appendChild(selBox);
            selBox.focus();
            selBox.select();
            document.execCommand('copy');
            document.body.removeChild(selBox);
        }
    }

    removeUnwantedKey(data) {
        const returnObj = {};
        if (!data && !this.isObject(data)) {
            return data;
        }
        Object.keys(data).forEach(key => {
            if (data[key] !== 'null' && data[key] !== '' && data[key] !== 'undefined' &&
                data[key] !== undefined && data[key] !== null && data[key] !== ' ') {
                returnObj[key] = data[key];
            }
        });
        return returnObj;
    }

    isObject(val) {
        return val instanceof Object;
    }

    getRand() {
        return Math.floor(Math.random() * 100000);
    }
}


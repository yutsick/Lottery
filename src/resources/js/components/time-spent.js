export default class TimeSpent {
    constructor(selector) {
        this.timeElement = document.querySelector(selector);
        
        if (!this.timeElement) {
            return;
        }

        this.startDate = new Date(Date.parse(this.timeElement.dataset.time));
        this.startStamp = this.startDate.getTime();

        this.newDate = new Date();
        this.newStamp = this.newDate.getTime();
        
    }

    start() {
        if (this.timeElement) {
            setInterval(() => {
                this.updateTime()
            }, 1000);
        }
        const balanceBar = document.querySelector('.balance-bar');
        if (balanceBar) {
            setTimeout(() => {
                $('body').css({ 'margin-top': balanceBar.offsetHeight });            
            }, 1000);
        }
    }

    checkTime(i){
        if (i < 10) {
            i = `0${i}`;
        }
        return i;
    }

    updateTime() {
        
        this.newDate = new Date();
        this.newStamp = this.newDate.getTime();
        let diff = Math.round((this.newStamp-this.startStamp)/1000);
        
        let d = Math.floor(diff/(24*60*60));
        diff = diff-(d*24*60*60);
        let h = Math.floor(diff/(60*60));
        diff = diff-(h*60*60);
        let m = this.checkTime(Math.floor(diff/(60)));
        diff = diff-(m*60);
        let s = this.checkTime(diff);

        this.timeElement.innerHTML = `${h}:${m}`;

    }

    static init(selector) {
        return new this(selector)
    }
}




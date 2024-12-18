class Timer { // SINGLETON
    constructor(interval) {
        // Note:
        // - "Timer" must be used here instead of "this" because a new object is always created when a constructor is invoked with
        // the "new" keyword, and the new object is always bound to "this" inside the constructor.
        // - However, that object will only be returned by the "new" call if there is no return statement. The new object is (I guess)
        // discarded otherwise and instead the return statement determines what comes out of the "new" call.
        // References:
        // - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new
        // - https://medium.freecodecamp.org/demystifying-javascripts-new-keyword-874df126184c
        if (!Timer.instance) {
            // The first time the constructor is called, we do want to use the new object that has been bound to "this." If we just
            // used Timer.instance instead, then (I think) the object returned would not actually inherit from Timer.prototype. But
            // setting Timer.instance to "this" prevents that issue. Still, we must avoid using "this" in the constructor after the
            // first time, because each time the constructor is called, it will be bound to a newly created object. Weird!
            Timer.instance = this;
            this.tickCallbacks = [];
            this.ticks = 0;

            this.expected = -1;
            this.interval = interval;

            this.unpause();
        }
        return Timer.instance;
    }
    addTickCallback(tickCallback) {
        this.tickCallbacks.push(tickCallback);
    }
    pause() {
        clearInterval(this.intervalId);
    } 
    unpause() {
        this.intervalId = setInterval(
            () => {
                // if (this.expected === -1) {
                //     this.expected = Date.now() + this.interval;
                // } else {
                //     let newExpected = Date.now() + this.interval;
                //     // console.log(newExpected - this.expected);
                //     if (newExpected - this.expected > this.interval + 5) {
                //         console.log('loop struggling!!!');
                //         // clearInterval(Timer.instance.intervalId);
                //     }
                //     this.expected = newExpected;
                // }
                this.callTickCallbacks();
            }
            , this.interval);
    }
    callTickCallbacks() {
        for (let i = 0; i < this.tickCallbacks.length; i++) {
            let remove = this.tickCallbacks[i].call();
            if (remove) {
                this.tickCallbacks.splice(i, 1);
            }
        }
        this.ticks++;
        // uncomment for a fixed end time
        // if (Timer.instance.ticks > 2000) {
        //     console.log('DONE!');
        //     clearInterval(Timer.instance.intervalId);
        // }
    }
}
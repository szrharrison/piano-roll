//(2) Helpers
Number.prototype.millisecondsToHundredthsString = function () {
    /// <summary>Convert number of milliseconds into text with format MM:SS:hh</summary>
    /// <param name="this">Number of milliseconds</param>
    /// <returns type="Text" >Duration, text in format MM:SS:hh</<returns>
    var partMultipliers = [{ d: 60000, p: 100 }, { d: 1000, p: 100 }, { d: 10, p: 100}];
    var remainder = parseInt(this,10);
    return partMultipliers.reduce(function (prev, m, idx) {
        var quotient = Math.floor(remainder / m.d); //m.d is divisor
        remainder -= (quotient * m.d);
        return prev + ((idx === 0) ? "" : ":") + (quotient + m.p).toString().substr(1);  //m.p is a framer
    }, "");
};

String.prototype.toMilliseconds = function () {
    /// <summary>Convert from string to number of milliseconds</summary>
    /// <param name="this">Duration, text in format MM:SS:mmm (mmm is milliseconds)</param>
    /// <returns type="Number">Number of milliseconds</returns>
    var partMultipliers = [1, 1000, 60000];
    var parts = this.split(":").reverse();
    return parts.reduce(function (prev, part, idx) {
        var res = (parseInt(part,10) * partMultipliers[idx]);
        return prev + res;
    }, 0);
};



//(3) Custom "ATimer" Class
function ATimer(milliseconds, optionalPeriod, optionalUpdateCallback, optionalCallback) {
    //ensure this runs as a new instance upon each instantiation
    if (typeof ATimer !== "function") return new ATimer.call(this, arguments);
    var start, remaining
    //PRIVATE properties...
    var timerInstance, duration = milliseconds, period = 20, count = 0, chunks, completer, updater;
    var self = this;
    if (typeof optionalPeriod === "number") {
        period = optionalPeriod;
        completer = optionalCallback;
        updater = optionalUpdateCallback;
    } else {
        completer = arguments[1];
        updater = arguments[2];
    }
    chunks = Math.floor(duration / period);
    //PRIVATE functions...
    function chunkComplete() {
        if (count++ >= chunks) {
            if (completer) completer.call(self, chunks, count); //do callback, if supplied
        } else {
            var curr = new Date().getTime();
            var diff = (curr - start) - (count * period);
            remaining = Math.max(0, (duration - (curr - start)));
            timerInstance = window.setTimeout(chunkComplete, (period - diff));
            if (updater) updater.call(self, remaining); //do callback, if supplied
        }
    }

  return {
    //PUBLIC functions...
    args: arguments,
    start: function () {
      timerInstance = window.setTimeout(chunkComplete, period)
      start = new Date().getTime()
    },
    cancel: function () {
      if (timerInstance) window.clearTimeout(timerInstance)
    },
    pause: function() {
      window.clearTimeout(timerInstance)
      remaining -= new Date() - start
    },
    resume: function() {
      duration = remaining
      start = new Date().getTime()
      timerInstance = window.setTimeout(chunkComplete, period)
      console.log(remaining)
    }
  }
}

export default ATimer

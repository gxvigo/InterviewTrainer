/////////////////////////////////////////////////
/* ES5, using Bluebird */
var isMomHappy = true;

// Promise
var willIGetNewPhone = new Promise(
  function (resolve, reject) {
    if (isMomHappy) {
      var phone = {
        brand: 'Samsung',
        color: 'black'
      };
      resolve(phone);
    } else {
      var reason = new Error('mom is not happy');
      reject(reason);
    }
  }
);


// call our promise
var askMom = function () {
  willIGetNewPhone
    .then(function (fulfilled) {
      // yay, you got a new phone
      console.log(fulfilled);
    })
    .catch(function (error) {
      // ops, mom don't buy it
      console.log(error.message);
    });
}

askMom();



////
/// **** chain promise

var isMomHappy = true;

// 1nd promise
var willIGetNewPhone = new Promise(
  function (resolve, reject) {
    if (isMomHappy) {
      var phone = {
        brand: 'Samsung',
        color: 'black'
      };
      resolve(phone);
    } else {
      var reason = new Error('mom is not happy');
      reject(reason);
    }
  }
);


// 2nd promise
var showOff = function (phone) {
    var message = 'Hey friend, I have a new ' +
                phone.color + ' ' + phone.brand + ' phone';

    return Promise.resolve(message);
};


// call our promise
var askMom = function () {
    willIGetNewPhone
    .then(showOff) // chain it here
    .then(function (fulfilled) {
            console.log(fulfilled);
         // output: 'Hey friend, I have a new black Samsung phone.'
        })
        .catch(function (error) {
            // oops, mom don't buy it
            console.log(error.message);
         // output: 'mom is not happy'
        });
};

askMom();



/// Return directly a Promise and pass paramteres

function delay(myDelay) {
  // `delay` returns a promise
  return new Promise(function (resolve, reject) {
    // Only `delay` is able to resolve or reject the promise
    setTimeout(function () {
      resolve(42); // After 3 seconds, resolve the promise with value 42
    }, myDelay);
  });
}

delay(500)
  .then(function (v) { // `delay` returns a promise
    console.log(v); // Log the value once it is resolved
  })
  .catch(function (v) {
    // Or do something else if it is rejected 
    // (it would not happen in this example, since `reject` is not called).
  });


/*

  ////// Chain Promise

  var firstMethod = function() {
    return new Promise(function(resolve, reject){
       setTimeout(function() {
          console.log('first method completed');
          resolve({data: '123'});
       }, 2000);
    });
 };
  
  
 var secondMethod = function(someStuff) {
    return new Promise(function(resolve, reject){
       setTimeout(function() {
          console.log('second method completed');
          resolve({newData: someStuff.data + ' some more data'});
       }, 2000);
    });
 };
  
 var thirdMethod = function(someStuff) {
    return new Promise(function(resolve, reject){
       setTimeout(function() {
          console.log('third method completed');
          resolve({result: someStuff.newData});
       }, 3000);
    });
 };
  
 firstMethod()
    .then(secondMethod)
    .then(thirdMethod);

*/

    $(function) {

  var config = {
      apiKey: "AIzaSyC1ExUJJP4F6OThM-xxO-Qlf6YVYD9kuCw",
      authDomain: "hi-firebase.firebaseapp.com",
      databaseURL: "https://hi-firebase.firebaseio.com",
      storageBucket: "hi-firebase.appspot.com",
      messagingSenderId: "689327491709"
  };
     firebase.initializeApp(config);

  var database = firebase.database();

    $('#submit').on('click', function(e) {

        e.preventDefault();

		var trainName = $('#trainName').val().trim();
        var Destination = $('#Destination').val().trim();
        var firstTrain = $('#firstTrain').val().trim();
        var Frequency = $('#Frequency').val().trim();

        var newRecord = database.ref().push({
            trainName: trainName,
            Destination: Destination,
            firstTrain: firstTrain,
            Frequency: Frequency,
            
        });



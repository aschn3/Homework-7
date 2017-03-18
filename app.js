    $(function() {

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
            dateAdded: firebase.database.ServerValue.TIMESTAMP

        });

        var ID = newRecord.key;

        database.ref(ID).update({
            ID: ID
        })

        $('#trainName').val('');
        $('#Destination').val('');
        $('#firstTrain').val('');
        $('#Frequency').val('');
    })

  database.ref().orderByChild("dateAdded").limitToLast(5).on("child_added", function(snapshot) {
        var table = $('.table');
        var row = $('<tr>');

        //moment({ // Options here }).format('HHmm')
        //moment("02:00 PM", "h:mm A").format("HH:mm")

        var firstTrain = moment(snapshot.val().firstTrain, "HHmm");
        var Frequency = moment().diff(moment(firstTrain), "minutes");
        console.log(Frequency);
         console.log("test"+firstTrain);
       var firstTraintime = moment(firstTrain).subtract(1, "years");
            console.log(firstTraintime);

       
            var now = moment();
      

       var currentTime = moment();
       console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

      var diffTime = moment().diff(moment(firstTraintime), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime); 

      var tRemainder = diffTime % (Number(Frequency));
    console.log(tRemainder);

      var tMinutesTillTrain =(Number(Frequency)) - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        row.append('<td>' + snapshot.val().trainName + '</td>').append('<td>' + snapshot.val().Destination + '</td>').append('<td>' + snapshot.val().Frequency + '</td>').append('<td>' + snapshot.val().nextTrain + '</td>').append('<td>' + snapshot.val().tMinutesTillTrain + '</td>');
        table.append(row);

    });


});


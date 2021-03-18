var ghToken = "DEADBEEFDEADBEEFDEADBEEFDEADBEEF";
// FormApp.getActiveForm();

// function createTrigger() {
//   let form = FormApp.getActiveForm();
//   ScriptApp.newTrigger('onSubmit')
//       .forForm(form)
//       .onFormSubmit()
//       .create();
// }

function onSubmit(e){
  Logger.log(JSON.stringify(e))
  Logger.log(e)
  Logger.log(e.response)

  let responses = e.response.getItemResponses()

  var title = responses[0].getResponse() + " " + responses[4].getResponse();
  
  var body = "## Details\n\n";

  for (i = 0; i<responses.length ; i++){
    var itemResponse = responses[i];
    body += "### " + itemResponse.getItem().getTitle() + "\n\n" + 
      itemResponse.getResponse() + "\n\n";
  }

  var type = "Bug"; // e.g., Bug, Enhancement, Question
  var priority = "priority-high";

  var payload = {
    "title": title,
    "body": body,
    "labels": [
         type,
         priority
     ]
  };

  var options = {
    "method": "POST",
    "headers": {
      "Authorization": "token " + ghToken,
      // "Authorization": ghToken,
      "Accept": "application/vnd.github.v3+json"
    },
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };

  var response = UrlFetchApp.fetch(
    "https://api.github.com/repos/rnpgp/security-reports/issues",
    options
  );
}

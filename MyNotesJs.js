var btnSave = document.getElementById("save_now");
var btnDelete = document.getElementsByName("delete_now");

var arrayNotes = [];
var arrayDates = [];

btnSave.onclick = SaveNote;

Initialize();

function Initialize() {
    arrayNotes = JSON.parse(localStorage.allNotes);
    arrayDates = JSON.parse(localStorage.allDates);
    PrintAllNotes();
    btnDelete = document.getElementsByName("delete_now")
    for (var i = 0; i < arrayNotes.length; i++) {
        btnDelete[i].onclick = DeleteItem;
    }
   
}

function SaveNote() {
    if (document.getElementById("text").value != "" && document.getElementById("date").value != "")
    {
        //Save the note in the array of Notes
        arrayNotes.push(document.getElementById("text").value);
        localStorage.allNotes = JSON.stringify(arrayNotes);

        //Save the note in the array of Dates
        arrayDates.push(document.getElementById("date").value);
        localStorage.allDates = JSON.stringify(arrayDates);

        // update the site
        PrintAllNotes();

        btnDelete = document.getElementsByName("delete_now");
        for (var i = 0; i < arrayNotes.length; i++) {
            btnDelete[i].onclick = DeleteItem;
        }
    }
    else
    {
        alert("אחד מהשדות ריקות לכן לא ניתן לשמור , אנא תשלים את פעולתך");
    }

    
}

function DeleteItem() {
    console.log(this.getAttribute("index"));
    var index = this.getAttribute("index");

    arrayNotes.splice(index, 1);
    arrayDates.splice(index, 1);
    localStorage.allNotes = JSON.stringify(arrayNotes);
    localStorage.allDates = JSON.stringify(arrayDates);

    document.querySelector("div[index='" + index + "']").className += " deleteNoteAnimation";
    setTimeout(function myfunction() {PrintAllNotes();},4000);
    
    
}


function PrintAllNotes() {
    var printNote = "";
    for (var i = 0; i < arrayNotes.length; i++) {
        printNote += '<div class="myNote" index='+i+'>'+
                '<button type="button" class="btn btn-default btn-sm button_id" name="delete_now" index="' + i + '">' +
                    '<span class="glyphicon glyphicon-trash span_id index="'+i+'"></span>' +
                '</button>'+
                '<p class="note" index='+i+'>' + arrayNotes[i] + '</p>' +
                '<p class="date" index=' + i + '>' + arrayDates[i] + '</p>' +
        '</div>';
    }
    document.getElementById("allNotes").innerHTML = printNote;
    document.getElementById("text").value = "";
    document.getElementById("date").value = "";

    btnDelete = document.getElementsByName("delete_now")
    for (var i = 0; i < arrayNotes.length; i++) {
        btnDelete[i].onclick = DeleteItem;
    }
}
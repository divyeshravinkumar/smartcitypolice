function showParking() {
    document.getElementById("parking").style.display = "block";
}

function showTraffic() {
    document.getElementById("traffic").style.display = "block";
}

function submitTraffic() {
    var location = document.getElementById("location").value;
    var violation = document.getElementById("violation").value;
    var type = document.getElementById("trafficType").value;

    if (location == "" || violation == "" || type == "") {
        document.getElementById("trafficMessage").innerHTML =
            "Please fill all traffic report fields.";
        return;
    }

    document.getElementById("trafficMessage").innerHTML =
        "Traffic report submitted successfully!";
}

function showReport() {
    document.getElementById("report").style.display = "block";
}
function submitReport() {
var reportNumber = Math.floor(Math.random() * 9000) + 1000;
var reportId = "CR-" + reportNumber;
    var location = document.getElementById("reportLocation").value;
    var type = document.getElementById("reportType").value;
    var details = document.getElementById("reportDetails").value;

    if (location == "" || type == "" || details == "") {
        document.getElementById("reportMessage").innerHTML =
            "Please fill all report fields.";
        return;
    }

    document.getElementById("reportMessage").innerHTML =
        "Citizen report submitted successfully!";

    document.getElementById("reportStatus").innerHTML =
        "Report ID: " + reportId + "<br>Status: Submitted";
localStorage.setItem("reportId", reportId);
localStorage.setItem("reportStatus", "Submitted");
supabaseClient
    .from('citizen_reports')
    .insert([{
        report_id: reportId,
        location: location,
        report_type: type,
        details: details,
        status: 'Submitted'
    }])
    .then(({ error }) => {
        if (error) {
            console.error('Supabase save failed:', error.message);
            alert('Report could not be saved to the database. Please try again.');
        }
    });
}

function bookParking(spaceId) {
    var space = document.getElementById(spaceId);
    var text = space.innerHTML;
    var number = parseInt(text);

    if (number > 0) {
        number = number - 1;
        space.innerHTML = number + " spaces available";
        alert("Parking slot booked successfully!");
    } else {
        alert("No parking spaces available!");
    }
}
function trackReport() {
    var enteredId = document.getElementById("trackReportId").value;
    var savedId = localStorage.getItem("reportId");
    var savedStatus = localStorage.getItem("reportStatus");

    if (enteredId == "") {
        document.getElementById("trackingMessage").innerHTML =
            "Please enter a Report ID.";
        return;
    }

    if (enteredId == savedId) {
        document.getElementById("trackingMessage").innerHTML =
            "Report found! Status: " + savedStatus;
    } else {
        document.getElementById("trackingMessage").innerHTML =
            "Report ID not found.";
    }
}

/* Supabase connection */
const SUPABASE_URL = "https://jzkvuaqhigbkqxnlalcq.supabase.co";
const SUPABASE_KEY = "sb_publishable_vWeX4b7V49o5VMxNfqcj6w_2bLdbQwG";
const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
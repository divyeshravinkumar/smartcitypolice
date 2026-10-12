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
// Smart Cops 360 Citizen Help Assistant
(function () {
  const toggle = document.getElementById("chat-toggle");
  const box = document.getElementById("chat-box");
  const close = document.getElementById("chat-close");
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const messages = document.getElementById("chat-messages");

  // Stop safely if the chat HTML is missing
  if (!toggle || !box || !close || !form || !input || !messages) {
    console.warn("Citizen Help Assistant: chat elements not found.");
    return;
  }

  toggle.addEventListener("click", function () {
    box.hidden = false;
    toggle.hidden = true;
    input.focus();
  });

  close.addEventListener("click", function () {
    box.hidden = true;
    toggle.hidden = false;
  });

  function addMessage(text, className) {
    const message = document.createElement("p");
    message.className = className;
    message.textContent = text;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  }

  function getReply(message) {
    const text = message.toLowerCase().trim();

    if (/\b(hi|hello|hey)\b/.test(text)) {
      return "Hello! Welcome to Smart Cops 360. How can I help you?";
    }

    if (text.includes("help") || text.includes("features")) {
      return "I can guide you about parking, traffic information, violation reporting, and complaint status.";
    }

    if (text.includes("parking") || text.includes("park")) {
      if (/\b(available|free|empty|vacancy)\b/.test(text)) {
        return "Open Parking Finder on the website to check the parking information currently provided.";
      }
      return "Use Parking Finder to view parking locations and the availability information shown on the website.";
    }

    if (
      text.includes("complaint") ||
      text.includes("report") ||
      text.includes("violation") ||
      text.includes("illegal parking")
    ) {
      return "Open the Report Violation or Citizen Reporting section, fill in the required details, confirm the location, and submit. Follow the website's instructions for any photo attachment.";
    }

    if (
      text.includes("status") ||
      text.includes("pending") ||
      text.includes("resolved") ||
      text.includes("track")
    ) {
      return "Open the report tracking section and enter your report ID. The displayed status depends on the report information available to the website.";
    }

    if (
      text.includes("traffic") ||
      text.includes("road") ||
      text.includes("jam")
    ) {
      return "Open the Traffic section to view the traffic information available in this prototype. Please follow official instructions for urgent road hazards.";
    }

    if (
      text.includes("police") ||
      text.includes("dashboard") ||
      text.includes("admin")
    ) {
      return "The admin dashboard is intended for authorized staff to review submitted reports and manage their status.";
    }

    return "I can help with parking, traffic, violation reporting, and complaint tracking. Try asking about one of these topics.";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const question = input.value.trim();
    if (!question) return;

    addMessage(question, "user-message");
    input.value = "";

    const reply = getReply(question);
    addMessage(reply, "bot-message");
  });
})();

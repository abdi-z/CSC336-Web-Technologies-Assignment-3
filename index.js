$(document).ready(() => {
  loadJobs();
  let d = new Date();
  $(".display-5").prepend(d.toDateString());
  $("#jobs").on("click", ".btn-danger", handleDelete);
  $("#jobs").on("click", ".btn-secondary", handleUpdate);
  $("#addBtn").on("click", addJob);
  $("#updateSave").click(() => {
    var id = $("#updateId").val();
    var type = $("#updateType").val();
    var budget = $("#updateBudget").val();
    var description = $("#updateDes").val();
    console.log(description);
    $.ajax({
      url: "https://restapi-crud-by-ar.herokuapp.com/api/jobs/" + id,
      data: { type, budget, description },
      method: "PUT",
      success: (res) => {
        console.log(res);
        loadJobs();
        $("#updateModal").modal("hide");
      },
    });
  });
});

function handleUpdate() {
  var btn = $(this);
  var parentDiv = btn.closest(".compJ");

  let id = parentDiv.attr("data-id");
  // console.log(id);
  $.get(
    "https://restapi-crud-by-ar.herokuapp.com/api/jobs/" + id,
    function (response) {
      $("#updateId").val(response[0]._id);
      $("#updateType").val(response[0].type);
      $("#updateBudget").val(response[0].budget);
      $("#updateDes").val(response[0].description);

      $("#updateModal").modal("show");
    }
  );
  // console.log("worked upd");
}

function addJob() {
  var type = $("#type").val();
  var budget = $("#budget").val();
  var description = $("#description").val();
  $.ajax({
    url: "https://restapi-crud-by-ar.herokuapp.com/api/jobs/",
    method: "POST",
    data: { type, budget, description },
    success: (res) => {
      // console.log(res);
      $("#type").val("");
      $("#budget").val("");
      $("#description").val("");
      loadJobs();
    },
  });
}

function handleDelete() {
  var btn = $(this);
  var parentDiv = btn.closest(".compJ");
  let id = parentDiv.attr("data-id");
  $.ajax({
    url: "https://restapi-crud-by-ar.herokuapp.com/api/jobs/" + id,
    method: "DELETE",
    success: function () {
      loadJobs(); //deleted the record so we reload the section
    },
  });
}

function loadJobs() {
  $.ajax({
    url: "https://restapi-crud-by-ar.herokuapp.com/api/jobs",
    method: "GET",
    success: function (res) {
      // console.log(res);
      var jobs = $("#jobs");
      jobs.empty();
      for (var i = 0; i < res.length; i++) {
        jobs.append(`<div class="compJ bord p-2 m-4" data-id=${res[i]._id}><h3><b>${res[i].type}</b></h3>
        <div class="flexi"><h5>Est.Budget: Rs <i>${res[i].budget}</i></h5>
        <div>
        <button class="btn btn-secondary">Edit</button>

        <button class="btn btn-danger">Delete</button>
        </div>
        
        </div>
        
        <h5>Details:</h5>
        <p>${res[i].description}</p>
        </div>`);
      }
    },
    error: function () {
      var jobs = $("#jobs");
      jobs.empty();
      jobs.append("Something went wrong...");
    },
  });
}

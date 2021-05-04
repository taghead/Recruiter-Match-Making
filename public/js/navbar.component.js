/*
This component requires the following html
<nav class="z-depth-0 grey darken-4" id="navbar"></nav>
<div id="modals"></div>
*/
import("./navbar.auth.helpers.js");

document.addEventListener('DOMContentLoaded', function () {
  const modalOptions = {
    onCloseEnd: () => {
      resetForm();
    }
  };
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals, modalOptions);
  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
});

function resetForm() { 

}

// Set up navbar
document.getElementById("navbar").innerHTML = `
<!-- NAVBAR -->

  <div class="nav-wrapper container">
    
    <!-- LEFT ALIGNED -->
    <ul class="nav-mobile" class="left">
      <li class="logo">
        <a href="#" class="btn active teal lighten-1 hide-on-small"><i class="material-icons">business_center</i></a>
      </li>
      <li class="admin-logged-in waves-effect waves-light" style="display: " > <!-- REPLACE WITH NONE-->
        <a href="admin_users.html" class="lightgrey-text modal-trigger">USERS</a>
      </li>
      <li class="admin-logged-in waves-effect waves-light" style="display: " >
        <a href="admin_jobs.html" class="lightgrey-text modal-trigger">JOBS</a>
      </li>
    </ul>

    <!-- RIGHT ALIGNED -->
    <ul id="nav-mobile" class="right">
      <li class="logged-in waves-effect waves-light" style="display: ">
        <a href="#create" class="lightgrey-text modal-trigger" data-target="modal-create">Create</a>
      </li>
      <li class="logged-in waves-effect waves-light" style="display: ">
        <a href="#edit" class="lightgrey-text modal-trigger" data-target="modal-edit">Edit</a>
      </li>
      <li class="logged-in waves-effect waves-light" style="display: ">
        <a href="#account" class="lightgrey-text modal-trigger" data-target="modal-account">Account</a>
      </li>
      <li class="logged-in waves-effect waves-light" style="display: ">
        <a href="#logout" class="lightgrey-text" id="logout">Logout</a>
      </li>
      <li class="logged-out waves-effect waves-light" style="display: ">
        <a href="#login" class="lightgrey-text modal-trigger" data-target="modal-login">Login</a>
      </li>
    </ul>
  </div>
`

// Setup modals
document.getElementById("modals").innerHTML = ` 
<!-- Login Modal -->
<div id="modal-login" class="modal">
  <div class="modal-content">
    <h4>Login</h4><br />
    <div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
      <div class="mdl-card__title mdl-color--light-blue-600 mdl-color-text--white">
        <h2 class="mdl-card__title-text">Firebase Email &amp; Password Authentication</h2>
      </div>
      <div class="mdl-card__supporting-text mdl-color-text--grey-600">
        <p>Enter an email and password below and either sign in to an existing account or sign up</p>

        <input class="mdl-textfield__input" style="display:inline;width:auto;" type="text" id="email" name="email" placeholder="Email"/>
        &nbsp;&nbsp;&nbsp;
        <input class="mdl-textfield__input" style="display:inline;width:auto;" type="password" id="password" name="password" placeholder="Password"/>
        <br/><br/>
        <button disabled class="mdl-button mdl-js-button mdl-button--raised" id="sign-in" name="signin">Sign In</button>
        &nbsp;&nbsp;&nbsp;
        <button class="mdl-button mdl-js-button mdl-button--raised" id="quickstart-sign-up" name="signup">Sign Up</button>
        
        <label for="role">Choose a role:</label>

        <select class="mdl-textfield__input" style="display:inline;width:auto;" name="role" id="role">
          <option value="employee">Employee</option>
          <option value="employer">Employer</option>
        </select> 
        
        &nbsp;&nbsp;&nbsp;
        <button class="mdl-button mdl-js-button mdl-button--raised" disabled id="verify-email" name="verify-email">Send Email Verification</button>
        &nbsp;&nbsp;&nbsp;
        <button class="mdl-button mdl-js-button mdl-button--raised" id="password-reset" name="verify-email">Send Password Reset Email</button>
        
        <div class="quickstart-user-details-container">
          Status: <span id="sign-in-status">Unknown</span>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Create Modal -->
<div id="modal-create" class="modal">
  <div class="modal-content">
    <h4>Create new job</h4><br />
    <form id="create-job-form">
      <table>
        <tr> <!-- Job Name -->
          <th> Job Name: </th><td>
            <div class="left container input-field">
              <input type="text" id="job-name" placeholder="Name" required>
            </div>
          </td>
        </tr>
        <tr> <!-- Job Description -->
          <th> Job Description: </th><td>
            <div class="left container input-field">
              <textarea id="description" class="materialize-textarea"></textarea>
            </div>
          </td>
        </tr>
        <tr> <!-- Job Skills -->
          <th> Job Skills: </th><td>
            <div class="left container">
              <select class="browser-default" id="skill-one">
                <option value="" disabled selected>Select Skill</option>
                <option value="">No Skill</option>
                <!-- Content loaded by Javascript -->
              </select>
            </div>
            <!-- 
              Going to keep this clear as there may be a better solution in the
              function. If we want an "unlimited" number of skills we can use a
              function to inject more html that contains a list of skills. Only
              issue I can see is potentially loading in "unlimited" skills for
              editing. This would require loops to load and save skills for edits
            -->
          </td>
        </tr>
      </table><br />
      <button class="btn teal lighten-1 z-depth-0 wave-effect waves-light right">Create
        <i class="material-icons right">add</i>
      </button>
    </form>
  </div>
</div>

<!-- Edit Modal -->
<div id="modal-edit" class="modal">
  <div class="modal-content">
    <h4>Edit existing job</h4>

    <!-- Load list of jobs -->
    <form id="edit-job-list">
      <select class="browser-default" id="tour-edit-list">
        <!-- Content loaded by Javascript -->

        <!-- 
          This area could also have a better solution as well
        -->
      </select>
    </form><br />

    <!-- Edit job details -->
    <form id="edit-job-form">
      <table>
        <tr> <!-- Job Name -->
          <th> Job Name: </th><td>
            <div class="left container input-field">
              <input type="text" id="job-name" placeholder="Name" required>
            </div>
          </td>
        </tr>
        <tr> <!-- Job Description -->
          <th> Job Description: </th><td>
            <div class="left container input-field">
              <textarea id="description" class="materialize-textarea"></textarea>
            </div>
          </td>
        </tr>
        <tr> <!-- Job Skills -->
          <th> Job Skills: </th><td>
            <div class="left container">
              <select class="browser-default" id="skill-one">
                <option value="" disabled selected>Select Skill</option>
                <option value="">No Skill</option>
                <!-- Content loaded by Javascript -->
              </select>
            </div>
            <!-- 
              Going to keep this clear as there may be a better solution in the
              function. If we want an "unlimited" number of skills we can use a
              function to inject more html that contains a list of skills. Only
              issue I can see is potentially loading in "unlimited" skills for
              editing. This would require loops to load and save skills for edits
            -->
          </td>
        </tr>
      </table>
    </form><br />
    <!-- Edit tour button-->
    <button class="btn orange darken-2 z-depth-0 waves-effect waves-light right" onclick="editJob()"> Edit 
      <i class="material-icons right">edit</i>
    </button>
    <!-- Delete tour button -->
    <button class="btn red darken-2 z-depth-0 waves-effect waves-light" onclick="deleteJob()"> Delete 
      <i class="material-icons right">delete</i>
    </button>
  </div>
</div>

<!-- Account Modal -->
<div id="modal-account" class="modal">
  <div class="modal-content center-align">
    <h4>Account Details</h4>
    <div class="account-details container">
      <table>
        <tr>
          <th> Email: </th><td id="account-email">placeholder-email</td>
          <th> Role: </th><td id="account-role">placeholder-role</td>
        </tr>
      </table>
    </div>
  </div>
</div>
`
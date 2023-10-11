<template>
  <title>BillBuddy</title>

<body>
  <nav class="navbar navbar-expand-sm navbar-dark" style="background-color: #05c8f7;"
    aria-label="Second navbar example">
    <div class="container-fluid">

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample02"
        aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample02">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link text-white" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" href="Tools/Toolpage.html">Tools</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active text-black" aria-current="page" href="billbuddy.html">BillBuddy</a>
          </li>
        </ul>
        <div class="position-absolute top-0 start-50 translate-middle-x">
          <a href="#"><img src="logo\itiner-easy.svg"  style="width: 100px; height: 100px; margin-top: -15px;"
            alt="itiner-easy logo"></a>
        </div>
        <ul class="navbar-nav pull-right">
          <li class="nav-item">
            <a class="nav-link rounded"
              style="background-color: white; color: #05c8f7; padding-left: 20px; padding-right: 20px;"
              href="#">Profile</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div style="margin-left: 30px; margin-top: 30px;">
    <h1>Current Trips</h1>
    <h7>No trips at the moment</h7>
    <br><br>
    <a href="addtrip.html" style="color: gray;">Add a Trip Now!</a>
  </div>

</body>

</template>


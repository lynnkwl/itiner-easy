<template>
  <title>BillBuddy</title>

<body>

  <div style="margin-left: 30px; margin-top: 30px;">
    <h1>Current Trips</h1>
    <h7>No trips at the moment</h7>
    <br><br>
    <router-link to="/addtrip"> Add a Trip Now! </router-link>
  </div>

  <div>
    <!-- testing database using books -->

    <form class="add">
      <label for="title">Title:</label>
      <input type="text" name="title" required>
      <label for="author">Author:</label>
      <input type="text" name="author" required>

      <button>add a new book</button>
    </form>

    <form class="delete">
      <label for="id">Document id:</label>
      <input type="text" name="id" required>

      <button>delete a book</button>
    </form>


    
  </div>
</body>

</template>


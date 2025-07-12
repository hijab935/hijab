<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Group Name Locker</title>
  <style>
    body {
      background-color: #111;
      font-family: sans-serif;
      color: #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .card {
      background: #222;
      padding: 20px;
      border-radius: 12px;
      width: 300px;
    }
    h2 {
      color: #7aa2f7;
      text-align: center;
    }
    textarea, input {
      width: 100%;
      margin: 8px 0;
      padding: 10px;
      background: #333;
      color: #ccc;
      border: none;
      border-radius: 6px;
    }
    button {
      width: 100%;
      background: #7aa2f7;
      color: #fff;
      padding: 10px;
      border: none;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="card">
    <h2>🔒 Group Name Locker</h2>
    <textarea id="appstate" rows="5" placeholder="Paste appstate JSON here"></textarea>
    <input id="group_id" type="text" placeholder="Group ID" />
    <input id="group_name" type="text" placeholder="Enforced Group Name" />
    <button onclick="startMonitor()">Start Monitoring</button>
  </div>

  <script>
    async function startMonitor() {
      const appstate = document.getElementById("appstate").value;
      const groupId = document.getElementById("group_id").value;
      const groupName = document.getElementById("group_name").value;

      const res = await fetch("/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appstate, groupId, groupName }),
      });

      const data = await res.json();
      alert(data.message || "Started!");
    }
  </script>
</body>
</html>

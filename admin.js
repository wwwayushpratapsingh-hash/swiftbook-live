// --- Admin credentials ---
const adminAccounts = [
  {id: "admin1", pass: "1234"}
];

// --- Users storage ---
let users = [];
let liveMatches = [];

// --- Admin Login ---
function loginAdmin(){
  const id = document.getElementById("admin-id").value;
  const pass = document.getElementById("admin-pass").value;
  const admin = adminAccounts.find(a=>a.id===id && a.pass===pass);
  if(admin){
    document.getElementById("admin-login").style.display="none";
    document.getElementById("admin-panel").style.display="block";
    updateUserList();
    updateMatchList();
  } else {
    alert("Invalid Admin Login");
  }
}

// --- Create User ---
function createUser(){
  const id = document.getElementById("new-user-id").value;
  const pass = document.getElementById("new-user-pass").value;
  const points = parseInt(document.getElementById("new-user-points").value);
  if(!id || !pass || isNaN(points)) return alert("Fill all fields");

  if(users.find(u=>u.id===id)) return alert("User exists");

  users.push({id, pass, points, bets: []});
  updateUserList();
  alert(`User ${id} created with ${points} points`);
}

// --- Update User Table ---
function updateUserList(){
  const list = document.getElementById("user-list");
  list.innerHTML = "";
  users.forEach((u, i)=>{
    const row = document.createElement("tr");
    row.innerHTML = `<td>${u.id}</td>
                     <td>${u.points}</td>
                     <td>
                       <button onclick="adjustPoints(${i}, 100)">+100</button>
                       <button onclick="adjustPoints(${i}, -100)">-100</button>
                     </td>`;
    list.appendChild(row);
  });
}

// --- Adjust Points ---
function adjustPoints(idx, amt){
  users[idx].points += amt;
  if(users[idx].points < 0) users[idx].points = 0;
  updateUserList();
}

// --- Live Match Management ---
function addMatch(){
  const name = document.getElementById("match-name").value;
  const odd = parseFloat(document.getElementById("match-odd").value);
  if(!name || isNaN(odd)) return alert("Enter match & odd");
  
  const match = liveMatches.find(m=>m.name===name);
  if(match) match.odd = odd;
  else liveMatches.push({name, odd});
  
  updateMatchList();
}

function updateMatchList(){
  const list = document.getElementById("match-list");
  list.innerHTML = "";
  liveMatches.forEach((m,i)=>{
    const div = document.createElement("div");
    div.innerText = `${m.name} - Odd: ${m.odd}`;
    list.appendChild(div);
  });
     }

/*
  ====== EDIT THESE 3 SETTINGS ======
  1) YOUR_EMAIL: the email address that should receive responses.
  2) INSTAGRAM_USERNAME: your Instagram username, without @.
  3) THANK_YOU_URL: leave blank unless you want a custom thank-you page.
*/
const CONFIG = {
  YOUR_EMAIL: "YOUR_EMAIL@example.com",
  INSTAGRAM_USERNAME: "YOUR_INSTAGRAM_USERNAME",
  THANK_YOU_URL: ""
};

if(CONFIG.YOUR_EMAIL.includes("YOUR_EMAIL") || CONFIG.INSTAGRAM_USERNAME.includes("YOUR_INSTAGRAM")){
  console.warn("⚠️ Update CONFIG.YOUR_EMAIL and CONFIG.INSTAGRAM_USERNAME at the top of script.js before publishing.");
}

const state = { answer:"", date:"", time:"", vibe:"", message:"" };
const screens = [...document.querySelectorAll(".screen")];
const dots = document.getElementById("stepDots");
const declinedIndex = screens.findIndex(s=>s.id==="declinedScreen");

for(let i=0;i<screens.length;i++){
  const d=document.createElement("i");
  if(i===0)d.classList.add("active");
  if(i===declinedIndex)d.style.display="none";
  dots.appendChild(d);
}

function goTo(step){
  screens.forEach((s,i)=>s.classList.toggle("active",i===step));
  [...dots.children].forEach((d,i)=>d.classList.toggle("active",i===step));
  window.scrollTo({top:0,behavior:"smooth"});
}
function chooseAnswer(value){
  state.answer=value;
  if(value==="No"){ goTo(declinedIndex); return; }
  goTo(1);
}
function nextFromDate(){
  const date=document.getElementById("date").value;
  const time=document.getElementById("time").value;
  if(!date || !time){ alert("Pick a date and time first 😊"); return; }
  state.date=date; state.time=time; goTo(2);
}
function pickVibe(btn,value){
  document.querySelectorAll("#vibeOptions button").forEach(b=>b.classList.remove("selected"));
  btn.classList.add("selected"); state.vibe=value;
}
function nextFromVibe(){
  if(!state.vibe){alert("Pick one option first ✨");return;}
  goTo(3);
}
function formatDate(v){
  if(!v)return "Not selected";
  const [y,m,d]=v.split("-");
  return `${d}/${m}/${y}`;
}
function showSummary(){
  state.message=document.getElementById("message").value.trim() || "No extra note.";
  document.getElementById("summary").innerHTML =
    `<div><strong>Answer:</strong> ${escapeHtml(state.answer)}</div>
     <div><strong>Date:</strong> ${formatDate(state.date)}</div>
     <div><strong>Time:</strong> ${escapeHtml(state.time)}</div>
     <div><strong>Plan:</strong> ${escapeHtml(state.vibe)}</div>
     <div><strong>Note:</strong> ${escapeHtml(state.message)}</div>`;

  document.getElementById("fAnswer").value=state.answer;
  document.getElementById("fDate").value=formatDate(state.date);
  document.getElementById("fTime").value=state.time;
  document.getElementById("fVibe").value=state.vibe;
  document.getElementById("fMessage").value=state.message;

  const form=document.getElementById("responseForm");
  form.action=`https://formsubmit.co/${encodeURIComponent(CONFIG.YOUR_EMAIL)}`;
  if(CONFIG.THANK_YOU_URL) form.insertAdjacentHTML("beforeend",
    `<input type="hidden" name="_next" value="${escapeHtml(CONFIG.THANK_YOU_URL)}">`);

  const ig=document.getElementById("instagramBtn");
  ig.href=`https://ig.me/m/${encodeURIComponent(CONFIG.INSTAGRAM_USERNAME)}`;
  goTo(4);
}
function escapeHtml(s){
  return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
}

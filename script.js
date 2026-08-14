const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
$("#menu").onclick=()=>$("#nav").classList.toggle("open");$$("#nav a").forEach(a=>a.onclick=()=>$("#nav").classList.remove("open"));
$$("[data-num]").forEach(el=>{let done=0;new IntersectionObserver(x=>{if(x[0].isIntersecting&&!done){done=1;let n=+el.dataset.num,c=0,t=setInterval(()=>{c+=Math.ceil(n/25);if(c>=n){c=n;clearInterval(t)}el.textContent=c},35)}}).observe(el)});

const lessons={
climate:["🌡️","Climate Change",["Greenhouse gases trap heat.","Fossil-fuel use is a major source of CO₂.","Warming affects oceans, ice and ecosystems."],["Improve energy efficiency.","Expand lower-emission energy.","Protect and restore ecosystems."],"Remember: the climate system is connected to the atmosphere, oceans, land and living systems."],
forest:["🌳","Forests & Biodiversity",["Forests provide habitat.","Vegetation stores carbon.","Healthy forests support soils and water cycles."],["Prevent unnecessary forest loss.","Restore degraded ecosystems.","Support sustainable land use."],"Remember: protecting an ecosystem is usually easier than rebuilding everything after it is lost."],
ocean:["🌊","Oceans & Plastic",["Oceans absorb heat.","Rivers can transport plastic to the sea.","Pollution can affect food webs and wildlife."],["Reduce unnecessary single-use plastic.","Keep litter away from drains.","Improve collection and recovery."],"Remember: what is dropped on a street can eventually travel much farther than you expect."],
energy:["⚡","Energy & Renewables",["Energy powers homes, transport and industry.","Efficiency reduces wasted energy.","Solar and wind generate electricity without burning fossil fuels."],["Use energy efficiently.","Expand clean electricity.","Improve grids and storage."],"Remember: clean energy is one part of a larger system that also needs efficiency, storage and reliable infrastructure."],
waste:["♻️","Waste & Circular Economy",["Products require resources.","Repair can extend product life.","Recycling works best when materials are collected correctly."],["Refuse unnecessary items.","Reuse and repair.","Recycle according to local rules."],"Remember: the best waste is often the waste that was never created."],
water:["💧","Water & Ecosystems",["Fresh water is limited.","Pollution can reduce usable water.","Wetlands and forests help regulate water systems."],["Fix leaks and reduce waste.","Keep chemicals and litter out of waterways.","Protect watersheds."],"Remember: water connects households, farms, cities and ecosystems."]
};
function loadLesson(k){let x=lessons[k];$("#lessonIcon").textContent=x[0];$("#lessonTitle").textContent=x[1];$("#lessonText").textContent=x[2][0]+" "+x[2][1]+" "+x[2][2];$("#lessonWhy").innerHTML=x[2].map(v=>`<li>${v}</li>`).join("");$("#lessonHelp").innerHTML=x[3].map(v=>`<li>${v}</li>`).join("");$("#lessonTake").textContent=x[4]}
$$("[data-tab]").forEach(b=>b.onclick=()=>{$$("[data-tab]").forEach(x=>x.classList.remove("active"));b.classList.add("active");loadLesson(b.dataset.tab)});loadLesson("climate");

function impact(){let a=+$("#t").value,b=+$("#e").value,c=+$("#s").value,n=Math.round((a+b+c)/30*100);$("#score").textContent=n;let m=["Great baseline — keep learning.","Lower your biggest category first.","Nice! Small repeated changes can add up.","Strong improvement — consistency matters."];$("#tip").textContent=m[Math.min(3,Math.floor((10-n/10)/3))]}
["t","e","s"].forEach(x=>$("#"+x).oninput=impact);impact();

const waste={battery:"Use a battery/e-waste collection point where available. Do not assume batteries belong in ordinary recycling.",bottle:"Empty and clean it, then follow your local recycling rules because accepted plastics differ.",phone:"Consider repair, reuse, trade-in or responsible e-waste collection.",banana:"Many food scraps can be composted, but accepted items depend on your local composting system."};
function wasteShow(k){$("#wanswer").textContent=waste[k]||"No match. Check your local waste authority's instructions."}$$("[data-w]").forEach(b=>b.onclick=()=>{wasteShow(b.dataset.w);$("#wsearch").value=b.dataset.w});$("#wsearch").oninput=e=>{let q=e.target.value.toLowerCase(),k=Object.keys(waste).find(x=>q.includes(x));$("#wanswer").textContent=k?waste[k]:(q?"No match — try battery, bottle, phone or banana.":"Type an item.")};

$("#flow").onclick=()=>{$(".network").classList.toggle("flow");$("#flowText").textContent="Energy flow simulated: generation → homes → school → health facility."};

const quiz=[
["What usually comes before recycling in the waste hierarchy?",["Creating more waste","Reducing unnecessary waste","Buying disposable products","Throwing everything away"],1,"Reduction and prevention come before recycling."],
["Why are forests important?",["Only for timber","For habitat, carbon storage, soils and water systems","They create no ecosystem benefits","They stop every natural disaster"],1,"Forests provide multiple ecosystem services."],
["Which is a circular-economy action?",["Repairing a product","Replacing everything yearly","Throwing usable items away","Buying extra packaging"],0,"Repair keeps products useful for longer."],
["Why should batteries be handled carefully?",["They are food","They can require specialized collection and contain recoverable materials","They are always compostable","They disappear immediately"],1,"Battery collection systems help manage materials safely."],
["What is the strongest overall approach to environmental challenges?",["Only personal action","Only government action","Only technology","Personal, community, business and policy action together"],3,"Large environmental challenges need action at multiple levels."]
];let qi=0,sc=0,locked=false;
function render(){let z=quiz[qi];$("#qnum").textContent=`Question ${qi+1} of ${quiz.length}`;$("#bar").style.width=((qi+1)/quiz.length*100)+"%";$("#q").textContent=z[0];$("#opts").innerHTML=z[1].map((v,i)=>`<button class="quiz-opt" data-i="${i}">${v}</button>`).join("");$("#explain").textContent="";$("#next").disabled=true;locked=false;$$(".quiz-opt").forEach(b=>b.onclick=()=>answer(+b.dataset.i))}
function answer(i){if(locked)return;locked=true;let z=quiz[qi];$$(".quiz-opt").forEach((b,j)=>{if(j===z[2])b.classList.add("correct");if(j===i&&i!==z[2])b.classList.add("wrong")});if(i===z[2])sc++;$("#explain").textContent=z[3];$("#next").disabled=false}
$("#next").onclick=()=>{if(qi<quiz.length-1){qi++;render()}else{$("#result").textContent=`Final score: ${sc}/${quiz.length} — ${sc>=4?"Excellent!":"Good start — review the lessons and try again."}`;$("#next").textContent="Restart";$("#next").onclick=()=>{qi=0;sc=0;$("#result").textContent="";$("#next").textContent="Next →";render()}}};render();

const data=[["🥤 Bottle","recycle"],["🍌 Banana peel","compost"],["🔋 Battery","special"],["📱 Phone","special"],["📦 Clean cardboard","recycle"],["🥬 Vegetable scraps","compost"],["🧻 Dirty tissue","landfill"]];let selected=null;
data.forEach((x,i)=>{let el=document.createElement("div");el.className="item";el.textContent=x[0];el.dataset.bin=x[1];el.draggable=true;el.id="it"+i;el.onclick=()=>selected=el;el.ondragstart=e=>e.dataTransfer.setData("id",el.id);$("#items").appendChild(el)});
$$(".bins button").forEach(b=>{b.ondragover=e=>e.preventDefault();b.ondrop=e=>{e.preventDefault();sort(document.getElementById(e.dataTransfer.getData("id")),b.dataset.bin)};b.onclick=()=>{if(selected)sort(selected,b.dataset.bin)}});
function sort(el,target){if(!el)return;if(el.dataset.bin===target){el.remove();$("#gameMsg").textContent="✓ Correct — nice sorting!";selected=null}else $("#gameMsg").textContent="Not quite. Think about the material and local collection rules."}

$("#range").oninput=e=>$("#dry").style.width=e.target.value+"%";
let pledges=1248;$("#pledge").onclick=()=>{pledges++;$("#count").textContent=pledges;$("#pledge").textContent="✓ Pledge Recorded!";$("#pledge").style.transform="scale(1.03)";setTimeout(()=>{$("#pledge").textContent="💚 I Pledge to Reduce Single-Use Plastic";$("#pledge").style.transform=""},1500)};

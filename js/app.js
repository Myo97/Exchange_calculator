let input = document.getElementById("input");
let from = document.getElementById("from");
let to = document.getElementById("to");
let result = document.getElementById("result");
let historyList = document.getElementById("historyList");

function createOption(x,y,z){
    let o = document.createElement("option");
    let t = document.createTextNode(y);
    o.appendChild(t);
    o.setAttribute("value",toNum(z))   //orginal z value is string with comma so need to built toNum() function
    x.appendChild(o);
}
function toNum(x){
    return Number(x.replace(",",""));  //remove comma and change to number
}

for(x in data.rates){
    // console.log(x);
    // console.log(data.rates[x]);
    createOption(from,x,data.rates[x]);
    createOption(to,x,data.rates[x]);
}

function createtr(x){
    let tr = document.createElement("tr");
    let rowspacer = document.querySelector(".rowspacer");
    let td = document.createElement("td");
    
    if(rowspacer){
        rowspacer.remove();
    }
    x.map(function(el){
        let td = document.createElement("td");
        let text = document.createTextNode(el); 
       
        td.appendChild(text);
        tr.appendChild(td);

    });
    historyList.appendChild(tr);
};

function store(){
    localStorage.setItem("record",historyList.innerHTML)
};

document.getElementById("calc").addEventListener('submit',function(e){
    e.preventDefault();
    //get stage
    let x = input.value;
    let y = from.value;
    let z = to.value;
    console.log(x,y,z);

    //process
    let fromText = x +" "+ from.options[from.selectedIndex].innerText; //x ka value . a nout ka har ka usd eur lote chin loa
    let toText =  to.options[to.selectedIndex].innerText; //x ka value . a nout ka har ka usd eur lote chin loa
    let first = x * y;
    // console.log(first);
    let second = first/ z;
    let resultNum = second.toFixed(2);
    // console.log(second.toFixed(2));
    let date = new Date().toLocaleString();
    let arr = [date,fromText,toText,resultNum];
    createtr(arr);
    store();

    //set Stage
    result.innerHTML = resultNum;
    input.value = "";
    input.focus();
    from.value = "";
    to.value = "1"; // mmk value = 1;
    });

// iife function use for when reload it work
(function(){
    if(localStorage.getItem("record")){
        historyList.innerHTML = localStorage.getItem("record");
    }else{
        historyList.innerHTML = `<tr class="rowspacer"><td colspan="4">There is No Record</td><tr>`
    }
})();

function changeMode(){
    document.body.classList.toggle("night-mode");
    document.getElementById("mode-icon").classList.toggle("fa-sun")
}

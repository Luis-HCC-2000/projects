function palindrome() {
  let str=document.getElementById("PalindromeInput").value;
  str=str.replace(/[^0-9a-z]/gi,"").toLowerCase()
  let invStr=""
  for(let i=str.length-1 ; i>=0 ; i--){
    invStr+=str[i]
  }
  let ans=document.getElementById("PalindromeAns");
  if(invStr==str){
    ans.style.backgroundColor="green";
    ans.innerText="It is a Palindrome"
  }
  else{
   ans.style.backgroundColor="red";
   ans.innerText="It isn´t a Palindrome"
  }
}

function convertToRoman() {
	let num=document.getElementById("RomanInput").value;
  let convArr=[["I","V"],["X","L"],["C","D"],["M"]];
  num=num.toString().split("").map(str=>Number(str));
  let convIndex=num.length-1;
  let ansArr="";
  for (let elem of num){
    if (elem<5){
      if (elem==4){
        ansArr+=convArr[convIndex][0]+convArr[convIndex][1];
      }
      else{
        for (let i=1 ; i<=elem ; i++){
          ansArr+=convArr[convIndex][0];
        }
      }
    }
    else{
       if (elem==9){
          ansArr+=convArr[convIndex][0]+ convArr[convIndex+1][0];
        }
        else{
      ansArr+=convArr[convIndex][1];
      elem-=5;
      for (let i=1; i<=elem ; i++){
        ansArr+=convArr[convIndex][0];
      }
    }
    }
    convIndex-=1;
  }
  document.getElementById("RomanAns").innerText=ansArr;
}


function rot() {
	let str=document.getElementById("CaesarsInput").value;
  let ans=""
  let convArr=Array.from(Array(26).keys()).map(elem=> elem+65).map(elem=>String.fromCharCode(elem))
  for (let elem of str){
    let idx=convArr.indexOf(elem);  
    if (idx==-1){
      ans+=elem;
    }
    else{
      if (idx>=13){
        ans+=convArr[idx-13]
      }
      else{
        ans+=convArr[26-(13-idx)]
      }
    }
  }
  document.getElementById("CaesarsAns").innerText=ans;
}

function telephoneCheck() {
  let ans=false
	let str=document.getElementById("TelephoneInput").value;
  if (/^[0-9|\-|\s|\(|\)]+$/.test(str)){
    if(str.length>=10){
      if(str.match(/\d/g).length==11 && str[0]!=1 ){
        return (false);
      }
      if(str.match(/\d/g).length>11){
        return (false);
      }
      if(/\-/.test(str) && str.match(/\-/g).length>2){
        return (false);
      }
      if(/[\(\)]/.test(str)){
        if(str.match(/[\(\)]/g).length!=2){
          return (false);
        }
        if (str[str.indexOf("(")+4]!=")"){
          return (false);
        }
      }
      return (true);
    }
  }
  return (false);
}


function isEnoughMoney(change,cid){
  let moneyAvailable=0;
  for (let idx in cid){
    moneyAvailable+=cid[idx][1];
  }
  if (moneyAvailable<change){
    return false;
  }
  return true;
}
function checkCashRegister(price, cash, cid) {
  let change=(cash-price)*100;
  if (change ==0){
    return {status: "CLOSED", change:cid}
  }
    for (idx in cid){
    cid[idx][1]*=100;
  }
  
  if(!isEnoughMoney(change,cid)){
    return {status: "INSUFFICIENT_FUNDS", change: []}
  }
  let moneyAvailable=0;
  for (let idx in cid){
    moneyAvailable+=cid[idx][1];
  }
  if (moneyAvailable==change){
    return {status: "CLOSED", change:cid.map(elem=>[elem[0], elem[1]/100])}
  }
  let values=[ 
    ["PENNY", 1],
    ["NICKEL",5],
    ["DIME", 10],
    ["QUARTER", 25],
    ["ONE", 100],
    ["FIVE", 500],
    ["TEN", 1000],
    ["TWENTY", 2000],
    ["ONE HUNDRED", 10000]
  ]
  let ans=[ 
    ["PENNY", 0],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
  ]

  let idx=8
  while (idx>=0){
    if (values[idx][1]<=change && cid[idx][1]>0){
        ans[idx][1]+=values[idx][1]
        cid[idx][1]-=values[idx][1]
        change-=values[idx][1]
    }
    else{
      idx-=1
      }
  }
  if (change!=0){
    return {status: "INSUFFICIENT_FUNDS", change: []}
  }
  else{   
    ans=ans.filter(elem=>elem[1]!=0);
    ans=ans.map(elem=>[elem[0], elem[1]/100])
    return  {status: "OPEN", change: ans.reverse()}
  }
}


document.getElementById("PalindromeSend").addEventListener("click", palindrome, true);
document.getElementById("RomanSend").addEventListener("click", convertToRoman, true);
document.getElementById("CaesarsSend").addEventListener("click", rot, true)
document.getElementById("TelephoneSend").addEventListener("click", func=()=>document.getElementById("TelephoneAns").innerText=telephoneCheck(), true)
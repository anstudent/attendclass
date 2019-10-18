	var DOTW = "ErrorforSave";
 
  var saveKeyForClass =  new Array(85);
  var saveKeyCount = 0;
  var selectedTable;
  
  var logObj = [];



ons.ready(function() {
         
      });
	  /*ons.ready(function() {
      console.log("Onsen UI is ready!");
     
      //saveKeyCount++; 
      
          //var nendOriginalElem = angular.element(document.querySelector('#nend_wrapper'));
          //var nendInjectElem1 = angular.element(document.querySelector('#new_nend_wrapper'));
          //nendInjectElem1.replaceWith(nendOriginalElem.clone());
    
      //alert(saveKeyCount);
      
      //loadName();
    });*/
    
  window.onload = function(){
    loadName();
     if(localStorage.getItem("saveKeyCount") != null && JSON.parse(localStorage.getItem("saveKeyCount")) != 0){
      saveKeyCount = JSON.parse(localStorage.getItem("saveKeyCount"));
     }
  }



    document.addEventListener('show', function(event) {
      var page = event.target;
      var titleElement = document.querySelector('#toolbar-title');

      if (page.matches('#first-page')) {
        titleElement.innerHTML = '';
      } else if (page.matches('#second-page')) {
        titleElement.innerHTML = '';
        //alert("change");
       // document.getElementById("logshowbtn2").click();
       loadLog(0,2);
       scrollBottom();
       //nLoadLog();
      }
    });

    if (ons.platform.isIPhoneX()) {
      document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
      document.documentElement.setAttribute('onsflag-iphonex-landscape', '');
    }

function getNow() {
	var now = new Date();
	var year = now.getFullYear();
	var mon = now.getMonth()+1; //１を足すこと
	var day = now.getDate();
	var hour = now.getHours();
	var min = now.getMinutes();
	//var sec = now.getSeconds();
  var you = now.getDay(); //曜日(0～6=日～土)

	//曜日の選択肢
	var youbi = new Array("日","月","火","水","木","金","土");
	//出力用
	//var s = year + "年" + mon + "月" + day + "日 (" + youbi[you] + ")";
	//出力用
	var s =  mon + "/" + day + "(" + youbi[you] + ")" + hour + ":" + min + "記録"; 
  //forSave = s;
	return s;
}
/*var makeData = function(time){
  
  var dayoftheweek = document.getElementById("choose-DotW");
  DOTW = dayoftheweek.value;
  var copyObj=document.getElementById("forSaveWindow");
  var atendswitch = document.getElementById("abswitch");
  var classdate = document.getElementById("classdate").value;
  if(atendswitch.checked){
    DOTW = "出席 " + DOTW  + time + "限 " + getNow() ;
  }
  else if(atendswitch.checked == false){
    DOTW = "欠席 " + DOTW  + time + "限 " + getNow();
  }
  else{
    DOTW = DOTW  + time + "限 " + getNow();
  }
  //forSave = DOTW;
  copyObj.innerHTML = DOTW;
}*/

//実際の表示動作
/*var logWill = function(time){
  
  makeData(time);
  var dialog = document.getElementById('dialog1');

  if (dialog) {
    dialog.show();
  } else {
    ons.createElement('dialog.html', { append: true })
      .then(function(dialog) {
        dialog.show();
      });
  }
}*/

function dayMinus(){
var dayIndex =  document.getElementById("choose-date");

if(dayIndex.selectedIndex<1){
  dayIndex.selectedIndex = 30;
}else{
  dayIndex.selectedIndex--;
}

}

function logAppear(table){
//alert(table);
 var tableNum = Number(table);
 var youbi = new Array("月","火","水","木","金","土","日");
 var time = tableNum % 10;
 var youbinum = Math.floor(tableNum/10)-1;
  var dayoftheweek = youbi[youbinum];
  DOTW = dayoftheweek;
  var copyObj=document.getElementById("forSaveWindow");
  var atendswitch = document.getElementById("abswitch");

  //var year = now.getFullYear();
  var now = new Date();
	var mon = now.getMonth(); 
	var day = now.getDate()-1;
  //var you = now.getDay(); //曜日(0～6=日～土)
document.getElementById("choose-month").selectedIndex = mon;
document.getElementById("choose-date").selectedIndex = day;
  if(atendswitch.checked == true){
    DOTW = "出席 " + DOTW  + time + "限";
  }
  else if(atendswitch.checked == false){
    DOTW = "欠席 " + DOTW  + time + "限";
  }
  else{
    DOTW = DOTW  + time + "限 " ;
  }
  copyObj.innerHTML = DOTW;

  var dialog = document.getElementById('dialog1');
  if (dialog) {
    dialog.show();
  } else {
    ons.createElement('dialog.html', { append: true })
      .then(function(dialog) {
        dialog.show();
      });
  }
}

function changeName(table){
   var dialog = document.getElementById('namedialog');
   loadNameforInput(table);
   dialog.show();
   
  selectedTable = table;
}

function onTapTable(table){
  var editable = document.getElementById("edit");
  if(editable.checked){
  changeName(table);
  }
  else{
    logAppear(table);
    //ons.notification.alert("編集モードではありません");
  }
}

var showLog = function(time){
  loadLog();
  var dialog = document.querySelector('dialog1');
  
  if (dialog) {
    dialog.show();
  } else {
    ons.createElement('dialog.html', { append: true })
      .then(function(dialog) {
        dialog.show();
      });
  }
};
//ダイアログを隠す
var hideDialog = function(id) {
  document
    .getElementById(id)
    .hide();
}
//ローカルストレージに記録
var saveData = function(){
  var classMonth = document.getElementById("choose-month").value;
  var classDate = document.getElementById("choose-date").value;
  
  var str ="(" + String(classMonth) + "/" + String(classDate) + ") ";
  DOTW = DOTW + str + getNow();
  //alert(JSON.stringify(DOTW));
  saveKeyCount++;
  localStorage.setItem("log" + String(saveKeyCount), JSON.stringify(DOTW));
  localStorage.setItem("saveKeyCount",JSON.stringify(saveKeyCount));
  //ons.notification.toast('保存しました', {timeout: 200});
  ons.notification.toast('保存しました', {timeout: 800 ,animation: 'fall'});
}
function getLogList() {
    var list = localStorage.getItem("logObj");
    if (list == null) {
        return new Array();
    } else {
        return JSON.parse(list);
    }
}



function nLoadLog(){
 var strage = JSON.parse(localStorage.getItem("logObj"));
 console.log(strage);
 if(strage != null){
  //logObj.push(strage); 
 writeLogList(strage);
 }
  
}

function writeLogList(strage){
  var logstr;
  var htmlId;
  for(var i=0,len = strage.length ; i<len; i++){
    logstr += logObj[i];
    logstr += "<br>";
  }
  if(logstr == "" || logstr == null){
    logstr = "記録がありません";
  }
  htmlId = document.getElementById("loglist2");
  htmlId.innerHTML = logstr;
}

var loadLog = function(mode,page){
  var dataStr ;

  //alert("getda");
  var data = "";
  var i = 1;
  do{
    dataStr = localStorage.getItem("log"+String(i));
    if(dataStr != null){
      if(mode == 1){
        var checkstr = JSON.parse(dataStr);
        if(checkstr.indexOf(document.getElementById("choose-DotW").value) == 3){
            data += JSON.parse(dataStr);
            data += "<br>";
        }

      }else if(mode == 0){
    data += JSON.parse(dataStr);
    data += "<br>";
    }
    else{
      alert("BAd loadlog mode");
    }
    i++
    }
   else if(dataStr == null){
     // alert(i);
      break;
    }
  }while(true)
  if(data == "" || data == null){
    data = "記録がありません";
  }
  var copyObj;
  if(page == 2){
    copyObj=document.getElementById("loglist2");
    if(mode == 1){
      document.querySelector('#toolbar-title').innerHTML = ""
    }
    else if(mode == 0){
      document.querySelector('#toolbar-title').innerHTML = ""
    }
  }
  else if(page == 1){
    copyObj=document.getElementById("loglist");
  }
  copyObj.innerHTML = data;
}

function saveName(){
  var nameclass = document.getElementById("changearea").value;
  var name = document.getElementById(selectedTable);
  name.innerHTML = (nameclass);
//ストレージ保存
//alert(selectedTable);
//var tablenum = Number(selectedTable);
  //saveKeyForClass[tablenum] = "class" + selectedTable;
  //saveKey.push("class" + String(saveKeyCount));
  //alert(saveKeyForClass[tablenum]);
  localStorage.setItem( "class" + selectedTable, JSON.stringify(nameclass));
}
function loadName(){
  var dataStr;
  for(counter = 11;counter < 79;counter++ ){
    //alert("209");
    dataStr = localStorage.getItem("class" + String(counter));
    //alert("211");
    if(dataStr != null  && JSON.parse(dataStr) != ""){
     // alert(dataStr);
      document.getElementById(String(counter)).innerHTML = JSON.parse(dataStr);
    }
  }
}
function loadNameforInput(table){
  var tablenumI = Number(table);
  var dataStr;
  dataStr = localStorage.getItem("class"+table);
  if(dataStr != null && JSON.parse(dataStr) != ""){
   dataStr = JSON.parse(dataStr);
  }
  else{
    dataStr = "";
  }
  document.getElementById("changearea").value = dataStr;
}

function loadFocus(){
  alert("aaaa");
  document.getElementById("changearea").focus();
}

function testLoad(){
  localStorage.clear();
  saveKeyCount = 0;
  localStorage.setItem("saveKeyCount",JSON.stringify(saveKeyCount));

  //loadName();
  loadLog(1,1);
}
function clearDialog(){
  var dialog = document.getElementById('cleardialog');
  if (dialog) {
    dialog.show();
  } else {
    ons.createElement('dialog.html', { append: true })
      .then(function(dialog) {
        dialog.show();
      });
  }
}

function clearAll(){
  localStorage.clear();
  saveKeyCount = 0;
  localStorage.setItem("saveKeyCount",JSON.stringify(saveKeyCount));
  //ons-alert-dia("初期化しました。反映するにはアプリ再起動の必要があります。");
  document.getElementById("cleared").show();
}

function scrollBottom(){
  var page2 = document.getElementById("second-page");
 page2.scrollTop = page2.scrollHeight;
}

function scrolltoTop(){
  var page2 = document.getElementById("second-page");
  page2.scrollTop = 0;
}
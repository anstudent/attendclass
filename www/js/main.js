	var DOTW = "forSave";
  var saveKey = [];
  var saveKeyForClass =  new Array(85);
  var saveKeyCount = 0;
  var selectedTable;
  
  
  ons.ready(function() {
      console.log("Onsen UI is ready!");
    });

    document.addEventListener('show', function(event) {
      var page = event.target;
      var titleElement = document.querySelector('#toolbar-title');

      if (page.matches('#first-page')) {
        titleElement.innerHTML = 'My app - Page 1';
      } else if (page.matches('#second-page')) {
        titleElement.innerHTML = '出欠記録';
        //alert("change");
       // document.getElementById("logshowbtn2").click();
       loadLog(0,2);
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
	var sec = now.getSeconds();
  var you = now.getDay(); //曜日(0～6=日～土)

	//曜日の選択肢
	var youbi = new Array("日","月","火","水","木","金","土");
	//出力用
	//var s = year + "年" + mon + "月" + day + "日 (" + youbi[you] + ")";
	//出力用
	var s =  mon + "/" + day + "(" + youbi[you] + ")" + hour + "時" + min + "分記録"; 
  //forSave = s;
	return s;
}
var makeData = function(time){
  
  var dayoftheweek = document.getElementById("choose-DotW");
  DOTW = dayoftheweek.value;
  var copyObj=document.getElementById("forSaveWindow");
  var atendswitch = document.getElementById("abswitch");

  if(atendswitch.checked){
    DOTW = "出席 " + DOTW  + time + "限 " + getNow();
  }
  else if(atendswitch.checked == false){
    DOTW = "欠席 " + DOTW  + time + "限 " + getNow();
  }
  else{
    DOTW = DOTW  + time + "限 " + getNow();
  }
  //forSave = DOTW;
  copyObj.innerHTML = DOTW;
}

//実際の表示動作
var logWill = function(time){
  
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

  if(atendswitch.checked){
    DOTW = "出席 " + DOTW  + time + "限 " + getNow();
  }
  else if(atendswitch.checked == false){
    DOTW = "欠席 " + DOTW  + time + "限 " + getNow();
  }
  else{
    DOTW = DOTW  + time + "限 " + getNow();
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

  saveKey.push("log" + String(saveKeyCount));
  localStorage.setItem(saveKey[saveKeyCount], JSON.stringify(DOTW));
  //ons.notification.alert('保存しました');
  saveKeyCount++;
}
var loadLog = function(mode,page){
  var dataStr ;

  //alert("getda");
  var data = "";
  var i = 0;
  do{
    dataStr = localStorage.getItem(saveKey[i]);
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
    
    if(dataStr == null){
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
      document.querySelector('#toolbar-title').innerHTML = "出欠記録曜日別"
    }
    else if(mode == 0){
      document.querySelector('#toolbar-title').innerHTML = "出欠記録全一覧"
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
var tablenum = Number(selectedTable);
  saveKeyForClass[tablenum] = "class" + selectedTable;
  //saveKey.push("class" + String(saveKeyCount));
  //alert(saveKeyForClass[tablenum]);
  localStorage.setItem(saveKeyForClass[tablenum], JSON.stringify(nameclass));
}
function loadName(){
  var dataStr;
  for(counter = 11;counter < 79;counter++ ){
    //alert("209");
    dataStr = localStorage.getItem(saveKeyForClass[counter]);
    //alert("211");
    if(dataStr != null  && JSON.parse(dataStr) != ""){
      alert(dataStr);
      document.getElementById(String(counter)).innerHTML = JSON.parse(dataStr);
    }
  }
}
function loadNameforInput(table){
  var tablenumI = Number(table);
  var dataStr;
  dataStr = localStorage.getItem(saveKeyForClass[tablenumI]);
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
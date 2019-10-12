	var DOTW = "forSave";
  var saveKey = [];
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
        titleElement.innerHTML = 'My app - Page 2';
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
  
  var dayoftheweek = document.getElementById("choose-DotW")
  DOTW = dayoftheweek.value
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
};

function changeName(table){
   var dialog = document.getElementById('namedialog');
   dialog.show();
  selectedTable = table;
}
function onTapTable(table){
  var editable = document.getElementById("edit");
  if(editable.checked){
  changeName(table);
  }
  else{
    ons.notification.alert("編集モードではありません");
  }
}

var showLog = function(time){
  getData();
  var dialog = document.getElementById('dialog1');
  
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

  saveKey.push(String(saveKeyCount))
  localStorage.setItem(saveKey[saveKeyCount], JSON.stringify(DOTW));
  //ons.notification.alert('保存しました');
  saveKeyCount++;
}
var getData = function(){
  var dataStr ;
  var data = "";
  for(var i=0; i<saveKeyCount;i++){
    dataStr = localStorage.getItem(saveKey[i]);
    data += JSON.parse(dataStr);
    data += "<br>";
  }
  var copyObj=document.getElementById("loglist");
  copyObj.innerHTML = data;
  copyObj=document.getElementById("loglist2");
  copyObj.innerHTML = data;
}

function saveName(){
  var nameclass = document.getElementById("changearea").value;
var name = document.getElementById(selectedTable);
  name.innerHTML = (nameclass);
}
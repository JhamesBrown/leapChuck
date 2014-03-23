#pragma strict
var preyKilled : int = 0;

var fontSize : int = 100;


function Start () {

}

function Update () {
	
}

function OnGUI () {
	
	GUI.skin.label.fontSize = GUI.skin.box.fontSize = GUI.skin.button.fontSize = fontSize;
	GUI.Box (Rect (Screen.width - 300,200,120,120), "" + preyKilled);
	
}

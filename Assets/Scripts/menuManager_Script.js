#pragma strict
var fontSize : int = 100;

function Start () {

}

function Update () {

}

function OnGUI () {
	GUI.backgroundColor = Color.clear;
	GUI.skin.label.fontSize = GUI.skin.box.fontSize = GUI.skin.button.fontSize = fontSize;
	
	
	if (GUI.Button(Rect (Screen.width/2-60,200,300,120), "Play")){
	  Application.LoadLevel(1);
	  return;
	}	
	if (GUI.Button(Rect (Screen.width/2-60,350,300,120), "Quit")){
	  Application.Quit();
	  return;
	}
}
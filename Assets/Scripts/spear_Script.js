#pragma strict
var gameManager : gameManager_Script;

function Start () {

}

function Update () {
	transform.Translate(Vector3(0,10*Time.deltaTime,0));
	if (transform.position.x >= 15 || transform.position.x <= -15 || transform.position.y >= 15 || transform.position.y <= -15){
		Destroy(gameObject);
	}
}

//function OnCollisionEnter2D (col : Collision2D){
//
//	if(col.gameObject.tag =="Prey"){
//			
//			//gameManager.preyKilled++;
//			Destroy(col.gameObject);
//			Destroy(gameObject);
//	}
//}
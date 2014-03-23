#pragma strict
var gameManager : gameManager_Script;
var walking : boolean;


function Start () {
	walking = true;
	gameManager = GameObject.FindGameObjectWithTag("gameManager").GetComponent(gameManager_Script);
}

function Update () {
	if (walking){
		transform.Translate(Vector3.right * Time.deltaTime);
	}
//conditions for removing enemy from hierarchy
	if (transform.position.x < -6 || transform.position.x > 6 ){
		Destroy(gameObject);
	} 

}

function OnCollisionEnter2D (col : Collision2D){

	if(col.gameObject.tag =="Spear"){
	
			gameManager.preyKilled++;
			Destroy(col.gameObject);
			Destroy(gameObject);
			
	}
}
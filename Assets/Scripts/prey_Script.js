#pragma strict

var walking : boolean;


function Start () {
	walking = true;
	
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
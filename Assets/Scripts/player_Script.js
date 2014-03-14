#pragma strict
var leftStickX : float;
var leftStickY : float;
var idleCount : int;

var state : int;

function Start () {
	state = 1;
}

function Update () {

	if (state == 1){ //standing

		if (Input.GetAxis("leftStickX")>0.2 || Input.GetAxis("leftStickX")<-0.2){
				transform.Translate(Vector3(Input.GetAxis("leftStickX") * Time.deltaTime,0,0));
		}
		if (Input.GetAxis("leftStickY")>0.2){
			state = 2; // change to crouch
		}
	}
	if (state == 2){ //crouch
		if (Input.GetAxis("leftStickY")<-0.2){
			state = 3; // change to jump
		}
	}
	if (state == 3){ //jump
		transform.Translate(Vector3(0,2 * Time.deltaTime,0));
		if (transform.position.y >= 3){
			state = 4; // change to fall at the top of the jump
		}
	}
	if (state == 4){ //falling
		transform.Translate(Vector3(0,-2 * Time.deltaTime,0));
		if (transform.position.y <= 0.5){
			state = 1; // change to stand at the bottom of the fall
		}
	}
		

}

function checkIdle(){
	if (Input.GetAxis("leftStickY")>-0.2 && Input.GetAxis("leftStickY")<0.2 ){
		yield WaitForSeconds(0.1);
			if (Input.GetAxis("leftStickY")>-0.2 && Input.GetAxis("leftStickY")<0.2 ){
				state = 1; // back to stand due to stick sitting in centre
		}
	}
}
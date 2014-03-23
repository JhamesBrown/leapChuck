#pragma strict
var leftStickX : float;
var leftStickY : float;
var idleCount : int;
var idle : boolean = true;

var state : int;
var keysValue : float;

var jumpForce : float = 5;
var jumpStart : float;

var spear : Transform;
var firingAngle : float;
@HideInInspector var rotation = Quaternion.identity;

var idleSprite : Sprite;
var crouchSprite : Sprite;
var jumpSprite : Sprite;
var fallSprite: Sprite;

function Start () {
	state = 1;
}

function Update () {
	
	

	if (state == 1){ //standing
		if(transform.position.y <= 0.55) {
			 transform.Translate(Vector3(0,3 * Time.deltaTime,0));
		}
	
		GetComponent(SpriteRenderer).sprite = idleSprite;
		transform.Translate(Vector3(0,0,0));
		if (Input.GetAxis("leftStickX")>0.4 || Input.GetAxis("leftStickX")<-0.4){
				transform.Translate(Vector3(Input.GetAxis("leftStickX") * Time.deltaTime,0,0));
		}
		
		if (Input.GetKey("a")){ //keys input fix
				transform.Translate(Vector3(-1 * Time.deltaTime,0,0));
		}
		if (Input.GetKey("d")){ //keys input fix
				transform.Translate(Vector3(1 * Time.deltaTime,0,0));
		}
		
		
		if (Input.GetAxis("leftStickY")>0.2 || Input.GetKey("s")){
			state = 2; // change to crouch
			idle = false;
		}
	}
	if (state == 2){ //crouch
		if(transform.position.y >= 0.12) {
			 transform.Translate(Vector3(0,-1 * Time.deltaTime,0));
		}
		GetComponent(SpriteRenderer).sprite = crouchSprite;
		if (Input.GetAxis("leftStickY")<0.1 || Input.GetKey("w")){
			
			jumpStart = Time.time;
			state = 3; // change to jump
		}
		if (Input.GetKeyUp("s") || Input.GetAxis("leftStickY") < 0.4){
			checkIdle();
		}
		
		
	}
	if (state == 3){ //jump
	GetComponent(SpriteRenderer).sprite = jumpSprite;
	
	idle = false;
		transform.Translate(Vector3(0,jumpForce * Time.deltaTime - (((Time.time-jumpStart)*(Time.time-jumpStart))*0.1),0)); 
		if (jumpForce * Time.deltaTime - ((Time.time-jumpStart)*0.1)<= 0){
			Instantiate (spear, Vector3(transform.position.x, transform.position.y, -1), rotation); 		//spear instantiate
			state = 4; // change to fall at the top of the jump
		}
		
		//this section controls the firing angle
		if (Input.GetAxis("rightX") != 0){
		if (Input.GetAxis("rightX") > 0.05) {
			firingAngle = 270;
			
				if (Input.GetAxis("rightY") != 0) {
				firingAngle -= 90 * Input.GetAxis("rightY");
				}
			
		}
			
		if (Input.GetAxis("rightX") < -0.05) {
			firingAngle = 90;
		
				if (Input.GetAxis("rightY") != 0) {
				firingAngle += 90 * Input.GetAxis("rightY");
				}
		}
		rotation.eulerAngles = Vector3(0, 0, firingAngle);
		
		}
	}
	if (state == 4){ //falling
	GetComponent(SpriteRenderer).sprite = fallSprite;
		transform.Translate(Vector3(0,jumpForce * Time.deltaTime - (((Time.time-jumpStart)*(Time.time-jumpStart))*0.1),0));
		if (transform.position.y <= 0.5){
			state = 1; // change to stand at the bottom of the fall
		}
	}
		

}

function checkIdle(){
	if (idle == false && state == 2){
		if ((Input.GetAxis("leftStickY")<-0.1 || Input.GetAxis("leftStickY")>0.4) || Input.GetKey("s") || Input.GetKey("w")){
			idle = false;
		} else {
		state = 1; // back to stand due to stick sitting in centre
		idle = true;
		}
	}
}
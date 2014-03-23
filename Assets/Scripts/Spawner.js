#pragma strict
var basicPrey : Transform;
var spawnRate : int = 5;
var nextSpawn : int ;


function Start () {

}

function Update () {
	if(Time.time > nextSpawn){
		Instantiate (basicPrey, Vector3(-6, Random.Range(-0.6, -2.0), -1), Quaternion.identity);
		nextSpawn = Time.time + spawnRate;
	}
}
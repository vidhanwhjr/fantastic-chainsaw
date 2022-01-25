img = "";

object = [];
status1 = "";

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(640, 420);
    video.hide();
    object_dectector = ml5.objectDetector('cocossd', ModelLoded);
    document.getElementById('status').innerHTML = "Status- Detecting objects";
}

function ModelLoded(){
    console.log("Model Lo-dead");
    status1 = true;
}

function gotResults(error, results){
    if(error){
        console.error(error);

    }
    else{
        console.log(results);
        object = results;
    }
}


function draw(){
    image(video, 0, 0, 640, 420);

    if(status1 != ""){
        document.getElementById("status").innerHTML = "Status - Object detected";
        object_dectector.detect(video, gotResults);
        r = random(255);
        g = random(255);
        b = random(255);

        for(i = 0; i < object.length; i++){
            fill(r,g,b);
            accuracy = floor(object[i].confidence* 100);
            text(object[i].label + " " + accuracy + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}
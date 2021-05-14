video = ""
status = ""
objects = []
 
function setup() {
    canvas = createCanvas(480, 345)
    canvas.center()
}
 
function preload() {
        video = createVideo("video.mp4")
        video.hide()
}
 
function draw() {
    image(video, 0, 0, 480, 345)
    if (status != "") {
        objectDetector.detect(video, gotResult)
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected"
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected: " + objects.length
            
            fill("#FF0000")
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%", objects[i].x +15, objects[i].y +15)
            noFill()
            stroke("#FF0000")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects =  results
    }
}
 
function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
}
 
function modelLoaded() {
    console.log("Object Detection Successfully Started");
    video.loop()
    video.volume(0)
    video.speed(1)
    status = true
}

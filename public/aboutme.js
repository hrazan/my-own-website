
const circles = $('.image-buble-container');
console.log($(circles.get(0)).parent());
console.log($(circles.get(0)).parent().get(0) === $(circles.get(0)).parent().get(0));
var circleDiameter = $(circles.get(0)).outerWidth();

var circlesList = new Array();
console.log(circlesList.length);
circles.each(function() {
  console.log($(this));
  let x_  = Math.random() * ($(this).parent().width() - circleDiameter);
  let y_  = Math.random() * ($(this).parent().height() - circleDiameter);
  for (let j=0; j<circlesList.length; j++) {
    while ( (Math.pow(x_ - circlesList[j].x, 2) < Math.pow(circleDiameter, 2)) && (Math.pow(y_ - circlesList[j].y, 2) < Math.pow(circleDiameter, 2)) ){
      x_  = Math.random() * ($(this).parent().width() - circleDiameter);
      y_  = Math.random() * ($(this).parent().height() - circleDiameter);
    }
  }
  const dx_ = 0.5 * Math.random(); // Horizontal speed
  const dy_ = 0.5 * Math.random(); // Vertical speed
  circlesList.push({element: $(this), x: x_, y: y_, dx: dx_, dy: dy_});
});
console.log(circlesList.length);

function moveCircle() {
  let isWallCollide = false;
  circleDiameter = $(circles.get(0)).outerWidth();
  for(let i=0; i<circlesList.length; i++) {
    circlesList[i].x += circlesList[i].dx;
    circlesList[i].y += circlesList[i].dy;
    if (circlesList[i].x + circleDiameter > circlesList[i].element.parent().outerWidth() || circlesList[i].x < 0) {
      circlesList[i].dx = -circlesList[i].dx;
      console.log(`${circlesList[i].x}, ${circlesList[i].x + circleDiameter}, ${circlesList[i].element.parent().width()}`);
      isWallCollide = true;
    }
    if (circlesList[i].y + circleDiameter > circlesList[i].element.parent().height() || circlesList[i].y < 0) {
      circlesList[i].dy = -circlesList[i].dy;
      isWallCollide = true;
    }
    if (!isWallCollide) {
      for(let j=0; j<circlesList.length; j++) {
        if ((i != j) && (circlesList[i].element.parent().get(0) === circlesList[j].element.parent().get(0))) {
          const distanceX = circlesList[i].x - circlesList[j].x;
          const distanceY = circlesList[i].y - circlesList[j].y;
          const distance =  Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
          if (distance <= circleDiameter) {
            // Calculate normal vector
            const n = {x: distanceX / distance, y: distanceY/distance};

            // Calculate relative velocity
            const v1 = { x: circlesList[i].dx, y: circlesList[i].dy };
            const v2 = { x: circlesList[j].dx, y: circlesList[j].dy };
            const v_rel = { x: v1.x - v2.x, y: v1.y - v2.y };

            // Calculate velocity along the normal
            const v_rel_n = v_rel.x * n.x + v_rel.y * n.y;

            // If they are moving apart, do nothing
            if (v_rel_n > 0) return;

            // Calculate impulse
            const impulse = -2 * v_rel_n / 2; // Assuming equal masses (m1 = m2 = 1)

            // Update velocities
            circlesList[i].dx += impulse * n.x;
            circlesList[i].dy += impulse * n.y;
            circlesList[j].dx -= impulse * n.x;
            circlesList[j].dy -= impulse * n.y;
          }
        }
      }
    }
    
    circlesList[i].element.css({
      left: `${circlesList[i].x}px`,
      top: `${circlesList[i].y}px`
    });
  };
}

var x = new Array();
var y = new Array();
var dx = new Array();
var dy = new Array();
circles.each(function() {
  x.push(Math.random() * ($(this).parent().width() - circleDiameter));
  y.push(Math.random() * ($(this).parent().height() - circleDiameter));
  dx.push(1 + Math.random()); // Horizontal speed
  dy.push(1 + Math.random()); // Vertical speed
});
console.log(x);
console.log(y);
console.log(dx);
console.log(dy);

function moveCircle_() {
  for (let i=1; i<=circles.length; i++) {
    x[i-1] += dx[i-1];
    y[i-1] += dy[i-1];
    // Check for collisions with container edges
    if (x[i-1] + circleDiameter > $(`.container`).width() || x[i-1] < 0) {
      dx[i-1] = -dx[i-1]; // Reverse direction on horizontal collision
    }
    if (y[i-1] + circleDiameter > $(`.container`).height() || y[i-1] < 0) {
      dy[i-1] = -dy[i-1]; // Reverse direction on vertical collision
      // console.log(`${i}: ${y[i-1]}, ${y[i-1] + circleDiameter}, ${$(`.container`).height()}`);
    }

    $(circles.get(i-1)).css({
      left: `${x[i-1]}px`,
      top: `${y[i-1]}px`
    });
  }
}

setInterval(moveCircle, 10); // Update the circle position every 10 milliseconds
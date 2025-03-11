import Matter from "matter-js";

var startPosition = null;
var velocity = null;

export default function Physics(entities, { touches, time, dispatch }) {
  let engine = entities.engine;
  let world = engine.world;

  world.gravity.y = 0;
  world.gravity.x = 0;

  function handlePairCollision(pair) {
    var objA = pair.bodyA;
    var objB = pair.bodyB;
    if (objA.label === "Hole") {
      objB.killed = true;
      Matter.World.remove(world, objB);
    } else if (objB.label === "Hole") {
      objA.killed = true;
      Matter.World.remove(world, objA);
    }
  }

  Matter.Events.on(engine, "collisionStart", (event) => {
    event.pairs.forEach(handlePairCollision);
  });

  for (const [key, value] of Object.entries(entities)) {
    if (value.body && value.body.killed) {
      console.log("dead", key);
      if (key === "point") {
        dispatch({ type: "game_over" });
      } else {
        dispatch({ type: "new_point" });
      }
      delete entities[key];
    }
  }

  if (!entities.pointer) {
    console.warn("Warning: Pointer entity is missing!");
    return entities;
  }

  if (!entities.point || !entities.point.body) {
    console.warn("Warning: Cue ball entity (point) is missing!");
    return entities;
  }

  touches.forEach((t) => {
    switch (t.type) {
      case "start":
        startPosition = {
          x: t.event.pageX,
          y: t.event.pageY,
        };
        entities.pointer.pointPosition = entities.point.body.position;
        entities.pointer.start = startPosition;
        break;
      case "end": {
        if (velocity) {
          Matter.Body.setVelocity(entities.point.body, {
            x: velocity.x / 10,
            y: velocity.y / 10,
          });
        }
        startPosition = null;
        velocity = null;
        entities.pointer.start = null;
        entities.pointer.end = null;
        entities.pointer.pointPosition = null;
        break;
      }
      case "move": {
        const currentPosition = {
          x: t.event.pageX,
          y: t.event.pageY,
        };

        velocity = {
          x: startPosition.x - currentPosition.x,
          y: startPosition.y - currentPosition.y,
        };

        entities.pointer.end = currentPosition;
        break;
      }
      default:
        console.log("Unknown touch event type:", t.type);
        break;
    }
  });

  if (!startPosition) {
    Matter.Engine.update(engine, time.delta * 2);
  }

  return entities;
}

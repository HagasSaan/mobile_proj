import Matter from "matter-js";
import { Alert } from "react-native";
var startPosition = null;
var velocity = null;

export default function Physics(entities, { touches, time, dispatch }) {
  let engine = entities.engine;
  let world = engine.world;
  const gameEngineRef = entities.gameEngineRef; // Access gameEngineRef from entities

  world.gravity.y = 0;
  world.gravity.x = 0;
  function handlePairCollision(pair) {
    var objA = pair.bodyA;
    var objB = pair.bodyB;
    if (
      (objA.label === "Hole" || objB.label === "Hole") &&
      (objB.label === "Ball" || objB.label === "Ball")
    ) {
      dispatch({type: "game_over"})
      console.log("Game over");
      return;
    }
    if (objA.label === "Hole") {
      // console.log("removing due collision with hole: ", objB.label);
      objB.killed = true;
      Matter.World.remove(world, objB);
      gameEngineRef.current.dispatch({ type: "new_point" });
    } else if (objB.label === "Hole") {
      // console.log("removing due collision with hole: ", objA.label);
      objA.killed = true;
      Matter.World.remove(world, objA);
      gameEngineRef.current.dispatch({ type: "new_point" });
    }
  }

  Matter.Events.on(engine, "collisionStart", (event) => {
    event.pairs.forEach(handlePairCollision);
  });

  for (const [key, value] of Object.entries(entities)) {
    // console.log(key, value);
    if (value.body && value.body.killed) {
      console.log("dead", key, value);
      delete entities[key];
    }
  }

  touches.forEach((t) => {
    switch (t.type) {
      case "start":
        startPosition = {
          x: t.event.pageX,
          y: t.event.pageY,
        };
        entities.pointer.start = startPosition;
        console.log(t);
        break;
      case "end": {
        console.log(t, velocity);
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
        break;
      }
      case "move": {
        currentPosition = {
          x: t.event.pageX,
          y: t.event.pageY,
        };

        velocity = {
          x: startPosition.x - currentPosition.x,
          y: startPosition.y - currentPosition.y,
        };

        entities.pointer.end = currentPosition;

        // console.log(velocity);
        break;
      }
      case "press": {
        break;
      }
      case "long-press": {
        break;
      }
      default: {
        console.log("unknown type:", t.type);
        break;
      }
    }
  });

  if (!startPosition) {
    Matter.Engine.update(engine, time.delta);
  }

  return entities;
};

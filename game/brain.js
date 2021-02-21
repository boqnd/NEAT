async function brainRequest(currentBall, index) {
  let distance = Math.round(Math.min(
    (traps[0].x > Number.parseInt(currentBall.x) ? traps[0].x : 5000),
    (traps[1].x > Number.parseInt(currentBall.x) ? traps[1].x : 5000),
    (traps[2].x > Number.parseInt(currentBall.x) ? traps[2].x : 5000)))

  let res = distance*currentBall.weight + currentBall.bias
  if(res<=0)
  {
    jump[index] = 0;
  }else {
    jump[index] = 1
  }
  // if(distance < Number.parseInt(currentBall.x)+random(100,250)){
  //   jump[index] = 1
  // }else
  // {
  //   jump[index] = 0
  // }
}


// async function sendRequest(currentBall, index) {
//   await $.ajax({
//     url: `http://localhost:3000/${traps[0].x}/${traps[1].x}/${traps[2].x}/${currentBall.x}/${currentBall.y}/${score}`,
//     type: 'GET',
//     dataType: 'jsonp',
//     success: async function (result) {
//       await result.jump;
//       jump[index] = result.jump
//       return
//     }
//   });
// }
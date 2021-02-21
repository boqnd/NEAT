const express = require('express')
const app = express()
const port = 3000

app.get('/:trap1/:trap2/:trap3/:ballX/:ballY/:score', (req, res) => {
  let trap1 = req.params.trap1;
  let trap2 = req.params.trap2;
  let trap3 = req.params.trap3;
  
  let distance = Math.round(Math.min(
    (trap1 > Number.parseInt(req.params.ballX) ? trap1 : 5000),
    (trap2 > Number.parseInt(req.params.ballX) ? trap2 : 5000),
    (trap3 > Number.parseInt(req.params.ballX) ? trap3 : 5000)))

   //console.log(distance)
  // console.log(Number.parseInt(req.params.ballX)+190)
  //console.log(Number.parseInt(req.params.ballX))

  let jump = 0
  if(distance < Number.parseInt(req.params.ballX)+190){
    jump = 1
  }

  res.jsonp({
    "trap1-x": req.params.trap1,
    "trap2-x": req.params.trap2,
    "trap3-x": req.params.trap3,
    "ball-y": req.params.ballY,
    "score": req.params.score,
    "jump": jump
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
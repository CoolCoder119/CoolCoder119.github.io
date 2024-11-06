const app = require('express')();
const PORT = 8080;

app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
)

app.get(`/testing`, (req, res) => {
    res.status(200).send({
        tshirt_color: 'red',
        size: 'small'
    })
}); 

const db = require('./db')

const getComments = async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM comments');
        return res.json(data.rows);
    } catch (error) {
        console.log(error)
    }
}

module.exports = getComments;
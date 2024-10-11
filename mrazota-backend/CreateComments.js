const db = require('./db')

const createComments = async (req, res) => {
    try {
        const { name, text } = req.body;
        const query = 'INSERT INTO comments (name, text, date) VALUES ($1, $2, NOW()) RETURNING *'
        const data = await db.query(query, [name, text ])
        return res.json(data.rows[0])
    } catch (error) {
        return res.status(500).json('Не удалось Создать сплетню, ИДИ НАХУЙ')
    }
}

module.exports = createComments;
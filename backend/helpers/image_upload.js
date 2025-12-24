const multer = require('multer')
const path = require('path')

const imageStorege = multer.diskStorage({
    destination: function(req, file, cb) {
        let folder = ''
        
        if (req.baseUrl.includes('users')) {
            folder = 'users'
        }
        cb(null, `./public/images/${folder}`)
        
    },
    filename:(req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStorege,
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error('Por favor, envie outra imagem'))
        }
        cb(undefined, true)
    },
})

module.exports = { imageUpload }
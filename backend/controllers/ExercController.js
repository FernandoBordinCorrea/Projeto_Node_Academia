const Exerc = require("../models/Exerc")

const getToken = require("../helpers/get_token")
const getUserByToken = require("../helpers/get_user_by_token")
const ObjectId = require("mongoose").Types.ObjectId

module.exports = class ExercController {

    static async create(req, res) {
        const { name, reps, sets, weight } = req.body

        if (!name) {
            res.status(422).json({ message: "O nome do exercício é obrigatório!" })
            return
        }
        if (!reps) {
            res.status(422).json({ message: "A quantidade de repetições é obrigatória!" })
            return
        }
        if (!sets) {
            res.status(422).json({ message: "A quantidade de séries é obrigatória!" })
            return
        }
        if (!weight) {
            res.status(422).json({ message: "O peso é obrigatório!" })
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        const exerc = new Exerc({
            name,
            reps,
            sets,
            weight,
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            },
        })

        try {
            
            const newExerc = await exerc.save()
            res.status(201).json({
                message: "Exercício cadastrado com sucesso!",
                newExerc,
            })

        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    static async getAll(req, res) {

        const token = getToken(req)
        const user = await getUserByToken(token)

        const exercs = await Exerc.find({'user._id': user._id}).sort('-createdAt')

        res.status(200).json({
            exercs,
        })
    }

    static async getById(req, res) {

        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: "ID inválido!" })
            return
        }

        const exerc = await Exerc.findOne({ _id: id })

        if (!exerc) {
            res.status(404).json({ message: "Exercício não encontrado!" })
            return
        }

        res.status(200).json({ exerc })
    }

    static async removeExercById(req, res) {

        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: "ID inválido!" })
            return
        }

        const exerc = await Exerc.findOne({ _id: id })

        if (!exerc) {
            res.status(404).json({ message: "Exercício não encontrado!" })
            return
        }

        const token = getToken(req) 
        const user = await getUserByToken(token)

        if (exerc.user._id.toString() !== user._id.toString()) {
            res.status(422).json({ message: "Houve um problema ao processar sua solicitação, tente novamente mais tarde!" })
            return
        }

        await Exerc.findByIdAndDelete(id)

        res.status(200).json({ message: "Exercício removido com sucesso!" })

    }

    static async updateExerc(req, res) {


        const id = req.params.id

        const { name, reps, sets, weight } = req.body

        const updatedData = {}

        const exerc = await Exerc.findOne({ _id: id })

        if (!exerc) {
            res.status(404).json({ message: "Exercício não encontrado!" })
            return
        }

        const token = getToken(req) 
        const user = await getUserByToken(token)

        if (exerc.user._id.toString() !== user._id.toString()) {
            res.status(422).json({ message: "Houve um problema ao processar sua solicitação, tente novamente mais tarde!" })
            return
        }

        if (!name) {
            res.status(422).json({ message: "O nome do exercício é obrigatório!" })
            return
        }else {
            updatedData.name = name
        }
        if (!reps) {
            res.status(422).json({ message: "A quantidade de repetições é obrigatória!" })
            return
        }else{
            updatedData.reps = reps
        }
        if (!sets) {
            res.status(422).json({ message: "A quantidade de séries é obrigatória!" })
            return
        }else{
            updatedData.sets = sets
        }
        if (!weight) {
            res.status(422).json({ message: "O peso é obrigatório!" })
            return
        }else{
            updatedData.weight = weight
        }

        await Exerc.findByIdAndUpdate(id, updatedData)

        res.status(200).json({ message: "Exercício atualizado com sucesso!" })
    }

}
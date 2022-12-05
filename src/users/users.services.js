const userControllers = require('./users.controllers')


const getAllUsers = async(req, res) => {
    userControllers.findAllUsers()
        .then((users) => {res.status(200).json(users)})
        .catch(err => {res.status(400).json({message: err.message})})
}

const getUserById = (req, res) => {
    const id = req.params.id
    userControllers.findUserById(id)
        .then(user => {
            if (user) {
                res.status(200).json(user)  
            }else {
                res.status(404).json({message: 'Invalid Id'})
            }
        })
        .catch(err => { res.status(400).json({message: err.message})})
}

const postUser = (req, res) => {
    const { first_name, last_name, email, password, birthday} = req.body
    userControllers.createUser({ first_name, last_name, email, password, birthday })
        .then((newUser) => { res.status(201).json(newUser) })
        .catch(err => { res.status(400).json({message: err.message})})
}

const patchUser = (req, res) => {
    const id = req.params.id
    const { first_name, last_name, email, password, birthday } = req.body
    userControllers.updateUser(id, {first_name, last_name, email, password, birthday})
        .then((data) => {
            if (data) {
                res.status(200).json({message: 'User Updated'})
            }else {
                res.status(404).json({message: 'Invalid Id'})
            }
        })
        .catch(err => { res.status(400).json({message: err.message})})
}

const deleteUser = (req, res) => {
    const id = req.params.id
    userControllers.deleteUser(id)
        .then(data => {
            if (data) {
                res.status(204).json({message: 'User deleted succesfully'})
            } else {
                res.status(404).json({message: 'User not found'})
            }
        })
        .catch(err => { res.status(400).json({message: err.message})})
}

 
module.exports = {
    getAllUsers,
    getUserById,
    postUser,
    patchUser,
    deleteUser
}
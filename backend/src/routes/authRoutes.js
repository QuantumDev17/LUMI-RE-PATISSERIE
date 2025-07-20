import express from 'express';
import { createUser,getAllUsers,updateUser,deleteUser,getUserById } from '../controllers/authController.js'; 

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id', getUserById);

export default router;
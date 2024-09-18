import express from 'express';
import { userModel } from '../models/userModel';
import { stockModel } from '../models/stockModel';
import jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Register User (POST)
export const registerUser = async(
    req: express.Request,
    res: express.Response
) => {
    try {
        const {username, email, password} = req.body;

        // Make sure all fields are complete
        if (!username || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
        };

        // Check if user exists
        const existingUser = await userModel.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: "User already exists"});
        };

        // Add new user
        const newUser = await userModel.create({
            username, 
            email, 
            password
        });
        res.status(201).send(newUser);
        
    } catch (error) {
        res.status(500).send({message: "internal server error", error});
    }
};

// Login User (POST)
export const loginUser = async(
    req: express.Request,
    res: express.Response
) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});

        // Check if user exists
        if (!user) {
            return res.status(400).json({message: "Invalid credentials"});
        };
        
        // Check password 
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(400).json({message: "Invalid credentials"});
        };

        // Create Token
        const token = jwt.sign(
            {userId: user._id, username: user.username},
            process.env.JWT_SECRET as string,
            {expiresIn: '1h'}
        );
        res.json({ token });

    } catch (error) {
        res.status(500).send({message: 'Server error'});
    }
};


// Delete User (DELETE)
export const deleteUser = async(
    req: express.Request,
    res: express.Response
) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);

        if (!user) {
            res.status(404).json({message: "User not found"});
        };

        res.status(200).send({message: "User has been deleted"});
    } catch (error) {
        res.status(500).send({message: "something went wrong"});
    }
};


// GET USER STOCKS
export const getUserStocks = async(
    req: express.Request,
    res: express.Response
) => {
    try {
        const userId = (req as any).user.userId;

        // Find all stocks in the database associated with the user
        const userStocks = await stockModel.find({userId});

        if (userStocks.length === 0 || !userStocks) {
            return res.status(404).json({message: "No stocks found for this user"});
        };

        res.status(200).json(userStocks);

    } catch (error) {
        res.status(500).send({message: "Something went wrong"});
    }
}
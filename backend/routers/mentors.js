const express = require('express');
const mg = require('mongoose');
const Mentor = require('../models/mentorModel');
const cd = require('../credencials');
const DB_USER = cd.DB_USER;
const password = cd.password;
const DB_HOST = 'kodemia16.rtqqj.mongodb.net';
const DB_NAME = 'kodemia';
const URL = `mongodb+srv://${DB_USER}:${password}@${DB_HOST}/${DB_NAME}`;
const router = express.Router();

// header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
router
    .get('/', async (req, res)=>{
        try {
            const count = req.query.count;
            const gender = req.query.gender;
            const module = req.query.module;
            const mentorData = await Mentor.find()
            res.setHeader('Access-Control-Allow-Origin', '*')
            if(gender){
                mentorData = mentorData.filter(mentors => mentors.gender === gender)
            }
            if(module){
                mentorData = mentorData.filter(mentors => mentors.module === module)
            }
            if(count){
                mentors = mentorData.slice(0,parseInt(count))
            }
            res.json({
                success: true,
                data:{
                    mentors: mentorData
                }
            })
        } catch (error) {
            
        }
    })
    .get('/:id', async (req, res)=>{
        try {
            const idMentor = req.params.id;
    
            const mentor = await Mentor.findById(idMentor);
            if(!mentor) throw new Error('Mentor not found');
            res.json({
                success: true,
                data: {
                    mentor: mentor
                }
            })
        } catch (error) {
            res.status(400);
            res.json({
                success: false,
                message: error.message
            })
        }

    })
    .post('/', async (req, res)=>{
        try {
            const newMentor = req.body;
            console.log(newMentor);
            const mentorCreated = await Mentor.create(newMentor);

            res.json({
                success: true,
                message: 'Mentor Created',
                data:{
                    mentor: mentorCreated
                }
            })
            
        } catch (error) {
            res.status(400);
            res.json({
                success: false,
                message: error
            })
        }
    })
    .patch('/:id', async (req, res)=>{
        try {
            const idMentor = req.params.id;
            const body = req.body;
            const mentor = await Mentor.findByIdAndUpdate(idMentor, body,{new: true});

            if(!mentor) throw new Error('Mentor not found')
            res.json({
                success: true,
                message: 'mentor update',
                data:{
                    mentor: mentor
                }
            })
        } catch (error) {
    res.json({
        success: false,
        message: error.message
    })            
        }
    })
    .delete('/:id', async (req, res)=>{
        try {
            const idMentor = req.params.id;
            const mentor = await Mentor.findByIdAndDelete(idMentor,{delete: true})
            if(!mentor) throw new Error('Mentor not found')
            res.json({
                success: true,
                message: 'Mentor is delete', 
                data: {
                    mentor: mentor                }
            })
        } catch (error) {
            res.status(400);
            res.json({
                success: false,
                message: error.message
            })
        }
    })
    module.exports = router;
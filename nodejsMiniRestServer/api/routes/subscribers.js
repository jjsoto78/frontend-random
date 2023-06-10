// this is middleware, executes after a request is received but before it gets routed

const express = require('express')
const router = express.Router()

// a model object, allows us to interact with mongodb easily
const Subscriber = require('../models/subscriber');
const subscriber = require('../models/subscriber');

// this server is using REST, so lets create the endpoints
// ['/subscribers', '/'] either rout will work
//get all
router.get(['/subscribers', '/'], async(req, res) => {

    try{
        const subscribers = await Subscriber.find();
        res.send(subscribers)
    }
    catch (err){
        res.status(500).json({message: err.message})
    }
})

//get one
router.get(['/subscribers/:id', '/:id'], getSubscriber, (req, res) => {
    // res.send(`<h1>${res.subscriber.name} make me Millions of Dollars for me now </h1>`)
    res.json(res.subscriber)
})

// //create one
router.post(['/subscribers', '/'], async(req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscriberToChannel: req.body.subscriberToChannel,
        subscriberDate: req.body.subscriberDate
    })

    try{
        const newSubscriber =  await subscriber.save();
        res.status(201).json(newSubscriber);
    }
    catch (err){
        // remember to use objects when sending json
        // 400 status code means issue with request data
        res.status(400).json({message: err.message})
    }

})

// //updating one
router.patch(['/subscribers/:id', '/:id'], getSubscriber, async (req, res) => {

    // this is good, unfortunately it creates a new db entity because is a new object
    // res.subscriber = new Subscriber({...res.subscriber, ...req.body})

    res.subscriber.name = req.body.name ?? res.subscriber.name
    res.subscriber.subscriberToChannel = req.body.subscriberToChannel ?? res.subscriber.subscriberToChannel
    
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)

    } catch (err) {
        res.status(400).json({message: err.message})
    }

})

// //deleting one
router.delete(['/subscribers/:id', '/:id'], getSubscriber, async (req, res) => {

    try{
        await res.subscriber.remove()
        res.json({ message: `subscriber ${res.subscriber.name} removed`})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// lets create some middleware reusing code on endpoints receiving an :id
async function getSubscriber(req, res, next) {
    let subscriber = {}
    
    try{
        subscriber = await Subscriber.findById(req.params.id)

        if(subscriber == null){
            return res.status(404).json({ message: 'subscriber not found' })
        }

    }catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.subscriber = subscriber
    // calls the next middleware function
    next()
}


module.exports = router;

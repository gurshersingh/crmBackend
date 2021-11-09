const express = require("express")
const router = express.Router()
const {insertTicket,findTicketById,findTicketByTicId,closeTicket,updateClientReply}=require("../model/tickets/Ticket.model")
const {userAuthorization}=require("../middleware/authorization.middle")
const {ticketReplyMsgValidation}=require("../middleware/validation")
router.post("/",userAuthorization, async(req,res)=>{
    const{subject,sender,message}=req.body
    const id = req.id
    const ticketObj= {
        clientId:id,
        subject,
        conversation:[{
            sender,
            message,
        }]
    }
    const addTicket= await insertTicket(ticketObj)
    console.log(id)
    res.send(addTicket)
})

router.get("/",userAuthorization, async(req,res)=>{
    
    const id = req.id
    console.log(id)
    
    const userTickets= await findTicketById(id)
    console.log(userTickets)
    res.send(userTickets)
})

router.get("/:id",userAuthorization, async(req,res)=>{
    
    const clientId = req.id
    //console.log(clientId)
    const _id=req.params.id
    //console.log(_id)
    const userTickets= await findTicketByTicId(_id,clientId)
    //console.log(userTickets)
    res.send(userTickets)
})

// router.put("/:id",userAuthorization, async(req,res)=>{
//     const{sender,message}=req.body
//     const clientId = req.id
//     //console.log(clientId)
//     const _id=req.params.id
//     console.log(sender,message)
//     const userTickets= await updateClientReply(_id,sender,message)
//     //console.log(userTickets)
//     res.send(userTickets)
// })
router.put("/:_id", ticketReplyMsgValidation,userAuthorization, async (req, res) => {
    try {
      const { message, sender } = req.body;
      const { _id } = req.params;
      //const clientId = req.userId;
  
      const result = await updateClientReply({ _id, message, sender });
  
      if (result._id) {
        return res.json({
          status: "success",
          message: "your message updated",
        });
      }
      res.json({
        status: "error",
        message: "Unable to update your message please try again later",
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  });

  router.patch("/:_id", userAuthorization, async (req, res) => {
    try {
      const { _id } = req.params;
      const clientId = req.id;
        //console.log(_id,clientId)
      const result = await closeTicket({ _id, clientId });
  
      if (result._id) {
        return res.json({
          status: "success",
          message: "ticket closed",
        });
      }
      res.json({
        status: "error",
        message: "Unable to close the ticket, please try again later",
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  });

module.exports=router
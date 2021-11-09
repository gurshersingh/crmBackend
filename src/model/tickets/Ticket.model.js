
const {TicketSchema}=require("./Ticket.schema")

const insertTicket =ticketObj =>{
    try {
        return new Promise((resolve,reject)=>{
            TicketSchema(ticketObj)
            .save()
            .then(data=>resolve(data))
            .catch(err=>reject(err.message))
        })
    } catch (error) {
        reject(err.message)
    }
}
const findTicketById= id =>{
    return new Promise((resolve,reject)=>{
     if(!id) return false
         TicketSchema
         .find({id},(error,data)=>{
             if(error){
                 reject(error)
             }
             resolve(data)
         })  
     })
  
 }
 const findTicketByTicId= (_id,clientId) =>{
    return new Promise((resolve,reject)=>{
     if(!_id) return false
         TicketSchema
         .find({_id,clientId},(error,data)=>{
             if(error){
                 reject(error)
             }
             resolve(data)
         })  
     })
  
 }

 const updateClientReply = ({ _id, message, sender}) => {
    return new Promise((resolve,reject) => {
        try {
            TicketSchema.findOneAndUpdate(
                { _id },
                {
                status:"pending",
                $push: {
                    conversation: {message:message, sender:sender} ,
                    
                },
            },
            { new: true }
            )
            .then((data)=>resolve(data))
            .catch((error)=>reject(error));
        } catch (error) {
            reject(error);
        } 
     });
 };
 const closeTicket = ({ _id, clientId}) => {
    return new Promise((resolve,reject) => {
        try {
            TicketSchema.findOneAndUpdate(
                { _id,clientId },
                {
                status:"close",}
            )
            .then((data)=>resolve(data))
            .catch((error)=>reject(error));
        } catch (error) {
            reject(error);
        } 
     });
 };
// const updateClientReply = ({ _id, message, sender }) => {
//     return new Promise((resolve, reject) => {
//       try {
//         TicketSchema.findOneAndUpdate(
//           { _id },
//           {
//             status: "Pending operator ",
//             $push: {
//               conversation:   {message:message, sender:sender} ,
//             },
//           },
//           { new: true }
//         )
//           .then((data) => resolve(data))
//           .catch((error) => reject(error));
//       } catch (error) {
//         reject(error);
//       }
//     });
//   };

module.exports ={
    insertTicket,
    findTicketById,
    findTicketByTicId,
    closeTicket,
    updateClientReply
    
}
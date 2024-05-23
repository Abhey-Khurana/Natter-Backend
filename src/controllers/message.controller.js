import Message from "../models/message.model.js";

async function addMessage(req, res, next) {

    try {
        // console.log(req.body);
        const { from, to, message } = req.body;

        const data = await Message.create({
            message: {
                text: message
            },
            users: [from, to],
            sender: from,
        });

        if (data)
            return res.json({ message: "Message sent Successfully" });
        return res.json({ message: "Error Occured" });
    }
    catch (err) {
        next(err);
    }
}

async function getAllMessages(req, res, next) {
    try {
        const { from, to } = req.body;
    
        const messages = await Message.find({
          users: {
            $all: [from, to],
          },
        }).sort({ updatedAt: 1 });
    
        const projectedMessages = messages.map((msg) => {
          return {
            fromSelf: msg.sender.toString() === from,
            message: msg.message.text,
          };
        });

        // console.log(projectedMessages)
        // console.log(messages);
        res.json(projectedMessages);
      } catch (ex) {
        next(ex);
      }
}

export { addMessage, getAllMessages };


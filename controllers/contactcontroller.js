import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";
//@desc Get all contacts
//@route GET api/contacts
//@access private
const getContacts = asyncHandler(async(req,res) => {
        const contacts = await Contact.find({user_id:req.user.id});
        res.status(200).json(contacts);
});

//@desc To get contact by id
//@route get contacts by id api/contacts
//@access private
const getContactsId = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc To create contacts
//@route Post api/contacts
//@access private
const createContacts = asyncHandler(async(req,res) => {
    console.log(req.body);
    const{ name,email,phone } = req.body;
    if( !name || !email || !phone )
    {
        res.status(400);
        throw new Error("All fileds are required");
    }
    const  contact =await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});

//@desc To update contacts
//@route update api/contacts
//@access private
const updateContacts = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id)
    {
        res.status(403);
        throw new Error("Another user dont have access to update");
    }

    const updatecontact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new : true
        }
    );
    res.status(200).json(updatecontact);
});

//@desc To delete contacts
//@route delete api/contacts
//@access private 
const deleteContacts = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id)
    {
        res.status(403);
        throw new Error("User dont have permission to delete other user contacts");
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contact);
});

export { getContacts, getContactsId, createContacts, updateContacts, deleteContacts };

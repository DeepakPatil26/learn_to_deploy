const express = require("express");
const { NoteModel } = require("../model/Note.model");
const noteRouter = express.Router();

// Create a Note
noteRouter.post("/create", async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.status(200).send({ message: "New Note has been added" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Get all the notes
noteRouter.get("/", async (req, res) => {
  try {
    const notes = await NoteModel.find({ authorID: req.body.authorID });
    res.status(200).send(notes);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

noteRouter.patch("/update/:noteID", async (req, res) => {
  const { noteID } = req.params;
  const note = await NoteModel.findOne({ _id: noteID });
  try {
    if (req.body.authorID !== note.authorID) {
      res
        .status(200)
        .send({ message: `You are not authorized to do this action` });
    } else {
      await NoteModel.findByIdAndUpdate({ _id: noteID }, req.body);
      res
        .status(200)
        .send({ message: `The note with id:${noteID} has been updated` });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

noteRouter.delete("/delete/:noteID", async (req, res) => {
  const { noteID } = req.params;
  const note = await NoteModel.findOne({ _id: noteID });
  try {
    if (req.body.authorID !== note.authorID) {
      res
        .status(200)
        .send({ message: `You are not authorized to do this action` });
    } else {
      await NoteModel.findByIdAndDelete({ _id: noteID });
      res
        .status(200)
        .send({ message: `The note with id:${noteID} has been deleted` });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = { noteRouter };

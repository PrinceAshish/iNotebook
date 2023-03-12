const express = require("express");
const router = express.Router();
const { param, validationResult } = require("express-validator");
const Notes = require("../models/Notes");
const fetchUser = require("../middleware/fetchUser");

router.get("/allnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post(
  "/addnote/:title/:descripation",
  fetchUser,
  [
    param("title", "Enter valid Title").isLength({ min: 2 }),
    param("descripation", "Descripation must be greater than 5").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, descripation } = req.params;
    try {
      const note = new Notes({
        title,
        descripation,
        user: req.user,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
);

router.put(
  "/updatenote/:id/:title/:descripation",
  fetchUser,
  async (req, res) => {
    const { title, descripation } = req.params;
    const newNote = {};
    try {
      if (title) {
        newNote.title = title;
      }
      if (descripation) {
        newNote.descripation = descripation;
      }
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Nott found");
      }
      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json(note);
    } catch (error) {
      res.status(500).json({ msg: err.message });
    }
  }
);

router.delete("/delete/:id", fetchUser, async (req, res) => {
  let note = await Notes.findById(req.params.id);
  try {
    if (!note) {
      return res.status(404).send("Not Found");
    }
    // if (note.user !== req.user.id) {
    //   return res.status(401).send("unaturized action");
    // }
    const delNote = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "note has been deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
module.exports = router;

import React, { useState, useRef, useEffect } from "react";
import NotesModel from "../../models/Notes";
import PropTypes from "prop-types";
import classNames from "classnames";
import { formatDate } from "../../utils/utils";
import { fetchNotes, createNote, updateNote as updateNoteAPI } from "../../api";

export default function Notes({
  note,
  onUpdate,
  onDelete,
  deletingMode,
  onDeleteRequest,
}) {
  const [noteContent, setNoteContent] = useState(note.content);
  const [isEditing, setIsEditing] = useState(false);
  const contentEditableRef = useRef(null);

  // Set initial content only when note changes
  useEffect(() => {
    if (contentEditableRef.current) {
      contentEditableRef.current.innerText = note.content;
    }
    setNoteContent(note.content);
  }, [note]);

  const handleContentChange = () => {
    const newContent = contentEditableRef.current.innerText;
    setNoteContent(newContent);
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (noteContent !== note.content && onUpdate) {
      onUpdate(note._id, { content: noteContent, updatedAt: null });
    }
  };

  const handleDelete = () => {
    if (onDelete) onDelete(note._id);
  };

  const noteContainerClass = classNames(
    "noteContainer",
    `bg-post-color-${note.color || "yellow"}`,
    "p-5",
    "m-5",
    "w-full", // Full width for small screens
    "md:w-64", // Fixed width for medium and larger screens
    "h-64", // Fixed height
    "shadow-md",
    "rounded-xl",
    "flex",
    "flex-col",
    "justify-between",
    deletingMode
      ? "border-4 border-gray-300 cursor-pointer hover:border-red-500"
      : ""
  );

  const handleNoteClick = () => {
    if (deletingMode && onDeleteRequest) {
      onDeleteRequest(note);
    }
  };

  return (
    <div className={noteContainerClass} onClick={handleNoteClick}>
      <div
        className="noteBody dark:text-custom-white text-ellipsis"
        contentEditable
        suppressContentEditableWarning
        onInput={handleContentChange}
        ref={contentEditableRef}
        style={{ outline: "none", border: "none" }}
      >
        {/* Do not render noteContent here to prevent cursor jump */}
      </div>
      {isEditing ? (
        <div className="max-w-full mt-2">
          <button
            className="w-full bg-custom-blue-500 text-custom-white p-2 rounded-md bg-cyan-300"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      ) : note.updatedAt === "" || note.updatedAt === null ? null : (
        <div className="datePosted pt-5 text-custom-gray-300 dark:text-custom-cream-white text-sm">
          <p>{formatDate(note.updatedAt)}</p>
        </div>
      )}
    </div>
  );
}

Notes.propTypes = {
  note: PropTypes.instanceOf(NotesModel).isRequired,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  deletingMode: PropTypes.bool,
  onDeleteRequest: PropTypes.func,
};

Notes.defaultProps = {
  note: new NotesModel("Type your note here", "", "", "", "yellow"),
  onUpdate: undefined,
  onDelete: undefined,
  deletingMode: false,
  onDeleteRequest: undefined,
};

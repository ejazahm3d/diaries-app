import React, { FC, useState } from "react";
import { Diary } from "../../interfaces/diary.interface";
import http from "../../services/api";
import { updateDiary } from "./diariesSlice";
import {
  setCanEdit,
  setActiveDiaryId,
  setCurrentlyEditing,
} from "../entry/editorSlice";
import { showAlert } from "../../util";
import { useAppDispatch } from "../../store";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../rootReducer";

interface Props {
  diary: Diary;
}

const buttonStyle: React.CSSProperties = {
  fontSize: "0.7em",
  margin: "0 0.5em",
};

const DiaryTile: FC<Props> = (props) => {
  const [diary, setDiary] = useState(props.diary);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  const totalEntries = props.diary?.entryIds?.length;
  const user = useSelector((state: RootState) => state.user);
  const saveChanges = () => {
    http
      .put<Diary, Diary>(`users/${user.id}/diaries/${diary.id}`, diary)
      .then((diary) => {
        if (diary) {
          dispatch(updateDiary(diary));
          showAlert("Saved!", "success");
        }
      })
      .finally(() => {
        setIsEditing(false);
      });
  };

  return (
    <div className="diary-tile">
      <h2
        className="title"
        title="Click to edit"
        onClick={() => setIsEditing(true)}
        style={{
          cursor: "pointer",
        }}
      >
        {isEditing ? (
          <input
            value={diary.title}
            onChange={(e) => {
              setDiary({
                ...diary,
                title: e.target.value,
              });
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                saveChanges();
              }
            }}
          />
        ) : (
          <span>{diary.title}</span>
        )}
      </h2>
      <p className="subtitle">{totalEntries ?? "0"} saved entries</p>
      <div style={{ display: "flex" }}>
        <button
          style={buttonStyle}
          onClick={() => {
            console.log("teehe");
            dispatch(setCanEdit(true));
            dispatch(setActiveDiaryId(diary.id as string));
            dispatch(setCurrentlyEditing(null));
          }}
        >
          Add New Entry
        </button>
        <Link href={`diary/${diary.id}`}>
          <button className="secondary" style={buttonStyle}>
            <a>View all →</a>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DiaryTile;
